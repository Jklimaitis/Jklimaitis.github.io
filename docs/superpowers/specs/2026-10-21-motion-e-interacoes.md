# Motion e interações

- **Revisão:** r2
- **Data:** 2026-10-21
- **Estado:** decisões aprovadas em 2026-10-21; esta r2 aguarda aceite
- **Tipo:** especificação técnica do incremento de movimento e retorno visual
- **Alterações da r2:** o holofote alcança também os três blocos da seção GitHub, que passam a ter tratamento de cartão; o critério de deslocamento de layout passa de zero absoluto para abaixo de 0,02, com a origem medida declarada

## Objetivo e escopo aprovado

Dar movimento e retorno visual ao site, sem prejudicar leitura, teclado, desempenho ou a alternativa sem JavaScript. Entram seis efeitos: revelação ao rolar, revelação palavra por palavra no título de abertura, entrada das células do calendário, holofote no cursor sobre cartões, pulso no número que mudou e selo `+N` quando o total aumenta em relação à visita anterior.

Ficam de fora: animação de rolagem automática, carrossel, vídeo, som, carregamento progressivo de imagens, qualquer biblioteca de animação e qualquer alteração de conteúdo.

## Regra de ouro

Nada se move sem a classe `anim` no elemento `html`, colocada apenas por JavaScript. Sem JavaScript, a página é exatamente a de hoje: estática e completa. Todo efeito é, portanto, um acréscimo — nunca um pré-requisito para o conteúdo aparecer.

Com `prefers-reduced-motion: reduce`, a classe `anim` não é aplicada. O conteúdo aparece no estado final, sem transformação, sem transição e sem o selo `+N`.

## Definições por efeito

### 1. Revelação ao rolar

Elementos marcados com `data-revelar` entram quando cruzam 15% da viewport. A animação é `opacity` de 0 para 1 e `translateY` de 24 px para 0, com 700 ms e curva `cubic-bezier(0.2, 0.8, 0.2, 1)`. Cada elemento aceita um atraso próprio em `data-atraso` (milissegundos), para escalonar itens vizinhos.

Regras: um `IntersectionObserver` único para toda a página; cada elemento é observado uma vez e deixa de ser observado ao entrar; nada reanima ao rolar de volta; o estado inicial é aplicado apenas quando a classe `anim` existe, para não haver conteúdo invisível sem JavaScript.

Alvos: cabeçalhos de seção, cartões de repositório da seção GitHub e os quatro painéis de projeto.

### 2. Revelação palavra por palavra

O `h1` da abertura é dividido em palavras, cada uma dentro de uma máscara com `overflow: hidden`, e o texto interno sobe de `translateY(105%)` para `0`, com 900 ms e atraso de 55 ms por palavra.

Regras: a máscara recebe `padding` vertical suficiente para não cortar acentos e descendentes (`ç`, `ã`, `í`, `g`); o texto do `h1` continua sendo texto real, sem `aria-label` duplicado nem conteúdo injetado por `innerHTML`; palavras são separadas por espaço normal, de modo que copiar o título devolva a frase legível.

### 3. Entrada das células do calendário

As 368 células entram com `scale(0)` para `scale(1)` em 400 ms, com atraso de 14 ms por coluna, contado da esquerda para a direita. A animação ocorre uma vez, quando o bloco entra na viewport.

Regras: o atraso é derivado do índice da coluna, não do índice do dia; células de preenchimento não animam; a animação não pode alterar dimensões da grade, apenas a escala visual.

### 4. Holofote no cursor

Cartões da seção GitHub, painéis de projeto e os três blocos da seção GitHub — perfil, repositórios e calendário, que têm tratamento de cartão — ganham um gradiente radial suave que segue o ponteiro, desenhado em `::after` com `position: absolute`, `pointer-events: none` e `z-index` atrás do conteúdo. As coordenadas vêm de `--mx` e `--my`, atualizadas em `pointermove`.

Regras: só em `matchMedia('(hover: hover) and (pointer: fine)')`; a atualização é agrupada em `requestAnimationFrame`, no máximo uma escrita por quadro; um único listener por container, com delegação, em vez de um por cartão; ao sair do cartão, o gradiente desaparece com transição de opacidade de 300 ms; em toque, nada é registrado.

### 5. Pulso no número que mudou

Quando um indicador do calendário chega com valor diferente do exibido, o número recebe um pulso de 550 ms: cor do destaque e `translateY(-3px)` com `scale(1.12)` no pico. Aplicado aos cinco valores do resumo e ao total de repositórios públicos.

Regras: um pulso por número por carregamento; nunca em laço; não muda a largura do elemento (`font-variant-numeric: tabular-nums` já garante); não dispara quando a fonte falhou.

### 6. Selo `+N`

Quando o total de contribuições do calendário é maior que o total guardado na visita anterior, o bloco do total exibe um selo `+N` por 4 segundos, com 1,1 s de vida útil e sem interação do usuário.

Regras: a comparação acontece antes de o cache ser sobrescrito, lendo o registro existente; primeira visita, cache ausente, corrompido ou expirado não gera selo; se o total cair ou ficar igual, nada é exibido; o selo é `aria-hidden="true"` e a informação equivalente aparece no texto acessível apenas se for relevante — o selo é enfeite, não dado.

## Módulos e testes

A lógica pura fica em `src/dados/motion.mts`: cálculo do deslocamento relativo do ponteiro dentro de um retângulo e decisão de exibir o selo comparando dois totais. Ambas testáveis sem navegador, com respostas sintéticas.

O resto é DOM e observa-se no navegador: `IntersectionObserver`, `requestAnimationFrame` e a divisão do título.

## Limites técnicos

- Animar apenas `opacity`, `transform` e `background-position`. Nada de `width`, `height`, `margin` ou `top`, para não provocar deslocamento de layout nem realimentar o observador.
- Nenhuma dependência nova; nenhum `setInterval`; nenhum laço infinito.
- Um único observador de interseção e um único listener de ponteiro por container.
- A ordem de tabulação, o anel de foco e a leitura por teclado não mudam em nenhum efeito.
- O custo somado de JavaScript não pode passar de 4 KB comprimido além do que existe hoje.

## Critérios de aceite

1. Com JavaScript e sem preferência de movimento reduzido, o título entra palavra por palavra, as seções revelam uma vez ao entrar na viewport e as células do calendário entram por coluna.
2. Rolando de volta e para frente, nada reanima.
3. Com `prefers-reduced-motion: reduce`, nenhum elemento é transformado, nenhuma transição de entrada ocorre, o conteúdo está visível desde o primeiro quadro e o selo `+N` não aparece.
4. Sem JavaScript, a página é idêntica em conteúdo à atual, sem classe `anim` e sem elemento invisível.
5. O holofote aparece apenas com ponteiro fino, some ao sair do cartão e não existe em emulação de toque.
6. O selo `+N` aparece somente quando o total cresce em relação ao cache, não aparece na primeira visita e desaparece sem interação.
7. O pulso ocorre uma vez por número e não altera a posição dos vizinhos.
8. O deslocamento de layout medido fica abaixo de 0,02 durante o carregamento. A origem medida é a seção GitHub, que reserva espaço zero e cresce quando os dados chegam; reservar altura fixa foi descartado porque o conteúdo varia com o número de cartões e com o idioma. O valor medido na implementação foi 0,0165, contra o limite de 0,1 considerado bom pelo padrão de métricas web.
9. `npm test`, `npx --no-install prettier --check src scripts test`, `npm run build` e `npm run check` passam.
10. A navegação por teclado das abas de projeto continua funcionando igual, com foco visível.

## Fora do escopo e aprovação

Não trocar paleta, tipografia, layout, conteúdo ou ordem das seções. Não alterar as abas de projeto, a grade do calendário nem os cartões da seção GitHub além do que os efeitos exigem. Não publicar nem configurar repositório remoto.

O aceite desta especificação autoriza o plano de implementação, não a implementação.
