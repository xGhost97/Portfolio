// ═══════════════════════════════════════════
//  textures.js — Génération procédurale des textures
// ═══════════════════════════════════════════

function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function noise2D(x, y, seed) {
  const rng = seededRandom(Math.floor(x * 1000 + y * 7000 + seed));
  return rng();
}

function smoothNoise(x, y, seed) {
  const ix = Math.floor(x), iy = Math.floor(y);
  const fx = x - ix, fy = y - iy;
  const v00 = noise2D(ix, iy, seed);
  const v10 = noise2D(ix+1, iy, seed);
  const v01 = noise2D(ix, iy+1, seed);
  const v11 = noise2D(ix+1, iy+1, seed);
  const i1 = v00 * (1-fx) + v10 * fx;
  const i2 = v01 * (1-fx) + v11 * fx;
  return i1 * (1-fy) + i2 * fy;
}

function fbm(x, y, seed, octaves = 5) {
  let val = 0, amp = 0.5, freq = 1;
  for (let i = 0; i < octaves; i++) {
    val += amp * smoothNoise(x * freq, y * freq, seed + i * 100);
    amp *= 0.5;
    freq *= 2;
  }
  return val;
}

function lerpColor(r1,g1,b1, r2,g2,b2, t) {
  return [
    Math.round(r1 + (r2-r1)*t),
    Math.round(g1 + (g2-g1)*t),
    Math.round(b1 + (b2-b1)*t)
  ];
}

// ─── Générateurs par planète ───

const textureGenerators = {
  soleil(d, size) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const nx = x / size * 8, ny = y / size * 8;
        const n = fbm(nx, ny, 42, 6);
        const n2 = fbm(nx * 2 + 100, ny * 2 + 100, 77, 4);
        d[i]   = Math.min(255, 200 + n * 55);
        d[i+1] = Math.min(255, 140 + n * 60 + n2 * 30);
        d[i+2] = Math.min(255, 20 + n2 * 40);
        d[i+3] = 255;
      }
    }
  },

  mercure(d, size) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const nx = x/size*10, ny = y/size*10;
        const base = fbm(nx, ny, 11, 5);
        const craters = fbm(nx*3, ny*3, 55, 4);
        const v = 100 + base * 60 + craters * 30;
        d[i]   = Math.min(255, v * 1.0);
        d[i+1] = Math.min(255, v * 0.92);
        d[i+2] = Math.min(255, v * 0.85);
        d[i+3] = 255;
      }
    }
  },

  venus(d, size) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const nx = x/size*6, ny = y/size*6;
        const swirl = fbm(nx + Math.sin(ny*2)*0.5, ny, 33, 5);
        const clouds = fbm(nx*2, ny*1.5+100, 88, 4);
        d[i]   = Math.min(255, 190 + swirl * 50 + clouds * 15);
        d[i+1] = Math.min(255, 155 + swirl * 40 + clouds * 10);
        d[i+2] = Math.min(255, 80 + swirl * 20 + clouds * 15);
        d[i+3] = 255;
      }
    }
  },

  terre(d, size) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const nx = x/size*8, ny = y/size*8;
        const continent = fbm(nx, ny, 7, 6);
        const detail = fbm(nx*3, ny*3, 22, 3);
        const lat = Math.abs(y / size - 0.5) * 2;
        const iceCap = lat > 0.85 ? (lat - 0.85) / 0.15 : 0;

        let r, g, b;
        if (iceCap > 0.3) {
          [r, g, b] = lerpColor(220,225,230, 250,252,255, iceCap);
        } else if (continent > 0.48) {
          const landN = (continent - 0.48) / 0.52;
          if (landN > 0.5) {
            [r, g, b] = lerpColor(80,120,50, 140,130,80, (landN-0.5)*2);
          } else {
            [r, g, b] = lerpColor(50,100,40, 80,130,55, landN*2);
          }
          r += detail * 15; g += detail * 10; b += detail * 8;
        } else {
          const oceanDepth = continent / 0.48;
          [r, g, b] = lerpColor(15,30,80, 30,70,140, oceanDepth);
          r += detail * 5; g += detail * 8; b += detail * 12;
        }
        d[i]   = Math.min(255, Math.max(0, r));
        d[i+1] = Math.min(255, Math.max(0, g));
        d[i+2] = Math.min(255, Math.max(0, b));
        d[i+3] = 255;
      }
    }
  },

  lune(d, size) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const nx = x/size*12, ny = y/size*12;
        const base = fbm(nx, ny, 99, 5);
        const craters = fbm(nx*4, ny*4, 44, 3);
        const maria = fbm(nx*0.8, ny*0.8, 123, 3);
        let v = 130 + base * 50;
        if (maria < 0.4) v -= 40;
        v += craters * 15;
        d[i] = Math.min(255, v);
        d[i+1] = Math.min(255, v * 0.97);
        d[i+2] = Math.min(255, v * 0.94);
        d[i+3] = 255;
      }
    }
  },

  mars(d, size) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const nx = x/size*8, ny = y/size*8;
        const terrain = fbm(nx, ny, 55, 6);
        const detail = fbm(nx*4, ny*4, 88, 3);
        const lat = Math.abs(y / size - 0.5) * 2;
        const iceCap = lat > 0.9 ? (lat - 0.9) / 0.1 : 0;

        let r, g, b;
        if (iceCap > 0.3) {
          [r, g, b] = lerpColor(180,120,80, 230,225,220, iceCap);
        } else {
          [r, g, b] = lerpColor(150,60,30, 210,130,70, terrain);
          r += detail * 15; g += detail * 8; b += detail * 5;
          if (terrain < 0.35) { r -= 30; g -= 15; b -= 5; }
        }
        d[i]   = Math.min(255, Math.max(0, r));
        d[i+1] = Math.min(255, Math.max(0, g));
        d[i+2] = Math.min(255, Math.max(0, b));
        d[i+3] = 255;
      }
    }
  },

  jupiter(d, size) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const nx = x/size*6, ny = y/size;
        const band = Math.sin(ny * Math.PI * 14) * 0.5 + 0.5;
        const band2 = Math.sin(ny * Math.PI * 28 + 1) * 0.3;
        const turbulence = fbm(nx + Math.sin(ny*20)*0.3, ny*8, 77, 5);
        const swirl = fbm(nx*3 + turbulence, ny*3, 44, 3);

        let r, g, b;
        const bandVal = band + band2 * 0.3 + turbulence * 0.2;
        if (bandVal > 0.6) {
          [r, g, b] = lerpColor(210,190,160, 235,220,195, swirl);
        } else if (bandVal > 0.35) {
          [r, g, b] = lerpColor(180,140,100, 200,160,120, swirl);
        } else {
          [r, g, b] = lerpColor(140,90,60, 170,110,75, swirl);
        }

        // Grande Tache Rouge
        const spotX = 0.65, spotY = 0.58;
        const dx = (x/size - spotX), dy = (y/size - spotY);
        const spotDist = Math.sqrt(dx*dx*4 + dy*dy*16);
        if (spotDist < 0.08) {
          const spotBlend = 1 - spotDist / 0.08;
          const sr = 190 + swirl * 20, sg = 80 + swirl * 15, sb = 60;
          r = r * (1-spotBlend) + sr * spotBlend;
          g = g * (1-spotBlend) + sg * spotBlend;
          b = b * (1-spotBlend) + sb * spotBlend;
        }

        d[i]   = Math.min(255, Math.max(0, r));
        d[i+1] = Math.min(255, Math.max(0, g));
        d[i+2] = Math.min(255, Math.max(0, b));
        d[i+3] = 255;
      }
    }
  },

  saturne(d, size) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const nx = x/size*6, ny = y/size;
        const band = Math.sin(ny * Math.PI * 18) * 0.5 + 0.5;
        const turb = fbm(nx + Math.sin(ny*15)*0.2, ny*6, 33, 4);

        let r, g, b;
        if (band > 0.55) {
          [r, g, b] = lerpColor(225,210,170, 240,225,190, turb);
        } else if (band > 0.3) {
          [r, g, b] = lerpColor(200,180,140, 215,195,155, turb);
        } else {
          [r, g, b] = lerpColor(175,155,115, 195,170,130, turb);
        }
        d[i] = Math.min(255, r); d[i+1] = Math.min(255, g); d[i+2] = Math.min(255, b);
        d[i+3] = 255;
      }
    }
  },

  uranus(d, size) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const nx = x/size*5, ny = y/size*5;
        const n = fbm(nx, ny, 66, 4);
        const band = Math.sin((y/size) * Math.PI * 8) * 0.1;
        d[i]   = Math.min(255, 150 + n * 25 + band * 20);
        d[i+1] = Math.min(255, 200 + n * 20 + band * 15);
        d[i+2] = Math.min(255, 220 + n * 15 + band * 10);
        d[i+3] = 255;
      }
    }
  },

  neptune(d, size) {
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        const nx = x/size*6, ny = y/size*6;
        const n = fbm(nx, ny, 88, 5);
        const storm = fbm(nx*3, ny*2, 44, 3);
        const band = Math.sin((y/size) * Math.PI * 10) * 0.15;
        d[i]   = Math.min(255, Math.max(0, 30 + n * 25 + storm * 15));
        d[i+1] = Math.min(255, Math.max(0, 60 + n * 30 + band * 30));
        d[i+2] = Math.min(255, Math.max(0, 160 + n * 40 + storm * 20 + band * 20));
        d[i+3] = 255;
      }
    }
  }
};

// ─── Fonctions publiques ───

function generateTexture(id, size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(size, size);

  if (textureGenerators[id]) {
    textureGenerators[id](imgData.data, size);
  }

  ctx.putImageData(imgData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

function generateRingTexture(size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(size, 64);
  const d = imgData.data;

  for (let x = 0; x < size; x++) {
    const t = x / size;
    const ring = Math.sin(t * Math.PI * 60) * 0.3 + 0.5;
    const detail = Math.sin(t * Math.PI * 200) * 0.1;
    const gap1 = (t > 0.38 && t < 0.42) ? 0.05 : 1; // Cassini Division
    const gap2 = (t > 0.15 && t < 0.17) ? 0.1 : 1;
    const opacity = Math.max(0, (ring + detail) * gap1 * gap2);
    const r = 210 + t * 30, g = 195 + t * 20, b = 170 + t * 10;
    for (let y = 0; y < 64; y++) {
      const i = (y * size + x) * 4;
      d[i] = Math.min(255, r); d[i+1] = Math.min(255, g); d[i+2] = Math.min(255, b);
      d[i+3] = Math.min(255, opacity * 200);
    }
  }
  ctx.putImageData(imgData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}

function generateCloudTexture(size = 512) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(size, size);
  const d = imgData.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const nx = x/size*8, ny = y/size*8;
      const cloud = fbm(nx, ny, 111, 5);
      const alpha = Math.max(0, (cloud - 0.35) * 3);
      d[i] = 255; d[i+1] = 255; d[i+2] = 255;
      d[i+3] = Math.min(180, alpha * 180);
    }
  }
  ctx.putImageData(imgData, 0, 0);
  return new THREE.CanvasTexture(canvas);
}