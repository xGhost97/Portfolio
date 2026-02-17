// ═══════════════════════════════════════════
//  controls.js — Contrôles caméra + fly-to (v2)
// ═══════════════════════════════════════════

// ─── État caméra ───
var isDragging = false;
var dragStartPos = { x: 0, y: 0 };
var previousMousePos = { x: 0, y: 0 };
var camMode = 'overview';
var focusTarget = null;

// Smooth camera
var camPos = new THREE.Vector3(0, 80, 200);
var camTarget = new THREE.Vector3(0, 0, 0);
var camPosTarget = new THREE.Vector3(0, 80, 200);
var camLookTarget = new THREE.Vector3(0, 0, 0);
var camLerp = 0.04;

// Coordonnées sphériques
var spherical = { theta: 0.3, phi: 1.0, radius: 200 };
var targetSpherical = { theta: 0.3, phi: 1.0, radius: 200 };

// ─── Souris ───
container.addEventListener('mousedown', function(e) {
  if (e.button === 0) {
    isDragging = true;
    dragStartPos = { x: e.clientX, y: e.clientY };
    previousMousePos = { x: e.clientX, y: e.clientY };
  }
});

container.addEventListener('mousemove', function(e) {
  if (!isDragging) return;
  var dx = e.clientX - previousMousePos.x;
  var dy = e.clientY - previousMousePos.y;
  targetSpherical.theta -= dx * 0.005;
  targetSpherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, targetSpherical.phi - dy * 0.005));
  previousMousePos = { x: e.clientX, y: e.clientY };
});

container.addEventListener('mouseup', function() { isDragging = false; });

container.addEventListener('wheel', function(e) {
  if (camMode === 'overview') {
    targetSpherical.radius = Math.max(20, Math.min(500, targetSpherical.radius + e.deltaY * 0.15));
  } else {
    targetSpherical.radius = Math.max(3, Math.min(60, targetSpherical.radius + e.deltaY * 0.05));
  }
});

// ─── Tactile ───
var touchStartPos = { x: 0, y: 0 };

container.addEventListener('touchstart', function(e) {
  if (e.touches.length === 1) {
    isDragging = true;
    touchStartPos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
});

container.addEventListener('touchmove', function(e) {
  if (!isDragging || e.touches.length !== 1) return;
  var dx = e.touches[0].clientX - previousMousePos.x;
  var dy = e.touches[0].clientY - previousMousePos.y;
  targetSpherical.theta -= dx * 0.005;
  targetSpherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, targetSpherical.phi - dy * 0.005));
  previousMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});

container.addEventListener('touchend', function() { isDragging = false; });

// ─── Raycasting ───
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function handleClick(clientX, clientY) {
  mouse.x = (clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(clickableMeshes, true);
  if (intersects.length > 0) {
    var obj = intersects[0].object;
    while (obj && !obj.userData.id) obj = obj.parent;
    if (obj && obj.userData.id) {
      flyToPlanet(obj.userData.id);
    }
  }
}

// Clic souris : vérifier que c'est un clic et pas un drag (distance en pixels)
container.addEventListener('click', function(e) {
  var dx = e.clientX - dragStartPos.x;
  var dy = e.clientY - dragStartPos.y;
  var distSq = dx * dx + dy * dy;
  if (distSq > 36) return; // plus de 6px = c'était un drag
  handleClick(e.clientX, e.clientY);
});

// Tap tactile
container.addEventListener('touchend', function(e) {
  if (e.changedTouches.length !== 1) return;
  var touch = e.changedTouches[0];
  var dx = touch.clientX - touchStartPos.x;
  var dy = touch.clientY - touchStartPos.y;
  var distSq = dx * dx + dy * dy;
  if (distSq > 100) return; // plus de 10px = c'était un drag
  handleClick(touch.clientX, touch.clientY);
});

// Curseur au survol
container.addEventListener('mousemove', function(e) {
  if (isDragging) return;
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  container.style.cursor = raycaster.intersectObjects(clickableMeshes, true).length > 0 ? 'pointer' : 'grab';
});

// ─── Fly to planet ───
function flyToPlanet(id) {
  try { if (typeof initAudio === 'function') initAudio(); } catch(e) {}

  // Ouvrir le panneau
  openPanel(id);

  // Configurer la caméra
  if (id === 'lune') {
    focusTarget = 'lune';
    camMode = 'focus';
    targetSpherical.radius = 8;
    targetSpherical.theta = 0.5;
    targetSpherical.phi = 1.2;
    camLerp = 0.03;
  } else if (id.indexOf('moon_') === 0) {
    focusTarget = id;
    camMode = 'focus';
    targetSpherical.radius = 15;
    targetSpherical.theta = 0.5;
    targetSpherical.phi = 1.2;
    camLerp = 0.03;
  } else if (planets[id]) {
    focusTarget = id;
    camMode = 'focus';
    var r = planets[id].config.radius;
    targetSpherical.radius = r * 4 + 5;
    targetSpherical.theta = 0.5;
    targetSpherical.phi = 1.2;
    camLerp = 0.03;
  } else {
    return;
  }

  document.getElementById('back-btn').classList.add('visible');
  var dots = document.querySelectorAll('.nav-dot');
  for (var i = 0; i < dots.length; i++) {
    if (dots[i].dataset.id === id) dots[i].classList.add('active');
    else dots[i].classList.remove('active');
  }
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
  var dots = document.querySelectorAll('.nav-dot');
  for (var i = 0; i < dots.length; i++) dots[i].classList.remove('active');
}
window.backToOverview = backToOverview;

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (camMode === 'focus') backToOverview();
    else closePanel();
  }
});

// ─── Mise à jour caméra ───
function updateCamera() {
  spherical.theta  += (targetSpherical.theta  - spherical.theta)  * 0.06;
  spherical.phi    += (targetSpherical.phi    - spherical.phi)    * 0.06;
  spherical.radius += (targetSpherical.radius - spherical.radius) * 0.06;

  if (camMode === 'focus' && focusTarget) {
    var targetPos = new THREE.Vector3();

    if (focusTarget === 'lune') {
      moonMesh.getWorldPosition(targetPos);
    } else if (focusTarget.indexOf('moon_') === 0) {
      var found = false;
      for (var pid in planets) {
        var moons = planets[pid].moons;
        for (var j = 0; j < moons.length; j++) {
          if ('moon_' + moons[j].name === focusTarget) {
            moons[j].mesh.getWorldPosition(targetPos);
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (!found && planets.jupiter) planets.jupiter.mesh.getWorldPosition(targetPos);
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