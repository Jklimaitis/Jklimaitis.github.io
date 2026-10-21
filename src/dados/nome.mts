/**
 * Geometria, arranjo do nome e pintura da arte da abertura.
 *
 * A máscara é a fonte: `#` é célula de letra, `.` é célula de fundo. O nome é
 * escrito em uma linha quando cabe e em duas quando a célula ficaria ilegível.
 *
 * A pintura segue o original: uma rampa de tons do destaque, usada tanto nas
 * letras quanto no fundo, e células de fundo que **acendem e apagam sozinhas**
 * em vez de ficarem paradas num cinza. Tudo vem de sorteio determinístico — a
 * mesma semente produz sempre a mesma arte.
 */

export const GLIFOS: Record<string, string[]> = {
  J: ['...##', '....#', '....#', '....#', '#...#', '#...#', '.###.'],
  O: ['.###.', '#...#', '#...#', '#...#', '#...#', '#...#', '.###.'],
  N: ['#...#', '##..#', '#.#.#', '#..##', '#...#', '#...#', '#...#'],
  A: ['.###.', '#...#', '#...#', '#####', '#...#', '#...#', '#...#'],
  S: ['.####', '#....', '#....', '.###.', '....#', '....#', '####.'],
  K: ['#...#', '#..#.', '#.#..', '##...', '#.#..', '#..#.', '#...#'],
  L: ['#....', '#....', '#....', '#....', '#....', '#....', '#####'],
  I: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '#####'],
  M: ['#...#', '##.##', '#.#.#', '#.#.#', '#...#', '#...#', '#...#'],
  T: ['#####', '..#..', '..#..', '..#..', '..#..', '..#..', '..#..'],
  ' ': ['...', '...', '...', '...', '...', '...', '...'],
};

/**
 * Uma célula pintada.
 *
 * `tom` é o degrau na rampa do destaque: 0 é apagada, 3 é o destaque pleno.
 * Letras usam 2 ou 3; fundo usa 1 ou 2. `pisca` marca as células de fundo que
 * acendem e apagam; `fase` é o deslocamento do ciclo, em milissegundos.
 */
export type Celula = {
  letra: boolean;
  tom: 0 | 1 | 2 | 3;
  pisca: boolean;
  fase: number;
};

export type Arranjo = {
  /** Texto efetivo, com `\n` quando o nome vai em duas linhas. */
  texto: string;
  colunas: number;
  /** Linhas da grade, já com o preenchimento que ocupa a caixa. */
  linhas: number;
  celula: number;
  intervalo: number;
};

/** Ciclo do acende-e-apaga, em milissegundos. */
export const CICLO_CINTILA = 3400;

const ALTURA_GLIFO = 7;
const MARGEM_COLUNAS = 2;
const MARGEM_LINHAS = 2;
const RAZAO_INTERVALO = 0.2;
/** Abaixo desta célula, uma linha só deixa de ser legível e o nome quebra. */
const CELULA_MINIMA = 6;
/** Teto de linhas da grade: o original tem 20, e é o que dá a proporção dele. */
const MAXIMO_LINHAS = 20;
/** Fração do fundo que cintila. Em 0,34 o campo ficava denso demais. */
const FRACAO_CINTILA = 0.2;
/**
 * Perto do nome o campo fica mais quieto, para não competir com a leitura.
 * A distância só reduz a atividade: nunca acende nem clareia célula alguma —
 * é o que separa este ajuste do halo que desenhava contorno em volta das letras.
 */
const CALMA_POR_DISTANCIA: { limite: number; fator: number }[] = [
  { limite: 1, fator: 0.15 },
  { limite: 2, fator: 0.35 },
  { limite: 3, fator: 0.7 },
];
/** Fração das letras que recebe o degrau mais baixo da rampa. */
const FRACAO_LETRA_ESCURA = 0.18;

/** Gerador linear congruente: mesma semente, sempre a mesma arte. */
function gerador(semente: number): () => number {
  let estado = semente >>> 0;
  return () => {
    estado = (estado * 1664525 + 1013904223) >>> 0;
    return estado / 4294967296;
  };
}

/** Uma linha de texto: glifos lado a lado com 1 coluna de intervalo. */
function desenharLinha(texto: string): string[] {
  const linhas = Array.from({ length: ALTURA_GLIFO }, () => '');

  [...texto].forEach((caractere, indice) => {
    const glifo = GLIFOS[caractere];
    if (!glifo) throw new Error(`caractere sem glifo: ${caractere}`);

    for (let linha = 0; linha < ALTURA_GLIFO; linha += 1) {
      linhas[linha] += (indice > 0 ? '.' : '') + glifo[linha];
    }
  });

  return linhas;
}

/** Largura ocupada por um bloco de linhas de texto, sem as margens. */
function larguraDoBloco(bloco: string[]): number {
  return bloco[0].length;
}

/**
 * Monta a máscara do texto. Cada linha é centralizada pela tinta — a primeira
 * e a última coluna com `#` —, não pela caixa do glifo: sem isso, uma linha que
 * começa por `J`, com duas colunas vazias, desloca em relação a uma que começa
 * por `K`. O resultado tem as margens de 2 colunas e 2 linhas.
 */
export function desenharNome(texto: string): string[] {
  const blocos = texto.split('\n').map((linha) => desenharLinha(linha));
  const larguraMaxima = Math.max(...blocos.map(larguraDoBloco));

  const tinta = (bloco: string[]) => {
    const colunas = bloco
      .flatMap((linha) => [...linha].map((c, i) => (c === '#' ? i : -1)))
      .filter((i) => i >= 0);
    if (colunas.length === 0) return { inicio: 0, fim: 0 };
    return { inicio: Math.min(...colunas), fim: Math.max(...colunas) };
  };

  const corpo: string[] = [];

  blocos.forEach((bloco, indice) => {
    if (indice > 0) corpo.push('.'.repeat(larguraMaxima));

    const { inicio, fim } = tinta(bloco);
    const deslocamento = Math.max(
      0,
      Math.round((larguraMaxima - (fim - inicio + 1)) / 2) - inicio,
    );

    for (const linha of bloco) {
      const preenchida = '.'.repeat(deslocamento) + linha;
      corpo.push(preenchida + '.'.repeat(larguraMaxima - preenchida.length));
    }
  });

  const largura = larguraMaxima + MARGEM_COLUNAS * 2;
  const vazio = '.'.repeat(largura);
  const lateral = '.'.repeat(MARGEM_COLUNAS);

  return [
    ...Array.from({ length: MARGEM_LINHAS }, () => vazio),
    ...corpo.map((linha) => lateral + linha + lateral),
    ...Array.from({ length: MARGEM_LINHAS }, () => vazio),
  ];
}

/** Completa a máscara com linhas de fundo até `linhasGrade`, centralizando. */
export function preencherLinhas(
  mascara: string[],
  linhasGrade: number,
): string[] {
  if (linhasGrade <= mascara.length) return mascara;

  const sobra = linhasGrade - mascara.length;
  const acima = Math.floor(sobra / 2);
  const abaixo = sobra - acima;
  const vazio = '.'.repeat(mascara[0].length);

  return [
    ...Array.from({ length: acima }, () => vazio),
    ...mascara,
    ...Array.from({ length: abaixo }, () => vazio),
  ];
}

/** Quantas linhas de grade são necessárias para um texto, com as margens. */
export function linhasDoTexto(texto: string): number {
  return desenharNome(texto).length;
}

/**
 * Escolhe o arranjo do nome para uma caixa. Uma linha quando a célula resultante
 * alcança o mínimo legível; duas quando não alcança. Depois calcula quantas
 * linhas de grade cabem em `alturaMaxima`, com teto de 20 linhas — o mesmo do
 * original. O arranjo devolve a altura real da grade; quem chama usa essa altura
 * para o cartão, e assim não sobra vazio em cima nem embaixo do nome.
 */
export function escolherArranjo(
  largura: number,
  alturaMaxima: number,
  razaoIntervalo = RAZAO_INTERVALO,
): Arranjo {
  const larguraDe = (texto: string) => desenharNome(texto)[0].length;

  const candidatos = ['JONAS KLIMAITIS', 'JONAS\nKLIMAITIS']
    .map((texto) => {
      const colunas = larguraDe(texto);
      const unidades = colunas + (colunas - 1) * razaoIntervalo;
      return { texto, colunas, celula: largura / unidades };
    })
    .filter((c) => c.celula >= CELULA_MINIMA);

  const escolhido = candidatos[0] ?? {
    texto: 'JONAS\nKLIMAITIS',
    colunas: larguraDe('JONAS\nKLIMAITIS'),
    celula:
      largura /
      (larguraDe('JONAS\nKLIMAITIS') +
        (larguraDe('JONAS\nKLIMAITIS') - 1) * razaoIntervalo),
  };

  const minimas = linhasDoTexto(escolhido.texto);
  const celulaPorAltura =
    alturaMaxima / (minimas + (minimas - 1) * razaoIntervalo);

  // Quem manda é a largura, desde que a célula caiba na altura máxima.
  if (escolhido.celula <= celulaPorAltura) {
    const cabem = Math.floor(
      (alturaMaxima / escolhido.celula + razaoIntervalo) / (1 + razaoIntervalo),
    );
    return {
      texto: escolhido.texto,
      colunas: escolhido.colunas,
      linhas: Math.max(minimas, Math.min(MAXIMO_LINHAS, cabem)),
      celula: escolhido.celula,
      intervalo: escolhido.celula * razaoIntervalo,
    };
  }

  return {
    texto: escolhido.texto,
    colunas: escolhido.colunas,
    linhas: Math.min(MAXIMO_LINHAS, minimas),
    celula: celulaPorAltura,
    intervalo: celulaPorAltura * razaoIntervalo,
  };
}

/**
 * Pinta as células: letras com dois degraus da rampa e fundo com células que
 * cintilam, mais as apagadas. Consome um sorteio por célula, inclusive nas de
 * letra, para o padrão do fundo não depender de onde as letras estão.
 */
export function pintar(mascara: string[], semente = 20261021): Celula[] {
  const sortear = gerador(semente);
  const pintura: Celula[] = [];

  const letras: Array<[number, number]> = [];
  mascara.forEach((linha, r) => {
    [...linha].forEach((c, col) => {
      if (c === '#') letras.push([r, col]);
    });
  });

  mascara.forEach((linha, r) => {
    [...linha].forEach((caractere, col) => {
      const letra = caractere === '#';
      const valor = sortear();
      const fase = Math.round(sortear() * CICLO_CINTILA);

      if (letra) {
        pintura.push({
          letra: true,
          tom: valor > FRACAO_LETRA_ESCURA ? 3 : 2,
          pisca: false,
          fase: 0,
        });
        return;
      }

      const distancia = letras.reduce(
        (menor, [lr, lc]) =>
          Math.min(menor, Math.abs(r - lr) + Math.abs(col - lc)),
        Number.POSITIVE_INFINITY,
      );

      const calma =
        CALMA_POR_DISTANCIA.find((faixa) => distancia <= faixa.limite)?.fator ??
        1;

      const cintila = valor < FRACAO_CINTILA * calma;
      pintura.push({
        letra: false,
        tom: cintila ? (valor < FRACAO_CINTILA * calma * 0.35 ? 2 : 1) : 0,
        pisca: cintila,
        fase: cintila ? fase : 0,
      });
    });
  });

  return pintura;
}

/**
 * Brilho de uma célula que cintila, de 0 a 1, no instante `agora`. Cada célula
 * tem a sua fase, então elas não acendem em sincronia.
 */
export function brilhoDoCintilo(
  fase: number,
  agora: number,
  ciclo = CICLO_CINTILA,
): number {
  const volta = ((agora + fase) % ciclo) / ciclo;
  return 0.5 + 0.5 * Math.cos(volta * Math.PI * 2);
}

/**
 * Brilho de uma célula sob a onda de um clique: máximo quando a distância
 * iguala o raio do anel naquele instante, zero além da largura do anel.
 */
export function brilhoDaOnda(
  distancia: number,
  idadeMs: number,
  passo = 45,
  largura = 2.2,
): number {
  const anel = idadeMs / passo;
  const brilho = 1 - Math.abs(distancia - anel) / largura;

  if (brilho < 0) return 0;
  if (brilho > 1) return 1;
  return brilho;
}

/** Brilho de uma célula sob o holofote: 1 no centro, 0 a partir do raio. */
export function brilhoDoHolofote(distancia: number, raio = 5.2): number {
  if (distancia >= raio) return 0;
  return (1 - distancia / raio) ** 2;
}
