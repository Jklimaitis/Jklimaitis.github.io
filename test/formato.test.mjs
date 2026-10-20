import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatarMesAno } from '../src/dados/formato.mts';

const PT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

test('mostra mês e ano com a data completa em datetime', () => {
  assert.deepEqual(formatarMesAno('2026-10-20T06:41:44Z', PT), {
    rotulo: 'out 2026',
    datetime: '2026-10-20',
  });
  assert.deepEqual(formatarMesAno('2026-09-14T19:55:10Z', EN), {
    rotulo: 'Sep 2026',
    datetime: '2026-09-14',
  });
});

test('não desloca o dia quando a hora UTC é madrugada', () => {
  assert.equal(
    formatarMesAno('2026-09-14T01:00:00Z', PT).datetime,
    '2026-09-14',
  );
});

test('devolve nulo para valor ausente ou inválido', () => {
  for (const entrada of [null, '', 'lixo', '2026-13-01', '2026-00-10', '2026-02-30']) {
    assert.equal(formatarMesAno(entrada, PT), null);
  }
});

test('devolve nulo quando a abreviação do mês não existe no dicionário', () => {
  const comBuraco = [...PT];
  comBuraco[9] = '';
  assert.equal(formatarMesAno('2026-10-20T06:41:44Z', comBuraco), null);
});
