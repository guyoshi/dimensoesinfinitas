(()=>{
  const D=window.DI_DATA;
  if(!D) return;
  const prefix="assets/characters/";
  for(const c of D.characters){
    if(c.image && c.image.startsWith(prefix) && !c.image.startsWith(prefix+"ruinas/") && !c.image.startsWith(prefix+"guerras-de-sangue/")){
      c.image = prefix+"guerras-de-sangue/"+c.image.slice(prefix.length);
    }
  }
})();
