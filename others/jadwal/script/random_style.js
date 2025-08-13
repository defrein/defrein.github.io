const cssFiles = [
    'styles/glassmorphism.css',
    'styles/neumorphism.css',
    'styles/flat.css',
    'styles/academic.css',
    'styles/cyberpunk.css',
    'styles/coffee.css',
    'styles/programming.css',
    'styles/pinky.css',
    'styles/forest.css',
    'styles/modern.css',

];

// Ambil tanggal hari ini
const today = new Date().toDateString();
let chosenCSS;

if (localStorage.getItem('themeDate') === today) {
    chosenCSS = localStorage.getItem('themeFile');
} else {
    // Ensure a new random CSS file is chosen each day
    let previousCSS = localStorage.getItem('themeFile');
    do {
        chosenCSS = cssFiles[Math.floor(Math.random() * cssFiles.length)];
    } while (chosenCSS === previousCSS);

    localStorage.setItem('themeDate', today);
    localStorage.setItem('themeFile', chosenCSS);
}

// Pasang CSS ke halaman
document.addEventListener("DOMContentLoaded", () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = chosenCSS;
    document.head.appendChild(link);
});
