/**
 * Devolve o índice da aba que deve receber a seleção para a tecla pressionada.
 * `null` significa tecla não tratada; quem chama decide não fazer nada.
 */
export function indiceDaTecla(
  atual: number,
  total: number,
  tecla: string,
): number | null {
  if (total <= 0) return null;

  switch (tecla) {
    case 'ArrowDown':
    case 'ArrowRight':
      return (atual + 1) % total;
    case 'ArrowUp':
    case 'ArrowLeft':
      return (atual - 1 + total) % total;
    case 'Home':
      return 0;
    case 'End':
      return total - 1;
    default:
      return null;
  }
}
