export type Motivo = 'rede' | 'tempo-esgotado' | 'limite' | 'resposta-invalida';

export type Resultado<T> =
  { ok: true; dados: T } | { ok: false; motivo: Motivo };

export type Fonte = 'perfil' | 'repositorios' | 'calendario' | 'eventos';

export type Dia = { data: string; contagem: number; nivel: number };
