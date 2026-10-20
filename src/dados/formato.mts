const PADRAO_DATA = /^(\d{4})-(\d{2})-(\d{2})/;

export function formatarMesAno(
  pushedAt: string | null,
  meses: readonly string[],
): { rotulo: string; datetime: string } | null {
  if (typeof pushedAt !== 'string' || pushedAt === '') return null;

  const partes = PADRAO_DATA.exec(pushedAt);
  if (!partes) return null;

  const ano = Number(partes[1]);
  const mes = Number(partes[2]);
  const dia = Number(partes[3]);

  const data = new Date(Date.UTC(ano, mes - 1, dia));
  if (
    data.getUTCFullYear() !== ano ||
    data.getUTCMonth() !== mes - 1 ||
    data.getUTCDate() !== dia
  )
    return null;

  const nome = meses[mes - 1];
  if (typeof nome !== 'string' || nome.trim() === '') return null;

  return {
    rotulo: `${nome} ${ano}`,
    datetime: `${ano}-${partes[2]}-${partes[3]}`,
  };
}
