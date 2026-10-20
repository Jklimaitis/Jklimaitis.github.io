import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcularIndicadores } from '../src/dados/calendario.mts';

const dias = (...pares) =>
  pares.map(([data, contagem]) => ({ data, contagem, nivel: 0 }));

test('soma, dias ativos e sequência terminada no dia anterior', () => {
  const r = calcularIndicadores(
    dias(['2026-10-18', 1], ['2026-10-19', 2], ['2026-10-20', 0]),
  );
  assert.equal(r.total, 3);
  assert.equal(r.diasAtivos, 2);
  assert.equal(r.sequenciaAtual, 2);
});

test('sequência atual conta a partir do último dia ativo', () => {
  const r = calcularIndicadores(
    dias(['2026-10-18', 1], ['2026-10-19', 0], ['2026-10-20', 3]),
  );
  assert.equal(r.sequenciaAtual, 1);
  assert.equal(r.maiorSequencia, 1);
});

test('maior sequência atravessa virada de mês e de ano sem deslocar o dia', () => {
  const r = calcularIndicadores(
    dias(['2025-12-30', 1], ['2025-12-31', 1], ['2026-01-01', 1], ['2026-01-02', 0]),
  );
  assert.equal(r.maiorSequencia, 3);
  assert.equal(r.sequenciaAtual, 3);
});

test('empate no melhor dia fica com a data mais recente', () => {
  const r = calcularIndicadores(
    dias(['2026-10-18', 7], ['2026-10-19', 7], ['2026-10-20', 3]),
  );
  assert.equal(r.melhorDia.data, '2026-10-19');
  assert.equal(r.melhorDia.contagem, 7);
});

test('período sem contribuições devolve zeros válidos e melhor dia nulo', () => {
  const r = calcularIndicadores(
    dias(['2026-10-18', 0], ['2026-10-19', 0], ['2026-10-20', 0]),
  );
  assert.deepEqual(r, {
    total: 0,
    diasAtivos: 0,
    sequenciaAtual: 0,
    maiorSequencia: 0,
    melhorDia: null,
  });
});

test('intervalo interrompido não infla a maior sequência', () => {
  const r = calcularIndicadores(
    dias(['2026-10-17', 1], ['2026-10-18', 0], ['2026-10-19', 1], ['2026-10-20', 1]),
  );
  assert.equal(r.maiorSequencia, 2);
  assert.equal(r.sequenciaAtual, 2);
});