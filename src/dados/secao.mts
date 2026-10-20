import type { Dia, Fonte, Resultado } from './tipos.mts';
import { calcularIndicadores, validarCalendario } from './calendario.mts';
import type { Indicadores } from './calendario.mts';
import { validarPerfil, selecionarRepositorios } from './github.mts';
import type { Perfil, Repositorio } from './github.mts';
import type { Armazenamento } from './cache.mts';
import { chaveCache, gravarCache, lerCache } from './cache.mts';
import { FONTES, buscarJson, buscarListaRepositorios } from './buscar.mts';

export type EstadoSecao = {
  perfil: Resultado<Perfil>;
  repositorios: Resultado<{ itens: Repositorio[]; incompleto: boolean }>;
  calendario: Resultado<Dia[]>;
  indicadores: Indicadores | null;
};

export async function carregarSecao(opcoes: {
  buscar: typeof fetch;
  armazenamento: Armazenamento;
  agora: () => number;
  usuario?: string;
}): Promise<EstadoSecao> {
  const usuario = opcoes.usuario ?? 'Jklimaitis';

  async function porCache<T>(
    fonte: Fonte,
    url: string,
    validar: (json: unknown) => Resultado<T>,
  ): Promise<Resultado<T>> {
    const chave = chaveCache(fonte, usuario);
    const cache = lerCache<T>(opcoes.armazenamento, chave, opcoes.agora());
    if (cache.estado === 'valido') return { ok: true, dados: cache.dados };
    const r = await buscarJson(url, { buscar: opcoes.buscar });
    if (!r.ok) return r;
    const v = validar(r.json);
    if (v.ok) gravarCache(opcoes.armazenamento, chave, v.dados, opcoes.agora());
    return v;
  }

  const perfil = await porCache<Perfil>('perfil', FONTES.perfil, validarPerfil);

  const chaveRepos = chaveCache('repositorios', usuario);
  const cacheRepos = lerCache<{ itens: Repositorio[]; incompleto: boolean }>(
    opcoes.armazenamento,
    chaveRepos,
    opcoes.agora(),
  );
  let repositorios: Resultado<{ itens: Repositorio[]; incompleto: boolean }>;
  if (cacheRepos.estado === 'valido') {
    repositorios = { ok: true, dados: cacheRepos.dados };
  } else {
    const lista = await buscarListaRepositorios({ buscar: opcoes.buscar });
    if (!lista.ok) {
      repositorios = lista;
    } else {
      const sel = selecionarRepositorios(lista.dados.itens, {
        incompleto: lista.dados.incompleto,
      });
      if (sel.ok && !sel.dados.incompleto)
        gravarCache(
          opcoes.armazenamento,
          chaveRepos,
          sel.dados,
          opcoes.agora(),
        );
      repositorios = sel;
    }
  }

  const calendario = await porCache<Dia[]>(
    'calendario',
    FONTES.calendario,
    validarCalendario,
  );

  return {
    perfil,
    repositorios,
    calendario,
    indicadores: calendario.ok ? calcularIndicadores(calendario.dados) : null,
  };
}
