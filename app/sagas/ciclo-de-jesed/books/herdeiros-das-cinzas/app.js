(() => {
  "use strict";

  const D = window.HC_DATA;
  const BOOK_ID = 'herdeiros-das-cinzas';
  const $ = (s, r = document) => r.querySelector(s);
  const escapeHtml = v => String(v ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const slugText = v => String(v || "").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

  const iconPaths = {
    home:'<path d="M3 11.5L12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M9 20v-6h6v6"/>',
    books:'<path d="M4 4h5v16H4zM10 4h5v16h-5zM16 6h4v14h-4z"/>',
    book:'<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22z"/><path d="M4 5.5V22"/>',
    chapter:'<path d="M6 3h12v18H6z"/><path d="M9 7h6M9 11h6M9 15h4"/>',
    timeline:'<path d="M4 6h12M4 12h16M4 18h10"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>',
    people:'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15 15a5 5 0 0 1 6 5"/>',
    network:'<circle cx="5" cy="12" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="19" cy="18" r="3"/><path d="M8 11l8-4M8 13l8 4"/>',
    family:'<circle cx="12" cy="7" r="3"/><circle cx="6" cy="11" r="2.5"/><circle cx="18" cy="11" r="2.5"/><path d="M7 21a5 5 0 0 1 10 0M2 21a4 4 0 0 1 5-3.8M22 21a4 4 0 0 0-5-3.8"/>',
    shield:'<path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>',
    map:'<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
    pin:'<path d="M12 22s7-6 7-13a7 7 0 0 0-14 0c0 7 7 13 7 13z"/><circle cx="12" cy="9" r="2"/>',
    paw:'<circle cx="8" cy="8" r="2"/><circle cx="16" cy="8" r="2"/><circle cx="5" cy="13" r="2"/><circle cx="19" cy="13" r="2"/><path d="M8 18c0-3 2-5 4-5s4 2 4 5c0 2-1.5 3-4 3s-4-1-4-3z"/>',
    leaf:'<path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16z"/><path d="M4 21c3-6 8-10 14-13"/>',
    bowl:'<path d="M4 11h16c0 6-3 9-8 9s-8-3-8-9z"/><path d="M7 7c0-2 2-2 2-4M12 7c0-2 2-2 2-4M17 7c0-2 2-2 2-4"/>',
    scroll:'<path d="M6 4h12v14H8a3 3 0 0 0-3 3h12a3 3 0 0 0 3-3V6a2 2 0 0 0-2-2"/><path d="M8 8h7M8 12h7"/>',
    image:'<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5-7 8"/>',
    question:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.7 2.7 0 1 1 4.3 2.2c-1.1.7-1.8 1.2-1.8 2.8M12 18h.01"/>',
    law:'<path d="M12 3v18M5 6h14M6 6l-3 6h6zM18 6l-3 6h6zM7 21h10"/>',
    crown:'<path d="M4 8l4 4 4-7 4 7 4-4-2 11H6z"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    close:'<path d="M5 5l14 14M19 5L5 19"/>',
    compass:'<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 4-4 2 2-4z"/>',
    gauge:'<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 14l4-4"/><path d="M6 18h12"/>',
    settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-4v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3h4v.1A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9A1.7 1.7 0 0 0 21 10v4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    embers:'<path d="M12 3c2 4-1 5 2 8 1-2 3-2 3-5 3 3 4 7 2 11-1.5 3-4 4-7 4s-6-2-7-5c-1-4 2-7 5-9 0 3 1 4 2 5 2-3 0-5 0-9z"/>',
    arrow:'<path d="M5 12h14M14 7l5 5-5 5"/>'
  };
  const icon = (name, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.scroll}</svg>`;

  const storage = {
    get(k){try{return localStorage.getItem(k)}catch{return null}},
    set(k,v){try{localStorage.setItem(k,v)}catch{}}
  };

  const state = {
    route: "inicio",
    sidebarCollapsed: storage.get("hc-sidebar-collapsed") === "1",
    characterQuery: "",
    chapterQuery: ""
  };

  // ---- Navegação ----
  const mainEl = document.getElementById("main");
  const sidebarEl = document.getElementById("sidebar");
  const navEl = document.getElementById("nav");
  const crumbEl = document.getElementById("crumb");

  function renderNav() {
    if (!navEl || !D?.navigation) return;
    navEl.innerHTML = D.navigation.map(group => `
      <div class="nav-group">
        <span class="nav-group-title">${escapeHtml(group.group)}</span>
        ${group.items.map(item => `
          <button class="nav-item ${state.route === item.id ? 'active' : ''}" data-route="${escapeHtml(item.id)}">
            <span class="nav-icon">${icon(item.icon)}</span>
            <span class="nav-label">${escapeHtml(item.label)}</span>
          </button>`).join("")}
      </div>`).join("");
  }

  function navigate(route) {
    state.route = route;
    location.hash = "#/" + route;
    renderNav();
    renderPage();
    window.scrollTo(0, 0);
  }

  function renderPage() {
    if (!mainEl) return;
    const route = state.route;
    if (route === "inicio") mainEl.innerHTML = renderInicio();
    else if (route === "books") mainEl.innerHTML = renderBooks();
    else if (route === "characters") mainEl.innerHTML = renderEmpty("Personagens", "Ainda sem personagens registados.");
    else if (route === "relationships") mainEl.innerHTML = renderEmpty("Relações", "Ainda sem relações registadas.");
    else if (route === "families") mainEl.innerHTML = renderEmpty("Famílias", "Ainda sem famílias registadas.");
    else if (route === "organisations") mainEl.innerHTML = renderEmpty("Organizações", "Ainda sem organizações registadas.");
    else if (route === "clans") mainEl.innerHTML = renderEmpty("Clãs", "Ainda sem clãs registados.");
    else if (route === "places") mainEl.innerHTML = renderEmpty("Lugares", "Ainda sem lugares registados.");
    else if (route === "map") mainEl.innerHTML = renderEmpty("Mapa", "Mapa ainda não disponível.");
    else if (route === "timeline") mainEl.innerHTML = renderEmpty("Linha do Tempo", "Ainda sem eventos registados.");
    else if (route === "chapters") mainEl.innerHTML = renderEmpty("Capítulos", "Ainda sem capítulos registados.");
    else if (route === "mysteries") mainEl.innerHTML = renderEmpty("Mistérios", "Ainda sem mistérios registados.");
    else if (route === "themes") mainEl.innerHTML = renderEmpty("Temas", "Ainda sem temas registados.");
    else if (route === "fauna") mainEl.innerHTML = renderEmpty("Fauna", "Ainda sem fauna registada.");
    else if (route === "flora") mainEl.innerHTML = renderEmpty("Flora", "Ainda sem flora registada.");
    else if (route === "foods") mainEl.innerHTML = renderEmpty("Alimentos", "Ainda sem alimentos registados.");
    else if (route === "lore") mainEl.innerHTML = renderEmpty("Conceitos e Leis", "Ainda sem conceitos registados.");
    else if (route === "gallery") mainEl.innerHTML = renderEmpty("Galeria", "Ainda sem imagens na galeria.");
    else mainEl.innerHTML = renderEmpty("Página não encontrada", "Esta secção ainda não existe.");
    attachHandlers();
  }

  function renderEmpty(title, msg) {
    setBreadcrumbs([title]);
    return `<div class="main-content"><div class="section-heading"><h1>${escapeHtml(title)}</h1></div><p class="lead" style="color:var(--di-muted);margin-top:16px">${escapeHtml(msg)}</p></div>`;
  }

  function setBreadcrumbs(parts) {
    if (!crumbEl) return;
    crumbEl.innerHTML = ["Herdeiros das Cinzas", ...parts].map((p,i) => i === 0 ? `<span>${escapeHtml(p)}</span>` : `<span aria-hidden="true">›</span><span>${escapeHtml(p)}</span>`).join("");
  }

  function synopsisHtml(value) {
    return String(value || "").split(/\n\s*\n/).filter(Boolean).map(p => `<p>${escapeHtml(p)}</p>`).join("");
  }

  // ---- Início ----
  function renderInicio() {
    setBreadcrumbs(["Início"]);
    const books = D?.books || [];
    const book = books.find(b => b.id === BOOK_ID) || {};
    return `<div class="main-content">
      <section class="hero-map-card home-guide-hero" style="background:radial-gradient(ellipse 80% 60% at 50% 30%, rgba(165,75,55,.1), transparent 65%),var(--hc-bg-deepest);border:1px solid var(--di-border);border-radius:18px;padding:48px 40px;margin-bottom:32px;display:flex;flex-direction:column;align-items:flex-start;gap:20px">
        <p class="eyebrow" style="color:var(--di-accent);font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase">Ciclo de Jesed — Guia do Livro</p>
        <h1 style="font-size:clamp(2rem,5vw,3.4rem);color:var(--di-heading);line-height:1.1;margin:0">Herdeiros das Cinzas</h1>
        <p class="lead" style="font-size:1.08rem;color:var(--di-text);max-width:560px;margin:0">${escapeHtml(book.visual || "Cinza fria, brasas discretas, ruínas partidas e marcas de sobrevivência.")}</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <button class="secondary-button" data-go="books">Ver os cinco livros</button>
          <button class="secondary-button" data-contemplative="ashes">✦ Contemplar este mundo</button>
        </div>
      </section>
      <div class="grid" style="grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px">
        ${[["characters","Personagens","Vidas marcadas pelas cinzas"],["chapters","Capítulos","A história capítulo a capítulo"],["timeline","Linha do Tempo","Antes e depois das cinzas"],["clans","Clãs","Grupos e linhagens"]].map(([id,label,desc]) => `<article class="card click" data-go="${id}" tabindex="0" role="link" style="cursor:pointer;padding:20px 18px">
          <h3 style="color:var(--di-heading);margin:0 0 6px">${escapeHtml(label)}</h3>
          <p style="color:var(--di-muted);font-size:.86rem;margin:0">${escapeHtml(desc)}</p>
        </article>`).join("")}
      </div>
    </div>`;
  }

  // ---- Livros ----
  function renderBooks() {
    setBreadcrumbs(["Todos os livros"]);
    const books = D?.books || [];
    return `<div class="main-content"><div class="section-heading"><h1>Os cinco livros</h1><p>Ciclo de Jesed — cinco livros, uma saga.</p></div>
      <div class="bookshelf" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-top:24px">
        ${books.map(b => {
          const active = b.status === "active";
          const previewable = b.id === BOOK_ID;
          const clickable = active || previewable;
          const current = b.id === BOOK_ID;
          const externalLinks = {"ruinas-dos-ceus":"ruinas.html#/inicio","guerras-de-sangue":"guerras.html#/dashboard","dinastia-polar":"dinastia-polar.html#/inicio"};
          const href = !current ? externalLinks[b.id] : null;
          return `<article class="card ${clickable ? "active" : "locked"} ${current ? "current" : ""}" style="padding:0;overflow:hidden;${!clickable?"opacity:.55;filter:saturate(.4)":""}">
            <div style="aspect-ratio:2/1;background:linear-gradient(135deg,${(b.palette||["#333","#555","#888"]).join(",")});display:flex;align-items:center;justify-content:center;font-size:2rem">${b.cover ? `<img src="${escapeHtml(b.cover)}" alt="" style="width:100%;height:100%;object-fit:cover">` : "✦"}</div>
            <div style="padding:16px">
              <p class="eyebrow">Livro ${b.order} · ${active ? (current ? "Você está aqui" : "Disponível") : (previewable ? "Em preparação" : "Bloqueado")}</p>
              <h3 style="color:var(--di-heading);margin:4px 0 6px">${escapeHtml(b.name)}</h3>
              <p style="color:var(--di-muted);font-size:.84rem;margin:0 0 14px">${escapeHtml(b.teaser || b.visual)}</p>
              ${href ? `<a class="primary-button" href="${escapeHtml(href)}" style="display:inline-block;text-decoration:none;font-size:.84rem">Ir para o livro →</a>` : ""}
            </div>
          </article>`;
        }).join("")}
      </div>
    </div>`;
  }

  // ---- Router ----
  function resolveRoute() {
    const hash = location.hash.replace(/^#\/?/, "") || "inicio";
    state.route = hash;
  }

  function handleClick(e) {
    const goEl = e.target.closest("[data-go]");
    if (goEl) { e.preventDefault(); navigate(goEl.dataset.go); return; }
    const routeEl = e.target.closest("[data-route]");
    if (routeEl) { e.preventDefault(); navigate(routeEl.dataset.route); return; }
  }

  function attachHandlers() {
    mainEl?.addEventListener("click", handleClick, { once: true });
  }

  // ---- Selector de saga/livro ----
  function openSelector(type) {
    const modal = document.getElementById("selectorModal");
    const content = document.getElementById("selectorContent");
    if (!modal || !content) return;
    if (type === "books") {
      const books = D?.books || [];
      content.innerHTML = `<p class="eyebrow" style="margin:0 0 16px">Ciclo de Jesed</p><h2 style="margin:0 0 20px;color:var(--di-heading)">Cinco livros</h2>
        <div style="display:grid;gap:10px">
          ${books.map(b => {
            const active = b.status === "active";
            const previewable = b.id === BOOK_ID;
            const current = b.id === BOOK_ID;
            const hrefs = {"ruinas-dos-ceus":"ruinas.html#/inicio","guerras-de-sangue":"guerras.html#/dashboard","dinastia-polar":"dinastia-polar.html#/inicio"};
            const href = current ? null : hrefs[b.id];
            const clickable = (active || previewable) && href;
            return `<${clickable ? `a href="${escapeHtml(href)}"` : "div"} class="selector-card ${current ? "active" : (clickable ? "" : "locked")}" style="display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:12px;border:1px solid var(--di-border);text-decoration:none;color:inherit;${!clickable&&!current?"opacity:.5":""}">
              <span style="width:36px;height:36px;border-radius:8px;background:linear-gradient(135deg,${(b.palette||["#333","#555"]).slice(0,2).join(",")});flex:0 0 36px"></span>
              <div><strong style="color:var(--di-heading);font-size:.9rem">${escapeHtml(b.name)}</strong><br><small style="color:var(--di-muted);font-size:.76rem">Livro ${b.order} · ${current?"Você está aqui":active?"Disponível":previewable?"Em preparação":"Bloqueado"}</small></div>
              ${current?`<span style="margin-left:auto;font-size:.72rem;color:var(--di-accent)">● Aqui</span>`:""}
            </${clickable ? "a" : "div"}>`;
          }).join("")}
        </div>`;
    }
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = "grid";
  }

  // ---- Pesquisa ----
  const searchModal = document.getElementById("searchModal");
  const searchInput = document.getElementById("searchInput");

  function openSearch() { searchModal?.removeAttribute("aria-hidden"); searchModal && (searchModal.style.display = "grid"); searchInput?.focus(); }
  function closeSearch() { searchModal?.setAttribute("aria-hidden", "true"); searchModal && (searchModal.style.display = ""); }

  // ---- Configurações ----
  const settingsDrawer = document.getElementById("settingsDrawer");
  const settingsContent = document.getElementById("settingsContent");

  function openSettings() {
    settingsDrawer?.removeAttribute("aria-hidden");
    settingsDrawer && (settingsDrawer.style.display = "grid");
    if (settingsContent && !settingsContent.innerHTML.trim()) {
      settingsContent.innerHTML = `<div class="settings-group"><h3>Perfis rápidos</h3><div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">
        <button class="preset-button" data-preset="full">Completo</button>
        <button class="preset-button" data-preset="normal">Equilibrado</button>
        <button class="preset-button" data-preset="performance">Desempenho</button>
      </div></div>`;
    }
  }
  function closeSettings() { settingsDrawer?.setAttribute("aria-hidden", "true"); settingsDrawer && (settingsDrawer.style.display = ""); }

  // ---- Eventos globais ----
  document.addEventListener("click", e => {
    if (e.target.closest("[data-go]")) { navigate(e.target.closest("[data-go]").dataset.go); return; }
    if (e.target.closest("[data-route]")) { navigate(e.target.closest("[data-route]").dataset.route); return; }
    if (e.target.closest("#bookSwitch") || e.target.closest("[data-open-selector='books']")) { openSelector("books"); return; }
    if (e.target.closest("[data-selector-close]") || e.target.closest(".search-modal-backdrop")) {
      document.getElementById("selectorModal")?.setAttribute("aria-hidden", "true");
      document.getElementById("selectorModal") && (document.getElementById("selectorModal").style.display = "");
      closeSearch();
    }
    if (e.target.closest("#searchTrigger")) { openSearch(); return; }
    if (e.target.closest("[data-search-close]")) { closeSearch(); return; }
    if (e.target.closest("#settingsButton")) { openSettings(); return; }
    if (e.target.closest("[data-drawer-close]")) { closeSettings(); return; }
    if (e.target.closest("#menu")) { sidebarEl?.classList.toggle("mobile-open"); return; }
  });

  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") { e.preventDefault(); openSearch(); }
    if (e.key === "Escape") { closeSearch(); closeSettings(); }
  });

  // ---- Sidebar colapsável ----
  const collapseToggle = document.getElementById("hcSidebarToggle");
  collapseToggle?.addEventListener("click", () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    sidebarEl?.classList.toggle("collapsed", state.sidebarCollapsed);
    const workspace = document.querySelector(".workspace");
    workspace?.classList.toggle("sidebar-collapsed", state.sidebarCollapsed);
    storage.set("hc-sidebar-collapsed", state.sidebarCollapsed ? "1" : "0");
  });
  if (state.sidebarCollapsed) { sidebarEl?.classList.add("collapsed"); }

  // ---- Topbar selector ----
  const sagaSelector = document.getElementById("sagaSelector");
  sagaSelector?.addEventListener("click", () => openSelector("sagas"));

  // ---- Início ----
  resolveRoute();
  renderNav();
  renderPage();
  window.addEventListener("hashchange", () => { resolveRoute(); renderNav(); renderPage(); window.scrollTo(0, 0); });
})();
