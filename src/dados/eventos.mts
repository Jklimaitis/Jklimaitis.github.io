import type { Resultado } from './tipos.mts';

export const LIMITE_EVENTOS = 8;

export type Evento = {
  tipo: 'push' | 'criou';
  repositorio: string;
  quando: string;
};

const TIPOS: Record<string, Evento['tipo']> = {
  PushEvent: 'push',
  CreateEvent: 'criou',
};

/**
 * Seleciona os eventos próprios que a barra pode exibir.
 * Item inválido é descartado; a lista só é recusada quando o corpo não é lista.
 */
export function selecionarEventos(
  json: unknown,
  opcoes: { limite?: number; usuario?: string } = {},
): Resultado<Evento[]> {
  if (!Array.isArray(json)) return { ok: false, motivo: 'resposta-invalida' };

  const usuario = opcoes.usuario ?? 'Jklimaitis';
  const limite = opcoes.limite ?? LIMITE_EVENTOS;
  const eventos: Evento[] = [];

  for (const bruto of json) {
    if (typeof bruto !== 'object' || bruto === null) continue;

    const item = bruto as {
      type?: unknown;
      repo?: { name?: unknown };
      created_at?: unknown;
    };

    if (typeof item.type !== 'string') continue;
    const tipo = TIPOS[item.type];
    if (!tipo) continue;

    const nome = item.repo?.name;
    if (typeof nome !== 'string') continue;
    if (!nome.startsWith(`${usuario}/`)) continue;
    if (nome === `${usuario}/${usuario}`) continue;

    if (typeof item.created_at !== 'string') continue;
    if (!/^\d{4}-\d{2}-\d{2}T/.test(item.created_at)) continue;

    eventos.push({
      tipo,
      repositorio: nome.slice(usuario.length + 1),
      quando: item.created_at,
    });
  }

  return { ok: true, dados: eventos.slice(0, limite) };
}
