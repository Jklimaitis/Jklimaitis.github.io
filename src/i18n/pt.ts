import type { Dicionario } from './types';

export const pt: Dicionario = {
  idioma: 'pt-BR',
  titulo: 'Portfólio · Jonas Klimaitis',
  navRotulo: 'Seções',
  nav: [
    { rotulo: 'Início', href: '#inicio' },
    { rotulo: 'Stack', href: '#stack' },
    { rotulo: 'Projetos', href: '#projetos' },
    { rotulo: 'GitHub', href: '#github' },
    { rotulo: 'Trajetória', href: '#trajetoria' },
    { rotulo: 'Contato', href: '#contato' },
  ],
  inicio: {
    nome: 'Jonas Klimaitis',
    lead: 'Backend em Python, com foco em automação e integração de sistemas.',
    acoes: [
      { rotulo: 'Ver projetos', href: '#projetos', variante: 'primary' },
      { rotulo: 'GitHub', href: 'https://github.com/Jklimaitis', variante: 'ghost' },
    ],
  },
  stack: {
    titulo: 'Com o que eu trabalho',
    grupos: [
      { nome: 'Backend', itens: ['Python', 'FastAPI', 'Django', 'APIs REST', 'JWT com refresh', 'bcrypt com pepper'] },
      { nome: 'Arquitetura', itens: ['Arquitetura em camadas', 'SOLID', 'Clean Code', 'serviços desacoplados'] },
      { nome: 'Dados', itens: ['PostgreSQL', 'MySQL', 'Oracle', 'SQL', 'modelagem relacional'] },
      { nome: 'Infra e DevOps', itens: ['Docker', 'Linux (WSL e Ubuntu)', 'Git e GitHub', 'systemd', 'nginx', 'Proxmox'] },
      { nome: 'Testes e qualidade', itens: ['pytest', 'testes de API', 'revisão de código', 'verificação por execução'] },
      { nome: 'Outras linguagens', itens: ['Java', 'JavaScript', 'Node.js', 'React', 'Bash'] },
      { nome: 'Automação e IA', itens: ['automação de processos', 'integração via APIs', 'orquestração de agentes', 'multi-agente em Slack', 'LLM como ferramenta de engenharia'] },
    ],
    estudoTitulo: 'Estudando',
    estudo: ['OAuth2', 'MongoDB', 'AWS', 'microsserviços', 'TDD', 'UiPath'],
  },
  projetos: { titulo: 'Projetos', provisorio: 'Em construção.' },
  github: { titulo: 'Atividade no GitHub', provisorio: 'Em construção.' },
  trajetoria: { titulo: 'Trajetória', provisorio: 'Em construção.' },
  contato: { titulo: 'Contato', provisorio: 'Em construção.' },
  rodape: 'Portfólio de Jonas Klimaitis.',
};
