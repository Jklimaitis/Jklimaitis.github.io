import type { Dicionario } from './types';

export const en: Dicionario = {
  idioma: 'en-GB',
  titulo: 'Portfolio · Jonas Klimaitis',
  troca: {
    rotulo: 'PT',
    href: '/',
    idioma: 'pt-BR',
    rotuloAcessivel: 'Mudar para português',
  },
  navRotulo: 'Sections',
  nav: [
    { rotulo: 'Stack', href: '#stack' },
    { rotulo: 'Projects', href: '#projetos' },
    { rotulo: 'GitHub', href: '#github' },
    { rotulo: 'Journey', href: '#trajetoria' },
    { rotulo: 'Contact', href: '#contato' },
  ],
  inicio: {
    nome: 'Jonas Klimaitis',
    oficio: { antes: 'Backend', destaque: 'Developer' },
    posicao:
      'I build Python APIs and automations: system integration, data handling and processes that run on their own. I come from CRM and MarTech, where I spent years connecting tools and fixing what broke between them — a background I now use to think about the whole flow, not just the endpoint.',
    meta: {
      local: 'São Paulo',
      perfilRotulo: 'github.com/Jklimaitis',
      perfilHref: 'https://github.com/Jklimaitis',
    },
    rolar: 'scroll to explore',
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
        descricao:
          'Python APIs with token authentication and hashed passwords.',
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
        descricao:
          'Layered code, with business rules kept out of the entry layer.',
        itens: [
          'Layered architecture',
          'SOLID',
          'Clean Code',
          'Decoupled services',
        ],
      },
      {
        nome: 'Data',
        descricao:
          'Relational modelling and queries on PostgreSQL, MySQL and Oracle.',
        itens: ['PostgreSQL', 'MySQL', 'Oracle', 'SQL', 'Relational modeling'],
      },
      {
        nome: 'Infrastructure and DevOps',
        descricao:
          'Containerised services and Linux deploys behind a reverse proxy.',
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
        descricao: 'Automated tests with pytest and verification by execution.',
        itens: [
          'pytest',
          'API testing',
          'Code review',
          'Verification by execution',
        ],
      },
      {
        nome: 'Other languages',
        descricao:
          'They come in when the task goes beyond the backend: interface, operations script or automation.',
        itens: ['Java', 'JavaScript', 'Node.js', 'React', 'Bash'],
      },
      {
        nome: 'Automation and AI',
        descricao: 'Automated flows with LLMs used as an engineering tool.',
        itens: [
          'Process automation',
          'API integration',
          'Agent orchestration',
          'Multi-agent on Slack',
          'LLM as an engineering tool',
          'Hermes Agent',
        ],
      },
    ],
    estudoTitulo: 'Learning',
    estudoDescricao:
      'What I already use while building projects, with study and feasibility work as I learn.',
    estudo: ['OAuth2', 'MongoDB', 'AWS', 'Microservices', 'TDD', 'UiPath'],
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
          'Search and filtering backed by optimised Django ORM queries.',
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
        links: [
          {
            rotulo: 'Public repository',
            href: 'https://github.com/Jklimaitis/home-shopper',
          },
        ],
        nota: 'public MIT-licensed version; main development in a private repository',
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
        links: [
          {
            rotulo: 'Public template',
            href: 'https://github.com/Jklimaitis/central-operacoes-template',
          },
        ],
        nota: 'reusable template with no history; the running installation is private',
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
    fonte: 'live data · GitHub API',
    recentes: 'Recently updated repositories',
    verTodos: 'View all on GitHub',
    hoje: 'today',
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
          'Worked with Marketing, CRM and Technology teams to organise customer data and campaign requirements.',
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
        resumo:
          'Complete package combining four tracks: Python logic and algorithms for beginners, full-stack Django with APIs and AWS deploy, applied AI with LLMs and autonomous agents, and system integration with REST APIs and webhooks.',
      },
      {
        nome: 'AI Master',
        instituicao: 'PyCodeBR',
        resumo:
          'AI applications with LangChain and RAG, autonomous agents and chatbots wired to channels such as WhatsApp.',
      },
      {
        nome: 'AI Master Elite',
        instituicao: 'PyCodeBR',
        resumo:
          'Eight months of live mentoring covering advanced AI deployment, observability, agent architecture and the business side of AI solutions.',
      },
      {
        nome: 'AI Builders',
        instituicao: 'PyCodeBR',
        resumo:
          'Architecting and shipping complex AI flows with OpenAI, LangChain, RAG, autonomous agents and MCP. Also covers Claude Code, Codex and Gemini CLI to plan and build systems, plus the product view: turning this into SaaS or an enterprise solution.',
      },
      {
        nome: 'Autonomous Agents Immersion',
        instituicao: 'PyCodeBR',
        resumo:
          'Infrastructure first: instead of only writing prompts, the structure around the agent — deploy on a Linux VPS, domain, DNS, Cloudflare and SSH access. The goal is continuous operation, with connected tools, long-term memory and context bases.',
      },
      {
        nome: 'FastAPI Workshop',
        instituicao: 'PyCodeBR',
        resumo:
          'High-performance APIs with FastAPI, covering Docker, Kubernetes, tests, CI/CD and scalable deploy on AWS.',
      },
    ],
    idiomasTitulo: 'Languages',
    idiomas: [
      { nome: 'Portuguese', nivel: 'native', bandeira: 'br' },
      { nome: 'English', nivel: 'fluent', bandeira: 'gb' },
      { nome: 'Spanish', nivel: 'basic', bandeira: 'es' },
    ],
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
  numeros: {
    anos: '6',
    anosRotulo: 'years in tech',
    repositorios: 'public repositories',
    contribuicoes: 'contributions in the last year',
  },
  eventos: {
    rotulo: 'Recent activity',
    carregando: 'Loading activity…',
    indisponivel: 'Activity unavailable right now.',
    push: 'push',
    criou: 'created',
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
