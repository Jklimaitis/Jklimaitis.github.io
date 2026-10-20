export type Acao = {
  rotulo: string;
  href: string;
  variante: 'primary' | 'ghost';
};

export type Grupo = {
  nome: string;
  itens: string[];
};

export type Troca = {
  rotulo: string;
  href: string;
  idioma: string;
  rotuloAcessivel: string;
};

export type Dicionario = {
  idioma: string;
  titulo: string;
  troca: Troca;
  navRotulo: string;
  nav: { rotulo: string; href: string }[];
  inicio: { nome: string; lead: string; acoes: Acao[] };
  stack: { titulo: string; grupos: Grupo[]; estudoTitulo: string; estudo: string[] };
  projetos: { titulo: string; provisorio: string };
  github: { titulo: string; provisorio: string };
  trajetoria: { titulo: string; provisorio: string };
  contato: { titulo: string; provisorio: string };
  rodape: string;
};
