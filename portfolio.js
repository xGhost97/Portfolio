// ============================================
// EFFET DE TYPING
// ============================================
const typedTextElement = document.getElementById('typedText');
const texts = [
    'Je crée des sites web modernes et réactif',
    'Passionné par le web et le design',
    'Je suis toujours prêt pour de nouveaux défis'
];

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

(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

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
    
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
        .then(function(response) {
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            submitBtn.querySelector('.btn-text').textContent = '✅ Message envoyé !';
            
            setTimeout(() => {
                submitBtn.classList.remove('success');
                submitBtn.querySelector('.btn-text').textContent = 'Envoyer le message';
                submitBtn.disabled = false;
                form.reset();
            }, 3000);
            
        }, function(error) {
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('error');
            submitBtn.querySelector('.btn-text').textContent = '❌ Erreur d\'envoi';
            
            setTimeout(() => {
                submitBtn.classList.remove('error');
                submitBtn.querySelector('.btn-text').textContent = 'Envoyer le message';
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
// ───────────────────────────────────────

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

  // Plus le curseur va vite, plus on génère de particules
  const count = Math.min(TRAIL_DENSITY + Math.floor(speed / 12), 8);

  for (let i = 0; i < count; i++) {
    // Spawn légèrement décalé dans le temps pour un effet naturel
    setTimeout(() => spawnParticle(mouseX, mouseY, speed), i * 8);
  }
});

function spawnParticle(x, y, speed) {
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
  const warmth = Math.random();
  let color;
  if (warmth < 0.7) {
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
  if (size > 3) {
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
    }
  }

  requestAnimationFrame(animate);
}

// Cacher le curseur personnalisé quand la souris quitte la fenêtre
document.addEventListener('mouseleave', () => cursorDot.style.opacity = '0');
document.addEventListener('mouseenter', () => cursorDot.style.opacity = '1');
