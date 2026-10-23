// Shared collage geometry — used by both the interactive editor (as CSS
// percentages) and the PNG exporter (as pixels at `base` resolution), so what
// the user arranges on screen is exactly what gets saved.

const PAD_RATIO = 0.045; // outer padding, as a fraction of card width
const CAPTION_RATIO = 0.1; // caption strip height, as a fraction of card width

/**
 * @param {{aspect:number, cells:{x:number,y:number,w:number,h:number}[]}} layout
 * @param {boolean} hasCaption
 * @param {number} base   output width in px (also the reference for pct → px)
 */
export function geometry(layout, hasCaption, base = 1400) {
	const pad = PAD_RATIO; // in width-units (0..1)
	const captionH = hasCaption ? CAPTION_RATIO : 0;
	const cellsW = 1 - pad * 2;
	const cellsH = cellsW / layout.aspect;
	const cardUnitH = pad * 2 + cellsH + captionH; // card height in width-units

	const canvasW = Math.round(base);
	const canvasH = Math.round(base * cardUnitH);

	const cells = layout.cells.map((cell) => {
		const x = pad + cell.x * cellsW;
		const y = pad + cell.y * cellsH;
		const w = cell.w * cellsW;
		const h = cell.h * cellsH;
		const wPx = w * base;
		const hPx = h * base;
		return {
			xPx: x * base,
			yPx: y * base,
			wPx,
			hPx,
			radiusPx: Math.round(Math.min(wPx, hPx) * 0.045),
			leftPct: x * 100,
			topPct: (y / cardUnitH) * 100,
			widthPct: w * 100,
			heightPct: (h / cardUnitH) * 100
		};
	});

	const captionCenterUnit = pad + cellsH + captionH / 2;

	return {
		pad,
		canvasW,
		canvasH,
		cardAspect: 1 / cardUnitH,
		cardUnitH,
		cells,
		caption: {
			centerPx: captionCenterUnit * base,
			centerPct: (captionCenterUnit / cardUnitH) * 100
		},
		border: {
			xPx: (pad - 0.007) * base,
			yPx: (pad - 0.007) * base,
			wPx: (cellsW + 0.014) * base,
			hPx: cellsH * base + 0.014 * base,
			rPx: Math.round(pad * 0.6 * base)
		}
	};
}
