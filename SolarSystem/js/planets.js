// ═══════════════════════════════════════════
//  planets.js — Planètes, lunes, astéroïdes (v2)
// ═══════════════════════════════════════════

const planets = {};
const clickableMeshes = [];

// ─── Construction de chaque planète ───
PLANET_CONFIGS.forEach(cfg => {
  const texture = generateTexture(cfg.id);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;

  const geo = new THREE.SphereGeometry(cfg.radius, 64, 64);
  const mat = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: cfg.id === 'soleil' ? 1 : 0.75,
    metalness: 0.05,
    emissive: 0xffffff,
    emissiveMap: texture,
    emissiveIntensity: cfg.emissiveI,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = { id: cfg.id, ...cfg };

  // ── Soleil : corona à 3 couches ──
  if (cfg.id === 'soleil') {
    mesh.add(new THREE.Mesh(
      new THREE.SphereGeometry(cfg.radius * 1.2, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xFDB813, transparent: true, opacity: 0.12 })
    ));
    mesh.add(new THREE.Mesh(
      new THREE.SphereGeometry(cfg.radius * 1.5, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xFF8C00, transparent: true, opacity: 0.04 })
    ));
    mesh.add(new THREE.Mesh(
      new THREE.SphereGeometry(cfg.radius * 2.2, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0xFFA500, transparent: true, opacity: 0.015 })
    ));
  }

  // ── Terre : nuages + atmosphère ──
  if (cfg.id === 'terre') {
    const cloudTex = generateCloudTexture();
    const clouds = new THREE.Mesh(
      new THREE.SphereGeometry(cfg.radius * 1.012, 48, 48),
      new THREE.MeshStandardMaterial({ map: cloudTex, transparent: true, opacity: 0.5, depthWrite: false })
    );
    mesh.add(clouds);
    mesh.userData.clouds = clouds;

    // Atmosphère glow
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x4488ff, transparent: true, opacity: 0.08, side: THREE.BackSide
    });
    mesh.add(new THREE.Mesh(new THREE.SphereGeometry(cfg.radius * 1.06, 32, 32), atmosMat));
  }

  // ── Saturne : anneaux texturés ──
  if (cfg.id === 'saturne') {
    const ringTex = generateRingTexture();
    const ringGeo = new THREE.RingGeometry(cfg.radius * 1.3, cfg.radius * 2.3, 128);
    const uvs = ringGeo.attributes.uv;
    const pos = ringGeo.attributes.position;
    for (let i = 0; i < uvs.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      uvs.setXY(i, (dist - cfg.radius * 1.3) / (cfg.radius), 0.5);
    }
    const ring = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({
      map: ringTex, side: THREE.DoubleSide, transparent: true, opacity: 0.85,
      emissive: 0xC4A870, emissiveIntensity: 0.12
    }));
    ring.rotation.x = Math.PI / 2.3;
    mesh.add(ring);
  }

  // ── Uranus : anneaux fins + inclinaison ──
  if (cfg.id === 'uranus') {
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(cfg.radius * 1.5, cfg.radius * 1.8, 64),
      new THREE.MeshStandardMaterial({
        color: 0x9BD8E8, side: THREE.DoubleSide, transparent: true, opacity: 0.18,
        emissive: 0x5AA8C0, emissiveIntensity: 0.12
      })
    );
    ring.rotation.x = Math.PI / 8;
    mesh.add(ring);
    mesh.rotation.z = 98 * Math.PI / 180;
  }

  // ── Pivot orbital ──
  const pivot = new THREE.Object3D();
  pivot.add(mesh);
  mesh.position.x = cfg.dist;
  scene.add(pivot);

  if (cfg.dist > 0) {
    scene.add(createOrbitRing(cfg.dist));
  }

  planets[cfg.id] = { mesh, pivot, config: cfg, moons: [] };
  clickableMeshes.push(mesh);
  updateLoad();
});

// ─── Lune de la Terre ───
const moonTexture = generateTexture('lune');
const moonMesh = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture, roughness: 0.85,
    emissive: 0xffffff, emissiveMap: moonTexture, emissiveIntensity: 0.15
  })
);
moonMesh.userData = { id: 'lune', radius: 0.5 };
const moonPivot = new THREE.Object3D();
moonPivot.add(moonMesh);
moonMesh.position.x = 4.5;
scene.add(moonPivot);
clickableMeshes.push(moonMesh);
updateLoad();

// ─── Lunes des géantes ───
function addMiniMoon(parentId, name, dist, radius, speed, colorHex) {
  const geo = new THREE.SphereGeometry(radius, 16, 16);
  const mat = new THREE.MeshStandardMaterial({
    color: colorHex, emissive: colorHex, emissiveIntensity: 0.3, roughness: 0.8
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.userData = { id: 'moon_' + name, radius: radius, parentPlanet: parentId, moonName: name };
  const pivot = new THREE.Object3D();
  pivot.add(mesh);
  mesh.position.x = dist;
  planets[parentId].moons.push({ mesh, pivot, speed, name });
  clickableMeshes.push(mesh);
}

// Jupiter
addMiniMoon('jupiter', 'Io',        6.5,  0.35, 3.5, 0xC8A840);
addMiniMoon('jupiter', 'Europe',     7.8,  0.3,  2.5, 0x9BAFBF);
addMiniMoon('jupiter', 'Ganymède',   9.5,  0.4,  1.5, 0x8A8070);
addMiniMoon('jupiter', 'Callisto',   11.5, 0.38, 0.8, 0x6A6050);

// Saturne
addMiniMoon('saturne', 'Titan',      8.5,  0.5,  1.2, 0xD4A030);
addMiniMoon('saturne', 'Encelade',   6.5,  0.2,  2.8, 0xE8E8F0);

// ─── Ceinture d'astéroïdes (InstancedMesh) ───
const asteroidCount = 2500;
const asteroidGeo = new THREE.SphereGeometry(0.15, 6, 6);
const asteroidMat = new THREE.MeshStandardMaterial({
  color: 0x888070, roughness: 0.9, emissive: 0x444038, emissiveIntensity: 0.15
});
const asteroids = new THREE.InstancedMesh(asteroidGeo, asteroidMat, asteroidCount);
const asteroidData = [];
const dummy = new THREE.Object3D();

for (let i = 0; i < asteroidCount; i++) {
  const angle = Math.random() * Math.PI * 2;
  const dist = 56 + Math.random() * 12; // entre Mars (48) et Jupiter (72)
  const y = (Math.random() - 0.5) * 3;
  const scale = 0.3 + Math.random() * 1.2;
  const speed = 0.3 + Math.random() * 0.3;
  asteroidData.push({ angle, dist, y, scale, speed });

  dummy.position.set(Math.cos(angle) * dist, y, Math.sin(angle) * dist);
  dummy.scale.set(scale, scale * 0.7, scale);
  dummy.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
  dummy.updateMatrix();
  asteroids.setMatrixAt(i, dummy.matrix);
}
asteroids.instanceMatrix.needsUpdate = true;
scene.add(asteroids);
updateLoad();