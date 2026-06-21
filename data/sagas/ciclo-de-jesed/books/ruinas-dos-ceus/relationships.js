(() => {
  'use strict';
  const X=window.JESED_RUINAS_CONTEXT;if(!X)return;const {C,R,BOOK_ID,characterId}=X;
  const items=C.asArray(R.REL).map((item,index)=>{
    const [fromName,toName,description]=C.asArray(item),slug=C.slugify(`${fromName}-${toName}-${index+1}`);
    return {id:`jesed-relationship-rdc-${slug}`,slug,name:`${fromName} ↔ ${toName}`,fromId:characterId(fromName),toId:characterId(toName),type:C.text(description||'Relação'),summary:C.text(description),route:`relacoes#${slug}`,sourceRef:item};
  });
  C.setCollection(BOOK_ID,'relationships',items);
})();
