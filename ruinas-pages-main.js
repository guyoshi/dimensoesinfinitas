(()=>{const R=window.RS,{D,E,S,AP,REL,EV,MYS,st,H,find,err,BOOKS,charImage,media,initials}=R;
function livros(){
  return H('Ciclo de Jesed','Os cinco livros','Clique num livro para ver os detalhes.')+`<div class="bookshelf">${BOOKS.map(b=>{
    const active=b.status==='active';
    const current=b.id==='ruinas-dos-ceus';
    return `<article class="book-card ${b.status} ${current?'current':''} ${active?'click':''}" ${active?`data-go="livro/${b.id}"`:'disabled'} style="${b.cover?`--book-cover:url('${E(b.cover)}')`:''}">
      <span class="book-number">Livro ${b.order}</span>
      <div class="book-card-copy"><h3>${E(b.name)}</h3><p>${E(b.visual)}</p></div>
      <div class="book-status"><span>${active?(current?'Livro concluído':'Em escrita'):'Bloqueado'}</span><span>${active?(current?'Você está aqui':'Ver detalhes'):'Em preparação'}</span></div>
    </article>`;
  }).join('')}</div>`;
}
function livro(id){
  const b=BOOKS.find(x=>x.id===id);
  if(!b) return err();
  const current=b.id==='ruinas-dos-ceus';
  const externalLinks={'guerras-de-sangue':'guerras.html'};
  const href=!current?externalLinks[b.id]:null;
  const stats=current?`<div class="stats"><span class="stat">${D.chapters.length} capítulos</span><span class="stat">${D.characters.length} personagens</span><span class="stat">${D.places.length} lugares</span></div>`:'';
  return `<button class="back" data-go="livros">← Voltar</button><section class="detailhero">${media(b.cover,`Capa de ${b.name}`,'✦','portrait avatar big')}<article class="panel"><p class="eyebrow">Livro ${b.order} · ${b.status==='active'?(current?'Você está aqui':'Disponível'):'Bloqueado nesta etapa'}</p><h1>${E(b.name)}</h1><p class="lead">${E(b.visual)}</p>${stats}${href?`<div class="hero-actions"><button class="primary-button" data-selector-href="${href}">Ir para a página do livro</button></div>`:''}</article></section>`;
}
function inicio(){
  const lastChapters=D.chapters.slice(-5).reverse();
  const focusChars=D.characters.slice(0,5);
  return `<section class="hero-map-card">
    <img src="assets/maps/ruinas-dos-ceus/mapa-combinado.webp" alt="Mapa de Etérea e Nadírion">
    <div class="hero-map-content"><p class="eyebrow">Ciclo de Jesed · Guia do livro</p><img class="hero-logo glow-title" src="assets/branding/ruinas-dos-ceus-logo.png" alt="Ruínas dos Céus"><p class="lead">A queda de Etérea e o nascimento da primeira raiz Polar.</p><div class="hero-actions"><button class="primary-button" data-go="mapa">Abrir mapa</button><button class="secondary-button" data-go="livros">Ver os cinco livros</button></div></div>
  </section>
  <div class="section grid quick-grid">${[['personagens','Personagens','Quem são e onde ficaram'],['relacoes','Relações','Vínculos centrais'],['acontecimentos','Acontecimentos','Causas e efeitos'],['misterios','Mistérios','Pistas e respostas'],['mapa','Mapa','Etérea e Nadírion'],['capitulos','Capítulos',`${D.chapters.length} capítulos escritos`]].map(x=>`<article class="card click" data-go="${x[0]}"><h3>${x[1]}</h3><p>${x[2]}</p></article>`).join('')}</div>
  <div class="section metrics-grid">${[[D.characters.length,'personagens'],[D.places.length,'lugares'],[D.chapters.length,'capítulos'],[EV.length,'acontecimentos'],[MYS.length,'mistérios']].map(x=>`<article class="metric-card"><strong>${x[0]}</strong><span>${x[1]}</span></article>`).join('')}</div>
  <div class="section dashboard-columns">
    <article class="panel"><div class="section-heading"><h2>Personagens em foco</h2><p>Estado no último ponto da história.</p></div><div class="mini-list">${focusChars.map(c=>`<button class="mini-item" data-go="personagem/${S(c.n)}">${media(charImage(c.n),c.n,initials(c.n),'mini-avatar')}<span><strong>${E(c.n)}</strong><small>${E(c.st)}</small></span></button>`).join('')}</div></article>
    <article class="panel"><div class="section-heading"><h2>Últimos capítulos</h2><p>Continuação directa da escrita.</p></div><div class="mini-list">${lastChapters.map(ch=>`<button class="mini-item" data-go="capitulo/${ch.n}"><span class="mini-icon">📖</span><span><strong>Capítulo ${ch.n} — ${E(ch.t)}</strong><small>${E(ch.s.slice(0,70))}…</small></span></button>`).join('')}</div></article>
  </div>`;
}
function capitulos(){let a=D.chapters.filter(x=>`${x.n} ${x.t} ${x.s}`.toLowerCase().includes(st.q.toLowerCase()));return H('História','Capítulos','Os 24 capítulos escritos.',`<input class="search" data-search placeholder="Pesquisar…" value="${E(st.q)}">`)+`<div class="grid">${a.map(x=>`<article class="card click" data-go="capitulo/${x.n}"><p class="meta">Capítulo ${x.n}</p><h3>${E(x.t)}</h3><p>${E(x.s)}</p></article>`).join('')}</div>`}
function capitulo(id){const c=D.chapters[Number(id)-1];if(!c)return err();const chars=D.characters.filter(x=>(AP[x.n]||[]).includes(c.n)),ev=EV.filter(x=>x[0]===c.n);return `<button class="back" data-go="capitulos">← Voltar</button><article class="panel"><p class="eyebrow">Capítulo ${c.n}</p><h1>${E(c.t)}</h1><p class="lead">${E(c.s)}</p><h2>Acontecimentos</h2>${(ev.length?ev:[[c.n,c.t]]).map(x=>`<div class="row"><strong>${E(x[1])}</strong><p>${E(c.s)}</p></div>`).join('')}<h2>Personagens presentes</h2><div class="tags">${chars.map(x=>`<button class="tag" data-go="personagem/${S(x.n)}">${E(x.n)}</button>`).join('')}</div></article>`}
R.pages={inicio,capitulos,capitulo,livros,livro};})();