# Projetos em master-detail

- **Revisão:** r1
- **Data:** 2026-10-20
- **Estado:** decisões aprovadas em 2026-10-20; aceita em 2026-10-21 e implementada
- **Tipo:** especificação técnica do incremento de projetos

## Objetivo e escopo aprovado

Substituir a lista atual de cartões da seção Projetos por um padrão master-detail: uma lista de seletores à esquerda e um painel de detalhe à direita, com o primeiro projeto selecionado ao abrir a página.

Entram os quatro projetos existentes, inclusive os de repositório privado. Sem JavaScript, os quatro painéis aparecem empilhados, na ordem da lista, cada um com o próprio título.

A lista curada desta seção continua sendo a fonte dos projetos apresentados. A lista automática do incremento do GitHub não substitui nem alimenta esta seção.

## Contrato de dados

O tipo `Projeto` passa a ser:

```ts
export type LinkProjeto = { rotulo: string; href: string };

export type Projeto = {
  nome: string;
  tags: string[];
  descricao: string;
  arquitetura: string[];
  destaques: string[];
  tecnologias: string[];
  meta?: string;
  links: LinkProjeto[];
  nota?: string;
};
```

- `tags` são categorias curtas, exibidas como uma linha com marcador e separadas por ` · `.
- `descricao` é um parágrafo de 3 a 5 frases.
- `arquitetura` é o fluxo de camadas, na ordem, exibido como chips ligados por `→`.
- `destaques` são bullets curtos.
- `tecnologias` é o inventário de tecnologias, sem ordem, exibido como chips.
- `meta` é texto livre, no formato `Linguagem · atualizado mês ano`, porque parte dos projetos é privada e não tem data pública confiável.
- `links` aceita zero, um ou vários destinos rotulados.
- `nota` mantém a marcação de repositório privado.

Campos opcionais ausentes são omitidos com o bloco inteiro, nunca preenchidos com texto genérico. `arquitetura`, `destaques` e `tecnologias` vazios não renderizam o respectivo bloco nem o rótulo.

## Apresentação

**Lista de seletores (esquerda):** um botão por projeto, com o nome e, abaixo, as tags. O projeto selecionado recebe borda de destaque e `aria-selected="true"`.

**Painel (direita), nesta ordem:**

| Bloco | Conteúdo |
|---|---|
| Categoria | chips das `tags`, com marcador à esquerda |
| Título | `nome` como cabeçalho do painel |
| Descrição | `descricao` em parágrafo |
| Arquitetura | rótulo e chips do fluxo, unidos por `→` |
| Destaques | rótulo e lista de bullets |
| Tecnologias | chips do inventário |
| Metadados | `meta` em texto mono discreto |
| Links | um botão por item de `links`, com `rel="noopener noreferrer"` |
| Nota | `nota`, quando existir |

## Comportamento e acessibilidade

- **Sem JavaScript:** os quatro painéis ficam visíveis, empilhados, com o nome do projeto como cabeçalho de cada um. A lista de seletores permanece visível e inerte.
- **Com JavaScript:** apenas o painel selecionado fica visível; os demais recebem `hidden`. O primeiro projeto fica selecionado ao abrir.
- **Padrão ARIA de abas:** a lista é `role="tablist"` com orientação vertical, cada seletor é `role="tab"` com `aria-selected` e `aria-controls`, e cada painel é `role="tabpanel"` com `aria-labelledby`. Apenas a aba selecionada entra na ordem de tabulação; setas ↑ e ↓ movem a seleção, `Home` e `End` vão ao primeiro e ao último, e o foco permanece na lista.
- **Foco visível** em seletores, links e botões, com o anel já usado no restante do site.
- **Texto externo** entra como texto, nunca como HTML.

## Layout responsivo

- Acima de 900 px: duas colunas, lista com largura fixa moderada e painel ocupando o resto.
- Até 900 px: lista em uma linha com rolagem horizontal interna sem barra visível, e painel abaixo dela. Sem JavaScript, os painéis empilhados seguem esse mesmo arranjo.
- Nenhuma largura fixa em `px` que force rolagem horizontal da página.

## Critérios de aceite

1. As duas rotas apresentam os quatro projetos com o conteúdo do respectivo idioma e nenhum texto provisório.
2. Com JavaScript, apenas o painel selecionado aparece; o primeiro vem selecionado; clicar em outro seletor troca o painel.
3. Teclado: setas, `Home` e `End` mudam a seleção; `Tab` entra e sai da lista sem percorrer os quatro seletores; o foco permanece visível.
4. Sem JavaScript, os quatro painéis aparecem empilhados, com título próprio e todos os blocos preenchidos.
5. Campos vazios não geram rótulo nem bloco vazio, e nenhum texto genérico substitui conteúdo ausente.
6. Links abrem em nova aba com `rel="noopener noreferrer"` e apontam apenas para HTTPS.
7. Layout sem rolagem horizontal da página em 1440 px e em 390 px.
8. `npm test`, `npx --no-install prettier --check src scripts test`, `npm run build` e `npm run check` passam, com o Node do `.nvmrc`.
9. O verificador do build continua exigindo o identificador `projetos` e as duas páginas.

## Fora do escopo

- Animações, revelação ao rolar, holofote no cursor e feedback de clique: incremento seguinte, com spec própria.
- Alterar a seção de atividade do GitHub.
- Alterar o texto dos outros blocos do site.
