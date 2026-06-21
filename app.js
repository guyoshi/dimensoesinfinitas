(() => {
  "use strict";

  const D = window.DI_DATA;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
  const escapeRegExp = (value = "") => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const slugText = value => String(value || "").toLocaleLowerCase("pt-BR");

  const iconPaths = {
    home: '<path d="M3 11.5L12 4l9 7.5"/><path d="M5 10.5V20h14v-9.5"/><path d="M9 20v-6h6v6"/>',
    books: '<path d="M4 4h5v16H4zM10 4h5v16h-5zM16 6h4v14h-4z"/>',
    book: '<path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H20v17H7.5A3.5 3.5 0 0 0 4 22z"/><path d="M4 5.5V22"/>',
    chapter: '<path d="M6 3h12v18H6z"/><path d="M9 7h6M9 11h6M9 15h4"/>',
    timeline: '<path d="M4 6h12M4 12h16M4 18h10"/><circle cx="18" cy="6" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="16" cy="18" r="2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    branches: '<path d="M6 4v5a3 3 0 0 0 3 3h6a3 3 0 0 1 3 3v5"/><path d="M18 4v5a3 3 0 0 1-3 3"/><circle cx="6" cy="4" r="2"/><circle cx="18" cy="4" r="2"/><circle cx="18" cy="20" r="2"/>',
    people: '<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15 15a5 5 0 0 1 6 5"/>',
    person: '<circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/>',
    network: '<circle cx="5" cy="12" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="19" cy="18" r="3"/><path d="M8 11l8-4M8 13l8 4"/>',
    family: '<circle cx="12" cy="7" r="3"/><circle cx="6" cy="11" r="2.5"/><circle cx="18" cy="11" r="2.5"/><path d="M7 21a5 5 0 0 1 10 0M2 21a4 4 0 0 1 5-3.8M22 21a4 4 0 0 0-5-3.8"/>',
    banner: '<path d="M5 22V3"/><path d="M6 4h12l-2 4 2 4H6"/>',
    map: '<path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><path d="M9 3v15M15 6v15"/>',
    pin: '<path d="M12 22s7-6 7-13a7 7 0 0 0-14 0c0 7 7 13 7 13z"/><circle cx="12" cy="9" r="2"/>',
    shield: '<path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>',
    route: '<circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18c7 0 3-12 10-12"/>',
    paw: '<circle cx="8" cy="8" r="2"/><circle cx="16" cy="8" r="2"/><circle cx="5" cy="13" r="2"/><circle cx="19" cy="13" r="2"/><path d="M8 18c0-3 2-5 4-5s4 2 4 5c0 2-1.5 3-4 3s-4-1-4-3z"/>',
    leaf: '<path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16z"/><path d="M4 21c3-6 8-10 14-13"/>',
    grain: '<path d="M12 22V5"/><path d="M12 8c-4 0-6-2-6-5 4 0 6 2 6 5zM12 12c4 0 6-2 6-5-4 0-6 2-6 5zM12 16c-4 0-6-2-6-5 4 0 6 2 6 5zM12 20c4 0 6-2 6-5-4 0-6 2-6 5z"/>',
    bowl: '<path d="M4 11h16c0 6-3 9-8 9s-8-3-8-9z"/><path d="M7 7c0-2 2-2 2-4M12 7c0-2 2-2 2-4M17 7c0-2 2-2 2-4"/>',
    scroll: '<path d="M6 4h12v14H8a3 3 0 0 0-3 3h12a3 3 0 0 0 3-3V6a2 2 0 0 0-2-2"/><path d="M8 8h7M8 12h7"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="9" r="2"/><path d="M21 15l-5-5-7 8"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.7 2.7 0 1 1 4.3 2.2c-1.1.7-1.8 1.2-1.8 2.8M12 18h.01"/>',
    quill: '<path d="M20 4c-6 0-11 5-11 11l-4 4 4-1 2-3c6 0 10-5 9-11z"/><path d="M9 15l7-7"/>',
    warning: '<path d="M12 3l10 18H2z"/><path d="M12 9v5M12 18h.01"/>',
    law: '<path d="M12 3v18M5 6h14M6 6l-3 6h6zM18 6l-3 6h6zM7 21h10"/>',
    seal: '<circle cx="12" cy="9" r="6"/><path d="M9 14l-2 8 5-3 5 3-2-8"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-4v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H3v-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6 1.7 1.7 0 0 0 10 3h4v.1A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9A1.7 1.7 0 0 0 21 10v4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    gauge: '<path d="M4 18a8 8 0 1 1 16 0"/><path d="M12 14l4-4"/><path d="M6 18h12"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>',
    close: '<path d="M5 5l14 14M19 5L5 19"/>',
    compass: '<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 4-4 2 2-4z"/>',
    crown: '<path d="M4 8l4 4 4-7 4 7 4-4-2 11H6z"/>',
    portal: '<circle cx="12" cy="12" r="8"/><path d="M12 4c4 4 4 12 0 16M12 4c-4 4-4 12 0 16M4 12h16"/>',
    eye: '<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',
    wind: '<path d="M3 8h11c2 0 3-1 3-2.5S16 3 14.5 3M3 12h16c1.7 0 3 1.2 3 2.8S20.7 18 19 18M3 16h9"/>',
    'crossed-swords': '<path d="M5 4l7 7M19 4l-7 7M9 14l-5 5M15 14l5 5M4 4l3 1-2 2zM20 4l-3 1 2 2z"/>',
    fortress: '<path d="M4 21V9h3V5h3v4h4V5h3v4h3v12z"/><path d="M9 21v-5h6v5"/>',
    embers: '<path d="M12 3c2 4-1 5 2 8 1-2 3-2 3-5 3 3 4 7 2 11-1.5 3-4 4-7 4s-6-2-7-5c-1-4 2-7 5-9 0 3 1 4 2 5 2-3 0-5 0-9z"/>',
    hourglass: '<path d="M6 3h12M6 21h12M8 3c0 4 1 6 4 9-3 3-4 5-4 9M16 3c0 4-1 6-4 9 3 3 4 5 4 9"/>',
    root: '<path d="M12 3v18M12 8c-4-4-7-1-8 2 4 0 6 1 8 4M12 10c4-4 7-1 8 2-4 0-6 1-8 4M12 15c-2 2-4 4-4 6M12 15c2 2 4 4 4 6"/>',
    skull: '<path d="M6 15v-3a6 6 0 1 1 12 0v3l-2 2v3H8v-3z"/><circle cx="9.5" cy="12" r="1"/><circle cx="14.5" cy="12" r="1"/><path d="M10 17h4"/>',
    copy: '<rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    arrow: '<path d="M5 12h14M14 7l5 5-5 5"/>',
    zoomin: '<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5L21 21M10 7v6M7 10h6"/>',
    zoomout: '<circle cx="10" cy="10" r="6"/><path d="M14.5 14.5L21 21M7 10h6"/>',
    center: '<circle cx="12" cy="12" r="4"/><path d="M12 2v4M12 18v4M2 12h4M18 12h4"/>',
    fullscreen: '<path d="M8 3H3v5M16 3h5v5M8 21H3v-5M16 21h5v-5"/>',
    bone: '<path d="M7 5a2 2 0 1 0-3-1 2 2 0 1 0 1 3l12 12a2 2 0 1 0 3 1 2 2 0 1 0-1-3z"/>',
    water: '<path d="M12 3s6 6 6 11a6 6 0 0 1-12 0c0-5 6-11 6-11z"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',
    blade: '<path d="M18 3l3 3-11 11-4 1 1-4z"/><path d="M5 17l2 2-3 3-2-2z"/>',
    filter: '<path d="M4 5h16l-6 7v6l-4 2v-8z"/>',
    chevron: '<path d="M8 10l4 4 4-4"/>',
    location: '<path d="M12 21s6-5.2 6-12a6 6 0 1 0-12 0c0 6.8 6 12 6 12z"/><circle cx="12" cy="9" r="2"/>'
  };
  const icon = (name, cls = "") => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.scroll}</svg>`;

  const storage = {
    get(key) { try { return localStorage.getItem(key); } catch { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch {} }
  };

  const state = {
    route: "portal",
    sidebarCollapsed: storage.get("di-sidebar-collapsed") === "1",
    viewMode: storage.get("di-character-view") || "grid",
    characterTab: "overview",
    searchMode: "titles",
    relationshipFilter: "all",
    settings: {
      preset: storage.get("di-preset") || "normal",
      particles: storage.get("di-particles") !== "0",
      transitions: storage.get("di-transitions") !== "0",
      textures: storage.get("di-textures") !== "0",
      blur: storage.get("di-blur") !== "0",
      shadows: storage.get("di-shadows") !== "0",
      motion: storage.get("di-motion") !== "0",
      particleAmount: Number(storage.get("di-particle-amount") || 22)
    },
    map: { zoom: 1, x: 0, y: 0, dragging: false, startX: 0, startY: 0 }
  };

  const refs = {
    portal: $("#portal"), shell: $("#appShell"), sidebar: $("#sidebar"), nav: $("#sidebarNav"),
    main: $("#mainContent"), breadcrumbs: $("#breadcrumbs"), searchModal: $("#searchModal"),
    searchInput: $("#searchInput"), searchResults: $("#searchResults"), settingsDrawer: $("#settingsDrawer"),
    settingsContent: $("#settingsContent"), selectorModal: $("#selectorModal"), selectorContent: $("#selectorContent"),
    transitionVeil: $("#transitionVeil"), particles: $("#particleLayer"), particlesFront: $("#particleLayerFront")
  };

  const getBook = id => D.books.find(item => item.id === id);
  const getCharacter = id => D.characters.find(item => item.id === id || item.slug === id);
  const getClan = id => D.clans.find(item => item.id === id || item.slug === id);
  const getPlace = id => D.places.find(item => item.id === id || item.slug === id);
  const getChapter = id => D.chapters.find(item => item.id === id || String(item.number) === String(id));
  const getEvent = id => D.events.find(item => item.id === id || item.slug === id);
  const getMystery = id => D.mysteries.find(item => item.id === id || item.slug === id);
  const getLoreItem = (kind, id) => (D.lore[kind] || []).find(item => item.id === id || item.slug === id);
  const routeForEntityId = id => {
    const c = getCharacter(id); if (c) return `character/${c.slug}`;
    const p = getPlace(id); if (p) return `place/${p.slug}`;
    const cl = getClan(id); if (cl) return `clan/${cl.slug}`;
    const ev = getEvent(id); if (ev) return `event/${ev.slug}`;
    return null;
  };

  const aliasMap = new Map();
  const aliases = [...(D.entityAliases || [])]
    .filter(item => item.text && item.text.length > 2)
    .sort((a, b) => b.text.length - a.text.length);
  aliases.forEach(item => {
    const key = slugText(item.text);
    if (!aliasMap.has(key)) aliasMap.set(key, item.route);
  });
  const aliasPattern = aliases.length
    ? new RegExp(`(${aliases.map(item => escapeRegExp(item.text)).join("|")})`, "giu")
    : null;

  function linkifyText(text = "") {
    if (!aliasPattern) return escapeHtml(text);
    let last = 0;
    let output = "";
    aliasPattern.lastIndex = 0;
    for (const match of text.matchAll(aliasPattern)) {
      const start = match.index ?? 0;
      output += escapeHtml(text.slice(last, start));
      const raw = match[0];
      const route = aliasMap.get(slugText(raw));
      output += route
        ? `<button class="inline-entity-link" data-route="${escapeHtml(route)}">${escapeHtml(raw)}</button>`
        : escapeHtml(raw);
      last = start + raw.length;
    }
    output += escapeHtml(text.slice(last));
    return output;
  }

  function imageOrIcon(src, iconName, alt, cls = "") {
    return src
      ? `<img class="${cls}" src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy">`
      : `<span class="${cls} visual-fallback">${icon(iconName)}</span>`;
  }

  function fillParticleLayer(layer, count, sizeMin, sizeMax) {
    layer.innerHTML = "";
    for (let i = 0; i < count; i += 1) {
      const particle = document.createElement("span");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.setProperty("--size", `${sizeMin + Math.random() * (sizeMax - sizeMin)}px`);
      particle.style.setProperty("--duration", `${12 + Math.random() * 24}s`);
      particle.style.setProperty("--delay", `${-Math.random() * 25}s`);
      particle.style.setProperty("--sway", `${-90 + Math.random() * 180}px`);
      layer.appendChild(particle);
    }
  }

  function createParticles() {
    refs.particles.innerHTML = "";
    if (refs.particlesFront) refs.particlesFront.innerHTML = "";
    if (!state.settings.particles || state.settings.preset === "performance") return;
    const count = Math.max(4, Math.min(50, state.settings.particleAmount));
    fillParticleLayer(refs.particles, count, 1, 4.5);
    if (refs.particlesFront) fillParticleLayer(refs.particlesFront, Math.max(2, Math.round(count * .4)), 2.5, 6);
  }

  const PRESET_VALUES = {
    full: { particles: true, transitions: true, textures: true, blur: true, shadows: true, motion: true, particleAmount: 34 },
    normal: { particles: true, transitions: true, textures: true, blur: true, shadows: true, motion: true, particleAmount: 22 },
    performance: { particles: false, transitions: false, textures: false, blur: false, shadows: false, motion: false }
  };
  function detectPreset() {
    const s = state.settings;
    for (const key of Object.keys(PRESET_VALUES)) {
      const values = PRESET_VALUES[key];
      if (Object.keys(values).every(k => s[k] === values[k])) return key;
    }
    return "custom";
  }

  function applySettings() {
    state.settings.preset = detectPreset();
    const body = document.body;
    body.classList.toggle("no-particles", !state.settings.particles || state.settings.preset === "performance");
    body.classList.toggle("no-transitions", !state.settings.transitions);
    body.classList.toggle("no-textures", !state.settings.textures);
    body.classList.toggle("no-blur", !state.settings.blur);
    body.classList.toggle("no-shadows", !state.settings.shadows);
    body.classList.toggle("no-motion", !state.settings.motion);
    body.classList.toggle("performance-mode", state.settings.preset === "performance");
    const perfOn = state.settings.preset === "performance";
    const perfButton = $("#performanceToggle");
    if (perfButton) {
      perfButton.classList.toggle("active", perfOn);
      perfButton.setAttribute("aria-pressed", String(perfOn));
      const label = perfOn ? "Modo desempenho activado" : "Modo desempenho desactivado";
      perfButton.setAttribute("aria-label", label);
      perfButton.title = label;
    }
    createParticles();
  }

  function persistSettings() {
    Object.entries(state.settings).forEach(([key, value]) => {
      const storageKey = key === "particleAmount" ? "di-particle-amount" : `di-${key}`;
      storage.set(storageKey, typeof value === "boolean" ? (value ? "1" : "0") : String(value));
    });
    applySettings();
    renderSettings();
  }

  function renderNav() {
    refs.nav.innerHTML = D.navigation.map(group => `
      <section class="nav-group">
        <div class="nav-group-title">${escapeHtml(group.group)}</div>
        ${group.items.map(item => `
          <button class="nav-item" data-route="${item.id}" data-tooltip="${escapeHtml(item.label)}">
            <span class="nav-icon">${icon(item.icon)}</span>
            <span class="nav-label">${escapeHtml(item.label)}</span>
          </button>`).join("")}
      </section>`).join("");
  }

  function renderPortal() {
    refs.portal.innerHTML = `
      <div class="dimension-orbit" aria-hidden="true"></div>
      <div class="portal-wrap page-enter">
        <p class="portal-kicker">Arquivo pessoal do autor</p>
        <h1 class="portal-title">Dimensões Infinitas</h1>
        <p class="portal-subtitle">Um arquivo interligado de personagens, relações, mundos, acontecimentos e consequências.</p>
        <section class="saga-grid">
          ${D.sagas.map(saga => `
            <article class="saga-card ${saga.status}" ${saga.status === "active" ? 'data-enter-saga="1"' : ""}>
              <span class="saga-icon-large">${icon(saga.symbol)}</span>
              <h2>${escapeHtml(saga.name)}</h2>
              <p>${escapeHtml(saga.description)}</p>
              <span class="saga-state">${saga.status === "active" ? "Disponível" : "Em preparação"}</span>
              ${saga.status === "active" ? `<button class="saga-enter" data-enter-saga="1">Entrar ${icon("arrow")}</button>` : ""}
            </article>`).join("")}
        </section>
      </div>`;
  }

  function setBreadcrumbs(items) {
    refs.breadcrumbs.innerHTML = items.map((item, index) => `${index ? '<span aria-hidden="true">›</span>' : ""}${item.route ? `<button data-route="${item.route}">${escapeHtml(item.label)}</button>` : `<span>${escapeHtml(item.label)}</span>`}`).join("");
  }

  function pageHeader(kicker, title, subtitle, actions = "") {
    return `<header class="page-header">
      <div><p class="eyebrow">${escapeHtml(kicker)}</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(subtitle || "")}</p></div>
      ${actions ? `<div class="page-actions">${actions}</div>` : ""}
    </header>`;
  }

  function canonNotice() {
    return "";
  }

  function miniEntity(title, subtitle, iconName, route, stateText = "", image = null) {
    return `<button class="mini-list-item" data-route="${escapeHtml(route)}">
      <span class="mini-icon ${image ? "has-image" : ""}">${image ? `<img src="${escapeHtml(image)}" alt="" loading="lazy">` : icon(iconName)}</span>
      <span class="mini-copy"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(subtitle || "Informação não registada")}</small></span>
      ${stateText ? `<span class="mini-state">${escapeHtml(stateText)}</span>` : ""}
    </button>`;
  }

  function renderDashboard() {
    const quick = [
      ["characters", "people", "Personagens", "Quem são e onde ficaram"],
      ["relationships", "network", "Relações", "Vínculos e evolução"],
      ["mysteries", "question", "Mistérios", "Pistas e revelações"],
      ["events", "timeline", "Acontecimentos", "Causas e efeitos"],
      ["map", "map", "Mapa", "Jesed em Guerras de Sangue"],
      ["scene-pack", "quill", "Pacote de cena", "Contexto para escrever"]
    ];
    refs.main.innerHTML = `<div class="page-enter">
      ${canonNotice()}
      <section class="hero-map-card">
        <img src="assets/mapa-guerras-de-sangue.webp" alt="Mapa de Jesed na época de Guerras de Sangue">
        <div class="hero-map-content">
          <p class="eyebrow">Ciclo de Jesed · Guia do livro</p>
          <img class="hero-logo glow-title" src="assets/branding/Guerras de Sangue white.png" alt="Guerras de Sangue">
          <p>Um arquivo cartográfico de pessoas, territórios, segredos e consequências, limitado aos capítulos realmente escritos.</p>
          <div class="hero-actions"><button class="primary-button" data-route="map">${icon("map")} Abrir mapa</button><button class="secondary-button" data-route="books">${icon("books")} Ver os cinco livros</button></div>
        </div>
      </section>
      <section class="quick-grid">${quick.map(item => `<button class="quick-card" data-route="${item[0]}"><span class="quick-icon">${icon(item[1])}</span><strong>${item[2]}</strong><small>${item[3]}</small></button>`).join("")}</section>
      <section class="metrics-grid">
        ${[[D.characters.length,"personagens","characters"],[D.clans.length,"clãs","clans"],[D.places.length,"lugares","places"],[D.chapters.length,"capítulos escritos","chapters"],[D.events.length,"acontecimentos","events"],[D.mysteries.length,"mistérios","mysteries"]].map(item => `<article class="metric-card" data-route="${item[2]}"><strong>${item[0]}</strong><span>${item[1]}</span></article>`).join("")}
      </section>
      <section class="dashboard-columns">
        <article class="dark-panel section-card"><div class="section-heading"><div><h2>Personagens em foco</h2><p>Estado no último ponto realmente escrito.</p></div><button class="text-button" data-route="characters">Ver todos</button></div><div class="mini-list">${D.characters.filter(c => c.importance === "Principal").slice(0, 5).map(c => miniEntity(c.name, c.alias, "person", `character/${c.slug}`, c.status, c.image)).join("")}</div></article>
        <article class="dark-panel section-card"><div class="section-heading"><div><h2>Últimos capítulos</h2><p>Continuação directa da escrita actual.</p></div><button class="text-button" data-route="chapters">Ver todos</button></div><div class="mini-list">${D.chapters.slice(-5).reverse().map(ch => miniEntity(`Capítulo ${ch.number} — ${ch.title}`, ch.summary, "chapter", `chapter/${ch.id}`, ch.status)).join("")}</div></article>
      </section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed"},{label:"Início"}]);
  }

  function renderBooks() {
    refs.main.innerHTML = `<div class="page-enter">
      ${pageHeader("Ciclo de Jesed", "Os cinco livros", "Todos ocupam o seu lugar na saga. Ruínas dos Céus e Guerras de Sangue já podem ser abertos nesta etapa.")}
      ${canonNotice()}
      <section class="bookshelf enhanced-bookshelf">
        ${D.books.map(book => `
          <article class="book-card cover-book-card ${book.status} ${book.cover ? "has-cover" : ""}" style="--book-a:${book.palette[0]};--book-b:${book.palette[1]};--book-c:${book.palette[2]};${book.cover ? `--book-cover:url('${book.cover}')` : ""}" ${book.status === "active" ? `data-route="book/${book.id}"` : ""}>
            <div class="book-cover-overlay"></div>
            <span class="book-number readable-book-number">Livro ${book.order}</span>
            ${book.cover ? "" : `<div class="book-symbol">${icon(book.icon)}</div>`}
            <div class="book-card-copy"><h2>${escapeHtml(book.name)}</h2><p>${escapeHtml(book.synopsis || book.visual)}</p></div>
            <div class="book-status"><span>${book.status === "active" ? "Livro concluído" : "Bloqueado"}</span><span>${book.status === "active" ? "Abrir" : "Em preparação"}</span></div>
          </article>`).join("")}
      </section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Livros"}]);
  }

  function renderBook(id) {
    const book = getBook(id) || getBook("guerras-de-sangue");
    const cover = book.cover ? `<img src="${book.cover}" alt="Capa de ${escapeHtml(book.name)}">` : icon(book.icon);
    if (book.id !== "guerras-de-sangue") {
      const externalLinks = { "ruinas-dos-ceus": "ruinas.html" };
      const bookLogos = { "ruinas-dos-ceus": "assets/branding/Ruínas dos Céus white.png" };
      const href = externalLinks[book.id];
      const logo = bookLogos[book.id];
      const titleHtml = logo ? `<img class="hero-logo" src="${logo}" alt="${escapeHtml(book.name)}">` : `<h2>${escapeHtml(book.name)}</h2>`;
      refs.main.innerHTML = `<div class="page-enter">
        ${pageHeader(`Livro ${book.order} · Ciclo de Jesed`, book.name, book.status === "active" ? "Livro disponível, com sistema de navegação próprio." : "Ainda em preparação nesta etapa.")}
        <section class="book-detail-hero"><div class="book-detail-cover">${cover}</div><div class="book-detail-copy"><p class="eyebrow">${book.status === "active" ? "Disponível" : "Bloqueado nesta etapa"}</p>${titleHtml}<p>${escapeHtml(book.visual)}</p>${href ? `<div class="hero-actions"><button class="primary-button" data-external-href="${href}">${icon("arrow")} Ir para a página do livro</button></div>` : ""}</div></section>
      </div>`;
      setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Livros",route:"books"},{label:book.name}]);
      return;
    }
    refs.main.innerHTML = `<div class="page-enter">
      ${pageHeader(`Livro ${book.order} · Ciclo de Jesed`, book.name, "Livro concluído, organizado em todos os seus capítulos.", `<button class="secondary-button" data-route="chapters">${icon("chapter")} Capítulos</button><button class="primary-button" data-route="map">${icon("map")} Mapa do período</button>`)}
      ${canonNotice()}
      <section class="book-detail-hero"><div class="book-detail-cover">${cover}</div><div class="book-detail-copy"><p class="eyebrow">Estado editorial</p><h2>${D.chapters.length} capítulos escritos</h2><p>${escapeHtml(book.synopsis || book.visual)}</p><div class="tag-row"><span class="tag">${D.chapters[D.chapters.length - 1].number} capítulos no total</span><span class="tag">Mapa disponível</span><span class="tag">Livro concluído</span></div></div></section>
      <section class="metrics-grid">${[[D.chapters.length,"capítulos escritos","chapters"],[D.characters.length,"personagens","characters"],[D.events.length,"acontecimentos","events"],[D.mysteries.length,"mistérios","mysteries"],[D.clans.length,"clãs","clans"],[D.places.length,"lugares","places"]].map(item => `<article class="metric-card" data-route="${item[2]}"><strong>${item[0]}</strong><span>${item[1]}</span></article>`).join("")}</section>
      <section class="dark-panel section-card"><div class="section-heading"><div><h2>Capítulos escritos</h2><p>O Capítulo ${D.chapters[D.chapters.length - 1].number} é o limite actual.</p></div></div><div class="mini-list">${D.chapters.map(ch => miniEntity(`Capítulo ${ch.number} — ${ch.title}`, ch.summary, "chapter", `chapter/${ch.id}`, `${ch.wordCount.toLocaleString("pt-BR")} palavras`)).join("")}</div></section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Livros",route:"books"},{label:book.name}]);
  }

  function renderCharacters() {
    refs.main.innerHTML = `<div class="page-enter">
      ${pageHeader("Pessoas", "Personagens", "Consulte aparência, trajectória, relações, localização e o último estado conhecido.")}
      <div class="filter-toolbar"><button class="filter-chip active" data-char-filter="all">Todos</button>${D.clans.map(clan => `<button class="filter-chip" data-char-filter="${clan.id}">${escapeHtml(clan.name)}</button>`).join("")}<div class="view-switch"><button class="icon-button ${state.viewMode === "grid" ? "active" : ""}" data-view="grid" title="Cartões">${icon("image")}</button><button class="icon-button ${state.viewMode === "list" ? "active" : ""}" data-view="list" title="Lista">${icon("timeline")}</button></div></div>
      <div id="characterList">${characterListHtml(D.characters)}</div>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Personagens"}]);
  }

  function characterListHtml(list) {
    if (state.viewMode === "list") {
      return `<table class="entity-table"><thead><tr><th>Nome</th><th>Clã</th><th>Estado</th><th>Localização</th><th>Última aparição</th></tr></thead><tbody>${list.map(c => `<tr data-route="character/${c.slug}"><td data-label="Nome"><span class="table-person">${c.image ? `<img src="${c.image}" alt="">` : icon("person")}<strong>${escapeHtml(c.name)}</strong></span></td><td data-label="Clã">${escapeHtml(getClan(c.clanId)?.name || "—")}</td><td data-label="Estado">${escapeHtml(c.status)}</td><td data-label="Localização">${escapeHtml(getPlace(c.locationId)?.name || "Não registada")}</td><td data-label="Última aparição">${escapeHtml(c.lastSeen.chapter)}</td></tr>`).join("")}</tbody></table>`;
    }
    return `<section class="entity-grid character-grid">${list.map(c => `<article class="entity-card character-card" data-route="character/${c.slug}"><div class="character-card-image">${imageOrIcon(c.image, "person", c.name, "entity-avatar-image")}</div><div class="entity-card-body"><div class="entity-card-top"><div><h3>${escapeHtml(c.name)}</h3><span class="alias">${escapeHtml(c.alias)}</span></div></div><p>${escapeHtml(c.summary)}</p><div class="tag-row"><span class="tag">${escapeHtml(getClan(c.clanId)?.name || "Sem clã")}</span><span class="tag">${escapeHtml(c.status)}</span><span class="tag">${escapeHtml(getPlace(c.locationId)?.name || "Local desconhecido")}</span></div></div></article>`).join("")}</section>`;
  }

  function renderCharacter(slug) {
    const character = getCharacter(slug);
    if (!character) return renderNotFound();
    const clan = getClan(character.clanId);
    const place = getPlace(character.locationId);
    const actions = `<button class="secondary-button" data-copy-character="${character.id}">${icon("copy")} Copiar contexto</button><button class="secondary-button" data-route="relationships">${icon("network")} Relações</button>${place ? `<button class="primary-button" data-route="place/${place.slug}">${icon("pin")} Abrir localização</button>` : ""}`;
    refs.main.innerHTML = `<div class="page-enter">
      ${pageHeader("Personagem · Guerras de Sangue", character.name, character.alias, actions)}
      <section class="character-hero">
        <div class="character-portrait ${character.image ? "has-image" : ""}">${imageOrIcon(character.image, "person", character.name, "character-portrait-image")}</div>
        <article class="parchment-panel character-summary"><p class="eyebrow">${escapeHtml(clan?.name || "Sem clã registado")}</p><h1>${escapeHtml(character.name)}</h1><span class="alias">${escapeHtml(character.alias)}</span><p>${escapeHtml(character.summary)}</p><div class="character-meta-grid"><div class="character-meta"><small>Estado</small><strong>${escapeHtml(character.status)}</strong></div><div class="character-meta"><small>Localização</small><strong>${escapeHtml(place?.name || "Não registada")}</strong></div><div class="character-meta"><small>Importância</small><strong>${escapeHtml(character.importance)}</strong></div><div class="character-meta"><small>Última aparição</small><strong>${escapeHtml(character.lastSeen.chapter)}</strong></div></div></article>
      </section>
      <section class="parchment-panel leave-card"><div class="section-heading"><div><p class="eyebrow">Retomar a escrita</p><h2>Onde deixei ${escapeHtml(character.name)}?</h2></div></div><div class="leave-grid">${Object.entries({"Última aparição":character.lastSeen.chapter,"Localização":character.lastSeen.location,"Com quem estava":character.lastSeen.with,"Estado físico":character.lastSeen.physical,"Estado emocional":character.lastSeen.emotional,"Objectivo":character.lastSeen.objective,"Última decisão":character.lastSeen.decision,"Descoberta":character.lastSeen.discovered,"Risco actual":character.lastSeen.risk}).map(([key,value]) => `<div class="leave-item"><small>${key}</small><strong>${escapeHtml(value || "Informação ainda não registada")}</strong></div>`).join("")}</div></section>
      <div class="tabs">${[["overview","Visão geral"],["trajectory","Trajectória"],["relations","Relações"],["knowledge","Conhecimento"],["destiny","Destino"]].map(tab => `<button class="tab-button ${state.characterTab === tab[0] ? "active" : ""}" data-character-tab="${tab[0]}" data-character-slug="${character.slug}">${tab[1]}</button>`).join("")}</div>
      <section class="dark-panel tab-panel">${characterTabHtml(character, state.characterTab)}</section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Personagens",route:"characters"},{label:character.name}]);
  }

  function characterTabHtml(character, tab) {
    const relationships = D.relationships.filter(r => r.from === character.id || r.to === character.id);
    if (tab === "overview") return `<div class="info-columns"><div class="info-box"><h3>Personalidade</h3>${character.personality.length ? `<ul>${character.personality.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>` : `<p class="empty-inline">Informação ainda não registada.</p>`}</div><div class="info-box"><h3>Modo de falar</h3><p>${escapeHtml(character.voice || "Informação ainda não registada.")}</p></div><div class="info-box wide-info"><h3>Descrição</h3><p>${linkifyText(character.summary)}</p></div><div class="info-box"><h3>Fontes</h3><ul>${character.sources.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul></div></div>`;
    if (tab === "trajectory") {
      const chapters = character.appearanceChapters.map(getChapter).filter(Boolean);
      return chapters.length ? `<div class="timeline-list">${chapters.map(ch => {
        const companions = ch.characters.filter(id => id !== character.id).map(getCharacter).filter(Boolean).slice(0, 5);
        const chPlaces = ch.places.map(getPlace).filter(Boolean);
        const traj = window.GUERRAS_TRAJ && window.GUERRAS_TRAJ[character.name];
        const eventText = (traj && traj[ch.id]) || ch.summary;
        return `<article class="timeline-item" data-route="chapter/${ch.id}"><small>Capítulo ${ch.number}</small><h3>${escapeHtml(ch.title)}</h3><p>${escapeHtml(eventText)}</p><div class="tag-row">${chPlaces.map(p => `<span class="tag">${icon("pin")}${escapeHtml(p.name)}</span>`).join("")}${companions.map(c => `<span class="tag">${icon("person")}${escapeHtml(c.name)}</span>`).join("")}</div></article>`;
      }).join("")}</div>` : `<p class="empty-inline">Trajectória ainda não registada.</p>`;
    }
    if (tab === "relations") return relationships.length ? `<div class="relationship-detail-list">${relationships.map(r => { const other = getCharacter(r.from === character.id ? r.to : r.from); return `<article class="relationship-detail-card"><button class="relationship-person" data-route="character/${other?.slug || ""}">${other?.image ? `<img src="${other.image}" alt="">` : icon("person")}<span><strong>${escapeHtml(other?.name || "Entidade não encontrada")}</strong><small>${escapeHtml(r.type)}</small></span></button><p><strong>Estado:</strong> ${escapeHtml(r.state)}</p><p>${escapeHtml(r.from === character.id ? r.fromView : r.toView)}</p><div class="tag-row">${r.evolution.map(item => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</div></article>`; }).join("")}</div>` : `<p class="empty-inline">Nenhuma relação registada neste período.</p>`;
    if (tab === "knowledge") return `<div class="info-columns">${[["O que sabe",character.knowledge.knows],["O que suspeita",character.knowledge.suspects],["Crenças erradas",character.knowledge.falseBeliefs],["O que desconhece",character.knowledge.unknown],["Segredos",character.knowledge.secrets]].map(([key, values]) => `<div class="info-box"><h3>${key}</h3>${values.length ? `<ul>${values.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>` : `<p class="empty-inline">Nada registado.</p>`}</div>`).join("")}</div>`;
    return `<div class="info-columns"><div class="info-box"><h3>Destino escrito</h3><p>${escapeHtml(character.destiny.written)}</p></div><div class="info-box"><h3>Estado</h3><p>${escapeHtml(character.destiny.state)}</p></div><div class="info-box"><h3>Planeado</h3><p>${escapeHtml(character.destiny.planned)}</p></div></div>`;
  }

  function relationshipCategory(relationship) {
    const text = `${relationship.type} ${relationship.state}`.toLocaleLowerCase("pt-BR");
    if (/irmã|pai|filha|família|companheiro/.test(text)) return "family";
    if (/amor|influência|cumplicidade|legado/.test(text)) return "influence";
    if (/aliança|aliad|táctic/.test(text)) return "alliance";
    if (/vingança|rival|ódio|ruptura|inimig/.test(text)) return "conflict";
    return "other";
  }

  function renderRelationships() {
    const filtered = state.relationshipFilter === "all" ? D.relationships : D.relationships.filter(r => relationshipCategory(r) === state.relationshipFilter);
    const characterIds = [...new Set(filtered.flatMap(r => [r.from, r.to]))];
    const nodes = characterIds.map((id, index) => {
      const angle = (Math.PI * 2 * index / Math.max(characterIds.length, 1)) - Math.PI / 2;
      return { c: getCharacter(id), x: 50 + Math.cos(angle) * 35, y: 50 + Math.sin(angle) * 34 };
    }).filter(node => node.c);
    const findNode = id => nodes.find(node => node.c.id === id);
    refs.main.innerHTML = `<div class="page-enter">
      ${pageHeader("Pessoas", "Mapa de relações", "Filtros activos alteram tanto as ligações quanto a lista. Clique em qualquer pessoa para abrir a ficha.")}
      <div class="filter-toolbar relationship-filter-toolbar">${[["all","Todas"],["family","Família"],["influence","Influência"],["alliance","Aliança"],["conflict","Conflito e vingança"]].map(item => `<button class="filter-chip ${state.relationshipFilter === item[0] ? "active" : ""}" data-rel-filter="${item[0]}">${item[1]}</button>`).join("")}</div>
      <section class="relationship-canvas ${nodes.length < 3 ? "few-nodes" : ""}">
        <svg class="relationship-svg" viewBox="0 0 100 100" preserveAspectRatio="none">${filtered.map(r => { const a = findNode(r.from), b = findNode(r.to); if (!a || !b) return ""; const category = relationshipCategory(r); return `<line class="${category}" x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" data-relationship="${r.id}"/>`; }).join("")}</svg>
        ${nodes.map(node => `<button class="rel-node" style="left:${node.x}%;top:${node.y}%" data-route="character/${node.c.slug}">${node.c.image ? `<img src="${node.c.image}" alt="">` : ""}<strong>${escapeHtml(node.c.name)}</strong><small>${escapeHtml(node.c.alias)}</small></button>`).join("")}
      </section>
      <section class="dark-panel section-card relationship-results"><div class="section-heading"><div><h2>${filtered.length} relações</h2><p>Perspectivas e evolução registadas.</p></div></div><div class="relationship-detail-list">${filtered.map(r => { const a = getCharacter(r.from), b = getCharacter(r.to); return `<article class="relationship-detail-card"><div class="relationship-pair"><button data-route="character/${a?.slug || ""}">${a?.image ? `<img src="${a.image}" alt="">` : icon("person")}<span>${escapeHtml(a?.name || "—")}</span></button><span>${icon("network")}</span><button data-route="character/${b?.slug || ""}">${b?.image ? `<img src="${b.image}" alt="">` : icon("person")}<span>${escapeHtml(b?.name || "—")}</span></button></div><h3>${escapeHtml(r.type)}</h3><p><strong>${escapeHtml(r.state)}</strong></p><div class="relation-perspectives"><p>${escapeHtml(r.fromView)}</p><p>${escapeHtml(r.toView)}</p></div><div class="tag-row">${r.evolution.map(item => `<span class="tag">${escapeHtml(item)}</span>`).join("")}</div></article>`; }).join("")}</div></section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Relações"}]);
  }

  function renderFamilies() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Pessoas", "Famílias", "Núcleos familiares com membros clicáveis e impacto narrativo.")}<section class="entity-grid">${D.families.map(family => `<article class="entity-card family-card"><div class="entity-card-top"><span class="entity-avatar">${icon("family")}</span><div><h3>${escapeHtml(family.name)}</h3><span class="alias">${family.members.length} membros registados</span></div></div><p>${escapeHtml(family.summary)}</p><div class="portrait-member-row">${family.members.map(id => { const c = getCharacter(id); return c ? `<button data-route="character/${c.slug}" title="${escapeHtml(c.name)}">${c.image ? `<img src="${c.image}" alt="${escapeHtml(c.name)}">` : icon("person")}<span>${escapeHtml(c.shortName || c.name)}</span></button>` : ""; }).join("")}</div></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Famílias"}]);
  }

  function renderOrganisations() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Pessoas", "Organizações", "Conselhos, grupos e alianças com membros interligados.")}<section class="entity-grid">${D.organisations.map(org => `<article class="entity-card organisation-card"><div class="entity-card-top"><span class="entity-avatar">${icon("banner")}</span><div><h3>${escapeHtml(org.name)}</h3><span class="alias">${escapeHtml(org.type)}</span></div></div><p>${escapeHtml(org.summary)}</p><div class="portrait-member-row">${org.members.slice(0, 12).map(id => { const c = getCharacter(id); return c ? `<button data-route="character/${c.slug}" title="${escapeHtml(c.name)}">${c.image ? `<img src="${c.image}" alt="${escapeHtml(c.name)}">` : icon("person")}<span>${escapeHtml(c.shortName || c.name)}</span></button>` : ""; }).join("")}</div></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Organizações"}]);
  }

  function renderChapters() {
    refs.main.innerHTML = `<div class="page-enter">
      ${pageHeader("Guerras de Sangue", "Capítulos", `Os ${D.chapters.length} capítulos com narrativa escrita. Os capítulos ainda existentes apenas como resumo futuro ficam fora desta lista.`)}
      ${canonNotice()}
      <section class="chapter-grid">${D.chapters.map(ch => {
        const heroImage = ch.image || ch.characters.map(getCharacter).find(c => c?.image)?.image;
        return `<article class="chapter-card" data-route="chapter/${ch.id}">${heroImage ? `<img class="chapter-card-image" src="${escapeHtml(heroImage)}" alt="">` : `<div class="chapter-card-image fallback">${icon("chapter")}</div>`}<div class="chapter-card-copy"><span class="chapter-number">Capítulo ${ch.number}</span><h2>${escapeHtml(ch.title)}</h2><p>${escapeHtml(ch.summary)}</p><div class="tag-row"><span class="tag">${ch.wordCount.toLocaleString("pt-BR")} palavras</span><span class="tag">${ch.characters.length} personagens ligados</span></div></div></article>`;
      }).join("")}</section>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Capítulos"}]);
  }

  function renderChapter(id) {
    const chapter = getChapter(id);
    if (!chapter) return renderNotFound();
    const previous = getChapter(chapter.number - 1);
    const next = getChapter(chapter.number + 1);
    const characters = chapter.characters.map(getCharacter).filter(Boolean);
    const places = chapter.places.map(getPlace).filter(Boolean);
    const events = D.events.filter(event => event.period === `Capítulo ${chapter.number}` || event.chapterId === chapter.id);
    const heroImage = chapter.image || characters.find(c => c.image)?.image;
    refs.main.innerHTML = `<div class="page-enter chapter-detail-page">
      ${pageHeader(`Guerras de Sangue · Capítulo ${chapter.number}`, chapter.title, chapter.status, `<button class="secondary-button" data-copy-chapter="${chapter.id}">${icon("copy")} Copiar acontecimentos</button>`)}
      <section class="chapter-hero-panel ${heroImage ? "has-art" : ""}">${heroImage ? `<img src="${escapeHtml(heroImage)}" alt="Ilustração associada ao capítulo">` : ""}<div><p class="eyebrow">Resumo rápido</p><h2>${escapeHtml(chapter.summary)}</h2><div class="tag-row"><span class="tag">${chapter.wordCount.toLocaleString("pt-BR")} palavras no manuscrito</span><span class="tag">${chapter.status}</span></div></div></section>
      <section class="chapter-layout">
        <article class="parchment-panel chapter-longform"><div class="section-heading"><div><p class="eyebrow">Acontecimentos do capítulo</p><h2>Tudo o que acontece</h2><p>Clique nos nomes destacados para abrir personagens, lugares, clãs, animais, plantas, alimentos ou conceitos.</p></div></div><div class="chapter-prose">${chapter.details.map(paragraph => `<p>${linkifyText(paragraph)}</p>`).join("")}</div></article>
        <aside class="chapter-context-column">
          <article class="dark-panel section-card"><h3>Personagens</h3><div class="context-chip-list">${characters.length ? characters.map(c => `<button class="context-chip" data-route="character/${c.slug}">${c.image ? `<img src="${c.image}" alt="">` : icon("person")}<span>${escapeHtml(c.name)}</span></button>`).join("") : `<p class="empty-inline">Nenhum personagem ligado.</p>`}</div></article>
          <article class="dark-panel section-card"><h3>Lugares</h3><div class="mini-list">${places.length ? places.map(p => miniEntity(p.name, p.type, "pin", `place/${p.slug}`, p.state)).join("") : `<p class="empty-inline">Nenhum lugar ligado.</p>`}</div></article>
          ${events.length ? `<article class="dark-panel section-card"><h3>Acontecimentos</h3><div class="mini-list">${events.map(e => miniEntity(e.name, e.category, "timeline", `event/${e.slug}`, e.period)).join("")}</div></article>` : ""}
        </aside>
      </section>
      <nav class="chapter-pagination">${previous ? `<button class="secondary-button" data-route="chapter/${previous.id}">← Capítulo ${previous.number}<small>${escapeHtml(previous.title)}</small></button>` : `<span></span>`}${next ? `<button class="primary-button" data-route="chapter/${next.id}">Capítulo ${next.number} →<small>${escapeHtml(next.title)}</small></button>` : `<button class="secondary-button" disabled>Último capítulo escrito</button>`}</nav>
    </div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Capítulos",route:"chapters"},{label:`Capítulo ${chapter.number}`}]);
  }

  function renderEvents() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("História", "Acontecimentos", "Eventos e antecedentes ligados por causa, participantes e consequências.")}<section class="entity-grid">${D.events.map(event => `<article class="entity-card" data-route="event/${event.slug}"><div class="entity-card-top"><span class="entity-avatar">${icon("timeline")}</span><div><h3>${escapeHtml(event.name)}</h3><span class="alias">${escapeHtml(event.period)}</span></div></div><p>${escapeHtml(event.cause)}</p><div class="tag-row"><span class="tag">${escapeHtml(event.category)}</span><span class="tag">${event.participants.length} participantes</span></div></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Acontecimentos"}]);
  }

  function renderEvent(slug) {
    const event = getEvent(slug);
    if (!event) return renderNotFound();
    const place = getPlace(event.placeId);
    const participants = event.participants.map(getCharacter).filter(Boolean);
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Acontecimento", event.name, `${event.category} · ${event.period}`)}<section class="event-flow"><article class="flow-box"><small>Causa</small><p>${linkifyText(event.cause)}</p></article><span>${icon("arrow")}</span><article class="flow-box central"><small>Acontecimento</small><h2>${escapeHtml(event.name)}</h2>${place ? `<button class="inline-place-button" data-route="place/${place.slug}">${icon("pin")} ${escapeHtml(place.name)}</button>` : ""}</article><span>${icon("arrow")}</span><article class="flow-box"><small>Consequências</small><ul>${event.consequences.map(item => `<li>${linkifyText(item)}</li>`).join("")}</ul></article></section><section class="dark-panel section-card"><div class="section-heading"><div><h2>Participantes</h2><p>Pessoas directamente ligadas.</p></div></div><div class="context-chip-list">${participants.map(c => `<button class="context-chip" data-route="character/${c.slug}">${c.image ? `<img src="${c.image}" alt="">` : icon("person")}<span>${escapeHtml(c.name)}</span></button>`).join("")}</div></section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Acontecimentos",route:"events"},{label:event.name}]);
  }

  function renderTimeline() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("História", "Linha do tempo", "Ordem narrativa dos capítulos escritos e dos acontecimentos registados.")}<section class="timeline-list">${D.chapters.map(ch => `<article class="timeline-item" data-route="chapter/${ch.id}"><small>Capítulo ${ch.number}</small><h3>${escapeHtml(ch.title)}</h3><p>${escapeHtml(ch.summary)}</p><div class="tag-row">${D.events.filter(e => e.period.includes(`Capítulo ${ch.number}`)).map(e => `<span class="tag">${escapeHtml(e.name)}</span>`).join("")}</div></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Linha do tempo"}]);
  }

  function renderConsequences() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("História", "Causa e consequência", "Cada acontecimento mostra de onde veio e o que alterou.")}<section class="consequence-list">${D.events.map(event => `<article class="consequence-row"><button data-route="event/${event.slug}"><small>Causa</small><p>${escapeHtml(event.cause)}</p></button><span>${icon("arrow")}</span><button class="consequence-event" data-route="event/${event.slug}"><strong>${escapeHtml(event.name)}</strong><small>${escapeHtml(event.period)}</small></button><span>${icon("arrow")}</span><button data-route="event/${event.slug}"><small>Consequência principal</small><p>${escapeHtml(event.consequences[0] || "Não registada")}</p></button></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Causa e consequência"}]);
  }

  function renderMysteries() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Planeamento narrativo", "Mistérios", "Pistas, respostas, conhecimento do leitor e personagens ligadas.")}<section class="entity-grid">${D.mysteries.map(m => `<article class="entity-card mystery-card" data-route="mystery/${m.slug}"><div class="entity-card-top"><span class="entity-avatar">${icon("question")}</span><div><h3>${escapeHtml(m.name)}</h3><span class="alias">${escapeHtml(m.status)}</span></div></div><p>${escapeHtml(m.question)}</p><div class="tag-row"><span class="tag">${m.clues.length} pistas</span><span class="tag">${m.linkedCharacters.length} personagens</span></div></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Mistérios"}]);
  }

  function renderMystery(slug) {
    const mystery = getMystery(slug);
    if (!mystery) return renderNotFound();
    const linked = mystery.linkedCharacters.map(getCharacter).filter(Boolean);
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Mistério", mystery.name, mystery.status)}<section class="mystery-layout"><article class="parchment-panel"><p class="eyebrow">Pergunta central</p><h2>${escapeHtml(mystery.question)}</h2><div class="mystery-answer"><small>Resposta no ponto escrito</small><p>${linkifyText(mystery.answer)}</p></div><h3>Pistas apresentadas</h3><ol class="clue-list">${mystery.clues.map(clue => `<li>${linkifyText(clue)}</li>`).join("")}</ol></article><aside class="dark-panel section-card"><h3>O que o leitor sabe</h3><p>${linkifyText(mystery.readerKnows)}</p><h3>Personagens ligadas</h3><div class="context-chip-list">${linked.map(c => `<button class="context-chip" data-route="character/${c.slug}">${c.image ? `<img src="${c.image}" alt="">` : icon("person")}<span>${escapeHtml(c.name)}</span></button>`).join("")}</div></aside></section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Mistérios",route:"mysteries"},{label:mystery.name}]);
  }

  function renderClans() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Mundo", "Clãs", "Os oito clãs com cultura, território, virtude, corrupção e brasão quando existente.")}<section class="clan-grid">${D.clans.map(clan => `<article class="clan-card" style="--clan-color:${clan.colour}" data-route="clan/${clan.slug}"><div class="clan-emblem-wrap">${clan.emblem ? `<img class="clan-emblem" src="${clan.emblem}" alt="Brasão do clã ${escapeHtml(clan.name)}">` : `<div class="no-emblem-mark">${icon("eye")}<small>Sem brasão</small></div>`}</div><div><p class="eyebrow">Clã de ${escapeHtml(clan.essence)}</p><h2>${escapeHtml(clan.name)}</h2><p>${escapeHtml(clan.summary)}</p><div class="tag-row"><span class="tag">Virtude: ${escapeHtml(clan.virtue)}</span><span class="tag">Corrupção: ${escapeHtml(clan.corruption)}</span></div></div></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Clãs"}]);
  }

  function renderClan(slug) {
    const clan = getClan(slug);
    if (!clan) return renderNotFound();
    const place = getPlace(clan.placeId);
    const characters = D.characters.filter(c => c.clanId === clan.id);
    const loreItems = ["fauna","flora","foods","concepts"].flatMap(kind => D.lore[kind].filter(item => item.clans.includes(clan.name)).map(item => ({...item, kind})));
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Clã", clan.name, `Essência: ${clan.essence}`, `<button class="secondary-button" data-route="relationships">${icon("network")} Relações políticas</button>${place ? `<button class="primary-button" data-route="place/${place.slug}">${icon("pin")} Território</button>` : ""}`)}<section class="clan-detail-hero" style="--clan-color:${clan.colour}"><div class="clan-detail-emblem">${clan.emblem ? `<img src="${clan.emblem}" alt="Brasão do clã ${escapeHtml(clan.name)}">` : `<div class="no-emblem-large">${icon("eye")}<strong>Fendelar</strong><span>Único clã sem brasão</span></div>`}</div><div><p>${escapeHtml(clan.summary)}</p><div class="clan-principles"><div><small>Grande virtude</small><strong>${escapeHtml(clan.virtue)}</strong></div><div><small>Grande corrupção</small><strong>${escapeHtml(clan.corruption)}</strong></div></div></div></section><section class="clan-content-layout"><article class="dark-panel section-card"><div class="tabs clan-section-tabs">${clan.sections.slice(0, 10).map((section, index) => `<button class="tab-button ${index === 0 ? "active" : ""}" data-clan-section="${index}" data-clan-slug="${clan.slug}">${escapeHtml(section.title)}</button>`).join("")}</div><div id="clanSectionPanel">${clanSectionHtml(clan, 0)}</div></article><aside><article class="dark-panel section-card"><h3>Personagens do clã</h3><div class="context-chip-list">${characters.map(c => `<button class="context-chip" data-route="character/${c.slug}">${c.image ? `<img src="${c.image}" alt="">` : icon("person")}<span>${escapeHtml(c.name)}</span></button>`).join("")}</div></article><article class="dark-panel section-card"><h3>Lore relacionada</h3><div class="mini-list">${loreItems.slice(0, 12).map(item => miniEntity(item.name, item.type, item.icon, `lore-item/${item.kind}/${item.slug}`, `${item.citations} citações`)).join("") || `<p class="empty-inline">Nada registado.</p>`}</div></article></aside></section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Clãs",route:"clans"},{label:clan.name}]);
  }

  function clanSectionHtml(clan, index) {
    const section = clan.sections[Number(index)] || clan.sections[0];
    if (!section) return `<p class="empty-inline">Informação ainda não registada.</p>`;
    return `<div class="clan-section-content"><p class="eyebrow">${escapeHtml(section.number)}</p><h2>${escapeHtml(section.title)}</h2>${section.paragraphs.map(paragraph => `<p>${linkifyText(paragraph)}</p>`).join("")}</div>`;
  }

  function renderPlaces() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Mundo", "Lugares", "Cidades, aldeias, regiões e espaços narrativos no período de Guerras de Sangue.")}<section class="entity-grid place-grid">${D.places.map(place => { const clan = getClan(place.clanId); return `<article class="entity-card place-card" data-route="place/${place.slug}"><div class="entity-card-top"><span class="entity-avatar ${place.image ? "has-image" : ""}">${place.image ? `<img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.name)}">` : icon("pin")}</span><div><h3>${escapeHtml(place.name)}</h3><span class="alias">${escapeHtml(place.type)}</span></div></div><p>${escapeHtml(place.summary)}</p><div class="place-card-facts"><div><small>Estado</small><strong>${escapeHtml(place.state)}</strong></div><div><small>Clã associado</small><strong>${escapeHtml(clan?.name || "Nenhum")}</strong></div></div></article>`; }).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Lugares"}]);
  }

  function renderPlace(slug) {
    const place = getPlace(slug);
    if (!place) return renderNotFound();
    const clan = getClan(place.clanId);
    const present = D.characters.filter(c => c.locationId === place.id);
    const chapters = D.chapters.filter(ch => ch.places.includes(place.id));
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Lugar", place.name, place.type, place.x != null ? `<button class="primary-button" data-route="map">${icon("map")} Ver no mapa</button>` : "")}<section class="place-detail-hero"><div class="place-illustration ${place.image ? "has-photo" : ""}">${place.image ? `<img src="${escapeHtml(place.image)}" alt="${escapeHtml(place.name)}">` : clan?.emblem ? `<img src="${clan.emblem}" alt="Brasão ${escapeHtml(clan.name)}">` : icon("fortress")}</div><article class="parchment-panel place-summary-panel"><p>${escapeHtml(place.summary)}</p><div class="place-detail-facts"><div><small>Estado</small><strong>${escapeHtml(place.state)}</strong></div><div><small>Clã associado</small><strong>${escapeHtml(clan?.name || "Nenhum")}</strong></div><div><small>Livro</small><strong>Guerras de Sangue</strong></div><div><small>Mapa</small><strong>${place.x != null ? "Localização marcada" : "Sem coordenada visual"}</strong></div></div></article></section><section class="dashboard-columns"><article class="dark-panel section-card"><h2>Personagens no último estado</h2><div class="context-chip-list">${present.length ? present.map(c => `<button class="context-chip" data-route="character/${c.slug}">${c.image ? `<img src="${c.image}" alt="">` : icon("person")}<span>${escapeHtml(c.name)}</span></button>`).join("") : `<p class="empty-inline">Nenhuma personagem marcada neste lugar no estado actual.</p>`}</div></article><article class="dark-panel section-card"><h2>Capítulos ligados</h2><div class="mini-list">${chapters.length ? chapters.map(ch => miniEntity(`Capítulo ${ch.number} — ${ch.title}`, ch.summary, "chapter", `chapter/${ch.id}`)).join("") : `<p class="empty-inline">Nenhum capítulo ligado.</p>`}</div></article></section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Lugares",route:"places"},{label:place.name}]);
  }

  function renderRoutes() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Mundo", "Rotas", "Caminhos fluviais, gargantas e marchas que controlam tempo, alimento e guerra.")}<section class="route-list">${D.routes.map(route => `<article class="route-card"><span>${icon("route")}</span><div><h2>${escapeHtml(route.name)}</h2><p>${linkifyText(route.summary)}</p></div></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Rotas"}]);
  }

  function renderMap() {
    const places = D.places.filter(place => place.x != null && place.y != null);
    refs.main.innerHTML = `<div class="page-enter map-page">${pageHeader("Mapa temporal · Livro 2", "Jesed em Guerras de Sangue", "Marcadores ajustados sobre a posição visual das cidades e regiões. Arraste para mover e use a roda do rato para aproximar.")}<section class="map-shell"><div class="map-toolbar"><button class="icon-button" data-map-action="zoom-in" title="Aproximar">${icon("zoomin")}</button><button class="icon-button" data-map-action="zoom-out" title="Afastar">${icon("zoomout")}</button><button class="icon-button" data-map-action="center" title="Centralizar">${icon("center")}</button><button class="icon-button" data-map-action="fullscreen" title="Tela inteira">${icon("fullscreen")}</button><span class="map-helper">Arraste o mapa · clique num marcador</span></div><div id="mapViewport" class="map-viewport"><div id="mapStage" class="map-stage"><img src="assets/mapa-guerras-de-sangue.webp" alt="Mapa de Jesed na época de Guerras de Sangue" draggable="false">${places.map(place => `<button class="map-pin" style="left:${place.x}%;top:${place.y}%" data-map-place="${place.slug}" aria-label="Abrir ${escapeHtml(place.name)}"><span class="pin-icon" aria-hidden="true"></span><span class="map-pin-label">${escapeHtml(place.name)}</span></button>`).join("")}</div><div id="mapPopupHost"></div></div><div class="book-slider"><button class="book-step" disabled><small>Livro 1</small><strong>Ruínas dos Céus</strong></button><button class="book-step active" data-route="map"><small>Livro 2</small><strong>Guerras de Sangue</strong></button><button class="book-step" disabled><small>Livro 3</small><strong>Dinastia Polar</strong></button><button class="book-step" disabled><small>Livro 4</small><strong>Herdeiros das Cinzas</strong></button><button class="book-step" disabled><small>Livro 5</small><strong>Coração de Poeira</strong></button></div></section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Mapa"}]);
    applyMapTransform();
  }

  function showMapPopup(slug, pin) {
    const place = getPlace(slug);
    if (!place) return;
    const clan = getClan(place.clanId);
    const host = $("#mapPopupHost");
    const viewport = $("#mapViewport");
    if (!host || !viewport) return;
    const pinRect = pin.getBoundingClientRect();
    const viewRect = viewport.getBoundingClientRect();
    const left = Math.min(Math.max(pinRect.left - viewRect.left + 28, 14), Math.max(14, viewRect.width - 344));
    const rawTop = pinRect.top - viewRect.top - 44;
    const top = Math.min(Math.max(rawTop, 84), Math.max(84, viewRect.height - 286));
    host.innerHTML = `<article class="map-popup" style="left:${left}px;top:${top}px"><button class="map-popup-close" data-map-close aria-label="Fechar">×</button><p class="eyebrow">${escapeHtml(place.type)}</p><h2>${escapeHtml(place.name)}</h2><p>${escapeHtml(place.summary)}</p><div class="map-popup-facts"><div><small>Estado</small><strong>${escapeHtml(place.state)}</strong></div><div><small>Clã</small><strong>${escapeHtml(clan?.name || "Nenhum")}</strong></div></div><button class="primary-button" data-route="place/${place.slug}">Ir para a página ${icon("arrow")}</button></article>`;
  }

  function applyMapTransform() {
    const stage = $("#mapStage");
    if (stage) stage.style.transform = `translate(${state.map.x}px, ${state.map.y}px) scale(${state.map.zoom})`;
  }

  function loreKindInfo(kind) {
    return {
      fauna: ["Fauna", "Animais de Jesed, seus usos, perigos e aparições.", "paw"],
      flora: ["Flora", "Plantas, raízes, árvores, fungos e fibras da época.", "leaf"],
      foods: ["Alimentos", "Preparações, ingredientes, clãs usuários e citações.", "bowl"],
      concepts: ["Conceitos e leis", "Símbolos, costumes e princípios de Jesed.", "scroll"]
    }[kind] || ["Lore", "Conteúdo do mundo.", "scroll"];
  }

  function renderLore(kind) {
    const actualKind = kind === "lore" ? "concepts" : kind;
    const [title, subtitle, iconName] = loreKindInfo(actualKind);
    const items = D.lore[actualKind] || [];
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Lore", title, subtitle)}<div class="filter-toolbar"><span class="filter-label">${icon("filter")} Filtrar por clã:</span><button class="filter-chip active" data-lore-filter="all" data-lore-kind="${actualKind}">Todos</button>${D.clans.map(clan => `<button class="filter-chip" data-lore-filter="${clan.name}" data-lore-kind="${actualKind}">${escapeHtml(clan.name)}</button>`).join("")}</div><div id="loreList">${loreListHtml(actualKind, items, iconName)}</div></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:title}]);
  }

  function loreListHtml(kind, items, iconName = loreKindInfo(kind)[2]) {
    return `<section class="lore-grid">${items.map(item => `<article class="lore-card ${item.image ? "has-image" : ""}" data-route="lore-item/${kind}/${item.slug}">${item.image ? `<img class="lore-card-image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" loading="lazy">` : `<span class="lore-icon">${icon(item.icon || iconName)}</span>`}<span class="citation-count">${item.citations} citações</span><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.summary)}</p><div class="tag-row">${item.clans.slice(0, 4).map(clan => `<span class="tag">${escapeHtml(clan)}</span>`).join("")}</div></article>`).join("")}</section>`;
  }

  function renderLoreItem(kind, slug) {
    const item = getLoreItem(kind, slug);
    if (!item) return renderNotFound();
    const [title,,iconName] = loreKindInfo(kind);
    refs.main.innerHTML = `<div class="page-enter">${pageHeader(title, item.name, item.type)}<section class="lore-detail-layout"><article class="parchment-panel lore-detail">${item.image ? `<img class="lore-detail-image" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}">` : `<div class="lore-detail-symbol">${icon(item.icon || iconName)}</div>`}<p class="lore-lead">${linkifyText(item.summary)}</p>${item.details.map(paragraph => `<p>${linkifyText(paragraph)}</p>`).join("")}</article><aside class="dark-panel section-card"><div class="citation-big"><strong>${item.citations}</strong><span>vezes citado no texto escrito</span></div><h3>Clãs que usam ou conhecem</h3><div class="tag-row">${item.clans.length ? item.clans.map(name => { const clan = getClan(slugText(name).replaceAll(" ","-")); return `<button class="tag clickable-tag" ${clan ? `data-route="clan/${clan.slug}"` : ""}>${escapeHtml(name)}</button>`; }).join("") : `<span class="empty-inline">Nenhum clã registado.</span>`}</div><h3>Menções por capítulo</h3><div class="mini-list">${item.chapterMentions.length ? item.chapterMentions.map(m => { const ch = getChapter(m.chapter); return miniEntity(`Capítulo ${m.chapter} — ${ch?.title || ""}`, `${m.count} ${m.count === 1 ? "menção" : "menções"}`, "chapter", `chapter/${ch?.id || m.chapter}`); }).join("") : `<p class="empty-inline">Ainda não citado directamente no manuscrito.</p>`}</div></aside></section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:title,route:kind === "concepts" ? "lore" : kind},{label:item.name}]);
  }

  function renderGallery() {
    const items = [
      ...D.books.filter(b => b.cover).map(b => ({name:b.name,type:"Capa",image:b.cover,route:b.status === "active" ? `book/${b.id}` : "books",icon:b.icon})),
      ...D.characters.filter(c => c.image).map(c => ({name:c.name,type:"Personagem",image:c.image,route:`character/${c.slug}`,icon:"person"})),
      ...D.clans.map(c => ({name:`Clã ${c.name}`,type:c.emblem ? "Brasão" : "Sem brasão",image:c.emblem,route:`clan/${c.slug}`,icon:c.icon}))
    ];
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Visual", "Galeria", "Capas, retratos e brasões já integrados ao arquivo. Os Fendelar permanecem sem brasão.")}<section class="gallery-grid enhanced-gallery">${items.map(item => `<article class="gallery-item" data-route="${item.route}"><div class="gallery-placeholder ${item.image ? "has-image" : ""}">${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy">` : icon(item.icon)}</div><div class="gallery-copy"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.type)}</small></div></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Galeria"}]);
  }

  function renderScenePack() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Planeamento", "Pacote de cena", "Reúne contexto canónico para copiar e usar externamente. Não escreve o capítulo.")}<section class="scene-builder"><article class="dark-panel form-panel"><div class="form-grid"><div class="form-field"><label>Livro</label><select disabled><option>Guerras de Sangue</option></select></div><div class="form-field"><label>Lugar</label><select id="scenePlace">${D.places.map(p => `<option value="${p.id}">${escapeHtml(p.name)}</option>`).join("")}</select></div><div class="form-field"><label>Personagem 1</label><select id="sceneChar1">${D.characters.map(c => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join("")}</select></div><div class="form-field"><label>Personagem 2</label><select id="sceneChar2">${D.characters.map((c,index) => `<option value="${c.id}" ${index === 1 ? "selected" : ""}>${escapeHtml(c.name)}</option>`).join("")}</select></div><button class="primary-button" data-action="build-scene">${icon("quill")} Montar contexto</button></div></article><article class="parchment-panel scene-output"><div class="section-heading"><div><p class="eyebrow">Documento copiável</p><h2>Contexto da cena</h2></div><button class="secondary-button" data-action="copy-scene">${icon("copy")} Copiar</button></div><pre id="sceneOutput">${escapeHtml(buildSceneText(D.characters[0], D.characters[1], D.places[0]))}</pre></article></section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Pacote de cena"}]);
  }

  function buildSceneText(c1, c2, place) {
    const block = c => `PERSONAGEM: ${c.name}\nEstado: ${c.status}\nLocalização actual: ${getPlace(c.locationId)?.name || "não registada"}\nEstado emocional: ${c.lastSeen.emotional}\nObjectivo: ${c.lastSeen.objective}\nÚltima decisão: ${c.lastSeen.decision}\nO que sabe: ${c.knowledge.knows.join("; ") || "não registado"}\nO que desconhece: ${c.knowledge.unknown.join("; ") || "não registado"}\nModo de falar: ${c.voice || "não registado"}`;
    return `CONTEXTO DA CENA\nLivro: Guerras de Sangue\nLugar: ${place.name}\nDescrição do lugar: ${place.summary}\n\n${block(c1)}\n\n${block(c2)}\n\nREGRAS\n- Não inventar informações ausentes.\n- Não usar resumos de capítulos ainda não escritos.\n- Respeitar a lente de Guerras de Sangue.`;
  }

  function renderContinuity() {
    const groups = { error: D.continuity.filter(x => x.severity === "error"), warning: D.continuity.filter(x => x.severity === "warning"), suggestion: D.continuity.filter(x => x.severity === "suggestion") };
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Planeamento", "Continuidade", "Erros estruturais, avisos narrativos e sugestões incompletas permanecem separados.")}<section class="continuity-grid">${[["error","Erros","warning"],["warning","Avisos","warning"],["suggestion","Sugestões","leaf"]].map(([key,title,iconName]) => `<article class="dark-panel continuity-column severity-${key}"><h2>${icon(iconName)} ${title}</h2>${groups[key].length ? groups[key].map(item => `<div class="continuity-card"><strong>${escapeHtml(item.title)}</strong><p>${escapeHtml(item.description)}</p><span class="tag">${escapeHtml(item.state)}</span></div>`).join("") : `<p class="empty-inline">Nenhum item.</p>`}</article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Continuidade"}]);
  }

  function renderCanon() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Planeamento", "Regras canónicas", "Manual de limites para futuras actualizações por IA.", `<button class="primary-button" data-action="copy-canon">${icon("copy")} Copiar regras</button>`)}<section class="lore-grid">${D.canonRules.map(rule => `<article class="lore-card"><span class="lore-icon">${icon("law")}</span><span class="citation-count">${escapeHtml(rule.category)}</span><h3>${escapeHtml(rule.category)}</h3><p>${escapeHtml(rule.text)}</p></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Regras canónicas"}]);
  }

  function renderDecisions() {
    refs.main.innerHTML = `<div class="page-enter">${pageHeader("Planeamento", "Decisões do autor", "Decisões activas que precisam ser preservadas em todas as actualizações.")}<section class="timeline-list">${D.decisions.map(decision => `<article class="timeline-item"><small>${escapeHtml(decision.status)}</small><h3>${escapeHtml(decision.title)}</h3><p>${escapeHtml(decision.value)}</p></article>`).join("")}</section></div>`;
    setBreadcrumbs([{label:"Dimensões Infinitas",route:"portal"},{label:"Ciclo de Jesed",route:"dashboard"},{label:"Decisões do autor"}]);
  }

  function renderNotFound() {
    refs.main.innerHTML = `<div class="empty-state page-enter"><div><span class="empty-state-icon">${icon("question")}</span><h2>Entidade não encontrada</h2><p>A referência pode ter sido removida ou ainda não foi introduzida.</p><button class="primary-button" data-route="dashboard">Voltar ao início</button></div></div>`;
  }

  function activeNavForRoute(base, parts) {
    const map = { book:"books", character:"characters", chapter:"chapters", event:"events", mystery:"mysteries", clan:"clans", place:"places", "lore-item": parts[0] === "concepts" ? "lore" : parts[0] };
    return map[base] || base;
  }

  function routeTo(route, { replace = false } = {}) {
    if (!route) return;
    if (route === "portal") {
      state.route = "portal";
      refs.shell.classList.add("is-hidden");
      refs.portal.classList.remove("is-hidden");
      if (!replace) location.hash = "#/portal";
      renderPortal();
      return;
    }
    if (state.settings.transitions && state.settings.motion && state.settings.preset !== "performance") {
      refs.transitionVeil.classList.remove("active");
      void refs.transitionVeil.offsetWidth;
      refs.transitionVeil.classList.add("active");
    }
    refs.portal.classList.add("is-hidden");
    refs.shell.classList.remove("is-hidden");
    state.route = route;
    if (!replace) location.hash = `#/${route}`;
    const [base, ...parts] = route.split("/");
    const renderers = {
      dashboard: renderDashboard, books: renderBooks, characters: renderCharacters, relationships: renderRelationships,
      families: renderFamilies, organisations: renderOrganisations, chapters: renderChapters, events: renderEvents,
      timeline: renderTimeline, consequences: renderConsequences, mysteries: renderMysteries, clans: renderClans,
      places: renderPlaces, routes: renderRoutes, map: renderMap, fauna: () => renderLore("fauna"),
      flora: () => renderLore("flora"), foods: () => renderLore("foods"), lore: () => renderLore("concepts"),
      gallery: renderGallery, "scene-pack": renderScenePack, continuity: renderContinuity, canon: renderCanon,
      decisions: renderDecisions
    };
    if (base === "book") renderBook(parts[0]);
    else if (base === "character") renderCharacter(parts[0]);
    else if (base === "chapter") renderChapter(parts[0]);
    else if (base === "event") renderEvent(parts[0]);
    else if (base === "mystery") renderMystery(parts[0]);
    else if (base === "clan") renderClan(parts[0]);
    else if (base === "place") renderPlace(parts[0]);
    else if (base === "lore-item") renderLoreItem(parts[0], parts[1]);
    else if (renderers[base]) renderers[base]();
    else renderNotFound();

    const activeRoute = activeNavForRoute(base, parts);
    $$(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.route === activeRoute));
    refs.sidebar.classList.remove("mobile-open");
    refs.main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: state.settings.motion ? "smooth" : "auto" });
  }

  function searchableEntities() {
    const lore = ["fauna","flora","foods","concepts"].flatMap(kind => D.lore[kind].map(item => ({ type:loreKindInfo(kind)[0], name:item.name, subtitle:item.type, description:[item.summary,...item.details].join(" "), route:`lore-item/${kind}/${item.slug}`, icon:item.icon })));
    return [
      ...D.characters.map(item => ({type:"Personagens",name:item.name,subtitle:item.alias,description:[item.summary,...item.personality].join(" "),route:`character/${item.slug}`,icon:"person",image:item.image})),
      ...D.clans.map(item => ({type:"Clãs",name:item.name,subtitle:item.essence,description:item.summary,route:`clan/${item.slug}`,icon:item.icon,image:item.emblem})),
      ...D.places.map(item => ({type:"Lugares",name:item.name,subtitle:item.type,description:item.summary,route:`place/${item.slug}`,icon:"pin"})),
      ...D.chapters.map(item => ({type:"Capítulos",name:`Capítulo ${item.number} — ${item.title}`,subtitle:item.status,description:[item.summary,...item.details].join(" "),route:`chapter/${item.id}`,icon:"chapter"})),
      ...D.events.map(item => ({type:"Acontecimentos",name:item.name,subtitle:item.category,description:[item.cause,...item.consequences].join(" "),route:`event/${item.slug}`,icon:"timeline"})),
      ...D.mysteries.map(item => ({type:"Mistérios",name:item.name,subtitle:item.status,description:[item.question,item.answer,...item.clues].join(" "),route:`mystery/${item.slug}`,icon:"question"})),
      ...lore
    ];
  }

  function openSearch() {
    refs.searchModal.classList.add("open");
    refs.searchModal.setAttribute("aria-hidden", "false");
    refs.searchInput.value = "";
    renderSearchResults("");
    setTimeout(() => refs.searchInput.focus(), 20);
  }
  function closeSearch() { refs.searchModal.classList.remove("open"); refs.searchModal.setAttribute("aria-hidden", "true"); }
  function renderSearchResults(query) {
    const q = slugText(query.trim());
    let results = searchableEntities();
    if (q) results = results.filter(item => slugText(`${item.name} ${item.subtitle} ${state.searchMode === "deep" ? item.description : ""}`).includes(q));
    results = results.slice(0, 80);
    if (!results.length) { refs.searchResults.innerHTML = `<div class="empty-search">Nenhum resultado encontrado.</div>`; return; }
    const grouped = Object.groupBy ? Object.groupBy(results, item => item.type) : results.reduce((acc,item) => ((acc[item.type] ||= []).push(item),acc),{});
    refs.searchResults.innerHTML = Object.entries(grouped).map(([type, items]) => `<section class="search-result-group"><h3>${escapeHtml(type)}</h3>${items.map(item => `<button class="search-result-item" data-route="${item.route}"><span class="search-result-icon ${item.image ? "has-image" : ""}">${item.image ? `<img src="${item.image}" alt="">` : icon(item.icon)}</span><span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.subtitle || "")}</small></span></button>`).join("")}</section>`).join("");
  }

  function openSettings() { renderSettings(); refs.settingsDrawer.classList.add("open"); refs.settingsDrawer.setAttribute("aria-hidden", "false"); }
  function closeSettings() { refs.settingsDrawer.classList.remove("open"); refs.settingsDrawer.setAttribute("aria-hidden", "true"); }
  function settingToggle(key, title, description, enabled) { return `<div class="setting-row"><span class="setting-copy"><strong>${title}</strong><small>${description}</small></span><button class="switch ${enabled ? "on" : ""}" data-setting="${key}" aria-pressed="${enabled}"></button></div>`; }
  function renderSettings() {
    const s = state.settings;
    refs.settingsContent.innerHTML = `<div class="settings-group"><h3>Perfis rápidos</h3><div class="preset-row">${[["full","Completo"],["normal","Equilibrado"],["performance","Desempenho"],["custom","Personalizado"]].map(item => `<button class="preset-button ${s.preset === item[0] ? "active" : ""} ${item[0] === "custom" ? "preset-custom" : ""}" data-preset="${item[0]}" ${item[0] === "custom" ? "disabled" : ""}>${item[1]}</button>`).join("")}</div></div><div class="settings-group"><h3>Controlo individual</h3>${settingToggle("particles","Partículas","Poeira e elementos suspensos.",s.particles)}${settingToggle("transitions","Transições temáticas","Véu de pergaminho entre páginas.",s.transitions)}${settingToggle("textures","Texturas","Grão, papel e marcas sobre superfícies.",s.textures)}${settingToggle("blur","Desfoque de painéis","Efeito de vidro nas barras e janelas.",s.blur)}${settingToggle("shadows","Sombras profundas","Profundidade dos cartões.",s.shadows)}${settingToggle("motion","Movimento e animações","Entradas, deslocamentos e efeitos.",s.motion)}<div class="setting-row range-row"><span class="setting-copy"><strong>Quantidade de partículas</strong><small>Ajuste fino do fundo.</small></span><input type="range" min="4" max="50" value="${s.particleAmount}" data-setting-range="particleAmount"></div></div>`;
  }

  function openSelector(type) {
    const books = type === "books";
    const list = books ? D.books : D.sagas;
    const externalBookLinks = { "ruinas-dos-ceus": "ruinas.html" };
    refs.selectorContent.innerHTML = `<div class="section-heading"><div><p class="eyebrow">${books ? "Livro" : "Dimensão"}</p><h2>${books ? "Escolher livro" : "Escolher saga"}</h2></div><button class="icon-button" data-action="close-selector">${icon("close")}</button></div><div class="selector-grid">${list.map(item => {
      let attrs = "";
      if (item.status === "active") {
        if (books && externalBookLinks[item.id]) attrs = `data-external-href="${externalBookLinks[item.id]}"`;
        else attrs = `data-route="${books ? "dashboard" : "dashboard"}" data-action="close-selector"`;
      }
      return `<button class="selector-card ${item.status}" ${item.status !== "active" ? "disabled" : ""} ${attrs}><span>${item.cover ? `<img src="${item.cover}" alt="">` : icon(item.icon || item.symbol)}</span><strong>${escapeHtml(item.name)}</strong><small>${item.status === "active" ? "Disponível" : "Bloqueado nesta etapa"}</small></button>`;
    }).join("")}</div>`;
    refs.selectorModal.classList.add("open");
    refs.selectorModal.setAttribute("aria-hidden", "false");
  }
  function closeSelector() { refs.selectorModal.classList.remove("open"); refs.selectorModal.setAttribute("aria-hidden", "true"); }

  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); showToast("Copiado para a área de transferência"); }
    catch { const area = document.createElement("textarea"); area.value = text; document.body.append(area); area.select(); document.execCommand("copy"); area.remove(); showToast("Copiado para a área de transferência"); }
  }
  function copyCharacter(id) {
    const c = getCharacter(id); if (!c) return;
    copyText(`PERSONAGEM: ${c.name}\nSAGA: Ciclo de Jesed\nLIVRO: Guerras de Sangue\nESTADO: ${c.status}\nLOCALIZAÇÃO: ${getPlace(c.locationId)?.name || "não registada"}\nESTADO EMOCIONAL: ${c.lastSeen.emotional}\nOBJECTIVO: ${c.lastSeen.objective}\nÚLTIMA DECISÃO: ${c.lastSeen.decision}\nÚLTIMA APARIÇÃO: ${c.lastSeen.chapter}\nDESCRIÇÃO: ${c.summary}\nREGRA: não inventar campos ausentes e não usar resumos de capítulos futuros.`);
  }
  function copyChapter(id) {
    const ch = getChapter(id); if (!ch) return;
    copyText(`CAPÍTULO ${ch.number} — ${ch.title}\n\nRESUMO RÁPIDO\n${ch.summary}\n\nACONTECIMENTOS\n${ch.details.join("\n\n")}`);
  }
  function showToast(message) {
    let toast = $("#diToast");
    if (!toast) { toast = document.createElement("div"); toast.id = "diToast"; toast.className = "di-toast"; document.body.append(toast); }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  document.addEventListener("click", event => {
    const enter = event.target.closest("[data-enter-saga]");
    if (enter) { routeTo("dashboard"); return; }
    const externalLink = event.target.closest("[data-external-href]");
    if (externalLink) { window.location.href = externalLink.dataset.externalHref; return; }
    const routeElement = event.target.closest("[data-route]");
    if (routeElement && routeElement.dataset.route) { closeSearch(); closeSelector(); routeTo(routeElement.dataset.route); return; }

    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "open-settings") openSettings();
    if (action === "close-settings") closeSettings();
    if (action === "close-search") closeSearch();
    if (action === "close-selector") closeSelector();
    if (action === "build-scene") {
      const c1 = getCharacter($("#sceneChar1")?.value), c2 = getCharacter($("#sceneChar2")?.value), place = getPlace($("#scenePlace")?.value);
      if (c1 && c2 && place) $("#sceneOutput").textContent = buildSceneText(c1, c2, place);
    }
    if (action === "copy-scene") copyText($("#sceneOutput")?.textContent || "");
    if (action === "copy-canon") copyText(D.canonRules.map(x => `${x.category}: ${x.text}`).join("\n"));

    const charCopy = event.target.closest("[data-copy-character]"); if (charCopy) copyCharacter(charCopy.dataset.copyCharacter);
    const chapterCopy = event.target.closest("[data-copy-chapter]"); if (chapterCopy) copyChapter(chapterCopy.dataset.copyChapter);
    const view = event.target.closest("[data-view]"); if (view) { state.viewMode = view.dataset.view; storage.set("di-character-view", state.viewMode); renderCharacters(); }
    const charFilter = event.target.closest("[data-char-filter]"); if (charFilter) { $$("[data-char-filter]").forEach(x => x.classList.toggle("active", x === charFilter)); const value = charFilter.dataset.charFilter; $("#characterList").innerHTML = characterListHtml(value === "all" ? D.characters : D.characters.filter(c => c.clanId === value)); }
    const tab = event.target.closest("[data-character-tab]"); if (tab) { state.characterTab = tab.dataset.characterTab; renderCharacter(tab.dataset.characterSlug); }
    const relFilter = event.target.closest("[data-rel-filter]"); if (relFilter) { state.relationshipFilter = relFilter.dataset.relFilter; renderRelationships(); }
    const loreFilter = event.target.closest("[data-lore-filter]"); if (loreFilter) { $$("[data-lore-filter]").forEach(x => x.classList.toggle("active", x === loreFilter)); const kind = loreFilter.dataset.loreKind, value = loreFilter.dataset.loreFilter; const items = value === "all" ? D.lore[kind] : D.lore[kind].filter(item => item.clans.includes(value)); $("#loreList").innerHTML = loreListHtml(kind, items); }
    const clanSection = event.target.closest("[data-clan-section]"); if (clanSection) { $$("[data-clan-section]").forEach(x => x.classList.toggle("active", x === clanSection)); const clan = getClan(clanSection.dataset.clanSlug); $("#clanSectionPanel").innerHTML = clanSectionHtml(clan, clanSection.dataset.clanSection); }
    const searchMode = event.target.closest("[data-search-mode]"); if (searchMode) { state.searchMode = searchMode.dataset.searchMode; $$("[data-search-mode]").forEach(x => x.classList.toggle("active", x === searchMode)); renderSearchResults(refs.searchInput.value); }
    const setting = event.target.closest("[data-setting]"); if (setting) { const key = setting.dataset.setting; state.settings[key] = !state.settings[key]; persistSettings(); }
    const preset = event.target.closest("[data-preset]"); if (preset) { state.settings.preset = preset.dataset.preset; if (state.settings.preset === "full") Object.assign(state.settings,{particles:true,transitions:true,textures:true,blur:true,shadows:true,motion:true,particleAmount:34}); if (state.settings.preset === "normal") Object.assign(state.settings,{particles:true,transitions:true,textures:true,blur:true,shadows:true,motion:true,particleAmount:22}); if (state.settings.preset === "performance") Object.assign(state.settings,{particles:false,transitions:false,textures:false,blur:false,shadows:false,motion:false}); persistSettings(); }
    const mapAction = event.target.closest("[data-map-action]")?.dataset.mapAction;
    if (mapAction) { if (mapAction === "zoom-in") state.map.zoom = Math.min(2.8, state.map.zoom + .2); if (mapAction === "zoom-out") state.map.zoom = Math.max(.65, state.map.zoom - .2); if (mapAction === "center") Object.assign(state.map,{zoom:1,x:0,y:0}); if (mapAction === "fullscreen") $(".map-page")?.requestFullscreen?.(); applyMapTransform(); }
    const mapPlace = event.target.closest("[data-map-place]"); if (mapPlace) showMapPopup(mapPlace.dataset.mapPlace, mapPlace);
    if (event.target.closest("[data-map-close]")) $("#mapPopupHost").innerHTML = "";
  });

  $("#sidebarToggle").addEventListener("click", () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    refs.sidebar.classList.toggle("collapsed", state.sidebarCollapsed);
    storage.set("di-sidebar-collapsed", state.sidebarCollapsed ? "1" : "0");
  });
  $("#mobileMenu").addEventListener("click", () => refs.sidebar.classList.toggle("mobile-open"));
  $("#searchButton").addEventListener("click", openSearch);
  refs.searchInput.addEventListener("input", () => renderSearchResults(refs.searchInput.value));
  $("#settingsButton").addEventListener("click", openSettings);
  $("#performanceToggle").addEventListener("click", () => {
    state.settings.preset = state.settings.preset === "performance" ? "normal" : "performance";
    if (state.settings.preset === "performance") Object.assign(state.settings,{particles:false,transitions:false,textures:false,blur:false,shadows:false,motion:false});
    else Object.assign(state.settings,{particles:true,transitions:true,textures:true,blur:true,shadows:true,motion:true});
    persistSettings();
  });
  $("#sagaSelector").addEventListener("click", () => openSelector("sagas"));
  $("#bookLens").addEventListener("click", () => openSelector("books"));
  refs.settingsContent.addEventListener("input", event => { if (event.target.matches("[data-setting-range]")) { state.settings[event.target.dataset.settingRange] = Number(event.target.value); persistSettings(); } });
  document.addEventListener("keydown", event => { if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") { event.preventDefault(); openSearch(); } if (event.key === "Escape") { closeSearch(); closeSettings(); closeSelector(); refs.sidebar.classList.remove("mobile-open"); } });
  window.addEventListener("hashchange", () => routeTo(location.hash.replace(/^#\//, "") || "dashboard", { replace: true }));

  document.addEventListener("pointerdown", event => {
    const stage = event.target.closest("#mapStage");
    if (!stage || event.target.closest(".map-pin,.map-popup")) return;
    state.map.dragging = true;
    state.map.startX = event.clientX - state.map.x;
    state.map.startY = event.clientY - state.map.y;
    stage.classList.add("dragging");
    stage.setPointerCapture?.(event.pointerId);
  });
  document.addEventListener("pointermove", event => { if (!state.map.dragging) return; state.map.x = event.clientX - state.map.startX; state.map.y = event.clientY - state.map.startY; applyMapTransform(); });
  document.addEventListener("pointerup", () => { state.map.dragging = false; $("#mapStage")?.classList.remove("dragging"); });
  document.addEventListener("wheel", event => { const viewport = event.target.closest("#mapViewport"); if (!viewport) return; event.preventDefault(); state.map.zoom = Math.max(.65, Math.min(2.8, state.map.zoom + (event.deltaY < 0 ? .12 : -.12))); applyMapTransform(); }, { passive: false });

  function initIcons() { $$('[data-icon]').forEach(element => { element.innerHTML = icon(element.dataset.icon); }); }
  function init() {
    initIcons();
    renderNav();
    refs.sidebar.classList.toggle("collapsed", state.sidebarCollapsed);
    applySettings();
    const route = location.hash.replace(/^#\//, "") || "dashboard";
    routeTo(route, { replace: true });
  }
  init();
})();
