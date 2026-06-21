(()=>{const R=window.RS,{D,E,S,REL,H,charImage,find,linkify}=R,P=R.pages;
function memberChip(name){const c=find(D.characters,S(name));return c?`<button class="tag click" data-go="personagem/${S(name)}">${E(name)}</button>`:`<span class="tag">${E(name)}</span>`;}
P.relacoes=()=>{
  const names=[...new Set(REL.flatMap(r=>[r[0],r[1]]))];
  const nodes=names.map((name,i)=>{
    const angle=(Math.PI*2*i/Math.max(names.length,1))-Math.PI/2;
    return {name,x:50+Math.cos(angle)*35,y:50+Math.sin(angle)*34};
  });
  const findNode=name=>nodes.find(n=>n.name===name);
  return H('Pessoas','Mapa de relações','Vínculos centrais do Livro I. Clique em qualquer pessoa para abrir a ficha.')+
    `<section class="relationship-canvas ${nodes.length<3?'few-nodes':''}">
      <svg class="relationship-svg" viewBox="0 0 100 100" preserveAspectRatio="none">${REL.map(r=>{const a=findNode(r[0]),b=findNode(r[1]);return a&&b?`<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}"/>`:'';}).join('')}</svg>
      ${nodes.map(n=>`<button class="rel-node" style="left:${n.x}%;top:${n.y}%" data-go="personagem/${S(n.name)}"><img src="${E(charImage(n.name))}" alt="" onerror="this.style.display='none'"><strong>${E(n.name)}</strong></button>`).join('')}
    </section>
    <section class="panel"><h2>${REL.length} relações</h2><div class="list">${REL.map(r=>`<div class="row click" data-go="personagem/${S(r[0])}"><strong>${E(r[0])} ↔ ${E(r[1])}</strong><p>${E(r[2])}</p></div>`).join('')}</div></section>`;
};
P.familias=()=>H('Pessoas','Famílias','Laços familiares.')+`<div class="grid"><article class="card"><h3>Família Amaréa</h3><p>O núcleo de Jokara: pais, irmã e o menino acolhido após a Queda.</p><div class="tags">${['Yoral','Mirel Amaréa','Jokara Amaréa','Nestira Amaréa','Loutes'].map(memberChip).join('')}</div></article><article class="card"><h3>A raiz futura</h3><p>Marv recebe o legado de Jokara e Nestira e leva os sobreviventes ao Vale.</p><div class="tags">${['Marv','Jokara Amaréa','Nestira Amaréa'].map(memberChip).join('')}</div></article></div>`;
P.organizacoes=()=>H('Pessoas','Organizações','Instituições e grupos.')+`<div class="grid">${[['Oradores da Corrente','Guardam ritos, escrituras e segredos.',['Nestira Amaréa','Yrséa']],['Ecoantes','Aprendizes e intérpretes.',['Platisa']],['Tecelões de Vento','Constroem planadores e pontes.',['Efepar']],['Sobreviventes de Nadírion','Grupo formado após a Queda.',['Malthar','Gabasteres','Marv','Jokara Amaréa']]].map(x=>`<article class="card"><h3>${E(x[0])}</h3><p>${E(x[1])}</p><div class="tags">${x[2].map(memberChip).join('')}</div></article>`).join('')}</div>`;

function timelineItems(){return [...(D.common?.entities?.timeline||D.timeline||[])].sort((a,b)=>(a.sortKey||0)-(b.sortKey||0));}
const timelineRelationLabel=relation=>({ocorre:'Ocorre no Capítulo',citado:'Citado no Capítulo',recordado:'Recordado no Capítulo',revelado:'Revelado no Capítulo',investigado:'Investigado no Capítulo',consequencia:'Consequência narrada no Capítulo'})[relation]||'Relacionado ao Capítulo';
function timelineFind(id){return timelineItems().find(item=>item.id===id||item.slug===id||(item.legacySlugs||[]).includes(id));}
function timelineSelection(){try{return localStorage.getItem('di-rdc-timeline-selection')||''}catch{return''}}
function saveTimelineSelection(slug){try{localStorage.setItem('di-rdc-timeline-selection',slug)}catch{}}
function chapterLinks(item){return item.chapterLinks?.length?item.chapterLinks:(item.chapterIds||[]).map(chapterId=>({chapterId,relation:'ocorre',note:''}));}
function timelineLinkLine(label,html,empty='Não registado'){return `<div class="rdc-timeline-linked"><strong>${E(label)}</strong><span>${html.length?html.join('<i>·</i>'):E(empty)}</span></div>`;}
P.linha=()=>{
  const selected=timelineSelection();
  return H('História','Linha do Tempo','Cronologia de Jesed organizada pela data real dos acontecimentos, e não pela ordem dos capítulos.')+
    `<section class="rdc-era-guide"><div><strong>A.Q.</strong><span>Antes da Queda</span></div><div><strong>D.Q.</strong><span>Depois da Queda</span></div><p>Datas aproximadas são indicadas quando o manuscrito não estabelece o ciclo ou o mês com precisão.</p></section>
    <section class="rdc-timeline-list">${timelineItems().map(item=>{
      const chapters=chapterLinks(item).map(ref=>{const ch=D.common?.findById?.('chapters',ref.chapterId);return ch?`<button data-go="capitulo/${ch.number}">${E(timelineRelationLabel(ref.relation))} ${ch.number}</button>`:''}).filter(Boolean);
      const characters=(item.characterIds||[]).map(id=>D.common?.findById?.('characters',id)).filter(Boolean).slice(0,5).map(c=>`<button data-go="personagem/${E(c.slug)}">${E(c.name)}</button>`);
      const places=(item.placeIds||[]).map(id=>D.common?.findById?.('places',id)).filter(Boolean).slice(0,4).map(p=>`<button data-go="lugar/${E(p.slug)}">${E(p.name)}</button>`);
      return `<article class="rdc-timeline-card ${selected===item.slug?'selected':''}" data-go="linha/${E(item.slug)}" data-timeline-card="${E(item.slug)}" tabindex="0" role="link" aria-label="Abrir ${E(item.name)}"><div class="rdc-timeline-head"><time>${E(item.dateLabel||item.period||'Data não estabelecida')}</time><span>${E(item.category||'Acontecimento')}</span></div><h2>${E(item.name)}</h2><p>${E(item.summary||'Descrição ainda não registada.')}</p><div class="rdc-timeline-links">${timelineLinkLine('Capítulos',chapters)}${timelineLinkLine('Personagens',characters)}${timelineLinkLine('Lugares',places,'Sem lugar determinado')}</div></article>`;
    }).join('')}</section>`;
};

P.linhaItem=id=>{
  const item=timelineFind(id);if(!item)return R.err();saveTimelineSelection(item.slug);
  const chapters=chapterLinks(item).map(ref=>({ref,ch:D.common?.findById?.('chapters',ref.chapterId)})).filter(x=>x.ch);
  const characters=(item.characterIds||[]).map(characterId=>D.common?.findById?.('characters',characterId)).filter(Boolean);
  const places=(item.placeIds||[]).map(placeId=>D.common?.findById?.('places',placeId)).filter(Boolean);
  const related=(item.relatedEventIds||[]).map(timelineFind).filter(Boolean);
  return `<button class="back" data-go="linha">← Voltar para a Linha do Tempo</button>`+
    H('Linha do Tempo',item.name,item.dateLabel||item.period||'Data não estabelecida')+
    `<section class="rdc-timeline-detail"><article class="panel rdc-timeline-narrative"><p class="eyebrow">${E(item.category||'Acontecimento')}</p><p class="lead">${linkify(item.summary||'Descrição ainda não registada.')}</p>${item.context?`<h2>Contexto</h2><p>${linkify(item.context)}</p>`:''}${item.cause?`<h2>Causa</h2><p>${linkify(item.cause)}</p>`:''}${item.consequences?.length?`<h2>Consequências</h2><ul>${item.consequences.map(x=>`<li>${linkify(x)}</li>`).join('')}</ul>`:''}${(item.publicVersion||item.truth)?`<div class="rdc-truth-grid">${item.publicVersion?`<article><small>Versão pública</small><p>${linkify(item.publicVersion)}</p></article>`:''}${item.truth?`<article class="truth"><small>O que realmente aconteceu</small><p>${linkify(item.truth)}</p></article>`:''}</div>`:''}</article>
      <aside class="rdc-timeline-aside"><article class="panel"><h2>Capítulos relacionados</h2><div class="rdc-reference-list">${chapters.length?chapters.map(({ref,ch})=>`<button data-go="capitulo/${ch.number}"><strong>${E(timelineRelationLabel(ref.relation))} ${ch.number}</strong><span>${E(ch.title)}</span>${ref.note?`<small>${E(ref.note)}</small>`:''}</button>`).join(''):'<p>Nenhum capítulo ligado.</p>'}</div></article>
      <article class="panel"><h2>Personagens relacionados</h2><div class="rdc-entity-list">${characters.length?characters.map(c=>`<button data-go="personagem/${E(c.slug)}"><img src="${E(c.image||charImage(c.name))}" alt="" onerror="this.hidden=true"><span>${E(c.name)}</span></button>`).join(''):'<p>Nenhum personagem registado.</p>'}</div></article>
      <article class="panel"><h2>Lugares relacionados</h2><div class="rdc-reference-list">${places.length?places.map(p=>`<button data-go="lugar/${E(p.slug)}"><strong>${E(p.name)}</strong><span>${E(p.type||'Lugar')}</span></button>`).join(''):'<p>Nenhum lugar determinado.</p>'}</div></article>
      ${related.length?`<article class="panel"><h2>Acontecimentos relacionados</h2><div class="rdc-reference-list">${related.map(e=>`<button data-go="linha/${E(e.slug)}"><strong>${E(e.name)}</strong><span>${E(e.dateLabel||'Data não estabelecida')}</span></button>`).join('')}</div></article>`:''}</aside></section>`;
};

})();