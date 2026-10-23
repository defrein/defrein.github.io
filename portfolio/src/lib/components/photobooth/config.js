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

// ─────────────────────────────────────────────────────────────────────────────
// Stickers — hand-drawn doodle style.
// Each `body` is inner SVG markup drawn on a 0 0 100 100 viewBox, with a bold
// wobbly outline + flat pastel fills + rosy cheeks, so it reads as a cute
// marker drawing. Rendered both in the picker (inline) and onto the final
// canvas (serialised to a data URL), so placement in the editor matches export.
// ─────────────────────────────────────────────────────────────────────────────

/** Wrap sticker body markup in a full, standalone SVG string (for canvas export). */
export function stickerSvg(body) {
	return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">${body}</svg>`;
}

const INK = '#5b4636';

export const STICKERS = [
	{
		id: 'star',
		label: 'Bintang',
		body: `<g stroke="${INK}" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round">
			<path d="M50 11 L61 38 L90 40 L67 59 L75 88 L50 72 L25 88 L33 59 L10 40 L39 38 Z" fill="#ffd45e"/>
			<circle cx="42" cy="53" r="2.8" fill="${INK}" stroke="none"/>
			<circle cx="58" cy="53" r="2.8" fill="${INK}" stroke="none"/>
			<path d="M44 60 Q50 66 56 60" fill="none"/>
			<circle cx="35" cy="60" r="3.4" fill="#ff9ebb" stroke="none"/>
			<circle cx="65" cy="60" r="3.4" fill="#ff9ebb" stroke="none"/>
		</g>`
	},
	{
		id: 'heart',
		label: 'Hati',
		body: `<g stroke="#b24b6a" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round">
			<path d="M50 85 C16 60 11 35 28 23 C41 14 50 25 50 33 C50 25 59 14 72 23 C89 35 84 60 50 85 Z" fill="#ff7ba3"/>
			<path d="M33 36 Q39 29 46 34" fill="none" stroke="#ffd0dd" stroke-width="4.5"/>
		</g>`
	},
	{
		id: 'sparkle',
		label: 'Kerlip',
		body: `<g stroke="#7a5bbf" stroke-width="3.6" stroke-linejoin="round">
			<path d="M50 7 C55 35 65 45 93 50 C65 55 55 65 50 93 C45 65 35 55 7 50 C35 45 45 35 50 7 Z" fill="#c9a7ff"/>
			<path d="M50 28 C52 42 58 48 72 50 C58 52 52 58 50 72 C48 58 42 52 28 50 C42 48 48 42 50 28 Z" fill="#efe4ff" stroke="none"/>
		</g>`
	},
	{
		id: 'cloud',
		label: 'Awan',
		body: `<g stroke="#5a79a8" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round">
			<path d="M26 70 C11 70 10 50 25 48 C25 32 46 30 50 43 C56 30 79 34 76 50 C90 50 90 70 77 70 Z" fill="#bfe0ff"/>
			<circle cx="40" cy="56" r="2.6" fill="#5a79a8" stroke="none"/>
			<circle cx="58" cy="56" r="2.6" fill="#5a79a8" stroke="none"/>
			<path d="M42 60 Q49 66 56 60" fill="none"/>
			<circle cx="33" cy="61" r="3" fill="#ff9ebb" stroke="none"/>
			<circle cx="65" cy="61" r="3" fill="#ff9ebb" stroke="none"/>
		</g>`
	},
	{
		id: 'rainbow',
		label: 'Pelangi',
		body: `<g fill="none" stroke-linecap="round">
			<path d="M15 72 A35 35 0 0 1 85 72" stroke="#ff8f9c" stroke-width="7.5"/>
			<path d="M25 72 A25 25 0 0 1 75 72" stroke="#ffd36e" stroke-width="7.5"/>
			<path d="M35 72 A15 15 0 0 1 65 72" stroke="#8fd6a6" stroke-width="7.5"/>
			<circle cx="15" cy="75" r="8" fill="#ffffff" stroke="#b9c6da" stroke-width="3"/>
			<circle cx="85" cy="75" r="8" fill="#ffffff" stroke="#b9c6da" stroke-width="3"/>
		</g>`
	},
	{
		id: 'flower',
		label: 'Bunga',
		body: `<g stroke="#c56a95" stroke-width="3" stroke-linejoin="round">
			<g fill="#ffb3d1">
				<ellipse cx="50" cy="25" rx="10" ry="16"/>
				<ellipse cx="50" cy="25" rx="10" ry="16" transform="rotate(72 50 50)"/>
				<ellipse cx="50" cy="25" rx="10" ry="16" transform="rotate(144 50 50)"/>
				<ellipse cx="50" cy="25" rx="10" ry="16" transform="rotate(216 50 50)"/>
				<ellipse cx="50" cy="25" rx="10" ry="16" transform="rotate(288 50 50)"/>
			</g>
			<circle cx="50" cy="50" r="14" fill="#ffd45e"/>
			<circle cx="45" cy="49" r="2.2" fill="${INK}" stroke="none"/>
			<circle cx="55" cy="49" r="2.2" fill="${INK}" stroke="none"/>
			<path d="M45 55 Q50 59 55 55" fill="none" stroke="${INK}"/>
		</g>`
	},
	{
		id: 'sun',
		label: 'Matahari',
		body: `<g stroke-linecap="round" stroke-linejoin="round">
			<g stroke="#f0a92f" stroke-width="5">
				<line x1="50" y1="5" x2="50" y2="16"/>
				<line x1="50" y1="5" x2="50" y2="16" transform="rotate(45 50 50)"/>
				<line x1="50" y1="5" x2="50" y2="16" transform="rotate(90 50 50)"/>
				<line x1="50" y1="5" x2="50" y2="16" transform="rotate(135 50 50)"/>
				<line x1="50" y1="5" x2="50" y2="16" transform="rotate(180 50 50)"/>
				<line x1="50" y1="5" x2="50" y2="16" transform="rotate(225 50 50)"/>
				<line x1="50" y1="5" x2="50" y2="16" transform="rotate(270 50 50)"/>
				<line x1="50" y1="5" x2="50" y2="16" transform="rotate(315 50 50)"/>
			</g>
			<circle cx="50" cy="50" r="25" fill="#ffd45e" stroke="#e0932f" stroke-width="3.6"/>
			<circle cx="42" cy="48" r="2.8" fill="${INK}" stroke="none"/>
			<circle cx="58" cy="48" r="2.8" fill="${INK}" stroke="none"/>
			<path d="M43 56 Q50 63 57 56" fill="none" stroke="${INK}" stroke-width="3.2"/>
			<circle cx="36" cy="55" r="3.4" fill="#ff9ebb" stroke="none"/>
			<circle cx="64" cy="55" r="3.4" fill="#ff9ebb" stroke="none"/>
		</g>`
	},
	{
		id: 'moon',
		label: 'Bulan',
		body: `<g stroke="#7a6ab0" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round">
			<path d="M66 14 A37 37 0 1 0 66 86 A30 30 0 1 1 66 14 Z" fill="#cdbcff"/>
			<path d="M40 44 Q43 48 46 44" fill="none"/>
			<path d="M38 56 Q45 62 52 56" fill="none"/>
			<circle cx="34" cy="54" r="3" fill="#ff9ebb" stroke="none"/>
		</g>`
	},
	{
		id: 'bow',
		label: 'Pita',
		body: `<g stroke="#c04b76" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round">
			<path d="M50 50 L19 31 Q12 50 19 69 Z" fill="#ff8fb0"/>
			<path d="M50 50 L81 31 Q88 50 81 69 Z" fill="#ff8fb0"/>
			<path d="M50 50 L40 68 L60 68 Z" fill="#ff7aa6"/>
			<circle cx="50" cy="50" r="8" fill="#ff6f9c"/>
		</g>`
	},
	{
		id: 'boba',
		label: 'Boba',
		body: `<g stroke="#8a6a52" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round">
			<line x1="58" y1="30" x2="72" y2="9" stroke="#ff9ebb" stroke-width="6"/>
			<path d="M29 34 L71 34 L65 86 Q50 93 35 86 Z" fill="#e8c9a0"/>
			<path d="M29 34 L71 34 L69 52 L31 52 Z" fill="#f3e0c6" stroke="none"/>
			<rect x="25" y="26" width="50" height="9" rx="4.5" fill="#fff3e2"/>
			<g fill="${INK}" stroke="none">
				<circle cx="40" cy="80" r="4"/>
				<circle cx="52" cy="82" r="4"/>
				<circle cx="61" cy="78" r="4"/>
				<circle cx="46" cy="72" r="4"/>
			</g>
		</g>`
	},
	{
		id: 'strawberry',
		label: 'Stroberi',
		body: `<g stroke="#b83b4e" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round">
			<path d="M50 32 C75 32 83 51 68 73 C60 86 40 86 32 73 C17 51 25 32 50 32 Z" fill="#ff6b7a"/>
			<path d="M37 30 L50 17 L63 30 Q50 36 37 30 Z" fill="#7ec97e"/>
			<g fill="#fff4d6" stroke="none">
				<circle cx="43" cy="50" r="2.2"/><circle cx="57" cy="50" r="2.2"/>
				<circle cx="50" cy="62" r="2.2"/><circle cx="37" cy="62" r="2.2"/>
				<circle cx="63" cy="62" r="2.2"/><circle cx="44" cy="72" r="2.2"/><circle cx="56" cy="72" r="2.2"/>
			</g>
			<circle cx="40" cy="56" r="3" fill="#ff9ebb" stroke="none"/>
			<circle cx="60" cy="56" r="3" fill="#ff9ebb" stroke="none"/>
		</g>`
	},
	{
		id: 'cherry',
		label: 'Ceri',
		body: `<g stroke="#9c2f3e" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round" fill="none">
			<path d="M33 40 C50 22 66 28 70 40" stroke="#7ec97e" stroke-width="4"/>
			<path d="M33 40 C38 56 33 70 30 76"/>
			<path d="M70 40 C72 56 66 70 62 76"/>
			<circle cx="30" cy="79" r="12" fill="#ff5d6c"/>
			<circle cx="62" cy="79" r="12" fill="#ff5d6c"/>
			<path d="M26 75 Q30 72 34 75" stroke="#ffd0d4" stroke-width="3"/>
		</g>`
	},
	{
		id: 'cat',
		label: 'Kucing',
		body: `<g stroke="#6b4b3a" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
			<circle cx="50" cy="55" r="28" fill="#ffd9a8"/>
			<path d="M30 34 L29 14 L47 27 Z" fill="#ffd9a8"/>
			<path d="M70 34 L71 14 L53 27 Z" fill="#ffd9a8"/>
			<circle cx="40" cy="53" r="3" fill="#6b4b3a" stroke="none"/>
			<circle cx="60" cy="53" r="3" fill="#6b4b3a" stroke="none"/>
			<path d="M46 61 L50 64 L54 61" fill="none"/>
			<circle cx="32" cy="61" r="3.6" fill="#ff9ebb" stroke="none"/>
			<circle cx="68" cy="61" r="3.6" fill="#ff9ebb" stroke="none"/>
			<g stroke="#6b4b3a" stroke-width="2.2">
				<line x1="15" y1="54" x2="29" y2="56"/><line x1="15" y1="63" x2="29" y2="62"/>
				<line x1="85" y1="54" x2="71" y2="56"/><line x1="85" y1="63" x2="71" y2="62"/>
			</g>
		</g>`
	},
	{
		id: 'bunny',
		label: 'Kelinci',
		body: `<g stroke="#9a7a86" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
			<ellipse cx="38" cy="25" rx="8" ry="20" fill="#ffffff"/>
			<ellipse cx="62" cy="25" rx="8" ry="20" fill="#ffffff"/>
			<ellipse cx="38" cy="27" rx="3.4" ry="12" fill="#ffc7de" stroke="none"/>
			<ellipse cx="62" cy="27" rx="3.4" ry="12" fill="#ffc7de" stroke="none"/>
			<circle cx="50" cy="62" r="24" fill="#ffffff"/>
			<circle cx="42" cy="60" r="2.8" fill="#9a7a86" stroke="none"/>
			<circle cx="58" cy="60" r="2.8" fill="#9a7a86" stroke="none"/>
			<path d="M47 67 L50 70 L53 67" fill="none"/>
			<circle cx="34" cy="67" r="3.4" fill="#ff9ebb" stroke="none"/>
			<circle cx="66" cy="67" r="3.4" fill="#ff9ebb" stroke="none"/>
		</g>`
	},
	{
		id: 'butterfly',
		label: 'Kupu',
		body: `<g stroke="#6a4fa0" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
			<path d="M50 50 C30 18 9 30 17 48 C9 68 35 76 50 55 Z" fill="#c9a7ff"/>
			<path d="M50 50 C70 18 91 30 83 48 C91 68 65 76 50 55 Z" fill="#c9a7ff"/>
			<circle cx="31" cy="38" r="4" fill="#fff0a8" stroke="none"/>
			<circle cx="69" cy="38" r="4" fill="#fff0a8" stroke="none"/>
			<ellipse cx="50" cy="50" rx="4" ry="22" fill="#6a4fa0" stroke="none"/>
			<path d="M46 30 C42 20 38 18 34 16" fill="none"/>
			<path d="M54 30 C58 20 62 18 66 16" fill="none"/>
		</g>`
	},
	{
		id: 'music',
		label: 'Nada',
		body: `<g stroke="#3a4a7a" stroke-width="3.4" stroke-linejoin="round" stroke-linecap="round">
			<path d="M40 74 V27 L74 19 V60" fill="none" stroke="#4a5aa0" stroke-width="5"/>
			<ellipse cx="32" cy="76" rx="11" ry="8" fill="#6a7ad0" transform="rotate(-18 32 76)"/>
			<ellipse cx="66" cy="62" rx="11" ry="8" fill="#6a7ad0" transform="rotate(-18 66 62)"/>
		</g>`
	},
	{
		id: 'bolt',
		label: 'Kilat',
		body: `<g stroke="#d99a1f" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round">
			<path d="M57 7 L27 55 L46 55 L40 93 L73 41 L52 41 Z" fill="#ffd45e"/>
		</g>`
	},
	{
		id: 'crown',
		label: 'Mahkota',
		body: `<g stroke="#c79a2f" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round">
			<path d="M19 73 L15 33 L34 50 L50 23 L66 50 L85 33 L81 73 Z" fill="#ffd83f"/>
			<line x1="19" y1="73" x2="81" y2="73" stroke-width="5"/>
			<circle cx="15" cy="33" r="4.5" fill="#ff8fb0"/>
			<circle cx="50" cy="23" r="4.5" fill="#ff8fb0"/>
			<circle cx="85" cy="33" r="4.5" fill="#8fd6ff"/>
		</g>`
	},
	{
		id: 'smiley',
		label: 'Senyum',
		body: `<g stroke="#c98a3a" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round">
			<circle cx="50" cy="50" r="34" fill="#ffd36e"/>
			<path d="M38 42 Q40 38 43 42" fill="none"/>
			<path d="M57 42 Q60 38 62 42" fill="none"/>
			<path d="M35 58 Q50 72 65 58" fill="none" stroke-width="4"/>
			<circle cx="31" cy="55" r="4" fill="#ff9ebb" stroke="none"/>
			<circle cx="69" cy="55" r="4" fill="#ff9ebb" stroke="none"/>
		</g>`
	},
	{
		id: 'icecream',
		label: 'Es Krim',
		body: `<g stroke="#9a6a4a" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round">
			<path d="M35 50 L50 92 L65 50 Z" fill="#f0c088"/>
			<path d="M42 58 L48 52 M50 70 L58 58 M46 80 L55 68" stroke="#cf9a63" stroke-width="2.4" fill="none"/>
			<circle cx="40" cy="44" r="15" fill="#ff9ebb"/>
			<circle cx="60" cy="44" r="15" fill="#bfe6ff"/>
			<circle cx="50" cy="33" r="15" fill="#fff0a8"/>
			<circle cx="50" cy="20" r="4.5" fill="#ff6f9c"/>
		</g>`
	}
];
