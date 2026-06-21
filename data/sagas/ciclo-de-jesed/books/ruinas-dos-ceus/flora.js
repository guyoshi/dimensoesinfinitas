(() => {
  const X=window.JESED_RUINAS_CONTEXT;if(!X)return;const {C,R,BOOK_ID}=X;
  C.setCollection(BOOK_ID,'flora',C.asArray(R.LORE.flora).map(item=>{const [name,citations,image,note]=C.asArray(item),slug=C.slugify(name);return{id:C.stableId(null,'flora',name,BOOK_ID),slug,name:C.text(name),summary:C.text(note),citations:Number(citations||0),image:image||null,chapterIds:[],route:`flora/${slug}`,sourceRef:item};}));
})();
