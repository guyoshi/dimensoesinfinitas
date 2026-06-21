(()=>{
const D=window.RUINAS_DATA,$=(q,r=document)=>r.querySelector(q),E=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),S=s=>String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const AP={'Jokara Amaréa':[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],'Nestira Amaréa':[1,2,3,4,5,7,8,9,13,14,15,16,17,18,19,20,21,22,23,24],Marv:[4,12,13,14,15,16,17,18,19,20,21,22,23,24],Loutes:[2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,24],Efepar:[1,2,3,5,7,8,9],'Mirel Amaréa':[1,2,3,4,5,7,8,9],Sersi:[2,3,7,8,13,14],Yndra:[4,5,6,8],Yoral:[1,2,4,9,21],Yrséa:[1,3,4,5],'Professor Talver':[4,5,8,9],Platisa:[3,15,16,17,18,19,20],Liri:[6,7,9,18],Malthar:[8,9,13,14,16,17,18,19,20,21],Gabasteres:[12,13,14,15,16,17,18,19,20,21,22,23]};
const REL=[['Jokara Amaréa','Nestira Amaréa','Irmãs: Peso e Sopro'],['Jokara Amaréa','Loutes','Proteção e mistério'],['Jokara Amaréa','Efepar','Amizade e apoio'],['Nestira Amaréa','Marv','Legado e continuidade'],['Malthar','Gabasteres','Ordem e domínio'],['Jokara Amaréa','Gabasteres','Resistência moral'],['Yoral','Jokara Amaréa','Pai e legado'],['Platisa','Jokara Amaréa','Conhecimento e humanidade']];
const EV=[[1,'As primeiras pedras'],[2,'O Primeiro Voo falha'],[3,'Loutes recebe um nome'],[4,'A profecia de Yndra'],[6,'O livro na caverna'],[7,'A denúncia pública'],[9,'O Cataclisma'],[10,'O primeiro fogo'],[15,'A chegada de Platisa'],[17,'O nome Polar'],[20,'As ruínas revelam a origem'],[22,'O sacrifício de Jokara'],[23,'A última perseguição'],[24,'O Vale']];
const MYS=[['loutes','Quem é Loutes?','Aberto','Uma criança deslocada, ligada ao ciclo e ao tempo; a origem permanece sem explicação.'],['ilhas-baixas','As Ilhas Baixas existiam?','Resolvido','Não. Eram uma mentira institucional usada para ocultar a morte dos exilados.'],['eterea','Por que Etérea caiu?','Parcial','Há sinais físicos e leitura simbólica pelo Peso, mas não uma resposta totalmente fechada.'],['ruinas','Quem construiu as ruínas?','Parcial','Povos da superfície ligados aos ancestrais eterí.'],['sopro','O Sopro é divino ou natural?','Aberto','A narrativa preserva as duas interpretações.']];
const LORE={fauna:[['Nuari',8],['Aranita',2],['Raukhar',5,'assets/lore/fauna/raukhar.webp','Citado no texto apenas como "a Fera" — é a mesma criatura de Guerras de Sangue.'],['Criatura de escamas negras',2],['Ave branca',1],['Criatura segmentada',1]],flora:[['Selnara',3],['Flor-da-névoa',2],['Seda-das-alturas',2],['Musgos florais',2],['Folha colossal',1],['Raízes vivas',7]],alimentos:[['Carne de nuari',3],['Selnara seca',2],['Mel de flor-aérea',2],['Raízes cozidas',2],['Frutas da superfície',3],['Peixe de riacho',4]],conceitos:[['Sopro',12],['Peso',13],['Primeiro Voo',5],['Círculo do Peso',3],['Verbo da Corrente',2],['Ilhas Baixas',4]]};
const NAV=[['Visão geral',[['inicio','Início'],['livros','Livros']]],['História',[['capitulos','Capítulos'],['acontecimentos','Acontecimentos']]],['Pessoas',[['personagens','Personagens'],['relacoes','Relações'],['familias','Famílias'],['organizacoes','Organizações']]],['Mundo',[['mapa','Mapa'],['lugares','Lugares']]],['Lore',[['fauna','Fauna'],['flora','Flora'],['alimentos','Alimentos'],['conceitos','Conceitos e leis']]],['Planejamento',[['misterios','Mistérios'],['continuidade','Continuidade'],['canon','Regras canônicas'],['decisoes','Decisões do autor']]]];
const SAGAS=[
  {id:'ciclo-de-jesed',name:'Ciclo de Jesed',status:'active'},
  {id:'diario-sobrenatural',name:'Diário Sobrenatural',status:'locked'},
  {id:'cronicas-de-belfex',name:'Crônicas de Belfex',status:'locked'},
  {id:'spacetheft',name:'Spacetheft',status:'locked'},
  {id:'viajantes-dimensionais',name:'Viajantes Dimensionais',status:'locked'},
  {id:'misterio-oculto',name:'Mistério Oculto',status:'locked'},
  {id:'a-uniao',name:'A União',status:'locked'}
];
const BOOKS=[
  {id:'ruinas-dos-ceus',order:1,name:'Ruínas dos Céus',status:'active',cover:'assets/covers/ruinas-dos-ceus.webp',visual:'Céu pálido, espirais de vento, ilhas suspensas e luz atravessando nuvens.',synopsis:'Etérea cai dos céus; sobreviventes reconstroem a vida na superfície desconhecida.'},
  {id:'guerras-de-sangue',order:2,name:'Guerras de Sangue',status:'active',cover:'assets/covers/guerras-de-sangue.webp',visual:'Pergaminho escurecido, vermelho seco, fronteiras riscadas, couro e tinta borrada.',synopsis:'Clãs disputam poder, vingança e o trono após a Lei do Portão.'},
  {id:'dinastia-polar',order:3,name:'Dinastia Polar',status:'locked',cover:null,visual:'Pedra azul-escura, ouro envelhecido, anéis concêntricos e peso institucional.'},
  {id:'herdeiros-das-cinzas',order:4,name:'Herdeiros das Cinzas',status:'locked',cover:null,visual:'Cinza fria, brasas discretas, ruínas partidas e marcas de sobrevivência.'},
  {id:'coracao-de-poeira',order:5,name:'Coração de Poeira',status:'locked',cover:null,visual:'Areia, poeira suspensa, vazio, espirais temporais e luz quase extinta.'}
];
const charFiles={'Jokara Amaréa':'jokara','Nestira Amaréa':'nestira','Mirel Amaréa':'mirel-amarea'};
const charImage=name=>`assets/characters/ruinas/${charFiles[name]||S(name)}.webp`;
const placeImage=name=>`assets/places/ruinas/${S(name)}.webp`;
const initials=name=>String(name).split(' ').map(x=>x[0]).filter(Boolean).slice(0,2).join('');
const media=(src,alt,fallback,cls='')=>`<div class="${cls}"><img src="${E(src)}" alt="${E(alt)}" loading="lazy" onerror="this.hidden=true;this.nextElementSibling.hidden=false"><b class="media-fallback" hidden>${E(fallback)}</b></div>`;
const st={route:'',tab:'geral',q:'',sort:'alpha',unused:false,mapPhase:'eterea'},H=(k,t,s='',x='')=>`<div class="head"><div><p class="eyebrow">${E(k)}</p><h1>${E(t)}</h1><p>${E(s)}</p></div>${x}</div>`,go=r=>location.hash='#/'+r,find=(a,id)=>a.find(x=>S(x.n)===id||x.n===id),err=()=>'<div class="empty"><h2>Página não encontrada</h2></div>';
function crumbSegments(){
  const [b,id]=st.route.split('/');
  const baseLabel=(NAV.flatMap(x=>x[1]).find(x=>x[0]===b)?.[1])||'Arquivo';
  const segs=[{label:'Ciclo de Jesed'},{label:'Ruínas dos Céus',go:'inicio'}];
  if(b!=='inicio') segs.push({label:baseLabel,go:id?b:undefined});
  if(id){
    let detail=null;
    if(b==='personagem'){const c=find(D.characters,id);detail=c?.n;}
    else if(b==='capitulo'){const c=D.chapters[Number(id)-1];detail=c?`Capítulo ${c.n}`:null;}
    else if(b==='lugar'){const p=find(D.places,id);detail=p?.n;}
    else if(b==='misterio'){const m=MYS.find(x=>x[0]===id);detail=m?.[1];}
    if(detail) segs.push({label:detail});
  }
  return segs;
}
function nav(){
  const b=st.route.split('/')[0];
  $('#nav').innerHTML=NAV.map(([g,a])=>`<div class="group"><span>${g}</span>${a.map(([r,l,href])=>href?`<a class="navb" href="${href}">${l}</a>`:`<button class="navb ${b===r?'active':''}" data-go="${r}">${l}</button>`).join('')}</div>`).join('');
  const segs=crumbSegments();
  $('#crumb').innerHTML=segs.map((s,i)=>{
    const isLast=i===segs.length-1;
    const inner=(!isLast&&s.go)?`<button data-go="${s.go}">${E(s.label)}</button>`:`<span>${E(s.label)}</span>`;
    return i?`<span class="crumb-sep" aria-hidden="true">›</span>${inner}`:inner;
  }).join('');
}
const ALIASES=[...D.characters.map(c=>({text:c.n,route:`personagem/${S(c.n)}`})),...D.places.map(p=>({text:p.n,route:`lugar/${S(p.n)}`}))]
  .filter(a=>a.text&&a.text.length>2).sort((a,b)=>b.text.length-a.text.length);
const ALIAS_PATTERN=ALIASES.length?new RegExp('('+ALIASES.map(a=>a.text.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','g'):null;
function linkify(text){
  const raw=String(text??'');
  if(!ALIAS_PATTERN) return E(raw);
  let out='',last=0;
  for(const m of raw.matchAll(ALIAS_PATTERN)){
    const start=m.index??0,hit=m[0];
    out+=E(raw.slice(last,start));
    const found=ALIASES.find(a=>a.text===hit);
    out+=found?`<button class="inline-link" data-go="${found.route}">${E(hit)}</button>`:E(hit);
    last=start+hit.length;
  }
  out+=E(raw.slice(last));
  return out;
}
window.RS={D,$,E,S,AP,REL,EV,MYS,LORE,NAV,SAGAS,BOOKS,st,H,go,find,err,nav,charImage,placeImage,initials,media,linkify};
})();