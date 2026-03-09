const canvas = document.createElement("canvas");
canvas.className = "tubes-cursor-canvas";
document.body.prepend(canvas);

let app = null;

function randomColors(count) {
  return new Array(count)
    .fill(0)
    .map(
      () =>
        "#" +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, "0")
    );
}

setTimeout(async () => {
  try {
    const module = await import(
      "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js"
    );

    const TubesCursor = module.default;

    app = TubesCursor(canvas, {
      tubes: {
        colors: ["#dfe6ff", "#efe4ff", "#ffe7ef"],
        lights: {
          intensity: 8,
          colors: ["#ffffff", "#f3edff", "#fff9df", "#eefdf8"]
        }
      }
    });

    window.addEventListener("click", handleColorChange);
  } catch (err) {
    console.error("Failed to load TubesCursor module:", err);
  }
}, 100);

function handleColorChange() {
  if (!app) return;

  const newTubeColors = randomColors(3);
  const newLightColors = randomColors(4);

  if (app.tubes?.setColors) app.tubes.setColors(newTubeColors);
  if (app.tubes?.setLightsColors) app.tubes.setLightsColors(newLightColors);
}

window.addEventListener("beforeunload", () => {
  if (app && typeof app.dispose === "function") {
    app.dispose();
  }
});
