import { mkdir, readFile, writeFile } from 'node:fs/promises';

// Preserve the supplied logo's pixels and alpha. The SVG applies black at render
// time, and its viewBox removes transparent padding without modifying the PNG.
const source = new URL('../../v.2/img/d8p.png', import.meta.url);
const image = (await readFile(source)).toString('base64');
const blackFilter = '<defs><filter id="black" x="0" y="0" width="1280" height="1280" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/></filter></defs>';
const logo = (viewBox, width, height) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}"><title>Wahni Adnani logo</title><!-- Source: repository owner supplied v.2/img/d8p.png; original PNG pixels and transparency preserved. Black rendered with an SVG color matrix. -->${blackFilter}<image width="1280" height="1280" href="data:image/png;base64,${image}" filter="url(#black)"/></svg>\n`;

await mkdir(new URL('../public/brand/', import.meta.url), { recursive: true });
await writeFile(new URL('../public/brand/logo.svg', import.meta.url), logo('146 355 1029 549', 1029, 549));
await writeFile(new URL('../public/favicon.svg', import.meta.url), logo('122 91 1077 1077', 64, 64));
console.log('Created black brand logo and square favicon from the original supplied image.');
