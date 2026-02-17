// ═══════════════════════════════════════════
//  audio.js — Audio ambiant spatial (v2 - NOUVEAU)
// ═══════════════════════════════════════════

let audioCtx, masterGain, isAudioInit = false, isMuted = false;

function initAudio() {
  if (isAudioInit) return;
  isAudioInit = true;

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0.3;
  masterGain.connect(audioCtx.destination);

  // ── Drones basse fréquence ──
  function createDrone(freq, gain) {
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    const f = audioCtx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.value = freq;
    g.gain.value = gain;
    f.type = 'lowpass';
    f.frequency.value = 200;

    osc.connect(f);
    f.connect(g);
    g.connect(masterGain);
    osc.start();

    // LFO lent pour variation
    const lfo = audioCtx.createOscillator();
    const lfoG = audioCtx.createGain();
    lfo.frequency.value = 0.05 + Math.random() * 0.1;
    lfo.type = 'sine';
    lfoG.gain.value = freq * 0.02;
    lfo.connect(lfoG);
    lfoG.connect(osc.frequency);
    lfo.start();
  }

  createDrone(55, 0.08);
  createDrone(82.5, 0.04);
  createDrone(110, 0.02);
  createDrone(36.7, 0.06);

  // ── Bruit spatial filtré ──
  const bufSize = audioCtx.sampleRate * 4;
  const buf = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.015;
  }

  const noise = audioCtx.createBufferSource();
  const nf = audioCtx.createBiquadFilter();
  const ng = audioCtx.createGain();

  noise.buffer = buf;
  noise.loop = true;
  nf.type = 'lowpass';
  nf.frequency.value = 300;
  ng.gain.value = 0.5;

  noise.connect(nf);
  nf.connect(ng);
  ng.connect(masterGain);
  noise.start();
}

// Démarrer l'audio au premier clic/touch
document.addEventListener('click', () => initAudio(), { once: true });
document.addEventListener('touchstart', () => initAudio(), { once: true });

// ── Contrôles volume ──
const volSlider = document.getElementById('volume-slider');
const volIcon = document.getElementById('volume-icon');

volSlider.addEventListener('input', () => {
  if (masterGain) masterGain.gain.value = parseFloat(volSlider.value);
  isMuted = volSlider.value == 0;
  volIcon.textContent = isMuted ? '🔇' : '🔊';
});

function toggleMute() {
  isMuted = !isMuted;
  if (masterGain) masterGain.gain.value = isMuted ? 0 : parseFloat(volSlider.value);
  volIcon.textContent = isMuted ? '🔇' : '🔊';
}
window.toggleMute = toggleMute;