# Etapa 5.5 — Recursos temporários e substituição

Este documento complementa o Plano Mestre. O Plano Mestre continua sendo o histórico oficial.

## Princípio

Os recursos abaixo são neutros, locais e temporários. Eles não definem novo cânone e existem para evitar dependências externas, Base64 e erros visíveis enquanto a pasta completa de assets não está reunida.

## Recursos

### `assets/textures/temp/ruinas-sidebar-texture.svg`

Textura do menu lateral de *Ruínas dos Céus*. Sugere céu, fragmentação, fissuras e raízes sem representar um lugar específico.

**Substituição:** exportar o recurso final em SVG ou WebP leve. Manter o mesmo caminho é a opção mais segura. Caso o nome mude, atualizar `--rdc-menu-texture` em `app/sagas/ciclo-de-jesed/books/ruinas-dos-ceus/experience/styles.css`.

### `assets/textures/temp/guerras-sidebar-texture.svg`

Textura histórica e cartográfica do menu de *Guerras de Sangue*.

**Substituição:** usar textura final local e otimizada, sem grelha repetitiva de brasões. Manter o caminho ou atualizar `--gs-menu-texture` no CSS específico do livro.

### `assets/contemplative/temp/eterea-sky-placeholder.svg`

Fundo temporário do modo contemplativo de *Ruínas dos Céus*.

**Substituição:** utilizar arte canônica de Etérea com espaço suficiente para nuvens, sol, lua e elementos de interface. Manter o mesmo caminho evita alterações de código.

### `assets/contemplative/temp/kaendar-night-placeholder.svg`

Silhueta temporária de Kaendar vista do campo, à noite e junto do Rio Grande.

**Substituição:** utilizar a imagem canônica de Kaendar. A cidade não deve parecer moderna, genérica ou em chamas. Preservar o caminho ou atualizar `--gs-kaendar-contemplative` no CSS de experiência de Guerras.

### `assets/clans/temp/fendelar-mark.svg`

Marca neutra de trilha e floresta. Não é um brasão e não deve ser promovida a brasão canônico.

**Substituição:** manter como marca não heráldica ou usar outro símbolo aprovado pelo autor. Os Fendelar continuam sem brasão formal.

## Otimização recomendada

- SVG para símbolos simples e texturas vetoriais.
- WebP para fundos pictóricos.
- Dimensões adequadas à área de exibição.
- Compressão antes da inclusão.
- Sem URLs externas em produção.
- Sem Base64 incorporado ao CSS ou JavaScript.
