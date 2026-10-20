import type { Dia, Resultado } from './tipos.mts';

const PADRAO_DATA = /^(\d{4})-(\d{2})-(\d{2})$/;

function diaEmMs(valor: string): number | null {
  const partes = PADRAO_DATA.exec(valor);
  if (!partes) return null;

  const ano = Number(partes[1]);
  const mes = Number(partes[2]);
  const dia = Number(partes[3]);

  const data = new Date(Date.UTC(ano, mes - 1, dia));
  if (
    data.getUTCFullYear() !== ano ||
    data.getUTCMonth() !== mes - 1 ||
    data.getUTCDate() !== dia
  ) {
    return null;
  }

  return data.getTime();
}

const FALHA = { ok: false, motivo: 'resposta-invalida' } as const;

export function validarCalendario(json: unknown): Resultado<Dia[]> {
  if (typeof json !== 'object' || json === null) return FALHA;

  const lista = (json as { contributions?: unknown }).contributions;
  if (!Array.isArray(lista) || lista.length === 0) return FALHA;

  const dias: Dia[] = [];
  let anterior: number | null = null;

  for (const item of lista) {
    if (typeof item !== 'object' || item === null) return FALHA;

    const { date, count, level } = item as {
      date?: unknown;
      count?: unknown;
      level?: unknown;
    };

    if (typeof date !== 'string') return FALHA;
    const ms = diaEmMs(date);
    if (ms === null) return FALHA;

    if (typeof count !== 'number' || !Number.isInteger(count) || count < 0)
      return FALHA;
    if (
      typeof level !== 'number' ||
      !Number.isInteger(level) ||
      level < 0 ||
      level > 4
    )
      return FALHA;

    if (anterior !== null && ms - anterior !== 86_400_000) return FALHA;
    anterior = ms;

    dias.push({ data: date, contagem: count, nivel: level });
  }

  return { ok: true, dados: dias };
}

export type Indicadores = {
  total: number;
  diasAtivos: number;
  sequenciaAtual: number;
  maiorSequencia: number;
  melhorDia: Dia | null;
};

export function calcularIndicadores(dias: Dia[]): Indicadores {
  let total = 0;
  let diasAtivos = 0;
  let maiorSequencia = 0;
  let corrente = 0;
  let melhorDia: Dia | null = null;

  for (const dia of dias) {
    total += dia.contagem;

    if (dia.contagem > 0) {
      diasAtivos += 1;
      corrente += 1;
      if (corrente > maiorSequencia) maiorSequencia = corrente;
      if (melhorDia === null || dia.contagem >= melhorDia.contagem)
        melhorDia = dia;
    } else {
      corrente = 0;
    }
  }

  let sequenciaAtual = 0;
  let i = dias.length - 1;
  if (i >= 0 && dias[i].contagem === 0) i -= 1;
  while (i >= 0 && dias[i].contagem > 0) {
    sequenciaAtual += 1;
    i -= 1;
  }

  return {
    total,
    diasAtivos,
    sequenciaAtual,
    maiorSequencia,
    melhorDia,
  };
}
