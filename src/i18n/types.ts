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

export type Experiencia = {
  cargo: string;
  empresa: string;
  periodo: string;
  itens: string[];
};

export type Formacao = {
  curso: string;
  instituicao: string;
  periodo: string;
};

export type Curso = {
  nome: string;
  instituicao: string;
};

export type Projeto = {
  nome: string;
  resumo: string;
  stack: string[];
  href?: string;
  nota?: string;
};

export type Dicionario = {
  idioma: string;
  titulo: string;
  troca: Troca;
  navRotulo: string;
  nav: { rotulo: string; href: string }[];
  inicio: { nome: string; lead: string; acoes: Acao[] };
  stack: { titulo: string; grupos: Grupo[]; estudoTitulo: string; estudo: string[] };
  projetos: { titulo: string; linkRotulo: string; itens: Projeto[] };
  github: { titulo: string; provisorio: string };
  trajetoria: {
    titulo: string;
    experiencias: Experiencia[];
    formacaoTitulo: string;
    formacao: Formacao[];
    cursosTitulo: string;
    cursos: Curso[];
    idiomasTitulo: string;
    idiomas: string;
  };
  contato: { titulo: string; provisorio: string };
  rodape: string;
};
