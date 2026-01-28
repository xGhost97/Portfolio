# LocAntilles - Plateforme de Location aux Antilles

## 🌴 Description du Projet

LocAntilles est une plateforme moderne de location de biens immobiliers, véhicules et motos aux Antilles. Le site permet aux utilisateurs de rechercher, filtrer et réserver des hébergements, voitures et motos dans les îles de Guadeloupe, Martinique, Saint-Martin et Saint-Barthélemy.

## ✨ Fonctionnalités Implémentées

### 🔍 Recherche et Filtres
- **Recherche avancée** : Par localisation, dates de début et de fin
- **Filtres multiples** :
  - Type de bien (Hébergements, Voitures, Motos)
  - Prix minimum et maximum
  - Localisation par île
- **Filtrage en temps réel** avec mise à jour instantanée des résultats

### 🏠 Hébergements
- Affichage de villas, bungalows, appartements et maisons
- Informations détaillées : nombre de chambres, capacité, salles de bain
- Indication de la présence de piscine
- Photos de haute qualité

### 🚗 Voitures
- Large gamme de véhicules (citadines, sportives, SUV)
- Informations : nombre de places, transmission, climatisation
- Prix par jour clairement affichés

### 🏍️ Motos
- Motos et scooters disponibles
- Détails : cylindrée, permis requis, casques inclus
- Options pour tous les niveaux de permis

### ⭐ Système de Favoris
- Ajout/retrait de favoris en un clic
- Sauvegarde persistante dans le navigateur (localStorage)
- Page dédiée aux favoris
- Compteur de favoris dans le header

### 📱 Interface Utilisateur
- **Design moderne** avec animations fluides
- **Responsive** : adapté mobile, tablette et desktop
- **Loader animé** au chargement de la page
- **Modal de détails** pour chaque bien
- **Système de notation** avec étoiles
- **Badges** pour identifier le type de bien

### 🎨 Design & UX
- Palette de couleurs professionnelle (bleu/violet)
- Typographie claire avec Google Fonts (Raleway)
- Ombres et effets au survol
- Icons Font Awesome pour une meilleure lisibilité
- Transitions et animations CSS

### 📊 Section Populaires
- Mise en avant des biens les plus demandés
- Affichage horizontal optimisé

### 🌄 Section Activités
- Présentation des activités touristiques
- Plongée, randonnées, kayak, snorkeling

### 💬 Notifications
- Toast notifications pour les actions utilisateur
- Feedback visuel immédiat

## 📁 Structure des Fichiers

```
LocAntilles/
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── app.js              # Logique JavaScript
├── README.md           # Documentation
└── Images/             # Photos des biens
    ├── antilles.jpg
    ├── antilles2.jpg
    ├── audi-rs3-sportback.jpg
    ├── Clio-4-RS-Trophy-1.jpg
    ├── Louer-a-Paris-2-1030x687.jpg
    ├── maison-campagne.png
    ├── yamaha-mt-07-1.jpg
    └── yamaha-tmax-560.jpg
```

## 🚀 Installation et Utilisation

### Option 1 : Ouverture Directe
1. Téléchargez tous les fichiers
2. Assurez-vous que les images sont dans le même dossier que index.html
3. Ouvrez `index.html` dans votre navigateur

### Option 2 : Serveur Local (Recommandé)
```bash
# Avec Python 3
python -m http.server 8000

# Avec PHP
php -S localhost:8000

# Avec Node.js (live-server)
npx live-server
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

## 🎯 Comment Utiliser le Site

### Rechercher un Bien
1. Utilisez la barre de recherche dans le hero
2. Entrez une localisation (ex: "Guadeloupe")
3. Sélectionnez éventuellement des dates
4. Cliquez sur "Rechercher"

### Filtrer les Résultats
1. Utilisez la section "Filtres" sous le hero
2. Sélectionnez le type de bien
3. Définissez une fourchette de prix
4. Choisissez une île spécifique
5. Cliquez sur "Appliquer"

### Ajouter aux Favoris
1. Cliquez sur l'icône cœur sur une carte de bien
2. Le bien est ajouté à vos favoris
3. Accédez à tous vos favoris via le menu "Favoris"

### Voir les Détails
1. Cliquez sur n'importe quelle carte de bien
2. Une modal s'ouvre avec toutes les informations
3. Vous pouvez réserver directement depuis la modal

## 🛠️ Technologies Utilisées

- **HTML5** : Structure sémantique
- **CSS3** : 
  - Variables CSS
  - Flexbox et Grid
  - Animations et transitions
  - Media queries (responsive)
- **JavaScript (Vanilla)** :
  - Classes ES6
  - LocalStorage API
  - DOM Manipulation
  - Event Listeners
- **Font Awesome 6** : Icônes
- **Google Fonts** : Typographie Raleway

## 📊 Base de Données

Le site utilise une base de données JavaScript en mémoire avec :
- 6 hébergements
- 4 voitures
- 4 motos
- 4 activités

Les données incluent :
- Identifiants uniques
- Informations détaillées
- Prix
- Localisations
- Ratings et avis
- Images

## 🔄 Fonctionnalités Futures (Non Implémentées)

Les fonctionnalités suivantes ont été listées dans le document de spécifications mais ne sont pas encore implémentées :
- Géolocalisation GPS
- Calendrier de disponibilité en temps réel
- Messagerie intégrée entre locataires et propriétaires
- Système de paiement en ligne
- Notifications push
- Assurance locative
- Contrats électroniques
- Chat en direct
- Vérifications de sécurité
- Intégration avec réseaux sociaux
- Synchronisation de calendrier
- Analytics propriétaires
- Support multilingue
- Programme de fidélité
- Recommandations IA
- Alertes de prix
- Partenariats de voyage

## 📜 Conformité Légale

Le site est conçu pour respecter les réglementations mentionnées dans le document "Règlementation immobilière" :
- Affichage clair des prix et conditions
- Mentions légales (à compléter)
- Protection des données (RGPD - structure prête)
- Transparence des tarifs
- Accessibilité web

## 🎨 Personnalisation

### Modifier les Couleurs
Éditez les variables CSS dans `styles.css` :
```css
:root {
    --primary-color: #0065FC;
    --secondary-color: #6cb2eb;
    --accent-color: #FF6B6B;
    /* ... */
}
```

### Ajouter des Biens
Dans `app.js`, ajoutez des objets dans les tableaux :
```javascript
biensData.hebergements.push({
    id: 'h7',
    nom: 'Nouveau Bien',
    // ...
});
```

## 📱 Compatibilité

- ✅ Chrome (dernière version)
- ✅ Firefox (dernière version)
- ✅ Safari (dernière version)
- ✅ Edge (dernière version)
- ✅ Mobile (iOS & Android)

## 🐛 Support

Pour toute question ou problème :
- Vérifiez que tous les fichiers sont bien présents
- Ouvrez la console du navigateur (F12) pour voir les erreurs
- Assurez-vous que les images sont accessibles

## 📝 Licence

Ce projet a été créé pour LocAntilles. Tous droits réservés © 2026.

## 👏 Crédits

- Design et développement : Claude AI
- Images : Fournies par le client
- Icons : Font Awesome
- Fonts : Google Fonts (Raleway)

---

**Version :** 1.0.0  
**Dernière mise à jour :** Janvier 2026
