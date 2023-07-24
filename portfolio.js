const textElement = document.getElementById('typed-text');
const text = 'Je suis SOPHIE Pierluigi, Développeur Front-End.';
const typingDelay = 100; // Délai entre chaque affichage de caractère
const erasingDelay = 50; // Délai entre chaque effacement de caractère
const newTextDelay = 2000; // Délai avant de commencer à effacer le texte

let charIndex = 0;
let erase = false;

function typeText() {
  if (charIndex < text.length && !erase) {
    textElement.textContent += text.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, typingDelay);
  } else {
    erase = true;
    setTimeout(eraseText, newTextDelay);
  }
}

function eraseText() {
  if (charIndex >= 0 && erase) {
    textElement.textContent = text.substring(0, charIndex);
    charIndex--;
    setTimeout(eraseText, erasingDelay);
  } else {
    erase = false;
    setTimeout(typeText, typingDelay);
  }
}

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(typeText, typingDelay);
  });

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche l'envoi du formulaire
  
    // Récupération des valeurs des champs
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
  
    // Construction du corps du mail
    var body = 'Nom: ' + name + '\n';
    body += 'E-mail: ' + email + '\n\n';
    body += 'Message:\n' + message;
  
    // Envoi du mail
    window.open('mailto:pierluigisophie@gmail.com?subject=Message de contact&body=' + encodeURIComponent(body));
  });


 


  