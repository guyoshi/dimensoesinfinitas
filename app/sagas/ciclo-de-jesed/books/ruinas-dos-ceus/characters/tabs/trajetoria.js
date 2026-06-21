(()=>{
  const R=window.RS,{D,E,AP}=R;
  const TRAJ=window.RUINAS_TRAJ||{};
  R.charTabs.trajetoria=(c,chapters)=>{
    if(!chapters.length)return '<article class="panel"><h2>Trajetória</h2><p>Nenhum capítulo ligado a este personagem.</p></article>';
    return `<article class="panel"><div class="trajectory-heading"><p class="eyebrow">Capítulo por capítulo</p><h2>Trajetória de ${E(c.n)}</h2><p>O que o personagem faz, decide ou representa em cada capítulo ligado à sua história.</p></div><div class="character-trajectory-list">${chapters.map(n=>{
      const ch=D.chapters[n-1];
      const companions=Object.keys(AP).filter(name=>name!==c.n&&(AP[name]||[]).includes(n)).slice(0,5);
      const text=TRAJ[c.n]?.[n]||'Trajetória específica ainda não registrada para este capítulo.';
      return `<button type="button" class="row character-trajectory-card" data-go="capitulo/${n}"><span class="trajectory-chapter-number">Capítulo ${n}</span><strong>${E(ch.t)}</strong><p>${E(text)}</p>${companions.length?`<span class="trajectory-companions">${companions.map(name=>`<span>${E(name)}</span>`).join('')}</span>`:''}</button>`;
    }).join('')}</div></article>`;
  };
})();
