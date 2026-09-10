import { spawn } from 'node:child_process';
import { watch } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

/**
 * Vite wrapper that restarts the whole process when the Tailwind config changes.
 *
 * Tailwind reads tailwind.config.js once per Node process. A Vite plugin calling
 * server.restart() stays in the same process, so Node's module cache keeps
 * handing back the old theme — the server logs a restart and an HMR update while
 * still emitting the previous utilities. Verified: editing `measure: 54ch` to
 * 77ch and calling server.restart() kept serving 54ch; a fresh process served
 * 77ch immediately.
 *
 * That failure is silent and expensive: a new utility generates nothing, so
 * headings quietly fall back to the body size, and @apply-ing a new token
 * errors outright. Only a real process restart fixes it.
 *
 * The directory is watched rather than the files, because editors (and sed -i)
 * write atomically — a rename gives the file a new inode and a file-level watch
 * stops firing.
 */
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const WATCHED = new Set(['tailwind.config.js', 'postcss.config.js']);
const args = process.argv.slice(2);

let child = null;
let restarting = false;

function start() {
  child = spawn('vite', args, { stdio: 'inherit', cwd: ROOT, shell: true });
  child.on('exit', (code) => {
    if (!restarting && code !== null) process.exit(code);
  });
}

async function restart(filename) {
  if (restarting) return;
  restarting = true;
  process.stdout.write(`\n  ${filename} changed — restarting so Tailwind re-reads it\n\n`);
  const exited = new Promise((r) => child.once('exit', r));
  child.kill('SIGTERM');
  await exited;
  restarting = false;
  start();
}

let debounce;
watch(ROOT, (_event, filename) => {
  if (!filename || !WATCHED.has(filename)) return;
  clearTimeout(debounce);
  debounce = setTimeout(() => restart(filename), 150);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    restarting = true;
    child?.kill(signal);
    process.exit(0);
  });
}

start();
