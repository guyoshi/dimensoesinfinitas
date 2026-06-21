(() => {
  'use strict';
  const X=window.JESED_RUINAS_CONTEXT;if(!X)return;const {C,D,R,BOOK_ID,chapterId}=X;
  const items=C.asArray(D.characters).map(item=>{
    const name=C.text(item.n??item.name),slug=C.stableSlug(item.slug,name);
    Object.assign(item,{id:item.id||C.stableId(null,'character',name,BOOK_ID),slug,name,subtitle:C.text(item.a??item.subtitle),summary:C.text(item.s??item.summary),status:C.text(item.st??item.status),image:item.image||R.charImage(name)});
    return {...item,chapterIds:C.asArray(R.AP[name]).map(chapterId),placeIds:C.asArray(item.placeIds),route:`personagem/${slug}`,sourceRef:item};
  });
  C.setCollection(BOOK_ID,'characters',items);
})();
