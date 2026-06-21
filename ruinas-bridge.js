(() => {
  const loadMusic = () => {
    if (document.querySelector('script[src="book-music-loader.js"]')) return;
    const musicLoader = document.createElement('script');
    musicLoader.src = 'book-music-loader.js';
    document.head.appendChild(musicLoader);
  };
  if ('requestIdleCallback' in window) requestIdleCallback(loadMusic, { timeout: 1200 });
  else setTimeout(loadMusic, 250);
})();
