#!/usr/bin/env node
// Valida as duas paginas geradas em dist/ antes de publicar.
// Uso: node scripts/check-build.mjs [id-obrigatorio ...]
import { readFileSync } from 'node:fs';

const required = process.argv.slice(2);

const paginas = [
  { arquivo: 'index.html', outroIdioma: 'en' },
  { arquivo: 'en/index.html', outroIdioma: 'pt-BR' },
];

const problemas = [];

for (const { arquivo, outroIdioma } of paginas) {
  const html = readFileSync(
    new URL(`../dist/${arquivo}`, import.meta.url),
    'utf8',
  );
  const marca = `${arquivo}: `;

  const contato =
    html.match(
      /<section\b[^>]*\bid="contato"[^>]*>([\s\S]*?)<\/section>/,
    )?.[1] ?? '';

  const linksContato = [
    'https://www.linkedin.com/in/jonasklimaitis/',
    'https://github.com/Jklimaitis',
  ];

  for (const href of linksContato) {
    if (!contato.includes(`href="${href}"`)) {
      problemas.push(`${marca}link de contato ausente: ${href}`);
    }
  }

  if (!/lang="[a-z]{2}(-[A-Z]{2})?"/.test(html))
    problemas.push(marca + 'atributo lang ausente');
  if (!/charset="utf-8"/i.test(html))
    problemas.push(marca + 'meta charset utf-8 ausente');

  const h1 = html.match(/<h1[\s>]/g) ?? [];
  if (h1.length !== 1)
    problemas.push(
      `${marca}h1 deve aparecer uma vez (encontrado: ${h1.length})`,
    );

  const ids = [...html.matchAll(/id="([^"]+)"/g)].map((m) => m[1]);
  const ancoras = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);

  if (new Set(ids).size !== ids.length) problemas.push(marca + 'id duplicado');

  for (const ancora of ancoras) {
    if (!ids.includes(ancora))
      problemas.push(`${marca}ancora sem destino: #${ancora}`);
  }

  for (const id of required) {
    if (!ids.includes(id))
      problemas.push(`${marca}id obrigatorio ausente: #${id}`);
  }

  if (!html.includes(`hreflang="${outroIdioma}"`))
    problemas.push(marca + 'link de idioma ausente');

  if (arquivo.startsWith('en/') && html.includes('Em construção')) {
    problemas.push(marca + 'texto em portugues na versao inglesa');
  }
  if (!arquivo.startsWith('en/') && html.includes('Under construction')) {
    problemas.push(marca + 'texto em ingles na versao portuguesa');
  }
}

if (problemas.length) {
  console.error('FALHOU:\n- ' + problemas.join('\n- '));
  process.exit(1);
}

console.log(
  `OK: ${paginas.length} paginas, ${required.length} ids obrigatorios em cada`,
);
