// ═══════════════════════════════════════════
//  controls.js — Contrôles caméra et interaction
// ═══════════════════════════════════════════

// ─── Orbite caméra ───
let isDragging = false;
let previousMousePos = { x: 0, y: 0 };
let spherical = { theta: 0.3, phi: 1.0, radius: 200 };
let targetSpherical = { ...spherical };

// Souris
container.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    isDragging = true;
    previousMousePos = { x: e.clientX, y: e.clientY };
  }
});

container.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - previousMousePos.x;
  const dy = e.clientY - previousMousePos.y;
  targetSpherical.theta -= dx * 0.005;
  targetSpherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, targetSpherical.phi - dy * 0.005));
  previousMousePos = { x: e.clientX, y: e.clientY };
});

container.addEventListener('mouseup', () => { isDragging = false; });

container.addEventListener('wheel', (e) => {
  targetSpherical.radius = Math.max(20, Math.min(500, targetSpherical.radius + e.deltaY * 0.15));
});

// Tactile
container.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    isDragging = true;
    previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
});

container.addEventListener('touchmove', (e) => {
  if (!isDragging || e.touches.length !== 1) return;
  const dx = e.touches[0].clientX - previousMousePos.x;
  const dy = e.touches[0].clientY - previousMousePos.y;
  targetSpherical.theta -= dx * 0.005;
  targetSpherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, targetSpherical.phi - dy * 0.005));
  previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});

container.addEventListener('touchend', () => { isDragging = false; });

// ─── Raycasting (clic sur planètes) ───
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

container.addEventListener('click', (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickableMeshes, true);
  if (intersects.length > 0) {
    let obj = intersects[0].object;
    while (obj && !obj.userData.id) obj = obj.parent;
    if (obj && obj.userData.id) openPanel(obj.userData.id);
  }
});

// Curseur dynamique au survol
container.addEventListener('mousemove', (e) => {
  if (isDragging) return;
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickableMeshes, true);
  container.style.cursor = intersects.length > 0 ? 'pointer' : 'grab';
});

// ─── Mise à jour caméra (appelée dans la boucle) ───
function updateCamera() {
  spherical.theta  += (targetSpherical.theta  - spherical.theta)  * 0.08;
  spherical.phi    += (targetSpherical.phi    - spherical.phi)    * 0.08;
  spherical.radius += (targetSpherical.radius - spherical.radius) * 0.08;

  camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
  camera.position.y = spherical.radius * Math.cos(spherical.phi);
  camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
  camera.lookAt(0, 0, 0);
}