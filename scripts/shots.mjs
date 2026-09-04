/**
 * Capturas y diagnóstico responsive con Chrome headless vía CDP.
 *
 *   node scripts/shots.mjs <ruta> [ancho] [alto] [nombre]
 *   node scripts/shots.mjs --audit           → revisa desbordes en todas las rutas
 *
 * Usa emulación de dispositivo real (no solo --window-size), que es lo que
 * hace que el <meta viewport> se respete y las media queries se evalúen como
 * en un móvil de verdad.
 */
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(root, "tmp/shots");
const CHROME =
  process.env.CHROME_PATH ??
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
// Puerto y perfil únicos por ejecución: si queda un Chrome colgado de una
// corrida anterior, la siguiente no se conecta a la pestaña equivocada.
const PORT = 9222 + (process.pid % 500);
const PROFILE = join(root, `tmp/.chrome-${process.pid}`);
const BASE = "http://localhost:3000";

const ROUTES = [
  "/", "/a", "/a/lotes", "/b", "/b/proyecto", "/b/amenidades",
  "/b/masterplan", "/b/lotes", "/b/galeria", "/b/contacto",
  "/libro-de-reclamaciones", "/legal/privacidad", "/legal/terminos",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--disable-gpu",
  "--no-first-run",
  "--user-data-dir=" + PROFILE,
  "about:blank",
]);

async function connect() {
  for (let i = 0; i < 60; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const tabs = await res.json();
      const page = tabs.find((t) => t.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      /* todavía arrancando */
    }
    await sleep(250);
  }
  throw new Error("Chrome no expuso el puerto de depuración");
}

const ws = new WebSocket(await connect());
await new Promise((r) => (ws.onopen = r));

let seq = 0;
const pending = new Map();
const waiters = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.method) {
    const w = waiters.get(msg.method);
    if (w) {
      waiters.delete(msg.method);
      w(msg.params);
    }
    return;
  }
  const p = pending.get(msg.id);
  if (p) {
    pending.delete(msg.id);
    if (msg.error) p.reject(new Error(msg.error.message));
    else p.resolve(msg.result);
  }
};

/** Espera un evento del protocolo, con tope de tiempo por si no llega. */
function once(method, timeout = 15000) {
  return new Promise((resolve) => {
    const t = setTimeout(() => {
      waiters.delete(method);
      resolve(null);
    }, timeout);
    waiters.set(method, (params) => {
      clearTimeout(t);
      resolve(params);
    });
  });
}

const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const id = ++seq;
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });

await send("Page.enable");
await send("Runtime.enable");

async function visit(path, width, height, mobile) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile,
    screenWidth: width,
    screenHeight: height,
  });
  const loaded = once("Page.loadEventFired");
  await send("Page.navigate", { url: BASE + path });
  await loaded;
  await sleep(1200);
  // Recorre la página para disparar las animaciones de entrada, y vuelve arriba.
  await send("Runtime.evaluate", {
    expression: `(async()=>{const h=document.body.scrollHeight;
      for(let y=0;y<h;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}
      window.scrollTo(0,0);await new Promise(r=>setTimeout(r,350));})()`,
    awaitPromise: true,
  });
}

/** Elementos cuyo borde derecho se sale del viewport. */
async function overflowReport(width) {
  const { result } = await send("Runtime.evaluate", {
    expression: `JSON.stringify((()=>{
      const bad=[];
      for (const el of document.querySelectorAll('body *')) {
        const r = el.getBoundingClientRect();
        if (r.width === 0) continue;
        if (r.right > ${width} + 1 || r.left < -1) {
          // Ignora lo escondido a propósito (honeypot) y lo que vive dentro de
          // un contenedor con scroll o recorte propio.
          if (el.closest('[aria-hidden="true"]')) continue;
          let p = el.parentElement, contained = false;
          while (p && p !== document.body) {
            const o = getComputedStyle(p).overflowX;
            if (o !== 'visible') { contained = true; break; }
            p = p.parentElement;
          }
          if (contained) continue;
          bad.push({
            tag: el.tagName.toLowerCase(),
            cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : String(el.className||'')).slice(0,90),
            left: Math.round(r.left), right: Math.round(r.right),
          });
        }
      }
      return { docWidth: document.documentElement.scrollWidth, count: bad.length, worst: bad.slice(0,8) };
    })())`,
    returnByValue: true,
  });
  return JSON.parse(result.value);
}

async function shoot(name) {
  const { data } = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  mkdirSync(OUT, { recursive: true });
  writeFileSync(join(OUT, `${name}.png`), Buffer.from(data, "base64"));
}

const args = process.argv.slice(2);

if (args[0] === "--audit") {
  for (const [w, h, mobile, label] of [
    [390, 844, true, "móvil 390"],
    [1440, 900, false, "desktop 1440"],
  ]) {
    console.log(`\n══ ${label} ══`);
    for (const path of ROUTES) {
      await visit(path, w, h, mobile);
      const r = await overflowReport(w);
      const flag = r.count ? "✖" : "✓";
      console.log(
        `${flag} ${path.padEnd(26)} doc=${String(r.docWidth).padStart(5)}  desbordes=${r.count}`,
      );
      for (const b of r.worst) {
        console.log(`      ${b.tag} [${b.left}→${b.right}] .${b.cls}`);
      }
    }
  }
} else {
  const [path = "/", w = "1440", h = "900", name = "shot"] = args;
  const width = Number(w);
  await visit(path, width, Number(h), width < 768);
  await shoot(name);
  const r = await overflowReport(width);
  console.log(`${path} @${w} → tmp/shots/${name}.png  desbordes=${r.count}`);
  for (const b of r.worst) console.log(`   ${b.tag} [${b.left}→${b.right}] .${b.cls}`);
}

ws.close();
chrome.kill();
// Chrome tarda un momento en soltar los archivos del perfil; si no se puede
// borrar, no importa: queda dentro de tmp/, que no se versiona.
await sleep(400);
try {
  rmSync(PROFILE, { recursive: true, force: true });
} catch {
  /* el perfil se limpia en la siguiente pasada */
}
