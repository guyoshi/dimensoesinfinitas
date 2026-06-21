# AI_UPDATE_RULES — Dimensões Infinitas

Estas regras são obrigatórias para qualquer IA que actualize o conteúdo canónico do site.

## 1. Fonte de verdade

- O site é uma interface de consulta. O cânone é actualizado apenas nos ficheiros do projecto.
- Em **Guerras de Sangue**, considerar apenas o texto efectivamente escrito.
- Não transformar resumos de capítulos futuros em acontecimentos, trajectórias, conhecimento, destinos ou aparições canónicas.
- Quando um capítulo resumido passar a existir como narrativa escrita, ele pode então ser incorporado.
- O livro Guerras de Sangue está completo até o Capítulo 29 — A Raiz que Ficou. Os arquivos permanentes de cada livro ficam em `data/sagas/ciclo-de-jesed/books/<livro>/`. O validador carrega a estrutura completa dos dois livros.

## 2. Nunca inventar

Quando uma informação não estiver definida, usar uma destas opções:

- `null`
- `[]`
- `"Não registado"`, apenas quando o campo exigir texto visível.

Nunca completar aparência, personalidade, conhecimento, destino, localização, relação ou motivação por suposição.

## 3. IDs são permanentes

- Nunca alterar um ID existente porque o nome visível mudou.
- Nunca reutilizar um ID removido para outra entidade.
- Favoritos, anotações e histórico futuro serão ligados ao ID, não ao nome.
- Se duas entidades forem fundidas ou renomeadas, preservar o ID principal e criar um redireccionamento explícito para o ID anterior.

Exemplo:

```json
{
  "oldId": "jesed-character-yvvena",
  "redirectTo": "jesed-character-ylvena"
}
```

## 4. Actualização não destrutiva

- Alterar apenas os campos afectados pela nova fonte.
- Não substituir listas inteiras sem primeiro preservar elementos válidos já existentes.
- Não apagar entidades silenciosamente.
- Não remover relações, fontes, aparições ou registros da Linha do Tempo por ausência numa nova análise parcial.
- Antes de remover qualquer entidade, explicar o motivo no relatório de alterações.

## 5. Tipos de verdade separados

Nunca misturar:

- verdade do autor;
- conhecimento do leitor;
- conhecimento de cada personagem;
- crença cultural;
- rumor;
- ideia provisória.

Uma crença de clã não deve ser registada como verdade do autor.

## 6. Lente do livro

Toda informação temporal deve indicar a qual livro ou período pertence.

- Um estado de personagem em Guerras de Sangue não substitui estados futuros.
- Uma localização posterior não deve aparecer na lente de Guerras de Sangue.
- Não introduzir acontecimentos de Dinastia Polar, Herdeiros das Cinzas ou Coração de Poeira durante actualizações limitadas aos dois primeiros livros.

## 7. Fontes

Toda informação narrativa importante deve apontar para uma fonte:

- livro e capítulo;
- documento de lore;
- decisão explícita do autor.

Não citar um resumo futuro como fonte de acontecimento já ocorrido.

## 8. Contagens

- Contagens de citações devem ser derivadas de referências por capítulo, não alteradas manualmente sem fonte.
- Índices de pesquisa, totais e ficheiros derivados devem ser reconstruídos, não editados manualmente.

## 9. Protecção dos dados pessoais

- Conteúdo canónico e dados pessoais são sistemas separados.
- Nunca guardar favoritos, anotações, histórico ou preferências dentro dos ficheiros canónicos.
- Nunca apagar ou migrar IDs sem manter compatibilidade com dados pessoais ligados a eles.
- A futura base de dados pessoal deve guardar apenas `user_id`, `entity_id`, `entity_type` e os dados pessoais necessários.

## 10. Validação obrigatória

Antes de publicar:

1. validar a sintaxe dos dados;
2. verificar IDs duplicados;
3. comparar o manifesto anterior e o novo;
4. detectar IDs removidos;
5. verificar relações para entidades inexistentes;
6. verificar personagens ligadas a clãs, lugares e capítulos válidos;
7. verificar caminhos de imagens;
8. verificar que nenhum capítulo resumido foi marcado como escrito;
9. gerar relatório de alterações;
10. apresentar prévia antes da publicação definitiva.

## 11. Relatório mínimo

Toda actualização deve informar:

```text
Entidades criadas:
Entidades actualizadas:
Entidades removidas:
IDs alterados: 0 esperado
Referências quebradas: 0 esperado
Campos deixados sem informação:
Fontes consultadas:
Avisos narrativos:
```

## 12. Regra de falha segura

Se a validação detectar corrupção, referência quebrada ou desaparecimento inesperado de ID, a actualização não deve ser publicada.


## 13. Imagens e brasões

- Preservar os caminhos existentes das imagens sempre que a entidade continuar a mesma.
- Não criar brasão para os Fendelar: eles são o único clã sem brasão.
- Quando uma imagem for substituída, manter o ID da entidade e alterar apenas o caminho do asset.
- Validar todos os caminhos antes da publicação.

## 14. Plano mestre obrigatório

- Antes de qualquer alteração, ler `PLANO-MESTRE-E-HISTORICO.md` por completo.
- O arquivo define a ordem das etapas, as decisões mais recentes, o protocolo de trabalho e o estado atual do projeto.
- Trabalhar sempre sobre o pacote mais recente enviado pelo autor.
- Não usar nem alterar o GitHub quando o autor tiver enviado a pasta de trabalho, salvo autorização explícita.
- Atualizar o plano mestre ao concluir cada etapa.
- Não criar outro histórico ou plano paralelo.


## Arquitetura obrigatória desde a Etapa 3

- Não criar scripts ou CSS de livros na raiz.
- Manter na raiz apenas entradas HTML, documentação, `.nojekyll` e `package.json`.
- Código de livro: `app/sagas/<saga>/books/<livro>/`.
- Dados de livro: `data/sagas/<saga>/books/<livro>/`.
- Código reutilizável: `app/shared/`.
- Não voltar a nomes temporários como `4d`, `patch-final`, `novo`, `backup` ou `corrigido` nos arquivos definitivos.
- Novas sagas e livros devem repetir o mesmo padrão, sem arquivos soltos por título na raiz.


## 15. Linha do Tempo desde a Etapa 4

- A Queda é o marco zero entre A.Q. e D.Q.
- Usar ciclos, nunca anos.
- Usar meses ordinais; não inventar dias.
- Toda estimativa deve permanecer explicitamente marcada como aproximada.
- Não confundir a data do acontecimento com o capítulo em que ele foi citado, recordado, investigado ou revelado.
- Preservar `id`, `slug`, `legacySlugs`, `date`, `dateLabel`, `sortKey` e `chapterLinks`.
- Relações de capítulo permitidas: `ocorre`, `citado`, `recordado`, `investigado`, `revelado` e `consequencia`.
- Páginas individuais devem manter descrição, contexto, causa, consequências, participantes, lugares, capítulos e acontecimentos relacionados.
- A verdade da morte de Orionus não pode regredir: Ylvena pretendia envenenar Alyra, Orionus bebeu por engano e Daryon falsificou as provas.
- Rotas históricas de Acontecimentos devem continuar redirecionando para a Linha do Tempo.

## 16. Lugares desde a Etapa 5

- Rotas são lugares e não podem voltar a existir como seção independente.
- Preservar os IDs históricos `route-*` das cinco rotas de *Guerras de Sangue*.
- Não usar `Estado: Activa` ou `Estado: Ativa` nas fichas de lugares.
- Mostrar população somente quando houver estimativa aplicável; quando não houver, omitir o campo.
- Não atribuir população a rios, florestas, estradas, gargantas, rotas, montanhas ou regiões naturais.
- Preservar `region`, `location`, `description`, `narrativeFunction`, `architecture`, `atmosphere`, `resources`, `dangers`, `culture`, `population`, `chapterScenes`, `characterIds` e `eventIds`.
- “Personagens que passaram por aqui” deve ser derivado das cenas do livro, nunca da última localização do personagem.
- Capítulos ligados devem descrever somente a cena ocorrida no lugar, e não repetir o resumo geral do capítulo.
- Estimativas populacionais são editoriais e podem ser corrigidas sem alterar IDs.

## 17. Estado atual

- Etapas 1, 2, 3, 4 e 5 concluídas.
- Próxima etapa oficial: **Etapa 6 — Mapas interativos**.
