import type { Motivo, Resultado } from './tipos.mts';

export const TEMPO_LIMITE_MS = 10_000;
export const MAX_PAGINAS = 3;

export const FONTES = {
  perfil: 'https://api.github.com/users/Jklimaitis',
  repositorios:
    'https://api.github.com/users/Jklimaitis/repos?type=owner&sort=pushed&direction=desc&per_page=100',
  calendario:
    'https://github-contributions-api.jogruber.de/v4/Jklimaitis?y=last',
  eventos: 'https://api.github.com/users/Jklimaitis/events/public?per_page=30',
} as const;

export type Resposta =
  | { ok: true; json: unknown; proximaPagina: string | null }
  | { ok: false; motivo: Motivo };

function proximaPaginaValida(link: string | null): string | null {
  if (!link) return null;
  for (const parte of link.split(',')) {
    const m = /<([^>]+)>\s*;\s*rel="next"/.exec(parte.trim());
    if (!m) continue;
    try {
      const u = new URL(m[1]);
      if (
        u.protocol === 'https:' &&
        u.hostname === 'api.github.com' &&
        u.pathname === '/users/Jklimaitis/repos'
      )
        return u.toString();
    } catch {
      return null;
    }
  }
  return null;
}

export async function buscarJson(
  url: string,
  opcoes: { buscar: typeof fetch; tempoLimiteMs?: number },
): Promise<Resposta> {
  const controle = new AbortController();
  const limite = opcoes.tempoLimiteMs ?? TEMPO_LIMITE_MS;
  const temporizador = setTimeout(() => controle.abort(), limite);
  try {
    let resposta: Response;
    try {
      resposta = await opcoes.buscar(url, {
        signal: controle.signal,
      } as RequestInit);
    } catch {
      return {
        ok: false,
        motivo: controle.signal.aborted ? 'tempo-esgotado' : 'rede',
      };
    }
    if (resposta.status === 403 || resposta.status === 429)
      return { ok: false, motivo: 'limite' };
    if (!resposta.ok) return { ok: false, motivo: 'rede' };
    let json: unknown;
    try {
      json = await resposta.json();
    } catch {
      return { ok: false, motivo: 'resposta-invalida' };
    }
    return {
      ok: true,
      json,
      proximaPagina: proximaPaginaValida(resposta.headers.get('link')),
    };
  } finally {
    clearTimeout(temporizador);
  }
}

export async function buscarListaRepositorios(opcoes: {
  buscar: typeof fetch;
  urlInicial?: string;
  maxPaginas?: number;
  tempoLimiteMs?: number;
}): Promise<Resultado<{ itens: unknown[]; incompleto: boolean }>> {
  const maxPaginas = opcoes.maxPaginas ?? MAX_PAGINAS;
  let url: string | null = opcoes.urlInicial ?? FONTES.repositorios;
  const itens: unknown[] = [];
  let paginas = 0;
  let incompleto = false;
  while (url && paginas < maxPaginas) {
    const r = await buscarJson(url, {
      buscar: opcoes.buscar,
      tempoLimiteMs: opcoes.tempoLimiteMs,
    });
    if (!r.ok) {
      if (paginas === 0) return { ok: false, motivo: r.motivo };
      incompleto = true;
      break;
    }
    if (!Array.isArray(r.json)) {
      if (paginas === 0) return { ok: false, motivo: 'resposta-invalida' };
      incompleto = true;
      break;
    }
    itens.push(...r.json);
    paginas += 1;
    url = r.proximaPagina;
    if (url && paginas >= maxPaginas) incompleto = true;
  }
  return { ok: true, dados: { itens, incompleto } };
}
