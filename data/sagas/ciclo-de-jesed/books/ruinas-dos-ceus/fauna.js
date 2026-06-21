(() => {
  const X=window.JESED_RUINAS_CONTEXT;if(!X)return;const {C,R,BOOK_ID}=X;
  C.setCollection(BOOK_ID,'fauna',C.asArray(R.LORE.fauna).map(item=>{const [name,citations,image,note]=C.asArray(item),isRhaukar=name==='Rhaukar',slug=isRhaukar?'raukhar':C.slugify(name);return{id:isRhaukar?'jesed-fauna-raukhar':C.stableId(null,'fauna',name,BOOK_ID),slug,name:C.text(name),aliases:isRhaukar?['Raukhar','a Fera','Fera de olhos amarelos']:[],summary:C.text(note),citations:Number(citations||0),image:image||null,chapterIds:[],route:`fauna/${slug}`,sourceRef:item};}));
})();
