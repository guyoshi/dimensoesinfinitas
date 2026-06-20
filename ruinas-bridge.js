(() => {
  const normalize = value => String(value || "").trim().toLocaleLowerCase("pt-BR");
  const isRuinas = element => normalize(element?.textContent).includes("ruínas dos céus");

  function openRuinas(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href = "ruinas.html";
  }

  function unlockRuinas() {
    document.querySelectorAll(".book-card").forEach(card => {
      if (!isRuinas(card)) return;
      card.classList.remove("locked");
      card.classList.add("active", "ruinas-available");
      card.removeAttribute("data-route");
      card.setAttribute("role", "link");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", "Abrir Ruínas dos Céus");
      const status = card.querySelector(".book-status");
      if (status) status.innerHTML = "<span>Livro concluído</span><span>Abrir</span>";
    });

    document.querySelectorAll(".selector-card").forEach(card => {
      if (!isRuinas(card)) return;
      card.disabled = false;
      card.classList.remove("locked");
      card.classList.add("active", "ruinas-available");
      card.removeAttribute("data-route");
      const state = card.querySelector("small");
      if (state) state.textContent = "Disponível";
    });
  }

  document.addEventListener("click", event => {
    const target = event.target.closest(".ruinas-available");
    if (target) openRuinas(event);
  }, true);

  document.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.target.closest(".ruinas-available")) openRuinas(event);
  }, true);

  new MutationObserver(unlockRuinas).observe(document.documentElement, { childList: true, subtree: true });
  unlockRuinas();
})();
