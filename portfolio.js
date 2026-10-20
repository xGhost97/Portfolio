// ============================================
// TRADUCTION FR / EN
// ============================================
// Le français est écrit directement dans le HTML : il est relu au chargement.
// Seul l'anglais est défini ici, clé par clé (attributs data-i18n*).
const translations = {
    en: {
        'meta.title': 'Pierluigi SOPHIE - Web Developer',
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.skills': 'Skills',
        'nav.contact': 'Contact',
        'hero.subtitle': 'Front-end Developer',
        'hero.ctaProjects': 'See my projects',
        'hero.ctaContact': 'Contact me',
        'hero.typed': [
            'I build modern, responsive websites',
            'Passionate about the web and design',
            'Always ready for new challenges'
        ],
        'about.title': 'About',
        'about.text': 'Passionate about web development, I build modern, high-performance digital experiences. Explore my portfolio to discover my work and technical expertise.',
        'projects.title': 'Projects',
        'projects.subtitle': 'Discover my latest work',
        'p1.title': 'Curriculum Vitae',
        'p1.date': 'July 15, 2023',
        'p1.description': 'Online résumé built with HTML/CSS to present my background professionally.',
        'p3.title': 'Sophie Bluel Project',
        'p3.date': 'May 14, 2023',
        'p3.description': 'This project taught me DOM manipulation in JavaScript, user login and API calls.',
        'p4.title': 'Kasa Project',
        'p4.date': 'June 23, 2023',
        'p4.description': 'Rental website built entirely with React — click HOME when you land on the site.',
        'p5.title': 'Photographer website',
        'p5.date': 'May 29, 2023',
        'p5.description': 'A photographer\'s website presenting her photos and work.',
        'p6.title': 'Solar System',
        'p6.date': 'January 4, 2026',
        'p6.description': 'Explore the solar system in 3D: orbit around the planets, search for one and discover its key facts.',
        'p7.title': 'Bomb Island',
        'p7.date': '2026',
        'p7.description': '3D game playable in the browser: aim, charge and throw your bombs across the island.',
        'p7.note': '⏳ First load can take up to 1 minute: the free server is waking up.',
        'p8.title': 'LocAntilles',
        'p8.date': 'October 10, 2025',
        'p8.description': 'Platform to book activities, stays and services in Martinique with local providers.',
        'skills.title': 'Skills',
        'skills.subtitle': 'The technologies I work with',
        'skills.learning': 'Currently learning',
        'skills.badge': 'In progress',
        'contact.title': 'Contact me',
        'contact.text': 'An opportunity, a project or a question?<br>Feel free to write to me directly.',
        'contact.email': 'Your email',
        'contact.subject': 'Subject',
        'contact.subjectPlaceholder': 'Subject of your message',
        'contact.message': 'Message',
        'contact.messagePlaceholder': 'Your message...',
        'contact.send': 'Send message',
        'contact.sent': '✅ Message sent!',
        'contact.error': '❌ Sending failed',
        'footer.rights': '&copy; Pierluigi SOPHIE - All rights reserved',
        'theme.toLight': 'Switch to light mode',
        'theme.toDark': 'Switch to dark mode'
    },
    fr: {
        'hero.typed': [
            'Je crée des sites web modernes et réactifs',
            'Passionné par le web et le design',
            'Je suis toujours prêt pour de nouveaux défis'
        ],
        'contact.sent': '✅ Message envoyé !',
        'contact.error': '❌ Erreur d\'envoi',
        'theme.toLight': 'Passer en mode clair',
        'theme.toDark': 'Passer en mode sombre'
    }
};

// Récupère le texte français d'origine depuis le HTML
const frenchSource = translations.fr;
frenchSource['meta.title'] = document.title;
document.querySelectorAll('[data-i18n]').forEach(el => {
    frenchSource[el.dataset.i18n] = el.textContent;
});
document.querySelectorAll('[data-i18n-html]').forEach(el => {
    frenchSource[el.dataset.i18nHtml] = el.innerHTML;
});
document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    frenchSource[el.dataset.i18nPlaceholder] = el.placeholder;
});

let currentLang = 'fr';

function t(key) {
    const value = translations[currentLang][key];
    return value !== undefined ? value : translations.fr[key];
}

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang;
    document.title = t('meta.title');

    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        el.innerHTML = t(el.dataset.i18nHtml);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        const isActive = btn.dataset.lang === lang;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-pressed', isActive);
    });

    updateThemeButton();

    // Relance l'effet de typing dans la nouvelle langue
    texts = t('hero.typed');
    textIndex = 0;
    charIndex = 0;
    isDeleting = false;

    try { localStorage.setItem('lang', lang); } catch (e) {}
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// ============================================
// MODE CLAIR / SOMBRE
// ============================================
// Le thème mémorisé est déjà appliqué par le petit script du <head>.
const themeToggle = document.getElementById('themeToggle');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

function isLightTheme() {
    return document.documentElement.dataset.theme === 'light';
}

function updateThemeButton() {
    themeToggle.setAttribute('aria-label', t(isLightTheme() ? 'theme.toDark' : 'theme.toLight'));
    themeToggle.title = themeToggle.getAttribute('aria-label');
    if (themeColorMeta) themeColorMeta.content = isLightTheme() ? '#f1f5f9' : '#0f172a';
}

themeToggle.addEventListener('click', () => {
    const theme = isLightTheme() ? 'dark' : 'light';
    if (theme === 'light') {
        document.documentElement.dataset.theme = 'light';
    } else {
        delete document.documentElement.dataset.theme;
    }
    updateThemeButton();
    try { localStorage.setItem('theme', theme); } catch (e) {}
});

updateThemeButton();

// ============================================
// EFFET DE TYPING
// ============================================
const typedTextElement = document.getElementById('typedText');
let texts = translations.fr['hero.typed'];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 1500;

function typeText() {
    const currentText = texts[textIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedTextElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeText, typingSpeed);
}

setTimeout(typeText, 1000);

// Applique la langue mémorisée lors de la dernière visite
try {
    const savedLang = localStorage.getItem('lang');
    if (savedLang && savedLang !== 'fr') setLanguage(savedLang);
} catch (e) {}

// ============================================
// MENU MOBILE
// ============================================
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('active');
}

function closeMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.remove('active');
}

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// CONFIGURATION EMAILJS
// ============================================
const EMAILJS_PUBLIC_KEY = 'gLctXJee4jfqAPnFC';
const EMAILJS_SERVICE_ID = 'service_n3xcr87';
const EMAILJS_TEMPLATE_ID = 'template_zlzk9jp';

// Si EmailJS ne charge pas (bloqueur de publicité, réseau), le reste de la page doit continuer de fonctionner
if (window.emailjs) {
    emailjs.init(EMAILJS_PUBLIC_KEY);
}

// ============================================
// FORMULAIRE DE CONTACT
// ============================================
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const emailInput = document.getElementById('email');
const datalist = document.getElementById('email-history');

let emailHistory = [];

function updateDatalist(filter = '') {
    const emails = emailHistory.filter(e =>
        e.toLowerCase().startsWith(filter.toLowerCase())
    );
    datalist.innerHTML = '';
    emails.forEach(e => {
        const option = document.createElement('option');
        option.value = e;
        datalist.appendChild(option);
    });
}

emailInput.addEventListener('input', e => {
    updateDatalist(e.target.value);
});

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    const email = emailInput.value.trim();
    if (!emailHistory.includes(email)) {
        emailHistory.push(email);
    }
    updateDatalist('');
    
    const sending = window.emailjs
        ? emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
        : Promise.reject(new Error('EmailJS indisponible'));

    sending
        .then(function(response) {
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            submitBtn.querySelector('.btn-text').textContent = t('contact.sent');
            
            setTimeout(() => {
                submitBtn.classList.remove('success');
                submitBtn.querySelector('.btn-text').textContent = t('contact.send');
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
            
        }, function(error) {
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('error');
            submitBtn.querySelector('.btn-text').textContent = t('contact.error');
            
            setTimeout(() => {
                submitBtn.classList.remove('error');
                submitBtn.querySelector('.btn-text').textContent = t('contact.send');
                submitBtn.disabled = false;
            }, 3000);
        });
});

// ============================================
// ANIMATIONS AU SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const navLinks = document.getElementById('navLinks');
        navLinks.classList.remove('active');
    }
});


// ─── CONFIG ────────────────────────────
const TRAIL_DENSITY   = 4;      // particules par mouvement
const SPREAD          = 28;     // dispersion autour du curseur (px)
const FADE_DURATION   = 1200;   // durée de vie max (ms)
const FADE_MIN        = 600;    // durée de vie min (ms)
const DRIFT_MAX       = 15;     // dérive lente (px)
const MAX_PARTICLES   = 120;    // plafond à l'écran (évite de saturer les petites machines)
// ───────────────────────────────────────

// Pas de traînée sur écran tactile ni si le visiteur demande moins d'animations
const particlesEnabled =
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let aliveParticles = 0;

const cursorDot = document.getElementById('cursorDot');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let lastX = mouseX;
let lastY = mouseY;

// Suivi du curseur personnalisé
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';

  // Calcul de la vitesse du curseur
  const dx = mouseX - lastX;
  const dy = mouseY - lastY;
  const speed = Math.sqrt(dx * dx + dy * dy);
  lastX = mouseX;
  lastY = mouseY;

  if (!particlesEnabled) return;

  // Plus le curseur va vite, plus on génère de particules (dans la limite du plafond)
  const count = Math.min(TRAIL_DENSITY + Math.floor(speed / 12), 8, MAX_PARTICLES - aliveParticles);

  for (let i = 0; i < count; i++) {
    // Spawn légèrement décalé dans le temps pour un effet naturel
    setTimeout(() => spawnParticle(mouseX, mouseY, speed), i * 8);
  }
});

function spawnParticle(x, y, speed) {
  if (aliveParticles >= MAX_PARTICLES) return;
  const el = document.createElement('div');
  el.classList.add('particle');

  // ─ Taille : majoritairement petite, parfois moyenne
  const rand = Math.random();
  let size;
  if (rand < 0.55) {
    size = 1 + Math.random() * 1.5;           // très petite (1–2.5px)
  } else if (rand < 0.88) {
    size = 2.5 + Math.random() * 1.5;         // petite (2.5–4px)
  } else {
    size = 4 + Math.random() * 2;             // moyenne (4–6px)
    // Les moyennes peuvent scintiller
    if (Math.random() < 0.5) {
      el.classList.add('twinkle');
    }
  }

  el.style.width = size + 'px';
  el.style.height = size + 'px';

  // ─ Couleur : blanc avec légère variation de température
  //   (en mode clair : violet de la charte, sinon invisible sur fond blanc)
  const warmth = Math.random();
  let color;
  if (isLightTheme()) {
    color = `rgba(99, 102, 241, ${0.35 + Math.random() * 0.5})`;
  } else if (warmth < 0.7) {
    const alpha = 0.4 + Math.random() * 0.6;
    color = `rgba(255, 255, 255, ${alpha})`;
  } else if (warmth < 0.88) {
    // Légèrement bleuté
    const alpha = 0.3 + Math.random() * 0.5;
    color = `rgba(200, 220, 255, ${alpha})`;
  } else {
    // Très légèrement chaud
    const alpha = 0.3 + Math.random() * 0.5;
    color = `rgba(255, 245, 230, ${alpha})`;
  }
  el.style.background = color;

  // Glow sur les plus grosses
  if (size > 3 && !isLightTheme()) {
    el.style.boxShadow = `0 0 ${size * 2}px ${size * 0.5}px rgba(255,255,255,0.15)`;
  }

  // ─ Position : dispersée autour du curseur
  const angle = Math.random() * Math.PI * 2;
  const dist = Math.random() * SPREAD;
  const px = x + Math.cos(angle) * dist;
  const py = y + Math.sin(angle) * dist;
  el.style.left = px + 'px';
  el.style.top = py + 'px';

  document.body.appendChild(el);
  aliveParticles++;

  // ─ Animation manuelle (plus fluide que CSS pour beaucoup de particules)
  const lifetime = FADE_MIN + Math.random() * (FADE_DURATION - FADE_MIN);
  const driftX = (Math.random() - 0.5) * DRIFT_MAX;
  const driftY = (Math.random() - 0.5) * DRIFT_MAX + Math.random() * 8; // légère gravité
  const startTime = performance.now();
  const startX = px;
  const startY = py;

  function animate(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / lifetime, 1);

    // Ease out cubic
    const ease = 1 - Math.pow(1 - progress, 3);

    // Fade + drift
    el.style.opacity = 1 - ease;
    el.style.left = (startX + driftX * ease) + 'px';
    el.style.top = (startY + driftY * ease) + 'px';

    // Légère réduction de taille
    const scale = 1 - ease * 0.5;
    el.style.transform = `translate(-50%, -50%) scale(${scale})`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      el.remove();
      aliveParticles--;
    }
  }

  requestAnimationFrame(animate);
}

// Cacher le curseur personnalisé quand la souris quitte la fenêtre
document.addEventListener('mouseleave', () => cursorDot.style.opacity = '0');
document.addEventListener('mouseenter', () => cursorDot.style.opacity = '1');
