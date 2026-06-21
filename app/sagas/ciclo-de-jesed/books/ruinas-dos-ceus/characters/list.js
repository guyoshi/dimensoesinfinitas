(()=>{
  const R=window.RS,{D,E,S,AP,st,H,charImage,initials,media}=R;
  const UI=window.DI_CHARACTER_BROWSER;
  const viewIcon=view=>view==='grid'
    ?'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>'
    :'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></svg>';
  const ensureView=()=>{
    if(!['grid','list'].includes(st.characterView))st.characterView=UI?.readView('ruinas-dos-ceus')||'grid';
    return st.characterView;
  };
  const short=value=>UI?.shortText(value,176)||String(value||'');
  const matches=character=>UI?.matches(character,st.q)||`${character.n} ${character.a} ${character.s} ${character.st}`.toLowerCase().includes(String(st.q||'').toLowerCase());
  const card=character=>`<button type="button" class="character-browser-card ruinas-character-card" data-go="personagem/${S(character.n)}"><span class="character-browser-card-media">${media(charImage(character.n),`Retrato de ${character.n}`,initials(character.n),'portrait avatar')}</span><span class="character-browser-card-copy"><h2>${E(character.n)}</h2><small class="character-browser-subtitle">${E(character.a)}</small><span class="character-browser-description">${E(short(character.s))}</span></span></button>`;
  const row=character=>`<button type="button" class="character-browser-row ruinas-character-row" data-go="personagem/${S(character.n)}"><span class="character-browser-row-media">${media(charImage(character.n),`Retrato de ${character.n}`,initials(character.n),'portrait avatar')}</span><span class="character-browser-row-name"><strong>${E(character.n)}</strong><small>${E(character.a)}</small></span><span class="character-browser-row-description">${E(short(character.s))}</span><span class="character-browser-row-meta">${(AP[character.n]||[]).length} capítulos</span></button>`;
  function personagens(){
    const view=ensureView();
    const characters=D.characters.filter(matches);
    const tools=`<div class="character-browser-toolbar"><label class="character-browser-search"><span class="sr-only">Pesquisar personagens</span><input class="search" type="search" data-search data-character-search autocomplete="off" placeholder="Pesquisar por nome, subtítulo ou descrição…" value="${E(st.q)}"><small class="character-browser-search-count">${characters.length}/${D.characters.length}</small></label><div class="character-view-toggle" role="group" aria-label="Modo de visualização"><button type="button" class="character-view-button ${view==='grid'?'active':''}" data-character-view="grid" aria-pressed="${view==='grid'}" title="Cartões grandes">${viewIcon('grid')}<span class="sr-only">Cartões grandes</span></button><button type="button" class="character-view-button ${view==='list'?'active':''}" data-character-view="list" aria-pressed="${view==='list'}" title="Lista compacta">${viewIcon('list')}<span class="sr-only">Lista compacta</span></button></div></div>`;
    const content=!characters.length?'<div class="character-browser-empty panel"><h2>Nenhum personagem encontrado</h2><p>Tente outro nome, função ou descrição.</p></div>':view==='list'?`<div class="character-browser-list">${characters.map(row).join('')}</div>`:`<div class="character-browser-grid">${characters.map(card).join('')}</div>`;
    return H('Pessoas','Personagens','Habitantes de Etérea e sobreviventes transformados pela Queda, entre a leveza do céu e o peso da superfície.')+tools+content;
  }
  R.pages.personagens=personagens;
})();
