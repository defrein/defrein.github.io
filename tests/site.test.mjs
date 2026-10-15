import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { createSiteServer } from '../scripts/preview-site.mjs';

let server, origin;
before(async () => {
  server = createSiteServer();
  await new Promise(done => server.listen(0, '127.0.0.1', done));
  origin = `http://127.0.0.1:${server.address().port}`;
});
after(async () => { await new Promise(done => server.close(done)); });

test('root serves Wave and /portfolio/ serves the independent v4 build', async () => {
  const root = await (await fetch(`${origin}/`)).text();
  assert.match(root, /A little code/);
  assert.match(root, /href="\/_astro\//);
  assert.doesNotMatch(root, /(?:href|src)="\/wave\//);
  const old = await (await fetch(`${origin}/portfolio/`)).text();
  assert.match(old, /Portfolio v4/);
  assert.match(old, /\/portfolio\/_app\//);
  assert.match(old, /\/portfolio\/projects\/jats-editor\.jpg/);
  assert.match(old, /\/portfolio\/assets\/documents\/WAHNI_ADNANI_NOVEMBER_2025\.pdf/);
});

test('important routes, old versions, and shared assets remain reachable', async () => {
  for (const path of ['/', '/tools/', '/blog/', '/blog/building-a-rubiks-cube/', '/projects/jats-editor/', '/portfolio/', '/portfolio/photobooth/', '/portfolio/projects/jats-editor.jpg', '/portfolio/assets/documents/WAHNI_ADNANI_NOVEMBER_2025.pdf', '/assets/documents/WAHNI_ADNANI_NOVEMBER_2025.pdf', '/projects/jats-editor.jpg', '/v.1/', '/v.2/', '/v.3/', '/others/roulette-wheel/', '/others/NLM_viewer/', '/others/story/', '/others/jadwal/', '/photobooth/', '/v.4/', '/wave/']) {
    assert.equal((await fetch(`${origin}${path}`)).status, 200, path);
  }
  const response = await fetch(`${origin}/portfolio`, { redirect: 'manual' });
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), '/portfolio/');
});

test('root 404 and generated compatibility links point to the new canonical paths', async () => {
  const response = await fetch(`${origin}/missing/deep-link/`);
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /Page not/);
  assert.match(html, /href="\/#work"/);
  assert.match(html, /content="noindex"/);
  for (const [path, destination] of [['photobooth', '/portfolio/photobooth/'], ['v.4', '/portfolio/'], ['wave', '/']]) {
    const html = await (await fetch(`${origin}/${path}/`)).text();
    assert.ok(html.includes(`href="${destination}"`));
    assert.ok(html.includes(`content="0;url=${destination}"`));
  }
});

test('deployment artifact contains runtime files without source, cache, or empty domain config', async () => {
  await access(new URL('../dist/.nojekyll', import.meta.url));
  const tools = await readFile(new URL('../dist/tools/index.html', import.meta.url), 'utf8');
  assert.match(tools, /Portfolio v4/);
  assert.match(tools, /href="\/portfolio\/"/);
  for (const path of ['.git', '.github', 'wave/src', 'portfolio/src', 'portfolio/package.json', 'projects/README.md', 'node_modules', 'archive', 'scripts', 'tests', 'package.json', 'README.md']) {
    await assert.rejects(access(new URL(`../dist/${path}`, import.meta.url)), { code: 'ENOENT' });
  }
  const cname = await readFile(new URL('../CNAME', import.meta.url), 'utf8').catch(error => { if (error.code === 'ENOENT') return ''; throw error; });
  if (cname.trim()) assert.equal((await readFile(new URL('../dist/CNAME', import.meta.url), 'utf8')).trim(), cname.trim());
  else await assert.rejects(access(new URL('../dist/CNAME', import.meta.url)), { code: 'ENOENT' });
});
