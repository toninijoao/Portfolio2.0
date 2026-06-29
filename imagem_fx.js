document.querySelectorAll(".image_fx").forEach((element) => {
  let currentX = 0;
  let currentY = 0;
  let targetX = 0;
  let targetY = 0;
  let idleTime = 0;
  let isHovering = false;
  let rafId = 0;

  const animate = () => {
    if (!isHovering) {
      idleTime += 0.02;
      targetX = Math.sin(idleTime) * 4;
      targetY = Math.cos(idleTime * 1.2) * -4;
    }

    currentX += (targetX - currentX) * 0.12;
    currentY += (targetY - currentY) * 0.12;

    element.style.transform =
      `perspective(1200px) rotateX(${currentY}deg) rotateY(${currentX}deg) scale3d(1.02, 1.02, 1.02)`;

    rafId = requestAnimationFrame(animate);
  };

  element.addEventListener("pointerenter", () => {
    isHovering = true;
  });

  element.addEventListener("pointermove", (e) => {
    const rect = element.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    targetX = (px - 0.5) * 18;
    targetY = (0.5 - py) * 18;
  });

  element.addEventListener("pointerleave", () => {
    isHovering = false;
    targetX = 0;
    targetY = 0;
  });

  rafId = requestAnimationFrame(animate);

  window.addEventListener("beforeunload", () => {
    cancelAnimationFrame(rafId);
  }, { once: true });
});
