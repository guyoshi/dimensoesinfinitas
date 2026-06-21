(()=>{
  const R=window.RS,{D,E,S,st,H,find,err,placeImage,media,linkify}=R,P=R.pages;
  const getCharacter=id=>D.characters.find(character=>character.id===id);
  const getChapter=id=>D.chapters.find(chapter=>chapter.id===id);
  const getTimeline=id=>(D.common?.entities?.timeline||D.timeline||[]).find(entry=>entry.id===id||entry.slug===id);
  const populationLabel=place=>place?.population?.label||'';

  const featureBlock=(title,values)=>{
    const list=(Array.isArray(values)?values:[]).filter(Boolean);
    if(!list.length)return'';
    return `<article class="place-feature-card"><h3>${E(title)}</h3><ul>${list.map(value=>`<li>${linkify(value)}</li>`).join('')}</ul></article>`;
  };

  const characterCards=place=>{
    const ids=[...new Set(place.characterIds||[])];
    if(!ids.length)return'<p class="empty-inline">Nenhum personagem tem uma cena direta registada neste lugar.</p>';
    return `<div class="place-character-grid">${ids.map(id=>{
      const character=getCharacter(id);if(!character)return'';
      const scenes=(place.chapterScenes||[]).filter(scene=>(scene.characterIds||[]).includes(id));
      const chapters=scenes.map(scene=>getChapter(scene.chapterId)?.number).filter(Boolean);
      const note=chapters.length?`Presente nas cenas dos capítulos ${chapters.join(', ')}.`:'Presença ligada a este lugar.';
      return `<button class="place-character-card" data-go="personagem/${S(character.n)}">${media(R.charImage(character.n),`Retrato de ${character.n}`,R.initials(character.n),'place-character-media')}<span><strong>${E(character.n)}</strong><small>${E(note)}</small></span></button>`;
    }).join('')}</div>`;
  };

  const chapterCards=place=>{
    const scenes=place.chapterScenes||[];
    if(!scenes.length)return'<p class="empty-inline">O lugar faz parte da lore, mas não recebe uma cena direta no manuscrito deste livro.</p>';
    return `<div class="place-scene-list">${scenes.map(scene=>{
      const chapter=getChapter(scene.chapterId);if(!chapter)return'';
      const relation=scene.relation&&scene.relation!=='ocorre'?`<span class="place-scene-relation">${E(scene.relation)}</span>`:'';
      return `<article class="place-scene-card click" data-go="capitulo/${chapter.number}" tabindex="0" role="link"><div class="place-scene-heading"><div><p class="eyebrow">Capítulo ${chapter.number}</p><h3>${E(chapter.title)}</h3></div>${relation}</div><p>${linkify(scene.text)}</p></article>`;
    }).join('')}</div>`;
  };

  const eventCards=place=>{
    const events=(place.eventIds||[]).map(getTimeline).filter(Boolean);
    if(!events.length)return'<p class="empty-inline">Nenhum acontecimento da Linha do Tempo está ligado diretamente a este lugar.</p>';
    return `<div class="place-event-list">${events.map(entry=>`<button class="place-event-card" data-go="linha/${entry.slug}"><span class="place-event-date">${E(entry.dateLabel||entry.period||'Data não estabelecida')}</span><strong>${E(entry.name)}</strong><small>${E(entry.summary)}</small></button>`).join('')}</div>`;
  };

  P.lugares=()=>{
    const query=st.q.toLowerCase();
    const places=D.places.filter(place=>`${place.n} ${place.s} ${place.region||''} ${(place.description||[]).join(' ')}`.toLowerCase().includes(query));
    return H('Mundo','Lugares','Ilhas, regiões, rotas e espaços narrativos de Etérea e Nadírion.',`<input class="search" data-search placeholder="Pesquisar…" value="${E(st.q)}">`)+`<div class="grid place-grid-expanded">${places.map(place=>{
      const population=populationLabel(place);
      return `<article class="card click place-list-card" data-go="lugar/${place.slug||S(place.n)}">${media(placeImage(place.n),`Ilustração de ${place.n}`,'✦','placepic symbol')}<div class="place-list-heading"><div><h3>${E(place.n)}</h3><span>${E(place.type||'Lugar')}</span></div></div><p>${E(place.s)}</p><div class="place-card-facts"><div><small>Região</small><strong>${E(place.region||'Não estabelecida')}</strong></div>${population?`<div><small>População estimada</small><strong>${E(population)}</strong></div>`:''}</div></article>`;
    }).join('')}</div>`;
  };

  P.lugar=id=>{
    const place=find(D.places,id);
    if(!place)return err();
    const population=populationLabel(place);
    const description=Array.isArray(place.description)&&place.description.length?place.description:[place.s];
    const features=[
      featureBlock('Arquitetura e forma',place.architecture?[place.architecture]:[]),
      featureBlock('Clima e atmosfera',place.atmosphere?[place.atmosphere]:[]),
      featureBlock('Recursos',place.resources),
      featureBlock('Perigos',place.dangers),
      featureBlock('Cultura e modo de vida',place.culture)
    ].filter(Boolean).join('');
    return `<button class="back" data-go="lugares">← Voltar</button>
      <section class="detailhero place-detail place-detail-rich">${media(placeImage(place.n),`Ilustração de ${place.n}`,'✦','place-detail-media symbol big')}<article class="panel place-summary-panel"><p class="eyebrow">${E(place.type||'Lugar do Livro I')}</p><h1>${E(place.n)}</h1><p class="lead">${linkify(place.s)}</p><div class="place-detail-facts"><div><small>Região</small><strong>${E(place.region||'Não estabelecida')}</strong></div><div><small>Localização</small><strong>${E(place.location||'Não estabelecida')}</strong></div>${population?`<div><small>População estimada</small><strong>${E(population)}</strong></div>`:''}<div><small>Livro</small><strong>Ruínas dos Céus</strong></div></div></article></section>
      <section class="panel place-content-section"><p class="eyebrow">Descrição completa</p><h2>Sobre ${E(place.n)}</h2>${description.map(paragraph=>`<p>${linkify(paragraph)}</p>`).join('')}${place.narrativeFunction?`<div class="place-narrative-function"><small>Função narrativa</small><p>${linkify(place.narrativeFunction)}</p></div>`:''}</section>
      <section class="place-feature-grid">${features}</section>
      <section class="panel place-characters-section"><div class="section-heading"><div><p class="eyebrow">Presenças no livro</p><h2>Personagens que passaram por aqui</h2></div></div>${characterCards(place)}</section>
      <section class="place-linked-grid"><article class="panel"><div class="section-heading"><div><p class="eyebrow">Cenas localizadas</p><h2>Capítulos com cenas neste lugar</h2></div></div>${chapterCards(place)}</article><article class="panel"><div class="section-heading"><div><p class="eyebrow">Cronologia</p><h2>Acontecimentos relacionados</h2></div></div>${eventCards(place)}</article></section>`;
  };

  P.mapa=()=>{
    const maps={
      eterea:{label:'Etérea',file:'assets/maps/ruinas-dos-ceus/Mapa de Etérea.png',desc:'Ilhas suspensas, pontes vivas, Bosques de Arion, Nivellia, Erílan e Praça da Raiz.'},
      nadirion:{label:'Nadírion',file:'assets/maps/ruinas-dos-ceus/Mapa de Nadírion (Floresta de Mirval).png',desc:'Floresta, riacho, abrigo, ruínas e Vale.'}
    };
    const phase=maps[st.mapPhase]?st.mapPhase:'eterea',m=maps[phase];
    return H('Mundo','Mapa do período','Etérea, acima das nuvens — Nadírion, na superfície.')+`<div class="filters">${Object.entries(maps).map(([k,v])=>`<button class="${phase===k?'active':''}" data-map-phase="${k}">${E(v.label)}</button>`).join('')}</div><div class="map-page-art"><img src="${encodeURI(m.file)}" alt="Mapa de ${E(m.label)}" loading="lazy"></div><div class="panel"><h2>${E(m.label)}</h2><p>${E(m.desc)}</p></div>`;
  };
})();
