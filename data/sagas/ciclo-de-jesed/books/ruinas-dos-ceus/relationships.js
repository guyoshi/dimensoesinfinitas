(() => {
  'use strict';
  const X=window.JESED_RUINAS_CONTEXT;if(!X)return;const {C,BOOK_ID,characterId}=X;
  const source=window.RUINAS_SOCIAL?.relationships||[];
  const items=C.asArray(source).map((item,index)=>{
    const label=item.type||`${item.from||'Origem'} ↔ ${item.to||'Destino'}`;
    const slug=C.stableSlug(item.slug,`${item.from}-${item.to}-${index+1}`);
    return {...item,id:C.stableId(item.id,'relationship',label,BOOK_ID),slug,name:`${item.from} ↔ ${item.to}`,fromId:characterId(item.from),toId:characterId(item.to),summary:C.text(item.description||item.summary),route:`relacoes#${slug}`,sourceRef:item};
  });
  C.setCollection(BOOK_ID,'relationships',items);
})();
