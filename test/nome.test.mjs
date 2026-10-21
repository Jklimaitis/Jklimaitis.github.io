import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  GLIFOS,
  CICLO_CINTILA,
  desenharNome,
  preencherLinhas,
  escolherArranjo,
  pintar,
  brilhoDoCintilo,
  brilhoDaOnda,
  brilhoDoHolofote,
} from '../src/dados/nome.mts';

const UMA_LINHA = desenharNome('JONAS KLIMAITIS');
const GRADE = preencherLinhas(UMA_LINHA, 20);
const DUAS_LINHAS = desenharNome('JONAS\nKLIMAITIS');

const contar = (mascara) =>
  mascara
    .join('')
    .split('')
    .filter((c) => c === '#').length;

test('uma linha mede 91 colunas por 11 linhas; duas medem 57 por 19', () => {
  assert.equal(UMA_LINHA.length, 11);
  for (const linha of UMA_LINHA) assert.equal(linha.length, 91);

  assert.equal(DUAS_LINHAS.length, 19);
  for (const linha of DUAS_LINHAS) assert.equal(linha.length, 57);
});

test('as duas formas têm as mesmas 210 células de letra', () => {
  assert.equal(contar(UMA_LINHA), 210);
  assert.equal(contar(DUAS_LINHAS), 210);
});

test('na forma de duas linhas, a linha curta é centralizada pela tinta', () => {
  const faixa = (inicio) =>
    DUAS_LINHAS.slice(inicio, inicio + 7)
      .map((linha) => ({
        min: linha.indexOf('#'),
        max: linha.lastIndexOf('#'),
      }))
      .filter((marca) => marca.min >= 0);

  const centro = (inicio) => {
    const marcas = faixa(inicio);
    const min = Math.min(...marcas.map((m) => m.min));
    const max = Math.max(...marcas.map((m) => m.max));
    return (min + max) / 2;
  };

  assert.ok(Math.abs(centro(2) - centro(10)) <= 1.5);
});

test('todo glifo tem 7 linhas e 5 colunas, e o espaço tem 3 colunas', () => {
  for (const [letra, glifo] of Object.entries(GLIFOS)) {
    assert.equal(glifo.length, 7, `linhas de "${letra}"`);
    for (const linha of glifo) {
      assert.equal(
        linha.length,
        letra === ' ' ? 3 : 5,
        `colunas de "${letra}"`,
      );
    }
  }
});

test('caractere fora da tabela lança em vez de virar espaço', () => {
  assert.throws(() => desenharNome('JONAS X'), /X/);
  assert.throws(() => desenharNome('jonas'), /j/);
});

test('preencherLinhas completa a grade sem mexer no texto', () => {
  const comTrinta = preencherLinhas(UMA_LINHA, 30);

  assert.equal(comTrinta.length, 30);
  for (const linha of comTrinta) assert.equal(linha.length, 91);
  assert.equal(contar(comTrinta), contar(UMA_LINHA));
  assert.equal(preencherLinhas(UMA_LINHA, 3).length, UMA_LINHA.length);
});

test('o arranjo é uma linha quando cabe e duas quando a célula fica pequena', () => {
  const largo = escolherArranjo(1214, 300);
  assert.equal(largo.texto, 'JONAS KLIMAITIS');
  assert.equal(largo.colunas, 91);
  assert.ok(largo.celula > 10, `celula ${largo.celula}`);

  assert.equal(largo.linhas, 20, 'teto de linhas do original');

  const alturaGrade =
    largo.linhas * largo.celula + (largo.linhas - 1) * largo.intervalo;
  assert.ok(Math.abs(alturaGrade - 265) < 6, `altura ${alturaGrade}`);

  const estreito = escolherArranjo(324, 144);
  assert.equal(estreito.texto, 'JONAS\nKLIMAITIS');
  assert.equal(estreito.colunas, 57);
  assert.ok(estreito.celula > 0 && estreito.celula < largo.celula);
});

test('as letras usam dois degraus da rampa, nunca o tom apagado', () => {
  const pintura = pintar(UMA_LINHA);
  const letras = pintura.filter((c) => c.letra);
  const tons = new Set(letras.map((c) => c.tom));

  assert.equal(letras.length, 210);
  assert.deepEqual([...tons].sort(), [2, 3]);
  assert.equal(letras.filter((c) => c.pisca).length, 0);
  assert.equal(pintura.filter((c) => !c.letra && c.tom === 3).length, 0);
});

test('o fundo tem células que cintilam, e só elas ficam acesas', () => {
  const pintura = pintar(GRADE);
  const fundo = pintura.filter((c) => !c.letra);
  const cintilam = fundo.filter((c) => c.pisca);

  assert.ok(
    cintilam.length > fundo.length * 0.08 &&
      cintilam.length < fundo.length * 0.3,
    `${cintilam.length} de ${fundo.length}`,
  );
  // célula apagada não cintila nem tem tom
  assert.equal(fundo.filter((c) => !c.pisca && c.tom !== 0).length, 0);
  // mesma semente, mesmo padrão
  assert.deepEqual(pintar(GRADE), pintura);
});

test('perto do nome o fundo é mais quieto, e a distância nunca acende célula', () => {
  const semLetras = GRADE.map((linha) => '.'.repeat(linha.length));
  const com = pintar(GRADE, 7);
  const sem = pintar(semLetras, 7);

  // monotonicidade: a distância só pode apagar. Se alguma célula cintila perto
  // do nome e não cintilaria sem as letras, a distância acendeu — halo de volta.
  const acesasPelaDistancia = com.filter(
    (celula, i) => !celula.letra && celula.pisca && !sem[i].pisca,
  );
  assert.equal(acesasPelaDistancia.length, 0, 'a distância acendeu célula');

  // densidade cai perto do nome
  const colunas = GRADE[0].length;
  const letras = [];
  GRADE.forEach((linha, r) =>
    [...linha].forEach((c, col) => {
      if (c === '#') letras.push([r, col]);
    }),
  );

  const distancia = (i) => {
    const r = Math.floor(i / colunas);
    const col = i % colunas;
    return letras.reduce(
      (menor, [lr, lc]) =>
        Math.min(menor, Math.abs(r - lr) + Math.abs(col - lc)),
      Number.POSITIVE_INFINITY,
    );
  };

  const fundo = com
    .map((celula, i) => ({ celula, d: distancia(i) }))
    .filter(({ celula }) => !celula.letra);

  const perto = fundo.filter(({ d }) => d <= 2);
  const longe = fundo.filter(({ d }) => d >= 6);
  const densidade = (grupo) =>
    grupo.filter(({ celula }) => celula.pisca).length / grupo.length;

  assert.ok(perto.length > 100 && longe.length > 100);
  assert.ok(
    densidade(perto) < densidade(longe) * 0.6,
    `perto ${densidade(perto).toFixed(3)} vs longe ${densidade(longe).toFixed(3)}`,
  );
});

test('brilhoDoCintilo vai de 0 a 1 e é periódico', () => {
  assert.ok(Math.abs(brilhoDoCintilo(0, 0) - 1) < 1e-9);

  const meio = brilhoDoCintilo(0, CICLO_CINTILA / 2);
  assert.ok(Math.abs(meio) < 1e-9, `meio ${meio}`);

  assert.ok(
    Math.abs(brilhoDoCintilo(0, 0) - brilhoDoCintilo(0, CICLO_CINTILA)) < 1e-9,
  );

  for (let t = 0; t < CICLO_CINTILA; t += 100) {
    const brilho = brilhoDoCintilo(0, t);
    assert.ok(brilho >= 0 && brilho <= 1, `fora de faixa em ${t}`);
  }
});

test('brilhoDaOnda tem pico no anel e zera fora da largura', () => {
  assert.ok(Math.abs(brilhoDaOnda(10, 450) - 1) < 1e-9);
  assert.ok(brilhoDaOnda(10 + 2.2, 450) < 1e-9);
  assert.ok(brilhoDaOnda(10 - 2.2, 450) < 1e-9);
  assert.ok(brilhoDaOnda(10.5, 450) > 0 && brilhoDaOnda(10.5, 450) < 1);

  for (let distancia = 0; distancia < 40; distancia += 0.25) {
    const brilho = brilhoDaOnda(distancia, 900);
    assert.ok(brilho >= 0 && brilho <= 1, `fora de faixa em ${distancia}`);
  }
});

test('brilhoDoHolofote cai do centro ao raio', () => {
  assert.equal(brilhoDoHolofote(0), 1);
  assert.equal(brilhoDoHolofote(5.2), 0);
  assert.equal(brilhoDoHolofote(9), 0);

  const perto = brilhoDoHolofote(1);
  const longe = brilhoDoHolofote(3);
  assert.ok(perto > longe && longe > 0);
});
