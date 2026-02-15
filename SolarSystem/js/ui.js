// ═══════════════════════════════════════════
//  ui.js — Panneau d'information et contrôles UI
// ═══════════════════════════════════════════

// ─── Panneau d'information ───

function openPanel(planetId) {
  const data = PLANET_DATA[planetId];
  if (!data) return;

  const panel = document.getElementById('info-panel');
  panel.style.setProperty('--accent', data.accent);
  panel.style.setProperty('--accent2', data.accent2);
  panel.style.setProperty('--glow-color', data.accent + '55');

  document.getElementById('planet-name').textContent = data.name;
  document.getElementById('planet-subtitle').textContent = data.subtitle;
  drawPlanetIcon(planetId, data);

  // Construction du contenu
  let html = `<p class="description">${data.description}</p>`;

  // Caractéristiques
  html += `<div class="section-title">Caractéristiques</div>`;
  html += `<div class="stats-grid">`;
  data.stats.forEach(s => {
    html += `
      <div class="stat-card">
        <div class="stat-label">${s.label}</div>
        <div class="stat-value">${s.value} <span class="stat-unit">${s.unit}</span></div>
      </div>`;
  });
  html += `</div>`;

  // Composition
  if (data.composition && data.composition.length) {
    html += `<div class="section-title">Composition</div>`;
    data.composition.forEach(c => {
      html += `
        <div class="composition-bar">
          <div class="comp-label">
            <span>${c.element}</span><span>${c.pct}%</span>
          </div>
          <div class="comp-track">
            <div class="comp-fill" style="width: 0%;" data-target="${c.pct}"></div>
          </div>
        </div>`;
    });
  }

  // Fun fact
  html += `<div class="fun-fact">${data.funFact}</div>`;

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

// Exposer globalement pour le onclick du HTML
window.closePanel = closePanel;

// ─── Icône planète dans le panneau ───

function drawPlanetIcon(id, data) {
  const canvas = document.getElementById('planet-icon-canvas');
  const ctx = canvas.getContext('2d');
  const w = canvas.width, h = canvas.height;
  const cx = w / 2, cy = h / 2, r = 60;
  ctx.clearRect(0, 0, w, h);

  // Dégradé principal
  const grad = ctx.createRadialGradient(cx - r*0.3, cy - r*0.3, r*0.1, cx, cy, r);
  grad.addColorStop(0, lightenColor(data.accent, 40));
  grad.addColorStop(0.6, data.accent);
  grad.addColorStop(1, data.accent2 || darkenColor(data.accent, 40));

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  // Ombre portée
  const shadowGrad = ctx.createRadialGradient(
    cx + r*0.5, cy + r*0.3, 0,
    cx + r*0.5, cy + r*0.3, r * 1.2
  );
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
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(cx, cy, r * 1.6, r * 0.35, -0.3, 0, Math.PI * 2);
    ctx.stroke();
  }
}

// ─── Utilitaires couleur ───

function lightenColor(hex, amt) {
  const c = parseInt(hex.replace('#',''), 16);
  return `rgb(${Math.min(255,(c>>16)+amt)},${Math.min(255,((c>>8)&0xFF)+amt)},${Math.min(255,(c&0xFF)+amt)})`;
}

function darkenColor(hex, amt) {
  const c = parseInt(hex.replace('#',''), 16);
  return `rgb(${Math.max(0,(c>>16)-amt)},${Math.max(0,((c>>8)&0xFF)-amt)},${Math.max(0,(c&0xFF)-amt)})`;
}

// ─── Contrôle de vitesse ───

let speedMultiplier = 1;
const speedSlider = document.getElementById('speed-slider');
const speedValue = document.getElementById('speed-value');

speedSlider.addEventListener('input', () => {
  speedMultiplier = parseFloat(speedSlider.value);
  speedValue.textContent = speedMultiplier.toFixed(1) + 'x';
});