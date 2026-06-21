(()=>{const R=window.RS,{D,E,S,REL,EV,H,charImage,find}=R,P=R.pages;
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
P.acontecimentos=()=>H('História','Acontecimentos','Da primeira pedra ao Vale — o que aconteceu, de onde veio e o que mudou.')+`<div class="list">${EV.map((x,i)=>{
  const causa=i?EV[i-1][1]:'A estabilidade aparente de Etérea.';
  return `<div class="row click" data-go="capitulo/${x[0]}">
    <strong>Capítulo ${x[0]} — ${E(x[1])}</strong>
    <p>${E(D.chapters[x[0]-1].s)}</p>
    <div class="tags"><span class="tag">Vem de: ${E(causa)}</span></div>
  </div>`;
}).join('')}</div>`;
P.linha=P.acontecimentos;
P.consequencias=P.acontecimentos;
})();