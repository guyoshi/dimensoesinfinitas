(()=>{
  const data=window.DI_DATA;
  if(!data) return;
  let bookMeta=data.bookMeta;
  Object.defineProperty(data,"bookMeta",{
    configurable:true,
    enumerable:true,
    get(){return bookMeta;},
    set(value){
      const ruinas=value?.["ruinas-dos-ceus"];
      if(ruinas){
        ruinas.map="packed:etereaTiny";
        ruinas.mapAvailable=true;
        ruinas.maps=[
          {id:"eterea",name:"Etérea",period:"Antes da Queda",src:"packed:etereaTiny"},
          {id:"nadirion",name:"Nadírion",period:"Depois da Queda",src:"packed:nadirionTiny"}
        ];
      }
      bookMeta=value;
    }
  });
})();
