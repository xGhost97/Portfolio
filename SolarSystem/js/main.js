// ═══════════════════════════════════════════
//  main.js — Boucle d'animation principale
// ═══════════════════════════════════════════

let time = 0;

function animate() {
  requestAnimationFrame(animate);
  time += 0.005 * speedMultiplier;

  // Caméra
  updateCamera();

  // Rotation et orbite des planètes
  for (const key in planets) {
    const p = planets[key];
    if (p.config.dist > 0) {
      p.pivot.rotation.y = time * p.config.speed;
    }
    p.mesh.rotation.y += p.config.rotSpeed * speedMultiplier;
  }

  // Nuages terrestres
  if (planets.terre.mesh.userData.clouds) {
    planets.terre.mesh.userData.clouds.rotation.y += 0.001 * speedMultiplier;
  }

  // Orbite de la Lune autour de la Terre
  const earthWorldPos = new THREE.Vector3();
  planets.terre.mesh.getWorldPosition(earthWorldPos);
  moonPivot.position.copy(earthWorldPos);
  moonPivot.rotation.y = time * 12;

  // Pulsation du Soleil
  const sunScale = 1 + Math.sin(time * 8) * 0.008;
  planets.soleil.mesh.scale.set(sunScale, sunScale, sunScale);

  // Rendu
  renderer.render(scene, camera);
}

// ─── Démarrage ───
animate();