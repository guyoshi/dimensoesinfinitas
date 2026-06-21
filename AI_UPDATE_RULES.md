# AI_UPDATE_RULES — Dimensões Infinitas

Estas regras são obrigatórias para qualquer IA que actualize o conteúdo canónico do site.

## 1. Fonte de verdade

- O site é uma interface de consulta. O cânone é actualizado apenas nos ficheiros do projecto.
- Em **Guerras de Sangue**, considerar apenas o texto efectivamente escrito.
- Não transformar resumos de capítulos futuros em acontecimentos, trajectórias, conhecimento, destinos ou aparições canónicas.
- Quando um capítulo resumido passar a existir como narrativa escrita, ele pode então ser incorporado.
- O livro Guerras de Sangue está completo até o Capítulo 29 — A Raiz que Ficou. Os capítulos 1-23 estão em `data/content.js`; os capítulos 24-29 são adicionados em runtime por `data/guerras-4d-chapters.js` (e os personagens/eventos correspondentes por `data/guerras-4d-characters.js` e `data/guerras-4d-events.js`), para não exigir reescrever o blob minificado de `content.js`. `scripts/validate-content.js` valida apenas `content.js` isoladamente (por isso ainda espera 23 capítulos nesse ficheiro — isso é esperado e não é um erro).

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
- Não remover relações, fontes, aparições ou acontecimentos por ausência numa nova análise parcial.
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
