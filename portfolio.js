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