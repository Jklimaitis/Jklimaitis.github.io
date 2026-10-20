import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  TTL_MS,
  chaveCache,
  gravarCache,
  lerCache,
} from '../src/dados/cache.mts';

const memoria = () => {
  const mapa = new Map();
  return {
    getItem: (c) => (mapa.has(c) ? mapa.get(c) : null),
    setItem: (c, v) => mapa.set(c, v),
    mapa,
  };
};

test('monta a chave com aplicação, versão, usuário e fonte, sem idioma', () => {
  assert.equal(
    chaveCache('calendario', 'Jklimaitis'),
    'portfolio:github:v1:Jklimaitis:calendario',
  );
});

test('chave ausente e cache corrompido são distinguidos', () => {
  const a = memoria();
  assert.deepEqual(lerCache(a, 'k', 0), { estado: 'ausente' });

  for (const lixo of ['nao-json', '"texto"', '{"dados":1}', 'null']) {
    a.setItem('k', lixo);
    assert.deepEqual(lerCache(a, 'k', 0), { estado: 'corrompido' });
  }
});

test('cache válido devolve dados e vence exatamente no TTL', () => {
  const a = memoria();
  gravarCache(a, 'k', { total: 224 }, 1000);

  const dentro = lerCache(a, 'k', 1000 + TTL_MS - 1);
  assert.equal(dentro.estado, 'valido');
  assert.deepEqual(dentro.dados, { total: 224 });

  assert.deepEqual(lerCache(a, 'k', 1000 + TTL_MS), { estado: 'vencido' });
});

test('armazenamento bloqueado não derruba a leitura nem a gravação', () => {
  const bloqueado = {
    getItem() {
      throw new Error('SecurityError');
    },
    setItem() {
      throw new Error('QuotaExceededError');
    },
  };
  assert.deepEqual(lerCache(bloqueado, 'k', 0), { estado: 'ausente' });
  assert.doesNotThrow(() => gravarCache(bloqueado, 'k', { a: 1 }, 0));
});

test('gravação usa a hora recebida e sobrevive à releitura', () => {
  const a = memoria();
  gravarCache(a, 'k', { ok: true }, 42);
  const guardado = JSON.parse(a.mapa.get('k'));
  assert.equal(guardado.gravadoEm, 42);
  assert.deepEqual(lerCache(a, 'k', 43).dados, { ok: true });
});