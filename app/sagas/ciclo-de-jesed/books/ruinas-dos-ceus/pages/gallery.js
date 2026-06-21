(()=>{
  'use strict';
  const R=window.RS,{D,E,H}=R,P=R.pages;
  const labels={cover:'Capas',chapter:'Capítulos',character:'Personagens',place:'Lugares',map:'Mapas',event:'Acontecimentos',fauna:'Fauna',flora:'Flora',foods:'Alimentos',concepts:'Conceitos'};
  P.galeria=()=>{
    const items=D.common?.entities?.gallery||[];
    const categories=[...new Set(items.map(item=>item.category).filter(Boolean))];
    return H('Visual','Galeria','Imagens do livro organizadas por categoria. Clique para ampliar sem sair da galeria.')+`<section class="di-gallery-page"><div class="di-gallery-toolbar"><label class="di-gallery-search-wrap"><span>Pesquisar</span><input type="search" data-gallery-search placeholder="Pesquisar imagens" autocomplete="off"></label><button class="di-gallery-filter active" data-gallery-filter="all" aria-pressed="true">Todas</button>${categories.map(category=>`<button class="di-gallery-filter" data-gallery-filter="${E(category)}" aria-pressed="false">${E(labels[category]||category)}</button>`).join('')}<span class="di-gallery-count" data-gallery-visible-count></span></div><div class="di-gallery-grid">${items.map(item=>`<button class="di-gallery-card" type="button" data-gallery-item data-gallery-category="${E(item.category)}" data-gallery-src="${E(item.image)}" data-gallery-title="${E(item.name)}" data-gallery-type="${E(item.type)}" data-gallery-caption="${E(item.caption||item.name)}" data-gallery-route="${E(item.route||'')}"><img src="${E(item.image)}" alt="${E(item.name)}" loading="lazy"><span class="di-gallery-card-copy"><strong>${E(item.name)}</strong><small>${E(item.type)}</small></span></button>`).join('')}</div><p class="di-gallery-empty" data-gallery-empty hidden>Nenhuma imagem disponível neste filtro.</p></section>`;
  };
})();
