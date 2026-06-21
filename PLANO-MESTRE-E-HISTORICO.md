# Plano Mestre e Histórico de Atualizações — Dimensões Infinitas

> **Documento obrigatório para qualquer IA ou pessoa que continue o desenvolvimento do site.**  
> Este arquivo reúne: decisões do autor, escopo completo, ordem das etapas, estado atual, regras de trabalho, tarefas concluídas, tarefas pendentes e o modelo que deve ser atualizado ao encerrar cada etapa.

---

## 1. Identificação do projeto

- **Projeto:** Dimensões Infinitas
- **Saga em desenvolvimento no site:** Ciclo de Jesed
- **Livros atualmente disponíveis:**
  - *Ruínas dos Céus* — Livro I — 24 capítulos — concluído.
  - *Guerras de Sangue* — Livro II — 29 capítulos — concluído.
- **Versão estrutural atual:** Etapa 9 concluída — pacote 0.9.9.
- **Última atualização deste documento:** 21 de junho de 2026.

---

## 2. Como este documento deve ser usado

Antes de modificar qualquer arquivo, a IA deve:

1. Ler este documento por completo.
2. Verificar qual é a **próxima etapa pendente**.
3. Trabalhar somente sobre o arquivo ou pasta mais recente enviado pelo autor.
4. Não pesquisar nem alterar o GitHub, salvo pedido explícito do autor.
5. Não repetir uma tarefa já concluída, a menos que seja necessário corrigir regressão.
6. Respeitar as decisões mais recentes deste documento quando houver conflito com versões antigas.
7. Ao concluir a etapa, atualizar:
   - o estado da etapa;
   - a data de conclusão;
   - os arquivos alterados;
   - os arquivos criados;
   - os arquivos removidos;
   - as validações realizadas;
   - os problemas conhecidos;
   - a próxima etapa recomendada.
8. Atualizar também o `README.md` quando a estrutura, instalação, navegação ou comandos mudarem.
9. Devolver **a pasta completa do site**, e não somente os arquivos alterados, salvo pedido contrário.

Este arquivo substitui históricos, relatórios e listas de tarefas separados. Não devem ser criados novos arquivos de progresso concorrentes.

---

## 3. Protocolo obrigatório de trabalho

### 3.1. Fonte de trabalho

- O autor enviará a versão mais recente da pasta do site.
- Essa pasta enviada será a fonte de trabalho da etapa.
- Não usar uma cópia antiga do projeto.
- Não buscar uma versão no GitHub quando o autor já enviou o arquivo mais recente.
- O GitHub será atualizado manualmente pelo autor depois de receber e testar o pacote.

### 3.2. Assets

- Pacotes intermediários podem não conter a pasta `assets`.
- Quando os assets não estiverem presentes:
  - preservar os caminhos existentes;
  - não apagar referências de imagem apenas porque o arquivo não está no pacote;
  - registrar imagens ausentes como aviso, não como erro destrutivo;
  - preparar as ligações para serem conferidas quando a pasta completa for reunida ao GitHub.

### 3.3. Entrega

Ao final de cada etapa, entregar:

- a pasta completa do site em ZIP;
- este documento atualizado;
- `README.md` atualizado, quando necessário;
- validação de sintaxe e integridade;
- nenhuma alteração direta no GitHub.

### 3.4. Limpeza

- Remover arquivos obsoletos apenas depois que seus dados e funções forem migrados.
- Não manter scripts corretivos temporários quando a correção já estiver integrada ao código definitivo.
- Não manter históricos duplicados.
- Não apagar IDs, imagens, dados canônicos ou redirecionamentos ainda necessários.

---

## 4. Princípios gerais do site

### 4.1. Paridade entre os livros

*Ruínas dos Céus* e *Guerras de Sangue* devem ter o mesmo peso no site. *Guerras de Sangue* não pode parecer o único livro principal.

Os dois livros devem compartilhar, quando fizer sentido:

- profundidade de conteúdo;
- qualidade visual;
- modos de visualização;
- pesquisa;
- cartões interativos;
- páginas individuais;
- mapas interativos;
- ligações entre entidades;
- acessibilidade e responsividade.

Categorias incompatíveis não devem ser forçadas. Exemplo: *Ruínas dos Céus* não deve receber clãs apenas para imitar *Guerras de Sangue*.

### 4.2. IDs e compatibilidade

- IDs existentes são permanentes.
- Não renomear IDs porque o nome visível mudou.
- Não reutilizar ID removido.
- Preservar slugs e rotas antigas por redirecionamentos.
- Favoritos, anotações e histórico futuro dependerão desses IDs.

### 4.3. Conteúdo canônico

- Usar somente os livros, documentos de lore e decisões explícitas do autor.
- Não inventar precisão quando o texto não oferece precisão.
- Estimativas solicitadas pelo autor, como população, podem ser criadas com bom senso e marcadas como estimadas.
- Informação de livro futuro não deve entrar na lente dos dois primeiros livros se não tiver sido citada neles.

### 4.4. Interface

- Manter identidade própria de cada livro.
- Corrigir sempre texto claro sobre fundo claro.
- Manter responsividade.
- O botão de modo de desempenho deve permanecer acessível e indicar visualmente se está ligado ou desligado.
- *Ruínas dos Céus* deve manter efeitos de nuvens.
- *Guerras de Sangue* deve manter partículas atrás e à frente do conteúdo.

---

# 5. Estado geral das etapas

| Etapa | Nome | Estado | Conclusão |
|---|---|---|---|
| 1 | Estrutura comum dos dois livros | **CONCLUÍDA** | 21/06/2026 |
| 2 | Remover, fundir e reorganizar seções | **CONCLUÍDA** | 21/06/2026 |
| 3 | Auditoria canônica completa e organização escalável | **CONCLUÍDA** | 21/06/2026 |
| 4 | Nova Linha do Tempo | **CONCLUÍDA** | 21/06/2026 |
| 5 | Lugares e rotas | **CONCLUÍDA** | 21/06/2026 |
| 5.5 | Identidade visual, atmosfera, modo contemplativo e desempenho | **CONCLUÍDA** | 21/06/2026 |
| 6 | Mapas interativos | **CONCLUÍDA** | 21/06/2026 |
| 7 | Páginas iniciais | **CONCLUÍDA** | 21/06/2026 |
| 8 | Personagens | PENDENTE | — |
| 9 | Relações, família, organizações e atmosfera com imagens | CONCLUÍDA | 21/06/2026 |
| 10 | Clãs | PENDENTE | — |
| 11 | Fauna, flora e alimentos | PENDENTE | — |
| 12 | Conceitos | PENDENTE | — |
| 13 | Mistérios | PENDENTE | — |
| 14 | Temas | PENDENTE | — |
| 15 | Galerias | PENDENTE | — |
| 16 | Padronização visual e responsividade | PENDENTE | — |
| 17 | Limpeza técnica final | PENDENTE | — |
| 18 | Validação final | PENDENTE | — |

---

# 6. Etapas concluídas

## Etapa 1 — Estrutura comum dos dois livros

**Estado:** CONCLUÍDA  
**Data:** 21/06/2026

### Objetivo

Padronizar internamente os dados de *Ruínas dos Céus* e *Guerras de Sangue* antes de alterar o visual.

### Estrutura criada

```text
data/
├── common/
│   └── schema.js
├── ruinas-dos-ceus/
│   ├── book.js
│   ├── characters.js
│   ├── relationships.js
│   ├── places.js
│   ├── chapters.js
│   ├── timeline.js
│   ├── mysteries.js
│   ├── themes.js
│   ├── fauna.js
│   ├── flora.js
│   ├── foods.js
│   ├── concepts.js
│   ├── gallery.js
│   └── index.js
└── guerras-de-sangue/
    └── mesmos arquivos
```

> **Nota de arquitetura:** a simetria de coleções criada na Etapa 1 foi preservada, mas os diretórios foram relocados na Etapa 3 para `data/sagas/ciclo-de-jesed/books/<livro>/`, permitindo escalar o projeto para várias sagas e livros.

### O que foi feito

- Criada estrutura física simétrica para os dois livros.
- Criadas coleções equivalentes para:
  - personagens;
  - relações;
  - lugares;
  - capítulos;
  - Linha do Tempo;
  - mistérios;
  - temas;
  - fauna;
  - flora;
  - alimentos;
  - conceitos;
  - galeria.
- Preservados os IDs de *Guerras de Sangue*.
- Criados IDs determinísticos para dados antigos de *Ruínas dos Céus*.
- Preservados campos antigos ainda usados pelo runtime de *Ruínas dos Céus*.
- Incorporadas atualizações dos antigos arquivos `guerras-4d-*` na estrutura permanente.
- Preservados caminhos de imagens.
- Preparada a base para redirecionamentos e índices por ID e slug.

### Decisão importante

Arquivos com nomes temporários como `guerras-4d-*` não fazem parte da arquitetura definitiva e não devem ser recriados.

---

## Etapa 2 — Remover, fundir e reorganizar seções

**Estado:** CONCLUÍDA  
**Data:** 21/06/2026

### Objetivo

Simplificar a estrutura de navegação antes da revisão profunda de conteúdo.

### Removido dos dois livros

- Continuidade.
- Decisões do autor.

### Removido de Guerras de Sangue

- Causa e consequência como seção independente.
- Rotas como seção independente.
- Pacote de cena.

Causas e consequências continuam permitidas dentro das páginas individuais dos acontecimentos.

### Fusão realizada

- Acontecimentos e Linha do Tempo foram fundidos.
- A única seção visível passou a ser **Linha do Tempo**.
- Páginas individuais de acontecimentos foram preservadas.

### Rotas migradas para Lugares

As seguintes rotas foram convertidas em lugares:

- Rio Grande;
- Garganta de Kaendar;
- Garganta Seca;
- Estrada dos Grãos;
- Marcha oculta da aliança.

Os IDs anteriores foram preservados.

### Redirecionamentos criados

Em *Guerras de Sangue*:

- `events` → `timeline`
- `event/*` → página individual na Linha do Tempo
- `acontecimentos` → `timeline`
- `consequences` → `timeline`
- `routes` e `rotas` → `places`
- `route/*` e `rota/*` → `place/*`

Em *Ruínas dos Céus*:

- `acontecimentos` → `linha`
- `events` → `linha`
- `timeline` → `linha`
- `consequencias` → `linha`

### Limpeza realizada

Foram removidos arquivos e resíduos temporários, incluindo:

- scripts corretivos de etapas antigas;
- `etapa4d-ui.js`;
- `ruinas-bridge.js`;
- relatórios antigos;
- históricos duplicados;
- notas intermediárias de extração não usadas;
- estilos exclusivos de seções removidas;
- partes antigas não carregadas do runtime.

### Validação registrada

- *Ruínas dos Céus*: 24 capítulos, 17 lugares e 14 registros da Linha do Tempo.
- *Guerras de Sangue*: 29 capítulos, 23 lugares e 31 registros da Linha do Tempo.
- Redirecionamentos antigos validados.
- Estrutura comum mantida.

---

# 7. Etapas de trabalho — especificação completa

## Etapa 3 — Auditoria canônica completa e organização escalável

**Estado:** CONCLUÍDA  
**Data:** 21/06/2026

### Objetivos cumpridos

- Auditar os dados-base dos dois livros antes das páginas profundas.
- Reorganizar todo o código e conteúdo para permitir várias sagas e dezenas de livros.
- Manter os três endereços públicos atuais sem arquivos de livro espalhados na raiz.

### Nova arquitetura

- A raiz mantém apenas `index.html`, `ruinas.html`, `guerras.html`, documentação, `.nojekyll` e `package.json`.
- Código de interface foi movido para `app/`.
- Código compartilhado foi movido para `app/shared/`.
- Cada livro passou a ocupar `app/sagas/ciclo-de-jesed/books/<livro>/`.
- Cada conjunto de dados passou a ocupar `data/sagas/ciclo-de-jesed/books/<livro>/`.
- O manifesto de IDs foi movido para `data/common/entity-manifest.json`.
- O relatório interno da auditoria foi criado em `data/sagas/ciclo-de-jesed/audits/canonical-etapa-3.json`.

### Correções canônicas aplicadas

Em *Ruínas dos Céus*:

- Capítulo 11: `Sobrevivência`.
- Capítulo 12: `O Homem no Riacho`.
- Capítulo 15: `O Peso do Silêncio`.
- Capítulo 21: `A Leveza e o Peso`.
- Capítulo 24: `O Vale`.
- A criatura conhecida no Livro I apenas como a Fera passou a ser exibida como **Rhaukar**.
- O ID `jesed-fauna-raukhar` e o slug `raukhar` foram preservados para não quebrar links.

Em *Guerras de Sangue*:

- A verdade da morte de Orionus foi confirmada e preservada: Ylvena pretendia envenenar Alyra com Beijo-da-Noite, Orionus bebeu por engano e Daryon destruiu provas e fabricou a inocência de Ylvena.
- Resumos que terminavam no meio de uma frase deixaram de exibir truncamentos abruptos. O aprofundamento completo permanece nas etapas próprias de personagens, clãs e lore.

### Auditoria de imagens e cobertura

- Identificados 15 arquivos de personagens e 17 de lugares de *Ruínas dos Céus*.
- Identificados 43 arquivos de personagens e 18 de lugares de *Guerras de Sangue*.
- Registrados aliases de arquivos para conferência futura: Monthar/Malthar, Prof Talver/Professor Talver, Asteiro/Alesteiro, Lurak/Lurok, Maela/Maelis e variações de Iressa.
- As ligações definitivas aos assets permanecem para quando a pasta `assets` for reunida ao projeto.

### Limitação registrada

O DOCX de *Guerras de Sangue* disponível nesta etapa é uma versão antiga, com capítulos escritos até 14 e resumos posteriores. Ele não pode substituir os dados finais dos 29 capítulos. Os capítulos finais permanecem baseados no conteúdo já consolidado no site e nas decisões mais recentes do autor.

### Arquivos removidos da raiz

Foram retirados da raiz todos os scripts e estilos específicos de livros e do portal, incluindo os antigos `ruinas-*`, `app.js`, `styles.css`, `portal.js`, `portal.css`, `portal-data.js` e arquivos soltos do reprodutor musical. Eles continuam no projeto em suas novas pastas definitivas.

### Validação

- Sintaxe JavaScript validada.
- Referências de HTML validadas.
- IDs e slugs históricos preservados.
- Redirecionamentos da Etapa 2 preservados.
- Ausência da pasta `assets` tratada apenas como aviso.

---

## Etapa 4 — Nova Linha do Tempo

**Estado:** CONCLUÍDA  
**Data:** 21/06/2026  
**Versão do pacote:** 0.8.0

### Objetivo executado

Transformar Acontecimentos e Linha do Tempo numa cronologia histórica real de Jesed, organizada pela data em que cada fato ocorreu e não pela ordem dos capítulos.

### Sistema temporal implantado

- **A.Q. — Antes da Queda**.
- **D.Q. — Depois da Queda**.
- A Queda de Etérea funciona como marco cronológico zero.
- O tempo é contado em **ciclos**, nunca em anos.
- Os meses são ordinais: `1º Mês`, `2º Mês`, `3º Mês` etc.
- Nenhuma data diária foi inventada.
- Datas sem precisão canônica aparecem explicitamente como aproximadas.
- A ordenação usa um `sortKey` numérico oculto, sem depender da leitura do texto visível.

### Decisão sobre Guerras de Sangue

O livro confirma que a guerra ocorre mais de duzentos ciclos D.Q., mas não fornece um ciclo absoluto seguro. Por isso:

- os acontecimentos da narrativa usam **Ciclo da guerra**;
- os meses são estimativas narrativas e aparecem como aproximados;
- acontecimentos anteriores usam relações como “40 ciclos antes da guerra” ou “logo após a morte de Orionus”;
- não foi inventado um número absoluto para o reinado de Orionus, a morte dele ou o exílio de Ylvena.

### Conteúdo criado e atualizado

#### Ruínas dos Céus

A Linha do Tempo passou a conter **30 acontecimentos**, incluindo:

- origem esquecida de Etérea;
- ensinamentos e morte de Yoral;
- exílio de Gabasteres;
- primeiros sinais da Queda;
- nuvem cinzenta;
- profecia e exílio de Yndra;
- confirmação de Talver;
- Queda de Etérea;
- primeiro fogo;
- pegadas e comida roubada;
- incêndio do abrigo;
- reencontro das irmãs;
- entrada de Gabasteres no grupo;
- chegada de Platisa;
- retorno de Malthar;
- origem do nome Polar;
- desaparecimento das reservas;
- ataque do Rhaukar;
- revelação das ruínas;
- desaparecimento de Loutes;
- morte de Malthar;
- sacrifício de Jokara;
- morte de Gabasteres e Nestira;
- chegada de Marv ao Vale.

Todos os acontecimentos possuem descrição, contexto, causa e consequências. Eventos com versões falsas ou incompletas distinguem **Versão pública** de **O que realmente aconteceu**.

#### Guerras de Sangue

A Linha do Tempo passou a conter **38 acontecimentos**, incluindo:

- formação da raiz Polar e de Kaendar;
- ascensão de Orionus;
- execução de Lirron e consolidação da Lei do Portão;
- chegada de Ylvena a Kaendar;
- morte de Orionus;
- exílio de Ylvena e ascensão das gêmeas;
- principais fatos dos 29 capítulos;
- golpe de Kaelina;
- exílio de Alyra;
- desaparecimento de Markoso;
- vinte ciclos posteriores do governo de Kaelina.

A morte de Orionus foi registrada corretamente: Ylvena pretendia envenenar Alyra com Beijo-da-Noite, Orionus bebeu por engano e Daryon destruiu ou falsificou provas para protegê-la.

### Relação entre acontecimento e capítulo

Cada ligação de capítulo informa uma relação específica:

- **Ocorre no Capítulo**;
- **Citado no Capítulo**;
- **Recordado no Capítulo**;
- **Investigado no Capítulo**;
- **Revelado no Capítulo**;
- **Consequência narrada no Capítulo**.

Um acontecimento antigo não aparece como se tivesse ocorrido no capítulo em que sua verdade foi descoberta.

### Interface concluída

Nos dois livros:

- linha vertical e marcadores preservados;
- cartões inteiros clicáveis;
- data, categoria, descrição e relações exibidas sem tags em cápsula;
- capítulos, personagens e lugares clicáveis;
- destaque de hover, foco e seleção;
- seleção persistida ao entrar e voltar da página individual;
- navegação por `Enter` e barra de espaço;
- adaptação responsiva;
- busca integrada à Linha do Tempo.

As páginas individuais apresentam:

- data;
- categoria;
- descrição;
- contexto;
- causa;
- consequências;
- capítulos relacionados e o tipo da relação;
- personagens;
- lugares;
- acontecimentos relacionados;
- versão pública e verdade, quando aplicável.

### Compatibilidade preservada

- IDs históricos mantidos.
- Slugs antigos mantidos ou registrados em `legacySlugs`.
- `events`, `event/*`, `acontecimentos`, `acontecimento/*`, `timeline/*` e demais rotas antigas continuam redirecionando para a Linha do Tempo correta.
- Os slugs antigos dos acontecimentos dos Capítulos 1 a 23 de *Guerras de Sangue* continuam resolvidos.
- Links antigos da morte de Orionus e dos acontecimentos de *Ruínas dos Céus* continuam válidos.

### Arquivos criados

- `data/sagas/ciclo-de-jesed/audits/timeline-etapa-4.json`.

### Arquivos atualizados

- `data/common/schema.js`;
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/timeline.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/timeline.js`;
- páginas e estilos da Linha do Tempo dos dois livros;
- busca de *Ruínas dos Céus*;
- metadados dos dois livros;
- `scripts/validate-content.js`;
- `scripts/audit-content.js`;
- `README.md`;
- `AI_UPDATE_RULES.md`;
- `PLANO-MESTRE-E-HISTORICO.md`;
- `package.json`.

### Arquivos removidos

- Nenhum. A etapa substituiu os dados da Linha do Tempo dentro dos arquivos permanentes.

### IDs alterados

- **0**.

### Validações realizadas

- sintaxe de todos os arquivos JavaScript;
- ordem crescente de `sortKey`;
- IDs e slugs duplicados;
- capítulos, personagens, lugares e acontecimentos relacionados inexistentes;
- páginas individuais incompletas;
- relações de capítulo inválidas;
- preservação de slugs históricos;
- verdade da morte de Orionus;
- Queda como marco zero;
- referências dos HTMLs;
- carregamento por servidor local com resposta HTTP 200 para `index.html`, `ruinas.html`, `guerras.html` e o relatório da Etapa 4;
- 38 acontecimentos de *Guerras de Sangue* e 30 de *Ruínas dos Céus* confirmados pelo validador.

### Não realizado nesta etapa

- aprofundamento das fichas de lugares;
- inclusão de populações;
- revisão de personagens que passaram por cada lugar;
- mapas e pins;
- ligação definitiva dos assets.

Essas tarefas continuam reservadas para as etapas seguintes.

---

## Etapa 5 — Lugares e rotas

**Estado:** CONCLUÍDA  
**Data de conclusão:** 21/06/2026  
**Versão do pacote:** 0.9.0

### Objetivo executado

Padronizar e aprofundar todos os lugares de *Ruínas dos Céus* e *Guerras de Sangue*, incorporar definitivamente as antigas rotas à coleção Lugares e substituir associações genéricas por cenas, personagens e acontecimentos realmente ligados a cada espaço.

### Estrutura comum criada para cada lugar

Quando aplicável, cada ficha agora possui:

- imagem principal ou fallback preparado;
- tipo de lugar;
- região;
- localização dentro do território;
- resumo breve;
- descrição completa em múltiplos parágrafos;
- função narrativa;
- arquitetura ou forma natural;
- clima e atmosfera;
- recursos;
- perigos;
- cultura ou modo de vida;
- população estimada somente quando cabível;
- personagens que passaram pelo lugar;
- capítulos com descrição específica da cena ocorrida ali;
- acontecimentos relacionados da Linha do Tempo.

### Guerras de Sangue

Foram aprofundados **23 lugares**, com **69 cenas localizadas**.

As cinco antigas rotas continuam dentro da coleção Lugares e preservam seus IDs históricos:

- `route-rio-grande` — Rio Grande;
- `route-garganta-kaendar` — Garganta de Kaendar;
- `route-garganta-seca` — Garganta Seca;
- `route-estrada-graos` — Estrada dos Grãos;
- `route-marcha-alianca` — Marcha oculta da aliança.

Foram criadas **12 estimativas de população** somente para cidades, fortalezas, aldeias, acampamentos ou localidades cuja ocupação é narrativamente relevante. Entre elas:

- Kaendar;
- Khar-Tondr;
- Nyn-Harad;
- Velarim, com população atual igual a zero e estimativa histórica;
- Margem dos Zírrios;
- Varkhama;
- Cendar-Vel;
- Urtar-Vesh;
- Acampamento dos Homens das Areias;
- Alesteiro;
- Noreval;
- Nhar-Veyr.

Rios, gargantas, estradas, florestas, regiões agrícolas, túneis, arenas e trajetos militares não exibem população.

### Ruínas dos Céus

Foram aprofundados **17 lugares**, com **48 cenas localizadas**.

A estrutura simplificada anterior foi substituída por fichas equivalentes em profundidade às de *Guerras de Sangue*. Os lugares receberam tipos próprios, como:

- arquipélago suspenso;
- ilha habitada;
- ilha ritual;
- bosque suspenso;
- centro de cura;
- lugar fictício;
- região da superfície;
- assentamento temporário;
- curso de água;
- sítio ancestral;
- região fértil.

Foram criadas **3 estimativas de população ou ocupação**, somente onde a informação é útil:

- Etérea antes da Queda;
- Nivellia antes da Queda;
- Primeiro Abrigo, cuja ocupação varia ao longo da narrativa.

### Personagens que passaram por aqui

O antigo conceito de localização baseada no último estado do personagem deixou de ser usado nas fichas.

A nova seção é:

**Personagens que passaram por aqui**

Os personagens são ligados ao lugar pelas cenas registradas no manuscrito. Cada cartão mostra:

- fotografia ou fallback;
- nome;
- capítulos em que esteve naquele espaço;
- ligação para a ficha individual.

### Capítulos ligados

Os cartões de capítulos não repetem mais o resumo geral do capítulo. Cada ligação descreve somente:

- o que aconteceu naquele lugar;
- quais personagens participaram;
- como o espaço foi utilizado;
- qual mudança narrativa ocorreu ali.

Os cartões são clicáveis e acessíveis por teclado.

### Acontecimentos relacionados

Cada lugar agora cruza seus IDs com a Linha do Tempo da Etapa 4. As fichas exibem os acontecimentos históricos ligados ao espaço, com data, título, resumo e ligação para a página individual.

### Campo Estado

O campo genérico `Estado: Activa` foi removido dos dados enriquecidos de lugares e não é mais usado pela interface.

### População

A população só aparece quando existe uma estimativa coerente. Nenhuma ficha natural recebe mensagens artificiais como “sem população aplicável”. Quando não há população, o campo simplesmente não é exibido.

As estimativas são editoriais, construídas a partir de escala urbana, multidões, número de estruturas, capacidade militar, importância comercial e relatos dos livros. O autor pode ajustá-las posteriormente sem alterar IDs ou estrutura.

### Arquivos criados

- `data/sagas/ciclo-de-jesed/audits/places-etapa-5.json`

### Arquivos alterados

- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/places.js`
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/places.js`
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/book.js`
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/book.js`
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js`
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/styles.css`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/places.js`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/styles/main.css`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/events.js`
- `ruinas.html`
- `scripts/validate-content.js`
- `scripts/audit-content.js`
- `package.json`
- `README.md`
- `AI_UPDATE_RULES.md`
- `PLANO-MESTRE-E-HISTORICO.md`

### Arquivos removidos

- Nenhum.

### Entidades atualizadas

- 23 lugares de *Guerras de Sangue*;
- 17 lugares de *Ruínas dos Céus*;
- 117 cenas específicas associadas a lugares;
- 52 ligações de acontecimentos em cada modelo carregado, considerando que um acontecimento pode aparecer em mais de um lugar;
- 15 estimativas de população ou ocupação aplicáveis nos dois livros.

### IDs alterados

- **0**.

### Redirecionamentos preservados

- `routes` e `rotas` → Lugares;
- `route/<slug>` e `rota/<slug>` → ficha do lugar correspondente;
- todos os slugs e IDs históricos das cinco rotas;
- rotas antigas de acontecimentos e Linha do Tempo da Etapa 4.

### Validações realizadas

- sintaxe de todos os JavaScript alterados;
- 23 lugares em *Guerras de Sangue*;
- 17 lugares em *Ruínas dos Céus*;
- 69 cenas localizadas em *Guerras de Sangue*;
- 48 cenas localizadas em *Ruínas dos Céus*;
- campos obrigatórios de descrição, região, localização, função narrativa, arquitetura e atmosfera;
- referências de capítulos, personagens e acontecimentos;
- inexistência de `Estado: Activa` nos modelos carregados;
- populações somente com rótulo legível;
- cinco rotas históricas incorporadas a Lugares;
- preservação da Linha do Tempo e da auditoria canônica;
- `npm run validate` concluído sem erros;
- `npm run audit` concluído sem erros.

### Referências quebradas

- **0** nas estruturas validadas.

### Assets pendentes de ligação

- A pasta `assets` não fazia parte do pacote de trabalho.
- Os caminhos já existentes foram preservados.
- A ligação definitiva das fotografias e a conferência de nomes serão feitas quando os assets forem reunidos.

### Problemas conhecidos e limites

- As estimativas populacionais são provisórias e podem ser ajustadas pelo autor.
- Alguns lugares ainda não possuem coordenadas de mapa; isso pertence à Etapa 6.
- A Ilha dos Pequenos possui cena e ficha completa, mas não tem um acontecimento direto próprio na Linha do Tempo, pois sua presença é contextual.
- A interação dos mapas de *Ruínas dos Céus* ainda será construída na próxima etapa.

### Não realizado nesta etapa

- revisão de coordenadas e pins;
- criação dos mapas interativos de Etérea e Nadírion;
- inclusão de todos os lugares nos mapas;
- painéis estratégicos do mapa de *Guerras de Sangue*;
- ligação definitiva dos assets.

Essas tarefas permanecem reservadas para a Etapa 6.

---

## Etapa 5.5 — Identidade visual, atmosfera, modo contemplativo e desempenho

**Estado:** CONCLUÍDA  
**Data de conclusão:** 21/06/2026  
**Versão do pacote:** 0.9.5

### Objetivo executado

Criar uma fundação atmosférica própria para *Ruínas dos Céus* e *Guerras de Sangue*, mantendo ambos dentro do mesmo sistema, ampliando perfis de desempenho, configurações, áudio e responsividade sem modificar o conteúdo canônico.

### Fundação comum

Foi criado `app/shared/experience/`, responsável por:

- armazenamento seguro de preferências;
- detecção de movimento reduzido;
- detecção de economia de dados e conexão lenta;
- redução automática em dispositivos mais fracos;
- avisos breves de mudança de perfil;
- componentes reutilizáveis de configurações;
- observação do estado do modo desempenho;
- suporte comum aos modos contemplativos.

Os perfis disponíveis são:

- **Completo:** maior densidade, movimento e profundidade;
- **Equilibrado:** efeitos reduzidos e sem excesso de elementos dianteiros;
- **Desempenho:** fundos estáticos, sem partículas dinâmicas, parallax ou névoa frontal;
- **Personalizado:** ativado automaticamente quando o usuário altera controles individuais.

Preferências globais continuam separadas das preferências específicas dos livros.

### Ruínas dos Céus

#### Menu lateral

O menu recebeu:

- textura discreta de céu e pedra suspensa;
- fissuras e raízes partidas;
- fragmentos junto à borda direita;
- névoa suave;
- movimento mínimo no perfil Completo;
- versão reduzida no perfil Equilibrado;
- versão estática no perfil Desempenho;
- identidade preservada quando o menu está recolhido;
- ícones e tooltips permanentes no estado recolhido.

#### Céu e nuvens

Foi implantado um sistema de três profundidades:

- nuvens distantes;
- nuvens intermédias;
- névoa próxima.

As nuvens possuem volumes compostos, duração, escala, altura e opacidade variadas. O sistema reage às fases:

- amanhecer;
- dia;
- entardecer;
- noite.

Sol e lua percorrem trajetórias visuais coerentes. Estrelas, iluminação e sombras das nuvens mudam gradualmente.

#### Relógio temporário

A barra superior de Ruínas possui um controle temporário que:

- seleciona qualquer horário entre 00:00 e 23:59;
- atualiza imediatamente céu, sol, lua e nuvens;
- mostra o horário selecionado;
- permite retornar ao ciclo automático;
- usa apenas o estado da sessão, sem transformar o teste em preferência permanente.

#### Personalidade e contemplação

Também foram adicionados:

- cartões com aparência suspensa;
- pequenos detalhes de vento e fragmentação;
- transição temática de corrente de vento;
- fissuras contextuais mais fortes em páginas de queda e ruínas;
- parallax discreto, desligado no perfil Desempenho;
- modo contemplativo com Etérea, ilhas, raízes, nuvens, sol, lua e música;
- saída por botão ou tecla `Escape`.

### Guerras de Sangue

#### Menu lateral

O menu recebeu:

- textura de couro, pergaminho, madeira e cartografia;
- linhas territoriais e marcas de tinta;
- selos de clã irregulares e de baixa opacidade;
- reação discreta ao entrar na seção Clãs;
- marca contextual do clã aberto;
- marca Fendelar neutra e não heráldica, sem criação de brasão canônico;
- versão estática simplificada no perfil Desempenho.

#### Partículas

O sistema anterior foi ampliado para dois Canvas otimizados:

- camada traseira;
- camada dianteira.

Os tipos são distintos:

- brasas pequenas;
- faíscas rápidas;
- cinzas escuras;
- poeira quente;
- turbulência por rajadas imprevisíveis.

Existem limites rígidos, redução móvel, pausa quando a aba está oculta e limpeza ao mudar de perfil ou fechar o modo contemplativo.

#### Personalidade e contemplação

Foram adicionados:

- textura cartográfica de fundo;
- detalhes de tinta e pigmento;
- reflexo metálico ocasional no perfil Completo;
- transição temática de mapa e cinzas;
- modo contemplativo noturno de Kaendar, com Rio Grande, lua, nuvens, cinzas e iluminação distante;
- saída por botão ou tecla `Escape`.

A imagem de Kaendar é temporária e não pretende substituir a arte canônica.

### Barra superior, áudio e dispositivos móveis

Os controles de utilidade foram agrupados no extremo direito:

- modo desempenho;
- música;
- silenciar;
- volume;
- configurações;
- relógio temporário em Ruínas.

Em telas menores:

- controles são compactados;
- o layout não cria scroll horizontal;
- sliders deixam de ocupar espaço permanente quando necessário;
- os modos contemplativos continuam acessíveis;
- densidade, blur e elementos dianteiros são reduzidos.

O botão de modo desempenho agora possui estado visual inequívoco, tooltip atualizado e aviso breve ao ser ativado ou desativado.

### Acessibilidade e desempenho

Foram preservados ou adicionados:

- foco visível;
- `aria-label` nos controles;
- sliders acessíveis;
- saída com `Escape`;
- ausência de flashes;
- estados ativos que não dependem apenas de cor;
- respeito a `prefers-reduced-motion`;
- detecção de `saveData`;
- redução por hardware e viewport;
- pausa de Canvas e cálculos quando a aba está oculta;
- uso prioritário de `transform`, `opacity`, CSS e Canvas;
- nenhuma biblioteca externa nova.

### Preferências específicas

Chaves de Ruínas usam o prefixo:

`di-ruinas-`

Chaves de Guerras usam o prefixo:

`di-guerras-`

Isso impede que nuvens, céu, brasões, brasas ou cinzas de um livro alterem o outro.

### Recursos temporários

Foram criados:

- `assets/atmosphere/ruinas/sidebar-sky-stone.webp`;
- `assets/atmosphere/guerras/sidebar-leather-map.webp`;
- `assets/atmosphere/ruinas/eterea-contemplative.webp`;
- `assets/atmosphere/guerras/kaendar-night.webp`;
- `assets/clans/temp/fendelar-mark.webp`.

Instruções completas de substituição estão em:

`docs/CATALOGO-DE-IMAGENS-ATMOSFERICAS-E-SOCIAIS.md`

Os placeholders são neutros, locais e não canônicos. Não foram incorporados em Base64.

### Arquivos criados

- `app/shared/experience/common.js`
- `app/shared/experience/common.css`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/experience.js`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/styles.css`
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/experience.js`
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/experience/styles.css`
- cinco recursos temporários em `assets/**/temp/`
- `data/sagas/ciclo-de-jesed/audits/visual-etapa-5-5.json`
- `docs/CATALOGO-DE-IMAGENS-ATMOSFERICAS-E-SOCIAIS.md`
- dezesseis capturas em `docs/screenshots/`

### Arquivos alterados

- `ruinas.html`
- `guerras.html`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/base.js`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/events.js`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/main.js`
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js`
- `scripts/validate-content.js`
- `scripts/audit-content.js`
- `package.json`
- `README.md`
- `AI_UPDATE_RULES.md`
- `PLANO-MESTRE-E-HISTORICO.md`

### Arquivos removidos

- Nenhum.

### Entidades e conteúdo

- Entidades canônicas criadas: **0**.
- Entidades canônicas removidas: **0**.
- IDs alterados: **0**.
- Textos canônicos alterados: **0**.
- Páginas, filtros, relações e funcionalidades removidos: **0**.

### Validações realizadas

- sintaxe de todos os JavaScript;
- `npm run validate`;
- `npm run audit`;
- carregamento dos dois livros sem erros de página;
- menu aberto e recolhido;
- perfis Completo, Equilibrado e Desempenho;
- alteração manual para Personalizado;
- painel de configurações e controles específicos;
- relógio manual, ciclo automático, dia, entardecer e noite;
- abertura e fechamento repetido dos modos contemplativos;
- saída por `Escape`;
- Canvas traseiro e dianteiro;
- ausência de scroll horizontal em viewport de 390 píxeis;
- desktop e simulação móvel;
- ausência de dependências externas novas.

As capturas de revisão estão em `docs/screenshots/`.

### Limitações registradas

- A pasta completa de assets canônicos não acompanhou o pacote de trabalho.
- Etérea e Kaendar usam composições SVG temporárias e neutras.
- O relógio de Ruínas continua temporário até a aprovação visual do ciclo.
- A navegação direta para localhost e `file://` foi bloqueada pelo ambiente de testes; as páginas foram carregadas com todos os recursos locais interceptados pelo navegador, sem erros de console.
- A Etapa 16 continua responsável pela padronização visual detalhada de todas as categorias; a Etapa 5.5 criou a fundação atmosférica e de desempenho.

### Não realizado nesta etapa

- nenhuma alteração canônica;
- ligação definitiva de todas as artes e brasões;
- construção dos mapas interativos;
- reestruturação de páginas de personagens, relações, clãs ou lore;
- publicação ou push para o GitHub.

---

## Etapa 6 — Mapas interativos

**Estado:** CONCLUÍDA  
**Data de conclusão:** 21/06/2026  
**Versão do pacote:** 0.9.6

### Objetivo executado

Transformar os mapas dos dois livros em interfaces interativas completas, incluir todos os lugares já existentes, preservar rotas como entidades geográficas e acrescentar a leitura estratégica de *Guerras de Sangue*. A etapa também incorporou dois ajustes solicitados pelo autor: navegação entre capítulos no topo e revisão dos Personagens em foco das páginas iniciais.

### Módulo compartilhado

Foi criado `app/shared/maps/`, contendo:

- `interactive-map.js`;
- `interactive-map.css`.

O módulo oferece:

- aproximação e afastamento;
- deslocamento com rato, toque ou caneta;
- centralização;
- alternância dos nomes;
- tela inteira quando suportada;
- navegação por teclado;
- pins com nomes;
- fichas rápidas;
- abertura da página completa do lugar;
- foco programático a partir de índices e informações estratégicas;
- comportamento responsivo;
- redução de movimento quando solicitada pelo sistema.

### Ruínas dos Céus

Foram mantidos dois mapas separados:

1. **Etérea — Capítulos 1 a 9**;
2. **A Superfície — Capítulos 10 a 24**.

Os textos aparecem integrados sobre cada mapa.

#### Etérea

- Civilização suspensa;
- Harmonia ritual;
- Vento e leveza;
- Sociedade organizada.

#### A Superfície

- Natureza desconhecida;
- Sobrevivência;
- Terra, peso e fome;
- Ausência de civilização humana conhecida.

Resultado cartográfico:

- 17 lugares localizados;
- 11 pins no mapa de Etérea;
- 6 pins no mapa da Superfície;
- todos os lugares criados vinculados a um dos mapas;
- Ilhas Baixas preservadas como localização mítica, sem tratá-las como lugar real;
- índice cartográfico clicável;
- troca de mapa sem alterar a rota pública;
- funcionamento em telas menores.

### Guerras de Sangue

O mapa principal passou a conter os 23 lugares criados no sistema.

As cinco antigas rotas continuam com seus IDs históricos e aparecem como lugares:

- Rio Grande;
- Garganta de Kaendar;
- Garganta Seca;
- Estrada dos Grãos;
- Marcha oculta da aliança.

Foi acrescentada uma camada de linhas para indicar rotas fluviais, terrestres e militares sem criar uma seção independente de Rotas.

A área estratégica mostra apenas categorias com duas ou mais informações. Foram incluídas sete categorias válidas:

- clãs em conflito;
- alianças confirmadas;
- alianças suspeitas;
- territórios disputados;
- rotas ameaçadas;
- recursos estratégicos;
- forças em movimento.

Cada informação estratégica liga novamente aos pins dos lugares relacionados.

### Navegação entre capítulos

Em *Guerras de Sangue*:

- os botões de capítulo anterior e seguinte foram retirados da parte inferior;
- a navegação foi colocada no topo da ficha, logo depois do cabeçalho.

Em *Ruínas dos Céus*:

- foi criada a mesma navegação no topo;
- primeiro e último capítulo recebem estados desativados claros.

### Personagens em foco

Nas páginas iniciais dos dois livros:

- aparecem somente personagens principais;
- o estado do personagem deixou de ser exibido;
- cada personagem recebeu uma descrição leve de no máximo quatro palavras;
- continuam preservadas foto, nome e ligação para a ficha.

Personagens escolhidos em *Ruínas dos Céus*:

- Jokara;
- Nestira;
- Marv;
- Loutes;
- Gabasteres.

Personagens escolhidos em *Guerras de Sangue*:

- Kaelina;
- Alyra;
- Rendar;
- Daryon;
- Nynestra.

### Assets incorporados

Foram incluídas versões WebP otimizadas dos mapas fornecidos pelo autor:

- `assets/maps/ruinas-dos-ceus/Mapa de Etérea.webp`;
- `assets/maps/ruinas-dos-ceus/Mapa de Nadírion (Floresta de Mirval).webp`;
- `assets/maps/ruinas-dos-ceus/mapa-combinado.webp`;
- `assets/maps/guerras-de-sangue/mapa-geral.webp`;
- `assets/maps/guerras-de-sangue/mapa-geral.webp`, mantido como caminho de compatibilidade da página inicial.

### Arquivos criados

- `app/shared/maps/interactive-map.js`
- `app/shared/maps/interactive-map.css`
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/maps.js`
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/maps.js`
- `data/sagas/ciclo-de-jesed/audits/maps-etapa-6.json`
- cinco arquivos WebP em `assets/maps/` e no caminho de compatibilidade.

### Arquivos alterados

- `ruinas.html`
- `guerras.html`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/app.js`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/main.js`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/pages/places.js`
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/styles/main.css`
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js`
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/styles.css`
- `scripts/validate-content.js`
- `scripts/audit-content.js`
- `package.json`
- `README.md`
- `AI_UPDATE_RULES.md`
- `PLANO-MESTRE-E-HISTORICO.md`

### Arquivos removidos

- Nenhum.

### Entidades e compatibilidade

- Entidades canônicas criadas: **0**.
- Entidades canônicas removidas: **0**.
- IDs alterados: **0**.
- IDs históricos das rotas preservados: **5**.
- Rotas antigas e páginas de lugares preservadas.
- Conteúdo canônico alterado: **0**.
- GitHub alterado: **não**.

### Validações realizadas

- sintaxe dos arquivos JavaScript;
- `npm run validate`;
- `npm run audit`;
- dois mapas de Ruínas confirmados;
- 17 de 17 lugares de Ruínas mapeados;
- 23 de 23 lugares de Guerras mapeados;
- cinco rotas históricas confirmadas como lugares;
- sete categorias estratégicas com ao menos duas informações;
- imagens de mapa presentes no pacote;
- CSS e JavaScript compartilhados carregados nos dois HTMLs;
- navegação superior entre capítulos confirmada nos dois livros;
- descrições curtas dos Personagens em foco confirmadas;
- páginas servidas localmente com resposta HTTP 200;
- navegador real com 11 pins em Etérea, 6 na Superfície e 23 em Guerras;
- sete cartões estratégicos e cinco linhas de rota renderizados;
- ausência de exceções JavaScript nos mapas;
- ausência de scroll horizontal em 390 píxeis;
- sete capturas de revisão em `docs/screenshots/etapa-6/`.

### Limitações registradas

- As coordenadas de pins que não existiam foram posicionadas editorialmente sobre os mapas e podem receber ajustes visuais finos após revisão do autor.
- O navegador do ambiente bloqueia a abertura direta de endereços locais; os testes visuais foram executados por DevTools com todos os recursos locais interceptados. Os mapas carregaram sem exceções de execução, e a revisão final de gosto visual permanece com o autor.
- A pasta completa de retratos, brasões e demais artes canônicas continua fora deste pacote; os mapas necessários a esta etapa foram incorporados.

### Não realizado nesta etapa

- revisão visual das páginas iniciais além dos Personagens em foco;
- remoção da seção Últimos capítulos;
- criação dos cartões de Lugares nas páginas iniciais;
- alteração das fichas de personagens, relações, clãs ou lore;
- publicação ou push para o GitHub.

---

## Etapa 7 — Páginas iniciais

**Estado:** CONCLUÍDA  
**Data de conclusão:** 21/06/2026  
**Versão do pacote:** 0.9.7

### Objetivo executado

Transformar as páginas iniciais dos dois livros em guias de navegação equivalentes, remover a seção redundante de capítulos recentes e alinhar os caminhos de imagens ao inventário WebP real fornecido pelo autor.

### Ruínas dos Céus

- o topo passou a usar a identificação **Ciclo de Jesed — Guia do Livro**;
- os cartões internos foram reduzidos aos quatro caminhos solicitados: Personagens, Relações, Linha do Tempo e Capítulos;
- em desktop, os quatro cartões permanecem numa única linha;
- a seção **Últimos capítulos** foi removida;
- Personagens em foco foi preservado com cinco figuras principais e descrições curtas;
- foi criada a seção **Lugares**, com seis cartões fotográficos, nome, tipo ou região e ligação para a ficha;
- foram adicionadas duas prévias cartográficas separadas: Etérea e A Superfície;
- cada prévia abre o mapa interativo já no período correspondente.

### Guerras de Sangue

- o topo passou a usar a identificação **Ciclo de Jesed — Guia do Livro**;
- os quatro cartões internos são Personagens, Relações, Linha do Tempo e Capítulos;
- o antigo atalho de Acontecimentos não voltou a existir;
- a seção **Últimos capítulos** foi removida;
- Personagens em foco foi preservado com cinco figuras principais e descrições curtas;
- foi criada a seção **Lugares**, com seis cartões fotográficos e ligações para as fichas;
- o mapa grande foi mantido no topo;
- as sete categorias estratégicas da Etapa 6 aparecem como atalhos resumidos, sem duplicar os detalhes da página do mapa.

### Ajuste dos caminhos de imagens

O arquivo fornecido pelo autor foi incorporado como:

`data/common/assets-manifest.json`

Foram corrigidos:

- logos e marcas de `.png` para os nomes WebP reais;
- ilustrações de todos os 29 capítulos de *Guerras de Sangue*;
- ilustrações disponíveis dos capítulos de *Ruínas dos Céus*;
- retratos de *Guerras de Sangue* para `assets/characters/guerras-de-sangue/`;
- caminhos definitivos dos mapas;
- referências usadas pelo portal e pelas páginas dos dois livros.

Os capítulos 19 e 22 de *Ruínas dos Céus* continuam sem imagem porque o inventário não contém arquivos correspondentes. Nenhum caminho foi inventado para eles.

### Arquivos criados

- `data/common/assets-manifest.json`;
- `data/sagas/ciclo-de-jesed/audits/home-assets-etapa-7.json`.

### Arquivos alterados

- páginas iniciais e estilos dos dois livros;
- dados de capítulos e personagens com caminhos de imagem;
- mapas e arquivos do portal que referenciam branding;
- `scripts/validate-content.js`;
- `scripts/audit-content.js`;
- `README.md`;
- `AI_UPDATE_RULES.md`;
- `PLANO-MESTRE-E-HISTORICO.md`;
- `package.json`.

### Arquivos removidos

- `assets/mapa-guerras-de-sangue.webp`, duplicata temporária da Etapa 6;
- nomes temporários dos mapas `mapa-eterea.webp`, `mapa-superficie.webp` e `mapa-guerras-de-sangue.webp`, substituídos pelos nomes definitivos do inventário.

### IDs alterados

- **0**.

### Validação realizada

- 169 registros no inventário, correspondendo a 168 caminhos únicos;
- 143 referências literais de imagem analisadas no código, com 128 caminhos únicos;
- 124 caminhos canônicos utilizados diretamente e quatro recursos temporários locais utilizados pelo código;
- nenhuma extensão `.png`, `.jpg` ou `.jpeg` mantida nas referências activas;
- nenhum caminho de imagem sem correspondência segura;
- quatro cartões orientadores, cinco personagens em foco e seis lugares em cada página inicial;
- duas prévias cartográficas em *Ruínas dos Céus* e sete atalhos estratégicos em *Guerras de Sangue*;
- zero exceções JavaScript nas duas páginas iniciais no teste Chromium;
- nenhum scroll horizontal em 390 píxeis.

### Princípio preservado

A página inicial orienta e encaminha. Descrições profundas continuam nas páginas de personagens, relações, capítulos, lugares, mapas e Linha do Tempo.

---

## Etapa 8 — Personagens

**Estado:** CONCLUÍDA  
**Data de conclusão:** 21/06/2026  
**Versão do pacote:** 0.9.8

### Objetivo executado

Padronizar as páginas de Personagens dos dois livros, oferecer pesquisa e dois modos de visualização equivalentes, aprofundar a Trajetória como ação específica do personagem em cada capítulo e ligar todos os retratos disponíveis no inventário oficial.

### Sistema compartilhado

Foi criado o módulo reutilizável:

- `app/shared/characters/browser.js`;
- `app/shared/characters/browser.css`.

O módulo oferece:

- cartões grandes;
- lista compacta;
- pesquisa textual;
- persistência da visualização separada por livro;
- acessibilidade por teclado;
- responsividade;
- suporte a movimento reduzido.

As preferências usam chaves próprias:

- `di-ruinas-character-view`;
- `di-guerras-character-view`.

A antiga chave de *Guerras de Sangue* é migrada quando encontrada, sem quebrar preferências já guardadas.

### Ruínas dos Céus

- a página passou a usar a frase-guia: **“Habitantes de Etérea e sobreviventes transformados pela Queda, entre a leveza do céu e o peso da superfície.”**;
- foi adicionada pesquisa por nome, subtítulo, descrição e estado;
- foi criada alternância entre cartões grandes e lista compacta;
- os cartões grandes mostram retrato, nome, subtítulo simples e descrição curta;
- subtítulos como “Protagonista e Âncora” aparecem como texto simples, sem cápsula, círculo ou borda própria;
- a lista compacta mostra retrato, nome, subtítulo, resumo e quantidade de capítulos;
- a ficha individual deixou de exibir o campo redundante **Aparições**;
- a aba **Trajetória** mantém capítulos clicáveis e apresenta exclusivamente ações específicas do personagem;
- foram preenchidas as lacunas de trajetória de Marv, Loutes, Sersi e Platisa;
- os 15 personagens possuem retrato ligado ao inventário oficial;
- foram validadas 149 ligações entre personagens e capítulos, sem nenhuma trajetória ausente.

### Guerras de Sangue

- a página passou a usar a frase-guia: **“Figuras de clãs, alianças e rivalidades que atravessam a guerra e disputam memória, território e poder.”**;
- foi adicionada pesquisa equivalente à de *Ruínas dos Céus*;
- os filtros de clã continuam disponíveis e funcionam em conjunto com a pesquisa;
- cartões grandes e lista compacta passaram a utilizar o mesmo sistema compartilhado;
- os cartões exibem retrato, nome, subtítulo e descrição curta;
- a lista mostra mais personagens simultaneamente, mantendo acesso direto à ficha;
- a aba **Trajetória** não utiliza mais o resumo geral do capítulo como fallback;
- foram preenchidas todas as lacunas restantes de trajetória, incluindo aparições presenciais, menções e ausências narrativamente relevantes já registradas nos dados;
- foram validadas 293 ligações entre personagens e capítulos, sem nenhuma trajetória ausente;
- 42 imagens disponíveis foram ligadas;
- a segunda imagem de Orionus foi incorporada como retrato alternativo na visão geral da ficha;
- Eshvar, Maedra e Capitão Lirron continuam com fallback porque não possuem retrato no inventário atual.

### Imagens

Todas as imagens de personagens existentes no inventário foram utilizadas:

- 15 caminhos de *Ruínas dos Céus*;
- 42 caminhos de *Guerras de Sangue*, incluindo o retrato alternativo de Orionus;
- nenhum caminho foi inventado;
- nenhuma imagem disponível ficou sem ligação.

### Arquivos criados

- `app/shared/characters/browser.js`;
- `app/shared/characters/browser.css`;
- `data/sagas/ciclo-de-jesed/audits/characters-etapa-8.json`;
- dez capturas em `docs/screenshots/etapa-8/`, incluindo desktop e dispositivos móveis.

### Arquivos alterados

- `ruinas.html`;
- `guerras.html`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/characters/list.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/characters/detail.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/characters/tabs/trajetoria.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/events.js`;
- `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/styles/main.css`;
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/app.js`;
- `app/sagas/ciclo-de-jesed/books/guerras-de-sangue/styles.css`;
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/trajectory.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/trajectory.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/characters.js`;
- `scripts/validate-content.js`;
- `scripts/audit-content.js`;
- `README.md`;
- `AI_UPDATE_RULES.md`;
- `PLANO-MESTRE-E-HISTORICO.md`;
- `package.json`.

### Arquivos removidos

- nenhum.

### Entidades e compatibilidade

- personagens canônicos criados: **0**;
- personagens canônicos removidos: **0**;
- IDs alterados: **0**;
- slugs ou rotas alterados: **0**;
- conteúdo canônico reescrito: **0**;
- GitHub alterado: **não**.

### Validações realizadas

- 15 personagens em *Ruínas dos Céus*;
- 45 personagens em *Guerras de Sangue*;
- 57 caminhos de retrato disponíveis e ligados;
- 149 ligações de trajetória em Ruínas;
- 293 ligações de trajetória em Guerras;
- nenhuma trajetória sem texto específico;
- nenhuma reutilização do resumo geral do capítulo como fallback;
- campo Aparições removido da ficha de Ruínas;
- pesquisa e alternância de visualização confirmadas nos dois livros;
- sintaxe de todos os arquivos JavaScript;
- `npm run validate`;
- `npm run audit`;
- visualização em desktop e largura móvel;
- ausência de scroll horizontal em 390 píxeis;
- nenhuma exceção JavaScript registrada nos testes da página de Personagens.

### Limitações registradas

- os binários dos retratos não acompanham o pacote intermediário; os caminhos foram conferidos pelo inventário oficial e funcionarão quando reunidos à pasta `assets` completa;
- Eshvar, Maedra e Capitão Lirron não possuem imagem disponível;
- a revisão estética final das fotografias depende da reunião do pacote com os assets reais.

### Não realizado nesta etapa

- alterações nas páginas de Relações, Famílias ou Organizações;
- criação de novos personagens;
- mudança de cânone;
- publicação ou push para o GitHub.

---

## Etapa 9 — Relações, família, organizações e atmosfera com imagens

**Estado:** CONCLUÍDA EM 21/06/2026  
**Pacote:** 0.9.9

### Relações em Ruínas dos Céus

- criada legenda com oito tipos: família, amizade, proteção, influência, conflito, rivalidade, lealdade e relação rompida;
- as linhas do mapa usam as mesmas categorias visuais da legenda;
- foram estruturadas doze relações com participantes, tipo, estado, descrição, perspectiva de cada personagem e evolução;
- os cartões mostram os dois personagens e permitem abrir suas fichas;
- a aba Relações das fichas individuais passou a usar os mesmos dados enriquecidos.

### Família em Ruínas dos Céus

- mantida somente a ficha **Os Amaréa**;
- membros: Yoral, Mirel, Jokara, Nestira e Loutes como criança acolhida;
- incluídos vida familiar, casa em Nivellia, crenças, Sopro e Peso, perda de Yoral, diferenças entre as irmãs, acolhimento de Loutes e importância para a Queda;
- todos os membros são clicáveis;
- adicionada imagem social substituível em caminho permanente.

### Organizações

Em *Ruínas dos Céus*:

- Oradores da Corrente;
- Ecoantes;
- Tecelões de Vento;
- sobreviventes de Nadírion.

Cada ficha contém imagem, tipo, função, descrição, atuação e membros ligados.

Em *Guerras de Sangue*:

- preservadas três famílias e três organizações já existentes;
- adicionadas imagens, subtítulos, detalhes, função, atuação, temas e membros com retratos clicáveis.

### Atmosfera baseada em imagens

- substituídas referências atmosféricas SVG por WebP locais;
- nuvens de Ruínas agora usam imagens transparentes em três camadas;
- sol, lua, fragmentos, raízes, menu lateral e cenário contemplativo usam imagens rasterizadas;
- partículas de Guerras usam sprites WebP de brasa, faísca e cinza no Canvas;
- poeira quente, fumaça, textura cartográfica, couro, reflexo metálico e cenário de Kaendar usam imagens WebP;
- cartões e fichas de lugares receberam sobreposições atmosféricas próprias por livro;
- nenhum plugin ou dependência externa foi acrescentado;
- os fallbacks anteriores foram preservados para que arquivos ausentes não provoquem falha do site.

### Catálogo de imagens

Criados:

- `docs/CATALOGO-DE-IMAGENS-ATMOSFERICAS-E-SOCIAIS.md`;
- `data/common/image-requirements-etapa-9.json`.

Os arquivos registram quarenta imagens com:

- nome;
- pasta e caminho exatos;
- dimensão recomendada;
- necessidade de transparência;
- função;
- instrução de substituição direta.

Todos os quarenta caminhos possuem placeholders WebP locais. As artes definitivas podem substituí-los sem qualquer edição de código.

### Arquivos principais criados

- `app/shared/social/network.css`;
- `data/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/social.js`;
- `data/sagas/ciclo-de-jesed/books/guerras-de-sangue/social.js`;
- `data/sagas/ciclo-de-jesed/audits/social-etapa-9.json`;
- catálogo humano e catálogo de máquina das imagens;
- quarenta placeholders WebP atmosféricos e sociais.

### Arquivos removidos

- antigos SVG temporários de textura, contemplação e marca Fendelar;
- `docs/ETAPA-5.5-RECURSOS-TEMPORARIOS.md`, substituído pelo catálogo completo da Etapa 9;
- pastas temporárias vazias sem uso.

### Validações

- 12 relações enriquecidas em Ruínas;
- 8 tipos de relação;
- 1 família em Ruínas, com 5 membros e 7 blocos narrativos;
- 4 organizações em Ruínas;
- 3 famílias e 3 organizações em Guerras;
- 40 imagens substituíveis com arquivos locais;
- zero referências SVG atmosféricas ativas;
- zero IDs alterados;
- zero mudanças canônicas;
- sintaxe JavaScript validada;
- `npm run validate` e `npm run audit` concluídos;
- teste visual de Relações de Ruínas e Famílias de Guerras sem exceções;
- teste móvel de Relações de Ruínas sem scroll horizontal.

### Limitações conhecidas

- os WebP incluídos são placeholders técnicos, não artes canônicas definitivas;
- as imagens finais de família e organizações dependem das referências visuais que o autor produzir;
- os retratos canônicos completos continuam sendo reunidos com a pasta `assets` principal.

### Não realizado

- nenhuma criação de brasão Fendelar;
- nenhuma mudança de cânone;
- nenhum push ou publicação no GitHub;
- nenhuma alteração da Etapa 10 — Clãs.

---

## Etapa 10 — Clãs

**Estado:** PENDENTE

### Aplicação

Principalmente *Guerras de Sangue*.

### Textos

Reescrever e completar:

- origem;
- território;
- cultura;
- economia;
- modo de vida;
- estrutura social;
- alimentação;
- relações com outros clãs;
- forças;
- fragilidades;
- participação na guerra;
- situação ao final do livro.

### Personagens

Mover personagens do clã para baixo dos textos.

Mostrar horizontalmente:

- fotos;
- nomes;
- funções;
- cartões clicáveis;
- quebra responsiva.

### Remover

- Lore relacionada como bloco genérico na página do clã.

### Adicionar abaixo

#### Alimentos

- comidas e ingredientes ligados ao clã;
- cards com fotos;
- links para as fichas.

#### Fauna

- animais comuns nas terras;
- caça;
- criação;
- transporte;
- alimentação;
- guerra;
- significado cultural.

#### Flora

Adicionar quando houver relevância territorial clara.

---

## Etapa 11 — Fauna, flora e alimentos

**Estado:** PENDENTE

### Contagens

Recontar todas as citações com base no manuscrito canônico mais recente.

Verificar:

- singular e plural;
- grafias variantes;
- aliases;
- nomes indiretos;
- a Fera como Raukhar, quando for a mesma criatura.

### Listagem

Nos cartões, mostrar somente:

- foto;
- nome;
- breve descrição;
- total de citações.

Não mostrar o texto completo na listagem.

### Página individual

Ao clicar, mostrar:

- imagem;
- descrição completa;
- características;
- habitat;
- usos;
- relação com povos ou clãs, quando aplicável;
- total de citações;
- lista completa das citações.

### Campo Citações no livro

Cada menção deve mostrar:

- capítulo;
- trecho citado;
- contexto curto;
- link para o capítulo.

O número “X vezes citado” deve aparecer junto da lista, não apenas como selo no topo.

### Ruínas dos Céus

Adicionar cartões com fotos para:

- fauna;
- flora;
- alimentos.

Todos devem ser clicáveis como em *Guerras de Sangue*.

### Campos específicos

- Não incluir relação com clãs em *Ruínas dos Céus* se isso não fizer sentido para o período.
- Compartilhar apenas campos pertinentes.

### Filtros e ordenação

Decisão mais recente:

- remover filtros visíveis de fauna, flora e alimentos em *Ruínas dos Céus*;
- remover filtros de conceitos nos dois livros.

Pedido anterior conciliado:

- a ordenação alfabética e por número de citações pode existir como ordenação, sem voltar a criar filtros incompatíveis;
- a exportação de itens não citados pode continuar como utilitário separado, caso ainda seja útil;
- não criar filtro por clã em *Ruínas dos Céus*.

---

## Etapa 12 — Conceitos

**Estado:** PENDENTE

### Nos dois livros

- Remover filtros da página de conceitos.

### Ruínas dos Céus

- Transformar conceitos em cartões clicáveis, como em *Guerras de Sangue*.

Cada página pode conter:

- definição;
- origem;
- funcionamento conhecido;
- interpretações;
- personagens relacionados;
- capítulos;
- citações;
- dúvidas preservadas pelo texto.

O Sopro, Etérea e outros elementos ambíguos não devem receber respostas excessivamente fechadas.

---

## Etapa 13 — Mistérios

**Estado:** PENDENTE

### Revisão completa

Atualizar todos os mistérios dos dois livros.

### Nova estrutura

Cada mistério deve mostrar:

1. como surgiu;
2. primeiras pistas;
3. caminhos de investigação;
4. descobertas intermediárias;
5. pistas falsas ou red herrings;
6. contradições;
7. revelação final;
8. consequências;
9. capítulos relacionados;
10. personagens e lugares relacionados.

### Remover

- “Resposta no ponto escrito”.

Os dois livros estão finalizados, então a ficha deve apresentar a evolução completa.

### Red herrings

- Registrar somente pistas falsas realmente presentes ou sugeridas.
- Não inventar red herrings para preencher campo.
- Omitir o campo quando não houver.

### Ruínas dos Céus

As fichas atuais são simples demais e devem alcançar o nível de profundidade de *Guerras de Sangue*.

---

## Etapa 14 — Temas

**Estado:** PENDENTE

### Ruínas dos Céus

Criar uma seção de temas equivalente à de *Guerras de Sangue*, mas adaptada.

Possíveis temas a extrair do texto:

- Peso e Sopro;
- queda e sobrevivência;
- tradição e dúvida;
- fé e interpretação;
- família e legado;
- destino e livre-arbítrio;
- civilização e natureza;
- memória;
- sacrifício;
- reconstrução.

Cada tema deve ter cartão interativo e página ou expansão com:

- descrição;
- desenvolvimento;
- personagens;
- lugares;
- capítulos;
- acontecimentos;
- símbolos;
- evolução ao longo do livro.

---

## Etapa 15 — Galerias

**Estado:** PENDENTE

### Ambos os livros

Padronizar galerias e criar a de *Ruínas dos Céus*.

### Filtros permitidos

- capítulos;
- personagens;
- lugares;
- mapas;
- acontecimentos;
- fauna;
- flora;
- alimentos;
- clãs e emblemas apenas em *Guerras de Sangue*;
- outras categorias realmente existentes.

### Visualizador

Ao clicar numa imagem:

- não abrir página de detalhes;
- abrir somente a imagem em tela cheia;
- fundo escuro;
- fechar;
- anterior;
- seguinte;
- setas do teclado;
- tecla Esc;
- contador de posição;
- legenda discreta.

A navegação deve respeitar o filtro ativo.

---

## Etapa 16 — Padronização visual e responsividade

**Estado:** PENDENTE

### Objetivo

Fazer os dois livros parecerem partes do mesmo sistema, mantendo identidades visuais próprias.

### Tarefas

- Padronizar cartões.
- Padronizar fotografias.
- Padronizar subtítulos.
- Corrigir contrastes.
- Corrigir texto branco sobre fundo claro.
- Ajustar tamanhos e espaçamentos.
- Revisar desktop, tablet e celular.
- Garantir quebra correta de cartões horizontais.
- Garantir fallback para imagens ausentes.
- Manter nuvens em *Ruínas dos Céus*.
- Manter partículas traseiras e dianteiras em *Guerras de Sangue*.
- Garantir botão de desempenho sempre acessível e com estado visual claro.
- Confirmar que nenhum livro pareça secundário em relação ao outro.

---

## Etapa 17 — Limpeza técnica final

**Estado:** PENDENTE

### Objetivo

Remover definitivamente tudo o que ficou obsoleto após as novas páginas funcionarem.

### Remover quando não houver mais uso

- componentes antigos de Acontecimentos;
- componentes antigos de Causa e consequência;
- componentes de Continuidade;
- componentes de Decisões do autor;
- componentes de Rotas;
- filtros removidos;
- estilos CSS órfãos;
- imagens duplicadas;
- scripts obsoletos;
- arquivos temporários;
- dados de teste;
- aliases e bridges que já não sejam necessários.

### Não remover

- imagens ainda não ligadas, mas válidas;
- arquivos canônicos;
- IDs estáveis;
- redirecionamentos necessários;
- dados ainda usados por páginas antigas durante migração;
- assets ausentes do pacote intermediário.

---

## Etapa 18 — Validação final

**Estado:** PENDENTE

### Checklist funcional

- páginas iniciais;
- pesquisa de personagens;
- cartões e lista;
- relações;
- família Amaréa;
- organizações;
- clãs;
- mapas;
- pins;
- todos os lugares;
- rotas incorporadas;
- população somente quando aplicável;
- capítulos por lugar com descrição específica;
- Linha do Tempo;
- datas A.Q. e D.Q.;
- páginas individuais de acontecimentos;
- morte de Orionus;
- citações de fauna, flora e alimentos;
- totais;
- conceitos;
- mistérios;
- temas;
- galerias;
- lightbox e setas;
- responsividade;
- modo de desempenho;
- imagens e fallbacks;
- redirecionamentos;
- links quebrados;
- páginas vazias;
- textos incompletos;
- arquivos obsoletos removidos.

### Critérios técnicos

- JavaScript sem erro de sintaxe.
- HTML carregando somente arquivos existentes.
- IDs duplicados: 0.
- IDs removidos sem redirecionamento: 0.
- Referências quebradas: 0.
- Rotas antigas essenciais funcionando.
- Validador concluído sem erro destrutivo.
- Nenhuma informação útil perdida.

---

# 8. Decisões que substituem pedidos antigos

Quando houver conflito, seguir esta seção.

1. **Acontecimentos e Linha do Tempo:** agora existe apenas Linha do Tempo.
2. **Causa e consequência:** não existe como seção separada.
3. **Rotas:** não existem como seção separada; são Lugares.
4. **Continuidade:** removida.
5. **Decisões do autor:** removida.
6. **Pacote de cena:** removido.
7. **Filtros de fauna, flora e alimentos em Ruínas:** removidos.
8. **Filtros de conceitos:** removidos nos dois livros.
9. **Ordenação e exportação:** podem existir como utilitários sem recriar filtros incompatíveis.
10. **Aparições de personagens:** não repetir quando Trajetória já apresenta o que ocorre em cada capítulo.
11. **População:** somente em lugares onde faz sentido.
12. **Estado: Activa:** não usar como informação de lugar.
13. **Arquivos `guerras-4d-*`:** não recriar.
14. **GitHub:** não alterar diretamente no fluxo atual; entregar ZIP completo ao autor.

---

# 9. Regras narrativas relevantes para o conteúdo do site

O site deve respeitar a identidade do Ciclo de Jesed:

- tema central: destino x livre-arbítrio;
- frase possível da saga: “Tudo nasce, cresce e morre. Para depois recomeçar.”;
- finais com esperança depois de perda pesada;
- mundo cíclico e trágico;
- Jesed não é fantasia medieval genérica;
- magia é rara, ambígua e não explicada como sistema simples;
- Etérea permanece parcialmente misteriosa;
- sem profecia clara de Escolhido;
- sem vilões puramente maus;
- sem respostas excessivamente limpas;
- romance não domina a trama;
- tecnologia até aproximadamente o século XVII;
- política sempre possui custo humano;
- personagens podem cometer atrocidades e continuar compreensíveis;
- Polar são necessários e perigosos;
- Kaendar deve permanecer admirável mesmo quando opressiva;
- o leitor deve poder discordar sobre Alyra, Orionus, Rendar, Kaelina e Mark;
- sonhos, maldições, deuses e Sopro devem preservar ambiguidade.

Essas regras afetam textos de temas, mistérios, conceitos, personagens e acontecimentos.

---

# 10. Modelo obrigatório para concluir cada nova etapa

Ao terminar uma etapa, copiar este bloco para a seção correspondente e preencher:

```text
Estado: CONCLUÍDA
Data de conclusão:
Versão do pacote:

Objetivo executado:

Arquivos criados:
- 

Arquivos alterados:
- 

Arquivos removidos:
- 

Entidades criadas:
- 

Entidades atualizadas:
- 

Entidades removidas:
- 

IDs alterados:
- 0 esperado

Redirecionamentos adicionados ou preservados:
- 

Validações realizadas:
- 

Referências quebradas:
- 0 esperado

Assets pendentes de ligação:
- 

Problemas conhecidos:
- 

Decisões tomadas durante a etapa:
- 

Próxima etapa recomendada:
- 
```

---

# 11. Regra de atualização deste documento

Este documento deve ser atualizado em **toda etapa concluída**.

A atualização deve:

1. mudar o estado da etapa na tabela geral;
2. inserir data de conclusão;
3. registrar exatamente o que foi feito;
4. registrar o que não foi feito;
5. registrar decisões novas que substituam decisões anteriores;
6. registrar arquivos removidos;
7. registrar validações;
8. atualizar a versão estrutural no topo;
9. indicar a próxima etapa pendente;
10. atualizar o README quando necessário.

Não criar outro histórico paralelo.

---

# 12. Próxima etapa oficial

## Etapa 10 — Clãs

A próxima IA deve começar pela Etapa 10 usando o pacote completo da Etapa 9. Deve preservar as páginas sociais, o catálogo das quarenta imagens substituíveis, os fallbacks atmosféricos, os IDs, os mapas, as trajetórias e todas as etapas anteriores. O foco seguinte é revisar, completar e padronizar as fichas dos clãs de *Guerras de Sangue*, sem criar brasão para os Fendelar e sem alterar o GitHub.
