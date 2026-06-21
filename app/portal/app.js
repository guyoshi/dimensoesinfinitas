(() => {
  const sagas = window.PORTAL_DATA.sagas;
  const books = window.PORTAL_DATA.books;
  const sagaGrid = document.getElementById('sagaGrid');
  const bookGrid = document.getElementById('bookGrid');
  const detailView = document.getElementById('detailView');
  const views = {
    sagas: document.getElementById('sagaView'),
    books: document.getElementById('bookView'),
    detail: detailView
  };
  const externalPages = { 'ruinas-dos-ceus': 'ruinas.html', 'guerras-de-sangue': 'guerras.html' };
  const bookLogos = { 'ruinas-dos-ceus': 'assets/branding/Ruínas dos Céus white.webp', 'guerras-de-sangue': 'assets/branding/Guerras de Sangue white.webp' };
  const icons = { compass: '✦', journal: '✦', crown: '♕', stars: '✧', portal: '◎', eye: '◉', union: '⬡', wind: '☁', 'crossed-swords': '⚔', fortress: '⛁', embers: '♨', hourglass: '⏳' };
  const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function showView(name) {
    Object.entries(views).forEach(([key, el]) => el && el.classList.toggle('is-hidden', key !== name));
  }

  function renderSagas() {
    sagaGrid.innerHTML = sagas.map(s => {
      const active = s.status === 'active';
      return `<article class="dim-card ${active ? 'active' : 'locked'}" ${active ? `data-saga="${escapeHtml(s.id)}"` : ''}>
        <div class="dim-icon">${icons[s.symbol] || '✦'}</div>
        <h3>${escapeHtml(s.name)}</h3>
        <p>${escapeHtml(s.tagline || s.theme)}</p>
        <div class="dim-state">${active ? 'Disponível' : 'Bloqueada'}</div>
      </article>`;
    }).join('');
  }

  function renderBooks() {
    bookGrid.innerHTML = books.map(b => {
      const active = b.status === 'active';
      const style = b.cover ? ` style="background-image:url('${escapeHtml(b.cover)}')"` : '';
      return `<article class="dim-card book-dim-card ${active ? 'active' : 'locked'}"${style} ${active ? `data-book="${escapeHtml(b.id)}"` : ''}>
        <h3>Livro ${b.order} — ${escapeHtml(b.name)}</h3>
        <p>${escapeHtml(b.synopsis || b.visual)}</p>
        <div class="dim-state">${active ? 'Disponível' : 'Em preparação'}</div>
      </article>`;
    }).join('');
  }

  function renderDetail(id) {
    const b = books.find(x => x.id === id);
    if (!b) { showView('books'); renderBooks(); return; }
    const href = externalPages[b.id];
    const logo = bookLogos[b.id];
    const titleHtml = logo ? `<img class="detail-logo" src="${escapeHtml(logo)}" alt="${escapeHtml(b.name)}">` : `<h2 class="section-title">${escapeHtml(b.name)}</h2>`;
    detailView.innerHTML = `<button class="back-link" data-back="books">← Voltar</button><div class="detail-card">${b.cover ? `<img class="detail-cover" src="${escapeHtml(b.cover)}" alt="Capa de ${escapeHtml(b.name)}">` : ''}<p class="kicker">Livro ${b.order} · Ciclo de Jesed</p>${titleHtml}<p class="subtitle">${escapeHtml(b.synopsis || b.visual)}</p>${href ? `<button class="go-button" data-go-href="${href}">Ir para a página do livro</button>` : '<p class="subtitle">Ainda em preparação.</p>'}</div>`;
  }

  function route() {
    const hash = location.hash.replace(/^#\//, '');
    const [base, id] = hash.split('/');
    if (base === 'books') { renderBooks(); showView('books'); }
    else if (base === 'book' && id) { renderDetail(id); showView('detail'); }
    else { renderSagas(); showView('sagas'); }
    window.scrollTo(0, 0);
  }

  document.addEventListener('click', event => {
    const sagaCard = event.target.closest('[data-saga]');
    if (sagaCard) { location.hash = '#/books'; return; }
    const bookCard = event.target.closest('[data-book]');
    if (bookCard) { location.hash = '#/book/' + bookCard.dataset.book; return; }
    const back = event.target.closest('[data-back]');
    if (back) { location.hash = back.dataset.back === 'sagas' ? '#/' : '#/books'; return; }
    const goHref = event.target.closest('[data-go-href]');
    if (goHref) { window.location.href = goHref.dataset.goHref; return; }
  });

  window.addEventListener('hashchange', route);

  function buildStars() {
    const layer = document.getElementById('stars');
    if (!layer) return;
    const count = 150;
    for (let i = 0; i < count; i += 1) {
      const star = document.createElement('span');
      star.className = 'star';
      const leftPct = Math.random() * 100;
      const topPct = Math.random() * 100;
      const dx = leftPct - 50;
      const dy = topPct - 50;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const travel = 10 + Math.random() * 30;
      const tx = (dx / dist) * travel;
      const ty = (dy / dist) * travel;
      star.style.left = `${leftPct}%`;
      star.style.top = `${topPct}%`;
      star.style.setProperty('--s', `${1 + Math.random() * 2.3}px`);
      star.style.setProperty('--tx', `${tx.toFixed(2)}vw`);
      star.style.setProperty('--ty', `${ty.toFixed(2)}vh`);
      star.style.setProperty('--dur', `${9 + Math.random() * 16}s`);
      star.style.setProperty('--delay', `${-Math.random() * 22}s`);
      layer.appendChild(star);
    }
  }

  buildStars();
  route();
})();
