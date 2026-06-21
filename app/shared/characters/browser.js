(()=>{
  'use strict';
  const validViews=new Set(['grid','list']);
  const normalize=(value,fallback='grid')=>validViews.has(value)?value:fallback;
  const shortText=(value,max=180)=>{
    const text=String(value??'').replace(/\s+/g,' ').trim();
    if(text.length<=max)return text;
    const cut=text.slice(0,max-1),last=cut.lastIndexOf(' ');
    return `${cut.slice(0,last>max*.58?last:cut.length).trim()}…`;
  };
  const searchableText=(character,extra=[])=>[
    character?.name,character?.n,character?.subtitle,character?.alias,character?.a,
    character?.summary,character?.s,character?.status,character?.st,
    ...(Array.isArray(extra)?extra:[extra])
  ].filter(Boolean).join(' ').toLocaleLowerCase('pt-BR');
  const matches=(character,query,extra=[])=>{
    const q=String(query??'').trim().toLocaleLowerCase('pt-BR');
    return !q||searchableText(character,extra).includes(q);
  };
  const storageKey=bookId=>`di-${bookId==='guerras-de-sangue'?'guerras':'ruinas'}-character-view`;
  const readView=(bookId,legacyKey)=>{
    try{return normalize(localStorage.getItem(storageKey(bookId))||(legacyKey?localStorage.getItem(legacyKey):null));}catch{return 'grid';}
  };
  const writeView=(bookId,value)=>{const view=normalize(value);try{localStorage.setItem(storageKey(bookId),view);}catch{}return view;};
  window.DI_CHARACTER_BROWSER={normalize,shortText,matches,storageKey,readView,writeView};
})();
