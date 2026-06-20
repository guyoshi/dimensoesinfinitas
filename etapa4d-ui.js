(()=>{
  const replacements = [
    ['Limite canónico da 4B','Livro concluído'],
    ['O Capítulo 23 é o limite actual.','O Capítulo 29 conclui o livro.'],
    ['Conteúdo canónico até o Capítulo 23','Conteúdo canónico até o Capítulo 29'],
    ['Apenas Guerras de Sangue pode ser aberto nesta etapa.','Ruínas dos Céus e Guerras de Sangue estão disponíveis.'],
    ['23 capítulos escritos','29 capítulos escritos']
  ];

  function replaceText(root){
    if(!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const skip = new Set(['SCRIPT','STYLE','TEXTAREA','INPUT']);
    while(walker.nextNode()){
      const node = walker.currentNode;
      const parent = node.parentElement;
      if(!parent || skip.has(parent.tagName)) continue;
      const original = node.nodeValue;
      if(!original) continue;
      let next = original;
      for(const [from,to] of replacements) next = next.replaceAll(from,to);
      if(next !== original) node.nodeValue = next;
    }
  }

  function updatePerformanceButton(){
    const perf = document.getElementById('performanceToggle');
    if(!perf) return;
    const active = document.body.classList.contains('performance-mode') || localStorage.getItem('di-preset') === 'performance';
    const label = active ? 'Modo desempenho activado' : 'Modo desempenho desactivado';
    perf.classList.toggle('active',active);
    if(perf.getAttribute('aria-pressed') !== String(active)) perf.setAttribute('aria-pressed',String(active));
    if(perf.title !== label) perf.title = label;
    if(perf.getAttribute('aria-label') !== label) perf.setAttribute('aria-label',label);
  }

  function fix(root=document){
    const scope = root.nodeType === Node.ELEMENT_NODE || root.nodeType === Node.DOCUMENT_NODE ? root : document;
    scope.querySelectorAll?.('.status-copy').forEach(node=>{
      if(node.textContent !== 'Etapa 4D') node.textContent = 'Etapa 4D';
    });
    replaceText(scope);
    scope.querySelectorAll?.('[data-route="scene-pack"],.quick-card').forEach(el=>{
      if(el.dataset.route === 'scene-pack' || el.textContent.includes('Pacote de cena')) el.remove();
    });
    updatePerformanceButton();
  }

  let pending = false;
  const roots = new Set();
  const observer = new MutationObserver(records=>{
    for(const record of records){
      for(const node of record.addedNodes){
        if(node.nodeType === Node.ELEMENT_NODE) roots.add(node);
      }
    }
    if(pending) return;
    pending = true;
    requestAnimationFrame(()=>{
      pending = false;
      if(roots.size === 0) fix(document);
      else {
        for(const root of roots) fix(root);
        roots.clear();
      }
    });
  });

  observer.observe(document.documentElement,{subtree:true,childList:true});
  addEventListener('click',event=>{
    if(event.target.closest('#performanceToggle')) setTimeout(updatePerformanceButton,20);
  },true);
  fix(document);
})();
