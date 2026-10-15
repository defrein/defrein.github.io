import { mkdir, readFile, writeFile } from 'node:fs/promises';

// Preserve the supplied logo's pixels and alpha. Each SVG applies its color at
// render time, and its viewBox removes padding without modifying the PNG.
const source = new URL('../../v.2/img/d8p.png', import.meta.url);
const image = (await readFile(source)).toString('base64');
const logo = (viewBox, width, height, color = 'black') => {
  const channel = color === 'white' ? 1 : 0;
  const filter = `<defs><filter id="${color}" x="0" y="0" width="1280" height="1280" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 ${channel} 0 0 0 0 ${channel} 0 0 0 0 ${channel} 0 0 0 1 0"/></filter></defs>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}"><title>Wahni Adnani logo</title><!-- Source: repository owner supplied v.2/img/d8p.png; original PNG pixels and transparency preserved. ${color === 'white' ? 'White' : 'Black'} rendered with an SVG color matrix. -->${filter}<image width="1280" height="1280" href="data:image/png;base64,${image}" filter="url(#${color})"/></svg>\n`;
};

await mkdir(new URL('../public/brand/', import.meta.url), { recursive: true });
await writeFile(new URL('../public/brand/logo.svg', import.meta.url), logo('146 355 1029 549', 1029, 549));
await writeFile(new URL('../public/favicon.svg', import.meta.url), logo('122 91 1077 1077', 64, 64, 'white'));
console.log('Created black page logo and white favicon from the original supplied image.');
