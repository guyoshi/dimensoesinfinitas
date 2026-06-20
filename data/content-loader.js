(()=>{
  const showError = message => {
    const portal = document.getElementById("portal");
    if (portal) portal.innerHTML = `<div style="max-width:680px;margin:12vh auto;padding:28px;border:1px solid #8f5d46;border-radius:18px;background:#241812;color:#f0ddbd;font-family:Georgia,serif"><h1>Não foi possível abrir o arquivo</h1><p>${message}</p><button onclick="location.reload()" style="padding:10px 16px;border-radius:9px;border:1px solid #b8925c;background:#533528;color:#fff">Tentar novamente</button></div>`;
  };
  async function unpack(parts){
    const encoded=(parts||[]).join("");
    if(!encoded) throw new Error("Um dos módulos do site não foi encontrado.");
    const binary=atob(encoded);
    const bytes=new Uint8Array(binary.length);
    for(let i=0;i<binary.length;i++) bytes[i]=binary.charCodeAt(i);
    const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream("gzip"));
    return new Response(stream).text();
  }
  async function loadMusic(){
    const config=document.createElement("script");
    config.src="book-music.config.js";
    config.onload=()=>{
      const music=document.createElement("script");
      music.src="book-music.js";
      document.body.appendChild(music);
    };
    document.body.appendChild(config);
  }
  async function boot(){
    try{
      if(!("DecompressionStream" in window)) throw new Error("Atualize o navegador para carregar esta versão do site.");
      const [adapterSource,styleSource,appSource]=await Promise.all([
        unpack(window.__DI_ADAPTER_PACKED),
        unpack(window.__DI_STYLE_PACKED),
        unpack(window.__DI_APP_PACKED)
      ]);
      (0,eval)(adapterSource);
      const style=document.createElement("style");
      style.id="unifiedSiteStyles";
      style.textContent=styleSource;
      document.head.appendChild(style);
      (0,eval)(appSource);
      window.__DI_ADAPTER_PACKED=[];
      window.__DI_STYLE_PACKED=[];
      window.__DI_APP_PACKED=[];
      if("requestIdleCallback" in window) requestIdleCallback(loadMusic,{timeout:1200});
      else setTimeout(loadMusic,250);
    }catch(error){
      console.error(error);
      showError(error.message||"Erro inesperado.");
    }
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",boot,{once:true});
  else boot();
})();
