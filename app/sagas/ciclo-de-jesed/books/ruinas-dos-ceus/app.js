(()=>{
  const R=window.RS,{st,$,nav,err}=R,P=R.pages,BOOK_ID='ruinas-dos-ceus';
  function render(){
    const requested=location.hash.replace(/^#\/?/,'')||'inicio';
    const resolved=window.JESED_COMMON?.resolveLegacyRoute(requested,BOOK_ID)||requested;
    if(resolved!==requested) history.replaceState(null,'',`#/${resolved}`);
    st.route=resolved;
    nav();
    const [base,id]=st.route.split('/');
    const pages={
      inicio:P.inicio,livros:P.livros,livro:()=>P.livro(id),
      capitulos:P.capitulos,capitulo:()=>P.capitulo(id),
      personagens:P.personagens,personagem:()=>P.personagem(id),
      relacoes:P.relacoes,familias:P.familias,organizacoes:P.organizacoes,
      linha:id?()=>P.linhaItem(id):P.linha,
      misterios:P.misterios,misterio:()=>P.misterio(id),
      mapa:P.mapa,lugares:P.lugares,lugar:()=>P.lugar(id),
      fauna:()=>P.lore('fauna'),flora:()=>P.lore('flora'),
      alimentos:()=>P.lore('alimentos'),conceitos:()=>P.lore('conceitos'),
      canon:()=>P.simples('Regras canônicas',[
        ['Sopro','Manter ambiguidade.'],
        ['Tom','Perda pesada e esperança final.'],
        ['Separação','Não usar clãs da era posterior.']
      ])
    };
    const page=pages[base]||err;
    const settings=R.settings;
    if(settings&&settings.transitions&&settings.motion&&settings.preset!=='performance'){
      const veil=$('#transitionVeil');
      if(veil){veil.classList.remove('active');void veil.offsetWidth;veil.classList.add('active');}
    }
    $('#main').innerHTML=page();
    if(base==='mapa') requestAnimationFrame(()=>R.mountMap?.());
    if(base==='linha'&&!id){
      requestAnimationFrame(()=>document.querySelector('.rdc-timeline-card.selected')?.scrollIntoView({block:'center',behavior:(settings&&settings.motion)?'smooth':'auto'}));
    }else{
      scrollTo({top:0,behavior:(settings&&settings.motion)?'smooth':'auto'});
    }
  }
  R.render=render;
})();