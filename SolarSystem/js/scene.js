// ═══════════════════════════════════════════
//  scene.js — Scène Three.js, éclairage, étoiles (v2)
// ═══════════════════════════════════════════

const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// ─── Loading progress ───
let loadProgress = 0;
const totalLoad = PLANET_CONFIGS.length + 3;
function updateLoad() {
  loadProgress++;
  document.getElementById('load-fill').style.width = (loadProgress / totalLoad * 100) + '%';
}

// ─── Caméra ───
const camera = new THREE.PerspectiveCamera(
  50, window.innerWidth / window.innerHeight, 0.1, 10000
);
camera.position.set(0, 80, 200);
camera.lookAt(0, 0, 0);

// ─── Renderer ───
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.6;
container.appendChild(renderer.domElement);

// ─── Champ d'étoiles (avec concentration galactique) ───
(function createStarfield() {
  const starsGeo = new THREE.BufferGeometry();
  const count = 20000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = 1500 + Math.random() * 4000;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    // Concentration vers le plan galactique
    const galacticBias = Math.exp(-Math.pow(Math.abs(Math.cos(phi)), 2) * 3);
    const finalR = r * (0.6 + 0.4 * galacticBias);

    positions[i * 3]     = finalR * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = finalR * Math.sin(phi) * Math.sin(theta) * 0.3;
    positions[i * 3 + 2] = finalR * Math.cos(phi);

    // Variation de couleur (bleues, jaunes, blanches)
    const temp = Math.random();
    if (temp > 0.92) {
      colors[i * 3] = 0.7; colors[i * 3 + 1] = 0.8; colors[i * 3 + 2] = 1;
    } else if (temp > 0.85) {
      colors[i * 3] = 1; colors[i * 3 + 1] = 0.85; colors[i * 3 + 2] = 0.6;
    } else {
      colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1;
    }
  }

  starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const starsMat = new THREE.PointsMaterial({
    size: 1.2,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
    vertexColors: true,
  });

  scene.add(new THREE.Points(starsGeo, starsMat));
})();

// ─── Éclairage ───
scene.add(new THREE.AmbientLight(0x334466, 0.5));
scene.add(new THREE.HemisphereLight(0x8899bb, 0x223344, 0.3));

const sunLight = new THREE.PointLight(0xFFF5E0, 2.5, 3000, 1.0);
sunLight.position.set(0, 0, 0);
scene.add(sunLight);

const fillLight = new THREE.DirectionalLight(0x4466aa, 0.25);
fillLight.position.set(50, 100, 50);
scene.add(fillLight);

// ─── Helper : anneau orbital ───
function createOrbitRing(radius) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
  const points = curve.getPoints(256);
  const geo = new THREE.BufferGeometry().setFromPoints(points);
  const mat = new THREE.LineBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.07
  });
  const line = new THREE.Line(geo, mat);
  line.rotation.x = -Math.PI / 2;
  return line;
}