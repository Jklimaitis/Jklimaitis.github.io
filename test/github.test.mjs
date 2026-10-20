import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validarPerfil, selecionarRepositorios } from '../src/dados/github.mts';

const repo = (nome, extra = {}) => ({
  name: nome,
  html_url: `https://github.com/Jklimaitis/${nome}`,
  description: null,
  language: null,
  stargazers_count: 0,
  pushed_at: '2026-09-09T04:18:14Z',
  fork: false,
  archived: false,
  ...extra,
});

test('lê repositórios públicos e link do perfil', () => {
  const r = validarPerfil({
    public_repos: 8,
    html_url: 'https://github.com/Jklimaitis',
  });
  assert.deepEqual(r, {
    ok: true,
    dados: {
      repositoriosPublicos: 8,
      urlPerfil: 'https://github.com/Jklimaitis',
    },
  });
});

test('recusa perfil com contagem inválida ou link fora do github.com', () => {
  for (const entrada of [
    { public_repos: '8', html_url: 'https://github.com/Jklimaitis' },
    { public_repos: -1, html_url: 'https://github.com/Jklimaitis' },
    { public_repos: 8, html_url: 'http://github.com/Jklimaitis' },
    { public_repos: 8, html_url: 'https://gitlab.com/Jklimaitis' },
  ]) {
    const r = validarPerfil(entrada);
    assert.equal(r.ok, false);
    assert.equal(r.motivo, 'resposta-invalida');
  }
});

test('exclui forks e arquivados e preenche os campos do cartão', () => {
  const r = selecionarRepositorios([
    repo('bom', {
      description: 'texto',
      language: 'Python',
      stargazers_count: 3,
    }),
    repo('forkado', { fork: true }),
    repo('parado', { archived: true }),
  ]);
  assert.equal(r.ok, true);
  assert.equal(r.dados.itens.length, 1);
  assert.deepEqual(r.dados.itens[0], {
    nome: 'bom',
    descricao: 'texto',
    linguagem: 'Python',
    estrelas: 3,
    ultimoEnvio: '2026-09-09T04:18:14Z',
    url: 'https://github.com/Jklimaitis/bom',
  });
});

test('ordena por pushed_at decrescente e desempata pelo nome', () => {
  const r = selecionarRepositorios([
    repo('antigo', { pushed_at: '2026-09-09T04:18:14Z' }),
    repo('B_recente', { pushed_at: '2026-10-20T06:41:44Z' }),
    repo('A_recente', { pushed_at: '2026-10-20T06:41:44Z' }),
  ]);
  assert.deepEqual(
    r.dados.itens.map((i) => i.nome),
    ['A_recente', 'B_recente', 'antigo'],
  );
});

test('repositório sem data vai para o fim sem data inventada', () => {
  const r = selecionarRepositorios([
    repo('sem-data', { pushed_at: null }),
    repo('com-data', { pushed_at: '2026-10-13T03:56:52Z' }),
  ]);
  assert.deepEqual(
    r.dados.itens.map((i) => [i.nome, i.ultimoEnvio]),
    [
      ['com-data', '2026-10-13T03:56:52Z'],
      ['sem-data', null],
    ],
  );
});

test('descarta item sem nome ou com link fora do github.com', () => {
  const r = selecionarRepositorios([
    repo('ok'),
    repo('sem-nome', { name: '' }),
    repo('outro-host', { html_url: 'https://gitlab.com/x/y' }),
    repo('estrelas-invalidas', { stargazers_count: '3' }),
  ]);
  assert.equal(r.ok, true);
  assert.deepEqual(
    r.dados.itens.map((i) => i.nome),
    ['ok'],
  );
});

test('limita a 10 e respeita limite explícito', () => {
  const muitos = Array.from({ length: 12 }, (_, i) =>
    repo(`r${String(i).padStart(2, '0')}`),
  );
  assert.equal(selecionarRepositorios(muitos).dados.itens.length, 10);
  assert.equal(
    selecionarRepositorios(muitos, { limite: 2 }).dados.itens.length,
    2,
  );
});

test('propaga a marca de resultado incompleto', () => {
  const r = selecionarRepositorios([repo('unico')], { incompleto: true });
  assert.equal(r.dados.incompleto, true);
  assert.equal(selecionarRepositorios([repo('unico')]).dados.incompleto, false);
});

test('recusa corpo que não é lista', () => {
  for (const entrada of [{}, null, 'x']) {
    const r = selecionarRepositorios(entrada);
    assert.equal(r.ok, false);
    assert.equal(r.motivo, 'resposta-invalida');
  }
});
