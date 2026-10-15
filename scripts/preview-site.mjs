import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const siteRoot = fileURLToPath(new URL('../dist/', import.meta.url));
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.pdf': 'application/pdf', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml', '.mp3': 'audio/mpeg', '.mp4': 'video/mp4' };

export function createSiteServer(directory = siteRoot) {
  const root = resolve(directory);
  return createServer(async (request, response) => {
    if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405); response.end(); return; }
    try {
      const url = new URL(request.url, 'http://localhost');
      const pathname = decodeURIComponent(url.pathname);
      let target = resolve(root, `.${pathname}`);
      if (pathname.includes('\0') || target !== root && !target.startsWith(`${root}${sep}`)) { response.writeHead(403); response.end(); return; }
      let status = 200;
      let info;
      try {
        info = await stat(target);
        if (info.isDirectory()) {
          if (!url.pathname.endsWith('/')) { response.writeHead(308, { location: `${url.pathname}/${url.search}` }); response.end(); return; }
          target = resolve(target, 'index.html');
          info = await stat(target);
        }
        if (!info.isFile()) throw Object.assign(new Error('Not a file'), { code: 'ENOENT' });
      } catch (error) {
        if (!['ENOENT', 'ENOTDIR'].includes(error.code)) throw error;
        status = 404;
        target = resolve(root, '404.html');
        info = await stat(target);
      }
      response.writeHead(status, { 'content-type': types[extname(target).toLowerCase()] || 'application/octet-stream', 'content-length': info.size, 'cache-control': 'no-cache' });
      if (request.method === 'HEAD') response.end();
      else createReadStream(target).on('error', () => response.destroy()).pipe(response);
    } catch (error) {
      response.writeHead(error instanceof URIError ? 400 : 500);
      response.end('Unable to serve this request. Run npm run build before previewing.');
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  await stat(resolve(siteRoot, 'index.html'));
  const portArg = process.argv.indexOf('--port');
  const port = Number(portArg >= 0 ? process.argv[portArg + 1] : process.env.PORT || 4173);
  createSiteServer().listen(port, '127.0.0.1', () => console.log(`Combined site: http://127.0.0.1:${port}/`));
}
