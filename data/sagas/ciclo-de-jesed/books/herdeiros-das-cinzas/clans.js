(() => {
  'use strict';
  const D=window.HC_DATA;if(!D||!Array.isArray(D.clans))return;
  // Perfis dos clãs de Herdeiros das Cinzas — ainda não escritos.
  const profiles = {};
  for (const clan of D.clans) {
    if (profiles[clan.id]) clan.profile = { ...clan.profile, ...profiles[clan.id] };
  }
})();
