(() => {
  const normalize = value => String(value || '').trim().toLocaleLowerCase('pt-BR');
  const isRuinas = element => normalize(element?.textContent).includes('ruínas dos céus');

  function openRuinas(event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    window.location.href = 'ruinas.html';
  }

  function prepareBookCard(card){
    if(!isRuinas(card) || card.dataset.ruinasPrepared === 'true') return;
    card.dataset.ruinasPrepared = 'true';
    card.classList.remove('locked');
    card.classList.add('active','ruinas-available');
    card.removeAttribute('data-route');
    card.setAttribute('role','link');
    card.setAttribute('tabindex','0');
    card.setAttribute('aria-label','Abrir Ruínas dos Céus');
    const status = card.querySelector('.book-status');
    const desired = '<span>Livro concluído</span><span>Abrir</span>';
    if(status && status.innerHTML !== desired) status.innerHTML = desired;
  }

  function prepareSelectorCard(card){
    if(!isRuinas(card) || card.dataset.ruinasPrepared === 'true') return;
    card.dataset.ruinasPrepared = 'true';
    card.disabled = false;
    card.classList.remove('locked');
    card.classList.add('active','ruinas-available');
    card.removeAttribute('data-route');
    const state = card.querySelector('small');
    if(state && state.textContent !== 'Disponível') state.textContent = 'Disponível';
  }

  function unlockRuinas(root=document){
    if(root.matches?.('.book-card')) prepareBookCard(root);
    if(root.matches?.('.selector-card')) prepareSelectorCard(root);
    root.querySelectorAll?.('.book-card').forEach(prepareBookCard);
    root.querySelectorAll?.('.selector-card').forEach(prepareSelectorCard);
  }

  document.addEventListener('click', event => {
    const target = event.target.closest('.ruinas-available');
    if(target) openRuinas(event);
  }, true);

  document.addEventListener('keydown', event => {
    if((event.key === 'Enter' || event.key === ' ') && event.target.closest('.ruinas-available')) openRuinas(event);
  }, true);

  let scheduled = false;
  const roots = new Set();
  const observer = new MutationObserver(records => {
    for(const record of records){
      for(const node of record.addedNodes){
        if(node.nodeType === Node.ELEMENT_NODE) roots.add(node);
      }
    }
    if(scheduled) return;
    scheduled = true;
    requestAnimationFrame(()=>{
      scheduled = false;
      for(const root of roots) unlockRuinas(root);
      roots.clear();
    });
  });

  observer.observe(document.documentElement,{childList:true,subtree:true});
  unlockRuinas(document);

  const loadMusic = () => {
    if(document.querySelector('script[src="book-music-loader.js"]')) return;
    const musicLoader = document.createElement('script');
    musicLoader.src = 'book-music-loader.js';
    document.head.appendChild(musicLoader);
  };
  if('requestIdleCallback' in window) requestIdleCallback(loadMusic,{timeout:1200});
  else setTimeout(loadMusic,250);
})();
