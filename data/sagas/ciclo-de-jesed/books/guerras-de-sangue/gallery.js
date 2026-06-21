(() => {
  const X=window.JESED_GUERRAS_CONTEXT;if(!X)return;const {C,D,BOOK_ID}=X,items=[];
  const add=(type,name,image,route,sourceId)=>{if(!image)return;items.push({id:C.stableId(null,'gallery',`${type}-${sourceId||name}`,BOOK_ID),slug:C.slugify(`${type}-${sourceId||name}`),name,type,image,route,sourceId:sourceId||null});};
  C.asArray(D.books).forEach(i=>add('cover',i.name,i.cover,i.status==='active'?`book/${i.id}`:'books',i.id));
  C.asArray(D.characters).forEach(i=>add('character',i.name,i.image,`character/${i.slug}`,i.id));
  C.asArray(D.places).forEach(i=>add('place',i.name,i.image,`place/${i.slug}`,i.id));
  C.asArray(D.chapters).forEach(i=>add('chapter',`Capítulo ${i.number} — ${i.title}`,i.image,`chapter/${i.id}`,i.id));
  C.asArray(D.clans).forEach(i=>add('clan',`Clã ${i.name}`,i.emblem,`clan/${i.slug}`,i.id));
  ['fauna','flora','foods','concepts'].forEach(kind=>C.asArray(D.lore?.[kind]).forEach(i=>add(kind,i.name,i.image,`lore-item/${kind}/${i.slug}`,i.id||i.slug)));
  const seen=new Set();C.setCollection(BOOK_ID,'gallery',items.filter(i=>{const key=`${i.image}|${i.route}`;if(seen.has(key))return false;seen.add(key);return true;}));
})();
