const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const root = path.resolve(__dirname, '..');
const assetRoot = path.join(root, 'assets');
const textExt = new Set(['.html','.css','.js']);
const imageExt = new Set(['.png','.jpg','.jpeg','.gif','.bmp','.tif','.tiff','.webp']);
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.join(dir,e.name);return e.isDirectory()?walk(p):[p]});}
const files=walk(root).filter(p=>!p.includes(`${path.sep}.git${path.sep}`)&&!p.includes(`${path.sep}node_modules${path.sep}`));
const images=files.filter(p=>p.startsWith(assetRoot+path.sep)&&imageExt.has(path.extname(p).toLowerCase()));
const nonWebp=images.filter(p=>path.extname(p).toLowerCase()!=='.webp');
const badNames=images.filter(p=>!/^[a-z0-9][a-z0-9-]*\.webp$/.test(path.basename(p)));
const hashes=new Map(); const duplicates=[];
for(const p of images){const h=crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'); if(hashes.has(h))duplicates.push([path.relative(root,hashes.get(h)),path.relative(root,p)]);else hashes.set(h,p);}
const missing=[];const rx=/assets\/[A-Za-z0-9_./%()\-]+\.(?:webp|png|jpe?g|gif|bmp)/gi;
for(const p of files.filter(p=>textExt.has(path.extname(p).toLowerCase()))){const t=fs.readFileSync(p,'utf8');for(const ref of t.match(rx)||[]){const decoded=decodeURIComponent(ref);if(!fs.existsSync(path.join(root,decoded)))missing.push({file:path.relative(root,p),ref});}}
const errors=[];
if(nonWebp.length)errors.push(`Imagens fora de WebP: ${nonWebp.map(p=>path.relative(root,p)).join(', ')}`);
if(badNames.length)errors.push(`Nomes não normalizados: ${badNames.map(p=>path.relative(root,p)).join(', ')}`);
if(duplicates.length)errors.push(`Duplicados binários: ${JSON.stringify(duplicates)}`);
if(missing.length)errors.push(`Referências ausentes: ${JSON.stringify(missing.slice(0,50))}`);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}console.log(`Assets válidos: ${images.length} imagens WebP, 0 referências quebradas, 0 duplicados binários.`);
