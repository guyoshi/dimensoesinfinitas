(() => {
  'use strict';
  const D=window.DI_DATA;if(!D||!Array.isArray(D.dynasties))return;
  // Perfis das dinastias/casas de Dinastia Polar — ainda não escritos.
  // Quando existir conteúdo, cada entrada de D.dynasties pode receber um
  // objecto "profile" com a mesma forma usada em clans.js de Guerras de Sangue
  // (populationLabel, militaryLabel, origin, territory, culture, economy,
  // wayOfLife, socialStructure, food, strengths, weaknesses, warRole, finalSituation).
  const profiles = {};
  for (const dynasty of D.dynasties) {
    if (profiles[dynasty.id]) dynasty.profile = { ...dynasty.profile, ...profiles[dynasty.id] };
  }
})();
