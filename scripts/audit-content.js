const fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'..');
const canonical=JSON.parse(fs.readFileSync(path.join(root,'data/sagas/ciclo-de-jesed/audits/canonical-etapa-3.json'),'utf8'));
const timeline=JSON.parse(fs.readFileSync(path.join(root,'data/sagas/ciclo-de-jesed/audits/timeline-etapa-4.json'),'utf8'));
const places=JSON.parse(fs.readFileSync(path.join(root,'data/sagas/ciclo-de-jesed/audits/places-etapa-5.json'),'utf8'));
const visual=JSON.parse(fs.readFileSync(path.join(root,'data/sagas/ciclo-de-jesed/audits/visual-etapa-5-5.json'),'utf8'));
const maps=JSON.parse(fs.readFileSync(path.join(root,'data/sagas/ciclo-de-jesed/audits/maps-etapa-6.json'),'utf8'));
const assets=JSON.parse(fs.readFileSync(path.join(root,'data/common/assets-manifest.json'),'utf8'));
const home=JSON.parse(fs.readFileSync(path.join(root,'data/sagas/ciclo-de-jesed/audits/home-assets-etapa-7.json'),'utf8'));
const characters=JSON.parse(fs.readFileSync(path.join(root,'data/sagas/ciclo-de-jesed/audits/characters-etapa-8.json'),'utf8'));
const social=JSON.parse(fs.readFileSync(path.join(root,'data/sagas/ciclo-de-jesed/audits/social-etapa-9.json'),'utf8'));
const imageRequirements=JSON.parse(fs.readFileSync(path.join(root,'data/common/image-requirements-etapa-9.json'),'utf8'));
console.log(`Auditoria canônica preservada — Etapa ${canonical.stage}`);
console.log(`Correções canônicas aplicadas: ${canonical.correctionsApplied.length}`);
console.log('');
console.log(`Auditoria da Linha do Tempo — Etapa ${timeline.stage}`);
console.log(`Ruínas dos Céus: ${timeline.counts['ruinas-dos-ceus']} acontecimentos.`);
console.log(`Guerras de Sangue: ${timeline.counts['guerras-de-sangue']} acontecimentos.`);
console.log(`Regras temporais: ${timeline.rules.eras.join(' / ')}, ciclos, meses ordinais e nenhuma precisão diária.`);
console.log(`Compatibilidade de rotas antigas: ${timeline.implementation.legacyRoutesPreserved?'preservada':'não confirmada'}.`);
console.log(`Limitações registradas: ${timeline.knownLimits.length}.`);

console.log('');
console.log(`Auditoria de Lugares — ${places.stage}`);
console.log(`Ruínas dos Céus: ${places.books['ruinas-dos-ceus'].places} lugares, ${places.books['ruinas-dos-ceus'].chapterScenes} cenas localizadas e ${places.books['ruinas-dos-ceus'].populationFields} estimativas de população aplicáveis.`);
console.log(`Guerras de Sangue: ${places.books['guerras-de-sangue'].places} lugares, ${places.books['guerras-de-sangue'].chapterScenes} cenas localizadas e ${places.books['guerras-de-sangue'].populationFields} estimativas de população aplicáveis.`);
console.log(`Rotas históricas incorporadas a Lugares: ${places.books['guerras-de-sangue'].routesIntegrated.length}.`);

console.log('');
console.log(`Auditoria visual — ${visual.stage} · pacote ${visual.version}`);
console.log(`Perfis: ${visual.global.profiles.join(', ')}.`);
console.log(`Ruínas: ${visual['ruinas-dos-ceus'].atmosphere.length} sistemas atmosféricos, ${visual['ruinas-dos-ceus'].skyPhases.length} fases do céu e modo contemplativo ${visual['ruinas-dos-ceus'].contemplativeMode?'ativo':'ausente'}.`);
console.log(`Guerras: ${visual['guerras-de-sangue'].particles.length} tipos atmosféricos, ${visual['guerras-de-sangue'].canvasLayers} Canvas e modo contemplativo ${visual['guerras-de-sangue'].contemplativeMode?'ativo':'ausente'}.`);
console.log(`Dependências externas adicionadas: ${visual.global.externalDependenciesAdded}.`);
console.log(`Recursos temporários documentados: ${visual.temporaryAssets.length}.`);
console.log(`Capturas de revisão: ${visual.screenshots.length}.`);

console.log('');
console.log(`Auditoria de Mapas — ${maps.stage} · pacote ${maps.version}`);
console.log(`Ruínas dos Céus: ${maps['ruinas-dos-ceus'].maps} mapas, ${maps['ruinas-dos-ceus'].pins} pins e todos os ${maps['ruinas-dos-ceus'].places} lugares localizados.`);
console.log(`Guerras de Sangue: ${maps['guerras-de-sangue'].pins} pins, ${maps['guerras-de-sangue'].routesAsPlaces} rotas preservadas como lugares e ${maps['guerras-de-sangue'].strategicCategories} categorias estratégicas.`);
console.log(`Navegação superior de capítulos: activa nos dois livros.`);
console.log(`Personagens em foco: principais, sem estado e com descrições curtas.`);
console.log(`Capturas de revisão da Etapa 6: ${maps.screenshots.length}.`);
console.log(`Exceções de execução nos mapas: ${maps.browserTests.runtimeExceptions}.`);


console.log('');
console.log(`Auditoria de Páginas Iniciais e Assets — ${home.stage} · pacote ${home.version}`);
console.log(`Inventário WebP: ${assets.count} arquivos registrados e ${home.canonicalManifestMatches} referências canônicas reconhecidas.`);
console.log(`Ruínas dos Céus: ${home.homepages['ruinas-dos-ceus'].guideCards} acessos, ${home.homepages['ruinas-dos-ceus'].focusCharacters} personagens em foco, ${home.homepages['ruinas-dos-ceus'].placeCards} lugares e ${home.homepages['ruinas-dos-ceus'].mapPreviews} prévias de mapa.`);
console.log(`Guerras de Sangue: ${home.homepages['guerras-de-sangue'].guideCards} acessos, ${home.homepages['guerras-de-sangue'].focusCharacters} personagens em foco, ${home.homepages['guerras-de-sangue'].placeCards} lugares e ${home.homepages['guerras-de-sangue'].strategicCategories} categorias estratégicas.`);
console.log(`Últimos capítulos removido dos dois livros: ${home.homepages['ruinas-dos-ceus'].lastChaptersRemoved&&home.homepages['guerras-de-sangue'].lastChaptersRemoved?'sim':'não'}.`);
console.log(`Caminhos não resolvidos: ${home.unresolvedLiteralPaths.length}; extensões antigas: ${home.legacyImageExtensions.length}; IDs alterados: ${home.idsChanged}.`);
console.log(`Imagens de capítulo ainda não existentes no inventário: ${home.knownMissingAssets.length} (Ruínas 19 e 22).`);

console.log('');
console.log(`Auditoria de Personagens — ${characters.stage} · pacote ${characters.version}`);
console.log(`Ruínas dos Céus: ${characters['ruinas-dos-ceus'].characters} personagens, ${characters['ruinas-dos-ceus'].linkedCharacterAssets} retratos ligados e ${characters['ruinas-dos-ceus'].trajectoryLinks} ligações de trajetória completas.`);
console.log(`Guerras de Sangue: ${characters['guerras-de-sangue'].characters} personagens, ${characters['guerras-de-sangue'].linkedCharacterAssets} imagens disponíveis ligadas e ${characters['guerras-de-sangue'].trajectoryLinks} ligações de trajetória completas.`);
console.log(`Pesquisa e dois modos de visualização: activos nos dois livros.`);
console.log(`Trajetórias sem texto específico: ${characters['ruinas-dos-ceus'].missingTrajectoryEntries+characters['guerras-de-sangue'].missingTrajectoryEntries}.`);
console.log(`IDs alterados: ${characters.idsChanged}; alterações canônicas: ${characters.canonicalChanges}; GitHub alterado: ${characters.githubChanged?'sim':'não'}.`);


console.log('');
console.log(`Auditoria social e atmosférica — ${social.stage} · pacote ${social.version}`);
console.log(`Ruínas dos Céus: ${social['ruinas-dos-ceus'].relationships} relações enriquecidas, ${social['ruinas-dos-ceus'].families} família e ${social['ruinas-dos-ceus'].organisations} organizações.`);
console.log(`Guerras de Sangue: ${social['guerras-de-sangue'].families} famílias e ${social['guerras-de-sangue'].organisations} organizações com imagens e fichas ampliadas.`);
console.log(`Catálogo substituível: ${imageRequirements.items.length} imagens WebP com caminho, dimensão, transparência e função documentados.`);
console.log(`Referências SVG atmosféricas activas: ${social.atmosphere.activeSvgAtmosphereReferences}; dependências externas adicionadas: ${social.atmosphere.externalDependenciesAdded}.`);
console.log(`Fallbacks sem erro: ${social.atmosphere.fallbacksEnabled?'activos':'não confirmados'}; GitHub alterado: ${social.githubChanged?'sim':'não'}.`);
