// ═══════════════════════════════════════════
//  main.js — Boucle d'animation (v2)
// ═══════════════════════════════════════════

let time = 0;
updateLoad(); // Dernière étape du chargement

function animate() {
  requestAnimationFrame(animate);
  time += 0.005 * speedMultiplier;

  // ── Caméra ──
  updateCamera();

  // ── Orbites et rotations planétaires ──
  for (const key in planets) {
    const p = planets[key];
    if (p.config.dist > 0) {
      p.pivot.rotation.y = time * p.config.speed;
    }
    p.mesh.rotation.y += p.config.rotSpeed * speedMultiplier;

    // Lunes des géantes : suivre la planète parent
    if (p.moons.length > 0) {
      const wp = new THREE.Vector3();
      p.mesh.getWorldPosition(wp);
      p.moons.forEach(m => {
        if (!m.pivot.parent) scene.add(m.pivot);
        m.pivot.position.copy(wp);
        m.pivot.rotation.y = time * m.speed;
      });
    }
  }

  // ── Nuages terrestres ──
  if (planets.terre.mesh.userData.clouds) {
    planets.terre.mesh.userData.clouds.rotation.y += 0.0008 * speedMultiplier;
  }

  // ── Lune → Terre ──
  const earthWorldPos = new THREE.Vector3();
  planets.terre.mesh.getWorldPosition(earthWorldPos);
  moonPivot.position.copy(earthWorldPos);
  moonPivot.rotation.y = time * 12;

  // ── Pulsation du Soleil ──
  const sunScale = 1 + Math.sin(time * 8) * 0.006;
  planets.soleil.mesh.scale.set(sunScale, sunScale, sunScale);

  // ── Ceinture d'astéroïdes ──
  for (let i = 0; i < asteroidCount; i++) {
    const a = asteroidData[i];
    const ang = a.angle + time * a.speed;
    dummy.position.set(
      Math.cos(ang) * a.dist,
      a.y + Math.sin(time * 2 + i) * 0.2,
      Math.sin(ang) * a.dist
    );
    dummy.scale.set(a.scale, a.scale * 0.7, a.scale);
    dummy.rotation.x = time * 0.5 + i;
    dummy.rotation.z = time * 0.3 + i * 0.5;
    dummy.updateMatrix();
    asteroids.setMatrixAt(i, dummy.matrix);
  }
  asteroids.instanceMatrix.needsUpdate = true;

  // ── Rendu ──
  renderer.render(scene, camera);
}

// ─── Démarrage ───
setTimeout(() => {
  document.getElementById('loader').classList.add('done');
  animate();
}, 300);

// ─── Redimensionnement ───
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});