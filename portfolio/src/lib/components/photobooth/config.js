// CSS filter strings — applied to the live preview AND used when compositing
// the final image so the preview matches the saved photo.
export const FILTERS = [
	{ id: 'none',     label: 'Original', css: 'none', accent: '#ffd6e8' },
	{ id: 'vintage',  label: 'Vintage',  css: 'sepia(0.45) contrast(1.05) saturate(1.15) brightness(1.02)', accent: '#f6c89c' },
	{ id: 'mono',     label: 'Mono',     css: 'grayscale(1) contrast(1.08)', accent: '#cfcfd6' },
	{ id: 'vivid',    label: 'Vivid',    css: 'saturate(1.6) contrast(1.05)', accent: '#ff8fbe' },
	{ id: 'cool',     label: 'Cool',     css: 'hue-rotate(-12deg) saturate(1.2) brightness(1.04)', accent: '#8ec8f4' },
	{ id: 'warm',     label: 'Warm',     css: 'hue-rotate(8deg) saturate(1.25) brightness(1.06) contrast(0.98)', accent: '#ffc28e' },
	{ id: 'dreamy',   label: 'Dreamy',   css: 'brightness(1.1) contrast(0.92) saturate(1.1) blur(0.4px)', accent: '#e4d6ff' },
	{ id: 'pinky',    label: 'Pinky',    css: 'saturate(1.3) brightness(1.05) hue-rotate(-6deg) contrast(1.02)', accent: '#ffb8d6' },
	{ id: 'matcha',   label: 'Matcha',   css: 'hue-rotate(-26deg) saturate(1.15) brightness(1.05)', accent: '#8eecaa' },
	{ id: 'noir',     label: 'Noir',     css: 'grayscale(1) contrast(1.4) brightness(0.92)', accent: '#4a2a3d' }
];

export const FRAMES = [
	{ id: 'none', label: 'Polos', accent: '#ffd6e8', svg: () => '' },
	{
		id: 'hearts',
		label: 'Hati',
		accent: '#ff8fbe',
		svg: (w, h) => {
			const heart = (cx, cy, s, c, r = 0) => `
				<g transform="translate(${cx} ${cy}) rotate(${r}) scale(${s})">
					<path d="M0,4 C-6,-3 -14,1 -14,8 C-14,16 0,24 0,24 C0,24 14,16 14,8 C14,1 6,-3 0,4 Z" fill="${c}" opacity="0.9"/>
				</g>`;
			return [
				heart(34, 38, 0.7, '#ff6aa8', -15),
				heart(w - 40, 46, 0.55, '#ffb8d6', 18),
				heart(48, h - 46, 0.6, '#ffd6e8', 10),
				heart(w - 36, h - 38, 0.75, '#ff8fbe', -8)
			].join('');
		}
	},
	{
		id: 'stars',
		label: 'Bintang',
		accent: '#ffe97a',
		svg: (w, h) => {
			const star = (cx, cy, s, c, r = 0) => `
				<g transform="translate(${cx} ${cy}) rotate(${r}) scale(${s})">
					<path d="M0,-12 L3.5,-3.7 L12,-2.7 L5.6,3.2 L7.4,11.6 L0,7 L-7.4,11.6 L-5.6,3.2 L-12,-2.7 L-3.5,-3.7 Z" fill="${c}" opacity="0.95"/>
				</g>`;
			return [
				star(36, 36, 0.9, '#ffe97a', 12),
				star(w - 42, 50, 0.7, '#fff5b8', -10),
				star(54, h - 50, 0.6, '#ffd6e8', 22),
				star(w - 38, h - 42, 1, '#ff8fbe', -18),
				star(w / 2, 26, 0.5, '#9a72f0', 0)
			].join('');
		}
	},
	{
		id: 'flowers',
		label: 'Bunga',
		accent: '#c9b3ff',
		svg: (w, h) => {
			const flower = (cx, cy, s, c) => {
				const petals = [];
				for (let i = 0; i < 6; i++) {
					const a = (i * 60 * Math.PI) / 180;
					const px = Math.cos(a) * 9;
					const py = Math.sin(a) * 9;
					petals.push(`<circle cx="${px}" cy="${py}" r="6" fill="${c}" opacity="0.9"/>`);
				}
				return `<g transform="translate(${cx} ${cy}) scale(${s})">${petals.join('')}<circle cx="0" cy="0" r="4" fill="#ffe97a"/></g>`;
			};
			return [
				flower(38, 42, 0.85, '#ffb8d6'),
				flower(w - 44, 50, 0.7, '#c9b3ff'),
				flower(50, h - 50, 0.75, '#8eecaa'),
				flower(w - 38, h - 40, 0.9, '#ffb8d6')
			].join('');
		}
	},
	{
		id: 'dots',
		label: 'Polkadot',
		accent: '#ffb8d6',
		svg: (w, h) => {
			const cols = Math.ceil(w / 36);
			const rows = Math.ceil(h / 36);
			const dots = [];
			for (let r = 0; r < rows; r++) {
				for (let c = 0; c < cols; c++) {
					if (r > 1 && r < rows - 2 && c > 1 && c < cols - 2) continue;
					const cx = 18 + c * 36 + (r % 2 ? 18 : 0);
					const cy = 18 + r * 36;
					dots.push(`<circle cx="${cx}" cy="${cy}" r="3" fill="#ff8fbe" opacity="0.55"/>`);
				}
			}
			return dots.join('');
		}
	},
	{
		id: 'tape',
		label: 'Selotip',
		accent: '#fff5b8',
		svg: (w, h) => {
			const tape = (x, y, rot, color) => `
				<g transform="translate(${x} ${y}) rotate(${rot})">
					<rect x="-30" y="-9" width="60" height="18" fill="${color}" opacity="0.78"/>
					<rect x="-30" y="-9" width="60" height="18" fill="white" opacity="0.18"/>
				</g>`;
			return [
				tape(40, 20, -18, '#ffe97a'),
				tape(w - 40, 22, 14, '#ffb8d6'),
				tape(46, h - 18, 10, '#c9b3ff'),
				tape(w - 46, h - 22, -12, '#8eecaa')
			].join('');
		}
	}
];

export const LAYOUTS = [
	{
		id: 'single',
		label: 'Tunggal',
		count: 1,
		aspect: 4 / 3,
		cellAspect: 4 / 3,
		cells: [{ x: 0, y: 0, w: 1, h: 1 }]
	},
	{
		id: 'duo',
		label: 'Duo',
		count: 2,
		aspect: 4 / 3,
		cellAspect: 2 / 3,
		cells: [
			{ x: 0, y: 0, w: 0.49, h: 1 },
			{ x: 0.51, y: 0, w: 0.49, h: 1 }
		]
	},
	{
		id: 'strip',
		label: 'Strip 4',
		count: 4,
		aspect: 1 / 3,
		cellAspect: 4 / 3,
		cells: [
			{ x: 0, y: 0,     w: 1, h: 0.235 },
			{ x: 0, y: 0.255, w: 1, h: 0.235 },
			{ x: 0, y: 0.510, w: 1, h: 0.235 },
			{ x: 0, y: 0.765, w: 1, h: 0.235 }
		]
	},
	{
		id: 'grid',
		label: 'Grid 2x2',
		count: 4,
		aspect: 1,
		cellAspect: 1,
		cells: [
			{ x: 0,    y: 0,    w: 0.49, h: 0.49 },
			{ x: 0.51, y: 0,    w: 0.49, h: 0.49 },
			{ x: 0,    y: 0.51, w: 0.49, h: 0.49 },
			{ x: 0.51, y: 0.51, w: 0.49, h: 0.49 }
		]
	},
	{
		id: 'trio',
		label: 'Trio',
		count: 3,
		aspect: 1 / 2,
		cellAspect: 4 / 3,
		cells: [
			{ x: 0, y: 0,    w: 1, h: 0.32 },
			{ x: 0, y: 0.34, w: 1, h: 0.32 },
			{ x: 0, y: 0.68, w: 1, h: 0.32 }
		]
	}
];

export const TEMPLATES = [
	{
		id: 'pink-strip',
		label: 'Pink Strip',
		layoutId: 'strip',
		bg: '#ffe4f1',
		border: '#ff8fbe',
		caption: { text: 'cute moments', color: '#e84d8c', font: '600 italic 28px Quicksand' },
		accent: '#ff8fbe'
	},
	{
		id: 'cream-grid',
		label: 'Cream Grid',
		layoutId: 'grid',
		bg: '#fff8f0',
		border: '#c9b3ff',
		caption: { text: 'sweet day', color: '#9a72f0', font: '700 30px Quicksand' },
		accent: '#c9b3ff'
	},
	{
		id: 'mint-duo',
		label: 'Mint Duo',
		layoutId: 'duo',
		bg: '#e6fbed',
		border: '#8eecaa',
		caption: { text: 'with you', color: '#2f8a55', font: '600 italic 28px Quicksand' },
		accent: '#8eecaa'
	},
	{
		id: 'sunny-single',
		label: 'Sunny',
		layoutId: 'single',
		bg: '#fff5b8',
		border: '#ffd56b',
		caption: { text: 'sunshine', color: '#c08a00', font: '700 italic 30px Quicksand' },
		accent: '#ffd56b'
	},
	{
		id: 'lavender-trio',
		label: 'Lavender',
		layoutId: 'trio',
		bg: '#ece4ff',
		border: '#c9b3ff',
		caption: { text: 'softie', color: '#7a4ed6', font: '600 italic 28px Quicksand' },
		accent: '#c9b3ff'
	},
	{
		id: 'sky-strip',
		label: 'Sky',
		layoutId: 'strip',
		bg: '#e1f1ff',
		border: '#8ec8f4',
		caption: { text: 'daydream', color: '#3978b8', font: '600 italic 28px Quicksand' },
		accent: '#8ec8f4'
	}
];

export const COUNTDOWN_OPTIONS = [0, 3, 5];
