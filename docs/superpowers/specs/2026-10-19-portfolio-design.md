# Portfólio pessoal: especificação inicial

- **Revisão:** r5
- **Data:** 2026-10-19
- **Etapa:** revisão do desenho, antes da implementação
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

Depois da revisão desta especificação, será apresentado um plano curto para configurar o Astro, criar a primeira página, verificar sua execução e registrar o resultado no Git. O plano também será revisado antes de iniciar esses passos.

Cada incremento é implementado e revisado antes de avançar para o seguinte. A sequência seguinte será aparência e responsividade, interações, dados externos e publicação, com o escopo de cada incremento definido antes de executá-lo.

Esta revisão não autoriza criação de repositório remoto, push nem publicação.

## Fontes técnicas

- [Instalação do Astro](https://docs.astro.build/en/install-and-setup/)
- [Desenvolvimento e build no Astro](https://docs.astro.build/en/develop-and-build/)
- [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
