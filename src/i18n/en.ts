import type { Dicionario } from './types';

export const en: Dicionario = {
  idioma: 'en',
  titulo: 'Portfolio · Jonas Klimaitis',
  troca: {
    rotulo: 'PT',
    href: '/',
    idioma: 'pt-BR',
    rotuloAcessivel: 'Mudar para português',
  },
  navRotulo: 'Sections',
  nav: [
    { rotulo: 'Home', href: '#inicio' },
    { rotulo: 'Stack', href: '#stack' },
    { rotulo: 'Projects', href: '#projetos' },
    { rotulo: 'GitHub', href: '#github' },
    { rotulo: 'Journey', href: '#trajetoria' },
    { rotulo: 'Contact', href: '#contato' },
  ],
  inicio: {
    nome: 'Jonas Klimaitis',
    lead: 'Backend engineer working in Python, focused on automation and system integration.',
    acoes: [
      { rotulo: 'See projects', href: '#projetos', variante: 'primary' },
      {
        rotulo: 'GitHub',
        href: 'https://github.com/Jklimaitis',
        variante: 'ghost',
      },
    ],
  },
  stack: {
    titulo: 'What I work with',
    grupos: [
      {
        nome: 'Backend',
        itens: [
          'Python',
          'FastAPI',
          'Django',
          'REST APIs',
          'JWT with refresh',
          'bcrypt with pepper',
        ],
      },
      {
        nome: 'Architecture',
        itens: [
          'layered architecture',
          'SOLID',
          'Clean Code',
          'decoupled services',
        ],
      },
      {
        nome: 'Data',
        itens: ['PostgreSQL', 'MySQL', 'Oracle', 'SQL', 'relational modeling'],
      },
      {
        nome: 'Infrastructure and DevOps',
        itens: [
          'Docker',
          'Linux (WSL and Ubuntu)',
          'Git and GitHub',
          'systemd',
          'nginx',
          'Proxmox',
        ],
      },
      {
        nome: 'Testing and quality',
        itens: [
          'pytest',
          'API testing',
          'code review',
          'verification by execution',
        ],
      },
      {
        nome: 'Other languages',
        itens: ['Java', 'JavaScript', 'Node.js', 'React', 'Bash'],
      },
      {
        nome: 'Automation and AI',
        itens: [
          'process automation',
          'API integration',
          'agent orchestration',
          'multi-agent on Slack',
          'LLM as an engineering tool',
        ],
      },
    ],
    estudoTitulo: 'Learning',
    estudo: ['OAuth2', 'MongoDB', 'AWS', 'microservices', 'TDD', 'UiPath'],
  },
  projetos: {
    titulo: 'Projects',
    linkRotulo: 'View repository',
    itens: [
      {
        nome: 'Projeto Carros',
        resumo:
          'Django application for registering and managing cars, with authentication, search and image upload.',
        stack: ['Django', 'Python', 'ORM', 'Model forms'],
        href: 'https://github.com/Jklimaitis/Projeto_Carros',
      },
      {
        nome: 'home_shopper',
        resumo:
          'FastAPI API on PostgreSQL for a product catalog and cross-store price comparison, loaded from Brazilian fiscal receipts (NFC-e).',
        stack: ['FastAPI', 'PostgreSQL', 'pytest', 'ETL'],
        nota: 'private repository',
      },
      {
        nome: 'Pimp My Commander',
        resumo:
          'FastAPI application that analyses and builds Commander decks from the player collection, integrating Scryfall, EDHREC and ManaBox with LLM support.',
        stack: ['FastAPI', 'Pydantic', 'Docker', 'LLM'],
        href: 'https://github.com/Jklimaitis/pimp-my-commander',
      },
      {
        nome: 'Central de Operações',
        resumo:
          'Local portal to publish and browse reports, routines and incidents, with search, filters and authentication.',
        stack: ['HTML, CSS and JS', 'Nginx', 'basic auth', 'Python'],
        nota: 'private repository',
      },
    ],
  },

  github: { titulo: 'GitHub activity', provisorio: 'Under construction.' },
  trajetoria: {
    titulo: 'Journey',
    experiencias: [
      {
        cargo: 'Automation Analyst',
        empresa: 'Netbiis',
        periodo: 'Jan 2025 to May 2026',
        itens: [
          'Customer journeys and marketing automation with segmentation, personalization and campaign rules.',
          'Communication channels: email, SMS, push notifications and social media.',
          'Integrations with Customer Data Platforms (CDP) and CRM systems.',
          'Worked with Marketing, CRM and Technology teams to organize customer data and campaign requirements.',
        ],
      },
      {
        cargo: 'Ads Technical Support Specialist',
        empresa: 'Atento Brasil',
        periodo: '2023 to Oct 2024',
        itens: [
          'Specialized technical support for Meta Ads campaigns.',
          'Campaign performance analysis based on data reports.',
          'Tracking setup with the Meta Pixel.',
          'Resolution of complex technical issues in ads and campaign implementation.',
          'Translation of technical information for non-specialist users.',
        ],
      },
    ],
    formacaoTitulo: 'Education',
    formacao: [
      {
        curso: 'Postgraduate in Software Engineering',
        instituicao: 'Descomplica',
        periodo: 'Nov 2025 to Nov 2026',
      },
    ],
    cursosTitulo: 'Courses',
    cursos: [
      {
        nome: 'Python Master (Logic, Django and Integration)',
        instituicao: 'PyCodeBR',
      },
      { nome: 'AI Master', instituicao: 'PyCodeBR' },
      { nome: 'AI Master Elite, mentoring group 3', instituicao: 'PyCodeBR' },
      { nome: 'AI Builders', instituicao: 'PyCodeBR' },
      { nome: 'Autonomous Agents Immersion', instituicao: 'PyCodeBR' },
      { nome: 'FastAPI Workshop', instituicao: 'PyCodeBR' },
    ],
    idiomasTitulo: 'Languages',
    idiomas: 'Portuguese native, English fluent, Spanish basic.',
  },
  contato: {
    titulo: 'Contact',
    texto: 'Connect with me on LinkedIn and explore my projects on GitHub.',
    acoes: [
      {
        rotulo: 'LinkedIn',
        href: 'https://www.linkedin.com/in/jonasklimaitis/',
        variante: 'ghost',
      },
      {
        rotulo: 'GitHub',
        href: 'https://github.com/Jklimaitis',
        variante: 'primary',
      },
    ],
  },
  rodape: 'Portfolio of Jonas Klimaitis.',
};
