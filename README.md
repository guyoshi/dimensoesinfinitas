# Dimensões Infinitas — site pessoal

Versão estrutural: **0.9.0 — Etapa 5 concluída**.

## Entradas públicas

- `index.html` — portal de Dimensões Infinitas.
- `ruinas.html` — *Ruínas dos Céus*.
- `guerras.html` — *Guerras de Sangue*.

Esses três arquivos permanecem na raiz para preservar os endereços publicados. Todo o restante está organizado para suportar várias sagas e livros.

## Arquitetura

```text
app/
├── portal/
├── shared/
└── sagas/
    └── ciclo-de-jesed/
        └── books/
            ├── ruinas-dos-ceus/
            └── guerras-de-sangue/

data/
├── common/
└── sagas/
    └── ciclo-de-jesed/
        ├── audits/
        └── books/
            ├── ruinas-dos-ceus/
            └── guerras-de-sangue/
```

O padrão para novos livros é:

- interface: `app/sagas/<saga>/books/<livro>/`;
- conteúdo: `data/sagas/<saga>/books/<livro>/`;
- módulos reutilizáveis: `app/shared/`;
- auditorias da saga: `data/sagas/<saga>/audits/`.

## Instalação

Extraia o pacote completo sobre a pasta do site. A pasta `assets` não foi incluída nesta entrega e deve permanecer na raiz do projeto quando você mesclar as versões.

## Comandos

```bash
npm run validate
npm run audit
npm run serve
```

## Documentação obrigatória

Leia `PLANO-MESTRE-E-HISTORICO.md` antes de qualquer alteração. Ele contém todas as decisões, etapas concluídas e tarefas futuras.

## Etapa 4 — Linha do Tempo

Os dois livros agora usam uma cronologia real de Jesed:

- `A.Q.` — Antes da Queda;
- `D.Q.` — Depois da Queda;
- ciclos em vez de anos;
- meses ordinais;
- nenhuma data diária inventada;
- datas aproximadas claramente identificadas.

Cada acontecimento possui:

- `id` e `slug` estáveis;
- objeto `date`;
- `dateLabel` visível;
- `sortKey` cronológico oculto;
- descrição, contexto, causa e consequências;
- capítulos classificados como ocorrência, citação, lembrança, investigação, revelação ou consequência;
- personagens, lugares e acontecimentos relacionados;
- versão pública e verdade, quando aplicável;
- `legacySlugs` para preservar endereços antigos.

A Linha do Tempo contém:

- 30 acontecimentos em *Ruínas dos Céus*;
- 38 acontecimentos em *Guerras de Sangue*.

O relatório específico está em:

`data/sagas/ciclo-de-jesed/audits/timeline-etapa-4.json`

## Etapa 5 — Lugares e rotas

As fichas de lugares dos dois livros agora compartilham uma estrutura aprofundada com:

- região e localização;
- descrição completa;
- função narrativa;
- arquitetura ou forma natural;
- clima e atmosfera;
- recursos, perigos e cultura;
- população estimada somente quando aplicável;
- personagens que passaram pelo lugar;
- capítulos com descrição específica da cena;
- acontecimentos relacionados da Linha do Tempo.

A etapa contém:

- 23 lugares e 69 cenas localizadas em *Guerras de Sangue*;
- 17 lugares e 48 cenas localizadas em *Ruínas dos Céus*;
- 5 rotas históricas definitivamente incorporadas à coleção Lugares;
- 15 estimativas de população ou ocupação aplicáveis;
- nenhum uso do campo genérico `Estado: Activa`.

O relatório específico está em:

`data/sagas/ciclo-de-jesed/audits/places-etapa-5.json`

## Próxima etapa

**Etapa 6 — Mapas interativos.**
