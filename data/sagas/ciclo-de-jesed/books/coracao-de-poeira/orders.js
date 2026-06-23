(() => {
  'use strict';
  const D=window.CP_DATA;if(!D||!Array.isArray(D.orders))return;
  // Perfis das ordens de Coração de Poeira — ainda não escritos.
  const profiles = {};
  for (const order of D.orders) {
    if (profiles[order.id]) order.profile = { ...order.profile, ...profiles[order.id] };
  }
})();
