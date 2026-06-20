(()=>{
  if(window.__bookMusicLoaded) return;
  window.__bookMusicLoaded = true;
  if(!document.getElementById('bookMusicStyles')){
    const link = document.createElement('link');
    link.id = 'bookMusicStyles';
    link.rel = 'stylesheet';
    link.href = 'book-music.css';
    document.head.appendChild(link);
  }
  const load = src => new Promise((resolve,reject)=>{
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  load('book-music.config.js').then(()=>load('book-music.js')).catch(()=>{});
})();
