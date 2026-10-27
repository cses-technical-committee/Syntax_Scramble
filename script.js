/**
 * ==========================================================================
 * THINK FORGE — SYNTAX SCRAMBLE
 * Core Game Engine, Drag-and-Drop Workspace, State Management & Audio
 * ==========================================================================
 */

// ==========================================================================
// 1. GLOBAL CONFIGURATION & CONSTANTS
// ==========================================================================

/**
 * Configure your Formspree endpoint URL here.
 * Example: const FORMSPREE_ENDPOINT = "https://formspree.io/f/mqazknyz";
 * Note: Registration uses a local simulation if this remains a placeholder.
 * Final results are reported as unsent until a real endpoint is configured.
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xyekrqzb";

const EVENT_CONFIG = {
  eventName: "THINK FORGE",
  phaseName: "SYNTAX SCRAMBLE",
  startingScore: 150,
  attemptPenalties: [20, 30, 40],
  maxAttempts: 3,
  indentUnitSpaces: 4, // 4 spaces per indent level
  maxIndentLevel: 4
};

// ==========================================================================
// 2. CENTRALIZED GAME STATE
// ==========================================================================

const gameState = {
  teamName: "",
  currentChallengeId: null,
  selectedLanguage: "python", // "python" | "cpp"
  score: 150,
  failedAttempts: 0,
  attemptsUsed: 0,
  maxAttempts: 3,

  // Individual problem timer
  timerSeconds: 0,
  timerInterval: null,
  timeTakenFormatted: "00:00",

  // Current user's arranged code rows for active challenge:
  // Array of line objects: [{ id, text, indentLevel, mapsTo }]
  activeRows: [],

  isCompleted: false,
  isEvaluating: false,
  registrationSubmitted: false,
  submittedRowsByLanguage: {},
  finalSubmission: null,
  reviewLanguage: "python",

  soundEnabled: true,
  ambientEnabled: false
};

// ==========================================================================
// 3. SOUND MANAGER (Web Audio API Synthesizer with Audio Fallback)
// ==========================================================================

class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientSource = null;
    this.ambientGain = null;
    this.hasInteracted = false;
    this.audioCache = {};

    // Load persisted mute preference
    try {
      const saved = localStorage.getItem("tf_sound_muted");
      if (saved !== null) {
        this.isMuted = saved === "true";
      }
    } catch (e) {
      // Local storage not available
    }

    this.initAudioContextOnInteraction = this.initAudioContextOnInteraction.bind(this);
    window.addEventListener("pointerdown", this.initAudioContextOnInteraction, { once: true });
    window.addEventListener("keydown", this.initAudioContextOnInteraction, { once: true });
  }

  initAudioContextOnInteraction() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        if (this.ctx.state === "suspended") {
          this.ctx.resume();
        }
      }
    }
    this.hasInteracted = true;
  }

  ensureContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    try {
      localStorage.setItem("tf_sound_muted", String(this.isMuted));
    } catch (e) { }

    if (this.isMuted && this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(0, this.ctx ? this.ctx.currentTime : 0);
    }
    return this.isMuted;
  }

  // Play sound using local audio file if available, or procedural Web Audio API synthesizer
  play(type) {
    if (this.isMuted) return;

    // Check if we can play preloaded local audio file
    const soundFiles = {
      click: "sounds/click.wav",
      type: "sounds/type.wav",
      select: "sounds/click.wav",
      warmFlash: "sounds/flash.wav",
      vaultUnlock: "sounds/unlock.wav",
      success: "sounds/success.wav",
      error: "sounds/error.wav"
    };

    if (soundFiles[type]) {
      try {
        if (!this.audioCache[type]) {
          const audio = new Audio(soundFiles[type]);
          audio.volume = type === "type" ? 0.3 : 0.65;
          this.audioCache[type] = audio;
        }
        const cached = this.audioCache[type];
        cached.currentTime = 0;
        const playPromise = cached.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If HTML5 Audio playback fails (e.g. autoplay or path issue), fall back to Web Audio
            this.playSynthesized(type);
          });
          return;
        }
      } catch (e) {
        // Fall back to Web Audio
      }
    }

    this.playSynthesized(type);
  }

  // Procedural Web Audio API sound synthesizer
  playSynthesized(type) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;

    try {
      switch (type) {
        case "click": {
          // Sharp cyber click
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(1400, t);
          osc.frequency.exponentialRampToValueAtTime(300, t + 0.04);
          gain.gain.setValueAtTime(0.12, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.05);
          break;
        }

        case "type": {
          // Soft mechanical typewriter tick
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(800 + Math.random() * 200, t);
          gain.gain.setValueAtTime(0.04, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.04);
          break;
        }

        case "select": {
          // Ascending dual blip
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(440, t);
          osc.frequency.exponentialRampToValueAtTime(880, t + 0.12);
          gain.gain.setValueAtTime(0.15, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 0.16);
          break;
        }

        case "warmFlash": {
          // Deep atmospheric warm whoosh
          const osc = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const gain = this.ctx.createGain();

          osc.type = "sawtooth";
          osc.frequency.setValueAtTime(90, t);
          osc.frequency.linearRampToValueAtTime(140, t + 0.4);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(200, t);
          filter.frequency.exponentialRampToValueAtTime(1200, t + 0.35);
          filter.frequency.exponentialRampToValueAtTime(150, t + 0.9);

          gain.gain.setValueAtTime(0.01, t);
          gain.gain.linearRampToValueAtTime(0.25, t + 0.3);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 1.0);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t);
          osc.stop(t + 1.1);
          break;
        }

        case "vaultUnlock": {
          // Mechanical ratchet sequence + resonant latch slide
          for (let i = 0; i < 3; i++) {
            const clickOsc = this.ctx.createOscillator();
            const clickGain = this.ctx.createGain();
            const ct = t + i * 0.12;

            clickOsc.type = "square";
            clickOsc.frequency.setValueAtTime(1800 - i * 300, ct);
            clickGain.gain.setValueAtTime(0.08, ct);
            clickGain.gain.exponentialRampToValueAtTime(0.001, ct + 0.04);

            clickOsc.connect(clickGain);
            clickGain.connect(this.ctx.destination);
            clickOsc.start(ct);
            clickOsc.stop(ct + 0.05);
          }

          // Resonant heavy slide latch at end
          const slideOsc = this.ctx.createOscillator();
          const slideGain = this.ctx.createGain();
          const st = t + 0.45;
          slideOsc.type = "sine";
          slideOsc.frequency.setValueAtTime(520, st);
          slideOsc.frequency.exponentialRampToValueAtTime(1040, st + 0.3);
          slideGain.gain.setValueAtTime(0.2, st);
          slideGain.gain.exponentialRampToValueAtTime(0.001, st + 0.45);

          slideOsc.connect(slideGain);
          slideGain.connect(this.ctx.destination);
          slideOsc.start(st);
          slideOsc.stop(st + 0.5);
          break;
        }

        case "success": {
          // Harmonious triumphant major chord arpeggio (C5, E5, G5, C6)
          const notes = [523.25, 659.25, 783.99, 1046.50];
          notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            const nt = t + idx * 0.08;

            osc.type = "sine";
            osc.frequency.setValueAtTime(freq, nt);
            gain.gain.setValueAtTime(0.18, nt);
            gain.gain.exponentialRampToValueAtTime(0.001, nt + 0.6);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(nt);
            osc.stop(nt + 0.65);
          });
          break;
        }

        case "error": {
          // Subdued low-pass coral error buzzer
          const osc1 = this.ctx.createOscillator();
          const osc2 = this.ctx.createOscillator();
          const filter = this.ctx.createBiquadFilter();
          const gain = this.ctx.createGain();

          osc1.type = "sawtooth";
          osc2.type = "square";
          osc1.frequency.setValueAtTime(140, t);
          osc2.frequency.setValueAtTime(147, t); // Dissonance

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(450, t);

          gain.gain.setValueAtTime(0.2, t);
          gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

          osc1.connect(filter);
          osc2.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc1.start(t);
          osc2.start(t);
          osc1.stop(t + 0.5);
          osc2.stop(t + 0.5);
          break;
        }
      }
    } catch (err) {
      console.warn("Audio playback error:", err);
    }
  }

  toggleAmbient() {
    this.ensureContext();
    if (!this.ctx) return false;

    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
        this.ambientSource.disconnect();
      } catch (e) { }
      this.ambientSource = null;
      gameState.ambientEnabled = false;
      return false;
    } else {
      try {
        // Synthesize low-volume binaural drone
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(65.41, this.ctx.currentTime); // C2 drone

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(180, this.ctx.currentTime);

        gain.gain.setValueAtTime(this.isMuted ? 0 : 0.04, this.ctx.currentTime);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        this.ambientSource = osc;
        this.ambientGain = gain;
        gameState.ambientEnabled = true;
        return true;
      } catch (err) {
        console.warn("Ambient audio error:", err);
        return false;
      }
    }
  }
}

const sounds = new SoundManager();

// ==========================================================================
// 4. AMBIENT BACKGROUND CANVAS VISUALIZER
// ==========================================================================

function initAmbientCanvas() {
  const canvas = document.getElementById("ambient-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(36, Math.floor(width / 35));
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
      color: Math.random() > 0.3 ? "rgba(112, 214, 232, " : "rgba(240, 184, 106, ",
      alpha: Math.random() * 0.4 + 0.15
    });
  }

  let isVisible = true;
  document.addEventListener("visibilitychange", () => {
    isVisible = !document.hidden;
  });

  function render() {
    if (isVisible) {
      ctx.clearRect(0, 0, width, height);

      // Draw faint interconnecting lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(112, 214, 232, ${0.06 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ")";
        ctx.fill();
      }
    }
    requestAnimationFrame(render);
  }

  render();
}

// ==========================================================================
// 5. TOAST NOTIFICATION UTILITY
// ==========================================================================

function showToast(message, type = "normal", duration = 4000) {
  const container = document.getElementById("toast-center");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.setAttribute("role", "status");

  let iconText = "ⓘ";
  if (type === "error") iconText = "⚠";
  if (type === "success") iconText = "✓";
  if (type === "amber") iconText = "★";

  toast.innerHTML = `
    <span class="toast-icon" aria-hidden="true">${iconText}</span>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px) scale(0.95)";
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, duration);
}

// ==========================================================================
// 6. SCREEN NAVIGATION & ROUTING
// ==========================================================================

function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach((scr) => {
    scr.classList.remove("active");
  });

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Update header visibility
  const headerStatus = document.getElementById("header-status");
  if (headerStatus) {
    if (screenId === "screen-intro" || screenId === "screen-register") {
      headerStatus.style.display = "none";
    } else {
      headerStatus.style.display = "flex";
      updateHeaderHUD();
    }
  }

  sounds.play("click");
}

function updateHeaderHUD() {
  const teamEl = document.getElementById("header-team-name");
  const chalEl = document.getElementById("header-challenge-num");
  const scoreEl = document.getElementById("header-score-val");
  const pipsContainer = document.getElementById("header-attempts-pips");

  if (teamEl) teamEl.textContent = gameState.teamName || "—";
  if (chalEl) {
    const current = PATTERNS_DATA.find((p) => p.id === gameState.currentChallengeId);
    chalEl.textContent = current ? current.number : "01";
  }
  if (scoreEl) scoreEl.textContent = String(gameState.score);
  const scoreMax = document.querySelector(".chip-max");
  if (scoreMax) scoreMax.textContent = `/${EVENT_CONFIG.startingScore}`;

  if (pipsContainer) {
    const remaining = Math.max(0, gameState.maxAttempts - gameState.failedAttempts);
    const pips = pipsContainer.querySelectorAll(".pip");
    pips.forEach((pip, idx) => {
      if (idx < remaining) {
        pip.classList.remove("lost");
        pip.classList.add("active");
      } else {
        pip.classList.remove("active");
        pip.classList.add("lost");
      }
    });
    pipsContainer.setAttribute("aria-label", `${remaining} attempts remaining`);
  }

  // Also update rules panel score / attempts
  const rulesScore = document.getElementById("rules-score-display");
  const rulesAttempts = document.getElementById("rules-attempts-display");
  if (rulesScore) rulesScore.textContent = `${gameState.score} / ${EVENT_CONFIG.startingScore}`;
  if (rulesAttempts) {
    const rem = Math.max(0, gameState.maxAttempts - gameState.failedAttempts);
    rulesAttempts.textContent = `${rem}`;
  }
}

// ==========================================================================
// TIMER SYSTEM & LOGO REVEAL
// ==========================================================================

function formatTimer(totalSecs) {
  const m = Math.floor(totalSecs / 60);
  const s = totalSecs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function startProblemTimer() {
  stopProblemTimer();
  gameState.timerSeconds = 0;
  gameState.timeTakenFormatted = "00:00";
  updateTimerDisplay();

  gameState.timerInterval = setInterval(() => {
    gameState.timerSeconds++;
    gameState.timeTakenFormatted = formatTimer(gameState.timerSeconds);
    updateTimerDisplay();
  }, 1000);
}

function stopProblemTimer() {
  if (gameState.timerInterval) {
    clearInterval(gameState.timerInterval);
    gameState.timerInterval = null;
  }
  gameState.timeTakenFormatted = formatTimer(gameState.timerSeconds);
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const timeStr = formatTimer(gameState.timerSeconds);
  const headerTimerEl = document.getElementById("header-timer-val");
  const rulesTimerEl = document.getElementById("rules-timer-display");
  if (headerTimerEl) headerTimerEl.textContent = timeStr;
  if (rulesTimerEl) rulesTimerEl.textContent = timeStr;
}

function revealSocietyLogo() {
  const defaultIcon = document.getElementById("default-logo-icon");
  const logoImg = document.getElementById("brand-logo-img");
  if (defaultIcon) defaultIcon.style.display = "none";
  if (logoImg) {
    logoImg.style.display = "block";
  }
  const resultLogo = document.getElementById("result-society-logo");
  if (resultLogo) {
    resultLogo.style.display = "block";
  }
}

// ==========================================================================
// 7. SCREEN TWO: TEAM REGISTRATION & BANTER
// ==========================================================================

function initRegistration() {
  const regForm = document.getElementById("form-registration");
  const teamInput = document.getElementById("team-name-input");
  const regErrorMsg = document.getElementById("reg-error-msg");
  const spinner = document.getElementById("reg-spinner");
  const btnText = document.getElementById("reg-btn-text");
  const submitBtn = document.getElementById("btn-init-session");

  // Restore existing team name from sessionStorage if present
  try {
    const savedTeam = sessionStorage.getItem("tf_team_name");
    if (savedTeam && teamInput) {
      teamInput.value = savedTeam;
    }
  } catch (e) { }

  if (!regForm) return;

  regForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const rawVal = teamInput ? teamInput.value : "";
    const cleanName = rawVal.trim().slice(0, 40);

    if (!cleanName) {
      if (regErrorMsg) {
        regErrorMsg.textContent = "Please provide a valid team name before entering.";
        regErrorMsg.classList.add("error");
      }
      if (teamInput) teamInput.focus();
      sounds.play("error");
      return;
    }

    // Replace the default logo with the society logo on submit click
    revealSocietyLogo();

    // Reset error state
    if (regErrorMsg) {
      regErrorMsg.textContent = "Maximum 40 characters. Spaces trimmed automatically.";
      regErrorMsg.classList.remove("error");
    }

    gameState.teamName = cleanName;
    try {
      sessionStorage.setItem("tf_team_name", cleanName);
    } catch (e) { }

    // Show loading state
    if (spinner) spinner.style.display = "inline-block";
    if (btnText) btnText.textContent = "AUTHENTICATING...";
    if (submitBtn) submitBtn.disabled = true;

    // Submit registration to Formspree
    const regPayload = {
      team_name: cleanName,
      event_name: EVENT_CONFIG.eventName,
      phase_name: EVENT_CONFIG.phaseName,
      submission_type: "registration",
      timestamp: new Date().toISOString()
    };

    let submitSuccess = true;

    if (FORMSPREE_ENDPOINT && FORMSPREE_ENDPOINT !== "YOUR_FORMSPREE_ENDPOINT") {
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(regPayload)
        });

        if (!response.ok) {
          submitSuccess = false;
          throw new Error(`Server returned HTTP ${response.status}`);
        }
      } catch (err) {
        console.warn("Formspree registration dispatch warning:", err);
        submitSuccess = false;
      }
    } else {
      // Local placeholder simulation
      console.info("Formspree in simulation mode (endpoint is placeholder). Payload:", regPayload);
      await new Promise((r) => setTimeout(r, 450));
    }

    if (spinner) spinner.style.display = "none";
    if (btnText) btnText.textContent = "INITIALIZE SESSION";
    if (submitBtn) submitBtn.disabled = false;

    if (!submitSuccess) {
      showToast("Formspree unreachable. Proceeding in offline arena mode.", "amber", 5000);
    }

    gameState.registrationSubmitted = true;
    startWelcomeSequence(cleanName);
  });
}

function startWelcomeSequence(teamName) {
  showScreen("screen-welcome");

  // Determine dynamic time of day greeting
  const now = new Date();
  const hour = now.getHours();
  let greeting = "GOOD MORNING";
  if (hour >= 12 && hour < 17) {
    greeting = "GOOD AFTERNOON";
  } else if (hour >= 17) {
    greeting = "GOOD EVENING";
  }

  const greetingEl = document.getElementById("welcome-greeting");
  if (greetingEl) {
    greetingEl.textContent = greeting;
  }

  const typewriterEl = document.getElementById("typewriter-team-name");
  if (!typewriterEl) return;

  typewriterEl.textContent = "";
  const fullText = `TEAM ${teamName.toUpperCase()}`;
  let charIdx = 0;

  // Throttled typewriter sound
  let lastSoundTime = 0;

  const timer = setInterval(() => {
    if (charIdx < fullText.length) {
      typewriterEl.textContent += fullText.charAt(charIdx);
      charIdx++;

      const nowTime = Date.now();
      if (nowTime - lastSoundTime > 80) {
        sounds.play("type");
        lastSoundTime = nowTime;
      }
    } else {
      clearInterval(timer);
    }
  }, 65);
}

// ==========================================================================
// 8. SCREEN THREE: 15 NUMBERED CHALLENGE CARDS & VAULT UNLOCK
// ==========================================================================

function initChallengeCards() {
  const grid = document.getElementById("cards-grid");
  if (!grid) return;

  grid.innerHTML = "";

  PATTERNS_DATA.forEach((challenge, index) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "challenge-card";
    card.setAttribute("role", "gridcell");
    card.setAttribute("aria-label", `Challenge ${challenge.number}: ${challenge.title}`);
    card.dataset.challengeId = challenge.id;

    // Staggered floating delays
    const floatDur = (4.2 + (index % 4) * 0.6).toFixed(1) + "s";
    const floatDelay = ((index * 0.18) % 1.6).toFixed(2) + "s";
    card.style.setProperty("--float-dur", floatDur);
    card.style.setProperty("--float-delay", floatDelay);

    card.innerHTML = `
      <div class="card-corner-notch" aria-hidden="true"></div>
      <div class="card-number">${challenge.number}</div>
    `;

    card.addEventListener("click", () => {
      onChallengeCardSelected(challenge.id, card);
    });

    grid.appendChild(card);
  });
}

function onChallengeCardSelected(challengeId, cardEl) {
  const grid = document.getElementById("cards-grid");
  if (!grid || grid.classList.contains("selection-locked")) return;

  // Lock further card selection
  grid.classList.add("selection-locked");
  cardEl.classList.add("is-selected");

  sounds.play("select");
  gameState.currentChallengeId = challengeId;

  // Vault Unlock Overlay Sequence
  const vaultOverlay = document.getElementById("vault-overlay");
  const warmFlash = document.getElementById("warm-flash");
  const vaultNum = document.getElementById("vault-challenge-number");
  const vaultBar = document.getElementById("vault-bar-fill");
  const dialBox = document.querySelector(".vault-dial-box");
  const vaultStatus = document.getElementById("vault-status-text");

  const challenge = PATTERNS_DATA.find((p) => p.id === challengeId);
  if (vaultNum) vaultNum.textContent = challenge ? challenge.number : "01";

  // Step 1: Open overlay & trigger warm flash
  if (vaultOverlay) vaultOverlay.classList.add("active");
  if (warmFlash) {
    warmFlash.classList.add("flash-fire");
    sounds.play("warmFlash");
  }

  // Step 2: Fill decrypting bar & trigger vault unlock sound
  setTimeout(() => {
    if (vaultBar) vaultBar.style.width = "100%";
    if (vaultStatus) vaultStatus.textContent = "ALIGNING QUANTUM CYPHER...";
  }, 250);

  setTimeout(() => {
    sounds.play("vaultUnlock");
    if (dialBox) dialBox.classList.add("unlocked");
    if (vaultStatus) vaultStatus.textContent = "DECRYPTION COMPLETE // ACCESS GRANTED";
  }, 650);

  // Step 3: Transition smoothly to Workspace
  setTimeout(() => {
    if (vaultOverlay) vaultOverlay.classList.remove("active");
    if (warmFlash) warmFlash.classList.remove("flash-fire");
    if (vaultBar) vaultBar.style.width = "0%";
    if (dialBox) dialBox.classList.remove("unlocked");
    grid.classList.remove("selection-locked");
    cardEl.classList.remove("is-selected");

    loadChallengeIntoWorkspace(challengeId);
    showScreen("screen-game");
  }, 1300);
}

// ==========================================================================
// 9. SCREEN FOUR: LOAD CHALLENGE & CODE ROW RENDERING
// ==========================================================================

function loadChallengeIntoWorkspace(challengeId) {
  const challenge = PATTERNS_DATA.find((p) => p.id === challengeId);
  if (!challenge) return;

  gameState.currentChallengeId = challengeId;
  gameState.score = EVENT_CONFIG.startingScore;
  gameState.failedAttempts = 0;
  gameState.attemptsUsed = 0;
  gameState.isCompleted = false;
  gameState.isEvaluating = false;
  gameState.submittedRowsByLanguage = {};
  gameState.finalSubmission = null;
  gameState.reviewLanguage = gameState.selectedLanguage;

  // Start individual problem timer
  startProblemTimer();

  // Update Left Panel: Target Pattern & Title
  const previewEl = document.getElementById("pattern-preview");
  const metaTitleEl = document.getElementById("pattern-meta-title");

  if (previewEl) {
    previewEl.textContent = challenge.output.join("\n");
  }
  if (metaTitleEl) {
    metaTitleEl.textContent = challenge.title;
  }

  // Load language lines and scramble them
  setupChallengeRowsForLanguage(gameState.selectedLanguage, true);
  updateHeaderHUD();
}

/**
 * Sets up rows for the specified language.
 * @param {string} lang - "python" | "cpp"
 * @param {boolean} shouldScramble - whether to shuffle lines
 */
function setupChallengeRowsForLanguage(lang, shouldScramble = false) {
  const challenge = PATTERNS_DATA.find((p) => p.id === gameState.currentChallengeId);
  if (!challenge) return;

  const langConfig = challenge.languages[lang];
  if (!langConfig) return;

  if (shouldScramble || gameState.activeRows.length === 0) {
    // Clone lines
    let lines = langConfig.lines.map((l) => ({
      id: l.id,
      text: l.text.trim(), // We manage indentation via numeric level
      indentLevel: 0,
      mapsTo: l.mapsTo || null
    }));

    // Perform Fisher-Yates shuffle ensuring it doesn't match canonical solution
    lines = getGuaranteedScrambled(lines, langConfig.solutionOrder);
    gameState.activeRows = lines;
  } else {
    // Translating existing rows between languages while PRESERVING ORDER & INDENTS!
    const targetConfig = challenge.languages[lang];
    const prevRows = [...gameState.activeRows];
    const newRows = [];

    // Map each existing row to corresponding row in target language
    prevRows.forEach((row) => {
      let matchedTargetLine = null;

      if (row.mapsTo) {
        matchedTargetLine = targetConfig.lines.find((tl) => tl.id === row.mapsTo);
      } else {
        // Fallback: match by line id if shared
        matchedTargetLine = targetConfig.lines.find((tl) => tl.mapsTo === row.id || tl.id === row.id);
      }

      if (matchedTargetLine) {
        newRows.push({
          id: matchedTargetLine.id,
          text: matchedTargetLine.text.trim(),
          indentLevel: row.indentLevel,
          mapsTo: matchedTargetLine.mapsTo || row.id
        });
      }
    });

    // Place language-specific structure at its canonical boundary instead of appending it.
    const targetOrder = targetConfig.solutionOrder;
    targetConfig.lines.forEach((tl) => {
      if (newRows.some((row) => row.id === tl.id)) return;

      const targetIndex = targetOrder.indexOf(tl.id);
      const insertAt = newRows.findIndex((row) => targetOrder.indexOf(row.id) > targetIndex);
      newRows.splice(insertAt < 0 ? newRows.length : insertAt, 0, {
        id: tl.id,
        text: tl.text.trim(),
        indentLevel: 0,
        mapsTo: tl.mapsTo || null
      });
    });

    gameState.activeRows = newRows;
    showToast(`Code and indentation translated to ${lang.toUpperCase()}`, "normal", 2500);
  }

  renderCodeWorkspace();
}

/**
 * Returns a shuffled copy of lines that is guaranteed not to match the solution order.
 */
function getGuaranteedScrambled(lines, solutionOrder) {
  if (lines.length <= 1) return lines;

  let scrambled = [...lines];
  let isIdentical = true;
  let attempts = 0;

  while (isIdentical && attempts < 15) {
    // Fisher-Yates
    for (let i = scrambled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [scrambled[i], scrambled[j]] = [scrambled[j], scrambled[i]];
    }

    const currentOrder = scrambled.map((l) => l.id);
    isIdentical = currentOrder.every((id, idx) => id === solutionOrder[idx]);
    attempts++;
  }

  return scrambled;
}

function cloneRows(rows) {
  return rows.map((row) => ({ ...row }));
}

function formatCodeRows(rows) {
  return rows.map((row) => (
    `${" ".repeat(row.indentLevel * EVENT_CONFIG.indentUnitSpaces)}${row.text.trim()}`
  )).join("\n");
}

// ==========================================================================
// 10. DRAGGABLE CODE WORKSPACE & INDENTATION CONTROLS
// ==========================================================================

function renderCodeWorkspace() {
  const container = document.getElementById("code-workspace");
  if (!container) return;

  container.innerHTML = "";

  gameState.activeRows.forEach((row, index) => {
    const rowEl = document.createElement("div");
    rowEl.className = "code-row";
    rowEl.dataset.lineId = row.id;
    rowEl.dataset.index = index;
    rowEl.setAttribute("role", "listitem");
    rowEl.setAttribute("tabindex", "0");
    rowEl.setAttribute("aria-label", `Code Line ${index + 1}: ${row.text}, Indent level ${row.indentLevel}`);

    // Dynamic indent spacing (4 spaces = approx 1.8rem per indent level)
    const indentWidth = (row.indentLevel * 1.8).toFixed(2);

    rowEl.innerHTML = `
      <!-- Line Grab Handle -->
      <div class="row-handle" title="Drag to reorder" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <circle cx="8" cy="6" r="2"></circle>
          <circle cx="16" cy="6" r="2"></circle>
          <circle cx="8" cy="12" r="2"></circle>
          <circle cx="16" cy="12" r="2"></circle>
          <circle cx="8" cy="18" r="2"></circle>
          <circle cx="16" cy="18" r="2"></circle>
        </svg>
      </div>

      <!-- Line Position Indicator -->
      <span class="row-index">${String(index + 1).padStart(2, "0")}</span>

      <!-- Accessible Reordering Buttons -->
      <div class="row-order-ctrls">
        <button type="button" class="row-move-btn btn-move-up" title="Move line up" ${index === 0 ? "disabled" : ""} aria-label="Move line up">▲</button>
        <button type="button" class="row-move-btn btn-move-down" title="Move line down" ${index === gameState.activeRows.length - 1 ? "disabled" : ""} aria-label="Move line down">▼</button>
      </div>

      <!-- Code Text with Dynamic Indent Spacer -->
      <div class="row-code-container">
        <span class="indent-spacer" style="width: ${indentWidth}rem;" aria-hidden="true"></span>
        <code class="code-text">${escapeHtml(row.text)}</code>
      </div>

      <!-- Indentation Controls -->
      <div class="row-indent-ctrls">
        <button type="button" class="indent-btn btn-unindent" title="Decrease indentation (◀)" ${row.indentLevel <= 0 ? "disabled" : ""} aria-label="Decrease indentation">◀</button>
        <span class="indent-level-badge" title="Current indentation level">Lvl ${row.indentLevel}</span>
        <button type="button" class="indent-btn btn-indent" title="Increase indentation (▶)" ${row.indentLevel >= EVENT_CONFIG.maxIndentLevel ? "disabled" : ""} aria-label="Increase indentation">▶</button>
      </div>
    `;

    // Attach Event Listeners
    attachRowEventListeners(rowEl, index);

    container.appendChild(rowEl);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function attachRowEventListeners(rowEl, index) {
  // 1. Indentation Controls
  const btnUnindent = rowEl.querySelector(".btn-unindent");
  const btnIndent = rowEl.querySelector(".btn-indent");

  if (btnUnindent) {
    btnUnindent.addEventListener("click", (e) => {
      e.stopPropagation();
      changeRowIndent(index, -1);
    });
  }

  if (btnIndent) {
    btnIndent.addEventListener("click", (e) => {
      e.stopPropagation();
      changeRowIndent(index, 1);
    });
  }

  // 2. Accessible Move Buttons
  const btnMoveUp = rowEl.querySelector(".btn-move-up");
  const btnMoveDown = rowEl.querySelector(".btn-move-down");

  if (btnMoveUp) {
    btnMoveUp.addEventListener("click", (e) => {
      e.stopPropagation();
      moveRow(index, index - 1);
    });
  }

  if (btnMoveDown) {
    btnMoveDown.addEventListener("click", (e) => {
      e.stopPropagation();
      moveRow(index, index + 1);
    });
  }

  // 3. Keyboard Reordering and Indenting
  rowEl.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && e.altKey) {
      e.preventDefault();
      moveRow(index, index - 1);
    } else if (e.key === "ArrowDown" && e.altKey) {
      e.preventDefault();
      moveRow(index, index + 1);
    } else if (e.key === "ArrowLeft" && e.altKey) {
      e.preventDefault();
      changeRowIndent(index, -1);
    } else if (e.key === "ArrowRight" && e.altKey) {
      e.preventDefault();
      changeRowIndent(index, 1);
    }
  });

  // 4. HTML5 / Pointer Drag and Drop
  setupPointerAndDragEvents(rowEl, index);
}

function changeRowIndent(rowIndex, delta) {
  if (gameState.isEvaluating) return;
  const row = gameState.activeRows[rowIndex];
  if (!row) return;

  const newIndent = Math.max(0, Math.min(EVENT_CONFIG.maxIndentLevel, row.indentLevel + delta));
  if (newIndent !== row.indentLevel) {
    row.indentLevel = newIndent;
    sounds.play("click");
    renderCodeWorkspace();
  }
}

function moveRow(fromIndex, toIndex) {
  if (gameState.isEvaluating) return;
  if (toIndex < 0 || toIndex >= gameState.activeRows.length) return;

  const [movedItem] = gameState.activeRows.splice(fromIndex, 1);
  gameState.activeRows.splice(toIndex, 0, movedItem);

  sounds.play("click");
  renderCodeWorkspace();

  // Refocus the moved row for keyboard accessibility
  const container = document.getElementById("code-workspace");
  if (container) {
    const updatedRows = container.querySelectorAll(".code-row");
    if (updatedRows[toIndex]) {
      updatedRows[toIndex].focus();
    }
  }
}

// ==========================================================================
// 11. POINTER & TOUCH DRAG-AND-DROP REORDERING
// ==========================================================================

let dragSourceIndex = null;

function setupPointerAndDragEvents(rowEl, index) {
  const handle = rowEl.querySelector(".row-handle");
  if (!handle) return;

  // Make row draggable
  rowEl.setAttribute("draggable", "true");

  // --- HTML5 Desktop Drag Events ---
  rowEl.addEventListener("dragstart", (e) => {
    if (gameState.isEvaluating) return;
    dragSourceIndex = index;
    rowEl.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(index));
  });

  rowEl.addEventListener("dragend", () => {
    rowEl.classList.remove("dragging");
    clearAllDragOverClasses();
  });

  rowEl.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const rect = rowEl.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;

    clearAllDragOverClasses();
    if (e.clientY < midY) {
      rowEl.classList.add("drag-over-top");
    } else {
      rowEl.classList.add("drag-over-bottom");
    }
  });

  rowEl.addEventListener("drop", (e) => {
    e.preventDefault();
    const fromIdx = dragSourceIndex !== null ? dragSourceIndex : parseInt(e.dataTransfer.getData("text/plain"), 10);
    const rect = rowEl.getBoundingClientRect();
    const midY = rect.top + rect.height / 2;
    let toIdx = index;

    if (e.clientY >= midY && fromIdx < toIdx) {
      toIdx = index;
    } else if (e.clientY < midY && fromIdx > toIdx) {
      toIdx = index;
    }

    clearAllDragOverClasses();
    if (!isNaN(fromIdx) && fromIdx !== toIdx) {
      moveRow(fromIdx, toIdx);
    }
  });

  // --- Pointer & Touch Events for Mobile / Tablet Devices ---
  handle.addEventListener("pointerdown", (e) => {
    if (gameState.isEvaluating) return;
    handle.setPointerCapture(e.pointerId);
    dragSourceIndex = index;
    rowEl.classList.add("dragging");
  });

  handle.addEventListener("pointermove", (e) => {
    if (dragSourceIndex === null) return;

    // Detect row under current pointer
    const elemUnder = document.elementFromPoint(e.clientX, e.clientY);
    const targetRow = elemUnder ? elemUnder.closest(".code-row") : null;

    clearAllDragOverClasses();
    if (targetRow && targetRow !== rowEl) {
      const rect = targetRow.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      if (e.clientY < midY) {
        targetRow.classList.add("drag-over-top");
      } else {
        targetRow.classList.add("drag-over-bottom");
      }
    }
  });

  handle.addEventListener("pointerup", (e) => {
    if (dragSourceIndex === null) return;
    try {
      handle.releasePointerCapture(e.pointerId);
    } catch (err) { }

    const elemUnder = document.elementFromPoint(e.clientX, e.clientY);
    const targetRow = elemUnder ? elemUnder.closest(".code-row") : null;

    clearAllDragOverClasses();
    rowEl.classList.remove("dragging");

    if (targetRow) {
      const toIndex = parseInt(targetRow.dataset.index, 10);
      if (!isNaN(toIndex) && toIndex !== dragSourceIndex) {
        moveRow(dragSourceIndex, toIndex);
      }
    }
    dragSourceIndex = null;
  });

  handle.addEventListener("pointercancel", (e) => {
    try {
      handle.releasePointerCapture(e.pointerId);
    } catch (err) { }
    clearAllDragOverClasses();
    rowEl.classList.remove("dragging");
    dragSourceIndex = null;
  });
}

function clearAllDragOverClasses() {
  document.querySelectorAll(".code-row").forEach((el) => {
    el.classList.remove("drag-over-top", "drag-over-bottom");
  });
}

// ==========================================================================
// 12. LOGIC VERIFICATION & ATTEMPT SCORING SYSTEM
// ==========================================================================

function initWorkspaceActions() {
  // Language Switcher Tabs
  const tabPython = document.getElementById("tab-python");
  const tabCpp = document.getElementById("tab-cpp");

  if (tabPython && tabCpp) {
    tabPython.addEventListener("click", () => {
      if (gameState.selectedLanguage === "python" || gameState.isEvaluating || gameState.isCompleted) return;
      tabPython.classList.add("active");
      tabPython.setAttribute("aria-checked", "true");
      tabCpp.classList.remove("active");
      tabCpp.setAttribute("aria-checked", "false");
      gameState.selectedLanguage = "python";
      sounds.play("click");
      setupChallengeRowsForLanguage("python", false);
    });

    tabCpp.addEventListener("click", () => {
      if (gameState.selectedLanguage === "cpp" || gameState.isEvaluating || gameState.isCompleted) return;
      tabCpp.classList.add("active");
      tabCpp.setAttribute("aria-checked", "true");
      tabPython.classList.remove("active");
      tabPython.setAttribute("aria-checked", "false");
      gameState.selectedLanguage = "cpp";
      sounds.play("click");
      setupChallengeRowsForLanguage("cpp", false);
    });
  }

  // Shuffle Button (Manual, no penalty)
  const btnShuffle = document.getElementById("btn-shuffle-lines");
  if (btnShuffle) {
    btnShuffle.addEventListener("click", () => {
      if (gameState.isEvaluating) return;
      sounds.play("click");
      const challenge = PATTERNS_DATA.find((p) => p.id === gameState.currentChallengeId);
      if (challenge) {
        const langConfig = challenge.languages[gameState.selectedLanguage];
        gameState.activeRows = getGuaranteedScrambled(gameState.activeRows, langConfig.solutionOrder);
        renderCodeWorkspace();
        showToast("Lines reshuffled. No points deducted.", "normal", 2000);
      }
    });
  }

  // Reset Indentations Button
  const btnResetIndents = document.getElementById("btn-reset-indents");
  const modal = document.getElementById("confirm-modal");
  const btnCancelModal = document.getElementById("btn-modal-cancel");
  const btnConfirmModal = document.getElementById("btn-modal-confirm");

  if (btnResetIndents && modal) {
    btnResetIndents.addEventListener("click", () => {
      modal.style.display = "flex";
      sounds.play("click");
    });

    if (btnCancelModal) {
      btnCancelModal.addEventListener("click", () => {
        modal.style.display = "none";
        sounds.play("click");
      });
    }

    if (btnConfirmModal) {
      btnConfirmModal.addEventListener("click", () => {
        modal.style.display = "none";
        gameState.activeRows.forEach((r) => (r.indentLevel = 0));
        renderCodeWorkspace();
        sounds.play("click");
        showToast("All line indentations reset to zero.", "normal", 2000);
      });
    }
  }

  // Check My Logic Button
  const btnCheckLogic = document.getElementById("btn-check-logic");
  if (btnCheckLogic) {
    btnCheckLogic.addEventListener("click", () => {
      evaluateUserLogic();
    });
  }

  // Rules Collapse Button for Mobile
  const btnRulesCollapse = document.getElementById("btn-rules-collapse");
  const rulesBody = document.getElementById("rules-body");
  if (btnRulesCollapse && rulesBody) {
    btnRulesCollapse.addEventListener("click", () => {
      const isExpanded = btnRulesCollapse.getAttribute("aria-expanded") === "true";
      btnRulesCollapse.setAttribute("aria-expanded", String(!isExpanded));
      rulesBody.style.display = isExpanded ? "none" : "block";
      const stateText = btnRulesCollapse.querySelector(".rules-state-text");
      if (stateText) stateText.textContent = isExpanded ? "EXPAND" : "COLLAPSE";
    });
  }
}

/**
 * Validates the reconstructed code order and indentation levels
 * against canonical solution data.
 */
function evaluateUserLogic() {
  if (gameState.isEvaluating || gameState.isCompleted) return;

  // Reveal society logo when submit/check logic button is clicked
  revealSocietyLogo();

  const challenge = PATTERNS_DATA.find((p) => p.id === gameState.currentChallengeId);
  if (!challenge) return;

  const langConfig = challenge.languages[gameState.selectedLanguage];
  if (!langConfig) return;

  const submittedLanguage = gameState.selectedLanguage;
  const submittedRows = cloneRows(gameState.activeRows);
  gameState.attemptsUsed += 1;
  gameState.submittedRowsByLanguage[submittedLanguage] = cloneRows(submittedRows);
  gameState.isEvaluating = true;

  const checkBtn = document.getElementById("btn-check-logic");
  const checkSpinner = document.getElementById("check-spinner");
  const checkBtnText = document.getElementById("check-btn-text");

  if (checkBtn) checkBtn.disabled = true;
  if (checkSpinner) checkSpinner.style.display = "inline-block";
  if (checkBtnText) checkBtnText.textContent = "COMPILING LOGIC...";

  const expectedLineIds = langConfig.solutionOrder;
  let isOrderAndContentCorrect = true;
  let isIndentCorrect = true;

  if (gameState.activeRows.length !== expectedLineIds.length) {
    isOrderAndContentCorrect = false;
  } else {
    for (let i = 0; i < expectedLineIds.length; i++) {
      const expectedId = expectedLineIds[i];
      const expectedLineObj = langConfig.lines.find((l) => l.id === expectedId);
      const expectedIndent = langConfig.indentationLevels[expectedId];
      const actualRow = gameState.activeRows[i];

      if (!expectedLineObj || !actualRow) {
        isOrderAndContentCorrect = false;
        break;
      }

      if (actualRow.id !== expectedId || actualRow.text.trim() !== expectedLineObj.text.trim()) {
        isOrderAndContentCorrect = false;
        break;
      }

      if (actualRow.indentLevel !== expectedIndent) {
        isIndentCorrect = false;
      }
    }
  }

  const isSuccess = isOrderAndContentCorrect && isIndentCorrect;

  setTimeout(() => {
    if (checkSpinner) checkSpinner.style.display = "none";
    if (checkBtnText) checkBtnText.textContent = "CHECK MY LOGIC";
    if (checkBtn) checkBtn.disabled = false;
    gameState.isEvaluating = false;

    if (isSuccess) {
      handleChallengeSuccess(challenge, submittedLanguage, submittedRows);
    } else {
      handleChallengeFailure(challenge, submittedLanguage);
    }
  }, 650);
}

function handleChallengeSuccess(challenge, submittedLanguage, submittedRows) {
  if (gameState.isCompleted) return;

  // Stop problem timer immediately upon solving
  stopProblemTimer();

  gameState.isCompleted = true;
  gameState.reviewLanguage = submittedLanguage;
  gameState.submittedRowsByLanguage[submittedLanguage] = cloneRows(submittedRows);
  sounds.play("success");

  showToast("LOGIC VERIFIED! Output patterns match.", "success", 4000);

  submitFinalResultToFormspree(challenge, true, submittedLanguage, submittedRows);

  // Transition to Completion Screen
  setTimeout(() => {
    displayCompletionScreen(true, challenge);
  }, 900);
}

function handleChallengeFailure(challenge, submittedLanguage) {
  if (gameState.isCompleted) return;

  sounds.play("error");

  // Visual error feedback on rows
  const workspace = document.getElementById("code-workspace");
  if (workspace) {
    workspace.classList.add("error-shake");
    setTimeout(() => {
      workspace.classList.remove("error-shake");
    }, 600);
  }

  // Deduct penalty and update attempts
  gameState.failedAttempts += 1;
  const penalty = EVENT_CONFIG.attemptPenalties[gameState.failedAttempts - 1] || 0;
  gameState.score = Math.max(0, gameState.score - penalty);

  updateHeaderHUD();

  const remaining = gameState.maxAttempts - gameState.failedAttempts;

  if (remaining > 0) {
    showToast(`Not quite. The compiler is disappointed. Attempts remaining: ${remaining}`, "error", 4000);

    // Reshuffle rows on failure as per rules
    const langConfig = challenge.languages[submittedLanguage];
    gameState.activeRows = getGuaranteedScrambled(gameState.activeRows, langConfig.solutionOrder);
    renderCodeWorkspace();
  } else {
    // All attempts exhausted - stop timer
    stopProblemTimer();

    gameState.isCompleted = true;
    gameState.reviewLanguage = submittedLanguage;
    showToast("Attempts exhausted. The loops won this round.", "error", 5000);

    submitFinalResultToFormspree(
      challenge,
      false,
      submittedLanguage,
      gameState.submittedRowsByLanguage[submittedLanguage]
    );

    setTimeout(() => {
      displayCompletionScreen(false, challenge);
    }, 1000);
  }
}

// ==========================================================================
// 13. SCREEN FIVE: COMPLETION SCREEN & SCORE REVEAL
// ==========================================================================

function displayCompletionScreen(isSuccess, challenge) {
  showScreen("screen-result");
  revealSocietyLogo();

  const resultCard = document.getElementById("result-card");
  const statusIcon = document.getElementById("result-status-icon");
  const titleEl = document.getElementById("result-title");
  const subEl = document.getElementById("result-subtitle");
  const finalScoreEl = document.getElementById("result-final-score");
  const scoreBar = document.getElementById("result-score-bar");

  const resTeam = document.getElementById("res-team-name");
  const resChal = document.getElementById("res-challenge-num");
  const resLang = document.getElementById("res-language");
  const resAttempts = document.getElementById("res-failed-attempts");
  const resTime = document.getElementById("res-time-taken");

  if (resTeam) resTeam.textContent = gameState.teamName;
  if (resChal) resChal.textContent = `#${challenge.number}`;
  if (resLang) resLang.textContent = gameState.selectedLanguage.toUpperCase();
  if (resAttempts) resAttempts.textContent = String(gameState.failedAttempts);
  if (resTime) resTime.textContent = gameState.timeTakenFormatted;

  renderCodeReview(gameState.reviewLanguage || "python");

  if (isSuccess) {
    if (resultCard) {
      resultCard.classList.remove("failed");
      resultCard.classList.add("success");
    }
    if (statusIcon) statusIcon.textContent = "✓";
    if (titleEl) titleEl.textContent = "LOGIC VERIFIED.";
    if (subEl) subEl.textContent = "You've earned your place in the Forge.";
  } else {
    if (resultCard) {
      resultCard.classList.remove("success");
      resultCard.classList.add("failed");
    }
    if (statusIcon) statusIcon.textContent = "✕";
    if (titleEl) titleEl.textContent = "THE LOOPS WON THIS ROUND.";
    if (subEl) subEl.textContent = "All three attempts were used. Review your code below.";
  }

  // Animate final score reveal count-up
  const targetScore = gameState.score;
  let currentVal = 0;
  const duration = 1200;
  const startTime = performance.now();

  function countUp(now) {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / duration);
    currentVal = Math.floor(progress * targetScore);

    if (finalScoreEl) finalScoreEl.textContent = String(currentVal);

    if (progress < 1) {
      requestAnimationFrame(countUp);
    } else {
      if (finalScoreEl) finalScoreEl.textContent = String(targetScore);
    }
  }
  requestAnimationFrame(countUp);

  // Score bar fill
  if (scoreBar) {
    const percent = Math.round((targetScore / EVENT_CONFIG.startingScore) * 100);
    scoreBar.style.width = `${percent}%`;
  }
}

function renderCodeReview(language) {
  const challenge = PATTERNS_DATA.find((p) => p.id === gameState.currentChallengeId);
  if (!challenge || !challenge.languages[language]) return;

  gameState.reviewLanguage = language;
  const submittedCode = document.getElementById("review-submitted-code");
  const correctCode = document.getElementById("review-correct-code");
  const pythonTab = document.getElementById("review-tab-python");
  const cppTab = document.getElementById("review-tab-cpp");
  const submittedRows = gameState.submittedRowsByLanguage[language];
  const langConfig = challenge.languages[language];

  if (pythonTab) {
    pythonTab.classList.toggle("active", language === "python");
    pythonTab.setAttribute("aria-checked", String(language === "python"));
  }
  if (cppTab) {
    cppTab.classList.toggle("active", language === "cpp");
    cppTab.setAttribute("aria-checked", String(language === "cpp"));
  }

  if (submittedCode) {
    submittedCode.textContent = submittedRows
      ? formatCodeRows(submittedRows) || "(No code lines were submitted.)"
      : "No code was submitted in this language.";
  }
  if (correctCode) {
    const solutionRows = langConfig.solutionOrder.map((lineId) => {
      const line = langConfig.lines.find((candidate) => candidate.id === lineId);
      return {
        text: line ? line.text : "",
        indentLevel: langConfig.indentationLevels[lineId] || 0
      };
    });
    correctCode.textContent = formatCodeRows(solutionRows);
  }
}

// ==========================================================================
// 14. FORMSPREE FINAL SCORE SUBMISSION & RETRY SYSTEM
// ==========================================================================

function submitFinalResultToFormspree(challenge, isSuccess, language, submittedRows) {
  if (gameState.finalSubmission && gameState.finalSubmission.challengeId === challenge.id) {
    return submitFinalResultRequest(gameState.finalSubmission);
  }

  const langConfig = challenge.languages[language];
  const solutionRows = langConfig.solutionOrder.map((lineId) => {
    const line = langConfig.lines.find((candidate) => candidate.id === lineId);
    return {
      text: line ? line.text : "",
      indentLevel: langConfig.indentationLevels[lineId] || 0
    };
  });

  gameState.finalSubmission = {
    challengeId: challenge.id,
    status: "pending",
    promise: null,
    payload: {
      submission_id: `${challenge.id}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
      team_name: gameState.teamName,
      event_name: EVENT_CONFIG.eventName,
      phase_name: EVENT_CONFIG.phaseName,
      pattern_id: challenge.id,
      pattern_number: challenge.number,
      pattern_title: challenge.title,
      selected_language: language,
      final_score: gameState.score,
      result_status: isSuccess ? "success" : "failed",
      failed_attempts: gameState.failedAttempts,
      attempts_used: gameState.attemptsUsed,
      total_attempts: gameState.attemptsUsed,
      max_attempts: gameState.maxAttempts,
      time_taken_seconds: gameState.timerSeconds,
      time_taken_formatted: gameState.timeTakenFormatted,
      completion_status: isSuccess ? "solved" : "exhausted",
      submitted_code: formatCodeRows(submittedRows || []),
      correct_solution: formatCodeRows(solutionRows),
      submission_type: "final_result",
      timestamp: new Date().toISOString()
    }
  };

  return submitFinalResultRequest(gameState.finalSubmission);
}

async function submitFinalResultRequest(submission) {
  if (submission.status === "submitted" || submission.status === "submitting") return submission.promise;

  const fsCard = document.getElementById("formspree-status-card");
  const fsIcon = document.getElementById("fs-icon");
  const fsTitle = document.getElementById("fs-status-title");
  const fsDesc = document.getElementById("fs-status-desc");
  const retryBtn = document.getElementById("btn-fs-retry");

  if (fsTitle) fsTitle.textContent = "Submitting Result to Leaderboard...";
  if (fsDesc) fsDesc.textContent = "Synchronizing with Formspree endpoint.";
  if (fsIcon) {
    fsIcon.className = "fs-icon";
    fsIcon.textContent = "●";
  }
  if (retryBtn) retryBtn.style.display = "none";

  submission.status = "submitting";
  submission.promise = (async () => {
    let errorMessage = "";
    if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT === "YOUR_FORMSPREE_ENDPOINT") {
      errorMessage = "Formspree endpoint is not configured.";
    } else {
      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(submission.payload)
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (err) {
        console.warn("Formspree final result submission error:", err);
        errorMessage = "Unable to reach Formspree. You can retry this submission.";
      }
    }

    if (!errorMessage) {
      submission.status = "submitted";
      if (fsTitle) fsTitle.textContent = "Score Verified & Submitted to Leaderboard";
      if (fsDesc) fsDesc.textContent = "Result logged for Think Forge final tally.";
      if (fsIcon) {
        fsIcon.className = "fs-icon success";
        fsIcon.textContent = "✓";
      }
      return true;
    }

    submission.status = "failed";
    if (fsTitle) fsTitle.textContent = "Final Result Not Submitted";
    if (fsDesc) fsDesc.textContent = errorMessage;
    if (fsIcon) {
      fsIcon.className = "fs-icon error";
      fsIcon.textContent = "⚠";
    }
    if (retryBtn && FORMSPREE_ENDPOINT && FORMSPREE_ENDPOINT !== "YOUR_FORMSPREE_ENDPOINT") {
      retryBtn.style.display = "inline-flex";
      retryBtn.onclick = () => {
        submitFinalResultRequest(submission);
      };
    }
    return false;
  })();

  return submission.promise;
}

// ==========================================================================
// 15. GLOBAL EVENT LISTENERS & INITIALIZATION
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Ambient Canvas Visuals
  initAmbientCanvas();

  // 2. Setup Sound Control Buttons
  const btnSoundToggle = document.getElementById("btn-sound-toggle");
  const iconOn = btnSoundToggle ? btnSoundToggle.querySelector(".sound-on") : null;
  const iconOff = btnSoundToggle ? btnSoundToggle.querySelector(".sound-off") : null;

  if (btnSoundToggle) {
    // Reflect saved sound state
    if (sounds.isMuted) {
      if (iconOn) iconOn.style.display = "none";
      if (iconOff) iconOff.style.display = "inline-block";
    }

    btnSoundToggle.addEventListener("click", () => {
      const muted = sounds.toggleMute();
      if (iconOn && iconOff) {
        iconOn.style.display = muted ? "none" : "inline-block";
        iconOff.style.display = muted ? "inline-block" : "none";
      }
      showToast(muted ? "Sound Effects Muted" : "Sound Effects Active", "normal", 1500);
    });
  }

  const btnAmbientAudio = document.getElementById("btn-ambient-audio");
  if (btnAmbientAudio) {
    btnAmbientAudio.addEventListener("click", () => {
      const isPlaying = sounds.toggleAmbient();
      btnAmbientAudio.classList.toggle("active-tone", isPlaying);
      showToast(isPlaying ? "Ambient Drone Activated" : "Ambient Drone Deactivated", "normal", 1500);
    });
  }

  // 3. Screen 1: Enter Arena Button
  const btnEnterArena = document.getElementById("btn-enter-arena");
  if (btnEnterArena) {
    btnEnterArena.addEventListener("click", () => {
      showScreen("screen-register");
    });
  }

  // 4. Screen 2: Registration & Welcome Banter
  initRegistration();

  const btnLetsBegin = document.getElementById("btn-lets-begin");
  if (btnLetsBegin) {
    btnLetsBegin.addEventListener("click", () => {
      showScreen("screen-challenges");
    });
  }

  // 5. Screen 3: Challenge Grid
  initChallengeCards();

  // 6. Screen 4: Workspace Interactions
  initWorkspaceActions();

  // 7. Screen 5: Completion Buttons
  const btnPlayAgain = document.getElementById("btn-play-again");
  if (btnPlayAgain) {
    btnPlayAgain.addEventListener("click", () => {
      gameState.teamName = "";
      try {
        sessionStorage.removeItem("tf_team_name");
      } catch (e) { }
      showScreen("screen-intro");
    });
  }

  document.querySelectorAll("[data-review-lang]").forEach((tab) => {
    tab.addEventListener("click", () => {
      if (!gameState.isCompleted) return;
      renderCodeReview(tab.dataset.reviewLang);
    });
  });
});
