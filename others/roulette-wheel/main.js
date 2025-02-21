
// Initialize variables
let sections = [];
let isSpinning = false;
let results = [];

let colors = [
    '#B8DDE9', // Soft Sky Blue
    '#436F84', // Steel Blue
    '#1B4B45', // Deep Teal
    '#739168', // Olive Green
    '#EB9FAD', // Salmon Pink
    '#F5C4D8', // Soft Pink
    '#1C1F35', // Navy Blue
    '#9DC0D4', // Medium Sky Blue
    '#5A8A9F', // Ocean Blue
    '#2D635C', // Medium Teal
    '#8CAB82', // Sage Green
    '#557553', // Forest Green
    '#F3B5C1', // Light Coral
    '#E788A0', // Dusty Rose
    '#D5A2C7', // Mauve Pink
    '#2F3654', // Dark Navy
    '#4A5072', // Slate Blue
    '#7B97A3', // Cloudy Blue
    '#346356', // Pine Green
    '#91B5A3', // Mint Green
    '#B8C6A9', // Light Sage
    '#DEB5C3', // Vintage Rose
    '#C7D6DE', // Ice Blue
    '#8B4B65', // Deep Rose
    '#A68EA7', // Dusty Purple
    '#6D8C95', // Storm Blue
    '#AFC4BE', // Misty Green
    '#E2D5D8', // Shell Pink
    '#9BAFC1'  // Overcast Blue
];


// DOM elements
const wheelElement = document.getElementById('wheel');
const wheelStatsElement = document.getElementById('wheelStats');
const sectionInput = document.getElementById('sectionInput');
const sectionListContainer = document.getElementById('sectionList');
const resultsContainer = document.getElementById('results');
const confettiContainer = document.getElementById('confettiContainer');

// Load data from localStorage
function loadFromLocalStorage() {
    try {
        const savedSections = localStorage.getItem('equalRouletteWheelSections');
        const savedResults = localStorage.getItem('equalRouletteWheelResults');

        if (savedSections) {
            sections = JSON.parse(savedSections);
        }

        if (savedResults) {
            results = JSON.parse(savedResults);
        }
    } catch (e) {
        console.error("Error loading from localStorage:", e);
        sections = [];
        results = [];
    }
}

// Save data to localStorage
function saveToLocalStorage() {
    try {
        localStorage.setItem('equalRouletteWheelSections', JSON.stringify(sections));
        localStorage.setItem('equalRouletteWheelResults', JSON.stringify(results));
    } catch (e) {
        console.error("Error saving to localStorage:", e);
    }
}

// Update wheel statistics
function updateWheelStats() {
    if (sections.length === 0) {
        wheelStatsElement.textContent = '';
        return;
    }

    const equalPercentage = (100 / sections.length).toFixed(2);
    wheelStatsElement.textContent = `${sections.length} equal sections (${equalPercentage}% each)`;
}

// Render the wheel with equal sections
function renderWheel() {
    // Clear previous wheel
    wheelElement.innerHTML = '';

    if (sections.length === 0) {
        return;
    }

    // Handle single section case (full circle)
    if (sections.length === 1) {
        const fullCircle = document.createElement('div');
        fullCircle.style.position = 'absolute';
        fullCircle.style.width = '100%';
        fullCircle.style.height = '100%';
        fullCircle.style.backgroundColor = colors[0];

        const label = document.createElement('div');
        label.className = 'section-label';
        label.textContent = sections[0];
        label.style.left = '50%';
        label.style.top = '50%';

        fullCircle.appendChild(label);
        wheelElement.appendChild(fullCircle);
        return;
    }

    // Handle multiple sections
    const sectionAngle = 360 / sections.length;
    const radius = wheelElement.clientWidth / 2;

    // Create sectors using conic gradients for better performance
    if (sections.length > 1) {
        // Build a conic gradient for the background
        let gradientStops = [];
        sections.forEach((_, i) => {
            const startPercent = (i / sections.length * 100).toFixed(2);
            const endPercent = ((i + 1) / sections.length * 100).toFixed(2);
            gradientStops.push(`${colors[i % colors.length]} ${startPercent}% ${endPercent}%`);
        });

        wheelElement.style.background = `conic-gradient(${gradientStops.join(', ')})`;

        // Add labels to each section
        sections.forEach((section, i) => {
            const angle = i * sectionAngle + (sectionAngle / 2);
            const radians = (angle - 90) * (Math.PI / 180); // -90 to start from top

            // Calculate position for middle of the sector
            const x = radius + Math.cos(radians) * radius * 0.6;
            const y = radius + Math.sin(radians) * radius * 0.6;

            const label = document.createElement('div');
            label.className = 'section-label';
            label.textContent = section;
            label.style.left = `${x}px`;
            label.style.top = `${y}px`;

            wheelElement.appendChild(label);
        });
    }
}

// Render section list
function renderSectionList() {
    sectionListContainer.innerHTML = '';

    if (sections.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No sections added yet';
        sectionListContainer.appendChild(emptyMessage);
        return;
    }

    const fragment = document.createDocumentFragment();

    sections.forEach((section, index) => {
        const sectionItem = document.createElement('div');
        sectionItem.className = 'section-item';

        const colorIndicator = document.createElement('div');
        colorIndicator.className = 'color-indicator';
        colorIndicator.style.backgroundColor = colors[index % colors.length];

        const textSpan = document.createElement('span');
        textSpan.className = 'section-text';
        textSpan.textContent = section;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'X';
        deleteBtn.onclick = () => deleteSection(index);

        sectionItem.appendChild(colorIndicator);
        sectionItem.appendChild(textSpan);
        sectionItem.appendChild(deleteBtn);
        fragment.appendChild(sectionItem);
    });

    sectionListContainer.appendChild(fragment);
}

// Render results history
function renderResults() {
    resultsContainer.innerHTML = '';

    if (results.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'No results yet';
        resultsContainer.appendChild(emptyMessage);
        return;
    }

    const fragment = document.createDocumentFragment();

    results.forEach((result, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.textContent = `${index + 1}. ${result.time}: ${result.value}`;
        fragment.appendChild(resultItem);
    });

    resultsContainer.appendChild(fragment);
}

// Add a new section to the wheel
function addSection() {
    const value = sectionInput.value.trim();

    if (value) {
        sections.push(value);
        sectionInput.value = '';

        updateUI();
    }
}

// Delete section
function deleteSection(index) {
    if (isSpinning) return;

    sections.splice(index, 1);
    updateUI();
}

// Update all UI elements
function updateUI() {
    renderWheel();
    renderSectionList();
    updateWheelStats();
    saveToLocalStorage();
}

// Spin the wheel
function spinWheel() {
    if (isSpinning || sections.length < 1) {
        if (sections.length < 1) {
            alert("Please add at least 1 section to spin the wheel");
        }
        return;
    }

    isSpinning = true;
    document.getElementById('spinWheel').disabled = true;

    // Random rotation between 3600 and 7200 degrees (10-20 full rotations)
    const rotation = 3600 + Math.random() * 3600;

    // Calculate the final position
    const currentRotation = getComputedStyle(wheelElement).transform;
    let currentAngle = 0;

    if (currentRotation !== 'none') {
        try {
            const values = currentRotation.split('(')[1].split(')')[0].split(',');
            currentAngle = Math.round(Math.atan2(values[1], values[0]) * (180 / Math.PI));
            if (currentAngle < 0) currentAngle += 360;
        } catch (e) {
            console.log("Error calculating current angle:", e);
        }
    }

    const totalRotation = rotation + currentAngle;
    wheelElement.style.transform = `rotate(${totalRotation}deg)`;

    setTimeout(() => {
        // Calculate which section landed on the pointer
        const finalAngle = totalRotation % 360;
        const normalizedAngle = (360 - finalAngle) % 360;

        // Since all sections are equal size, we can just divide
        const sectionAngle = 360 / sections.length;
        const sectionIndex = Math.floor(normalizedAngle / sectionAngle);

        // Record the result
        const now = new Date();
        const timeString = now.toLocaleTimeString() + ' ' + now.toLocaleDateString();

        results.unshift({
            time: timeString,
            value: sections[sectionIndex]
        });

        renderResults();
        saveToLocalStorage();

        // Trigger confetti
        createConfetti();

        isSpinning = false;
        document.getElementById('spinWheel').disabled = false;
    }, 5000);
}

// Reset the wheel (remove all sections)
function resetWheel() {
    if (isSpinning) return;

    sections = [];
    
    // Clear the wheel element's content and styles
    wheelElement.innerHTML = '';
    wheelElement.style.background = '';
    
    updateUI();
}

// Clear results history
function clearResults() {
    results = [];
    renderResults();
    saveToLocalStorage();
}

// Create confetti
function createConfetti() {
    const confettiCount = 100;
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
        confettiContainer.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Event listeners
document.getElementById('addSection').addEventListener('click', addSection);
document.getElementById('spinWheel').addEventListener('click', spinWheel);
document.getElementById('resetWheel').addEventListener('click', resetWheel);
document.getElementById('clearResults').addEventListener('click', clearResults);

sectionInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addSection();
    }
});

// Initialize
loadFromLocalStorage();
updateUI();

// Add default sections if none exist
if (sections.length === 0) {
    sections = ['Option 1', 'Option 2', 'Option 3'];
    updateUI();
}

// Handle window resize efficiently
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        renderWheel();
    }, 100);
});