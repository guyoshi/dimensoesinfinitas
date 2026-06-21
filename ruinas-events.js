(()=>{const R=window.RS,{D,E,S,st,LORE,SAGAS,BOOKS,$,go}=R;
function selectorCardHtml(item, books){
  const active=item.status==='active';
  const isCurrent=books?item.id==='ruinas-dos-ceus':item.id==='ciclo-de-jesed';
  let attrs='';
  if(active&&isCurrent) attrs='data-selector-home';
  else if(active&&!isCurrent) attrs=`data-selector-href="guerras.html"`;
  const media=books?(item.cover?`<span class="selector-cover"><img src="${E(item.cover)}" alt=""></span>`:`<span class="selector-cover symbol">✦</span>`):'';
  return `<button class="selector-card ${item.status}" ${active?'':'disabled'} ${attrs}>${media}<strong>${E(item.name)}</strong><small>${active?'Disponível':'Bloqueado nesta etapa'}</small></button>`;
}
function openSelector(type){
  const modal=$('#selectorModal'),content=$('#selectorContent');
  if(!modal||!content) return;
  const books=type==='books';
  const list=books?BOOKS:SAGAS;
  content.innerHTML=`<div class="selector-head"><p class="eyebrow">${books?'Livro':'Dimensão'}</p><h2>${books?'Escolher livro':'Escolher saga'}</h2></div><div class="selector-grid">${list.map(item=>selectorCardHtml(item,books)).join('')}</div>`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
}
function closeSelector(){
  const modal=$('#selectorModal');
  if(!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
}
$('#sagaSelector')?.addEventListener('click',()=>openSelector('sagas'));
$('#bookSwitch')?.addEventListener('click',()=>openSelector('books'));
function searchableItems(){
  return [
    ...D.characters.map(c=>({type:'Personagens',title:c.n,subtitle:c.a,text:`${c.n} ${c.a} ${c.s}`,route:`personagem/${S(c.n)}`})),
    ...D.places.map(p=>({type:'Lugares',title:p.n,subtitle:p.s.slice(0,60),text:`${p.n} ${p.s}`,route:`lugar/${S(p.n)}`})),
    ...D.chapters.map(c=>({type:'Capítulos',title:`Capítulo ${c.n} — ${c.t}`,subtitle:c.s.slice(0,60),text:`${c.t} ${c.s}`,route:`capitulo/${c.n}`}))
  ];
}
function renderSearch(query){
  const results=$('#searchResults');
  if(!results) return;
  const q=String(query||'').trim().toLowerCase();
  let items=searchableItems();
  if(q) items=items.filter(it=>it.text.toLowerCase().includes(q));
  items=items.slice(0,60);
  if(!items.length){results.innerHTML='<div class="search-empty">Nenhum resultado encontrado.</div>';return;}
  const groups={};
  items.forEach(it=>{(groups[it.type]=groups[it.type]||[]).push(it);});
  results.innerHTML=Object.entries(groups).map(([type,list])=>`<div class="search-result-group"><h4>${E(type)}</h4>${list.map(it=>`<button class="search-result-item" data-go="${E(it.route)}"><strong>${E(it.title)}</strong><small>${E(it.subtitle||'')}</small></button>`).join('')}</div>`).join('');
}
function openSearch(){
  const modal=$('#searchModal'),input=$('#searchInput');
  if(!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  if(input){input.value='';setTimeout(()=>input.focus(),20);}
  renderSearch('');
}
function closeSearch(){
  const modal=$('#searchModal');
  if(!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
}
$('#searchTrigger')?.addEventListener('click',openSearch);
$('#searchInput')?.addEventListener('input',e=>renderSearch(e.target.value));
document.addEventListener('keydown',e=>{
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openSearch();}
  if(e.key==='Escape'){closeSearch();closeSelector();closeSettingsDrawer();}
});
document.addEventListener('click',e=>{
  if(e.target.closest('[data-selector-home]')){closeSelector();return go('inicio');}
  const extLink=e.target.closest('[data-selector-href]');if(extLink){window.location.href=extLink.dataset.selectorHref;return;}
  if(e.target.closest('[data-selector-close]'))return closeSelector();
  let x=e.target.closest('[data-go]');if(x){closeSearch();closeSelector();closeSettingsDrawer();return go(x.dataset.go);}x=e.target.closest('[data-map-phase]');if(x){st.mapPhase=x.dataset.mapPhase;return R.render();}x=e.target.closest('[data-tab]');if(x){st.tab=x.dataset.tab;return R.render()}x=e.target.closest('[data-sort]');if(x){st.sort=x.dataset.sort;return R.render()}if(e.target.closest('[data-unused]')){st.unused=!st.unused;return R.render()}x=e.target.closest('[data-export]');if(x){const names=LORE[x.dataset.export].filter(y=>y[1]===0).map(y=>y[0]);const file=new Blob([names.join('\n')],{type:'text/plain'}),link=document.createElement('a');link.href=URL.createObjectURL(file);link.download=`ruinas-${x.dataset.export}-nao-usados.txt`;link.click();URL.revokeObjectURL(link.href)}if(e.target.closest('#menu'))document.body.classList.toggle('menu');if(e.target.closest('[data-search-close]'))closeSearch()});document.addEventListener('input',e=>{if(e.target.matches('[data-search]')){st.q=e.target.value;const p=e.target.selectionStart;R.render();const n=$('[data-search]');n?.focus();n?.setSelectionRange(p,p)}});addEventListener('hashchange',()=>{st.tab='geral';st.q='';R.render()});document.body.dataset.book='ruinas-dos-ceus';
const storage={
  get(k){try{return localStorage.getItem(k)}catch{return null}},
  set(k,v){try{localStorage.setItem(k,v)}catch{}}
};
const settings={
  particles:storage.get('di-particles')!=='0',
  transitions:storage.get('di-transitions')!=='0',
  textures:storage.get('di-textures')!=='0',
  blur:storage.get('di-blur')!=='0',
  shadows:storage.get('di-shadows')!=='0',
  motion:storage.get('di-motion')!=='0',
  particleAmount:Number(storage.get('di-particle-amount')||22),
  preset:storage.get('di-preset')||'normal'
};
const PRESET_VALUES={
  full:{particles:true,transitions:true,textures:true,blur:true,shadows:true,motion:true,particleAmount:34},
  normal:{particles:true,transitions:true,textures:true,blur:true,shadows:true,motion:true,particleAmount:22},
  performance:{particles:false,transitions:false,textures:false,blur:false,shadows:false,motion:false}
};
function detectPreset(){
  for(const key of Object.keys(PRESET_VALUES)){
    const v=PRESET_VALUES[key];
    if(Object.keys(v).every(k=>settings[k]===v[k])) return key;
  }
  return 'custom';
}
function cloudCount(){return Math.max(2,Math.min(14,Math.round(settings.particleAmount/3.6)));}
function buildClouds(){
  const layer=$('#clouds');
  if(!layer) return;
  layer.innerHTML='';
  if(!settings.particles||settings.preset==='performance') return;
  const count=cloudCount();
  for(let i=0;i<count;i+=1){
    const cloud=document.createElement('div');
    cloud.className='cloud';
    const w=170+Math.random()*230;
    cloud.style.setProperty('--top',`${4+Math.random()*58}%`);
    cloud.style.setProperty('--w',`${w}px`);
    cloud.style.setProperty('--h',`${Math.round(w*.36)}px`);
    cloud.style.setProperty('--duration',`${55+Math.random()*70}s`);
    cloud.style.setProperty('--delay',`${-Math.random()*110}s`);
    layer.appendChild(cloud);
  }
}
const perfBtn=$('#perfToggle');
function applySettingsBook1(){
  settings.preset=detectPreset();
  const body=document.body;
  body.classList.toggle('no-particles',!settings.particles||settings.preset==='performance');
  body.classList.toggle('no-transitions',!settings.transitions);
  body.classList.toggle('no-textures',!settings.textures);
  body.classList.toggle('no-blur',!settings.blur);
  body.classList.toggle('no-shadows',!settings.shadows);
  body.classList.toggle('no-motion',!settings.motion);
  body.classList.toggle('performance-mode',settings.preset==='performance');
  if(perfBtn){
    const on=settings.preset==='performance';
    perfBtn.setAttribute('aria-pressed',String(on));
    const label=on?'Modo de desempenho ligado':'Modo de desempenho desligado';
    perfBtn.title=label;
    perfBtn.setAttribute('aria-label',label);
  }
  buildClouds();
}
function persistSettingsBook1(){
  Object.entries(settings).forEach(([k,v])=>{
    const key=k==='particleAmount'?'di-particle-amount':`di-${k}`;
    storage.set(key,typeof v==='boolean'?(v?'1':'0'):String(v));
  });
  applySettingsBook1();
  renderSettingsPanel();
}
function settingToggleHtml(key,title,desc,enabled){
  return `<div class="setting-row"><span class="setting-copy"><strong>${title}</strong><small>${desc}</small></span><button class="switch ${enabled?'on':''}" data-bsetting="${key}" aria-pressed="${enabled}"></button></div>`;
}
function renderSettingsPanel(){
  const content=$('#settingsContent');
  if(!content) return;
  const s=settings;
  content.innerHTML=`<div class="settings-group"><h3>Perfis rápidos</h3><div class="preset-row">${[['full','Completo'],['normal','Equilibrado'],['performance','Desempenho'],['custom','Personalizado']].map(([k,l])=>`<button class="preset-button ${s.preset===k?'active':''} ${k==='custom'?'preset-custom':''}" data-bpreset="${k}" ${k==='custom'?'disabled':''}>${l}</button>`).join('')}</div></div><div class="settings-group"><h3>Controlo individual</h3>${settingToggleHtml('particles','Nuvens','Nuvens à deriva no fundo.',s.particles)}${settingToggleHtml('transitions','Transições temáticas','Efeitos de entrada entre páginas.',s.transitions)}${settingToggleHtml('textures','Texturas','Brilhos e manchas sobre superfícies.',s.textures)}${settingToggleHtml('blur','Desfoque de painéis','Efeito de vidro nas barras e janelas.',s.blur)}${settingToggleHtml('shadows','Sombras profundas','Profundidade dos cartões.',s.shadows)}${settingToggleHtml('motion','Movimento e animações','Entradas, deslocamentos e efeitos.',s.motion)}<div class="setting-row range-row"><span class="setting-copy"><strong>Quantidade de nuvens</strong><small>Ajuste fino do fundo.</small></span><input type="range" min="4" max="50" value="${s.particleAmount}" data-brange="particleAmount"></div></div>`;
}
function openSettingsDrawer(){renderSettingsPanel();$('#settingsDrawer')?.classList.add('open');$('#settingsDrawer')?.setAttribute('aria-hidden','false');}
function closeSettingsDrawer(){$('#settingsDrawer')?.classList.remove('open');$('#settingsDrawer')?.setAttribute('aria-hidden','true');}
$('#settingsButton')?.addEventListener('click',openSettingsDrawer);
perfBtn?.addEventListener('click',()=>{
  settings.preset=settings.preset==='performance'?'normal':'performance';
  Object.assign(settings,PRESET_VALUES[settings.preset]);
  persistSettingsBook1();
});
document.addEventListener('click',e=>{
  if(e.target.closest('[data-drawer-close]'))return closeSettingsDrawer();
  const bsetting=e.target.closest('[data-bsetting]');
  if(bsetting){const k=bsetting.dataset.bsetting;settings[k]=!settings[k];return persistSettingsBook1();}
  const bpreset=e.target.closest('[data-bpreset]');
  if(bpreset&&PRESET_VALUES[bpreset.dataset.bpreset]){Object.assign(settings,PRESET_VALUES[bpreset.dataset.bpreset]);return persistSettingsBook1();}
});
document.addEventListener('input',e=>{
  if(e.target.matches('[data-brange]')){settings[e.target.dataset.brange]=Number(e.target.value);persistSettingsBook1();}
});
applySettingsBook1();
const loadMusic=()=>{if(document.querySelector('script[src="book-music-loader.js"]'))return;const script=document.createElement('script');script.src='book-music-loader.js';document.head.appendChild(script)};if('requestIdleCallback'in window)requestIdleCallback(loadMusic,{timeout:1200});else setTimeout(loadMusic,250);R.render();})();