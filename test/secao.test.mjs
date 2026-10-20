import { test } from 'node:test';
import assert from 'node:assert/strict';
import { carregarSecao } from '../src/dados/secao.mts';

const perfis = {
  'https://api.github.com/users/Jklimaitis': {
    public_repos: 8,
    html_url: 'https://github.com/Jklimaitis',
  },
};

const repos = [
  {
    name: 'pimp-my-commander',
    html_url: 'https://github.com/Jklimaitis/pimp-my-commander',
    description: 'analisador',
    language: 'Python',
    stargazers_count: 0,
    pushed_at: '2026-10-20T06:41:44Z',
    fork: false,
    archived: false,
  },
];

const calendario = {
  contributions: [
    { date: '2026-10-19', count: 1, level: 0 },
    { date: '2026-10-20', count: 2, level: 1 },
  ],
};

const mapa = () => {
  const itens = new Map();
  return {
    getItem: (c) => (itens.has(c) ? itens.get(c) : null),
    setItem: (c, v) => itens.set(c, v),
    itens,
  };
};

const buscarFalso = (registro) => async (url) => {
  registro.push(url);
  const corpo = url.includes('/repos')
    ? repos
    : url.includes('api.github.com/users')
      ? perfis[url]
      : calendario;
  return {
    ok: true,
    status: 200,
    headers: { get: () => null },
    json: async () => corpo,
  };
};

test('sem cache faz três consultas e devolve tudo calculado', async () => {
  const registro = [];
  const r = await carregarSecao({
    buscar: buscarFalso(registro),
    armazenamento: mapa(),
    agora: () => 0,
  });
  assert.equal(registro.length, 3);
  assert.equal(r.perfil.dados.repositoriosPublicos, 8);
  assert.equal(r.repositorios.dados.itens.length, 1);
  assert.equal(r.calendario.dados.length, 2);
  assert.equal(r.indicadores.total, 3);
  assert.equal(r.indicadores.sequenciaAtual, 2);
});

test('cache válido evita consultas e devolve os mesmos dados', async () => {
  const armazenamento = mapa();
  let relogio = 0;
  const primeiro = await carregarSecao({
    buscar: buscarFalso([]),
    armazenamento,
    agora: () => relogio,
  });
  const registro = [];
  relogio = 60_000;
  const segundo = await carregarSecao({
    buscar: buscarFalso(registro),
    armazenamento,
    agora: () => relogio,
  });
  assert.equal(registro.length, 0);
  assert.deepEqual(segundo.calendario.dados, primeiro.calendario.dados);
});

test('cache vencido consulta só a fonte vencida', async () => {
  const armazenamento = mapa();
  await carregarSecao({
    buscar: buscarFalso([]),
    armazenamento,
    agora: () => 1_700_000,
  });
  armazenamento.setItem(
    'portfolio:github:v1:Jklimaitis:calendario',
    JSON.stringify({ gravadoEm: 0, dados: [] }),
  );
  const registro = [];
  const r = await carregarSecao({
    buscar: buscarFalso(registro),
    armazenamento,
    agora: () => 1_900_000,
  });
  assert.equal(registro.length, 1);
  assert.match(registro[0], /contributions/);
  assert.equal(r.calendario.ok, true);
});

test('falha do calendário preserva perfil e repositórios', async () => {
  const buscar = async (url) => {
    if (url.includes('contributions')) {
      return {
        ok: false,
        status: 500,
        headers: { get: () => null },
        json: async () => ({}),
      };
    }
    return buscarFalso([])(url);
  };
  const r = await carregarSecao({
    buscar,
    armazenamento: mapa(),
    agora: () => 0,
  });
  assert.equal(r.perfil.ok, true);
  assert.equal(r.repositorios.ok, true);
  assert.equal(r.calendario.ok, false);
  assert.equal(r.calendario.motivo, 'rede');
  assert.equal(r.indicadores, null);
});

test('lista incompleta não vai para o cache', async () => {
  const armazenamento = mapa();
  const buscar = async (url) => {
    if (url.includes('/repos')) {
      return {
        ok: true,
        status: 200,
        headers: {
          get: () =>
            '<https://api.github.com/users/Jklimaitis/repos?page=2>; rel="next"',
        },
        json: async () => repos,
      };
    }
    return buscarFalso([])(url);
  };
  const r = await carregarSecao({
    buscar,
    armazenamento,
    agora: () => 0,
    usuario: 'Jklimaitis',
  });
  assert.equal(r.repositorios.dados.incompleto, true);
  assert.equal(
    armazenamento.itens.has('portfolio:github:v1:Jklimaitis:repositorios'),
    false,
  );
});

test('armazenamento bloqueado não impede a seção de carregar', async () => {
  const bloqueado = {
    getItem() {
      throw new Error('SecurityError');
    },
    setItem() {
      throw new Error('QuotaExceededError');
    },
  };
  const r = await carregarSecao({
    buscar: buscarFalso([]),
    armazenamento: bloqueado,
    agora: () => 0,
  });
  assert.equal(r.perfil.ok, true);
  assert.equal(r.indicadores.total, 3);
});
