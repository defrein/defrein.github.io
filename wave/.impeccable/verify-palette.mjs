import { chromium } from '@playwright/test';
import { writeFile } from 'node:fs/promises';

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
for (const width of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:4322/wave/', { waitUntil: 'networkidle' });
  const result = await page.evaluate(() => {
    const rgb = value => (value.match(/[\d.]+/g) || []).map(Number);
    const luminance = color => rgb(color).slice(0, 3).map(channel => {
      const c = channel / 255;
      return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
    }).reduce((sum, channel, index) => sum + channel * [.2126, .7152, .0722][index], 0);
    const background = element => {
      for (let current = element; current; current = current.parentElement) {
        const color = getComputedStyle(current).backgroundColor;
        const values = rgb(color);
        if (values.length === 3 || values[3] === 1) return color;
      }
      return 'rgb(255,255,255)';
    };
    const failures = [];
    let checked = 0;
    for (const element of document.querySelectorAll('h1,h2,h3,h4,p,span,a,button,li')) {
      const style = getComputedStyle(element);
      if (!element.getClientRects().length || style.visibility === 'hidden' || element.closest('[aria-hidden="true"]')) continue;
      const text = [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent).join('').trim();
      if (!text) continue;
      const foreground = luminance(style.color);
      const ground = luminance(background(element));
      const ratio = (Math.max(foreground, ground) + .05) / (Math.min(foreground, ground) + .05);
      const size = parseFloat(style.fontSize);
      const large = size >= 24 || (size >= 18.66 && Number(style.fontWeight) >= 700);
      const minimum = large ? 3 : 4.5;
      checked++;
      if (ratio < minimum) failures.push({ text: text.slice(0, 65), color: style.color, background: background(element), ratio: +ratio.toFixed(2), minimum });
    }
    const root = getComputedStyle(document.documentElement);
    return {
      checked,
      failures,
      palette: Object.fromEntries(['purple', 'cyan', 'paper', 'ink'].map(token => [token, root.getPropertyValue(`--${token}`).trim()])),
      overflow: document.documentElement.scrollWidth > innerWidth,
    };
  });
  console.log(JSON.stringify({ width, ...result }));
  results.push({ width, ...result });
  await page.close();
}
await browser.close();
await writeFile(new URL('./review/palette-check.json', import.meta.url), JSON.stringify(results, null, 2));
if (results.some(result => result.failures.length || result.overflow)) throw new Error('Palette contrast or overflow check failed');
