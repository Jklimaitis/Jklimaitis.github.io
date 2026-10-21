import { beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { dadosDaSessao, esquecerSessao } from '../src/dados/sessao.mts';

const opcoes = {
  buscar: async () => ({}),
  armazenamento: { getItem: () => null, setItem: () => {} },
  agora: () => 0,
};

beforeEach(() => {
  esquecerSessao();
});

test('chama o carregador uma única vez', async () => {
  let chamadas = 0;
  const carregar = async () => {
    chamadas += 1;
    return { perfil: { ok: false, motivo: 'rede' } };
  };

  await dadosDaSessao(opcoes, carregar);
  await dadosDaSessao(opcoes, carregar);

  assert.equal(chamadas, 1);
});

test('as duas chamadas devolvem o mesmo resultado', async () => {
  const carregar = async () => ({ marcador: 42 });

  const a = await dadosDaSessao(opcoes, carregar);
  const b = await dadosDaSessao(opcoes, carregar);

  assert.equal(a, b);
});

test('depois de esquecer, a próxima chamada consulta de novo', async () => {
  let chamadas = 0;
  const carregar = async () => {
    chamadas += 1;
    return { marcador: chamadas };
  };

  await dadosDaSessao(opcoes, carregar);
  esquecerSessao();
  await dadosDaSessao(opcoes, carregar);

  assert.equal(chamadas, 2);
});
