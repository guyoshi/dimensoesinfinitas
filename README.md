# Dimensões Infinitas — site pessoal

Versão estrutural: **0.9.5 — Etapa 5.5 concluída**.

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
│   └── experience/
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

Extraia o pacote completo sobre a pasta do site. Esta entrega contém apenas os assets temporários criados na Etapa 5.5. Ao mesclar no projeto principal, preserve a pasta canônica `assets` já existente.

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

`docs/ETAPA-5.5-RECURSOS-TEMPORARIOS.md`

Capturas de revisão:

`docs/screenshots/`

## Próxima etapa

**Etapa 6 — Mapas interativos.**
