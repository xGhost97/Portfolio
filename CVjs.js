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