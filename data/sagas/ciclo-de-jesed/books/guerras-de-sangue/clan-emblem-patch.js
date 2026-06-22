(() => {
  'use strict';
  const D = window.DI_DATA; if (!D || !D.clans) return;
  const BASE = 'assets/books/ciclo-de-jesed/guerras-de-sangue/lore/';
  const EMBLEMS = {
    'jesed-clan-polar': BASE + 'Clã Polar Emblema atual.png',
    'jesed-clan-tondrar': BASE + 'Clã Tondrar.png',
    'jesed-clan-buldar': BASE + 'Clã Buldar.png',
    'jesed-clan-glydar': BASE + 'Clã Glydar.png',
    'jesed-clan-vendrar': BASE + 'Clã Vendrar.png',
    'jesed-clan-cendar': BASE + 'Clã Cendar.png',
    'jesed-clan-urtistar': BASE + 'Clã Urtistar.png'
  };
  for (const clan of D.clans) {
    const src = EMBLEMS[clan.id];
    if (src) clan.emblem = src;
  }
})();
