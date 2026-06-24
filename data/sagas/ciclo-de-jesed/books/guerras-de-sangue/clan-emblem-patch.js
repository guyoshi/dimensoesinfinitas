(() => {
  'use strict';
  const D = window.DI_DATA; if (!D || !D.clans) return;
  const BASE = 'assets/books/ciclo-de-jesed/guerras-de-sangue/lore/';
  const EMBLEMS = {
    'jesed-clan-polar': BASE + 'cla-polar-emblema-atual.webp',
    'jesed-clan-tondrar': BASE + 'cla-tondrar.webp',
    'jesed-clan-buldar': BASE + 'cla-buldar.webp',
    'jesed-clan-glydar': BASE + 'cla-glydar.webp',
    'jesed-clan-vendrar': BASE + 'cla-vendrar.webp',
    'jesed-clan-cendar': BASE + 'cla-cendar.webp',
    'jesed-clan-urtistar': BASE + 'cla-urtistar.webp'
  };
  for (const clan of D.clans) {
    const src = EMBLEMS[clan.id];
    if (src) clan.emblem = src;
  }
})();
