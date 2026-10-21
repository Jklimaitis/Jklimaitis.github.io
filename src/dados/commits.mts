/**
 * Leitura do log do próprio repositório, para o terminal da seção GitHub.
 *
 * O texto vem de `git log --pretty=format:%h|%ad|%s --date=short`, rodado em
 * tempo de build. Nada aqui inventa dado: linha malformada é descartada, e o
 * que não existir simplesmente não aparece.
 */

export type Commit = {
  /** Hash curto. */
  sha: string;
  /** Data no formato AAAA-MM-DD. */
  data: string;
  /** Primeira linha da mensagem. */
  mensagem: string;
};

const PADRAO = /^([0-9a-f]{7,40})\|(\d{4}-\d{2}-\d{2})\|(.+)$/;
/**
 * Limite generoso de propósito: quem decide o que cabe na tela é o CSS, com
 * `text-overflow: ellipsis` na coluna da mensagem. Aqui só se evita que uma
 * mensagem enorme entre inteira no HTML.
 */
const LIMITE_MENSAGEM = 64;

/** Encurta a mensagem sem cortar no meio de uma palavra. */
export function encurtar(mensagem: string, limite = LIMITE_MENSAGEM): string {
  const limpa = mensagem.trim().replace(/\s+/g, ' ');
  if (limpa.length <= limite) return limpa;

  const corte = limpa.slice(0, limite);
  const ultimoEspaco = corte.lastIndexOf(' ');
  const base =
    ultimoEspaco > limite * 0.6 ? corte.slice(0, ultimoEspaco) : corte;

  return `${base.trimEnd()}…`;
}

/**
 * Converte a saída do `git log` em lista de commits. Linhas que não casam com
 * o formato são ignoradas; o resultado é limitado por `limite`.
 */
export function lerCommits(texto: string, limite = 5): Commit[] {
  const commits: Commit[] = [];

  for (const linha of texto.split('\n')) {
    if (commits.length >= limite) break;

    const partes = PADRAO.exec(linha.trim());
    if (!partes) continue;

    commits.push({
      sha: partes[1].slice(0, 7),
      data: partes[2],
      mensagem: encurtar(partes[3]),
    });
  }

  return commits;
}

/** Data curta para o terminal: MM-DD, que é o que cabe na linha. */
export function dataCurta(data: string): string {
  return /^\d{4}-\d{2}-\d{2}$/.test(data) ? data.slice(5) : data;
}
