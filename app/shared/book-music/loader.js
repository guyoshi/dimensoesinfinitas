(()=>{
  if(window.__bookMusicLoaded) return;
  window.__bookMusicLoaded = true;
  const current = document.currentScript?.src || new URL('app/shared/book-music/loader.js', document.baseURI).href;
  const base = new URL('./', current);
  if(!document.getElementById('bookMusicStyles')){
    const link = document.createElement('link');
    link.id = 'bookMusicStyles';
    link.rel = 'stylesheet';
    link.href = new URL('styles.css', base).href;
    document.head.appendChild(link);
  }
  const load = file => new Promise((resolve,reject)=>{
    const script = document.createElement('script');
    script.src = new URL(file, base).href;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  load('config.js').then(()=>load('player.js')).catch(()=>{});
})();
