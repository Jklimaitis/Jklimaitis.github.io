# Faixa de números e barra de eventos

- **Revisão:** r1
- **Data:** 2026-10-21
- **Estado:** decisões aprovadas em 2026-10-21; aceita em 2026-10-21 e implementada
- **Tipo:** especificação técnica do incremento de destaque numérico e atividade recente

## Objetivo e escopo aprovado

Duas peças novas:

1. **Faixa de números** na abertura, com três valores: anos em tecnologia, repositórios públicos e contribuições no último ano.
2. **Barra de eventos** com os envios de código mais recentes, rolando horizontalmente.

Os dois usam dado que o site já consulta ou que a API oferece publicamente. Nenhuma peça inventa número, evento ou repositório.

## Faixa de números

Três itens, nesta ordem, com rótulo abaixo do valor:

| Item | Origem | Regra |
|---|---|---|
| `6` anos em tecnologia | constante nos dicionários | sempre exibido; não depende de consulta |
| Repositórios públicos | `public_repos` do perfil já carregado | ausente quando o perfil falha |
| Contribuições no último ano | `total` dos indicadores do calendário | ausente quando o calendário falha |

Regras: a faixa **não faz consulta própria** — consome o resultado de `carregarSecao`, o mesmo que alimenta a seção GitHub, para que os dois lugares nunca mostrem números diferentes. Item sem dado é **omitido**, nunca vira zero nem traço. Sem JavaScript, só o primeiro item aparece: os outros dois são dado dinâmico e não têm valor estático verdadeiro.

## Barra de eventos

Fonte: `https://api.github.com/users/Jklimaitis/events/public?per_page=30`.

Filtro obrigatório, antes de exibir:

- Aceitar apenas `PushEvent` e `CreateEvent`.
- Aceitar apenas eventos cujo `repo.name` comece com `Jklimaitis/`.
- Excluir o repositório de README de perfil, pela mesma regra da seção GitHub.
- Limitar a 8 itens, do mais recente para o mais antigo.

Cada item exibe: data curta no formato `21 out`, a ação (`push` ou `criou`) e o nome do repositório sem o dono. Nenhum nome de repositório de terceiro pode aparecer, em nenhuma circunstância.

Apresentação: uma linha, sem quebra, com rolagem contínua da direita para a esquerda. A lista é duplicada no DOM para o laço ser contínuo. Pausa quando o ponteiro está sobre a barra. Com `prefers-reduced-motion: reduce`, a animação não acontece e a barra vira uma linha estática com os primeiros itens, sem rolagem automática. Sem JavaScript, a barra não aparece.

## Cache e limites

- Cache de 30 minutos, mesma política de `localStorage` da seção GitHub, com chave própria de fonte `eventos` e a mesma versão de formato.
- Uma requisição adicional por abertura: o total passa de 3 para 4 no pior caso, ainda dentro do limite de 5 previsto para a seção.
- Timeout de 10 segundos, sem repetição automática, mesmo classificador de erro já usado.
- Falha da fonte de eventos não afeta a faixa de números, e vice-versa.
- O feed público do GitHub pode vir vazio: lista vazia é estado válido e a barra simplesmente não aparece.

## Organização

Módulo puro `src/dados/eventos.mts` com a seleção e a formatação dos itens, testável sem navegador: recebe a resposta e devolve a lista já filtrada, com data curta e ação em português ou inglês conforme o dicionário. A barra é um componente próprio, sem alterar a seção GitHub.

## Critérios de aceite

1. A faixa mostra os três valores nas duas rotas, com o mesmo número exibido na seção GitHub no mesmo carregamento.
2. Falha do perfil remove apenas o item de repositórios; falha do calendário remove apenas o de contribuições; o de anos permanece.
3. Nenhum item da faixa aparece como zero ou traço quando o dado falta.
4. Sem JavaScript, apenas os anos aparecem, e nenhuma barra de eventos é exibida.
5. A barra contém somente `PushEvent` e `CreateEvent` de repositórios `Jklimaitis/`, com no máximo 8 itens, e nenhum nome de terceiro.
6. A rolagem pausa com o ponteiro sobre a barra e não existe com movimento reduzido.
7. A página não ganha rolagem horizontal, em 1440 px nem em 390 px.
8. Cache válido evita nova consulta; falha não é cacheada; armazenamento bloqueado não quebra a barra.
9. Testes do módulo puro cobrem filtro de tipo, filtro de dono, exclusão do repositório de perfil, limite de 8 e resposta inválida.
10. `npm test`, `npx --no-install prettier --check src scripts test`, `npm run build` e `npm run check` passam.

## Fora do escopo

- A arte do nome desenhada no mapa de contribuições.
- Publicação no GitHub Pages.
- Alterar a seção GitHub, o calendário ou os projetos.
- Buscar eventos por GraphQL, autenticar ou exibir dados privados.

O aceite desta especificação autoriza o plano de implementação, não a implementação.
