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
