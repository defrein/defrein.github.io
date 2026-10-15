import { cp, lstat, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { basename, dirname, relative, resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
if (relative(root, output) !== 'dist') throw new Error('Output must be the repository dist directory.');

async function build(directory, extraEnv = {}) {
  // npm_execpath is provided by npm run; invoking it through Node avoids shell quoting.
  const npm = process.env.npm_execpath;
  if (!npm) throw new Error('Run this build with npm run build from the repository root.');
  await new Promise((done, reject) => {
    const child = spawn(process.execPath, [npm, 'run', 'build'], {
      cwd: resolve(root, directory), env: { ...process.env, ...extraEnv }, stdio: 'inherit',
    });
    child.on('error', reject);
    child.on('exit', code => code === 0 ? done() : reject(new Error(`${directory} build failed (${code}).`)));
  });
}

const excluded = new Set(['node_modules', '.git', '.vite', '.DS_Store', 'README.md']);
async function copyTree(source, destination) {
  if (excluded.has(basename(source))) return;
  const info = await lstat(source);
  if (info.isSymbolicLink()) throw new Error(`Symlinks cannot be deployed: ${source}`);
  if (info.isDirectory()) {
    await mkdir(destination, { recursive: true });
    for (const name of await readdir(source)) await copyTree(resolve(source, name), resolve(destination, name));
  } else {
    await mkdir(dirname(destination), { recursive: true });
    // Directories merge, but colliding files stop the build instead of silently replacing a route.
    await cp(source, destination, { errorOnExist: true, force: false });
  }
}

function redirect(destination, title) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=${destination}"><link rel="canonical" href="https://defrein.github.io${destination}"><title>${title}</title></head><body><p><a href="${destination}">${title}</a></p><script>location.replace(${JSON.stringify(destination)} + location.search + location.hash);</script></body></html>\n`;
}

if (!process.argv.includes('--stage-only')) {
  await build('wave', { PUBLIC_BASE_PATH: '/' });
  await build('portfolio');
}

// Validate the two namespaces before touching an existing combined artifact.
const waveHome = await readFile(resolve(root, 'wave/dist/index.html'), 'utf8');
const portfolioHome = await readFile(resolve(root, 'portfolio/build/index.html'), 'utf8');
if (!waveHome.includes('href="/_astro/')) throw new Error('Build Wave with PUBLIC_BASE_PATH=/ before staging.');
if (!portfolioHome.includes('/portfolio/_app/')) throw new Error('Build Portfolio v4 with its /portfolio base before staging.');

// Only the checked, fixed build-output directory is cleared. Source folders stay in place.
console.log(`Assembling ${output}`);
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await copyTree(resolve(root, 'wave/dist'), output);
await copyTree(resolve(root, 'portfolio/build'), resolve(output, 'portfolio'));

// Preserve established domain-root asset/tool/version URLs alongside Wave's routes.
for (const directory of ['others', 'v.1', 'v.2', 'v.3', 'assets', 'projects']) {
  await copyTree(resolve(root, directory), resolve(output, directory));
}
await cp(resolve(root, 'robots.txt'), resolve(output, 'robots.txt'));
await writeFile(resolve(output, '.nojekyll'), '');

for (const [path, destination, title] of [
  ['photobooth', '/portfolio/photobooth/', 'Open Photobooth'],
  ['v.4', '/portfolio/', 'Open Portfolio v4'],
  ['wave', '/', 'Open the current portfolio'],
]) {
  await mkdir(resolve(output, path), { recursive: true });
  await writeFile(resolve(output, path, 'index.html'), redirect(destination, title));
}

// A populated custom-domain file is optional; an empty CNAME is not published.
try {
  const cname = (await readFile(resolve(root, 'CNAME'), 'utf8')).trim();
  if (cname) await writeFile(resolve(output, 'CNAME'), `${cname}\n`);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

// GitHub Pages artifacts cannot contain symlinks. Keep generated output source-free.
for (const path of await readdir(output, { recursive: true, withFileTypes: true })) {
  if (path.isSymbolicLink()) throw new Error(`Symlinks cannot be deployed: ${path.name}`);
}
console.log('Ready: Wave at /, Portfolio v4 at /portfolio/, and legacy URLs preserved.');
