import type { Resultado } from './tipos.mts';

export const LIMITE_REPOSITORIOS = 10;

export type Perfil = { repositoriosPublicos: number; urlPerfil: string };

export type Repositorio = {
  nome: string;
  descricao: string | null;
  linguagem: string | null;
  estrelas: number;
  ultimoEnvio: string | null;
  url: string;
};

const FALHA = { ok: false, motivo: 'resposta-invalida' } as const;

function linkGithub(valor: unknown): valor is string {
  if (typeof valor !== 'string') return false;
  try {
    const url = new URL(valor);
    return url.protocol === 'https:' && url.hostname === 'github.com';
  } catch {
    return false;
  }
}

export function validarPerfil(json: unknown): Resultado<Perfil> {
  if (typeof json !== 'object' || json === null) return FALHA;

  const { public_repos, html_url } = json as {
    public_repos?: unknown;
    html_url?: unknown;
  };

  if (
    typeof public_repos !== 'number' ||
    !Number.isInteger(public_repos) ||
    public_repos < 0
  )
    return FALHA;

  if (!linkGithub(html_url)) return FALHA;

  return {
    ok: true,
    dados: { repositoriosPublicos: public_repos, urlPerfil: html_url },
  };
}

export function selecionarRepositorios(
  json: unknown,
  opcoes: { limite?: number; incompleto?: boolean } = {},
): Resultado<{ itens: Repositorio[]; incompleto: boolean }> {
  if (!Array.isArray(json)) return FALHA;

  const limite = opcoes.limite ?? LIMITE_REPOSITORIOS;
  const itens: Repositorio[] = [];

  for (const bruto of json) {
    if (typeof bruto !== 'object' || bruto === null) continue;

    const r = bruto as Record<string, unknown>;

    if (r.fork === true || r.archived === true) continue;
    if (typeof r.name !== 'string' || r.name.trim() === '') continue;
    if (!linkGithub(r.html_url)) continue;
    if (
      typeof r.stargazers_count !== 'number' ||
      !Number.isInteger(r.stargazers_count) ||
      r.stargazers_count < 0
    )
      continue;
    if (r.pushed_at !== null && typeof r.pushed_at !== 'string') continue;

    itens.push({
      nome: r.name,
      descricao: typeof r.description === 'string' ? r.description : null,
      linguagem: typeof r.language === 'string' ? r.language : null,
      estrelas: r.stargazers_count,
      ultimoEnvio: typeof r.pushed_at === 'string' ? r.pushed_at : null,
      url: r.html_url,
    });
  }

  const porNome = (a: Repositorio, b: Repositorio) =>
    a.nome < b.nome ? -1 : a.nome > b.nome ? 1 : 0;

  itens.sort((a, b) => {
    if (a.ultimoEnvio === null && b.ultimoEnvio === null) return porNome(a, b);
    if (a.ultimoEnvio === null) return 1;
    if (b.ultimoEnvio === null) return -1;
    if (a.ultimoEnvio !== b.ultimoEnvio)
      return a.ultimoEnvio < b.ultimoEnvio ? 1 : -1;
    return porNome(a, b);
  });

  return {
    ok: true,
    dados: {
      itens: itens.slice(0, limite),
      incompleto: opcoes.incompleto === true,
    },
  };
}
