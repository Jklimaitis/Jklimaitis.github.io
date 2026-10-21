import { test } from 'node:test';
import assert from 'node:assert/strict';
import { lerCommits, encurtar, dataCurta } from '../src/dados/commits.mts';

const SAIDA = `a77fd88|2026-10-21|style: titulo da abertura ocupa a coluna
ac5c414|2026-10-21|fix: grade de repositorios sem buraco na ultima linha
3e473bc|2026-10-21|feat: arte do nome na abertura em canvas`;

test('lê a saída do git log na ordem em que vem', () => {
  const commits = lerCommits(SAIDA);

  assert.equal(commits.length, 3);
  assert.deepEqual(commits[0], {
    sha: 'a77fd88',
    data: '2026-10-21',
    mensagem: 'style: titulo da abertura ocupa a coluna',
  });
  assert.equal(commits[2].sha, '3e473bc');
});

test('respeita o limite de linhas', () => {
  assert.equal(lerCommits(SAIDA, 2).length, 2);
  assert.equal(lerCommits(SAIDA, 0).length, 0);
});

test('ignora linha malformada em vez de inventar commit', () => {
  const misturado = `${SAIDA}\nlinha sem formato\n\nabc|2026-10-21|hash curto demais`;
  const commits = lerCommits(misturado);

  // as três linhas válidas continuam; a sem formato e a de hash curto saem
  assert.equal(commits.length, 3);
  assert.ok(!commits.some((commit) => commit.sha === 'abc'));
  assert.deepEqual(
    commits.map((c) => c.sha),
    ['a77fd88', 'ac5c414', '3e473bc'],
  );
});

test('saída vazia devolve lista vazia', () => {
  assert.deepEqual(lerCommits(''), []);
  assert.deepEqual(lerCommits('   '), []);
});

test('encurta a mensagem sem cortar palavra ao meio', () => {
  const longa = `${'palavra '.repeat(10)}fim`;
  const curta = encurtar(longa);

  assert.ok(curta.length <= 65, `${curta.length}`);
  assert.ok(curta.endsWith('…'));
  assert.ok(!curta.includes('  '));
  assert.ok(!/\bpalav…$/.test(curta), 'cortou palavra ao meio');
  // mensagem que já cabe não ganha reticências
  assert.equal(encurtar('fix: curto'), 'fix: curto');
});

test('data curta usa mês e dia', () => {
  assert.equal(dataCurta('2026-10-21'), '10-21');
  assert.equal(dataCurta('ontem'), 'ontem');
});
