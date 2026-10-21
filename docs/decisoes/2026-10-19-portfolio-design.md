# Portfólio pessoal: especificação inicial

- **Revisão:** r7
- **Data:** 2026-10-19
- **Etapa:** desenho aprovado e implementado; abertura revista na r7
- **Alterações da r7:** a abertura deixa de ser nome e uma linha e passa a ter faixa de meta, ofício em duas linhas e posicionamento em parágrafo (detalhado adiante). A seção `#trajetoria` manteve o nome "Trajetória" depois de uma troca para "Jornada" em 2026-10-21, revertida no mesmo dia: "Trajetória" é o termo convencional de currículo e não colide com "jornada do usuário", expressão de UX.
- **Alterações da r6:** a paleta ganha uma segunda cor de destaque, `--info: #6EC5B8` (teal), escolhida por Jonas em 2026-10-21 numa comparação de seis candidatas renderizadas sobre as cores reais da barra. Uso restrito a metadado temporal: data de evento na barra de atividade e data de último envio nos cartões de repositório. O âmbar continua sendo a cor de ação; nenhum botão, link ou verbo de estado usa a cor nova. Medições sobre o fundo `#0C0A12`: 9,69:1 para a cor escolhida, contra 6,84:1 do cinza suave e 9,64:1 do âmbar. Sobre a superfície `#15121D`, mede 9,09:1. A escolha passou por três alternativas antes de fechar: azul dessaturado `#7F9DC0` foi rejeitado por não se separar do cinza, areia `#C9B48F` por ter matiz vizinha ao âmbar e confundir metadado com ação, e lilás acinzentado `#A99FC4` por se aproximar demais do fundo, apesar de a matiz combinar com ele. O teal é o único candidato que mede acima do âmbar e ainda assim mantém matiz claramente oposta, que é o que separa "quando" de "o quê" na barra. Alternativas medidas e não escolhidas: azul saturado `#7EB6FF` (9,39:1) e verde-menta `#8FD4A8` (11,38:1). A variação escura do âmbar, cogitada para o mesmo fim, cai a 2,73:1 e perde legibilidade.
- **Alterações da r5:** o site passa a ter duas versões, `pt-BR` em `/` e `en-US` em `/en/`, com alternância por link no cabeçalho. O rótulo do menu continua "Stack", por decisão de Jonas.
- **Alterações da r4:** o destaque passa de roxo (r3) para âmbar `#F5A524`, por decisão de Jonas em 2026-10-19, após comparação de contraste e de tom. Os demais requisitos da r2 seguem válidos.

## Objetivo

Construir um portfólio próprio de Jonas Klimaitis, com fundo escuro, destaques em âmbar, navegação no topo e elementos visuais relacionados ao GitHub. O código, a identidade e o conteúdo serão próprios.

Construção incremental: cada incremento é implementado e verificado antes do seguinte, sem geração automática do site completo.

## Primeiro marco: estrutura estática funcionando

O primeiro marco entrega uma página local em português com estas partes:

- Cabeçalho com navegação por links para as seções da própria página.
- Apresentação com o nome de Jonas e um texto provisório identificado como tal.
- Tecnologias, projetos, experiência/formação e contato.
- Espaço identificado para a futura atividade do GitHub, sem números inventados.

O conteúdo ainda não revisado fica marcado como “Em construção”. A biografia, os projetos e as métricas devem corresponder à experiência de Jonas. Links externos só ficam ativos quando seu destino estiver confirmado; não simular um currículo disponível ou um formulário funcionando.

Este primeiro marco comprova a estrutura e a execução do site. A composição visual será construída na etapa de CSS; animações não são necessárias para aprovar a estrutura.

## Abertura

A abertura tem cinco blocos, na ordem:

1. **Faixa de meta**, com a borda inferior como divisória: à esquerda `São Paulo` e a hora local; à direita `github.com/Jklimaitis` com seta, ligando ao perfil.
2. **Nome** em linha pequena, monoespaçada, acima do título.
3. **Ofício em duas linhas**: `Desenvolvedor` e `Backend`, com a segunda palavra em âmbar. É o único título `h1` da página.
4. **Posicionamento**: um parágrafo, e as três ações ao lado, na mesma faixa.
5. **Faixa de números** e o convite `role para explorar`.

Regras técnicas que decorrem de erros medidos em 2026-10-21:

- **Hora local calculada no navegador** com `Intl.DateTimeFormat` e o fuso `America/Sao_Paulo`, atualizada a cada 30 segundos. Sem JavaScript o campo fica vazio e é escondido por `:empty`; nenhum horário fixo é escrito no HTML, porque envelheceria.
- **O título não quebra dentro da palavra.** A herança de `overflow-wrap: anywhere` produzia "Desenvolve/dor"; as duas partes usam `white-space: nowrap` e o tamanho da fonte é dimensionado para a palavra mais longa caber. O tamanho é `clamp(2.4rem, 7.4vw, 5.9rem)`, medido em 390, 900, 1024 e 1440 px sem transbordo.
- **A abertura usa faixa de `72rem`**, e não os `60rem` do resto da página. É a única exceção de largura, admitida porque ali só há tipografia de display: o parágrafo continua limitado a 62ch.
- **Título na largura toda, texto e ações na linha de baixo.** Com título e parágrafo em colunas lado a lado, a diferença de altura entre eles abria 131 px de vazio sob o título; a composição em duas linhas elimina o vazio sem inventar conteúdo.

## Base técnica e organização

- Astro com HTML, CSS e JavaScript, sem React e sem tema pronto.
- Desenvolvimento em `/home/jonask/Projects/portfolio`, no WSL.
- Node `v24.22.0` pelo nvm, com a versão registrada em `.nvmrc`; dependências reproduzíveis pelo `package-lock.json`.
- Estilos em `src/styles/global.css`. Arquivos estáticos ficam em `public/` quando forem necessários.
- Duas rotas estáticas: `src/pages/index.astro` para `pt-BR` e `src/pages/en/index.astro` para `en-US`. O conteúdo traduzido fica em módulos de idioma, consumidos por um componente único, para que as duas versões não divirjam.
- Extrair componentes quando houver uma responsabilidade que justifique a separação; não criar uma biblioteca de componentes antes de existir essa necessidade.
- Configurar scripts de desenvolvimento e build, além de ignorar dependências, arquivos gerados e segredos no Git.

Os textos serão editados localmente nos arquivos do Astro. O build gera HTML e os recursos que o navegador utiliza. Este marco não terá backend, banco de dados, autenticação ou chamadas a APIs externas.

## Comportamento e limites

### Idiomas

A versão em português fica na raiz; a inglesa, em `/en/`. O cabeçalho traz um controle de idioma que é um link para a outra versão, sem depender de JavaScript: quem abre `/` vê o link para `/en/`, e quem abre `/en/` vê o link para `/`.

A troca leva ao topo da outra versão, não à mesma seção, porque as âncoras são as mesmas nas duas e o retorno previsível é mais simples de verificar. Cada página declara seu próprio `lang` e traduz títulos, navegação e conteúdo provisório. O verificador de build precisa passar nas duas páginas.

O menu usa âncoras nativas do HTML, com identificadores correspondentes nas seções. A página terá idioma declarado, um título principal e estrutura semântica de navegação e conteúdo, permitindo uso por teclado.

A ausência de conteúdo definitivo será apresentada explicitamente, sem falhas silenciosas nem dados fictícios tratados como fatos. Credenciais nunca serão colocadas em arquivos entregues ao navegador.

Nome em quadradinhos, ilustrações, animações e dados do GitHub serão detalhados em incrementos posteriores. Estarem fora deste marco não significa excluí-los da experiência final desejada.

## Critérios de aceite do primeiro marco

- O servidor de desenvolvimento abre a página no endereço local informado pelo Astro.
- A página contém as partes descritas e os links internos levam às seções corretas.
- Há um único título principal, navegação por teclado e conteúdo provisório identificado.
- `npm run build` termina com sucesso e gera `dist/index.html`.
- O Git contém apenas fontes, configuração e documentação; não inclui `node_modules/`, `dist/`, `.astro/` ou segredos.
- Os resultados são conferidos em execução; escrever os arquivos não conta como concluir o marco.

## Sequência de ensino e aprovação

A ordem de execução seguida foi: configurar o Astro, criar a primeira página, verificar o resultado gerado e registrar no Git; cada incremento posterior entrou com especificação própria nesta pasta.

Cada incremento é implementado e revisado antes de avançar para o seguinte. A sequência seguinte será aparência e responsividade, interações, dados externos e publicação, com o escopo de cada incremento definido antes de executá-lo.

A publicação foi autorizada em 2026-10-21 e o site é publicado no GitHub Pages pelo workflow do repositório.

## Fontes técnicas

- [Instalação do Astro](https://docs.astro.build/en/install-and-setup/)
- [Desenvolvimento e build no Astro](https://docs.astro.build/en/develop-and-build/)
- [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
