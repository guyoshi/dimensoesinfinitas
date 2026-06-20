const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'data', 'content.js'), 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(source, sandbox);
const D = sandbox.window.DI_DATA;
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'data', 'ENTITY_MANIFEST.json'), 'utf8'));

const errors = [];
const warnings = [];
const allIds = [];
const collections = {
  sagas: D.sagas, books: D.books, characters: D.characters, clans: D.clans,
  places: D.places, chapters: D.chapters, events: D.events, mysteries: D.mysteries,
  relationships: D.relationships, families: D.families, organisations: D.organisations,
  routes: D.routes,
  ...Object.fromEntries(Object.entries(D.lore).map(([key, value]) => [`lore_${key}`, value]))
};

for (const [label, items] of Object.entries(collections)) {
  if (!Array.isArray(items)) { errors.push(`${label}: colecção ausente ou inválida.`); continue; }
  for (const item of items) {
    if (!item.id) errors.push(`${label}: entidade sem ID.`);
    else allIds.push(item.id);
  }
}

const seen = new Set();
for (const id of allIds) {
  if (seen.has(id)) errors.push(`ID duplicado: ${id}`);
  seen.add(id);
}
const ids = new Set(allIds);
const requireId = (id, context) => { if (id && !ids.has(id)) errors.push(`Referência quebrada em ${context}: ${id}`); };
const requireAsset = (asset, context) => {
  if (!asset) return;
  const absolute = path.join(root, asset);
  if (!fs.existsSync(absolute)) errors.push(`Asset ausente em ${context}: ${asset}`);
};

for (const book of D.books) requireAsset(book.cover, `livro ${book.id}`);
for (const clan of D.clans) {
  requireId(clan.placeId, `clã ${clan.id}.placeId`);
  requireAsset(clan.emblem, `clã ${clan.id}`);
  if (clan.slug === 'fendelar' && clan.emblem) errors.push('Fendelar não deve possuir brasão.');
}
for (const character of D.characters) {
  requireId(character.clanId, `personagem ${character.id}.clanId`);
  requireId(character.locationId, `personagem ${character.id}.locationId`);
  requireAsset(character.image, `personagem ${character.id}`);
  for (const chapterId of character.appearanceChapters || []) requireId(chapterId, `personagem ${character.id}.appearanceChapters`);
}
for (const place of D.places) requireId(place.clanId, `lugar ${place.id}.clanId`);
for (const chapter of D.chapters) {
  for (const id of chapter.characters || []) requireId(id, `capítulo ${chapter.id}.characters`);
  for (const id of chapter.places || []) requireId(id, `capítulo ${chapter.id}.places`);
  if (chapter.status === 'Escrito' && chapter.number > 23) errors.push(`Capítulo futuro marcado como escrito: ${chapter.id}`);
  if (!chapter.summary || !Array.isArray(chapter.details) || !chapter.details.length) errors.push(`Capítulo sem resumo detalhado: ${chapter.id}`);
}
for (const event of D.events) {
  requireId(event.placeId, `acontecimento ${event.id}.placeId`);
  for (const id of event.participants || []) requireId(id, `acontecimento ${event.id}.participants`);
}
for (const mystery of D.mysteries) for (const id of mystery.linkedCharacters || []) requireId(id, `mistério ${mystery.id}.linkedCharacters`);
for (const relationship of D.relationships) {
  requireId(relationship.from, `relação ${relationship.id}.from`);
  requireId(relationship.to, `relação ${relationship.id}.to`);
}
for (const family of D.families) for (const id of family.members || []) requireId(id, `família ${family.id}.members`);
for (const organisation of D.organisations) for (const id of organisation.members || []) requireId(id, `organização ${organisation.id}.members`);
for (const alias of D.entityAliases || []) {
  if (!alias.text || !alias.route) errors.push('Alias inválido sem texto ou rota.');
}

for (const [group, protectedIds] of Object.entries(manifest.protectedIds)) {
  for (const id of protectedIds) if (!ids.has(id)) errors.push(`ID protegido desapareceu (${group}): ${id}`);
}

requireAsset('assets/mapa-guerras-de-sangue.webp', 'mapa principal');
if (D.meta.canonicalCutoff !== manifest.canonicalCutoff) warnings.push('O limite canónico diverge do manifesto.');
if (D.chapters.length !== 23) errors.push(`Esperados 23 capítulos escritos nesta etapa; encontrados ${D.chapters.length}.`);

const lines = [];
lines.push(`Validação Dimensões Infinitas — ${new Date().toISOString()}`);
lines.push(`Entidades verificadas: ${allIds.length}`);
lines.push(`Capítulos escritos: ${D.chapters.length}`);
lines.push(`Personagens: ${D.characters.length}`);
lines.push(`Clãs: ${D.clans.length}`);
lines.push(`Itens de lore: ${Object.values(D.lore).reduce((sum, items) => sum + items.length, 0)}`);
if (warnings.length) {
  lines.push('', 'AVISOS:');
  warnings.forEach(item => lines.push(`- ${item}`));
}
if (errors.length) {
  lines.push('', 'ERROS:');
  errors.forEach(item => lines.push(`- ${item}`));
  console.error(lines.join('\n'));
  process.exit(1);
}
lines.push('', 'OK: nenhum ID duplicado, protegido em falta, asset ausente ou referência quebrada.');
console.log(lines.join('\n'));
