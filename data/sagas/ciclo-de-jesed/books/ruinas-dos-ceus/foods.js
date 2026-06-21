(() => {
  const X=window.JESED_RUINAS_CONTEXT;if(!X)return;const {C,R,BOOK_ID}=X;
  C.setCollection(BOOK_ID,'foods',C.asArray(R.LORE.alimentos).map(item=>{const [name,citations,image,note]=C.asArray(item),slug=C.slugify(name);return{id:C.stableId(null,'food',name,BOOK_ID),slug,name:C.text(name),summary:C.text(note),citations:Number(citations||0),image:image||null,chapterIds:[],route:`alimentos/${slug}`,sourceRef:item};}));
})();
