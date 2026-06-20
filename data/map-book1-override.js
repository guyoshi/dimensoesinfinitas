(()=>{
  const data=window.DI_DATA;
  if(!data) return;
  const mapUrl=id=>{
    const encoded=(window.__DI_MAP_PARTS?.[id]||[]).join("");
    return encoded?`data:image/webp;base64,${encoded}`:"";
  };
  const eterea=mapUrl("etereaTiny");
  const nadirion=mapUrl("nadirionTiny");
  let bookMeta=data.bookMeta;
  Object.defineProperty(data,"bookMeta",{
    configurable:true,
    enumerable:true,
    get(){return bookMeta;},
    set(value){
      const ruinas=value?.["ruinas-dos-ceus"];
      if(ruinas){
        ruinas.map=eterea;
        ruinas.mapAvailable=Boolean(eterea);
        ruinas.maps=[
          {id:"eterea",name:"Etérea",period:"Antes da Queda",src:eterea},
          {id:"nadirion",name:"Nadírion",period:"Depois da Queda",src:nadirion}
        ].filter(map=>map.src);
      }
      bookMeta=value;
    }
  });
})();
