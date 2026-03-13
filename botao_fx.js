document.querySelectorAll(".botao_fx").forEach((el) => {
  if (!el.querySelector(":scope > .botao_fx_fill")) {
    const fill = document.createElement("span");
    fill.classList.add("botao_fx_fill");
    fill.setAttribute("aria-hidden", "true");
    el.prepend(fill);
  }
});
