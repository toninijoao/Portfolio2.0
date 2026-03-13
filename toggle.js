const yearEl = document.getElementById("year");
const btn = document.getElementById("themeToggle");
const topbar = document.querySelector(".topbar");
const hero = document.querySelector(".hero");
const root = document.documentElement;
const body = document.body;

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

function updateThemeButton(theme) {
  if (!btn) return;

  const isDark = theme === "dark";
  btn.setAttribute("aria-pressed", String(isDark));
  btn.setAttribute(
    "aria-label",
    isDark ? "Ativar tema claro" : "Ativar tema escuro"
  );
}

function applyTheme(theme) {
  const nextTheme = theme === "dark" ? "dark" : "light";

  root.setAttribute("data-theme", nextTheme);
  body.classList.toggle("theme_dark", nextTheme === "dark");
  body.classList.toggle("theme_snow", nextTheme === "light");

  try {
    localStorage.setItem("theme", nextTheme);
  } catch (err) {}

  updateThemeButton(nextTheme);
  window.dispatchEvent(new CustomEvent("themechange", { detail: { theme: nextTheme } }));
}

function getInitialTheme() {
  try {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") return storedTheme;
  } catch (err) {}

  if (
    root.getAttribute("data-theme") === "dark" ||
    body.classList.contains("theme_dark")
  ) {
    return "dark";
  }

  return "light";
}

applyTheme(getInitialTheme());

async function toggleThemeWithReveal() {
  if (!btn) return;

  const nextTheme = body.classList.contains("theme_dark") ? "light" : "dark";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!document.startViewTransition || reduceMotion) {
    applyTheme(nextTheme);
    return;
  }

  const { left, top, width, height } = btn.getBoundingClientRect();
  const centerX = left + width / 2;
  const centerY = top + height / 2;
  const maxRadius = Math.hypot(
    Math.max(centerX, window.innerWidth - centerX),
    Math.max(centerY, window.innerHeight - centerY)
  );

  const transition = document.startViewTransition(() => {
    applyTheme(nextTheme);
  });

  await transition.ready;

  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${centerX}px ${centerY}px)`,
        `circle(${maxRadius}px at ${centerX}px ${centerY}px)`
      ]
    },
    {
      duration: 700,
      easing: "cubic-bezier(.22,1,.36,1)",
      pseudoElement: "::view-transition-new(root)"
    }
  );
}

if (btn) {
  btn.addEventListener("click", toggleThemeWithReveal);
}

if (topbar && hero) {
  const toggleTopbar = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    const offset = 90;

    if (heroBottom <= offset) {
      topbar.classList.add("is_visible");
    } else {
      topbar.classList.remove("is_visible");
    }
  };

  toggleTopbar();
  window.addEventListener("scroll", toggleTopbar, { passive: true });
  window.addEventListener("resize", toggleTopbar);
}
