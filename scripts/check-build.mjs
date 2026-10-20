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
