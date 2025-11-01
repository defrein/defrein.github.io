const THEME_KEY = 'story_theme_v1';

function safeGetItem(key) {
	try { return localStorage.getItem(key); } catch (e) { return null; }
}

function safeSetItem(key, value) {
	try { localStorage.setItem(key, value); } catch (e) { /* ignore */ }
}

function getThemeFromDocument() {
	return document.documentElement.classList.contains('theme-dark') ? 'dark' : 'light';
}

function setTheme(theme) {
	if (theme === 'dark') document.documentElement.classList.add('theme-dark');
	else document.documentElement.classList.remove('theme-dark');
	safeSetItem(THEME_KEY, theme);
	updateThemeButtons(theme);
}

function toggleTheme() {
	const stored = safeGetItem(THEME_KEY);
	const current = stored || getThemeFromDocument() || 'light';
	const next = current === 'light' ? 'dark' : 'light';
	setTheme(next);
}

document.addEventListener('DOMContentLoaded', () => {
	// attach to any theme-toggle buttons present on the page
	const btns = document.querySelectorAll('#theme-toggle');
	btns.forEach(b => b.addEventListener('click', toggleTheme));

		// apply stored theme (fallback-safe)
		let stored = safeGetItem(THEME_KEY);
		if (stored) {
			stored = String(stored).toLowerCase();
			if (stored !== 'light' && stored !== 'dark') stored = null;
		}

		if (stored) {
			console.debug('Theme: applying stored preference ->', stored);
			setTheme(stored);
		} else {
			// no stored preference: use system preference if available, otherwise leave default
			const prefersDark = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
			const initial = prefersDark ? 'dark' : 'light';
			console.debug('Theme: no stored preference; using system preference ->', initial);
			setTheme(initial);
		}

	// If on index.html -> render list
	if (document.getElementById('story-list')) renderList();

	// If on reader.html and url contains ?id=... -> load story
	if (document.getElementById('story-article')) {
		const params = new URLSearchParams(location.search);
		const id = params.get('id');
		if (id) loadStory(id);
		else document.getElementById('story-content').textContent = 'ID cerita tidak ditemukan.';
	}
});

function updateThemeButtons(theme){
	const btns = document.querySelectorAll('#theme-toggle');
	btns.forEach(b => {
		if (!b) return;
		// set a clear label/icon for accessibility and visual feedback
		if (theme === 'dark') {
			b.innerHTML = '<span class="icon">🌙</span><span class="label">Gelap</span>';
			b.setAttribute('aria-pressed','true');
		} else {
			b.innerHTML = '<span class="icon">☀️</span><span class="label">Terang</span>';
			b.setAttribute('aria-pressed','false');
		}
	});
}

function renderList() {
	fetch('data/stories.json').then(r => r.json()).then(stories => {
		const list = document.getElementById('story-list');
		list.innerHTML = '';
		stories.forEach(s => {
				const el = document.createElement('a');
				el.href = `reader.html?id=${encodeURIComponent(s.id)}`;
				el.className = 'list-item';
				let thumb = '';
				if (s.image) {
					thumb = `<div class="thumb"><img src="${escapeHtml(s.image)}" alt="${escapeHtml(s.title)}" loading="lazy"></div>`;
				}
				el.innerHTML = `${thumb}<div class="list-body"><h3>${escapeHtml(s.title)}</h3><p class="excerpt">${escapeHtml(s.excerpt || '')}</p></div>`;
				list.appendChild(el);
		});
	}).catch(err => {
		document.getElementById('story-list').textContent = 'Gagal memuat daftar cerita.';
		console.error(err);
	});
}

function loadStory(id) {
	fetch('data/stories.json').then(r => r.json()).then(stories => {
		const s = stories.find(x => x.id === id);
		if (!s) { document.getElementById('story-content').textContent = 'Cerita tidak ditemukan.'; return; }
		document.getElementById('story-title').textContent = s.title;
		// render header image if available
		const header = document.getElementById('story-header');
		if (header) {
			if (s.image) header.innerHTML = `<img class="story-header-img" src="${escapeHtml(s.image)}" alt="${escapeHtml(s.title)}">`;
			else header.innerHTML = '';
		}
		fetch(`data/${s.file}`).then(r => r.text()).then(md => {
			document.getElementById('story-content').innerHTML = renderMarkdown(md);
			// make images/links open in new tab
			document.querySelectorAll('#story-content a').forEach(a => a.setAttribute('target','_blank'));
		});
	}).catch(err => {
		document.getElementById('story-content').textContent = 'Gagal memuat cerita.';
		console.error(err);
	});
}

// very small markdown renderer covering headings, paragraphs, blockquote, hr, bold, and italic
function renderMarkdown(md) {
	const lines = md.replace(/\r/g, '').split('\n');
	let out = '';
	let inParagraph = false;
	let inBlock = false;
	lines.forEach(line => {
		if (/^---+$/.test(line)) { out += '<hr>'; return; }
		if (/^>\s?/.test(line)) {
			if (!inBlock) { out += '<blockquote>'; inBlock = true; }
			out += processInline(line.replace(/^>\s?/, '')) + '\n\n';
			return;
		} else if (inBlock) { out += '</blockquote>'; inBlock = false; }

		const h = line.match(/^(#{1,6})\s+(.*)$/);
		if (h) { 
			out += `<h${h[1].length}>${processInline(h[2])}</h${h[1].length}>`; 
			inParagraph = false; 
			return; 
		}

		if (line.trim() === '') { 
			if (inParagraph) { out += '</p>'; inParagraph = false; } 
			return; 
		}

		if (!inParagraph) { out += '<p>'; inParagraph = true; }
		out += processInline(line) + '\n';
	});
	if (inParagraph) out += '</p>';
	if (inBlock) out += '</blockquote>';
	return out;
}

// process inline markdown: bold (**text** or __text__) and italic (*text* or _text_)
function processInline(text) {
	// escape HTML first
	let result = escapeHtml(text);
	
	// bold: **text** or __text__
	result = result.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
	result = result.replace(/__(.+?)__/g, '<strong>$1</strong>');
	
	// italic: *text* or _text_ (but not inside words)
	result = result.replace(/\*([^*]+?)\*/g, '<em>$1</em>');
	result = result.replace(/\b_([^_]+?)_\b/g, '<em>$1</em>');
	
	return result;
}

function escapeHtml(s) {
	return String(s)
		.replace(/&/g,'&amp;')
		.replace(/</g,'&lt;')
		.replace(/>/g,'&gt;')
		.replace(/"/g,'&quot;');
}
