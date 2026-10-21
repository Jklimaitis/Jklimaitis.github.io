import { test } from 'node:test';
import assert from 'node:assert/strict';
import { selecionarEventos } from '../src/dados/eventos.mts';

const evento = (type, repo, createdAt = '2026-10-21T01:22:53Z') => ({
  type,
  repo: { name: repo },
  created_at: createdAt,
});

test('mantém push e criação de repositório próprio', () => {
  const r = selecionarEventos([
    evento('PushEvent', 'Jklimaitis/pimp-my-commander'),
    evento('CreateEvent', 'Jklimaitis/home-shopper'),
  ]);
  assert.equal(r.ok, true);
  assert.deepEqual(
    r.dados.map((e) => [e.tipo, e.repositorio]),
    [
      ['push', 'pimp-my-commander'],
      ['criou', 'home-shopper'],
    ],
  );
});

test('descarta eventos de repositório de terceiro', () => {
  const r = selecionarEventos([
    evento('WatchEvent', 'microsoft/vscode'),
    evento('PushEvent', 'pycodebr/whatsapp_ai_bot'),
    evento('PushEvent', 'Jklimaitis/Projeto_Carros'),
  ]);
  assert.deepEqual(
    r.dados.map((e) => e.repositorio),
    ['Projeto_Carros'],
  );
});

test('descarta tipos que não são push nem criação', () => {
  const r = selecionarEventos([
    evento('WatchEvent', 'Jklimaitis/Jklimaitis'),
    evento('IssuesEvent', 'Jklimaitis/Projeto_Carros'),
    evento('PullRequestEvent', 'Jklimaitis/Projeto_Carros'),
  ]);
  assert.deepEqual(r.dados, []);
});

test('descarta o repositório de README de perfil', () => {
  const r = selecionarEventos([
    evento('PushEvent', 'Jklimaitis/Jklimaitis'),
    evento('PushEvent', 'Jklimaitis/pimp-my-commander'),
  ]);
  assert.deepEqual(
    r.dados.map((e) => e.repositorio),
    ['pimp-my-commander'],
  );
});

test('limita a 8 itens e respeita limite explícito', () => {
  const muitos = Array.from({ length: 12 }, (_, i) =>
    evento('PushEvent', `Jklimaitis/r${i}`),
  );
  assert.equal(selecionarEventos(muitos).dados.length, 8);
  assert.equal(selecionarEventos(muitos, { limite: 3 }).dados.length, 3);
});

test('descarta item sem data válida sem derrubar a lista', () => {
  const r = selecionarEventos([
    evento('PushEvent', 'Jklimaitis/a', null),
    evento('PushEvent', 'Jklimaitis/b', 'lixo'),
    evento('PushEvent', 'Jklimaitis/c'),
  ]);
  assert.deepEqual(
    r.dados.map((e) => e.repositorio),
    ['c'],
  );
});

test('recusa corpo que não é lista', () => {
  for (const entrada of [{}, null, 'x']) {
    const r = selecionarEventos(entrada);
    assert.equal(r.ok, false);
    assert.equal(r.motivo, 'resposta-invalida');
  }
});

test('lista vazia é resultado válido', () => {
  const r = selecionarEventos([]);
  assert.equal(r.ok, true);
  assert.deepEqual(r.dados, []);
});
