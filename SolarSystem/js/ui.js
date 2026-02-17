// ═══════════════════════════════════════════
//  ui.js — Interface utilisateur (v2)
// ═══════════════════════════════════════════

// ─── Panneau d'information ───

function openPanel(id) {
  // Gestion des mini-lunes des géantes
  let data = PLANET_DATA[id];
  if (!data) {
    for (const pid in planets) {
      const found = planets[pid].moons.find(m => 'moon_' + m.name === id);
      if (found) {
        data = {
          name: found.name,
          subtitle: "Satellite de " + PLANET_DATA[pid].name,
          accent: PLANET_DATA[pid].accent,
          accent2: PLANET_DATA[pid].accent2,
          description: "Lune majeure de " + PLANET_DATA[pid].name + ".",
          stats: [], composition: [], funFact: "", moons: []
        };
        break;
      }
    }
    if (!data) return;
  }

  const panel = document.getElementById('info-panel');
  panel.style.setProperty('--accent', data.accent);
  panel.style.setProperty('--accent2', data.accent2);
  panel.style.setProperty('--glow-color', data.accent + '55');

  document.getElementById('planet-name').textContent = data.name;
  document.getElementById('planet-subtitle').textContent = data.subtitle;
  drawPlanetIcon(id, data);

  // Construction du contenu
  let html = '<p class="description">' + data.description + '</p>';

  // Caractéristiques
  if (data.stats && data.stats.length) {
    html += '<div class="section-title">Caractéristiques</div>';
    html += '<div class="stats-grid">';
    data.stats.forEach(s => {
      html += '<div class="stat-card">';
      html += '<div class="stat-label">' + s.label + '</div>';
      html += '<div class="stat-value">' + s.value + ' <span class="stat-unit">' + s.unit + '</span></div>';
      html += '</div>';
    });
    html += '</div>';
  }

  // Composition
  if (data.composition && data.composition.length) {
    html += '<div class="section-title">Composition</div>';
    data.composition.forEach(c => {
      html += '<div class="composition-bar">';
      html += '<div class="comp-label"><span>' + c.element + '</span><span>' + c.pct + '%</span></div>';
      html += '<div class="comp-track"><div class="comp-fill" style="width: 0%;" data-target="' + c.pct + '"></div></div>';
      html += '</div>';
    });
  }

  // Lunes principales
  if (data.moons && data.moons.length) {
    html += '<div class="moons-section"><div class="section-title">Lunes principales</div>';
    data.moons.forEach(m => {
      html += '<span class="moon-tag">' + m + '</span>';
    });
    html += '</div>';
  }

  // Fun fact
  if (data.funFact) {
    html += '<div class="fun-fact">' + data.funFact + '</div>';
  }

  document.getElementById('panel-body').innerHTML = html;
  panel.classList.add('open');

  // Animation des barres de composition
  requestAnimationFrame(() => {
    document.querySelectorAll('.comp-fill').forEach(bar => {
      bar.style.width = bar.dataset.target + '%';
    });
  });
}

function closePanel() {
  document.getElementById('info-panel').classList.remove('open');
}
window.closePanel = closePanel;

// ─── Icône planète dans le panneau ───

function drawPlanetIcon(id, data) {
  const canvas = document.getElementById('planet-icon-canvas');
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const cx = w / 2, cy = h / 2, r = 54;
  ctx.clearRect(0, 0, w, h);

  const grad = ctx.createRadialGradient(cx - r * 0.3, cy - r * 0.3, r * 0.1, cx, cy, r);
  grad.addColorStop(0, lightenColor(data.accent, 40));
  grad.addColorStop(0.6, data.accent);
  grad.addColorStop(1, data.accent2 || darkenColor(data.accent, 40));

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Ombre
  const shadowGrad = ctx.createRadialGradient(cx + r * 0.5, cy + r * 0.3, 0, cx + r * 0.5, cy + r * 0.3, r * 1.2);
  shadowGrad.addColorStop(0, 'rgba(0,0,0,0.5)');
  shadowGrad.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.globalCompositeOperation = 'multiply';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = shadowGrad;
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';

  // Anneaux de Saturne sur l'icône
  if (id === 'saturne') {
    ctx.strokeStyle = data.accent + '88';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 1.6, r * 0.3, -0.3, 0, Math.PI * 2);
    ctx.stroke();
  }
}

// ─── Utilitaires couleur ───

function lightenColor(hex, amt) {
  const c = parseInt(hex.replace('#', ''), 16);
  return 'rgb(' + Math.min(255, (c >> 16) + amt) + ',' + Math.min(255, ((c >> 8) & 0xFF) + amt) + ',' + Math.min(255, (c & 0xFF) + amt) + ')';
}

function darkenColor(hex, amt) {
  const c = parseInt(hex.replace('#', ''), 16);
  return 'rgb(' + Math.max(0, (c >> 16) - amt) + ',' + Math.max(0, ((c >> 8) & 0xFF) - amt) + ',' + Math.max(0, (c & 0xFF) - amt) + ')';
}

// ─── Contrôle de vitesse ───

let speedMultiplier = 1;
const speedSlider = document.getElementById('speed-slider');
const speedValue = document.getElementById('speed-value');

speedSlider.addEventListener('input', () => {
  speedMultiplier = parseFloat(speedSlider.value);
  speedValue.textContent = speedMultiplier.toFixed(1) + 'x';
});

// ─── Barre de recherche ───

const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const allSearchable = Object.entries(PLANET_DATA).map(([k, v]) => ({
  id: k,
  name: v.name,
  type: k === 'soleil' ? 'Étoile' : k === 'lune' ? 'Satellite' : 'Planète',
  color: v.accent
}));

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase().trim();
  if (!q) { searchResults.classList.remove('open'); return; }

  const results = allSearchable.filter(p => p.name.toLowerCase().includes(q));
  if (!results.length) { searchResults.classList.remove('open'); return; }

  searchResults.innerHTML = results.map(r =>
    '<div class="search-item" onclick="flyToPlanet(\'' + r.id + '\')">' +
    '<span class="search-dot" style="background:' + r.color + '"></span>' +
    r.name +
    '<span class="search-type">' + r.type + '</span></div>'
  ).join('');
  searchResults.classList.add('open');
});

searchInput.addEventListener('blur', () => {
  setTimeout(() => searchResults.classList.remove('open'), 200);
});

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = searchInput.value.toLowerCase().trim();
    const r = allSearchable.find(p => p.name.toLowerCase().includes(q));
    if (r) {
      flyToPlanet(r.id);
      searchResults.classList.remove('open');
      searchInput.blur();
    }
  }
});

// ─── Navigation planètes (dots) ───

const navContainer = document.getElementById('planet-nav');
PLANET_CONFIGS.forEach(cfg => {
  const d = PLANET_DATA[cfg.id];
  if (!d) return;
  const dot = document.createElement('div');
  dot.className = 'nav-dot';
  dot.dataset.id = cfg.id;
  dot.innerHTML = '<div class="dot-inner" style="background:' + d.navColor + '"></div>' +
    '<span class="nav-tooltip">' + d.name + '</span>';
  dot.addEventListener('click', () => flyToPlanet(cfg.id));
  navContainer.appendChild(dot);
});