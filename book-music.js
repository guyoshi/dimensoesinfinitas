(()=>{
  const config = window.BOOK_MUSIC_CONFIG || {};
  const storage = {
    enabled: 'dimensoes.music.enabled',
    volume: 'dimensoes.music.volume'
  };
  const read = (key, fallback) => {
    try { const value = localStorage.getItem(key); return value === null ? fallback : value; }
    catch { return fallback; }
  };
  const write = (key, value) => { try { localStorage.setItem(key, String(value)); } catch {} };
  const clamp = value => Math.max(0, Math.min(1, Number(value) || 0));
  const detectBook = () => document.body.dataset.book || (location.pathname.includes('ruinas') ? 'ruinas-dos-ceus' : 'guerras-de-sangue');

  const audio = new Audio();
  audio.loop = true;
  audio.preload = 'metadata';

  let enabled = read(storage.enabled, 'false') === 'true';
  let volume = clamp(read(storage.volume, '0.35'));
  let lastAudibleVolume = volume > 0 ? volume : 0.35;
  let currentBook = '';
  let currentTrack = null;
  let sourceIndex = 0;
  let ready = false;
  let missing = false;
  let waitingForGesture = false;
  let gestureArmed = false;
  let player;
  let powerButton;
  let muteButton;
  let volumeInput;
  let titleNode;
  let statusNode;

  audio.volume = volume;

  function buildPlayer(){
    player = document.createElement('section');
    player.id = 'bookMusicPlayer';
    player.className = 'book-music-player';
    player.setAttribute('aria-label','Música de fundo do livro');
    player.innerHTML = `
      <button class="music-power" type="button" data-music-power aria-pressed="false" aria-label="Ligar música" title="Ligar música"><span aria-hidden="true">▶</span></button>
      <div class="music-copy"><strong data-music-title>Música do livro</strong><small data-music-status>Música desligada</small></div>
      <button class="music-mute" type="button" data-music-mute aria-label="Silenciar música" title="Silenciar música"><span aria-hidden="true">🔊</span></button>
      <label class="music-volume-label"><span>Volume</span><input data-music-volume type="range" min="0" max="1" step="0.01" value="${volume}" aria-label="Volume da música"></label>`;
    document.body.appendChild(player);
    powerButton = player.querySelector('[data-music-power]');
    muteButton = player.querySelector('[data-music-mute]');
    volumeInput = player.querySelector('[data-music-volume]');
    titleNode = player.querySelector('[data-music-title]');
    statusNode = player.querySelector('[data-music-status]');

    powerButton.addEventListener('click', togglePower);
    muteButton.addEventListener('click', toggleMute);
    volumeInput.addEventListener('input', event => setVolume(event.target.value));
    updateUi();
  }

  function setVolume(value){
    volume = clamp(value);
    if(volume > 0) lastAudibleVolume = volume;
    audio.volume = volume;
    if(volumeInput) volumeInput.value = String(volume);
    write(storage.volume, volume);
    updateUi();
  }

  function toggleMute(){
    setVolume(volume > 0 ? 0 : lastAudibleVolume || 0.35);
  }

  function clearSource(){
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    ready = false;
    waitingForGesture = false;
  }

  function togglePower(){
    if(!currentTrack) return;
    enabled = !enabled;
    write(storage.enabled, enabled);
    if(enabled){
      missing = false;
      sourceIndex = 0;
      if(!audio.getAttribute('src')) setSource();
      else attemptPlay();
    }else{
      waitingForGesture = false;
      audio.pause();
      updateUi();
    }
  }

  function armGestureResume(){
    if(gestureArmed) return;
    gestureArmed = true;
    const resume = () => {
      document.removeEventListener('pointerdown', resume, true);
      document.removeEventListener('keydown', resume, true);
      gestureArmed = false;
      if(enabled) attemptPlay();
    };
    document.addEventListener('pointerdown', resume, {capture:true, once:true});
    document.addEventListener('keydown', resume, {capture:true, once:true});
  }

  function attemptPlay(){
    if(!enabled || missing || !currentTrack || !audio.getAttribute('src')) return;
    waitingForGesture = false;
    const promise = audio.play();
    if(promise && typeof promise.catch === 'function'){
      promise.then(updateUi).catch(() => {
        waitingForGesture = true;
        armGestureResume();
        updateUi();
      });
    }
    updateUi();
  }

  function setSource(){
    ready = false;
    missing = false;
    const file = currentTrack?.files?.[sourceIndex];
    if(!file){
      missing = true;
      updateUi();
      return;
    }
    audio.src = file;
    audio.load();
    updateUi();
  }

  function applyBook(force=false){
    const book = detectBook();
    if(!force && book === currentBook) return;
    currentBook = book;
    currentTrack = config[book] || null;
    sourceIndex = 0;
    missing = false;
    clearSource();
    if(titleNode) titleNode.textContent = currentTrack?.title || 'Música do livro';
    if(enabled && currentTrack) setSource();
    else updateUi();
  }

  function updateUi(){
    if(!player) return;
    const isPlaying = enabled && !audio.paused && !missing;
    player.dataset.state = missing ? 'missing' : isPlaying ? 'playing' : waitingForGesture ? 'waiting' : enabled ? 'loading' : 'off';
    powerButton.disabled = !currentTrack;
    powerButton.setAttribute('aria-pressed', String(enabled));
    powerButton.setAttribute('aria-label', enabled ? 'Desligar música' : 'Ligar música');
    powerButton.title = enabled ? 'Desligar música' : 'Ligar música';
    powerButton.querySelector('span').textContent = isPlaying ? 'Ⅱ' : '▶';
    muteButton.querySelector('span').textContent = volume === 0 ? '🔇' : '🔊';
    muteButton.setAttribute('aria-label', volume === 0 ? 'Restaurar volume' : 'Silenciar música');
    muteButton.title = volume === 0 ? 'Restaurar volume' : 'Silenciar música';
    if(missing) statusNode.textContent = 'Áudio ainda não adicionado';
    else if(waitingForGesture) statusNode.textContent = 'Clique na página para iniciar';
    else if(isPlaying) statusNode.textContent = 'Tocando em loop';
    else if(enabled && !ready) statusNode.textContent = 'Carregando música…';
    else statusNode.textContent = 'Música desligada';
  }

  audio.addEventListener('canplay', () => {
    ready = true;
    missing = false;
    if(enabled) attemptPlay();
    updateUi();
  });

  audio.addEventListener('error', () => {
    if(currentTrack && sourceIndex < currentTrack.files.length - 1){
      sourceIndex += 1;
      setSource();
      return;
    }
    missing = true;
    ready = false;
    audio.pause();
    updateUi();
  });

  audio.addEventListener('play', updateUi);
  audio.addEventListener('pause', updateUi);
  audio.addEventListener('volumechange', updateUi);

  function init(){
    buildPlayer();
    applyBook(true);
    new MutationObserver(() => applyBook()).observe(document.body,{attributes:true,attributeFilter:['data-book']});
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();
