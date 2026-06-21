(() => {
  const X=window.JESED_GUERRAS_CONTEXT;if(!X)return;const {C,D,BOOK_ID,chapterId}=X;
  C.setCollection(BOOK_ID,'fauna',C.asArray(D.lore?.fauna).map(item=>{const name=item.name||item.title,slug=C.stableSlug(item.slug,name);return{...item,id:C.stableId(item.id,'fauna',name,BOOK_ID),slug,name:C.text(name),summary:C.text(item.summary||item.description),citations:Number(item.citations||0),chapterIds:C.asArray(item.chapterIds).length?C.asArray(item.chapterIds):C.asArray(item.chapterMentions).map(m=>chapterId(m.chapter)),route:`lore-item/fauna/${slug}`,sourceRef:item};}));
})();
