// ═══════════════════════════════════════════
//  planets.js — Création des planètes et de la Lune
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

  // ── Soleil : halo lumineux ──
  if (cfg.id === 'soleil') {
    const glowGeo = new THREE.SphereGeometry(cfg.radius * 1.25, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xFDB813, transparent: true, opacity: 0.12
    });
    mesh.add(new THREE.Mesh(glowGeo, glowMat));

    const glow2Geo = new THREE.SphereGeometry(cfg.radius * 1.6, 32, 32);
    const glow2Mat = new THREE.MeshBasicMaterial({
      color: 0xFF8C00, transparent: true, opacity: 0.04
    });
    mesh.add(new THREE.Mesh(glow2Geo, glow2Mat));
  }

  // ── Terre : couche de nuages ──
  if (cfg.id === 'terre') {
    const cloudTex = generateCloudTexture();
    const cloudGeo = new THREE.SphereGeometry(cfg.radius * 1.015, 48, 48);
    const cloudMat = new THREE.MeshStandardMaterial({
      map: cloudTex,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const clouds = new THREE.Mesh(cloudGeo, cloudMat);
    mesh.add(clouds);
    mesh.userData.clouds = clouds;
  }

  // ── Saturne : anneaux texturés ──
  if (cfg.id === 'saturne') {
    const ringTex = generateRingTexture();
    const ringGeo = new THREE.RingGeometry(cfg.radius * 1.3, cfg.radius * 2.3, 128);

    // Correction des UV pour mapper la texture radiale
    const uvs = ringGeo.attributes.uv;
    const pos = ringGeo.attributes.position;
    for (let i = 0; i < uvs.count; i++) {
      const x = pos.getX(i), y = pos.getY(i);
      const dist = Math.sqrt(x*x + y*y);
      const u = (dist - cfg.radius * 1.3) / (cfg.radius * 1.0);
      uvs.setXY(i, u, 0.5);
    }

    const ringMat = new THREE.MeshStandardMaterial({
      map: ringTex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      emissive: 0xC4A870,
      emissiveIntensity: 0.15,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    mesh.add(ring);
  }

  // ── Uranus : anneaux fins + inclinaison axiale ──
  if (cfg.id === 'uranus') {
    const ringGeo = new THREE.RingGeometry(cfg.radius * 1.5, cfg.radius * 1.8, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x9BD8E8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
      emissive: 0x5AA8C0,
      emissiveIntensity: 0.15,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 8;
    mesh.add(ring);
    mesh.rotation.z = 98 * Math.PI / 180; // Inclinaison réelle de 98°
  }

  // ── Pivot orbital ──
  const pivot = new THREE.Object3D();
  pivot.add(mesh);
  mesh.position.x = cfg.dist;
  scene.add(pivot);

  if (cfg.dist > 0) {
    scene.add(createOrbitRing(cfg.dist));
  }

  planets[cfg.id] = { mesh, pivot, config: cfg };
  clickableMeshes.push(mesh);
});

// ─── Lune ───
const moonTexture = generateTexture('lune');
const moonGeo = new THREE.SphereGeometry(0.5, 32, 32);
const moonMat = new THREE.MeshStandardMaterial({
  map: moonTexture,
  roughness: 0.85,
  emissive: 0xffffff,
  emissiveMap: moonTexture,
  emissiveIntensity: 0.15,
});
const moonMesh = new THREE.Mesh(moonGeo, moonMat);
moonMesh.userData = { id: 'lune', radius: 0.5 };

const moonPivot = new THREE.Object3D();
moonPivot.add(moonMesh);
moonMesh.position.x = 4.5;
scene.add(moonPivot);
clickableMeshes.push(moonMesh);