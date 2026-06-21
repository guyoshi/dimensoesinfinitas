# Dimensões Infinitas — Etapa 4B

Site estático de consulta do universo criativo de Guilherme S. L. Anjos. Nesta etapa, a interface de **Ciclo de Jesed** foi preenchida com o conteúdo escrito de **Guerras de Sangue**.

## Abrir localmente

O ficheiro `index.html` pode ser aberto directamente. Para testar como será publicado no GitHub Pages, execute:

```bash
npm run serve
```

Depois abra `http://localhost:8080`.

## Validar antes de publicar

```bash
npm run validate
```

A validação impede a publicação quando encontra:

- IDs duplicados ou protegidos removidos;
- relações e referências quebradas;
- imagens ausentes;
- personagens ligadas a capítulos, clãs ou lugares inexistentes;
- capítulo posterior ao 23 marcado como escrito;
- capítulo sem resumo e acontecimentos detalhados;
- brasão atribuído indevidamente aos Fendelar.

## Conteúdo da 4B

- 29 capítulos efectivamente escritos de **Guerras de Sangue** (1-23 em `data/content.js`; 24-29 acrescentados em runtime por `data/guerras-4d-chapters.js`);
- resumos rápidos e descrições detalhadas dos acontecimentos;
- nomes interligados nos textos dos capítulos;
- 41 personagens, incluindo 23 retratos já adicionados;
- oito clãs, com sete brasões e os Fendelar explicitamente sem brasão;
- relações filtráveis, famílias e organizações funcionais;
- lugares, mapa interactivo, rotas e acontecimentos;
- fauna, flora, alimentos e conceitos com contagem de citações;
- capas de **Ruínas dos Céus** e **Guerras de Sangue**;
- pesquisa rápida e profunda;
- configurações granulares de desempenho;
- `AI_UPDATE_RULES.md` e manifesto completo de IDs.

## Limite canónico

O livro **Guerras de Sangue** está completo até o **Capítulo 29 — A Raiz que Ficou**. `scripts/validate-content.js` continua a validar apenas `data/content.js` isoladamente (por isso ainda reporta 23 capítulos nesse ficheiro — os capítulos 24-29 vivem nos ficheiros de extensão em `data/guerras-4d-*.js`, carregados em runtime pelo navegador).
