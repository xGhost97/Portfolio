// ═══════════════════════════════════════════
//  planetData.js — Données des planètes (v2)
// ═══════════════════════════════════════════

const PLANET_DATA = {
  soleil: {
    name: "Soleil", subtitle: "Étoile — Naine Jaune (G2V)",
    accent: "#FDB813", accent2: "#FF6B00", navColor: "#FDB813",
    description: "Le Soleil est l'étoile au centre de notre système solaire. Il représente 99,86% de la masse totale du système. C'est une sphère de plasma chauffée par des réactions de fusion nucléaire en son cœur.",
    stats: [
      { label: "Diamètre", value: "1 392 684", unit: "km" },
      { label: "Masse", value: "1,989 × 10³⁰", unit: "kg" },
      { label: "Temp. surface", value: "5 505", unit: "°C" },
      { label: "Temp. cœur", value: "15 000 000", unit: "°C" },
      { label: "Âge", value: "4,6", unit: "Mrd années" },
      { label: "Type spectral", value: "G2V", unit: "" }
    ],
    composition: [
      { element: "Hydrogène", pct: 73.46 },
      { element: "Hélium", pct: 24.85 },
      { element: "Oxygène", pct: 0.77 }
    ],
    funFact: "La lumière du Soleil met 8 min 20 s pour atteindre la Terre.",
    moons: []
  },
  mercure: {
    name: "Mercure", subtitle: "Planète tellurique — 1ère planète",
    accent: "#A0A0A0", accent2: "#707070", navColor: "#A0A0A0",
    description: "Mercure est la plus petite planète du système solaire et la plus proche du Soleil. Sa surface criblée de cratères rappelle celle de la Lune.",
    stats: [
      { label: "Diamètre", value: "4 879", unit: "km" },
      { label: "Dist. Soleil", value: "57,9", unit: "M km" },
      { label: "Année", value: "88", unit: "jours" },
      { label: "Jour", value: "58,6", unit: "jours" },
      { label: "Temp. max", value: "427", unit: "°C" },
      { label: "Gravité", value: "3,7", unit: "m/s²" }
    ],
    composition: [
      { element: "Fer", pct: 70 },
      { element: "Silicates", pct: 28 }
    ],
    funFact: "Un jour solaire sur Mercure dure 176 jours terrestres !",
    moons: []
  },
  venus: {
    name: "Vénus", subtitle: "Planète tellurique — 2ème planète",
    accent: "#E8A735", accent2: "#C47A20", navColor: "#E8A735",
    description: "Vénus, « sœur jumelle » de la Terre, possède une atmosphère dense créant un effet de serre incontrôlé. C'est la planète la plus chaude du système solaire.",
    stats: [
      { label: "Diamètre", value: "12 104", unit: "km" },
      { label: "Dist. Soleil", value: "108,2", unit: "M km" },
      { label: "Année", value: "225", unit: "jours" },
      { label: "Jour", value: "243", unit: "j (rétro.)" },
      { label: "Temp. surface", value: "462", unit: "°C" },
      { label: "Gravité", value: "8,87", unit: "m/s²" }
    ],
    composition: [
      { element: "CO₂ (atm.)", pct: 96.5 },
      { element: "Azote", pct: 3.5 }
    ],
    funFact: "Vénus tourne à l'envers : le Soleil s'y lève à l'ouest.",
    moons: []
  },
  terre: {
    name: "Terre", subtitle: "Planète tellurique — 3ème planète",
    accent: "#4A90D9", accent2: "#2ECC71", navColor: "#4A90D9",
    description: "La Terre est la seule planète connue abritant la vie. 71% de sa surface est recouverte d'eau liquide.",
    stats: [
      { label: "Diamètre", value: "12 742", unit: "km" },
      { label: "Dist. Soleil", value: "149,6", unit: "M km" },
      { label: "Année", value: "365,25", unit: "jours" },
      { label: "Jour", value: "23h 56m", unit: "" },
      { label: "Temp. moy.", value: "15", unit: "°C" },
      { label: "Satellites", value: "1", unit: "" }
    ],
    composition: [
      { element: "Fer (noyau)", pct: 32.1 },
      { element: "Oxygène", pct: 30.1 },
      { element: "Silicium", pct: 15.1 },
      { element: "Magnésium", pct: 13.9 }
    ],
    funFact: "La Terre est la planète la plus dense : 5,51 g/cm³.",
    moons: ["Lune"]
  },
  lune: {
    name: "Lune", subtitle: "Satellite naturel de la Terre",
    accent: "#C8C8C8", accent2: "#909090", navColor: "#C8C8C8",
    description: "La Lune est le seul satellite naturel de la Terre. Elle influence les marées, stabilise l'axe de rotation terrestre et a été visitée par 12 astronautes.",
    stats: [
      { label: "Diamètre", value: "3 474", unit: "km" },
      { label: "Distance", value: "384 400", unit: "km" },
      { label: "Orbite", value: "27,3", unit: "jours" },
      { label: "Gravité", value: "1,62", unit: "m/s²" },
      { label: "Temp. max", value: "127", unit: "°C" },
      { label: "Temp. min", value: "-173", unit: "°C" }
    ],
    composition: [
      { element: "Oxygène", pct: 43 },
      { element: "Silicium", pct: 21 },
      { element: "Fer", pct: 13 }
    ],
    funFact: "La Lune s'éloigne de 3,8 cm par an.",
    moons: []
  },
  mars: {
    name: "Mars", subtitle: "Planète tellurique — 4ème planète",
    accent: "#E25822", accent2: "#B33A11", navColor: "#E25822",
    description: "Mars, la « planète rouge », possède Olympus Mons (plus grand volcan) et Valles Marineris (plus grand canyon du système solaire).",
    stats: [
      { label: "Diamètre", value: "6 779", unit: "km" },
      { label: "Dist. Soleil", value: "227,9", unit: "M km" },
      { label: "Année", value: "687", unit: "jours" },
      { label: "Jour", value: "24h 37m", unit: "" },
      { label: "Temp. moy.", value: "-63", unit: "°C" },
      { label: "Satellites", value: "2", unit: "" }
    ],
    composition: [
      { element: "CO₂ (atm.)", pct: 95.3 },
      { element: "Azote", pct: 2.7 },
      { element: "Argon", pct: 1.6 }
    ],
    funFact: "Olympus Mons culmine à 21,9 km — 3 fois l'Everest !",
    moons: ["Phobos", "Deimos"]
  },
  jupiter: {
    name: "Jupiter", subtitle: "Géante gazeuse — 5ème planète",
    accent: "#D4A574", accent2: "#B87A4B", navColor: "#D4A574",
    description: "Jupiter est la plus grande planète. Sa Grande Tache Rouge est une tempête anticyclonique active depuis plus de 350 ans.",
    stats: [
      { label: "Diamètre", value: "139 820", unit: "km" },
      { label: "Dist. Soleil", value: "778,5", unit: "M km" },
      { label: "Année", value: "11,86", unit: "ans" },
      { label: "Jour", value: "9h 56m", unit: "" },
      { label: "Masse", value: "1,898×10²⁷", unit: "kg" },
      { label: "Satellites", value: "95", unit: "" }
    ],
    composition: [
      { element: "Hydrogène", pct: 89.8 },
      { element: "Hélium", pct: 10.2 }
    ],
    funFact: "La Terre tiendrait entièrement dans la Grande Tache Rouge.",
    moons: ["Io", "Europe", "Ganymède", "Callisto"]
  },
  saturne: {
    name: "Saturne", subtitle: "Géante gazeuse — 6ème planète",
    accent: "#E8D5A3", accent2: "#C4A96A", navColor: "#E8D5A3",
    description: "Saturne est célèbre pour ses anneaux spectaculaires de glace et de roche. Elle est si peu dense qu'elle flotterait sur l'eau !",
    stats: [
      { label: "Diamètre", value: "116 460", unit: "km" },
      { label: "Dist. Soleil", value: "1 434", unit: "M km" },
      { label: "Année", value: "29,46", unit: "ans" },
      { label: "Jour", value: "10h 42m", unit: "" },
      { label: "Densité", value: "0,687", unit: "g/cm³" },
      { label: "Satellites", value: "146", unit: "" }
    ],
    composition: [
      { element: "Hydrogène", pct: 96.3 },
      { element: "Hélium", pct: 3.25 }
    ],
    funFact: "Titan, lune de Saturne, a une atmosphère plus dense que celle de la Terre.",
    moons: ["Titan", "Encelade", "Mimas", "Rhéa", "Dioné", "Téthys"]
  },
  uranus: {
    name: "Uranus", subtitle: "Géante de glaces — 7ème planète",
    accent: "#7EC8E3", accent2: "#4FA8C4", navColor: "#7EC8E3",
    description: "Uranus tourne sur le côté (inclinaison 98°). C'est la planète la plus froide du système solaire malgré Neptune plus éloignée.",
    stats: [
      { label: "Diamètre", value: "50 724", unit: "km" },
      { label: "Dist. Soleil", value: "2 871", unit: "M km" },
      { label: "Année", value: "84", unit: "ans" },
      { label: "Jour", value: "17h 14m", unit: "" },
      { label: "Temp. min", value: "-224", unit: "°C" },
      { label: "Satellites", value: "28", unit: "" }
    ],
    composition: [
      { element: "Hydrogène", pct: 82.5 },
      { element: "Hélium", pct: 15.2 },
      { element: "Méthane", pct: 2.3 }
    ],
    funFact: "Chaque pôle reçoit 42 ans de lumière puis 42 ans d'obscurité.",
    moons: ["Miranda", "Ariel", "Umbriel", "Titania", "Obéron"]
  },
  neptune: {
    name: "Neptune", subtitle: "Géante de glaces — 8ème planète",
    accent: "#3B5EE3", accent2: "#1E3A8A", navColor: "#3B5EE3",
    description: "Neptune possède les vents les plus rapides du système solaire (2 100 km/h). Sa couleur bleue vient du méthane.",
    stats: [
      { label: "Diamètre", value: "49 528", unit: "km" },
      { label: "Dist. Soleil", value: "4 495", unit: "M km" },
      { label: "Année", value: "165", unit: "ans" },
      { label: "Jour", value: "16h 6m", unit: "" },
      { label: "Vents max", value: "2 100", unit: "km/h" },
      { label: "Satellites", value: "16", unit: "" }
    ],
    composition: [
      { element: "Hydrogène", pct: 80 },
      { element: "Hélium", pct: 19 },
      { element: "Méthane", pct: 1.5 }
    ],
    funFact: "Neptune n'a complété qu'une seule orbite depuis sa découverte en 1846 (en 2011).",
    moons: ["Triton", "Protée", "Néréide"]
  }
};

// Configuration orbitale
const PLANET_CONFIGS = [
  { id: 'soleil',  radius: 8,   dist: 0,   speed: 0,     rotSpeed: 0.002,  emissiveI: 1.8 },
  { id: 'mercure', radius: 1.0, dist: 18,  speed: 4.15,  rotSpeed: 0.005,  emissiveI: 0.15 },
  { id: 'venus',   radius: 1.6, dist: 26,  speed: 1.62,  rotSpeed: -0.003, emissiveI: 0.15 },
  { id: 'terre',   radius: 1.7, dist: 36,  speed: 1.0,   rotSpeed: 0.01,   emissiveI: 0.12 },
  { id: 'mars',    radius: 1.2, dist: 48,  speed: 0.53,  rotSpeed: 0.009,  emissiveI: 0.15 },
  { id: 'jupiter', radius: 4.5, dist: 72,  speed: 0.084, rotSpeed: 0.02,   emissiveI: 0.12 },
  { id: 'saturne', radius: 3.8, dist: 100, speed: 0.034, rotSpeed: 0.018,  emissiveI: 0.12 },
  { id: 'uranus',  radius: 2.4, dist: 135, speed: 0.012, rotSpeed: 0.012,  emissiveI: 0.2 },
  { id: 'neptune', radius: 2.3, dist: 165, speed: 0.006, rotSpeed: 0.011,  emissiveI: 0.2 }
];