(()=>{
  const R=window.RS,{D,E,AP,st,find,err,charImage,initials,media}=R;
  R.charTabs={};
  R.pages.personagem=id=>{
    const c=find(D.characters,id);if(!c)return err();
    const chapters=AP[c.n]||[];
    const tabs=[['geral','Visão geral'],['trajetoria','Trajetória'],['relacoes','Relações'],['conhecimento','Conhecimento'],['destino','Destino']];
    const body=(R.charTabs[st.tab]||R.charTabs.geral)(c,chapters);
    return `<button class="back" data-go="personagens">← Voltar</button><section class="detailhero character-detail-hero">${media(charImage(c.n),`Retrato de ${c.n}`,initials(c.n),'portrait avatar big')}<div class="panel"><p class="eyebrow">Personagem · Ruínas dos Céus</p><h1>${E(c.n)}</h1><p class="character-detail-subtitle">${E(c.a)}</p><p class="lead">${E(c.s)}</p><div class="character-detail-facts"><div><small>Estado no fim do livro</small><strong>${E(c.st)}</strong></div><div><small>Trajetória registrada</small><strong>${chapters.length} capítulos</strong></div></div></div></section><div class="tabs">${tabs.map(x=>`<button class="${st.tab===x[0]?'active':''}" data-tab="${x[0]}">${x[1]}</button>`).join('')}</div>${body}`;
  };
})();
