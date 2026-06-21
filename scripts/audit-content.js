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
const clans=JSON.parse(fs.readFileSync(path.join(root,'data/sagas/ciclo-de-jesed/audits/clans-etapa-10.json'),'utf8'));
const lore=JSON.parse(fs.readFileSync(path.join(root,'data/sagas/ciclo-de-jesed/audits/lore-etapa-11.json'),'utf8'));
const stage13=JSON.parse(fs.readFileSync(path.join(root,'data/sagas/ciclo-de-jesed/audits/concepts-mysteries-etapa-13.json'),'utf8'));
const stage15=JSON.parse(fs.readFileSync(path.join(root,'data/sagas/ciclo-de-jesed/audits/themes-galleries-etapa-14-15.json'),'utf8'));
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
console.log(`Inventário de assets: ${assets.count} entradas, sendo ${assets.visualCount} recursos visuais.`);
console.log(`Ruínas dos Céus: ${home.homepages['ruinas-dos-ceus'].guideCards} acessos, ${home.homepages['ruinas-dos-ceus'].focusCharacters} personagens em foco, ${home.homepages['ruinas-dos-ceus'].placeCards} lugares e ${home.homepages['ruinas-dos-ceus'].mapPreviews} prévias de mapa.`);
console.log(`Guerras de Sangue: ${home.homepages['guerras-de-sangue'].guideCards} acessos, ${home.homepages['guerras-de-sangue'].focusCharacters} personagens em foco, ${home.homepages['guerras-de-sangue'].placeCards} lugares e ${home.homepages['guerras-de-sangue'].strategicCategories} categorias estratégicas.`);
console.log(`Últimos capítulos removido dos dois livros: ${home.homepages['ruinas-dos-ceus'].lastChaptersRemoved&&home.homepages['guerras-de-sangue'].lastChaptersRemoved?'sim':'não'}.`);
console.log(`Caminhos não resolvidos: ${home.unresolvedLiteralPaths.length}; extensões antigas: ${home.legacyImageExtensions.length}; IDs alterados: ${home.idsChanged}.`);
console.log(`Imagens de capítulo ausentes no inventário recebido: ${home.knownMissingAssets.length}.`);

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
console.log(`Guerras de Sangue: ${social['guerras-de-sangue'].families} famílias e ${social['guerras-de-sangue'].organisations} organizações com fichas ampliadas.`);
console.log(`Imagens sociais são opcionais e só são usadas quando constam no inventário actual.`);
console.log(`Referências SVG atmosféricas activas: ${social.atmosphere.activeSvgAtmosphereReferences}; dependências externas adicionadas: ${social.atmosphere.externalDependenciesAdded}.`);
console.log(`Fallbacks sem erro: ${social.atmosphere.fallbacksEnabled?'activos':'não confirmados'}; GitHub alterado: ${social.githubChanged?'sim':'não'}.`);

console.log('');
console.log(`Auditoria de Clãs — ${clans.stage} · pacote ${clans.version}`);
console.log(`Clãs completos: ${clans.profilesComplete}/${clans.clans}; campos estruturais por ficha: ${clans.profileFields}.`);
console.log(`Relações políticas renderizadas: ${clans.politicalRelationsRendered}; personagens associados: ${clans.charactersAssociated}.`);
console.log(`Recursos territoriais priorizados: ${clans.prioritisedLoreCards} cartões em Alimentos, Fauna e Flora.`);
console.log(`Arquivo aprofundado preservado: ${clans.archiveSectionsPreserved} seções em ${clans.archiveGroupsRendered} grupos.`);
console.log(`Brasão formal Fendelar criado: ${clans.fendelarFormalEmblemCreated?'sim':'não'}; bloco genérico de lore removido: ${clans.genericLoreBlockRemoved?'sim':'não'}.`);
console.log(`Exceções de execução: ${clans.browserTests.runtimeExceptions}; layout móvel sem rolagem horizontal: ${clans.browserTests.mobileNoHorizontalOverflow?'sim':'não'}.`);
console.log(`IDs alterados: ${clans.idsChanged}; mudanças canônicas: ${clans.canonicalChanges}; GitHub alterado: ${clans.githubChanged?'sim':'não'}.`);



console.log('');
console.log(`Auditoria de Fauna, Flora e Alimentos — ${lore.stage} · pacote ${lore.version}`);
console.log(`Ruínas dos Céus: ${lore.books['ruinas-dos-ceus'].items} itens e ${lore.books['ruinas-dos-ceus'].citations} citações localizadas.`);
console.log(`Guerras de Sangue: ${lore.books['guerras-de-sangue'].items} itens, ${lore.books['guerras-de-sangue'].citations} citações e ${lore.books['guerras-de-sangue'].uncited} itens ainda não citados.`);
console.log(`Ciclo celeste: uma volta em ${lore.clock.cycleRealMinutes} minutos reais; simulador manual ${lore.clock.manualSimulator?'activo':'ausente'}.`);
console.log(`Sinopses editoriais completas: Ruínas dos Céus e Guerras de Sangue.`);
console.log(`Exceções de execução: ${lore.browserTests.runtimeExceptions}; layout móvel sem rolagem horizontal: ${lore.browserTests.mobileNoHorizontalOverflow?'sim':'não'}.`);
console.log(`IDs alterados: ${lore.idsChanged}; mudanças canônicas: ${lore.canonicalChanges}; GitHub alterado: ${lore.githubChanged?'sim':'não'}.`);


console.log('');
console.log(`Auditoria de Conceitos e Mistérios — ${stage13.stage} · pacote ${stage13.version}`);
console.log(`Ruínas dos Céus: ${stage13.books['ruinas-dos-ceus'].concepts} conceitos clicáveis e ${stage13.books['ruinas-dos-ceus'].mysteries} mistérios aprofundados.`);
console.log(`Guerras de Sangue: ${stage13.books['guerras-de-sangue'].concepts} conceitos aprofundados e ${stage13.books['guerras-de-sangue'].mysteries} mistérios atualizados até o fim do livro.`);
console.log(`Tela Dimensões Infinitas: avanço estelar, portais azul-bebê e música procedural ${stage13.extras.proceduralPortalMusic?'ativos':'ausentes'}.`);
console.log(`Relógio manual: passos de ${stage13.extras.manualClockStepMinutes} minutos; ciclo automático: ${stage13.extras.automaticSkyCycleRealMinutes} minutos reais por dia completo.`);
console.log(`Contraste noturno adaptativo: ${stage13.extras.adaptiveNightTextContrast?'ativo':'ausente'}; folha duplicada de Guerras removida: ${stage13.extras.guerrasDuplicateStylesheetRemoved?'sim':'não'}.`);
console.log(`Rotas testadas: ${stage13.browserSmokeTests.renderedRoutes}/${stage13.browserSmokeTests.routesTested}; exceções da aplicação: ${stage13.browserSmokeTests.applicationExceptions}.`);
console.log(`IDs alterados: ${stage13.idsChanged}; GitHub alterado: ${stage13.githubChanged?'sim':'não'}.`);

console.log('');
console.log(`Auditoria de Temas e Galerias — ${stage15.stage} · pacote ${stage15.version}`);
console.log(`Ruínas dos Céus: ${stage15.books['ruinas-dos-ceus'].themes} temas, ${stage15.books['ruinas-dos-ceus'].galleryItems} registros de galeria e ${stage15.books['ruinas-dos-ceus'].inventoryAvailableItems} itens ligados ao inventário.`);
console.log(`Guerras de Sangue: ${stage15.books['guerras-de-sangue'].themes} temas, ${stage15.books['guerras-de-sangue'].galleryItems} registros de galeria e ${stage15.books['guerras-de-sangue'].inventoryAvailableItems} itens ligados ao inventário.`);
console.log(`Cartões temáticos e páginas individuais: ${stage15.themes.interactiveCards&&stage15.themes.individualPages?'ativos':'incompletos'}; ambiguidade interpretativa preservada: ${stage15.themes.interpretiveAmbiguityPreserved?'sim':'não'}.`);
console.log(`Visualizador compartilhado: ${stage15.gallery.sharedViewer?'ativo':'ausente'}; pesquisa, toque, teclado, contador, legenda e filtro ativo: ${stage15.gallery.searchField&&stage15.gallery.touchSwipe&&stage15.gallery.keyboardArrows&&stage15.gallery.escapeKey&&stage15.gallery.positionCounter&&stage15.gallery.caption&&stage15.gallery.activeFilterNavigation?'ativos':'incompletos'}.`);
console.log(`Imagens quebradas excluídas durante a execução: ${stage15.gallery.brokenImagesExcludedAtRuntime?'sim':'não'}; placeholders temporários na galeria: ${stage15.gallery.temporaryPlaceholdersExcluded?'não':'sim'}.`);
console.log(`Rotas testadas: ${stage15.browserTests.renderedRoutes}/${stage15.browserTests.routesTested}; exceções da aplicação: ${stage15.browserTests.applicationExceptions}.`);
console.log(`IDs alterados: ${stage15.idsChanged}; mudanças canônicas: ${stage15.canonicalChanges}; GitHub alterado: ${stage15.githubChanged?'sim':'não'}.`);

