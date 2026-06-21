(() => {
  'use strict';
  const X=window.JESED_RUINAS_CONTEXT;if(!X)return;const {C,D,R,BOOK_ID,bookSource}=X,items=[];
  const add=(type,name,image,route,sourceId)=>{if(!image)return;const slug=C.slugify(`${type}-${sourceId||name}`);items.push({id:`jesed-gallery-rdc-${slug}`,slug,name,type,image,route,sourceId:sourceId||null});};
  add('cover',bookSource.name||'Ruínas dos Céus',bookSource.cover,'inicio',BOOK_ID);
  C.asArray(D.chapters).forEach(i=>add('chapter',`Capítulo ${i.number??i.n} — ${i.title??i.t}`,i.image||i.img,`capitulo/${i.number??i.n}`,i.id));
  C.asArray(D.characters).forEach(i=>add('character',i.name??i.n,i.image||R.charImage(i.name??i.n),`personagem/${i.slug||C.slugify(i.name??i.n)}`,i.id));
  C.asArray(D.places).forEach(i=>add('place',i.name??i.n,i.image||R.placeImage(i.name??i.n),`lugar/${i.slug||C.slugify(i.name??i.n)}`,i.id));
  ['fauna','flora','alimentos','conceitos'].forEach(kind=>C.asArray(R.LORE[kind]).forEach(i=>{const [name,,image]=C.asArray(i);add(kind,name,image,`${kind}/${C.slugify(name)}`,C.stableId(null,kind,name,BOOK_ID));}));
  const seen=new Set();C.setCollection(BOOK_ID,'gallery',items.filter(i=>{const key=`${i.image}|${i.route}`;if(seen.has(key))return false;seen.add(key);return true;}));
})();
