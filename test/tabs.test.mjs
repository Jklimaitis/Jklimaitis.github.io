import { test } from 'node:test';
import assert from 'node:assert/strict';
import { indiceDaTecla } from '../src/dados/tabs.mts';

test('seta para baixo avança e volta ao início no último', () => {
  assert.equal(indiceDaTecla(0, 4, 'ArrowDown'), 1);
  assert.equal(indiceDaTecla(3, 4, 'ArrowDown'), 0);
});

test('seta para cima retrocede e vai ao último no primeiro', () => {
  assert.equal(indiceDaTecla(2, 4, 'ArrowUp'), 1);
  assert.equal(indiceDaTecla(0, 4, 'ArrowUp'), 3);
});

test('setas horizontais funcionam como as verticais', () => {
  assert.equal(indiceDaTecla(0, 4, 'ArrowRight'), 1);
  assert.equal(indiceDaTecla(0, 4, 'ArrowLeft'), 3);
});

test('Home vai ao primeiro e End ao último', () => {
  assert.equal(indiceDaTecla(2, 4, 'Home'), 0);
  assert.equal(indiceDaTecla(1, 4, 'End'), 3);
});

test('tecla não tratada devolve nulo', () => {
  assert.equal(indiceDaTecla(1, 4, 'Enter'), null);
  assert.equal(indiceDaTecla(1, 4, 'a'), null);
});

test('lista de um item fica no índice zero', () => {
  assert.equal(indiceDaTecla(0, 1, 'ArrowDown'), 0);
  assert.equal(indiceDaTecla(0, 1, 'ArrowUp'), 0);
  assert.equal(indiceDaTecla(0, 0, 'ArrowDown'), null);
});
