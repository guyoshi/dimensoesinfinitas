(() => {
  const X=window.JESED_GUERRAS_CONTEXT;if(!X)return;const {C,D,BOOK_ID}=X;
  const items=C.asArray(D.relationships).map((item,index)=>{const fromId=item.fromId||item.from||null,toId=item.toId||item.to||null,label=item.name||item.type||`${fromId||'origem'}-${toId||'destino'}-${index+1}`,slug=C.stableSlug(item.slug,label);return{...item,id:C.stableId(item.id,'relationship',label,BOOK_ID),slug,name:C.text(item.name||item.type||'Relação'),fromId,toId,summary:C.text(item.summary||item.state||item.description),route:`relationships#${slug}`,sourceRef:item};});
  C.setCollection(BOOK_ID,'relationships',items);
})();
