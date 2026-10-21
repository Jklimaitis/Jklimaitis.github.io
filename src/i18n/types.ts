export type Acao = {
  rotulo: string;
  href: string;
  variante: 'primary' | 'ghost';
};

export type Grupo = {
  nome: string;
  descricao?: string;
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
  resumo?: string;
};

export type Idioma = {
  nome: string;
  nivel: string;
  bandeira: string;
};

export type LinkProjeto = { rotulo: string; href: string };

export type Projeto = {
  nome: string;
  tags: string[];
  descricao: string;
  arquitetura: string[];
  destaques: string[];
  tecnologias: string[];
  meta?: string;
  links: LinkProjeto[];
  nota?: string;
};

export type Dicionario = {
  idioma: string;
  titulo: string;
  troca: Troca;
  navRotulo: string;
  nav: { rotulo: string; href: string }[];
  inicio: {
    nome: string;
    oficio: { antes: string; destaque: string };
    posicao: string[];
    meta: { local: string; perfilRotulo: string; perfilHref: string };
    rolar: string;
    acoes: Acao[];
  };
  stack: {
    titulo: string;
    grupos: Grupo[];
    estudoTitulo: string;
    estudoDescricao: string;
    estudo: string[];
  };
  projetos: {
    titulo: string;
    listaRotulo: string;
    arquiteturaRotulo: string;
    destaquesRotulo: string;
    tecnologiasRotulo: string;
    itens: Projeto[];
  };
  github: {
    titulo: string;
    fallback: string;
    linkPerfil: string;
    carregando: string;
    indisponivel: string;
    limite: string;
    listaVazia: string;
    incompleto: string;
    fonte: string;
    recentes: string;
    verTodos: string;
    hoje: string;
    periodo: string;
    repositoriosPublicos: string;
    indicadores: {
      contribuicoes: string;
      diasAtivos: string;
      sequenciaAtual: string;
      maiorSequencia: string;
      melhorDia: string;
    };
    semContribuicoes: string;
  };
  trajetoria: {
    titulo: string;
    experiencias: Experiencia[];
    formacaoTitulo: string;
    formacao: Formacao[];
    cursosTitulo: string;
    cursos: Curso[];
    idiomasTitulo: string;
    idiomas: Idioma[];
  };
  contato: {
    titulo: string;
    texto: string;
    acoes: Acao[];
  };
  rodape: string;
  meses: string[];
};
