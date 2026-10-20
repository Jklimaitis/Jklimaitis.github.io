import type { Dicionario } from './types';

export const pt: Dicionario = {
  idioma: 'pt-BR',
  titulo: 'Portfólio · Jonas Klimaitis',
  troca: { rotulo: 'EN', href: '/en/', idioma: 'en', rotuloAcessivel: 'Mudar para inglês' },
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
  trajetoria: {
    titulo: 'Trajetória',
    experiencias: [
      {
        cargo: 'Analista de Automação',
        empresa: 'Netbiis',
        periodo: 'jan 2025 a mai 2026',
        itens: [
          'Jornadas de cliente e automação de marketing com segmentação, personalização e regras de campanha.',
          'Canais de comunicação: e-mail, SMS, push e redes sociais.',
          'Integrações com plataformas de dados de cliente (CDP) e sistemas de CRM.',
          'Trabalho conjunto com times de Marketing, CRM e Tecnologia para organizar dados e requisitos de campanha.',
        ],
      },
      {
        cargo: 'Ads Technical Support Specialist',
        empresa: 'Atento Brasil',
        periodo: '2023 a out 2024',
        itens: [
          'Suporte técnico especializado em campanhas no Meta Ads.',
          'Análise de desempenho de anúncios a partir de relatórios de dados.',
          'Configuração de rastreamento com o Pixel da Meta.',
          'Resolução de problemas técnicos complexos de anúncios e implementação de campanhas.',
          'Tradução de informação técnica para usuários não especialistas.',
        ],
      },
    ],
    formacaoTitulo: 'Formação',
    formacao: [
      { curso: 'Pós-graduação em Engenharia de Software', instituicao: 'Descomplica', periodo: 'nov 2025 a nov 2026' },
    ],
    cursosTitulo: 'Cursos',
    cursos: [
      { nome: 'Python Master (Logic, Django e Integration)', instituicao: 'PyCodeBR' },
      { nome: 'IA Master', instituicao: 'PyCodeBR' },
      { nome: 'IA Master Elite, grupo numero 3 de mentorados', instituicao: 'PyCodeBR', },
      { nome: 'AI Builders', instituicao: 'PyCodeBR' },
      { nome: 'Imersão de Agentes Autônomos', instituicao: 'PyCodeBR' },
      { nome: 'Workshop FastAPI', instituicao: 'PyCodeBR' },
    ],
    idiomasTitulo: 'Idiomas',
    idiomas: 'Português nativo, inglês fluente, espanhol básico.',
  },
  contato: { titulo: 'Contato', provisorio: 'Em construção.' },
  rodape: 'Portfólio de Jonas Klimaitis.',
};
