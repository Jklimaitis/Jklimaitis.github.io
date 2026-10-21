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
      {
        rotulo: 'LinkedIn',
        href: 'https://www.linkedin.com/in/jonasklimaitis/',
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
    listaRotulo: 'Projects',
    arquiteturaRotulo: 'Architecture',
    destaquesRotulo: 'Highlights',
    tecnologiasRotulo: 'Technologies',
    itens: [
      {
        nome: 'Projeto Carros',
        tags: ['monolith', 'web'],
        descricao:
          'Web application for registering and managing vehicles, built with Python and Django on the Model-View-Template architecture. Access control and authentication protect the administrative and operational routes. Dynamic filters search vehicles by several criteria, and file upload stores the photos. Persistence and business rules rely on the Django ORM and strictly validated forms.',
        arquitetura: [
          'Templates (HTML5/CSS)',
          'Django Views (MVT)',
          'ModelForms (validation)',
          'Django ORM',
          'Database (PostgreSQL)',
        ],
        destaques: [
          'Python and Django backend with the MVT pattern, separating presentation from models and rules.',
          'Native authentication flow that restricts access and protects the editing forms.',
          'Static file upload and management tied to the model lifecycle.',
          'Search and filtering backed by optimized Django ORM queries.',
        ],
        tecnologias: [
          'Python',
          'Django',
          'Django ORM',
          'ModelForms',
          'HTML5',
          'CSS3',
          'PostgreSQL',
        ],
        meta: 'Python · updated Sep 2026',
        links: [
          {
            rotulo: 'Repository source',
            href: 'https://github.com/Jklimaitis/Projeto_Carros',
          },
        ],
      },
      {
        nome: 'home_shopper',
        tags: ['rest api', 'data'],
        descricao:
          'Asynchronous catalogue and shopping intelligence API on FastAPI and PostgreSQL, organised in decoupled service layers. It processes raw data from Brazilian electronic fiscal receipts (NFC-e) into a cross-store price history. Pydantic schemas validate inbound contracts and serialise responses. A pytest suite keeps the data pipeline stable.',
        arquitetura: [
          'NFC-e payload',
          'FastAPI Routers',
          'Pydantic Schemas',
          'ETL service',
          'PostgreSQL',
        ],
        destaques: [
          'Layered FastAPI architecture with asynchronous I/O operations.',
          'Dedicated ETL pipeline for normalising, deduplicating and storing NFC-e receipts.',
          'Inbound and outbound contracts typed and validated with Pydantic at the edge.',
          'pytest suite covering endpoints and transformation rules.',
        ],
        tecnologias: [
          'FastAPI',
          'Python',
          'PostgreSQL',
          'Pydantic',
          'pytest',
          'ETL',
          'AsyncIO',
        ],
        meta: 'Python',
        links: [],
        nota: 'private repository',
      },
      {
        nome: 'Pimp My Commander',
        tags: ['rest api', 'AI'],
        descricao:
          'Asynchronous FastAPI application for recommending and building Commander decks in Magic: The Gathering. It integrates the Scryfall, EDHREC and ManaBox APIs to map the player collection and find statistical card synergies. Language models analyse archetypes and justify card swaps with context. Everything runs in Docker containers, which keeps the environment reproducible.',
        arquitetura: [
          'FastAPI Routers',
          'ManaBox Parser',
          'Gateways (Scryfall / EDHREC)',
          'LLM engine',
          'Docker',
        ],
        destaques: [
          'Resilient external integration with Scryfall, EDHREC and ManaBox exports.',
          'LLM orchestration to analyse context and recommend card substitutions.',
          'Response contracts validated end to end with Pydantic.',
          'Containerised environment with Docker for local and production runs.',
        ],
        tecnologias: [
          'Python',
          'FastAPI',
          'Pydantic',
          'Docker',
          'LLM',
          'HTTPX',
          'REST APIs',
        ],
        meta: 'Python · updated Oct 2026',
        links: [
          {
            rotulo: 'API source',
            href: 'https://github.com/Jklimaitis/pimp-my-commander',
          },
        ],
      },
      {
        nome: 'Central de Operações',
        tags: ['devops', 'support'],
        descricao:
          'Local portal that centralises technical procedures, publishes reports and tracks operational incidents. Fast search, severity filters and indexing support technical teams in real time. Delivery goes through a reverse proxy on Nginx with access control via basic authentication. The interface uses plain HTML, CSS and JavaScript, avoiding heavy dependencies and prioritising immediate load during incidents.',
        arquitetura: [
          'Nginx (proxy and auth)',
          'Interface (HTML / CSS / JS)',
          'Python service',
          'Local parser and logs',
        ],
        destaques: [
          'Edge and security layer on Nginx providing basic user authentication.',
          'Plain JavaScript frontend built for speed during contingency.',
          'Local search and reactive filters to find routines and reports quickly.',
          'Python scripts that read and consolidate incident files.',
        ],
        tecnologias: [
          'Python',
          'Nginx',
          'HTML5',
          'CSS3',
          'JavaScript',
          'Basic authentication',
        ],
        meta: 'Python',
        links: [],
        nota: 'private repository',
      },
    ],
  },
  github: {
    titulo: 'GitHub activity',
    fallback:
      'The data below loads in the browser from the public GitHub APIs. Without JavaScript, open the profile through the link.',
    linkPerfil: 'View GitHub profile',
    carregando: 'Loading GitHub data…',
    indisponivel: 'Data currently unavailable.',
    limite: 'GitHub request limit reached. Try again in a few minutes.',
    listaVazia: 'No eligible repository at the moment.',
    incompleto: 'Partial list: the query could not be completed.',
    periodo: 'Period',
    repositoriosPublicos: 'public repositories',
    indicadores: {
      contribuicoes: 'contributions in the last year',
      diasAtivos: 'active days',
      sequenciaAtual: 'current streak',
      maiorSequencia: 'longest streak',
      melhorDia: 'best day',
    },
    semContribuicoes: 'no contributions in the period',
  },
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
  meses: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
};
