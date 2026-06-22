(() => {
  const X=window.JESED_POLAR_CONTEXT;if(!X)return;const {C,D,BOOK_ID}=X;
  // Ainda sem personagens registados. Estrutura pronta para receber fichas
  // no mesmo formato usado em Guerras de Sangue (id, slug, name, alias, clanId -> dynastyId, etc.).
  C.setCollection(BOOK_ID,'characters',C.asArray(D.characters));
})();
