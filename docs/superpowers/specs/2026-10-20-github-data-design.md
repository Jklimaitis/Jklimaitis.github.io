# Atualizar a atividade do GitHub automaticamente

- **Revisão:** r6
- **Data:** 2026-10-20
- **Estado:** decisões aprovadas em 2026-10-20; esta r6 aguarda aceite
- **Tipo:** especificação técnica do próximo incremento
- **Alterações da r2:** campos e regras dos cartões de repositório; formato da data do último envio e tratamento de campos ausentes; mensagem própria para limite de consultas; contrato do HTML gerado sem JavaScript; risco da fonte do calendário; formato dos módulos de lógica e comando de teste
- **Alterações da r3:** estrelas confirmadas como exibição apenas acima de zero; a data do último envio passa a mês e ano, sem dia nem hora, com a data completa preservada no atributo `datetime`
- **Alterações da r4:** o escopo da checagem de formatação passa a incluir `test`, onde vivem os testes automatizados do incremento
- **Alterações da r5:** a lista de repositórios também exclui o repositório de README de perfil, cujo nome é igual ao do usuário; ele não é um projeto
- **Alterações da r6:** o calendário passa a alinhar cada linha da grade a um dia da semana fixo, com células de preenchimento invisíveis no início, e os indicadores passam a um bloco de total destacado sobre uma grade 2×2 separada por linhas de 1 px

## Objetivo e escopo aprovado

Exibir os dados de `Jklimaitis` automaticamente na seção GitHub do portfólio Astro, nas versões PT e EN. Manter a aplicação estática, sem React, backend ou credenciais no navegador.

O incremento apresenta:

| Parte | Conteúdo |
|---|---|
| Perfil | Quantidade de repositórios públicos e link para o perfil |
| Repositórios | Até 10, excluindo forks e arquivados, ordenados pelo último envio de código (`pushed_at`) |
| Calendário | Histórico diário do último ano, conforme o período retornado pela fonte |
| Indicadores | Total de contribuições, dias ativos, sequência atual, maior sequência e melhor dia |

Se houver menos de 10 repositórios elegíveis, exibir apenas os existentes. A contagem do perfil usa `public_repos`, sem aplicar os filtros da lista; por isso ela pode diferir da quantidade de cartões.

## Fontes de dados e atualização

A integração consulta estas fontes públicas, sem autenticação:

| Fonte | Consulta |
|---|---|
| Perfil | `https://api.github.com/users/Jklimaitis` |
| Repositórios | `https://api.github.com/users/Jklimaitis/repos?type=owner&sort=pushed&direction=desc&per_page=100` |
| Calendário | `https://github-contributions-api.jogruber.de/v4/Jklimaitis?y=last` |

A API REST do GitHub permite consultar perfil e repositórios públicos sem autenticação.[1][2] O parâmetro `y=last` solicita ao serviço do calendário o último ano na visualização padrão do GitHub; não significa um número fixo de dias.[4]

Consultar as fontes ao abrir a página. Não criar temporizador de atualização, rotina agendada ou requisições durante o build.

Armazenar cada resposta validada em `localStorage`, o armazenamento do navegador, por 30 minutos. A chave identifica aplicação, versão do formato, usuário e fonte, mas não o idioma; as rotas PT e EN compartilham os mesmos dados. Cache ausente, vencido ou corrompido provoca nova consulta somente à fonte correspondente. Não guardar falhas nem usar cache vencido como dado atual. Se o armazenamento estiver bloqueado, continuar sem cache persistente.

O serviço do calendário mantém seu próprio cache por uma hora. Portanto, a consulta automática não garante que um novo commit apareça imediatamente. Não forçar a atualização do cache do serviço.[4]

O serviço do calendário é mantido por terceiros e monta os dados a partir do perfil público do GitHub, sem SLA. Se ele sair do ar ou divergir do GitHub, apenas o calendário e os indicadores ficam indisponíveis; isso não justifica trocar de fonte nesta etapa, contornar o cache do serviço nem completar os dados por conta própria.

## Apresentação, estados e métricas

Cada bloco mantém seu estado de carregamento, sucesso ou indisponibilidade, com mensagens em PT e EN. Uma falha no calendário não elimina perfil e repositórios válidos. Não usar um indicador global de sincronização quando alguma fonte estiver indisponível.

Dados ausentes aparecem como indisponíveis, nunca como zero. Zero é permitido quando uma resposta válida o informa ou quando o cálculo sobre dias válidos resulta em zero. Uma lista válida sem itens elegíveis mostra uma mensagem de lista vazia; não cria cartões provisórios.

O calendário usa a ordem das datas fornecidas, sem deslocar o dia por conversões de fuso. Exibir o período inicial e final. Se houver horário da consulta, identificá-lo como consulta, não como horário de atualização do GitHub.

Calcular os indicadores sobre o mesmo conjunto validado de dias:

| Indicador | Regra |
|---|---|
| Total de contribuições | Soma de `count` no período |
| Dias ativos | Quantidade de dias com `count` maior que zero |
| Sequência atual | Dias consecutivos ativos terminando na última data fornecida; se ela tiver zero, considerar a sequência terminada no dia anterior |
| Maior sequência | Maior intervalo de dias consecutivos com contribuições no período |
| Melhor dia | Maior contagem diária; em empate, escolher a data mais recente. Sem dias ativos, informar ausência de contribuições |

### Grade do calendário e indicadores

O calendário é uma grade de sete linhas, com cada linha fixa em um dia da semana e a primeira linha no domingo. O deslocamento inicial vem do dia da semana da primeira data fornecida: quando o período não começa no domingo, o início da grade recebe células de preenchimento invisíveis. Célula de preenchimento ocupa espaço, é marcada como decorativa e não entra em cálculo nenhum; ela não é dia sem contribuição.

Os indicadores são apresentados como um bloco: o total de contribuições em número grande e destacado, e os outros quatro em grade de duas colunas cujas bordas são as linhas de 1 px entre as células. Contagens usam `font-variant-numeric: tabular-nums`, para o valor não mudar de largura ao trocar de dígito.

### Cartões de repositório

Cada repositório elegível ocupa um cartão. Campos opcionais ausentes são omitidos, nunca substituídos por texto provisório ou por zero.

| Campo | Origem | Regra |
|---|---|---|
| Nome | `name` | sempre presente; é o texto do link |
| Descrição | `description` | omitir quando ausente ou vazia; entra como texto, nunca como HTML |
| Linguagem | `language` | omitir quando ausente |
| Estrelas | `stargazers_count` | exibir somente quando maior que zero |
| Último envio | `pushed_at` | mês e ano, abreviado conforme o idioma, sem dia e sem hora, montados a partir dos componentes da string, sem conversão de fuso; o elemento é `<time>` com `datetime` da data completa |
| Link | `html_url` | somente HTTPS no domínio `github.com`; abrir em nova aba com `rel="noopener noreferrer"` |

A linguagem exibida é o valor informado pela fonte, mesmo quando não corresponde à expectativa técnica do projeto; não corrigir nem inferir. Estrelas iguais a zero são um dado válido e simplesmente não aparecem no cartão; um `stargazers_count` inválido torna o cartão indisponível, sem virar zero.

A abreviação do mês vem dos dicionários existentes, para que a formatação não dependa de `Intl` nem do fuso do navegador. Datas do mesmo mês e ano podem aparecer com o mesmo rótulo em cartões diferentes; a ordem dos cartões continua sendo a de `pushed_at`, mesmo que a data visível não permita reconstruí-la.

### Grade e alternativa sem JavaScript

Exibir os cartões em grade responsiva, sem imagens remotas. Preservar a paleta existente, os links por teclado e o foco visível. O calendário pode ter rolagem interna no celular, mas não pode causar rolagem horizontal da página. Disponibilizar data e contagem dos dias em texto acessível, sem depender apenas da cor ou do mouse.

O HTML gerado no build já contém, dentro da seção, a explicação para navegador sem JavaScript e o link para o perfil. Esse é o conteúdo inicial da seção: o estado de carregamento só o substitui quando o script executa, para que a página continue coerente com o JavaScript desabilitado.

## Organização e limites técnicos propostos

Separar a obtenção e o cálculo dos dados da atualização do documento HTML, sem criar serviços ou dependências adicionais. Usar um componente para a seção e manter os textos nos dicionários existentes. Preservar o identificador `github`, as duas rotas e o conteúdo das outras seções.

Os detalhes abaixo são propostas desta revisão escrita para tornar os limites verificáveis:

- Fazer as consultas das fontes de forma independente, sem uma requisição de detalhes para cada cartão
- Na lista, filtrar forks e arquivados antes de limitar a 10; ordenar por `pushed_at` decrescente, com nome crescente para desempate. Datas ausentes ficam no fim e não recebem uma data inventada
- Excluir também o repositório de README de perfil, aquele cujo nome é igual ao nome do usuário. Ele serve para apresentar o perfil no GitHub e não é um projeto do portfólio; a exclusão é feita pelo nome, não por heurística sobre o conteúdo
- Se a primeira página não trouxer 10 elegíveis e houver próxima página, seguir o endereço `next` do cabeçalho `Link`, validando HTTPS, domínio `api.github.com` e o endpoint esperado. A documentação descreve esse mecanismo de paginação.[3]
- Limitar a consulta da lista a 3 páginas de até 100 repositórios. Se o limite ou uma falha impedir concluir a lista, indicar que o resultado está incompleto, sem afirmar que são todos os elegíveis; não guardar esse resultado parcial no cache
- No caso comum sem cache, fazer 3 consultas: perfil, lista e calendário. Com paginação, fazer no máximo 5 consultas por abertura; não consultar novamente as páginas já obtidas
- Encerrar cada tentativa após 10 segundos, sem repetição automática. Tratar indisponibilidade da rede, HTTP 403/429 e outros erros sem pedir credenciais
- Em HTTP 403 ou 429, mostrar mensagem própria e curta de limite de consultas atingido, sugerindo tentar mais tarde, sem instrução de autenticar, e preservar os blocos das outras fontes
- Validar o JSON antes de armazenar ou apresentar os dados; textos externos entram como texto, nunca como HTML executável. Aceitar links de perfil e repositório somente com HTTPS e domínio `github.com`
- Validar contagens como inteiros não negativos, níveis de contribuição entre 0 e 4 e datas de calendário existentes e únicas. Datas duplicadas, lacunas internas ou campos obrigatórios inválidos tornam o calendário indisponível; não preencher dias ausentes com zeros
- Calcular o deslocamento inicial pelo dia da semana da primeira data em UTC, para que a primeira linha da grade corresponda sempre ao domingo, independente do fuso do visitante

Os módulos precisam permitir testes com respostas sintéticas, relógio controlado e armazenamento simulado. Usar os recursos de teste do Node, sem alterar o formato global de módulos nem instalar um framework apenas para esse incremento. Testes automatizados não dependem das APIs ao vivo.

O `package.json` declara `"type": "commonjs"` e esse formato não é alterado. A lógica pura fica em módulos com extensão `.mts`, que os identifica como ESM, e os testes em `test/*.test.mjs` com `node:test` e `node:assert/strict`, executados pelo script `npm test` (`node --test`). Essa escolha depende do Node indicado em `.nvmrc`: versões anteriores não carregam `.mts`. O script da página importa os mesmos módulos, e o build os processa.

## Critérios de aceite

A implementação só está concluída quando houver evidência destes resultados:

1. As páginas PT e EN apresentam a seção com os respectivos textos, o mesmo conjunto de dados e os links para `Jklimaitis`.
2. A lista respeita os filtros, a ordenação, o limite de 10, os campos e as omissões de cada cartão, e os estados de lista vazia e resultado incompleto.
3. O calendário e os indicadores usam o mesmo período. Testes cobrem datas consecutivas, mudanças de mês e ano, empates, período sem contribuições e dados inválidos.
4. O deslocamento inicial está correto para período que começa no domingo e para período que começa no meio da semana, e as células de preenchimento não entram em nenhum cálculo.
5. Testes comprovam cache válido, vencido e corrompido, compartilhamento entre idiomas e continuidade com armazenamento bloqueado.
6. Falhas de uma fonte preservam os demais blocos; mensagens e ausência de zeros inventados são verificadas nos dois idiomas.
7. Uma falha de rede, um timeout ou uma resposta inválida não inicia um ciclo de novas tentativas nem ultrapassa os limites definidos.
8. O bloco de indicadores mostra o total destacado e os outros quatro em grade de duas colunas com separadores de 1 px, sem quebra de linha no melhor dia.
9. `npm test`, `npx --no-install prettier --check src scripts test`, `npm run build` e `npm run check` passam, com o Node indicado em `.nvmrc`.
10. A inspeção no navegador confirma os dados públicos, os destinos dos links, o uso por teclado, os estados de falha e a ausência de rolagem horizontal da página em desktop e celular.
11. A revisão do diff confirma a ausência de credenciais e de alterações não relacionadas, preservando o conteúdo local preexistente.

## Fora do escopo e aprovação

Não criar backend, autenticação, agendamento, novo provedor, publicação ou repositório remoto. Não substituir a seção curada de projetos pela lista automática nem consultar conteúdo de repositórios privados.

O aceite desta especificação autoriza o plano de implementação, não a implementação. Nenhuma mudança de código, instalação, commit, push ou publicação integra esta etapa de documentação.

## Sources

[1] https://docs.github.com/en/rest/users/users — GitHub REST: perfil público
[2] https://docs.github.com/en/rest/repos/repos — GitHub REST: repositórios públicos
[3] https://docs.github.com/en/rest/using-the-rest-api/using-pagination-in-the-rest-api — GitHub REST: paginação
[4] https://github.com/grubersjoe/github-contributions-api — GitHub Contributions API: contrato e cache