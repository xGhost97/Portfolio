// ============================================
// TRADUCTION FR / EN
// ============================================
// Même principe que portfolio.js : le français est lu dans le HTML,
// l'anglais est défini ici. La langue choisie est partagée avec le portfolio.
const translations = {
    en: {
        'meta.title': 'Résumé - Pierluigi SOPHIE',
        'cv.download': 'Download the résumé (PDF, French)',
        'cv.subtitle': 'Front-End Developer',
        'cv.skills': 'Skills',
        'cv.languages': 'Languages',
        'cv.french': 'French',
        'cv.native': 'Native',
        'cv.english': 'English',
        'cv.professional': 'Professional',
        'cv.interests': 'Interests',
        'cv.games': '🎮 Gaming',
        'cv.reading': '📚 Reading',
        'cv.music': '🎵 Music',
        'cv.astronomy': '🔭 Astronomy',
        'cv.profile': 'Profile',
        'cv.profileText': 'Passionate web developer with expertise in JavaScript and React. Specialized in building modern, high-performance web applications. Always looking for new challenges and eager to learn the latest web technologies.',
        'cv.experience': 'Professional Experience',
        'cv.present': '2023 - Present',
        'cv.personalProjects': 'Personal Projects',
        'cv.exp1a': 'Building web applications with React and Node.js',
        'cv.exp1b': 'REST API integration and MongoDB database management',
        'cv.exp1c': 'Performance optimization and responsive design',
        'cv.exp2a': 'Building responsive websites with HTML/CSS/JavaScript',
        'cv.exp2b': 'Using modern frameworks (React, Vue.js)',
        'cv.exp2c': 'Version control with Git and GitHub',
        'cv.education': 'Education',
        'cv.webDev': 'Web Developer',
        'cv.eduText': 'Intensive full-stack web development program covering HTML, CSS, JavaScript, React, Node.js and MongoDB.',
        'cv.projects': 'Main Projects',
        'cv.kasa': 'Kasa Project',
        'cv.kasaText': 'Rental application built entirely with React, featuring navigation and dynamic display of listings.',
        'cv.bluel': 'Sophie Bluel - Architect Portfolio',
        'cv.bluelText': 'Interactive portfolio website with user authentication, DOM manipulation and API integration for dynamic project management.',
        'cv.locText': 'Rental website with a modern design and a responsive layout optimized for every device.'
    },
    fr: {}
};

// Récupère le texte français d'origine depuis le HTML
translations.fr['meta.title'] = document.title;
document.querySelectorAll('[data-i18n]').forEach(el => {
    translations.fr[el.dataset.i18n] = el.textContent;
});
document.querySelectorAll('[data-i18n-title]').forEach(el => {
    translations.fr[el.dataset.i18nTitle] = el.title;
});

function setLanguage(lang) {
    if (!translations[lang]) return;
    const t = key => translations[lang][key] !== undefined ? translations[lang][key] : translations.fr[key];

    document.documentElement.lang = lang;
    document.title = t('meta.title');
    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        el.title = t(el.dataset.i18nTitle);
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive);
    });

    try { localStorage.setItem('lang', lang); } catch (e) {}
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

try {
    const savedLang = localStorage.getItem('lang');
    if (savedLang && savedLang !== 'fr') setLanguage(savedLang);
} catch (e) {}

// Animation des barres de compétences au chargement
window.addEventListener('load', () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
});

// Animation au scroll pour les éléments
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease-out';
    fadeInObserver.observe(section);
});

// Fonction pour imprimer le CV
function printCV() {
    window.print();
}

// Ajouter un bouton d'impression si nécessaire
document.addEventListener('DOMContentLoaded', () => {
    // Vous pouvez ajouter un bouton d'impression ici si vous le souhaitez
    // Exemple :
    // const printBtn = document.createElement('button');
    // printBtn.textContent = 'Imprimer le CV';
    // printBtn.onclick = printCV;
    // document.body.appendChild(printBtn);
});