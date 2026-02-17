// ═══════════════════════════════════════════
//  controls.js — Contrôles caméra + fly-to (v2)
// ═══════════════════════════════════════════

// ─── État caméra ───
let isDragging = false;
let dragDist = 0;
let previousMousePos = { x: 0, y: 0 };
let camMode = 'overview'; // 'overview' ou 'focus'
let focusTarget = null;

// Smooth camera
let camPos = new THREE.Vector3(0, 80, 200);
let camTarget = new THREE.Vector3(0, 0, 0);
let camPosTarget = new THREE.Vector3(0, 80, 200);
let camLookTarget = new THREE.Vector3(0, 0, 0);
let camLerp = 0.04;

// Coordonnées sphériques
let spherical = { theta: 0.3, phi: 1.0, radius: 200 };
let targetSpherical = { theta: 0.3, phi: 1.0, radius: 200 };

// ─── Souris ───
container.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    isDragging = true;
    dragDist = 0;
    previousMousePos = { x: e.clientX, y: e.clientY };
  }
});

container.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  dragDist++;
  const dx = e.clientX - previousMousePos.x;
  const dy = e.clientY - previousMousePos.y;
  targetSpherical.theta -= dx * 0.005;
  targetSpherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, targetSpherical.phi - dy * 0.005));
  previousMousePos = { x: e.clientX, y: e.clientY };
});

container.addEventListener('mouseup', () => { isDragging = false; });

container.addEventListener('wheel', (e) => {
  if (camMode === 'overview') {
    targetSpherical.radius = Math.max(20, Math.min(500, targetSpherical.radius + e.deltaY * 0.15));
  } else {
    targetSpherical.radius = Math.max(3, Math.min(60, targetSpherical.radius + e.deltaY * 0.05));
  }
});

// ─── Tactile ───
container.addEventListener('touchstart', (e) => {
  if (e.touches.length === 1) {
    isDragging = true;
    dragDist = 0;
    previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
});

container.addEventListener('touchmove', (e) => {
  if (!isDragging || e.touches.length !== 1) return;
  dragDist++;
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
  if (dragDist > 3) return; // c'était un drag, pas un clic
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(clickableMeshes, true);
  if (intersects.length > 0) {
    let obj = intersects[0].object;
    while (obj && !obj.userData.id) obj = obj.parent;
    if (obj && obj.userData.id) {
      flyToPlanet(obj.userData.id);
    }
  }
});

// Curseur dynamique au survol
container.addEventListener('mousemove', (e) => {
  if (isDragging) return;
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  container.style.cursor = raycaster.intersectObjects(clickableMeshes, true).length > 0 ? 'pointer' : 'grab';
});

// ─── Fly to planet ───
function flyToPlanet(id) {
  initAudio();

  if (id === 'lune') {
    focusTarget = 'lune';
    camMode = 'focus';
    targetSpherical.radius = 8;
    targetSpherical.theta = 0.5;
    targetSpherical.phi = 1.2;
    camLerp = 0.03;
    openPanel('lune');
  } else if (id.startsWith('moon_')) {
    focusTarget = id;
    camMode = 'focus';
    targetSpherical.radius = 15;
    targetSpherical.theta = 0.5;
    targetSpherical.phi = 1.2;
    camLerp = 0.03;
    openPanel(id);
  } else if (planets[id]) {
    focusTarget = id;
    camMode = 'focus';
    const r = planets[id].config.radius;
    targetSpherical.radius = r * 4 + 5;
    targetSpherical.theta = 0.5;
    targetSpherical.phi = 1.2;
    camLerp = 0.03;
    openPanel(id);
  } else {
    return;
  }

  document.getElementById('back-btn').classList.add('visible');
  document.querySelectorAll('.nav-dot').forEach(d => {
    d.classList.toggle('active', d.dataset.id === id);
  });
}
window.flyToPlanet = flyToPlanet;

// ─── Retour vue d'ensemble ───
function backToOverview() {
  camMode = 'overview';
  focusTarget = null;
  targetSpherical.radius = 200;
  targetSpherical.theta = 0.3;
  targetSpherical.phi = 1.0;
  camLookTarget.set(0, 0, 0);
  camLerp = 0.04;

  document.getElementById('back-btn').classList.remove('visible');
  closePanel();
  document.querySelectorAll('.nav-dot').forEach(d => d.classList.remove('active'));
}
window.backToOverview = backToOverview;

// Touche Échap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (camMode === 'focus') backToOverview();
    else closePanel();
  }
});

// ─── Mise à jour caméra (appelée dans la boucle) ───
function updateCamera() {
  spherical.theta  += (targetSpherical.theta  - spherical.theta)  * 0.06;
  spherical.phi    += (targetSpherical.phi    - spherical.phi)    * 0.06;
  spherical.radius += (targetSpherical.radius - spherical.radius) * 0.06;

  if (camMode === 'focus' && focusTarget) {
    // Position mondiale de la cible
    let targetPos = new THREE.Vector3();

    if (focusTarget === 'lune') {
      moonMesh.getWorldPosition(targetPos);
    } else if (focusTarget.startsWith('moon_')) {
      let found = false;
      for (const pid in planets) {
        const m = planets[pid].moons.find(mm => 'moon_' + mm.name === focusTarget);
        if (m) { m.mesh.getWorldPosition(targetPos); found = true; break; }
      }
      if (!found) planets.jupiter.mesh.getWorldPosition(targetPos);
    } else if (planets[focusTarget]) {
      planets[focusTarget].mesh.getWorldPosition(targetPos);
    }

    camLookTarget.lerp(targetPos, 0.06);
    camPosTarget.set(
      targetPos.x + spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta),
      targetPos.y + spherical.radius * Math.cos(spherical.phi),
      targetPos.z + spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta)
    );
  } else {
    // Vue d'ensemble
    camPosTarget.set(
      spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta),
      spherical.radius * Math.cos(spherical.phi),
      spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta)
    );
    camLookTarget.lerp(new THREE.Vector3(0, 0, 0), 0.04);
  }

  camPos.lerp(camPosTarget, camLerp);
  camTarget.lerp(camLookTarget, camLerp);
  camera.position.copy(camPos);
  camera.lookAt(camTarget);
}