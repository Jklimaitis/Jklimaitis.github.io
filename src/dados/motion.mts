export type Retangulo = {
  left: number;
  top: number;
  width: number;
  height: number;
};

/**
 * Converte a posição do ponteiro em porcentagem relativa ao elemento,
 * limitada entre 0 e 100 para o gradiente não sair da caixa.
 */
export function deslocamentoDoPonteiro(
  x: number,
  y: number,
  retangulo: Retangulo,
): { x: number; y: number } {
  if (retangulo.width <= 0 || retangulo.height <= 0) return { x: 0, y: 0 };

  const limitar = (valor: number) =>
    Math.min(100, Math.max(0, Math.round(valor)));

  return {
    x: limitar(((x - retangulo.left) / retangulo.width) * 100),
    y: limitar(((y - retangulo.top) / retangulo.height) * 100),
  };
}

/**
 * Diferença a exibir no selo, ou null quando não há o que anunciar.
 * Referência ausente ou inválida nunca gera selo.
 */
export function seloDeDiferenca(
  totalNovo: number,
  totalAnterior: number | null | undefined,
): number | null {
  if (!Number.isInteger(totalNovo) || totalNovo < 0) return null;
  if (
    typeof totalAnterior !== 'number' ||
    !Number.isInteger(totalAnterior) ||
    totalAnterior < 0
  )
    return null;

  const diferenca = totalNovo - totalAnterior;
  return diferenca > 0 ? diferenca : null;
}
