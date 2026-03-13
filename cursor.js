const canvas = document.createElement("canvas");
canvas.className = "tubes-cursor-canvas";
canvas.style.background = "transparent";
document.body.prepend(canvas);

let app = null;
let TubesCursor = null;

const cursorConfig = {
  bloom: {
    enabled: true,
    threshold: 0.08,
    strength: 0.34,
    radius: 0.018
  },
  tubes: {
    colors: ["#5e72e4", "#8b5cf6", "#ff4d6d"],
    lights: {
      intensity: 160,
      colors: ["#22d3ee", "#b721ff", "#ffd166", "#11cdef"]
    },
    lerp: 0.28,
    noise: 0.01
  },
  sleep: {
    xRadius: 0.06,
    yRadius: 0.035,
    timeScale1: 0.8,
    timeScale2: 1.6
  }
};

function buildCursor() {
  if (!TubesCursor) return;

  if (app && typeof app.dispose === "function") {
    app.dispose();
  }

  app = TubesCursor(canvas, structuredClone(cursorConfig));
  applyCursorTheme();
}

function setEffectSize({
  lerp,
  noise,
  bloomRadius,
  xRadius,
  yRadius
} = {}) {
  if (typeof lerp === "number") cursorConfig.tubes.lerp = lerp;
  if (typeof noise === "number") cursorConfig.tubes.noise = noise;
  if (typeof bloomRadius === "number") cursorConfig.bloom.radius = bloomRadius;
  if (typeof xRadius === "number") cursorConfig.sleep.xRadius = xRadius;
  if (typeof yRadius === "number") cursorConfig.sleep.yRadius = yRadius;

  buildCursor();
}

function setEffectNeon({
  lightIntensity,
  bloomStrength,
  bloomThreshold,
  tubeColors,
  lightColors
} = {}) {
  if (typeof lightIntensity === "number") {
    cursorConfig.tubes.lights.intensity = lightIntensity;
  }

  if (typeof bloomStrength === "number") {
    cursorConfig.bloom.strength = bloomStrength;
  }

  if (typeof bloomThreshold === "number") {
    cursorConfig.bloom.threshold = bloomThreshold;
  }

  if (Array.isArray(tubeColors) && tubeColors.length === 3) {
    cursorConfig.tubes.colors = tubeColors;
  }

  if (Array.isArray(lightColors) && lightColors.length === 4) {
    cursorConfig.tubes.lights.colors = lightColors;
  }

  buildCursor();
}

function applyCursorTheme() {
  const isDark = document.body.classList.contains("theme_dark");

  if (isDark) {
    canvas.style.opacity = "0.5";
    canvas.style.filter = "brightness(1.05) contrast(1.12) saturate(1.15)";
  } else {
    canvas.style.opacity = "0.08";
    canvas.style.filter = "none";
  }
}

window.addEventListener("themechange", applyCursorTheme);

(async function initCursor() {
  try {
    const module = await import(
      "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
    );

    TubesCursor = module.default;
    buildCursor();

    setEffectSize({
      lerp: .7,
      noise: 0.01,
      bloomRadius: 0.018,
      xRadius: 0.06,
      yRadius: 0.035
    });

    setEffectNeon({
      lightIntensity: 200,
      bloomStrength: 0.25,
      bloomThreshold: 0.08,
      tubeColors: ["#5e72e4", "#8b5cf6", "#ff4d6d"],
      lightColors: ["#22d3ee", "#b721ff", "#ffd166", "#11cdef"]
    });
  } catch (err) {
    console.error("Failed to load TubesCursor module:", err);
  }
})();

window.addEventListener("beforeunload", () => {
  if (app && typeof app.dispose === "function") {
    app.dispose();
  }
});
