# Dimensões Infinitas — site pessoal

Versão estrutural: **0.9.9 — Etapa 9 concluída**.

## Entradas públicas

- `index.html` — portal de Dimensões Infinitas.
- `ruinas.html` — *Ruínas dos Céus*.
- `guerras.html` — *Guerras de Sangue*.

Esses arquivos permanecem na raiz para preservar os endereços publicados. Código, dados e experiências visuais ficam organizados por saga e livro.

## Arquitetura

```text
app/
├── portal/
├── shared/
│   ├── book-music/
│   ├── experience/
│   ├── maps/
│   ├── characters/
│   └── social/
└── sagas/
    └── ciclo-de-jesed/
        └── books/
            ├── ruinas-dos-ceus/
            │   └── experience/
            └── guerras-de-sangue/
                └── experience/

data/
├── common/
└── sagas/
    └── ciclo-de-jesed/
        ├── audits/
        └── books/
            ├── ruinas-dos-ceus/
            └── guerras-de-sangue/
```

Padrão para novos livros:

- interface: `app/sagas/<saga>/books/<livro>/`;
- experiência visual específica: `app/sagas/<saga>/books/<livro>/experience/`;
- conteúdo: `data/sagas/<saga>/books/<livro>/`;
- módulos reutilizáveis: `app/shared/`;
- auditorias da saga: `data/sagas/<saga>/audits/`.

## Instalação

Extraia o pacote completo sobre a pasta do site. Esta entrega contém os mapas usados na Etapa 6 e os assets temporários criados na Etapa 5.5. Ao mesclar no projeto principal, preserve também os demais assets canônicos já existentes.

## Comandos

```bash
npm run validate
npm run audit
npm run serve
```

## Documentação obrigatória

Leia `PLANO-MESTRE-E-HISTORICO.md` antes de alterar o projeto. Ele é a fonte oficial para decisões, etapas concluídas e tarefas futuras.

## Etapas 4 e 5 preservadas

- Linha do Tempo cronológica em A.Q. e D.Q.;
- 30 acontecimentos em *Ruínas dos Céus*;
- 38 acontecimentos em *Guerras de Sangue*;
- 17 lugares e 48 cenas localizadas em *Ruínas dos Céus*;
- 23 lugares e 69 cenas localizadas em *Guerras de Sangue*;
- cinco antigas rotas incorporadas definitivamente a Lugares.

Relatórios:

- `data/sagas/ciclo-de-jesed/audits/timeline-etapa-4.json`;
- `data/sagas/ciclo-de-jesed/audits/places-etapa-5.json`.

## Etapa 5.5 — identidade visual e desempenho

### Ruínas dos Céus

- menu de céu, pedra suspensa, fissuras, raízes e fragmentos;
- identidade preservada no menu recolhido;
- três camadas de nuvens;
- amanhecer, dia, entardecer e noite;
- sol e lua com trajetória visual;
- relógio temporário de teste com retorno ao modo automático;
- cartões suspensos, transição de vento e fissuras contextuais;
- modo contemplativo próprio;
- controles específicos com prefixo `di-ruinas-`.

### Guerras de Sangue

- menu histórico, cartográfico e territorial;
- marcas de clã irregulares e contexto da página de clã;
- Canvas traseiro e dianteiro;
- brasas, faíscas, cinzas, poeira quente e turbulência;
- modo contemplativo noturno de Kaendar;
- controles específicos com prefixo `di-guerras-`.

### Sistema comum

- perfis Completo, Equilibrado, Desempenho e Personalizado;
- estado visível do modo desempenho;
- preferências globais separadas das preferências de cada livro;
- respeito a movimento reduzido, economia de dados, aba oculta e dispositivos mais fracos;
- ausência de bibliotecas externas novas;
- controles de áudio, desempenho e configurações agrupados no extremo direito;
- suporte a desktop e dispositivos móveis.

Relatório:

`data/sagas/ciclo-de-jesed/audits/visual-etapa-5-5.json`

Recursos temporários:

`docs/CATALOGO-DE-IMAGENS-ATMOSFERICAS-E-SOCIAIS.md`

Capturas de revisão:

`docs/screenshots/`

## Etapa 6 — mapas interativos

### Ruínas dos Céus

- dois mapas separados: Etérea e A Superfície;
- 17 lugares localizados;
- textos de contexto integrados às imagens;
- zoom, deslocamento, centralização, nomes, pins e fichas rápidas;
- funcionamento em desktop e dispositivos móveis.

### Guerras de Sangue

- 23 lugares localizados;
- cinco rotas preservadas como lugares geográficos;
- camada visual das rotas;
- sete categorias estratégicas com duas ou mais informações;
- zoom, deslocamento, centralização, nomes, pins e fichas rápidas.

### Ajustes associados

- botões de capítulo anterior e seguinte movidos para o topo em *Guerras de Sangue*;
- navegação equivalente criada em *Ruínas dos Céus*;
- Personagens em foco agora mostram apenas figuras principais, sem estado e com descrição de até quatro palavras.

Relatório:

`data/sagas/ciclo-de-jesed/audits/maps-etapa-6.json`

Capturas de revisão:

`docs/screenshots/etapa-6/`

## Etapa 7 — páginas iniciais e inventário de imagens

- os caminhos de branding, capítulos, personagens e mapas foram alinhados ao inventário WebP fornecido pelo autor;
- o inventário completo foi incorporado em `data/common/assets-manifest.json`;
- *Ruínas dos Céus* possui quatro cartões internos em uma linha no desktop: Personagens, Relações, Linha do Tempo e Capítulos;
- *Guerras de Sangue* usa a mesma estrutura orientadora;
- a seção Últimos capítulos foi removida dos dois livros;
- os dois livros receberam uma seção Lugares com seis cartões fotográficos e ligações para as fichas;
- *Ruínas dos Céus* recebeu prévias separadas dos mapas de Etérea e da Superfície;
- *Guerras de Sangue* mantém o mapa grande e exibe as sete categorias estratégicas como atalhos resumidos;
- nenhuma informação canônica ou ID foi alterado.

Relatório:

`data/sagas/ciclo-de-jesed/audits/home-assets-etapa-7.json`

Validação da Etapa 7:

- nenhuma referência activa com `.png`, `.jpg` ou `.jpeg`;
- nenhum caminho de imagem sem correspondência no inventário ou nos recursos temporários documentados;
- zero exceções nas duas páginas iniciais;
- layout sem scroll horizontal a 390 píxeis.

## Etapa 8 — personagens

- os dois livros possuem pesquisa própria de personagens;
- os dois livros alternam entre cartões grandes e lista compacta;
- a preferência de visualização é preservada separadamente por livro;
- cartões grandes mostram retrato, nome, subtítulo simples e descrição curta;
- a lista compacta mantém acesso rápido e mais personagens visíveis;
- as páginas receberam frases-guia específicas para cada livro;
- os subtítulos dos cartões de *Ruínas dos Céus* deixaram de parecer tags;
- a ficha de Ruínas não apresenta mais o campo redundante Aparições;
- todos os capítulos da Trajetória possuem texto específico sobre a ação do personagem;
- os capítulos da Trajetória continuam clicáveis;
- as 15 imagens disponíveis de Ruínas e as 42 imagens disponíveis de Guerras foram ligadas;
- a segunda imagem de Orionus é exibida como retrato alternativo;
- Eshvar, Maedra e Capitão Lirron permanecem sem imagem porque o inventário não contém retratos para eles.

Relatório:

`data/sagas/ciclo-de-jesed/audits/characters-etapa-8.json`

Capturas de revisão:

`docs/screenshots/etapa-8/`


## Etapa 9 — relações, família, organizações e atmosfera com imagens

### Relações

- *Ruínas dos Céus* recebeu oito tipos visuais de relação: família, amizade, proteção, influência, conflito, rivalidade, lealdade e relação rompida;
- o mapa usa linhas coerentes com a legenda;
- doze relações possuem os dois personagens, tipo, estado, descrição, perspectivas e evolução;
- os personagens são clicáveis;
- *Guerras de Sangue* preserva o mapa e as relações já existentes, agora com legenda visual equivalente.

### Família e organizações

- *Ruínas dos Céus* exibe somente a família **Os Amaréa**, com Yoral, Mirel, Jokara, Nestira e Loutes como criança acolhida;
- a ficha contém vida familiar, casa em Nivellia, crenças, Sopro e Peso, perda de Yoral, diferenças entre as irmãs, acolhimento de Loutes e importância para a Queda;
- Ruínas possui quatro organizações reais: Oradores da Corrente, Ecoantes, Tecelões de Vento e sobreviventes de Nadírion;
- *Guerras de Sangue* mantém três famílias e três organizações, agora com imagens, função, atuação, temas e membros clicáveis.

### Atmosfera baseada em imagens

- nuvens de Ruínas usam arquivos WebP transparentes em três camadas;
- sol, lua, fragmentos, raízes, menu e modo contemplativo usam imagens rasterizadas locais;
- brasas, faíscas e cinzas de Guerras usam sprites WebP no Canvas, com desenho vetorial apenas como fallback técnico;
- menus, poeira, fumaça, reflexo metálico, mapas e cartões de lugares receberam texturas WebP;
- todos os SVG atmosféricos anteriores foram removidos;
- nenhuma dependência externa foi adicionada;
- se uma imagem opcional falhar, gradientes, cores e desenho de fallback mantêm o site funcional.

### Catálogo obrigatório de imagens

A lista exata das imagens que podem ser substituídas pelas artes definitivas está em:

`docs/CATALOGO-DE-IMAGENS-ATMOSFERICAS-E-SOCIAIS.md`

A versão para leitura por máquinas está em:

`data/common/image-requirements-etapa-9.json`

Cada entrada informa caminho, nome, pasta, dimensão, transparência e função. Para substituir, basta conservar o mesmo caminho e nome do arquivo WebP.

Relatório:

`data/sagas/ciclo-de-jesed/audits/social-etapa-9.json`

Capturas:

`docs/screenshots/etapa-9/`

## Próxima etapa

**Etapa 10 — Clãs.**
