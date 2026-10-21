# Nome desenhado na grade do herói

- **Revisão:** r11
- **Data:** 2026-10-21
- **Estado:** implementada no repositório, aguardando revisão e commit de Jonas
- **Alterações da r11:** a grade passou a ter **teto de 20 linhas**, como no original (estava com 25); o cartão mantém altura fixa e a grade é centralizada nele. A densidade do campo caiu de 34% para **20%** das células de fundo, e perto do nome o campo fica mais quieto por distância — 4% de células acesas até duas células do nome contra 19% a partir de seis. A distância **só reduz** atividade, nunca acende: é o que separa este ajuste do halo que desenhava contorno.
- **Alterações da r10:** a pintura passou a usar a **rampa do destaque** também nas letras (dois degraus de âmbar, como no original) e o fundo deixou de ser variação de cinza: cerca de **34% das células de fundo acendem e apagam sozinhas**, cada uma com fase própria. Defeito encontrado e corrigido na verificação: `misturar` devolvia `NaN` ao misturar uma cor já misturada, o que deixava o quadro parado — o canvas era redesenhado 55 vezes por segundo sem mudar um pixel.
- **Alterações da r9:** a largura única do site passou a **82,5 rem (1320 px)**, o mesmo valor do original, e o nome ganhou margem lateral de 2 colunas em vez de 3. Medido em 1440 px: célula de **11,14 px** na forma de uma linha, contra 9,89 px na r8 e 7,88 px antes da largura única.
- **Alterações da r8:** o site passa a ter **uma única largura** — cabeçalho, abertura, seções e rodapé usam a mesma faixa, como no original, onde `.wrap{max-width:1320px}` vale para tudo e o gráfico do herói herda a mesma faixa. A exceção de 62 rem da abertura foi removida. É isso que permite o nome ficar maior sem desalinhar do resto da página.
- **Alterações da r7:** o arranjo do nome é **adaptativo**: uma linha quando a célula resultante alcança o mínimo legível, duas quando não alcança — como no original. A grade é **preenchida com linhas de fundo** para ocupar a caixa inteira, com a célula quadrada.
- **Alterações da r6:** a arte passa a ficar dentro de um **cartão com moldura e respiro**, na coluna do conteúdo, e **não mais em full-bleed** — as células encostando na borda da janela foram recusadas por Jonas. Cada linha é centralizada pela **tinta**, não pela caixa do glifo.
- **Alterações da r5:** a peça deixa de ser mil e vinte e três elementos no HTML e passa a ser **desenhada em canvas**, com uma **base SVG estática** gerada no build para quem não executa JavaScript.

## Objetivo e escopo

Dar à abertura uma peça gráfica própria, viva e decorativa, construída com a mesma gramática visual da grade de contribuições.

Entra: campo de células com o nome completo em relevo, desenhado em canvas sobre uma base SVG; textura esparsa sem contorno; células que piscam; holofote circular preso ao ponteiro; ondas a partir de cada clique; entrada das células por coluna.

Não entra: legenda ou rótulo, qualquer número de contribuições na abertura, texto de "commitar", clique que registre qualquer coisa, consulta de rede, alteração do mapa real da seção GitHub.

## Regra de honestidade

Decisão de Jonas em 2026-10-21, no fundamento dele: **"não irá parecer mapa, pois tem meu nome no meio; é artístico, apenas para fazer um charme"**. A peça é ornamento declarado pela própria forma, e por isso não leva rótulo.

O que continua devendo:

1. **Nenhum número, data ou indicador na abertura.** O valor real (hoje 224, atualizado ao vivo) permanece exclusivamente na seção GitHub, ao lado do mapa real.
2. **Nada que simule ação inexistente.** A onda é luz, não commit. O texto do exemplo ("passe o mouse para commitar") não é copiado, e o clique não registra nada.
3. **A arte é ornamento para tecnologia assistiva.** `aria-hidden="true"` no canvas e no SVG, sem foco, sem alvo de tabulação. O nome acessível continua no cabeçalho e no título.

## Técnica: canvas sobre base SVG

O original que inspirou a peça desenha o herói em **canvas** (`.graph` com altura fixa), com paleta de cinco níveis e efeitos calculados por quadro. A r5 adota a mesma técnica, com uma diferença deliberada de robustez:

- **Base SVG estática, gerada no build.** Contém as células de letra e as células de textura acesas, com as cores da paleta. Aparece sem JavaScript e é o que o navegador pinta no primeiro quadro.
- **Canvas por cima, quando há JavaScript.** Assumindo o controle, ele apaga a base e passa a desenhar os quadros — é o que permite pisca, holofote e ondas sem custo de DOM.
- **Uma única fonte de verdade.** Máscara, níveis e seleção do pisca vêm do mesmo módulo puro para o SVG e para o canvas; nenhuma das duas metades tem a sua própria cópia da geometria.

Motivo da troca: mil e vinte e três elementos com animação CSS custavam estado compartilhado — foi o que fez a onda congelar — e obrigavam uma animação por célula. Em canvas, cada quadro é desenhado do zero: onda residual é impossível por construção, e ondas simultâneas custam o mesmo que uma.

## Geometria

Máscara de glifos de 5 × 7 por letra, com 1 coluna de intervalo entre cada par de caracteres consecutivos, **uma linha de intervalo entre as duas linhas de texto** e margem de **3 colunas e 2 linhas** em volta do conjunto.

| Item | Valor | Como foi obtido |
|---|---|---|
| Grade, uma linha | **91 × 11** células | máscara + margem de 2 colunas e 2 linhas |
| Grade, duas linhas | **57 × 19 = 1.083 células** | máscara + margem |
| Células de letra | 210 | contagem da máscara |
| Grade a 1440 px | 1214 × 300 px | medido no canvas |
| Célula a 1440 px | 11,14 px (uma linha) | medido no canvas |
| Bitmap a densidade 2 | 2428 × 600 | `canvas.width` conferido |

A arte fica **dentro de um cartão** de moldura discreta, com 0,9 rem de respiro vertical e 1 rem horizontal, na mesma largura do resto do conteúdo. Full-bleed foi descartado em 2026-10-21: as células encostando na borda da janela deixam a peça sem respiro.

**Uma largura só.** A coluna do site é `76rem` para cabeçalho, abertura, seções e rodapé. Medido em janela de 1440 px: metadados, cartão, grade de abertura, números e todas as seções começam em `x = 93` com 1240 px de largura; a célula do nome fica em **11,14 px** na forma de uma linha.

**Arranjo adaptativo.** O nome tem duas formas: uma linha (`JONAS KLIMAITIS`, 91 × 11 células) e duas linhas (`JONAS` sobre `KLIMAITIS`, 57 × 19). A escolha é por largura: a forma de uma linha é usada enquanto a célula resultante alcança **6 px**; abaixo disso, o nome quebra em duas. Com a caixa do cartão em 1214 px, a uma linha dá célula de 11,14 px — é a forma usada no desktop. Em 650 px de caixa, a uma linha daria 5,83 px, então entra a de duas linhas.

**Grade preenchida.** As linhas da grade são calculadas a partir da altura da caixa, para a célula ficar quadrada e a grade ocupar o cartão inteiro: em 1214 × 300 a forma de uma linha rende 25 linhas de grade, com o nome centralizado nelas. É o que impede o vazio em cima e embaixo do nome e o que mantém o bloco estável entre larguras e níveis de zoom.

**Centralização óptica:** cada linha é centrada pela sua tinta — a primeira coluna e a última coluna com `#` —, não pela caixa do glifo. Sem isso, `JONAS` desloca para a direita porque `J` começa com duas colunas vazias, enquanto `KLIMAITIS` começa com `K`, que tem tinta na primeira coluna. Medido depois da correção: centro da tinta igual nas duas linhas.

## Pintura

- **Rampa do destaque, não cinza.** Os tons saem do âmbar em quatro degraus: apagado (o fundo da grade), 22%, 40% e o destaque pleno.
- **Letras com variação.** Cada célula de letra recebe o degrau pleno ou o de 68%; cerca de 18% das letras fica no degrau mais escuro, o que dá a textura irregular do original. Medido no build: 172 células de letra no degrau pleno e 38 no escuro.
- **Fundo que acende e apaga.** Cerca de 20% das células de fundo cintilam em ciclo de 3,4 s, cada uma com fase própria, indo de 12% a 100% do seu degrau. As demais ficam apagadas. Medido no navegador: 590 células mudando de brilho entre dois instantes, e o bitmap muda entre quadros.
- **Calma em volta do nome.** Até uma célula de distância a atividade cai a 15% da fração, até duas cai a 35% e até três a 70%; a partir daí fica cheia. Medido no navegador: **4,0% de células acesas até duas células do nome contra 19,2% a partir de seis**.
- **Derivação.** Tom, cintilação e fase vêm de sorteio determinístico com semente fixa e de um único sorteio por célula, inclusive nas de letra — o padrão do fundo não depende de onde as letras estão. Nunca de `count`, `level` ou data.
- **Sem movimento reduzido**, as células que cintilam ficam no brilho médio, sem ciclo, e a base SVG mostra os mesmos degraus.

## Pisca

Cerca de 3% das células de fundo oscilam por opacidade (0,35 a 1) em ciclo de 2,6 s, com fase própria derivada do índice. Nunca em célula de letra. Sem movimento reduzido, não pisca.

## Holofote

Brilho por célula, calculado pela distância em células até o ponteiro, raio de **5,2 células**, com queda quadrática. Por ser calculado por célula, é circular por construção — a versão em gradiente era elipse achatada (547 × 117 px numa faixa de 1440 × 168). Só com ponteiro fino; ao sair, o brilho cessa.

## Ondas

Cada clique registra uma origem. O brilho de cada célula é calculado a cada quadro pela distância até a origem comparada ao raio do anel naquele instante:

- **Passo de 45 ms por anel**, largura de 2,2 células, raio máximo de 34 células.
- Ondas simultâneas são independentes: a lista de origens é percorrida por quadro, sem estado por célula. Até seis ao mesmo tempo; a mais antiga sai.
- Nenhuma animação por elemento, nenhum `setTimeout` de limpeza: quando a idade passa do alcance, a origem sai da lista.
- Sem movimento reduzido, não há onda.

Verificado por medição: com um clique no centro, o anel foi encontrado a 15 células em 0,7 s, 27 em 1,2 s e 40 em 1,8 s — coerente com 45 ms por anel, e simétrico dos dois lados da origem.

## Entrada das células

Varredura da esquerda para a direita: cada coluna começa 14 ms depois da anterior e leva 400 ms para ir de escala zero a um. Faz parte do mesmo laço do canvas. Sem JavaScript não há entrada — a base SVG já está no estado final, o que é aceitável.

## Movimento reduzido

`prefers-reduced-motion: reduce` desliga pisca, holofote e ondas, e faz o canvas desenhar **um único quadro**, sem laço de animação. A base SVG continua sendo o estado inicial. Redimensionar redesenha esse quadro.

## Custo medido

| Medida | Valor |
|---|---|
| Tempo por quadro de desenho | 0,60 a 0,78 ms |
| Taxa de quadros | 60 fps |
| Nós de DOM da arte com JS | 1 (o canvas) |
| Bitmap | 2× a densidade da tela, nítido ao dar zoom |

O laço roda continuamente porque o pisca é contínuo, como no original. Se a medição em máquina real indicar consumo relevante, o passo seguinte é baixar o pisca para 30 quadros por segundo — decisão com número, não por precaução.

## Módulo e testes

Lógica pura em `src/dados/nome.mts`, sem DOM:

- `GLIFOS`, `desenharNome(texto)`, `pintar(mascara, semente?)`, `piscantes(pintura, semente?)` — como na r4.
- `brilhoDaOnda(distanciaCelulas, idadeMs, passo?, largura?)` — 0 a 1, máximo no anel, zero fora da largura.
- `brilhoDoHolofote(distanciaCelulas, raio?)` — 1 no centro, 0 a partir do raio.
- `geometria(larguraCss, colunas, linhas, razaoIntervalo?)` — célula, intervalo e altura.

Testes em `test/nome.test.mjs`:

1. A máscara mede 59 × 19 e tem 210 células de letra.
2. A linha curta é centralizada pela tinta em relação à mais larga, com tolerância de 1,5 coluna.
3. Todo glifo tem 7 linhas e 5 colunas; o espaço tem 3 colunas.
4. Caractere fora da tabela lança.
5. `pintar` devolve 1.121 entradas; letra nunca recebe nível; níveis entre 0 e 2.
6. `piscantes` é determinística, não inclui letra e fica entre 1% e 5% do fundo.
7. `brilhoDaOnda` é máximo quando a distância iguala `idadeMs / passo`, cai para zero além da largura e nunca sai de 0 a 1.
8. `brilhoDoHolofote` vale 1 no centro, 0 no raio e é monotônico decrescente entre os dois.
9. `geometria` reproduz a célula de 12,47 px e a altura de 281,7 px para uma grade de 880 px com 59 colunas e 19 linhas.

## Critérios de aceite

1. Sem JavaScript, a base SVG aparece completa, com o nome e a textura, na geometria correta e sem elemento invisível.
2. Com JavaScript, o canvas assume sem salto visual perceptível: a primeira pintura do canvas é equivalente à base SVG.
3. O bitmap do canvas é o dobro da caixa CSS em tela de densidade 2, e as células permanecem nítidas ao aplicar zoom do navegador.
4. A textura é esparsa e sem contorno: nenhuma célula de fundo é derivada da distância até a letra.
5. Nenhum número, data ou rótulo de dado na abertura.
6. Cliques em pontos diferentes produzem ondas independentes, que terminam sozinhas, sem brilho residual.
7. O holofote é circular: pontos equidistantes do ponteiro têm o mesmo brilho.
8. Célula de letra nunca pisca.
9. Com `prefers-reduced-motion: reduce`: nenhum pisca, nenhum holofote, nenhuma onda, um quadro desenhado e nenhum laço ativo.
10. Custo por quadro abaixo de 2 ms e 60 quadros por segundo em 1440 px.
11. A arte não recebe foco e não aparece na árvore de acessibilidade.
12. A arte fica dentro do cartão, alinhada à coluna do conteúdo, sem célula encostando na borda da janela entre 320 px e 1920 px.
13. `npm test`, `npx --no-install prettier --check src scripts test`, `npm run build` e `npm run check` terminam com código 0.

## Fora do escopo e aprovação

Não redesenhar a abertura, não alterar título, ações, parágrafos, faixa de números nem seção GitHub. Não copiar o texto de "commitar" do exemplo. Não publicar.

O aceite desta especificação autoriza o plano de implementação, não a implementação.
