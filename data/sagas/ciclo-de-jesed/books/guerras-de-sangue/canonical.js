(() => {
  'use strict';
  const D=window.DI_DATA;if(!D)return;
  const finishText=value=>{
    const text=String(value??'').trim();
    if(!/[.…]$/.test(text)||!text.endsWith('…'))return text;
    const clean=text.slice(0,-1).trim();
    const last=Math.max(clean.lastIndexOf('.'),clean.lastIndexOf('!'),clean.lastIndexOf('?'));
    return last>Math.floor(clean.length*.45)?clean.slice(0,last+1):clean+'.';
  };
  for(const character of D.characters||[])character.summary=finishText(character.summary);
  for(const clan of D.clans||[])clan.summary=finishText(clan.summary);
  for(const group of Object.values(D.lore||{}))for(const item of group||[])item.summary=finishText(item.summary);
  const orionus=(D.mysteries||[]).find(item=>item.id==='jesed-mystery-orionus');
  if(orionus)Object.assign(orionus,{status:'Resolvido',answer:'Ylvena pretendia envenenar Alyra com Beijo-da-Noite, mas Orionus bebeu a taça por engano. Daryon destruiu provas, falsificou registros e fabricou a inocência de Ylvena.',publicVersion:'Kaendar acreditou durante ciclos numa versão falsa ou incompleta da morte do soberano.',truthKnownBy:['jesed-character-daryon-vess','jesed-character-ylvena'],revealedInChapterIds:['jesed-chapter-gs-25','jesed-chapter-gs-27','jesed-chapter-gs-28']});
  D.canonicalAudit=D.canonicalAudit||{};D.canonicalAudit.stage=3;
})();
