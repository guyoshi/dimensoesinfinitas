const fs = require('fs');
const path = require('path');
const vm = require('vm');
const root = path.resolve(__dirname, '..');
const dataBase = 'data/sagas/ciclo-de-jesed/books';
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'data/common/entity-manifest.json'), 'utf8'));
const canonicalAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/canonical-etapa-3.json'), 'utf8'));
const timelineAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/timeline-etapa-4.json'), 'utf8'));
const placesAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/places-etapa-5.json'), 'utf8'));
const visualAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/visual-etapa-5-5.json'), 'utf8'));
const mapsAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/maps-etapa-6.json'), 'utf8'));
const assetManifest = JSON.parse(fs.readFileSync(path.join(root, 'data/common/assets-manifest.json'), 'utf8'));
const homeAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/home-assets-etapa-7.json'), 'utf8'));
const charactersAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/characters-etapa-8.json'), 'utf8'));
const imageRequirements = JSON.parse(fs.readFileSync(path.join(root, 'data/common/image-requirements-etapa-9.json'), 'utf8'));
const socialAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/social-etapa-9.json'), 'utf8'));
const clansAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/clans-etapa-10.json'), 'utf8'));
const loreAudit = JSON.parse(fs.readFileSync(path.join(root, 'data/sagas/ciclo-de-jesed/audits/lore-etapa-11.json'), 'utf8'));
const errors = [], warnings = [];
function context(){const c={console,CustomEvent:function(t,i){this.type=t;this.detail=i?.detail},dispatchEvent:()=>{},document:{querySelector:()=>null}};c.window=c;vm.createContext(c);return c;}
function load(c,files){for(const relative of files){const absolute=path.join(root,relative);if(!fs.existsSync(absolute)){errors.push(`Arquivo ausente: ${relative}`);continue;}vm.runInContext(fs.readFileSync(absolute,'utf8'),c,{filename:relative});}}
const common='data/common/schema.js';
const collections=['chapters','characters','timeline','relationships','places','mysteries','themes','fauna','flora','foods','concepts','gallery'];
const guerrasFiles=[`${dataBase}/guerras-de-sangue/runtime.js`,`${dataBase}/guerras-de-sangue/trajectory.js`,common,`${dataBase}/guerras-de-sangue/book.js`,`${dataBase}/guerras-de-sangue/canonical.js`,`${dataBase}/guerras-de-sangue/social.js`,`${dataBase}/guerras-de-sangue/clans.js`,`${dataBase}/guerras-de-sangue/lore-stage11.js`,...collections.map(x=>`${dataBase}/guerras-de-sangue/${x}.js`),`${dataBase}/guerras-de-sangue/maps.js`,`${dataBase}/guerras-de-sangue/index.js`];
const ruinasFiles=[`${dataBase}/ruinas-dos-ceus/runtime.js`,`${dataBase}/ruinas-dos-ceus/trajectory.js`,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/base.js',common,`${dataBase}/ruinas-dos-ceus/book.js`,`${dataBase}/ruinas-dos-ceus/canonical.js`,`${dataBase}/ruinas-dos-ceus/social.js`,`${dataBase}/ruinas-dos-ceus/lore-stage11.js`,...collections.map(x=>`${dataBase}/ruinas-dos-ceus/${x}.js`),`${dataBase}/ruinas-dos-ceus/maps.js`,`${dataBase}/ruinas-dos-ceus/index.js`];
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

const requiredVisualFiles=[
  'app/shared/experience/common.css',
  'app/shared/experience/common.js',
  'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/styles.css',
  'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js',
  'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/styles.css',
  'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/experience.js',
  'assets/atmosphere/ruinas/sidebar-sky-stone.webp',
  'assets/atmosphere/guerras/sidebar-leather-map.webp',
  'assets/atmosphere/ruinas/eterea-contemplative.webp',
  'assets/atmosphere/guerras/kaendar-night.webp',
  'assets/clans/temp/fendelar-mark.webp',
  'docs/CATALOGO-DE-IMAGENS-ATMOSFERICAS-E-SOCIAIS.md',
  ...visualAudit.screenshots
];
for(const file of requiredVisualFiles)if(!fs.existsSync(path.join(root,file)))errors.push(`Etapa 5.5: arquivo obrigatório ausente (${file}).`);
const visualSourceFiles=[
  'app/shared/experience/common.js',
  'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js',
  'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/experience.js',
  'app/shared/experience/common.css',
  'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/styles.css',
  'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/styles.css'
];
for(const file of visualSourceFiles){
  const text=fs.readFileSync(path.join(root,file),'utf8');
  if(/https?:\/\//.test(text))errors.push(`Etapa 5.5: dependência externa inesperada em ${file}.`);
}
const ruinasHtml=fs.readFileSync(path.join(root,'ruinas.html'),'utf8');
const guerrasHtml=fs.readFileSync(path.join(root,'guerras.html'),'utf8');
for(const ref of ['app/shared/experience/common.css','app/shared/experience/common.js','app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/styles.css','app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js'])if(!ruinasHtml.includes(ref))errors.push(`Ruínas: recurso da Etapa 5.5 não carregado (${ref}).`);
for(const ref of ['app/shared/experience/common.css','app/shared/experience/common.js','app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/styles.css','app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/experience.js'])if(!guerrasHtml.includes(ref))errors.push(`Guerras: recurso da Etapa 5.5 não carregado (${ref}).`);
const ruinasExperience=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js'),'utf8');
const guerrasExperience=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/experience.js'),'utf8');
if(!ruinasExperience.includes("const P='di-ruinas-';"))errors.push('Ruínas: prefixo de preferências específicas ausente.');
if(!guerrasExperience.includes("const P='di-guerras-';"))errors.push('Guerras: prefixo de preferências específicas ausente.');
if(!ruinasExperience.includes('data-time-slider')||!ruinasExperience.includes('data-time-auto'))errors.push('Ruínas: relógio temporário incompleto.');
if(!ruinasExperience.includes('[data-contemplative="ruinas"]'))errors.push('Ruínas: modo contemplativo não ligado ao botão da página inicial.');
if(!guerrasExperience.includes('[data-contemplative="guerras"]'))errors.push('Guerras: modo contemplativo não ligado ao botão da página inicial.');
if((guerrasExperience.match(/document.createElement\('canvas'\)/g)||[]).length<2)errors.push('Guerras: as duas camadas Canvas de partículas não foram encontradas.');
if(!visualAudit?.global?.performanceButtonAlwaysVisible)errors.push('Etapa 5.5: botão permanente de desempenho não confirmado na auditoria.');
if(visualAudit?.global?.externalDependenciesAdded!==0)errors.push('Etapa 5.5: auditoria registra dependência externa não autorizada.');

for(const html of ['index.html','ruinas.html','guerras.html']){const text=fs.readFileSync(path.join(root,html),'utf8');for(const m of text.matchAll(/<(?:script|link)[^>]+(?:src|href)="([^"]+)"/g)){const ref=m[1];if(ref.startsWith('assets/')||/^https?:/.test(ref))continue;if(!fs.existsSync(path.join(root,ref)))errors.push(`${html}: referência ausente (${ref}).`);}}
const forbidden=['app.js','styles.css','portal.js','portal.css','portal-data.js','ruinas-app.js','ruinas-base.js','ruinas-events.js','ruinas.css','ruinas-avatar.css','ruinas-data.js','ruinas-trajetoria-data.js','book-music-loader.js','book-music.js','book-music.css','book-music.config.js'];for(const f of forbidden)if(fs.existsSync(path.join(root,f)))errors.push(`Arquivo antigo ainda solto na raiz: ${f}`);
if(!canonicalAudit?.architecture?.appPattern)errors.push('Relatório canônico da Etapa 3 inválido.');
if(timelineAudit?.stage!==4)errors.push('Relatório da Linha do Tempo da Etapa 4 inválido.');
if(placesAudit?.stage!=='Etapa 5')errors.push('Relatório de Lugares da Etapa 5 inválido.');
if(visualAudit?.stage!=='Etapa 5.5')errors.push('Relatório visual da Etapa 5.5 inválido.');
if(mapsAudit?.stage!=='Etapa 6')errors.push('Relatório de Mapas da Etapa 6 inválido.');
if(homeAudit?.stage!=='Etapa 7')errors.push('Relatório de páginas iniciais e assets da Etapa 7 inválido.');
if(charactersAudit?.stage!=='Etapa 8')errors.push('Relatório de Personagens da Etapa 8 inválido.');
if(socialAudit?.stage!=='Etapa 9')errors.push('Relatório social e atmosférico da Etapa 9 inválido.');

function validateMaps(){
  const ruinas=rc.RUINAS_DATA,guerras=gc.DI_DATA;
  const ruinasMaps=ruinas?.maps||{};
  const warMap=guerras?.maps?.main;
  if(Object.keys(ruinasMaps).length!==2)errors.push(`Etapa 6: Ruínas deveria possuir 2 mapas, encontrados ${Object.keys(ruinasMaps).length}.`);
  for(const id of ['eterea','superficie']){
    const map=ruinasMaps[id];
    if(!map)continue;
    if(!fs.existsSync(path.join(root,map.image)))errors.push(`Etapa 6: imagem de mapa ausente (${map.image}).`);
    if(!Array.isArray(map.context)||map.context.length!==4)errors.push(`Etapa 6: contexto integrado incompleto no mapa ${id}.`);
    for(const placeId of map.placeIds||[]){const place=ruinas.places.find(x=>x.id===placeId);if(!place)errors.push(`Etapa 6: lugar de Ruínas ausente no mapa (${placeId}).`);else if(!place.map||!Number.isFinite(place.map.x)||!Number.isFinite(place.map.y))errors.push(`Etapa 6: coordenada inválida em ${placeId}.`);}
  }
  const ruinasMapped=new Set(Object.values(ruinasMaps).flatMap(map=>map.placeIds||[]));
  if(ruinasMapped.size!==ruinas.places.length)errors.push(`Etapa 6: nem todos os lugares de Ruínas foram mapeados (${ruinasMapped.size}/${ruinas.places.length}).`);
  for(const place of ruinas.places)if(!ruinasMapped.has(place.id))errors.push(`Etapa 6: lugar de Ruínas sem mapa (${place.id}).`);
  if(!warMap)errors.push('Etapa 6: mapa de Guerras de Sangue ausente.');
  else{
    if(!fs.existsSync(path.join(root,warMap.image)))errors.push(`Etapa 6: imagem de Guerras ausente (${warMap.image}).`);
    if((warMap.placeIds||[]).length!==guerras.places.length)errors.push(`Etapa 6: pins de Guerras incompletos (${warMap.placeIds?.length||0}/${guerras.places.length}).`);
    for(const place of guerras.places)if(!place.map||!Number.isFinite(place.map.x)||!Number.isFinite(place.map.y))errors.push(`Etapa 6: lugar de Guerras sem coordenada (${place.id}).`);
    for(const category of warMap.strategicCategories||[])if((category.items||[]).length<2)errors.push(`Etapa 6: categoria estratégica com menos de duas informações (${category.id}).`);
    if((warMap.strategicCategories||[]).length!==mapsAudit['guerras-de-sangue'].strategicCategories)errors.push('Etapa 6: quantidade de categorias estratégicas diverge da auditoria.');
    if(mapsAudit.browserTests?.guerrasPins!==guerras.places.length||mapsAudit.browserTests?.ruinasEtereaPins+mapsAudit.browserTests?.ruinasSuperficiePins!==ruinas.places.length)errors.push('Etapa 6: resultados de navegador divergem das contagens de lugares.');
    if(mapsAudit.browserTests?.runtimeExceptions!==0||mapsAudit.browserTests?.mobileNoHorizontalOverflow!==true)errors.push('Etapa 6: testes de navegador não confirmam execução limpa e responsiva.');
  }
  for(const file of [...(mapsAudit.requiredFiles||[]),...(mapsAudit.screenshots||[])])if(!fs.existsSync(path.join(root,file)))errors.push(`Etapa 6: arquivo obrigatório ausente (${file}).`);
  for(const ref of ['app/shared/maps/interactive-map.css','app/shared/maps/interactive-map.js','data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/maps.js'])if(!ruinasHtml.includes(ref))errors.push(`Etapa 6: Ruínas não carrega ${ref}.`);
  for(const ref of ['app/shared/maps/interactive-map.css','app/shared/maps/interactive-map.js','data/sagas/ciclo-de-jesed/books/guerras-de-sangue/maps.js'])if(!guerrasHtml.includes(ref))errors.push(`Etapa 6: Guerras não carrega ${ref}.`);
  const warApp=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js'),'utf8');
  const rdMain=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/main.js'),'utf8');
  if(!warApp.includes('chapter-pagination chapter-pagination-top'))errors.push('Etapa 6: navegação superior de capítulos ausente em Guerras.');
  if(!rdMain.includes('chapter-pagination chapter-pagination-top'))errors.push('Etapa 6: navegação superior de capítulos ausente em Ruínas.');
  if(warApp.includes('Estado no último ponto realmente escrito'))errors.push('Etapa 6: Personagens em foco de Guerras ainda exibe estado.');
  if(!warApp.includes('Paz sob responsabilidade')||!rdMain.includes('Peso, verdade e sacrifício'))errors.push('Etapa 6: descrições curtas dos personagens em foco não foram preservadas.');
}
validateMaps();

function validateStage7AssetsAndHomes(){
  const canonicalPaths=new Set([...(assetManifest.assets||[]).map(item=>item.caminho),...(imageRequirements.items||[]).map(item=>item.path)]);
  const knownMissing=new Set(homeAudit.knownMissingAssets||[]);
  if(assetManifest.count!==169||(assetManifest.assets||[]).length!==169)errors.push(`Etapa 7: inventário deveria conter 169 assets, encontrados ${(assetManifest.assets||[]).length}.`);
  if(homeAudit.sourceManifest!=='data/common/assets-manifest.json')errors.push('Etapa 7: relatório não aponta para o manifesto oficial de assets.');
  if((homeAudit.unresolvedLiteralPaths||[]).length)errors.push(`Etapa 7: caminhos literais não resolvidos: ${homeAudit.unresolvedLiteralPaths.join(', ')}.`);
  if((homeAudit.legacyImageExtensions||[]).length)errors.push(`Etapa 7: extensões antigas ainda registradas: ${homeAudit.legacyImageExtensions.join(', ')}.`);
  if(homeAudit.idsChanged!==0)errors.push('Etapa 7: a auditoria indica alteração indevida de IDs.');

  const isImage=value=>typeof value==='string'&&/^assets\//.test(value)&&/\.(?:webp|svg|png|jpe?g)$/i.test(value);
  const isValid=value=>canonicalPaths.has(value)||(value.includes('/temp/')&&fs.existsSync(path.join(root,value)))||knownMissing.has(value);
  const resolved=new Set();
  function visit(value,seen=new WeakSet()){
    if(isImage(value)){resolved.add(value);if(!isValid(value))errors.push(`Etapa 7: caminho de imagem fora do inventário ou dos temporários autorizados (${value}).`);return;}
    if(!value||typeof value!=='object'||seen.has(value))return;
    seen.add(value);
    if(Array.isArray(value)){for(const item of value)visit(item,seen);return;}
    for(const item of Object.values(value))visit(item,seen);
  }
  visit(gc.DI_DATA);visit(rc.RUINAS_DATA);

  const gsChapters=models['guerras-de-sangue'].entities.chapters;
  const rdChapters=models['ruinas-dos-ceus'].entities.chapters;
  const gsWithout=gsChapters.filter(ch=>!ch.image).map(ch=>ch.number);
  if(gsWithout.length)errors.push(`Etapa 7: capítulos de Guerras sem ilustração apesar do inventário completo (${gsWithout.join(', ')}).`);
  const rdWithout=rdChapters.filter(ch=>!ch.image).map(ch=>ch.number).sort((a,b)=>a-b);
  if(JSON.stringify(rdWithout)!==JSON.stringify([19,22]))errors.push(`Etapa 7: capítulos de Ruínas sem imagem deveriam ser somente 19 e 22; encontrados ${rdWithout.join(', ')||'nenhum'}.`);
  for(const ch of [...gsChapters,...rdChapters])if(ch.image&&!canonicalPaths.has(ch.image))errors.push(`Etapa 7: capítulo ${ch.id} usa imagem não listada no inventário (${ch.image}).`);

  const allowedTextExt=new Set(['.js','.css','.html']);
  const sourceRoots=['app','data'];
  const legacy=[];const unresolved=[];
  function walk(dir){
    for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
      const full=path.join(dir,entry.name);
      if(entry.isDirectory()){
        if(full.includes(`${path.sep}audits`)||full.includes(`${path.sep}screenshots`))continue;
        walk(full);continue;
      }
      if(!allowedTextExt.has(path.extname(entry.name)))continue;
      if(full.endsWith(path.join('data','common','assets-manifest.json')))continue;
      const text=fs.readFileSync(full,'utf8');
      for(const match of text.matchAll(/assets\/[A-Za-zÀ-ÿ0-9_() .\/-]+\.(?:webp|svg|png|jpe?g)/gi)){
        const assetPath=match[0];
        if(/\.(?:png|jpe?g)$/i.test(assetPath))legacy.push(`${path.relative(root,full)} → ${assetPath}`);
        if(!canonicalPaths.has(assetPath)&&!(assetPath.includes('/temp/')&&fs.existsSync(path.join(root,assetPath))))unresolved.push(`${path.relative(root,full)} → ${assetPath}`);
      }
    }
  }
  for(const relative of sourceRoots)walk(path.join(root,relative));
  for(const html of ['index.html','ruinas.html','guerras.html']){
    const full=path.join(root,html),text=fs.readFileSync(full,'utf8');
    for(const match of text.matchAll(/assets\/[A-Za-zÀ-ÿ0-9_() .\/-]+\.(?:webp|svg|png|jpe?g)/gi)){
      const assetPath=match[0];
      if(/\.(?:png|jpe?g)$/i.test(assetPath))legacy.push(`${html} → ${assetPath}`);
      if(!canonicalPaths.has(assetPath)&&!(assetPath.includes('/temp/')&&fs.existsSync(path.join(root,assetPath))))unresolved.push(`${html} → ${assetPath}`);
    }
  }
  if(legacy.length)errors.push(`Etapa 7: referências com extensão antiga encontradas:\n${legacy.join('\n')}`);
  if(unresolved.length)errors.push(`Etapa 7: referências de imagem não resolvidas encontradas:\n${unresolved.join('\n')}`);

  const rdMainPath='app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/main.js';
  const gsAppPath='app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js';
  const rdMain=fs.readFileSync(path.join(root,rdMainPath),'utf8');
  const gsApp=fs.readFileSync(path.join(root,gsAppPath),'utf8');
  for(const [label,text] of [['Ruínas',rdMain],['Guerras',gsApp]]){
    if(!text.includes('Ciclo de Jesed — Guia do Livro'))errors.push(`Etapa 7: cabeçalho Guia do Livro ausente em ${label}.`);
    if(text.includes('Últimos capítulos'))errors.push(`Etapa 7: bloco Últimos capítulos ainda existe em ${label}.`);
    if(!text.includes('home-guide-grid'))errors.push(`Etapa 7: grade orientadora ausente em ${label}.`);
    if(!text.includes('home-place-grid'))errors.push(`Etapa 7: seção visual de Lugares ausente em ${label}.`);
  }
  if((rdMain.match(/data-map-open=/g)||[]).length<2)errors.push('Etapa 7: prévias separadas dos mapas de Etérea e Superfície ausentes na página inicial de Ruínas.');
  if(!gsApp.includes('home-strategy-strip'))errors.push('Etapa 7: faixa estratégica do mapa ausente na página inicial de Guerras.');
  const expectedHomes={
    'ruinas-dos-ceus':{guideCards:4,focusCharacters:5,placeCards:6,mapPreviews:2},
    'guerras-de-sangue':{guideCards:4,focusCharacters:5,placeCards:6,strategicCategories:7}
  };
  for(const [bookId,expected] of Object.entries(expectedHomes))for(const [key,value] of Object.entries(expected))if(homeAudit.homepages?.[bookId]?.[key]!==value)errors.push(`Etapa 7: ${bookId}/${key} deveria ser ${value}, encontrado ${homeAudit.homepages?.[bookId]?.[key]}.`);
  for(const bookId of Object.keys(expectedHomes))if(homeAudit.homepages?.[bookId]?.lastChaptersRemoved!==true)errors.push(`Etapa 7: remoção de Últimos capítulos não confirmada em ${bookId}.`);
  return {canonicalPaths:canonicalPaths.size,resolvedPaths:resolved.size};
}

function validateStage8Characters(){
  const ruinasModel=models['ruinas-dos-ceus']?.entities;
  const guerrasModel=models['guerras-de-sangue']?.entities;
  const canonicalPaths=new Set([...(assetManifest.assets||[]).map(item=>item.caminho),...(imageRequirements.items||[]).map(item=>item.path)]);
  const ruinasAssets=[...canonicalPaths].filter(value=>value.startsWith('assets/characters/ruinas/'));
  const guerrasAssets=[...canonicalPaths].filter(value=>value.startsWith('assets/characters/guerras-de-sangue/'));
  const ruinasImages=new Set((ruinasModel?.characters||[]).flatMap(character=>[character.image,...(character.alternateImages||[])].filter(Boolean)));
  const guerrasImages=new Set((guerrasModel?.characters||[]).flatMap(character=>[character.image,...(character.alternateImages||[])].filter(Boolean)));

  if((ruinasModel?.characters||[]).length!==charactersAudit['ruinas-dos-ceus'].characters)errors.push(`Etapa 8: quantidade de personagens de Ruínas diverge da auditoria.`);
  if((guerrasModel?.characters||[]).length!==charactersAudit['guerras-de-sangue'].characters)errors.push(`Etapa 8: quantidade de personagens de Guerras diverge da auditoria.`);
  for(const asset of ruinasAssets)if(!ruinasImages.has(asset))errors.push(`Etapa 8: imagem disponível de Ruínas não ligada (${asset}).`);
  for(const asset of guerrasAssets)if(!guerrasImages.has(asset))errors.push(`Etapa 8: imagem disponível de Guerras não ligada (${asset}).`);
  for(const image of [...ruinasImages,...guerrasImages])if(!canonicalPaths.has(image))errors.push(`Etapa 8: retrato fora do inventário oficial (${image}).`);

  let ruinasLinks=0,guerrasLinks=0,ruinasMissing=0,guerrasMissing=0;
  for(const character of ruinasModel?.characters||[]){
    for(const chapterId of character.chapterIds||[]){
      ruinasLinks++;
      const number=String(Number(String(chapterId).split('-').pop()));
      if(!rc.RUINAS_TRAJ?.[character.name]?.[number]){ruinasMissing++;errors.push(`Etapa 8: trajetória ausente em Ruínas (${character.name}/${chapterId}).`);}
    }
  }
  for(const character of guerrasModel?.characters||[]){
    for(const chapterId of character.appearanceChapters||[]){
      guerrasLinks++;
      if(!gc.GUERRAS_TRAJ?.[character.name]?.[chapterId]){guerrasMissing++;errors.push(`Etapa 8: trajetória ausente em Guerras (${character.name}/${chapterId}).`);}
    }
  }
  if(ruinasLinks!==charactersAudit['ruinas-dos-ceus'].trajectoryLinks)errors.push(`Etapa 8: ligações de trajetória de Ruínas deveriam ser ${charactersAudit['ruinas-dos-ceus'].trajectoryLinks}, encontradas ${ruinasLinks}.`);
  if(guerrasLinks!==charactersAudit['guerras-de-sangue'].trajectoryLinks)errors.push(`Etapa 8: ligações de trajetória de Guerras deveriam ser ${charactersAudit['guerras-de-sangue'].trajectoryLinks}, encontradas ${guerrasLinks}.`);
  if(ruinasMissing||guerrasMissing)errors.push(`Etapa 8: ainda existem trajetórias sem texto próprio (Ruínas ${ruinasMissing}; Guerras ${guerrasMissing}).`);

  const sharedJs='app/shared/characters/browser.js',sharedCss='app/shared/characters/browser.css';
  for(const file of [sharedJs,sharedCss,...(charactersAudit.requiredFiles||[]),...(charactersAudit.screenshots||[])])if(!fs.existsSync(path.join(root,file)))errors.push(`Etapa 8: arquivo obrigatório ausente (${file}).`);
  for(const [html,label] of [[ruinasHtml,'Ruínas'],[guerrasHtml,'Guerras']])for(const ref of [sharedJs,sharedCss])if(!html.includes(ref))errors.push(`Etapa 8: ${label} não carrega ${ref}.`);

  const ruinasList=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/characters/list.js'),'utf8');
  const ruinasDetail=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/characters/detail.js'),'utf8');
  const ruinasTrajectory=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/characters/tabs/trajetoria.js'),'utf8');
  const guerrasApp=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js'),'utf8');
  for(const [label,text] of [['Ruínas',ruinasList],['Guerras',guerrasApp]]){
    if(!text.includes('data-character-search'))errors.push(`Etapa 8: pesquisa de personagens ausente em ${label}.`);
    if(!text.includes('data-character-view'))errors.push(`Etapa 8: alternância cartões/lista ausente em ${label}.`);
  }
  if(/aparições/i.test(ruinasDetail))errors.push('Etapa 8: o campo Aparições ainda aparece na ficha de Ruínas.');
  if(/\|\|\s*ch\.(?:s|summary)/.test(ruinasTrajectory)||/\|\|\s*ch\.summary/.test(guerrasApp))errors.push('Etapa 8: a Trajetória ainda reutiliza resumo geral de capítulo como fallback.');
  if(!ruinasList.includes(charactersAudit['ruinas-dos-ceus'].subtitle))errors.push('Etapa 8: frase-guia de Personagens de Ruínas ausente.');
  if(!guerrasApp.includes(charactersAudit['guerras-de-sangue'].subtitle))errors.push('Etapa 8: frase-guia de Personagens de Guerras ausente.');
  if(!guerrasImages.has('assets/characters/guerras-de-sangue/orionus-polar-2.webp'))errors.push('Etapa 8: retrato alternativo de Orionus não foi ligado.');
  if(charactersAudit.browserTests?.runtimeExceptions!==0||charactersAudit.browserTests?.mobileNoHorizontalOverflow!==true)errors.push('Etapa 8: auditoria de navegador não confirma execução limpa e responsiva.');
  return {ruinasLinks,guerrasLinks,ruinasImages:ruinasImages.size,guerrasImages:guerrasImages.size};
}


function validateStage9SocialAndAtmosphere(){
  const requiredTypes=new Set(['family','friendship','protection','influence','conflict','rivalry','loyalty','broken']);
  const ruinasSocial=rc.RUINAS_SOCIAL;
  const guerras=gc.DI_DATA;
  const ruinasCharacters=new Set((rc.RUINAS_DATA?.characters||[]).map(character=>character.name));
  const guerrasCharacters=new Set((guerras?.characters||[]).map(character=>character.id));
  if(!ruinasSocial)errors.push('Etapa 9: RUINAS_SOCIAL ausente.');
  else{
    if((ruinasSocial.relationshipTypes||[]).length!==8)errors.push(`Etapa 9: legenda de relações de Ruínas deveria possuir 8 tipos, encontrados ${(ruinasSocial.relationshipTypes||[]).length}.`);
    for(const type of ruinasSocial.relationshipTypes||[])if(!requiredTypes.has(type.key)||!type.label||!type.description)errors.push(`Etapa 9: tipo de relação inválido em Ruínas (${type.key||'sem chave'}).`);
    if((ruinasSocial.relationships||[]).length!==12)errors.push(`Etapa 9: Ruínas deveria possuir 12 relações enriquecidas, encontradas ${(ruinasSocial.relationships||[]).length}.`);
    for(const relation of ruinasSocial.relationships||[]){
      if(!requiredTypes.has(relation.typeKey))errors.push(`Etapa 9: relação com tipo inválido (${relation.id}).`);
      if(!ruinasCharacters.has(relation.from)||!ruinasCharacters.has(relation.to))errors.push(`Etapa 9: relação aponta para personagem inexistente (${relation.id}).`);
      for(const field of ['type','state','description','fromView','toView'])if(!relation[field])errors.push(`Etapa 9: relação incompleta (${relation.id}/${field}).`);
      if(!Array.isArray(relation.evolution)||relation.evolution.length<2)errors.push(`Etapa 9: evolução insuficiente (${relation.id}).`);
    }
    if((ruinasSocial.families||[]).length!==1)errors.push(`Etapa 9: Ruínas deve exibir somente Os Amaréa; encontradas ${(ruinasSocial.families||[]).length} famílias.`);
    const family=ruinasSocial.families?.[0];
    if(family){
      if(family.id!=='jesed-family-amarea'||family.name!=='Os Amaréa')errors.push('Etapa 9: ficha familiar principal de Ruínas não é Os Amaréa.');
      if((family.members||[]).length!==5)errors.push('Etapa 9: Os Amaréa deveria possuir cinco membros na ficha.');
      for(const member of family.members||[])if(!ruinasCharacters.has(member))errors.push(`Etapa 9: membro familiar inexistente em Ruínas (${member}).`);
      if((family.sections||[]).length<7)errors.push('Etapa 9: ficha Os Amaréa não contém todos os blocos narrativos solicitados.');
      if(!family.image||!fs.existsSync(path.join(root,family.image)))errors.push(`Etapa 9: imagem familiar ausente (${family?.image||'sem caminho'}).`);
    }
    if((ruinasSocial.organisations||[]).length!==4)errors.push(`Etapa 9: Ruínas deveria possuir 4 organizações reais, encontradas ${(ruinasSocial.organisations||[]).length}.`);
    for(const org of ruinasSocial.organisations||[]){
      for(const field of ['name','type','function','description','activity','image'])if(!org[field])errors.push(`Etapa 9: organização de Ruínas incompleta (${org.id}/${field}).`);
      if(!fs.existsSync(path.join(root,org.image)))errors.push(`Etapa 9: imagem de organização ausente (${org.image}).`);
      for(const member of org.members||[])if(!ruinasCharacters.has(member))errors.push(`Etapa 9: membro de organização inexistente em Ruínas (${org.id}/${member}).`);
    }
  }
  if((guerras?.families||[]).length!==3)errors.push(`Etapa 9: Guerras deveria manter 3 famílias, encontradas ${(guerras?.families||[]).length}.`);
  for(const family of guerras?.families||[]){
    if(!family.image||!fs.existsSync(path.join(root,family.image)))errors.push(`Etapa 9: imagem de família de Guerras ausente (${family.id}).`);
    if(!family.subtitle||!Array.isArray(family.details)||family.details.length<3)errors.push(`Etapa 9: família de Guerras incompleta (${family.id}).`);
    for(const member of family.members||[])if(!guerrasCharacters.has(member))errors.push(`Etapa 9: membro familiar inexistente em Guerras (${family.id}/${member}).`);
  }
  if((guerras?.organisations||[]).length!==3)errors.push(`Etapa 9: Guerras deveria manter 3 organizações, encontradas ${(guerras?.organisations||[]).length}.`);
  for(const org of guerras?.organisations||[]){
    for(const field of ['image','function','activity'])if(!org[field])errors.push(`Etapa 9: organização de Guerras incompleta (${org.id}/${field}).`);
    if(org.image&&!fs.existsSync(path.join(root,org.image)))errors.push(`Etapa 9: imagem de organização de Guerras ausente (${org.image}).`);
    for(const member of org.members||[])if(!guerrasCharacters.has(member))errors.push(`Etapa 9: membro de organização inexistente em Guerras (${org.id}/${member}).`);
  }
  const requirementPaths=new Set();
  if(imageRequirements.stage!=='Etapa 9')errors.push('Etapa 9: catálogo de imagens não está marcado como Etapa 9.');
  if((imageRequirements.items||[]).length!==40)errors.push(`Etapa 9: catálogo deveria possuir 40 imagens, encontradas ${(imageRequirements.items||[]).length}.`);
  for(const item of imageRequirements.items||[]){
    if(requirementPaths.has(item.path))errors.push(`Etapa 9: caminho duplicado no catálogo (${item.path}).`); else requirementPaths.add(item.path);
    if(!item.path||!item.file||!item.folder||!Number.isFinite(item.width)||!Number.isFinite(item.height)||typeof item.transparent!=='boolean'||!item.function)errors.push(`Etapa 9: entrada incompleta no catálogo (${item.path||'sem caminho'}).`);
    if(!fs.existsSync(path.join(root,item.path)))errors.push(`Etapa 9: placeholder obrigatório ausente (${item.path}).`);
  }
  const requiredRefs={
    'ruinas.html':['app/shared/social/network.css','data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/social.js'],
    'guerras.html':['app/shared/social/network.css','data/sagas/ciclo-de-jesed/books/guerras-de-sangue/social.js']
  };
  for(const [html,refs] of Object.entries(requiredRefs)){const text=fs.readFileSync(path.join(root,html),'utf8');for(const ref of refs)if(!text.includes(ref))errors.push(`Etapa 9: ${html} não carrega ${ref}.`);}
  for(const file of [...(socialAudit.requiredFiles||[]),...(socialAudit.screenshots||[])])if(!fs.existsSync(path.join(root,file)))errors.push(`Etapa 9: arquivo obrigatório ausente (${file}).`);
  const sourceFiles=[];
  function collect(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory())collect(full);else if(/\.(?:js|css|html)$/i.test(entry.name))sourceFiles.push(full);}}
  for(const relative of ['app','data'])collect(path.join(root,relative));for(const html of ['index.html','ruinas.html','guerras.html'])sourceFiles.push(path.join(root,html));
  const svgRefs=[];for(const file of sourceFiles){const text=fs.readFileSync(file,'utf8');if(/assets\/[A-Za-zÀ-ÿ0-9_() .\/-]+\.svg/i.test(text))svgRefs.push(path.relative(root,file));}
  if(svgRefs.length)errors.push(`Etapa 9: referências SVG atmosféricas ainda ativas em: ${svgRefs.join(', ')}.`);
  const ruinasExperience=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js'),'utf8');
  const guerrasExperience=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/experience.js'),'utf8');
  for(const ref of ['cloud-distant-01.webp','cloud-mid-01.webp','mist-near-01.webp'])if(!ruinasExperience.includes(ref))errors.push(`Etapa 9: sistema de nuvens não referencia ${ref}.`);
  for(const ref of ['ember-sprite.webp','spark-sprite.webp','ash-sprite-01.webp'])if(!guerrasExperience.includes(ref))errors.push(`Etapa 9: Canvas de Guerras não referencia ${ref}.`);
  if(socialAudit.browserTests?.runtimeExceptions!==0||socialAudit.browserTests?.mobileNoHorizontalOverflow!==true)errors.push('Etapa 9: auditoria de navegador não confirma execução limpa e responsiva.');
  return {relationships:ruinasSocial?.relationships?.length||0,families:(ruinasSocial?.families?.length||0)+(guerras?.families?.length||0),organisations:(ruinasSocial?.organisations?.length||0)+(guerras?.organisations?.length||0),images:requirementPaths.size};
}



function validateStage11LoreClockAndSynopses(){
  if(loreAudit.stage!=='Etapa 11'||loreAudit.version!=='0.11.0')errors.push('Etapa 11: relatório de auditoria ausente ou com versão incorreta.');
  const expected={
    'ruinas-dos-ceus':{fauna:6,flora:6,foods:6},
    'guerras-de-sangue':{fauna:75,flora:110,foods:106}
  };
  let totalItems=0,totalCitations=0,uncited=0;
  for(const [bookId,kinds] of Object.entries(expected)){
    const model=models[bookId];
    const chapterNumbers=new Set((model?.entities?.chapters||[]).map(ch=>ch.number));
    for(const [kind,count] of Object.entries(kinds)){
      const items=model?.entities?.[kind]||[];
      if(items.length!==count)errors.push(`Etapa 11: ${bookId}/${kind} deveria possuir ${count} itens, encontrados ${items.length}.`);
      for(const item of items){
        totalItems++;
        const source=item.sourceRef||item;
        for(const field of ['name','slug','image','summary','fullDescription','characteristics','habitat'])if(!source[field]||!String(source[field]).trim())errors.push(`Etapa 11: campo ${field} ausente em ${bookId}/${kind}/${item.id||item.slug}.`);
        if(!Array.isArray(source.uses)||!source.uses.length)errors.push(`Etapa 11: usos ausentes em ${bookId}/${kind}/${item.id||item.slug}.`);
        if(!Number.isInteger(source.citations)||source.citations<0)errors.push(`Etapa 11: total de citações inválido em ${bookId}/${kind}/${item.id||item.slug}.`);
        if(!Array.isArray(source.citationDetails)||source.citationDetails.length!==source.citations)errors.push(`Etapa 11: lista de citações divergente em ${bookId}/${kind}/${item.id||item.slug}.`);
        const sum=(source.chapterMentions||[]).reduce((acc,row)=>acc+(Number(row.count)||0),0);
        if(sum!==source.citations)errors.push(`Etapa 11: soma por capítulo divergente em ${bookId}/${kind}/${item.id||item.slug}.`);
        for(const mention of source.citationDetails||[]){
          if(!chapterNumbers.has(Number(mention.chapter)))errors.push(`Etapa 11: capítulo inválido em citação de ${bookId}/${kind}/${item.slug}.`);
          if(!mention.quote||!mention.context)errors.push(`Etapa 11: trecho ou contexto ausente em ${bookId}/${kind}/${item.slug}.`);
        }
        totalCitations+=source.citations||0;if(!(source.citations||0))uncited++;
      }
    }
  }
  const rhaukar=models['ruinas-dos-ceus']?.entities?.fauna?.find(item=>item.id==='jesed-fauna-raukhar');
  if(!rhaukar||rhaukar.name!=='Rhaukar'||rhaukar.slug!=='raukhar')errors.push('Etapa 11: identidade histórica/canônica do Rhaukar não foi preservada.');
  const ruLore=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/lore.js'),'utf8');
  if(ruLore.includes('data-unused'))errors.push('Etapa 11: filtro de itens não citados voltou à interface de Ruínas.');
  if(ruLore.includes('data-go="conceitos/'))errors.push('Etapa 11: conceitos de Ruínas foram antecipadamente transformados em fichas individuais.');
  const gsApp=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js'),'utf8');
  if(!gsApp.includes('actualKind === "concepts" ? ""'))errors.push('Etapa 11: filtros visíveis de conceitos não foram removidos em Guerras.');
  const clock=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js'),'utf8');
  if(!clock.includes('const CYCLE_DURATION_MS=10*60*1000'))errors.push('Etapa 11: ciclo celeste não está configurado para aproximadamente 10 minutos.');
  if(clock.includes('getHours()*60'))errors.push('Etapa 11: relógio ainda depende da hora real.');
  if(!clock.includes('anchorCycle(manualMinutes)'))errors.push('Etapa 11: modo automático não retoma do horário selecionado no simulador.');
  const bookSets=[...(gc.DI_DATA?.books||[]),...(rc.RS?.BOOKS||[])].filter(b=>['ruinas-dos-ceus','guerras-de-sangue'].includes(b.id));
  for(const book of bookSets){
    if(!book.teaser||book.teaser.length<80)errors.push(`Etapa 11: teaser editorial insuficiente em ${book.id}.`);
    if(!book.synopsis||book.synopsis.length<700||book.synopsis.split(/\n\s*\n/).length<3)errors.push(`Etapa 11: sinopse completa insuficiente em ${book.id}.`);
    if(/Céu pálido, espirais de vento|Pergaminho escurecido, vermelho seco/.test(book.synopsis||''))errors.push(`Etapa 11: descrição atmosférica antiga ainda usada como sinopse em ${book.id}.`);
  }
  for(const html of ['ruinas.html','guerras.html']){const text=fs.readFileSync(path.join(root,html),'utf8');if(!text.includes('lore-stage11.js'))errors.push(`Etapa 11: ${html} não carrega o enriquecimento de lore.`);}
  if(loreAudit.books?.['ruinas-dos-ceus']?.items!==18||loreAudit.books?.['guerras-de-sangue']?.items!==291)errors.push('Etapa 11: métricas principais do relatório de lore estão incorretas.');
  return {items:totalItems,citations:totalCitations,uncited};
}

function validateStage10Clans(){
  const D=gc.DI_DATA;
  const clans=D?.clans||[];
  const expected=['polar','tondrar','buldar','fendelar','glydar','vendrar','cendar','urtistar'];
  const requiredText=['populationLabel','populationDetail','militaryLabel','militaryDetail','origin','territory','culture','economy','wayOfLife','socialStructure','food','warRole','finalSituation'];
  if(clansAudit.stage!=='Etapa 10'||clansAudit.version!=='0.10.0')errors.push('Etapa 10: relatório de auditoria ausente ou com versão incorreta.');
  if(clans.length!==8)errors.push(`Etapa 10: esperados 8 clãs, encontrados ${clans.length}.`);
  for(const slug of expected)if(!clans.some(clan=>clan.slug===slug))errors.push(`Etapa 10: clã obrigatório ausente (${slug}).`);
  const clanNames=new Set(clans.map(clan=>clan.name));
  let members=0,loreCards=0,archiveSections=0;
  for(const clan of clans){
    const profile=clan.profile||{};
    for(const field of requiredText)if(!profile[field]||String(profile[field]).trim().length<12)errors.push(`Etapa 10: campo ${field} incompleto em ${clan.slug}.`);
    for(const field of ['strengths','weaknesses'])if(!Array.isArray(profile[field])||profile[field].length<3)errors.push(`Etapa 10: ${field} insuficiente em ${clan.slug}.`);
    if(!clan.placeId||!D.places?.some(place=>place.id===clan.placeId))errors.push(`Etapa 10: território principal inválido em ${clan.slug}.`);
    if(!Array.isArray(clan.sections)||clan.sections.length<10)errors.push(`Etapa 10: arquivo aprofundado insuficiente em ${clan.slug}.`);
    archiveSections+=clan.sections?.length||0;
    const clanMembers=(D.characters||[]).filter(character=>character.clanId===clan.id);
    members+=clanMembers.length;
    for(const member of clanMembers)if(!member.slug)errors.push(`Etapa 10: personagem sem rota no clã ${clan.slug}.`);
    for(const kind of ['foods','fauna','flora']){
      const items=(D.lore?.[kind]||[]).filter(item=>(item.clans||[]).includes(clan.name));
      if(!items.length)errors.push(`Etapa 10: ${kind} sem itens ligados ao clã ${clan.slug}.`);
      loreCards+=Math.min(8,items.length);
      for(const item of items)if(!item.slug)errors.push(`Etapa 10: item de ${kind} sem rota em ${clan.slug}.`);
    }
    const relationTargets=clans.filter(other=>other.id!==clan.id);
    if(relationTargets.length!==7)errors.push(`Etapa 10: relações políticas incompletas em ${clan.slug}.`);
    for(const target of relationTargets)if(!clanNames.has(target.name))errors.push(`Etapa 10: alvo político inválido em ${clan.slug}.`);
  }
  const fendelar=clans.find(clan=>clan.slug==='fendelar');
  if(!fendelar||fendelar.emblem)errors.push('Etapa 10: Fendelar recebeu brasão formal indevidamente.');
  if(fendelar?.contextMark!=='assets/clans/temp/fendelar-mark.webp')errors.push('Etapa 10: marca contextual neutra dos Fendelar não foi preservada.');
  const requiredFiles=['data/sagas/ciclo-de-jesed/books/guerras-de-sangue/clans.js','app/shared/clans/presentation.css','assets/lore/temp/food-placeholder.webp','assets/lore/temp/fauna-placeholder.webp','assets/lore/temp/flora-placeholder.webp'];
  for(const file of requiredFiles)if(!fs.existsSync(path.join(root,file)))errors.push(`Etapa 10: arquivo obrigatório ausente (${file}).`);
  const html=fs.readFileSync(path.join(root,'guerras.html'),'utf8');
  for(const ref of ['app/shared/clans/presentation.css','data/sagas/ciclo-de-jesed/books/guerras-de-sangue/clans.js'])if(!html.includes(ref))errors.push(`Etapa 10: guerras.html não carrega ${ref}.`);
  const app=fs.readFileSync(path.join(root,'app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js'),'utf8');
  if(app.includes('Lore relacionada'))errors.push('Etapa 10: bloco genérico “Lore relacionada” voltou à interface.');
  for(const label of ['Alimentos','Fauna','Flora','Arquivo aprofundado do clã','Personagens do clã'])if(!app.includes(label))errors.push(`Etapa 10: seção obrigatória ausente na interface (${label}).`);
  if(!app.includes('D.clans.filter(other => other.id !== clan.id)'))errors.push('Etapa 10: a interface não apresenta os sete outros clãs em cada ficha.');
  if(clansAudit.browserTests?.runtimeExceptions!==0||clansAudit.browserTests?.mobileNoHorizontalOverflow!==true||clansAudit.browserTests?.desktopNoHorizontalOverflow!==true)errors.push('Etapa 10: auditoria de navegador não confirma execução limpa e responsiva.');
  if(clansAudit.clans!==8||clansAudit.profileFields!==15||clansAudit.genericLoreBlockRemoved!==true||clansAudit.archivesPreserved!==true)errors.push('Etapa 10: métricas principais do relatório de clãs estão incorretas.');
  for(const file of clansAudit.screenshots||[])if(!fs.existsSync(path.join(root,file)))errors.push(`Etapa 10: captura obrigatória ausente (${file}).`);
  return {clans:clans.length,members,loreCards,archiveSections};
}

const stage7Stats=validateStage7AssetsAndHomes();
const stage8Stats=validateStage8Characters();
const stage9Stats=validateStage9SocialAndAtmosphere();
const stage10Stats=validateStage10Clans();
const stage11Stats=validateStage11LoreClockAndSynopses();
if(!manifest)errors.push('Manifesto de IDs ausente.');
warnings.push('Os binários canônicos completos da pasta assets não acompanham este pacote; os caminhos foram validados pelo inventário WebP oficial e os mapas/recursos temporários necessários permanecem locais.');
const summary=[`Validação Etapa 11 — ${new Date().toISOString()}`,`Guerras de Sangue: ${models['guerras-de-sangue']?.entities.chapters.length||0} capítulos, ${models['guerras-de-sangue']?.entities.places.length||0} lugares, ${placesAudit.books['guerras-de-sangue'].chapterScenes} cenas localizadas e ${gsTimeline.length} acontecimentos cronológicos.`,`Ruínas dos Céus: ${models['ruinas-dos-ceus']?.entities.chapters.length||0} capítulos, ${models['ruinas-dos-ceus']?.entities.places.length||0} lugares, ${placesAudit.books['ruinas-dos-ceus'].chapterScenes} cenas localizadas e ${rdTimeline.length} acontecimentos cronológicos.`,`Assets: ${stage7Stats.canonicalPaths} caminhos únicos no inventário; ${stage7Stats.resolvedPaths} caminhos resolvidos nos modelos carregados.`,`Páginas iniciais: 4 acessos orientadores, 5 personagens em foco e 6 lugares destacados em cada livro.`,`Personagens: ${models['ruinas-dos-ceus']?.entities.characters.length||0} em Ruínas e ${models['guerras-de-sangue']?.entities.characters.length||0} em Guerras; ${stage8Stats.ruinasLinks+stage8Stats.guerrasLinks} ligações de trajetória validadas; todas as imagens disponíveis ligadas.`,`Etapa 9: ${stage9Stats.relationships} relações enriquecidas em Ruínas, ${stage9Stats.families} famílias, ${stage9Stats.organisations} organizações e ${stage9Stats.images} imagens atmosféricas/sociais substituíveis.`,`Etapa 10: ${stage10Stats.clans} clãs, ${stage10Stats.members} personagens associados, ${stage10Stats.loreCards} cartões territoriais priorizados e ${stage10Stats.archiveSections} seções aprofundadas preservadas.`,`Etapa 11: ${stage11Stats.items} itens revisados, ${stage11Stats.citations} citações localizadas e ${stage11Stats.uncited} itens ainda não citados.`];
if(warnings.length){summary.push('','AVISOS:',...warnings.map(x=>`- ${x}`));}
if(errors.length){summary.push('','ERROS:',...errors.map(x=>`- ${x}`));console.error(summary.join('\n'));process.exit(1);}
summary.push('','OK: Etapas 1–10 preservadas; fauna, flora, alimentos, ciclo celeste acelerado e sinopses editoriais validados na Etapa 11.');console.log(summary.join('\n'));
