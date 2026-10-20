import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buscarJson, buscarListaRepositorios } from '../src/dados/buscar.mts';

const resposta = (corpo, { status = 200, link = null } = {}) => ({
  ok: status >= 200 && status < 300,
  status,
  headers: { get: (nome) => (nome.toLowerCase() === 'link' ? link : null) },
  json: async () => {
    if (corpo instanceof Error) throw corpo;
    return corpo;
  },
});

test('devolve o JSON e o próximo endereço válido', () => {
  const link =
    '<https://api.github.com/users/Jklimaitis/repos?page=2>; rel="next"';
  return buscarJson('https://api.github.com/users/Jklimaitis/repos', {
    buscar: async () => resposta([{ name: 'x' }], { link }),
  }).then((r) => {
    assert.equal(r.ok, true);
    assert.deepEqual(r.json, [{ name: 'x' }]);
    assert.equal(
      r.proximaPagina,
      'https://api.github.com/users/Jklimaitis/repos?page=2',
    );
  });
});

test('ignora próximo endereço de outro host ou sem HTTPS', () => {
  const casos = [
    '<https://evil.com/x?page=2>; rel="next"',
    '<http://api.github.com/users/Jklimaitis/repos?page=2>; rel="next"',
    '<https://api.github.com/users/outro/repos?page=2>; rel="next"',
  ];
  return Promise.all(
    casos.map((link) =>
      buscarJson('https://api.github.com/users/Jklimaitis/repos', {
        buscar: async () => resposta([], { link }),
      }),
    ),
  ).then((resultados) => {
    for (const r of resultados) assert.equal(r.proximaPagina, null);
  });
});

test('classifica limite, erro de rede e corpo que não é JSON', () => {
  return Promise.all([
    buscarJson('u', { buscar: async () => resposta({}, { status: 403 }) }),
    buscarJson('u', { buscar: async () => resposta({}, { status: 429 }) }),
    buscarJson('u', { buscar: async () => resposta({}, { status: 500 }) }),
    buscarJson('u', {
      buscar: async () => {
        throw new Error('offline');
      },
    }),
    buscarJson('u', {
      buscar: async () => resposta(new SyntaxError('HTML')),
    }),
  ]).then(([a, b, c, d, e]) => {
    assert.equal(a.motivo, 'limite');
    assert.equal(b.motivo, 'limite');
    assert.equal(c.motivo, 'rede');
    assert.equal(d.motivo, 'rede');
    assert.equal(e.motivo, 'resposta-invalida');
  });
});

test('desiste depois do tempo limite quando o servidor não responde', () => {
  const buscar = (url, init) =>
    new Promise((resolve, reject) => {
      init.signal.addEventListener('abort', () =>
        reject(new Error('abortado')),
      );
    });
  return buscarJson('u', { buscar, tempoLimiteMs: 10 }).then((r) => {
    assert.equal(r.ok, false);
    assert.equal(r.motivo, 'tempo-esgotado');
  });
});

test('para no limite de páginas e marca a lista como incompleta', () => {
  const chamadas = [];
  const buscar = async (url) => {
    chamadas.push(url);
    const pagina = Number(new URL(url).searchParams.get('page') ?? 1);
    return resposta([{ name: `p${pagina}` }], {
      link: `<https://api.github.com/users/Jklimaitis/repos?page=${pagina + 1}>; rel="next"`,
    });
  };
  return buscarListaRepositorios({ buscar }).then((r) => {
    assert.equal(r.ok, true);
    assert.equal(r.dados.itens.length, 3);
    assert.equal(r.dados.incompleto, true);
    assert.equal(chamadas.length, 3);
  });
});

test('lista completa em uma página não fica incompleta', () => {
  return buscarListaRepositorios({
    buscar: async () => resposta([{ name: 'a' }, { name: 'b' }]),
  }).then((r) => {
    assert.equal(r.dados.itens.length, 2);
    assert.equal(r.dados.incompleto, false);
  });
});

test('falha na primeira página derruba a lista; na segunda, só a marca', () => {
  const primeiraFalha = async () => resposta({}, { status: 500 });
  const segundaFalha = async (url) => {
    const pagina = Number(new URL(url).searchParams.get('page') ?? 1);
    if (pagina === 1) {
      return resposta([{ name: 'a' }], {
        link: '<https://api.github.com/users/Jklimaitis/repos?page=2>; rel="next"',
      });
    }
    return resposta({}, { status: 500 });
  };
  return Promise.all([
    buscarListaRepositorios({ buscar: primeiraFalha }),
    buscarListaRepositorios({ buscar: segundaFalha }),
  ]).then(([a, b]) => {
    assert.equal(a.ok, false);
    assert.equal(a.motivo, 'rede');
    assert.equal(b.ok, true);
    assert.equal(b.dados.itens.length, 1);
    assert.equal(b.dados.incompleto, true);
  });
});
