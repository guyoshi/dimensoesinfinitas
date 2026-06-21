(() => {
  const X=window.JESED_GUERRAS_CONTEXT;if(!X)return;const {C,D,BOOK_ID}=X;
  const items=C.asArray(D.themes||D.lore?.themes).map(item=>{const name=item.name||item.title||item.theme,slug=C.stableSlug(item.slug,name);return{...item,id:C.stableId(item.id,'theme',name,BOOK_ID),slug,name:C.text(name),summary:C.text(item.summary||item.description),chapterIds:C.asArray(item.chapterIds||item.chapters),characterIds:C.asArray(item.characterIds||item.characters),placeIds:C.asArray(item.placeIds||item.places),route:`theme/${slug}`,sourceRef:item};});
  C.setCollection(BOOK_ID,'themes',items);
})();
