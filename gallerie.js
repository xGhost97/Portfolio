// Données de la galerie
const galleryData = [
    {
        src: '/Certification/Certification_Herbergement_de_site.jpg',
        title: 'Hébergement de site',
        description: 'Certification professionnelle'
    },
    {
        src: '/Certification/Certification_HTML5_CSS3.jpg',
        title: 'HTML5 & CSS3',
        description: 'Développement web frontend'
    },
    {
        src: '/Certification/Certificat-Git-Github.jpg',
        title: 'Git & GitHub',
        description: 'Gestion de versions'
    },
    {
        src: '/Certification/Certification-JavaScript-Dynamique.jpg',
        title: 'JavaScript Dynamique',
        description: 'Programmation interactive'
    },
    {
        src: '/Certification/Certification Openclassroom JavaScript.jpg',
        title: 'JavaScript Avancé',
        description: 'OpenClassrooms'
    },
    {
        src: '/Certification/Certification Veille Informationnelle.jpg',
        title: 'Veille Informationnelle',
        description: 'Méthodologie professionnelle'
    }
];

// Elements DOM
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDescription = document.getElementById('lightbox-description');
const lightboxCurrent = document.getElementById('lightbox-current');
const lightboxTotal = document.getElementById('lightbox-total');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item');

let currentIndex = 0;

// Initialisation
lightboxTotal.textContent = galleryData.length;

// Ouvrir la lightbox
function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fermer la lightbox
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// Mettre à jour le contenu de la lightbox
function updateLightbox() {
    const item = galleryData[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
    lightboxCurrent.textContent = currentIndex + 1;
}

// Navigation suivant
function nextImage() {
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateLightbox();
}

// Navigation précédent
function prevImage() {
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateLightbox();
}

// Event Listeners pour les items de la galerie
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        openLightbox(index);
    });
});

// Event Listeners pour les contrôles
closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', prevImage);
nextBtn.addEventListener('click', nextImage);

// Fermer avec Escape
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
        closeLightbox();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'ArrowLeft') {
        prevImage();
    }
});

// Fermer en cliquant sur le fond
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Animation d'entrée au chargement
window.addEventListener('load', () => {
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});