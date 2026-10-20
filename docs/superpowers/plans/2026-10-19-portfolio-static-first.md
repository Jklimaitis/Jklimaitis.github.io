# Portfólio pessoal — Plano de implementação do primeiro marco

**Objetivo:** colocar no ar localmente a estrutura estática do portfólio em Astro, com navegação por âncoras e build verificado.

**Arquitetura:** projeto Astro mínimo criado manualmente (sem assistente), com uma página em `src/pages/index.astro`, estilos em `src/styles/global.css` e um script de checagem que valida o HTML gerado em `dist/`. Sem frameworks de UI, sem backend.

**Stack:** Astro, HTML, CSS, JavaScript; Node `v24.22.0` via nvm.

**Spec:** `docs/superpowers/specs/2026-10-19-portfolio-design.md` (r2)

## Restrições globais

- Node `v24.22.0`, ativado pelo nvm; registrar a versão em `.nvmrc`.
- Sem React, sem framework de UI e sem tema pronto.
- Todo texto da página em português do Brasil; conteúdo não revisado marcado como “Em construção”.
- Nenhum backend, banco, autenticação ou chamada a API externa neste marco.
- Nenhuma credencial em arquivo entregue ao navegador.
- `node_modules/`, `dist/` e `.astro/` nunca entram no Git.
- Sem push, sem publicação e sem criar repositório remoto neste marco.

## Foco de revisão

Comportamentos que a spec não fixa e que costumam quebrar primeiro:

1. **Acento virando “OlÃ¡”** — sem `charset` declarado, o navegador lê UTF-8 como windows-1252. Testado na Tarefa 4.
2. **Âncora sem destino** — link do menu aponta para `#algumacoes` que não existe e o clique não faz nada. Testado na Tarefa 4.
3. **`id` duplicado** — dois elementos com o mesmo `id` fazem a âncora ir para o lugar errado. Testado na Tarefa 4.
4. **JavaScript desativado** — a página estática precisa renderizar por completo sem JS. Garantido pelo build na Tarefa 2 (nenhum conteúdo depende de script).
5. **Tela estreita ou zoom alto** — texto longo deve quebrar linha sem criar rolagem horizontal. Conferido na Tarefa 3.

---

### Tarefa 1: Projeto Astro mínimo que roda e builda

**Arquivos:**
- Criar: `package.json`, `.nvmrc`, `.gitignore`, `astro.config.mjs`, `tsconfig.json`
- Criar: `src/pages/index.astro` (página provisória “Olá”)
- Criar: `public/robots.txt`

**Interfaces:**
- Produz: scripts `dev`, `build` e `preview` no `package.json`; diretório `dist/` como saída do build.

- [ ] **Passo 1: criar o `package.json`**

```bash
npm init --yes
```

Esperado: cria `package.json` com `name: "portfolio"` e `private: true`.

- [ ] **Passo 2: instalar o Astro**

```bash
npm install astro
```

Esperado: `added N packages` e a pasta `node_modules/`; `package.json` passa a listar `astro` em `dependencies`.

- [ ] **Passo 3: registrar a versão do Node**

```bash
echo "v24.22.0" > .nvmrc
nvm use
```

Esperado: `Now using node v24.22.0`.

- [ ] **Passo 4: adicionar os scripts ao `package.json`**

Dentro do bloco `"scripts"`, deixar exatamente:

```json
{
  "dev": "astro dev",
  "build": "astro build",
  "preview": "astro preview"
}
```

- [ ] **Passo 5: criar `.gitignore`**

```text
node_modules/
dist/
.astro/
.env
.env.*
```

- [ ] **Passo 6: criar `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';

export default defineConfig({});
```

- [ ] **Passo 7: criar `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/base"
}
```

- [ ] **Passo 8: criar a página provisória `src/pages/index.astro`**

```astro
<html lang="pt-BR">
  <head>
    <meta charset="utf-8" />
    <title>Portfólio</title>
  </head>
  <body>
    <h1>Olá, portfólio</h1>
  </body>
</html>
```

- [ ] **Passo 9: criar `public/robots.txt`**

```text
User-agent: *
Allow: /
```

- [ ] **Passo 10: subir o servidor de desenvolvimento**

```bash
npm run dev
```

Esperado: a linha `Local http://localhost:4321/`. Abrir no navegador e ver “Olá, portfólio”. Encerrar com `Ctrl+C`.

Não abrir o arquivo por duplo clique: `file://` não serve os recursos do Astro.

- [ ] **Passo 11: rodar o build**

```bash
npm run build
ls dist/index.html
```

Esperado: `Complete!` e `dist/index.html` listado.

- [ ] **Passo 12: conferir que só fontes foram rastreadas**

```bash
git status --short
```

Esperado: `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `.nvmrc`, `public/`, `src/`; **sem** `node_modules/` nem `dist/`.

- [ ] **Passo 13: commit**

```bash
git add .nvmrc .gitignore package.json package-lock.json astro.config.mjs tsconfig.json public src
git commit -m "chore: cria projeto Astro minimo"
```

---

### Tarefa 2: Marcação estática com as seções e âncoras

**Arquivos:**
- Modificar: `src/pages/index.astro`

**Interfaces:**
- Consome: scripts e estrutura da Tarefa 1.
- Produz: os `id` `inicio`, `stack`, `projetos`, `github`, `trajetoria`, `contato`, usados pelas âncoras do menu e pelas checagens da Tarefa 4.

- [ ] **Passo 1: escrever a marcação completa**

Estrutura obrigatória, com um único `<h1>` e um `<h2>` por seção:

```text
html lang="pt-BR"
  head   meta charset="utf-8" · meta viewport · title
  body
    header
      nav  → links #inicio #stack #projetos #github #trajetoria #contato
    main
      section#inicio      h1 "Jonas Klimaitis" + parágrafo "Em construção"
      section#stack       h2 + parágrafo "Em construção"
      section#projetos    h2 + parágrafo "Em construção"
      section#github      h2 + parágrafo "Em construção"
      section#trajetoria  h2 + parágrafo "Em construção"
      section#contato     h2 + parágrafo "Em construção"
    footer
```

Regras: cada `href="#x"` do menu possui um `id="x"` correspondente; nenhum `id` se repete; o texto provisório diz “Em construção” e não inventa experiência, métrica ou projeto.

O `<head>` precisa declarar `charset="utf-8"`. O servidor de desenvolvimento do Astro responde `content-type: text/html` **sem** charset, então sem essa meta o navegador interpreta acentos como windows-1252 e “Olá” aparece como “OlÃ¡”. Também entrarão `viewport` (largura correta em celular) e `title` (texto da aba).

- [ ] **Passo 2: conferir no navegador**

```bash
npm run dev
```

Esperado: as seis seções aparecem, e cada link do menu rola até a seção correspondente. Encerrar com `Ctrl+C`.

- [ ] **Passo 3: build**

```bash
npm run build
```

Esperado: `Complete!`.

- [ ] **Passo 4: commit**

```bash
git add src/pages/index.astro
git commit -m "feat: estrutura estatica com secoes e ancoras"
```

---

### Tarefa 3: Estilos base legíveis

**Arquivos:**
- Criar: `src/styles/global.css`
- Modificar: `src/pages/index.astro` (importar o CSS)

**Interfaces:**
- Consome: a marcação da Tarefa 2.
- Produz: `src/styles/global.css`, que recebe a composição visual definitiva na etapa seguinte.

- [ ] **Passo 1: criar `src/styles/global.css` com o mínimo**

Regras desta tarefa, sem a paleta final. Estilizar apenas estes seletores: `body`, `header`, `nav`, `main`, `section`, `h1`, `h2`, `p`, `footer`.

Requisitos: largura máxima de leitura no conteúdo, espaçamento entre seções, tamanho de fonte legível e quebra de texto longa sem rolagem horizontal (`overflow-wrap: anywhere` nos títulos).

- [ ] **Passo 2: importar o CSS na página**

No topo de `src/pages/index.astro`, acima do HTML:

```astro
---
import '../styles/global.css';
---
```

- [ ] **Passo 3: conferir legibilidade e tela estreita**

```bash
npm run dev
```

Esperado: texto legível; ao estreitar a janela até a largura de um celular, nenhuma rolagem horizontal aparece.

- [ ] **Passo 4: build**

```bash
npm run build
```

Esperado: `Complete!`.

- [ ] **Passo 5: commit**

```bash
git add src/styles/global.css src/pages/index.astro
git commit -m "style: base tipografica e espacamento"
```

---

### Tarefa 4: Checagem automatizada do HTML gerado

**Arquivos:**
- Criar: `scripts/check-build.mjs`
- Modificar: `package.json` (script `check`)

**Interfaces:**
- Consome: `dist/index.html` produzido pela Tarefa 2 e mantido pela Tarefa 3.
- Produz: `npm run check`, com saída `OK` e código 0 quando passa; lista de problemas e código 1 quando falha.

- [ ] **Passo 1: escrever o verificador**

`scripts/check-build.mjs`:

```js
#!/usr/bin/env node
// Valida o HTML gerado em dist/ antes de publicar.
// Uso: node scripts/check-build.mjs [id-obrigatorio ...]
import { readFileSync } from 'node:fs';

const required = process.argv.slice(2);
const html = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const ids = [...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
const anchors = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
const problems = [];

if (!/lang="[a-z]{2}(-[A-Z]{2})?"/.test(html)) problems.push('atributo lang ausente');

if (!/charset="utf-8"/i.test(html)) problems.push('meta charset utf-8 ausente');

const h1 = html.match(/<h1[\s>]/g) ?? [];
if (h1.length !== 1) problems.push(`h1 deve aparecer uma vez (encontrado: ${h1.length})`);

if (new Set(ids).size !== ids.length) problems.push('id duplicado');

for (const anchor of anchors) {
  if (!ids.includes(anchor)) problems.push(`ancora sem destino: #${anchor}`);
}

for (const id of required) {
  if (!ids.includes(id)) problems.push(`id obrigatorio ausente: #${id}`);
}

if (problems.length) {
  console.error('FALHOU:\n- ' + problems.join('\n- '));
  process.exit(1);
}
console.log(`OK: ${ids.length} ids, ${anchors.length} ancoras resolvidas`);
```

- [ ] **Passo 2: registrar o script no `package.json`**

Acrescentar em `"scripts"`: `"check": "node scripts/check-build.mjs"`.

- [ ] **Passo 3: rodar a checagem contra o build atual**

```bash
npm run build
node scripts/check-build.mjs inicio stack projetos github trajetoria contato
```

Esperado: `OK: 6 ids, 6 ancoras resolvidas`.

- [ ] **Passo 4: provar que a checagem reprova de verdade**

Trocar temporariamente um `href="#stack"` por `href="#stak"`, rodar `npm run build && node scripts/check-build.mjs inicio stack projetos github trajetoria contato` e confirmar a mensagem `ancora sem destino: #stak` com código de saída 1. Depois desfazer a troca e repetir o comando: `OK: 6 ids, 6 ancoras resolvidas`.

- [ ] **Passo 5: commit**

```bash
git add scripts/check-build.mjs package.json
git commit -m "test: valida idioma, h1 e ancoras no build"
```
