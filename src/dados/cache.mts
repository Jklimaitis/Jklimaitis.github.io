import type { Fonte } from './tipos.mts';

export type Armazenamento = {
  getItem(chave: string): string | null;
  setItem(chave: string, valor: string): void;
};

export const VERSAO_FORMATO = 1;
export const TTL_MS = 1_800_000;

export function chaveCache(fonte: Fonte, usuario: string): string {
  return `portfolio:github:v${VERSAO_FORMATO}:${usuario}:${fonte}`;
}

export function lerCache<T>(
  armazenamento: Armazenamento,
  chave: string,
  agora: number,
  ttl: number = TTL_MS,
):
  | { estado: 'valido'; dados: T }
  | { estado: 'ausente' | 'vencido' | 'corrompido' } {
  let bruto: string | null;
  try {
    bruto = armazenamento.getItem(chave);
  } catch {
    return { estado: 'ausente' };
  }
  if (bruto === null) return { estado: 'ausente' };
  let lido: unknown;
  try {
    lido = JSON.parse(bruto);
  } catch {
    return { estado: 'corrompido' };
  }
  if (typeof lido !== 'object' || lido === null)
    return { estado: 'corrompido' };
  const { gravadoEm, dados } = lido as { gravadoEm?: unknown; dados?: unknown };
  if (typeof gravadoEm !== 'number' || !Number.isFinite(gravadoEm))
    return { estado: 'corrompido' };
  if (dados === undefined) return { estado: 'corrompido' };
  if (agora - gravadoEm >= ttl) return { estado: 'vencido' };
  return { estado: 'valido', dados: dados as T };
}

export function gravarCache(
  armazenamento: Armazenamento,
  chave: string,
  dados: unknown,
  agora: number,
): void {
  try {
    armazenamento.setItem(chave, JSON.stringify({ gravadoEm: agora, dados }));
  } catch {
    /* armazenamento bloqueado: seguir sem cache */
  }
}
