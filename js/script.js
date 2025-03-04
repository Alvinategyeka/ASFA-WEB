// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark Mode Toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDarkMode);
});

// Check Local Storage for Dark Mode Preference
if (localStorage.getItem('dark-mode') === 'true') {
    body.classList.add('dark-mode');
}

// Scroll Animations
const sections = document.querySelectorAll('section');

const checkVisibility = () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        if (sectionTop < window.innerHeight && sectionBottom > 0) {
            section.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Animated Statistics
const statNumbers = document.querySelectorAll('.stat-number');

const animateStats = () => {
    statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const increment = target / 100;
        let count = 0;

        const updateNumber = () => {
            if (count < target) {
                count += increment;
                stat.textContent = Math.ceil(count);
                setTimeout(updateNumber, 20);
            } else {
                stat.textContent = target;
            }
        };

        updateNumber();
    });
};

// Trigger animation when section is visible
const statsSection = document.getElementById('statistics');

const checkStatsVisibility = () => {
    const sectionTop = statsSection.getBoundingClientRect().top;
    const sectionBottom = statsSection.getBoundingClientRect().bottom;
    if (sectionTop < window.innerHeight && sectionBottom > 0) {
        animateStats();
        window.removeEventListener('scroll', checkStatsVisibility);
    }
};

window.addEventListener('scroll', checkStatsVisibility);