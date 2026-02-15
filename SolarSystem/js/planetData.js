// ═══════════════════════════════════════════
//  planetData.js — Données des planètes
// ═══════════════════════════════════════════

const PLANET_DATA = {
  soleil: {
    name: "Soleil", subtitle: "Étoile — Naine Jaune (G2V)",
    accent: "#FDB813", accent2: "#FF6B00",
    description: "Le Soleil est l'étoile au centre de notre système solaire. Il représente 99,86% de la masse totale du système. C'est une sphère de plasma chauffée par des réactions de fusion nucléaire en son cœur.",
    stats: [
      { label: "Diamètre", value: "1 392 684", unit: "km" },
      { label: "Masse", value: "1,989 × 10³⁰", unit: "kg" },
      { label: "Température (surface)", value: "5 505", unit: "°C" },
      { label: "Température (cœur)", value: "15 000 000", unit: "°C" },
      { label: "Âge", value: "4,6", unit: "milliards d'années" },
      { label: "Type spectral", value: "G2V", unit: "" },
    ],
    composition: [
      { element: "Hydrogène", pct: 73.46 },
      { element: "Hélium", pct: 24.85 },
      { element: "Oxygène", pct: 0.77 },
    ],
    funFact: "La lumière du Soleil met environ 8 minutes et 20 secondes pour atteindre la Terre."
  },
  mercure: {
    name: "Mercure", subtitle: "Planète tellurique — 1ère planète",
    accent: "#A0A0A0", accent2: "#707070",
    description: "Mercure est la plus petite planète du système solaire et la plus proche du Soleil. Sa surface est criblée de cratères, rappelant celle de la Lune. Elle ne possède pratiquement pas d'atmosphère.",
    stats: [
      { label: "Diamètre", value: "4 879", unit: "km" },
      { label: "Distance au Soleil", value: "57,9", unit: "millions km" },
      { label: "Période orbitale", value: "88", unit: "jours" },
      { label: "Période de rotation", value: "58,6", unit: "jours" },
      { label: "Température max", value: "427", unit: "°C" },
      { label: "Gravité", value: "3,7", unit: "m/s²" },
    ],
    composition: [
      { element: "Fer", pct: 70 },
      { element: "Silicates", pct: 28 },
      { element: "Autres", pct: 2 },
    ],
    funFact: "Un jour solaire sur Mercure dure 176 jours terrestres — plus long que son année !"
  },
  venus: {
    name: "Vénus", subtitle: "Planète tellurique — 2ème planète",
    accent: "#E8A735", accent2: "#C47A20",
    description: "Vénus est souvent appelée la « sœur jumelle » de la Terre en raison de leur taille similaire. Son atmosphère extrêmement dense crée un effet de serre incontrôlé, en faisant la planète la plus chaude du système solaire.",
    stats: [
      { label: "Diamètre", value: "12 104", unit: "km" },
      { label: "Distance au Soleil", value: "108,2", unit: "millions km" },
      { label: "Période orbitale", value: "225", unit: "jours" },
      { label: "Période de rotation", value: "243", unit: "jours (rétro.)" },
      { label: "Température surface", value: "462", unit: "°C" },
      { label: "Gravité", value: "8,87", unit: "m/s²" },
    ],
    composition: [
      { element: "CO₂ (atm.)", pct: 96.5 },
      { element: "Azote", pct: 3.5 },
    ],
    funFact: "Vénus tourne à l'envers (rotation rétrograde) : le Soleil s'y lève à l'ouest et se couche à l'est."
  },
  terre: {
    name: "Terre", subtitle: "Planète tellurique — 3ème planète",
    accent: "#4A90D9", accent2: "#2ECC71",
    description: "La Terre est la seule planète connue à abriter la vie. Sa surface est couverte à 71% d'eau liquide, et son atmosphère riche en azote et oxygène protège la vie des radiations solaires.",
    stats: [
      { label: "Diamètre", value: "12 742", unit: "km" },
      { label: "Distance au Soleil", value: "149,6", unit: "millions km" },
      { label: "Période orbitale", value: "365,25", unit: "jours" },
      { label: "Période de rotation", value: "23h 56min", unit: "" },
      { label: "Température moy.", value: "15", unit: "°C" },
      { label: "Satellites", value: "1", unit: "(Lune)" },
    ],
    composition: [
      { element: "Fer (noyau)", pct: 32.1 },
      { element: "Oxygène", pct: 30.1 },
      { element: "Silicium", pct: 15.1 },
      { element: "Magnésium", pct: 13.9 },
    ],
    funFact: "La Terre est la planète la plus dense du système solaire avec 5,51 g/cm³."
  },
  lune: {
    name: "Lune", subtitle: "Satellite naturel de la Terre",
    accent: "#C8C8C8", accent2: "#909090",
    description: "La Lune est le seul satellite naturel permanent de la Terre. Elle influence les marées, stabilise l'axe de rotation terrestre et a été visitée par 12 astronautes lors des missions Apollo.",
    stats: [
      { label: "Diamètre", value: "3 474", unit: "km" },
      { label: "Distance à la Terre", value: "384 400", unit: "km" },
      { label: "Période orbitale", value: "27,3", unit: "jours" },
      { label: "Gravité", value: "1,62", unit: "m/s²" },
      { label: "Température max", value: "127", unit: "°C" },
      { label: "Température min", value: "-173", unit: "°C" },
    ],
    composition: [
      { element: "Oxygène", pct: 43 },
      { element: "Silicium", pct: 21 },
      { element: "Fer", pct: 13 },
    ],
    funFact: "La Lune s'éloigne de la Terre d'environ 3,8 cm par an."
  },
  mars: {
    name: "Mars", subtitle: "Planète tellurique — 4ème planète",
    accent: "#E25822", accent2: "#B33A11",
    description: "Mars, surnommée la « planète rouge » en raison de l'oxyde de fer présent sur sa surface, possède le plus grand volcan du système solaire (Olympus Mons) et un gigantesque canyon (Valles Marineris).",
    stats: [
      { label: "Diamètre", value: "6 779", unit: "km" },
      { label: "Distance au Soleil", value: "227,9", unit: "millions km" },
      { label: "Période orbitale", value: "687", unit: "jours" },
      { label: "Période de rotation", value: "24h 37min", unit: "" },
      { label: "Température moy.", value: "-63", unit: "°C" },
      { label: "Satellites", value: "2", unit: "(Phobos, Deimos)" },
    ],
    composition: [
      { element: "CO₂ (atm.)", pct: 95.3 },
      { element: "Azote", pct: 2.7 },
      { element: "Argon", pct: 1.6 },
    ],
    funFact: "Olympus Mons, le plus grand volcan de Mars, culmine à 21,9 km — presque 3 fois l'Everest !"
  },
  jupiter: {
    name: "Jupiter", subtitle: "Géante gazeuse — 5ème planète",
    accent: "#D4A574", accent2: "#B87A4B",
    description: "Jupiter est la plus grande planète du système solaire. Elle pourrait contenir toutes les autres planètes combinées. Sa Grande Tache Rouge est une tempête anticyclonique qui fait rage depuis au moins 350 ans.",
    stats: [
      { label: "Diamètre", value: "139 820", unit: "km" },
      { label: "Distance au Soleil", value: "778,5", unit: "millions km" },
      { label: "Période orbitale", value: "11,86", unit: "ans" },
      { label: "Période de rotation", value: "9h 56min", unit: "" },
      { label: "Masse", value: "1,898 × 10²⁷", unit: "kg" },
      { label: "Satellites connus", value: "95", unit: "" },
    ],
    composition: [
      { element: "Hydrogène", pct: 89.8 },
      { element: "Hélium", pct: 10.2 },
    ],
    funFact: "La Grande Tache Rouge de Jupiter est si vaste que la Terre pourrait y tenir entièrement."
  },
  saturne: {
    name: "Saturne", subtitle: "Géante gazeuse — 6ème planète",
    accent: "#E8D5A3", accent2: "#C4A96A",
    description: "Saturne est célèbre pour son spectaculaire système d'anneaux composés principalement de glace et de roche. C'est la planète la moins dense du système solaire — elle flotterait sur l'eau !",
    stats: [
      { label: "Diamètre", value: "116 460", unit: "km" },
      { label: "Distance au Soleil", value: "1 434", unit: "millions km" },
      { label: "Période orbitale", value: "29,46", unit: "ans" },
      { label: "Période de rotation", value: "10h 42min", unit: "" },
      { label: "Densité", value: "0,687", unit: "g/cm³" },
      { label: "Satellites connus", value: "146", unit: "" },
    ],
    composition: [
      { element: "Hydrogène", pct: 96.3 },
      { element: "Hélium", pct: 3.25 },
    ],
    funFact: "Saturne possède 146 lunes connues, dont Titan qui a une atmosphère plus dense que celle de la Terre."
  },
  uranus: {
    name: "Uranus", subtitle: "Géante de glaces — 7ème planète",
    accent: "#7EC8E3", accent2: "#4FA8C4",
    description: "Uranus est unique car elle tourne littéralement sur le côté avec une inclinaison axiale de 98°. C'est la planète la plus froide du système solaire malgré le fait que Neptune soit plus éloignée.",
    stats: [
      { label: "Diamètre", value: "50 724", unit: "km" },
      { label: "Distance au Soleil", value: "2 871", unit: "millions km" },
      { label: "Période orbitale", value: "84", unit: "ans" },
      { label: "Période de rotation", value: "17h 14min", unit: "" },
      { label: "Température min", value: "-224", unit: "°C" },
      { label: "Satellites connus", value: "28", unit: "" },
    ],
    composition: [
      { element: "Hydrogène", pct: 82.5 },
      { element: "Hélium", pct: 15.2 },
      { element: "Méthane", pct: 2.3 },
    ],
    funFact: "L'inclinaison extrême d'Uranus fait que chaque pôle reçoit 42 ans de lumière continue puis 42 ans d'obscurité."
  },
  neptune: {
    name: "Neptune", subtitle: "Géante de glaces — 8ème planète",
    accent: "#3B5EE3", accent2: "#1E3A8A",
    description: "Neptune est la planète la plus éloignée du Soleil. Elle possède les vents les plus rapides du système solaire, soufflant à plus de 2 100 km/h. Sa couleur bleue intense provient du méthane atmosphérique.",
    stats: [
      { label: "Diamètre", value: "49 528", unit: "km" },
      { label: "Distance au Soleil", value: "4 495", unit: "millions km" },
      { label: "Période orbitale", value: "165", unit: "ans" },
      { label: "Période de rotation", value: "16h 6min", unit: "" },
      { label: "Vents max", value: "2 100", unit: "km/h" },
      { label: "Satellites connus", value: "16", unit: "" },
    ],
    composition: [
      { element: "Hydrogène", pct: 80 },
      { element: "Hélium", pct: 19 },
      { element: "Méthane", pct: 1.5 },
    ],
    funFact: "Depuis sa découverte en 1846, Neptune n'a complété qu'une seule orbite autour du Soleil (en 2011)."
  }
};

// Configuration orbitale de chaque planète
const PLANET_CONFIGS = [
  { id: 'soleil',  radius: 8,   dist: 0,   speed: 0,     rotSpeed: 0.002, emissiveI: 1.8 },
  { id: 'mercure', radius: 1.0, dist: 18,  speed: 4.15,  rotSpeed: 0.005, emissiveI: 0.15 },
  { id: 'venus',   radius: 1.6, dist: 26,  speed: 1.62,  rotSpeed: -0.003, emissiveI: 0.15 },
  { id: 'terre',   radius: 1.7, dist: 36,  speed: 1.0,   rotSpeed: 0.01, emissiveI: 0.12 },
  { id: 'mars',    radius: 1.2, dist: 48,  speed: 0.53,  rotSpeed: 0.009, emissiveI: 0.15 },
  { id: 'jupiter', radius: 4.5, dist: 72,  speed: 0.084, rotSpeed: 0.02, emissiveI: 0.12 },
  { id: 'saturne', radius: 3.8, dist: 100, speed: 0.034, rotSpeed: 0.018, emissiveI: 0.12 },
  { id: 'uranus',  radius: 2.4, dist: 135, speed: 0.012, rotSpeed: 0.012, emissiveI: 0.2 },
  { id: 'neptune', radius: 2.3, dist: 165, speed: 0.006, rotSpeed: 0.011, emissiveI: 0.2 },
];