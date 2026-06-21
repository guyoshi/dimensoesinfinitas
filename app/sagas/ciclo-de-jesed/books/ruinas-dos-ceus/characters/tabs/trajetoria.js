(()=>{const R=window.RS,{D,E,AP,find}=R;
const TRAJ=window.RUINAS_TRAJ||{};
R.charTabs.trajetoria=(c,a)=>{
  return `<article class="panel"><h2>${a.length} capítulos</h2><div class="list">${a.map(n=>{
    const ch=D.chapters[n-1];
    const companions=Object.keys(AP).filter(name=>name!==c.n&&(AP[name]||[]).includes(n)).slice(0,5);
    const text=(TRAJ[c.n]&&TRAJ[c.n][n])||ch.s;
    return `<div class="row click" data-go="capitulo/${n}"><strong>Capítulo ${n} — ${E(ch.t)}</strong><p>${E(text)}</p>${companions.length?`<div class="tags">${companions.map(name=>`<span class="tag">${E(name)}</span>`).join('')}</div>`:''}</div>`;
  }).join('')}</div></article>`;
};
})();