import type { EstadoSecao } from './secao.mts';
import { carregarSecao } from './secao.mts';

let pendente: Promise<EstadoSecao> | null = null;

/**
 * Devolve a consulta da página: a primeira chamada cria, as seguintes
 * recebem a mesma promessa. Assim faixa de números e seção GitHub não
 * disparam duas requisições para os mesmos dados.
 */
export function dadosDaSessao(
  opcoes: Parameters<typeof carregarSecao>[0],
  carregar: typeof carregarSecao = carregarSecao,
): Promise<EstadoSecao> {
  if (!pendente) pendente = carregar(opcoes);
  return pendente;
}

/** Descarta a promessa guardada. Usado nos testes para isolar cada caso. */
export function esquecerSessao(): void {
  pendente = null;
}
