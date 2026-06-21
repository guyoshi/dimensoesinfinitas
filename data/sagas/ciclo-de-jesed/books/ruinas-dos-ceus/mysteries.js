(() => {
  'use strict';
  const X=window.JESED_RUINAS_CONTEXT;if(!X)return;const {C,R,BOOK_ID}=X;
  const items=C.asArray(R.MYS).map(item=>{
    const [legacySlug,name,status,answer]=C.asArray(item),slug=C.stableSlug(legacySlug,name);
    return {id:`jesed-mystery-rdc-${slug}`,slug,name:C.text(name),status:C.text(status),summary:C.text(answer),answer:C.text(answer),chapterIds:[],characterIds:[],placeIds:[],route:`misterio/${slug}`,sourceRef:item};
  });
  C.setCollection(BOOK_ID,'mysteries',items);
})();
