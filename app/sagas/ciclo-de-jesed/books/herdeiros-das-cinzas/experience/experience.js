(()=>{
  const X=window.DIExperience;if(!X)return;
  const P='je-ashes-';
  const defaults={ash:true,embers:true,shadows:true,lights:true,smoke:true,'ash-front':true,'ash-density':68,'motion-intensity':44,'effect-opacity':88};
  const getBool=k=>X.bool(P+k,defaults[k]),getNum=(k,min=0,max=100)=>X.num(P+k,defaults[k],min,max);
  Object.entries(defaults).forEach(([k,v])=>{if(X.storage.get(P+k)===null)X.storage.set(P+k,typeof v==='boolean'?(v?'1':'0'):v)});
  if(X.weakDevice&&X.storage.get(P+'auto-reduced')!=='0'){if(X.storage.get(P+'ash-density')===String(defaults['ash-density']))X.storage.set(P+'ash-density','24')}

  /* ---- Cinzas a cair (duas camadas: atrás e à frente) ---- */
  const back=document.createElement('canvas'),front=document.createElement('canvas');
  back.id='hcAshCanvas';front.id='hcAshCanvasFront';
  back.setAttribute('aria-hidden','true');front.setAttribute('aria-hidden','true');
  document.body.prepend(front);document.body.prepend(back);
  const layers=[{canvas:back,ctx:back.getContext('2d'),front:false,particles:[]},{canvas:front,ctx:front.getContext('2d'),front:true,particles:[]}];
  let running=true,last=performance.now();
  function resize(){const dpr=Math.min(devicePixelRatio||1,1.6);for(const layer of layers){layer.canvas.width=Math.round(innerWidth*dpr);layer.canvas.height=Math.round(innerHeight*dpr);layer.canvas.style.width=innerWidth+'px';layer.canvas.style.height=innerHeight+'px';layer.ctx.setTransform(dpr,0,0,dpr,0,0)}}
  addEventListener('resize',resize,{passive:true});resize();
  function maxParticles(isFront){let density=getNum('ash-density');if(X.weakDevice)density*=.6;if(X.reduced)density*=.35;return Math.round(density*(isFront?.28:1.0))}
  function spawn(layer){
    const motion=getNum('motion-intensity')/100;
    const isEmber=Math.random()<.08;
    layer.particles.push({
      x:Math.random()*innerWidth,y:-10-Math.random()*30,life:0,
      vy:(.12+Math.random()*.22)*(.5+motion)*(isEmber?.6:1),
      vx:(-.08+Math.random()*.16)*(isEmber?.5:1),
      size:(layer.front?1.8:1.2)+Math.random()*(layer.front?3.2:2.8),
      max:14000+Math.random()*18000,
      alpha:(layer.front?.15:.12)+Math.random()*.28,
      sway:Math.random()*Math.PI*2,
      isEmber,
      rotation:Math.random()*Math.PI*2,
      rotSpeed:(Math.random()-.5)*.002
    });
  }
  function drawParticle(targetCtx,p,dt){
    p.life+=dt;const t=p.life/p.max;
    p.x+=(p.vx+Math.sin(p.life*.0004+p.sway)*.05)*dt/16;
    p.y+=p.vy*dt/16;
    p.rotation+=p.rotSpeed*dt;
    const fade=Math.sin(Math.PI*Math.min(1,t));
    targetCtx.save();targetCtx.globalAlpha=Math.max(0,p.alpha*fade);
    if(p.isEmber){
      // Ponto de brasa laranja
      const g=targetCtx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*3.5);
      g.addColorStop(0,'rgba(207,115,85,.95)');g.addColorStop(.5,'rgba(165,75,55,.6)');g.addColorStop(1,'rgba(165,75,55,0)');
      targetCtx.fillStyle=g;targetCtx.beginPath();targetCtx.arc(p.x,p.y,p.size*3.5,0,Math.PI*2);targetCtx.fill();
    } else {
      // Floco de cinza irregular
      const g=targetCtx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size*4);
      const grey=`rgba(${190+Math.round(Math.random()*30)},${185+Math.round(Math.random()*25)},${180+Math.round(Math.random()*20)},.9)`;
      g.addColorStop(0,grey);g.addColorStop(1,'rgba(180,175,170,0)');
      targetCtx.fillStyle=g;targetCtx.beginPath();targetCtx.arc(p.x,p.y,p.size*4,0,Math.PI*2);targetCtx.fill();
    }
    targetCtx.restore();
    return t>=1||p.y>innerHeight+40;
  }
  function active(){return !document.hidden&&!document.body.classList.contains('performance-mode')&&!document.body.classList.contains('no-particles')&&getBool('ash')}
  function frame(now){
    const dt=Math.min(40,now-last);last=now;
    const frontOn=getBool('ash-front');
    if(active()&&running){
      for(const layer of layers){
        const ctx=layer.ctx;ctx.clearRect(0,0,innerWidth,innerHeight);
        if(layer.front&&!frontOn){layer.particles.length=0;continue}
        const max=maxParticles(layer.front);
        while(layer.particles.length<max)spawn(layer);
        layer.particles=layer.particles.filter(p=>!drawParticle(ctx,p,dt));
      }
    } else {
      for(const layer of layers){if(layer.particles.length){layer.ctx.clearRect(0,0,innerWidth,innerHeight);layer.particles.length=0}}
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
  document.addEventListener('visibilitychange',()=>{last=performance.now()});

  /* ---- Brasas distantes ---- */
  const lights=document.createElement('div');
  lights.id='hcEmberLights';lights.setAttribute('aria-hidden','true');
  document.body.prepend(lights);
  function buildLights(){
    lights.innerHTML='';
    const count=X.mobile?7:14;
    for(let i=0;i<count;i++){
      const dot=document.createElement('span');
      dot.style.left=`${4+Math.random()*92}%`;
      dot.style.top=`${52+Math.random()*38}%`;
      dot.style.setProperty('--hc-light-duration',`${9+Math.random()*10}s`);
      dot.style.setProperty('--hc-light-delay',`${-Math.random()*14}s`);
      dot.style.setProperty('--hc-light-size',`${1.2+Math.random()*1.6}px`);
      lights.appendChild(dot);
    }
  }
  buildLights();

  /* ---- Fumo de ruínas ---- */
  const smoke=document.createElement('div');
  smoke.id='hcSmoke';smoke.setAttribute('aria-hidden','true');
  document.body.prepend(smoke);

  function applyVisualSettings(){
    document.body.style.setProperty('--hc-effect-opacity',getNum('effect-opacity')/100);
    lights.style.display=getBool('lights')&&!document.body.classList.contains('performance-mode')?'block':'none';
    smoke.style.display=getBool('smoke')&&!document.body.classList.contains('performance-mode')?'block':'none';
    document.body.classList.toggle('hc-no-shadow-drift',!getBool('shadows'));
    for(const layer of layers)layer.particles.length=0;
  }

  const settingsHost=document.getElementById('settingsContent');
  function injectSettings(){
    if(!settingsHost||settingsHost.querySelector('[data-ashes-experience-settings]'))return;
    settingsHost.insertAdjacentHTML('beforeend',`<section class="experience-settings-section" data-ashes-experience-settings><h3>Atmosfera de Herdeiros das Cinzas</h3><p class="experience-settings-note">Controlos específicos deste livro.</p>${X.makeToggle({key:'ash',prefix:P,label:'Cinzas a cair',description:'Flocos de cinza e brasas a descer lentamente.',value:getBool('ash')})}${X.makeToggle({key:'shadows',prefix:P,label:'Sombras frias',description:'Sombras a deslocar-se lentamente sobre as ruínas.',value:getBool('shadows')})}${X.makeToggle({key:'lights',prefix:P,label:'Brasas distantes',description:'Pontos de brasa a acender e apagar ao fundo.',value:getBool('lights')})}${X.makeToggle({key:'smoke',prefix:P,label:'Fumo de ruínas',description:'Névoa fria de ruínas e escombros.',value:getBool('smoke')})}${X.makeToggle({key:'ash-front',prefix:P,label:'Cinzas à frente',description:'Permite que parte das cinzas passe por cima do conteúdo.',value:getBool('ash-front')})}${X.makeRange({key:'ash-density',prefix:P,label:'Densidade das cinzas',description:'Quantidade de flocos e brasas.',value:getNum('ash-density'),min:10,max:100})}${X.makeRange({key:'motion-intensity',prefix:P,label:'Intensidade do movimento',description:'Velocidade geral da queda.',value:getNum('motion-intensity'),min:0,max:100})}${X.makeRange({key:'effect-opacity',prefix:P,label:'Opacidade dos efeitos',description:'Visibilidade geral da atmosfera.',value:getNum('effect-opacity'),min:20,max:100})}</section>`);
  }
  if(settingsHost){X.attachSettings(settingsHost,()=>{X.storage.set(P+'customized','1');applyVisualSettings();setTimeout(injectSettings)});new MutationObserver(injectSettings).observe(settingsHost,{childList:true})}

  const profileValues={
    full:{ash:1,shadows:1,lights:1,smoke:1,'ash-front':1,'ash-density':86,'motion-intensity':54,'effect-opacity':100},
    normal:{ash:1,shadows:1,lights:1,smoke:1,'ash-front':1,'ash-density':68,'motion-intensity':44,'effect-opacity':88},
    performance:{ash:0,shadows:0,lights:0,smoke:0,'ash-front':0,'ash-density':0,'motion-intensity':0,'effect-opacity':28}
  };
  function applyProfile(name){const values=profileValues[name];if(!values)return;Object.entries(values).forEach(([k,v])=>X.storage.set(P+k,v));X.storage.set(P+'customized','0');setTimeout(applyVisualSettings,60)}
  document.addEventListener('click',e=>{const p=e.target.closest('[data-preset]')?.dataset.preset;if(p)applyProfile(p)});
  X.observePerformance(()=>applyVisualSettings());

  /* ---- Modo contemplativo ---- */
  let shell=null,cCanvas=null,cCtx=null,cParticles=[];
  function createContemplative(){
    if(shell)return shell;
    shell=document.createElement('section');
    shell.className='contemplative-shell hc-contemplative';shell.id='hcContemplative';shell.setAttribute('aria-hidden','true');
    shell.innerHTML='<div class="contemplative-scene"><canvas id="hcContemplativeCanvas" aria-hidden="true"></canvas><button class="contemplative-back" type="button" data-close-contemplative title="Voltar à página">← Voltar</button><button class="contemplative-music-action" type="button" data-contemplative-music title="Ligar ou desligar música">♪ Música</button><div class="contemplative-caption">Herdeiros das Cinzas · silêncio sobre as ruínas</div></div>';
    document.body.append(shell);
    cCanvas=shell.querySelector('canvas');cCtx=cCanvas.getContext('2d');resizeContemplative();
    return shell;
  }
  function resizeContemplative(){if(!cCanvas)return;const dpr=Math.min(devicePixelRatio||1,1.5);cCanvas.width=innerWidth*dpr;cCanvas.height=innerHeight*dpr;cCtx.setTransform(dpr,0,0,dpr,0,0)}
  addEventListener('resize',resizeContemplative,{passive:true});
  function drawContemplative(){
    if(!shell?.classList.contains('open')){requestAnimationFrame(drawContemplative);return}
    cCtx.clearRect(0,0,innerWidth,innerHeight);
    while(cParticles.length<Math.max(8,Math.round(maxParticles(false)*.45))){
      cParticles.push({x:Math.random()*innerWidth,y:-10,vy:.08+Math.random()*.18,vx:-.04+Math.random()*.08,size:.8+Math.random()*2,life:0,max:18000+Math.random()*14000,alpha:.05+Math.random()*.14,sway:Math.random()*6,isEmber:Math.random()<.1,rotation:Math.random()*Math.PI*2,rotSpeed:(Math.random()-.5)*.002});
    }
    cParticles=cParticles.filter(p=>!drawParticle(cCtx,p,16));
    requestAnimationFrame(drawContemplative);
  }
  requestAnimationFrame(drawContemplative);
  function openContemplative(){const s=createContemplative();s.classList.add('open');s.setAttribute('aria-hidden','false');document.body.classList.add('contemplative-active');s.querySelector('.contemplative-back')?.focus()}
  function closeContemplative(){if(!shell)return;shell.classList.remove('open');shell.setAttribute('aria-hidden','true');document.body.classList.remove('contemplative-active');cParticles.length=0;document.querySelector('[data-contemplative="ashes"]')?.focus()}
  document.addEventListener('click',e=>{
    if(e.target.closest('[data-contemplative="ashes"]'))openContemplative();
    if(e.target.closest('[data-close-contemplative]'))closeContemplative();
    if(e.target.closest('[data-contemplative-music]'))document.querySelector('[data-music-power]')?.click();
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('contemplative-active')){e.preventDefault();closeContemplative()}});

  injectSettings();applyVisualSettings();
})();
