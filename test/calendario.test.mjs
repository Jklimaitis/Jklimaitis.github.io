import { test } from 'node:test';
import assert from 'node:assert/strict';
import { alinharSemana, validarCalendario } from '../src/dados/calendario.mts';

const dia = (date, count, level = 0) => ({ date, count, level });

const respostaValida = {
  total: { lastYear: 3 },
  contributions: [
    dia('2026-10-18', 1),
    dia('2026-10-19', 0),
    dia('2026-10-20', 2, 1),
  ],
};

test('aceita resposta válida e renomeia os campos', () => {
  const r = validarCalendario(respostaValida);
  assert.equal(r.ok, true);
  assert.deepEqual(r.dados, [
    { data: '2026-10-18', contagem: 1, nivel: 0 },
    { data: '2026-10-19', contagem: 0, nivel: 0 },
    { data: '2026-10-20', contagem: 2, nivel: 1 },
  ]);
});

test('recusa corpo que não é objeto com lista', () => {
  for (const entrada of [{}, { contributions: [] }, null, [], 'x']) {
    const r = validarCalendario(entrada);
    assert.equal(r.ok, false);
    assert.equal(r.motivo, 'resposta-invalida');
  }
});

test('recusa data inexistente, duplicada ou com lacuna', () => {
  const casos = [
    [dia('2026-02-30', 1)],
    [dia('2026-10-18', 1), dia('2026-10-18', 2)],
    [dia('2026-10-18', 1), dia('2026-10-20', 2)],
  ];
  for (const contributions of casos) {
    const r = validarCalendario({ contributions });
    assert.equal(r.ok, false);
    assert.equal(r.motivo, 'resposta-invalida');
  }
});

test('recusa contagem ou nível fora do contrato', () => {
  const casos = [
    [dia('2026-10-18', -1)],
    [dia('2026-10-18', 1.5)],
    [dia('2026-10-18', '3')],
    [dia('2026-10-18', 1, 5)],
    [dia('2026-10-18', 1, '1')],
  ];
  for (const contributions of casos) {
    const r = validarCalendario({ contributions });
    assert.equal(r.ok, false);
    assert.equal(r.motivo, 'resposta-invalida');
  }
});

test('alinhamento não desloca quando o período começa no domingo', () => {
  const grade = alinharSemana([{ data: '2025-10-19', contagem: 0, nivel: 0 }]);
  assert.equal(grade.length, 1);
  assert.equal(grade[0].data, '2025-10-19');
});

test('alinhamento desloca quando o período começa no meio da semana', () => {
  const grade = alinharSemana([
    { data: '2026-10-19', contagem: 1, nivel: 0 },
    { data: '2026-10-20', contagem: 2, nivel: 1 },
  ]);
  assert.equal(grade.length, 3);
  assert.equal(grade[0], null);
  assert.equal(grade[1].data, '2026-10-19');
  assert.equal(grade[2].data, '2026-10-20');
});

test('alinhamento de lista vazia não cria preenchimento', () => {
  assert.deepEqual(alinharSemana([]), []);
});
