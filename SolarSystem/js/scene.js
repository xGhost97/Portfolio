// ═══════════════════════════════════════════
//  scene.js — Scène Three.js, éclairage, étoiles
// ═══════════════════════════════════════════

const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();

// ─── Caméra ───
const camera = new THREE.PerspectiveCamera(
  50, window.innerWidth / window.innerHeight, 0.1, 10000
);
camera.position.set(0, 80, 160);
camera.lookAt(0, 0, 0);

// ─── Renderer ───
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.6;
container.appendChild(renderer.domElement);

// ─── Champ d'étoiles ───
function createStarfield() {
  const starsGeo = new THREE.BufferGeometry();
  const count = 15000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const r = 1500 + Math.random() * 3500;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    positions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i*3+2] = r * Math.cos(phi);

    // Variation de couleur (étoiles bleues, jaunes, blanches)
    const temp = Math.random();
    if (temp > 0.9) {
      colors[i*3] = 0.8; colors[i*3+1] = 0.85; colors[i*3+2] = 1;
    } else if (temp > 0.8) {
      colors[i*3] = 1; colors[i*3+1] = 0.9; colors[i*3+2] = 0.7;
    } else {
      colors[i*3] = 1; colors[i*3+1] = 1; colors[i*3+2] = 1;
    }
  }

  starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const starsMat = new THREE.PointsMaterial({
    size: 1.5,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.85,
    vertexColors: true,
  });

  scene.add(new THREE.Points(starsGeo, starsMat));
}

createStarfield();

// ─── Éclairage ───
const ambientLight = new THREE.AmbientLight(0x334466, 0.6);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0x8899bb, 0x223344, 0.4);
scene.add(hemiLight);

const sunLight = new THREE.PointLight(0xFFF5E0, 2.5, 3000, 1.0);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;
scene.add(sunLight);

const fillLight = new THREE.DirectionalLight(0x4466aa, 0.3);
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
    opacity: 0.1
  });
  const line = new THREE.Line(geo, mat);
  line.rotation.x = -Math.PI / 2;
  return line;
}

// ─── Redimensionnement ───
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});