const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const dataBase = 'data/sagas/ciclo-de-jesed/books';
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'data/common/entity-manifest.json'), 'utf8'));
const canonicalAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/canonical-etapa-3.json'), 'utf8'));
const timelineAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/timeline-etapa-4.json'), 'utf8'));
const placesAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/places-etapa-5.json'), 'utf8'));
const errors = [], warnings = [];
function context(){const c={console,CustomEvent:function(t,i){this.type=t;this.detail=i?.detail},dispatchEvent:()=>{},document:{querySelector:()=>null}};c.window=c;vm.createContext(c);return c;}
function load(c,files){for(const relative of files){const absolute=path.join(root,relative);if(!fs.existsSync(absolute)){errors.push(`Arquivo ausente: ${relative}`);continue;}vm.runInContext(fs.readFileSync(absolute,'utf8'),c,{filename:relative});}}
const common='data/common/schema.js';
const collections=['chapters','characters','timeline','relationships','places','mysteries','themes','fauna','flora','foods','concepts','gallery'];
const guerrasFiles=[`${dataBase}/guerras-de-sangue/runtime.js`,common,`${dataBase}/guerras-de-sangue/book.js`,`${dataBase}/guerras-de-sangue/canonical.js`,...collections.map(x=>`${dataBase}/guerras-de-sangue/${x}.js`),`${dataBase}/guerras-de-sangue/index.js`];
const ruinasFiles=[`${dataBase}/ruinas-dos-ceus/runtime.js`,`${dataBase}/ruinas-dos-ceus/trajectory.js`,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/base.js',common,`${dataBase}/ruinas-dos-ceus/book.js`,`${dataBase}/ruinas-dos-ceus/canonical.js`,...collections.map(x=>`${dataBase}/ruinas-dos-ceus/${x}.js`),`${dataBase}/ruinas-dos-ceus/index.js`];
const gc=context(),rc=context();load(gc,guerrasFiles);load(rc,ruinasFiles);
const models={'guerras-de-sangue':gc.DI_DATA?.common,'ruinas-dos-ceus':rc.RUINAS_DATA?.common};
for(const [bookId,model] of Object.entries(models)){
  if(!model){errors.push(`${bookId}: modelo comum ausente.`);continue;}
  for(const col of collections)if(!Array.isArray(model.entities?.[col]))errors.push(`${bookId}: coleção ausente (${col}).`);
  for(const [col,items] of Object.entries(model.entities||{})){
    const ids=new Set(),slugs=new Set();
    for(const item of items){
      if(!item.id)errors.push(`${bookId}/${col}: sem ID.`);else if(ids.has(item.id))errors.push(`${bookId}/${col}: ID duplicado ${item.id}.`);else ids.add(item.id);
      if(!item.slug)errors.push(`${bookId}/${col}: sem slug.`);else if(slugs.has(item.slug))errors.push(`${bookId}/${col}: slug duplicado ${item.slug}.`);else slugs.add(item.slug);
    }
  }
  if(model.warnings?.length)warnings.push(...model.warnings.map(w=>`${bookId}: ${w}`));
}
const rdc=models['ruinas-dos-ceus'];
const expectedTitles={11:'Sobrevivência',12:'O Homem no Riacho',15:'O Peso do Silêncio',21:'A Leveza e o Peso',24:'O Vale'};
for(const [number,title] of Object.entries(expectedTitles)){const ch=rdc.entities.chapters.find(x=>x.number===Number(number));if(ch?.title!==title)errors.push(`Ruínas: capítulo ${number} deveria ser “${title}”, encontrado “${ch?.title}”.`);}
const rhaukar=rdc.entities.fauna.find(x=>x.id==='jesed-fauna-raukhar');if(!rhaukar)errors.push('Ruínas: ID histórico do Rhaukar desapareceu.');else{if(rhaukar.name!=='Rhaukar')errors.push(`Ruínas: nome canônico do Rhaukar incorreto (${rhaukar.name}).`);if(rhaukar.slug!=='raukhar')errors.push('Ruínas: slug histórico raukhar não foi preservado.');}
const gs=gc.DI_DATA;if(gs){const o=gs.mysteries?.find(x=>x.id==='jesed-mystery-orionus');if(!o?.answer?.includes('Ylvena pretendia envenenar Alyra'))errors.push('Guerras: verdade da morte de Orionus não está preservada.');}
const allowedRelations=new Set(['ocorre','citado','recordado','revelado','investigado','consequencia']);
function validateTimeline(bookId,model,expectedCount){
  const items=model?.entities?.timeline||[];
  if(items.length!==expectedCount)errors.push(`${bookId}: esperados ${expectedCount} acontecimentos na Linha do Tempo, encontrados ${items.length}.`);
  const ids=new Set(items.map(x=>x.id));
  let previous=-Infinity;
  for(const event of items){
    if(!event.dateLabel)errors.push(`${bookId}: data visível ausente em ${event.id}.`);
    if(!Number.isFinite(Number(event.sortKey)))errors.push(`${bookId}: sortKey inválido em ${event.id}.`);
    if(Number(event.sortKey)<previous)errors.push(`${bookId}: ordem cronológica quebrada em ${event.id}.`);
    previous=Number(event.sortKey);
    if(!event.summary||!event.context||!event.cause||!Array.isArray(event.consequences)||!event.consequences.length)errors.push(`${bookId}: página individual incompleta em ${event.id}.`);
    for(const link of event.chapterLinks||[]){if(!allowedRelations.has(link.relation))errors.push(`${bookId}: relação de capítulo inválida (${link.relation}) em ${event.id}.`);}
    for(const id of event.relatedEventIds||[]){if(!ids.has(id))errors.push(`${bookId}: evento relacionado ausente (${id}) em ${event.id}.`);}
    if((event.relatedEventIds||[]).length!==new Set(event.relatedEventIds||[]).size)errors.push(`${bookId}: acontecimento relacionado duplicado em ${event.id}.`);
  }
}
validateTimeline('guerras-de-sangue',models['guerras-de-sangue'],timelineAudit.counts['guerras-de-sangue']);
validateTimeline('ruinas-dos-ceus',models['ruinas-dos-ceus'],timelineAudit.counts['ruinas-dos-ceus']);
const gsTimeline=models['guerras-de-sangue'].entities.timeline,rdTimeline=models['ruinas-dos-ceus'].entities.timeline;
const orionus=gsTimeline.find(x=>x.id==='jesed-event-death-orionus');
if(!orionus?.truth?.includes('O veneno era destinado a Alyra'))errors.push('Linha do Tempo: verdade da morte de Orionus incorreta ou ausente.');
if(!orionus?.chapterLinks?.some(x=>x.relation==='revelado'&&x.chapterId==='jesed-chapter-gs-25'))errors.push('Linha do Tempo: revelação da morte de Orionus no Capítulo 25 não registrada.');
const queda=rdTimeline.find(x=>x.id==='jesed-event-rdc-o-cataclisma');if(queda?.sortKey!==0||queda?.date?.era!=='Queda')errors.push('Ruínas: a Queda deve ser o marco cronológico zero.');
const requiredLegacyGS=['morte-de-orionus',...Array.from({length:23},(_,i)=>`acontecimentos-capitulo-${String(i+1).padStart(2,'0')}`)];
const requiredLegacyRDC=['as-primeiras-pedras','o-primeiro-voo-falha','o-cataclisma','primeiro-abrigo-incendiado','reencontro-das-irmas','a-chegada-de-platisa','o-nome-polar','as-ruinas-revelam-a-origem','o-sacrificio-de-jokara','a-ultima-perseguicao','o-vale'];
function validatesLegacy(items,slugs,label){for(const slug of slugs)if(!items.some(x=>x.slug===slug||(x.legacySlugs||[]).includes(slug)))errors.push(`${label}: slug histórico não resolvido (${slug}).`);}
validatesLegacy(gsTimeline,requiredLegacyGS,'Guerras');validatesLegacy(rdTimeline,requiredLegacyRDC,'Ruínas');
function validatePlaces(bookId,model,audit){
  const places=model?.entities?.places||[],chapters=new Set((model?.entities?.chapters||[]).map(x=>x.id)),characters=new Set((model?.entities?.characters||[]).map(x=>x.id)),events=new Set((model?.entities?.timeline||[]).map(x=>x.id));
  if(places.length!==audit.places)errors.push(`${bookId}: esperados ${audit.places} lugares na Etapa 5, encontrados ${places.length}.`);
  const populationCount=places.filter(place=>place.population).length;
  if(populationCount!==audit.populationFields)errors.push(`${bookId}: esperados ${audit.populationFields} campos de população, encontrados ${populationCount}.`);
  const sceneCount=places.reduce((total,place)=>total+(place.chapterScenes||[]).length,0);
  if(sceneCount!==audit.chapterScenes)errors.push(`${bookId}: esperadas ${audit.chapterScenes} cenas localizadas, encontradas ${sceneCount}.`);
  for(const place of places){
    if(place.state==='Activa'||place.state==='Ativa')errors.push(`${bookId}: campo genérico Estado: Activa ainda existe em ${place.id}.`);
    if(!place.summary||!Array.isArray(place.description)||place.description.length<2)errors.push(`${bookId}: descrição aprofundada incompleta em ${place.id}.`);
    if(!place.region||!place.location||!place.narrativeFunction||!place.architecture||!place.atmosphere)errors.push(`${bookId}: ficha estrutural incompleta em ${place.id}.`);
    for(const key of ['resources','dangers','culture','chapterScenes','characterIds','eventIds'])if(!Array.isArray(place[key]))errors.push(`${bookId}: campo ${key} não é uma lista em ${place.id}.`);
    if(place.population&&!place.population.label)errors.push(`${bookId}: população sem apresentação legível em ${place.id}.`);
    for(const scene of place.chapterScenes||[]){
      if(!chapters.has(scene.chapterId))errors.push(`${bookId}: capítulo inexistente ${scene.chapterId} ligado a ${place.id}.`);
      if(!scene.text)errors.push(`${bookId}: cena sem descrição específica em ${place.id}.`);
      for(const id of scene.characterIds||[])if(!characters.has(id))errors.push(`${bookId}: personagem inexistente ${id} ligado à cena de ${place.id}.`);
    }
    for(const id of place.characterIds||[])if(!characters.has(id))errors.push(`${bookId}: personagem inexistente ${id} ligado a ${place.id}.`);
    for(const id of place.eventIds||[])if(!events.has(id))errors.push(`${bookId}: acontecimento inexistente ${id} ligado a ${place.id}.`);
  }
}
validatePlaces('guerras-de-sangue',models['guerras-de-sangue'],placesAudit.books['guerras-de-sangue']);
validatePlaces('ruinas-dos-ceus',models['ruinas-dos-ceus'],placesAudit.books['ruinas-dos-ceus']);
for(const id of placesAudit.books['guerras-de-sangue'].routesIntegrated||[])if(!models['guerras-de-sangue'].entities.places.some(place=>place.id===id))errors.push(`Guerras: rota histórica não foi incorporada a Lugares (${id}).`);
for(const [bookId,items] of [['guerras-de-sangue',gsTimeline],['ruinas-dos-ceus',rdTimeline]]){
  const protectedIds=new Set(manifest.books?.[bookId]?.protectedIds?.timeline||[]);
  const currentIds=new Set(items.map(x=>x.id));
  for(const id of protectedIds)if(!currentIds.has(id))errors.push(`${bookId}: ID protegido da Linha do Tempo desapareceu (${id}).`);
  for(const id of currentIds)if(!protectedIds.has(id))errors.push(`${bookId}: novo ID da Linha do Tempo não foi registrado no manifesto (${id}).`);
}
for(const html of ['index.html','ruinas.html','guerras.html']){const text=fs.readFileSync(path.join(root,html),'utf8');for(const m of text.matchAll(/<(?:script|link)[^>]+(?:src|href)="([^"]+)"/g)){const ref=m[1];if(ref.startsWith('assets/')||/^https?:/.test(ref))continue;if(!fs.existsSync(path.join(root,ref)))errors.push(`${html}: referência ausente (${ref}).`);}}
const forbidden=['app.js','styles.css','portal.js','portal.css','portal-data.js','ruinas-app.js','ruinas-base.js','ruinas-events.js','ruinas.css','ruinas-avatar.css','ruinas-data.js','ruinas-trajetoria-data.js','book-music-loader.js','book-music.js','book-music.css','book-music.config.js'];for(const f of forbidden)if(fs.existsSync(path.join(root,f)))errors.push(`Arquivo antigo ainda solto na raiz: ${f}`);
if(!canonicalAudit?.architecture?.appPattern)errors.push('Relatório canônico da Etapa 3 inválido.');
if(timelineAudit?.stage!==4)errors.push('Relatório da Linha do Tempo da Etapa 4 inválido.');
if(placesAudit?.stage!=='Etapa 5')errors.push('Relatório de Lugares da Etapa 5 inválido.');
if(!manifest)errors.push('Manifesto de IDs ausente.');
if(!fs.existsSync(path.join(root,'assets')))warnings.push('Pasta assets não incluída; caminhos foram preservados e serão conferidos posteriormente.');
const summary=[`Validação Etapa 5 — ${new Date().toISOString()}`,`Guerras de Sangue: ${models['guerras-de-sangue']?.entities.chapters.length||0} capítulos, ${models['guerras-de-sangue']?.entities.places.length||0} lugares, ${placesAudit.books['guerras-de-sangue'].chapterScenes} cenas localizadas e ${gsTimeline.length} acontecimentos cronológicos.`,`Ruínas dos Céus: ${models['ruinas-dos-ceus']?.entities.chapters.length||0} capítulos, ${models['ruinas-dos-ceus']?.entities.places.length||0} lugares, ${placesAudit.books['ruinas-dos-ceus'].chapterScenes} cenas localizadas e ${rdTimeline.length} acontecimentos cronológicos.`];
if(warnings.length){summary.push('','AVISOS:',...warnings.map(x=>`- ${x}`));}
if(errors.length){summary.push('','ERROS:',...errors.map(x=>`- ${x}`));console.error(summary.join('\n'));process.exit(1);}
summary.push('','OK: arquitetura, IDs, rotas históricas, Linha do Tempo e fichas aprofundadas de Lugares da Etapa 5 validados.');console.log(summary.join('\n'));
