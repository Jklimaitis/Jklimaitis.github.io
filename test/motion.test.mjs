import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  deslocamentoDoPonteiro,
  seloDeDiferenca,
} from '../src/dados/motion.mts';

const caixa = { left: 100, top: 50, width: 200, height: 100 };

test('deslocamento devolve porcentagem relativa ao retângulo', () => {
  assert.deepEqual(deslocamentoDoPonteiro(100, 50, caixa), { x: 0, y: 0 });
  assert.deepEqual(deslocamentoDoPonteiro(200, 100, caixa), { x: 50, y: 50 });
  assert.deepEqual(deslocamentoDoPonteiro(300, 150, caixa), { x: 100, y: 100 });
});

test('deslocamento fora do retângulo é limitado entre 0 e 100', () => {
  assert.deepEqual(deslocamentoDoPonteiro(0, 0, caixa), { x: 0, y: 0 });
  assert.deepEqual(deslocamentoDoPonteiro(999, 999, caixa), { x: 100, y: 100 });
});

test('retângulo sem dimensão devolve zero em vez de dividir por zero', () => {
  const vazio = { left: 0, top: 0, width: 0, height: 0 };
  assert.deepEqual(deslocamentoDoPonteiro(10, 10, vazio), { x: 0, y: 0 });
});

test('selo aparece só quando o total cresce', () => {
  assert.equal(seloDeDiferenca(230, 224), 6);
  assert.equal(seloDeDiferenca(224, 224), null);
  assert.equal(seloDeDiferenca(200, 224), null);
});

test('selo não aparece sem referência anterior', () => {
  assert.equal(seloDeDiferenca(224, null), null);
  assert.equal(seloDeDiferenca(224, undefined), null);
});

test('selo ignora referência inválida', () => {
  assert.equal(seloDeDiferenca(224, Number.NaN), null);
  assert.equal(seloDeDiferenca(224, -1), null);
});
