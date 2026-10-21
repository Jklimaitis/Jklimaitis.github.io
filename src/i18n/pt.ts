import type { Dicionario } from './types';

export const pt: Dicionario = {
  idioma: 'pt-BR',
  titulo: 'Portfólio · Jonas Klimaitis',
  troca: {
    rotulo: 'EN',
    href: '/en/',
    idioma: 'en-GB',
    rotuloAcessivel: 'Mudar para inglês',
  },
  navRotulo: 'Seções',
  nav: [
    { rotulo: 'Stack', href: '#stack' },
    { rotulo: 'Projetos', href: '#projetos' },
    { rotulo: 'GitHub', href: '#github' },
    { rotulo: 'Trajetória', href: '#trajetoria' },
    { rotulo: 'Contato', href: '#contato' },
  ],
  inicio: {
    nome: 'Jonas Klimaitis',
    oficio: { antes: 'Desenvolvedor', destaque: 'Backend' },
    posicao: [
      'Construo APIs e automações em Python com foco em previsibilidade e escala. Minha base vem de anos lidando no dia a dia da operação de CRM e MarTech: conectando plataformas legadas, tratando inconsistências de dados e garantindo a continuidade de processos críticos.',
      'Hoje, aplico essa vivência de sustentação e engenharia para desenhar sistemas backend que já nascem preparados para o mundo real — pensando no banco, na infraestrutura e no fluxo completo da informação.',
    ],
    meta: {
      local: 'São Paulo',
      perfilRotulo: 'github.com/Jklimaitis',
      perfilHref: 'https://github.com/Jklimaitis',
    },
    rolar: 'role para explorar',
    acoes: [
      { rotulo: 'Ver projetos', href: '#projetos', variante: 'primary' },
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
    titulo: 'Com o que eu trabalho',
    grupos: [
      {
        nome: 'Backend',
        descricao:
          'APIs em Python com autenticação por token e senha guardada com hash.',
        itens: [
          'Python',
          'FastAPI',
          'Django',
          'APIs REST',
          'JWT com refresh',
          'bcrypt com pepper',
        ],
      },
      {
        nome: 'Arquitetura',
        descricao:
          'Separação de camadas, com regra de negócio fora da camada de entrada.',
        itens: [
          'Arquitetura em camadas',
          'SOLID',
          'Clean Code',
          'Serviços desacoplados',
        ],
      },
      {
        nome: 'Dados',
        descricao:
          'Modelagem relacional e consultas em PostgreSQL, MySQL e Oracle.',
        itens: ['PostgreSQL', 'MySQL', 'Oracle', 'SQL', 'Modelagem relacional'],
      },
      {
        nome: 'Infra e DevOps',
        descricao: 'Serviços em contêiner e deploy em Linux com proxy reverso.',
        itens: [
          'Docker',
          'Linux (WSL e Ubuntu)',
          'Git e GitHub',
          'systemd',
          'nginx',
          'Proxmox',
        ],
      },
      {
        nome: 'Testes e qualidade',
        descricao:
          'Testes automatizados com pytest e verificação por execução.',
        itens: [
          'pytest',
          'Testes de API',
          'Revisão de código',
          'Verificação por execução',
        ],
      },
      {
        nome: 'Outras linguagens',
        descricao:
          'Entram quando a tarefa sai do backend: interface, script de operação ou automação.',
        itens: ['Java', 'JavaScript', 'Node.js', 'React', 'Bash'],
      },
      {
        nome: 'Automação e IA',
        descricao: 'Fluxos automatizados e LLM como ferramenta de engenharia.',
        itens: [
          'Automação de processos',
          'Integração via APIs',
          'Orquestração de agentes',
          'Multi-agente em Slack',
          'LLM como ferramenta de engenharia',
          'Hermes Agent',
        ],
      },
    ],
    estudoTitulo: 'Estudando',
    estudoDescricao:
      'O que já uso construindo projetos, com estudo e viabilização conforme aprendo.',
    estudo: ['OAuth2', 'MongoDB', 'AWS', 'Microsserviços', 'TDD', 'UiPath'],
  },
  projetos: {
    titulo: 'Projetos',
    listaRotulo: 'Projetos',
    arquiteturaRotulo: 'Arquitetura',
    destaquesRotulo: 'Destaques',
    tecnologiasRotulo: 'Tecnologias',
    itens: [
      {
        nome: 'Projeto Carros',
        tags: ['monólito', 'web'],
        descricao:
          'Aplicação web para cadastro e gestão de veículos, desenvolvida com Python e Django sobre a arquitetura Model-View-Template. Tem controle de acesso e autenticação para proteger as rotas administrativas e operacionais. Oferece filtros dinâmicos para pesquisar veículos por múltiplos critérios e upload de arquivos para guardar as fotografias. A persistência e as regras de negócio ficam com o Django ORM e com formulários de validação estrita.',
        arquitetura: [
          'Templates (HTML5/CSS)',
          'Django Views (MVT)',
          'ModelForms (validação)',
          'Django ORM',
          'Base de dados (PostgreSQL)',
        ],
        destaques: [
          'Backend em Python e Django com padrão MVT, separando apresentação de modelos e regras.',
          'Fluxo de autenticação nativo para restringir acessos e proteger os formulários de edição.',
          'Upload e gestão de arquivos estáticos integrados ao ciclo de vida dos modelos.',
          'Busca e filtragem com queries otimizadas pelo Django ORM.',
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
        meta: 'Python · atualizado set 2026',
        links: [
          {
            rotulo: 'Código do repositório',
            href: 'https://github.com/Jklimaitis/Projeto_Carros',
          },
        ],
      },
      {
        nome: 'home_shopper',
        tags: ['api rest', 'dados'],
        descricao:
          'API assíncrona de catálogo e inteligência de compras em FastAPI e PostgreSQL, organizada em camadas de serviço desacopladas. Processa e extrai dados brutos de cupons fiscais eletrônicos (NFC-e) para montar um histórico comparativo de preços entre lojas. Usa schemas do Pydantic para validar os contratos de entrada e serializar as respostas. Mantém rotinas de teste com pytest para sustentar a estabilidade do pipeline de dados.',
        arquitetura: [
          'Payload NFC-e',
          'FastAPI Routers',
          'Pydantic Schemas',
          'Serviço de ETL',
          'PostgreSQL',
        ],
        destaques: [
          'Arquitetura em camadas com FastAPI e operações de I/O assíncronas.',
          'Pipeline de ETL dedicado à normalização, deduplicação e armazenamento de cupons NFC-e.',
          'Contratos de entrada e saída tipados e validados com Pydantic em toda a borda.',
          'Suíte de testes com pytest cobrindo endpoints e regras de transformação.',
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
            rotulo: 'Repositório público',
            href: 'https://github.com/Jklimaitis/home-shopper',
          },
        ],
        nota: 'versão pública com licença MIT; desenvolvimento principal em repositório privado',
      },
      {
        nome: 'Pimp My Commander',
        tags: ['api rest', 'IA'],
        descricao:
          'Aplicação assíncrona em FastAPI para recomendação e montagem estratégica de decks de Commander, formato de Magic: The Gathering. Integra as APIs do Scryfall, EDHREC e ManaBox para mapear a coleção do jogador e identificar sinergias estatísticas entre cartas. Usa modelos de linguagem para analisar arquétipos e justificar trocas de carta com contexto. Roda em contêineres Docker, o que garante reprodutibilidade do ambiente.',
        arquitetura: [
          'FastAPI Routers',
          'ManaBox Parser',
          'Gateways (Scryfall / EDHREC)',
          'Motor de LLM',
          'Docker',
        ],
        destaques: [
          'Integração externa resiliente com Scryfall, EDHREC e exportações do ManaBox.',
          'Orquestração de LLM para analisar contexto e recomendar substituições de carta.',
          'Contratos de resposta validados de ponta a ponta com Pydantic.',
          'Ambiente conteinerizado com Docker para execução local e em produção.',
        ],
        tecnologias: [
          'Python',
          'FastAPI',
          'Pydantic',
          'Docker',
          'LLM',
          'HTTPX',
          'APIs REST',
        ],
        meta: 'Python · atualizado out 2026',
        links: [
          {
            rotulo: 'Código da API',
            href: 'https://github.com/Jklimaitis/pimp-my-commander',
          },
        ],
      },
      {
        nome: 'Central de Operações',
        tags: ['devops', 'suporte'],
        descricao:
          'Portal local para centralizar procedimentos técnicos, publicar relatórios e acompanhar incidentes operacionais. Tem pesquisa rápida, filtros por severidade e indexação para apoiar equipes técnicas em tempo real. A camada de entrega fica com um proxy reverso em Nginx, com controle de acesso por autenticação básica. A interface em HTML, CSS e JavaScript puro evita dependências pesadas e prioriza carregamento imediato em contingência.',
        arquitetura: [
          'Nginx (proxy e autenticação)',
          'Interface (HTML / CSS / JS)',
          'Serviço em Python',
          'Parser local e logs',
        ],
        destaques: [
          'Camada de borda e segurança com Nginx provendo autenticação básica de usuários.',
          'Frontend em JavaScript puro, pensado para velocidade em cenário de contingência.',
          'Busca local e filtros reativos para achar rotinas e relatórios rápido.',
          'Scripts em Python para ler e consolidar arquivos de incidentes.',
        ],
        tecnologias: [
          'Python',
          'Nginx',
          'HTML5',
          'CSS3',
          'JavaScript',
          'Autenticação básica',
        ],
        meta: 'Python',
        links: [
          {
            rotulo: 'Template público',
            href: 'https://github.com/Jklimaitis/central-operacoes-template',
          },
        ],
        nota: 'template reutilizável, sem histórico; a instalação em uso é privada',
      },
    ],
  },
  github: {
    titulo: 'Atividade no GitHub',
    fallback:
      'Os dados abaixo são carregados no navegador a partir das APIs públicas do GitHub. Sem JavaScript, veja o perfil completo no link.',
    linkPerfil: 'Ver perfil no GitHub',
    carregando: 'Carregando dados do GitHub…',
    indisponivel: 'Dados indisponíveis no momento.',
    limite:
      'Limite de consultas do GitHub atingido. Tente novamente em alguns minutos.',
    listaVazia: 'Nenhum repositório elegível no momento.',
    incompleto: 'Lista parcial: não foi possível concluir a consulta.',
    fonte: 'dados reais · API do GitHub',
    recentes: 'Repositórios atualizados recentemente',
    verTodos: 'Ver todos no GitHub',
    hoje: 'hoje',
    periodo: 'Período',
    repositoriosPublicos: 'repositórios públicos',
    indicadores: {
      contribuicoes: 'contribuições no último ano',
      diasAtivos: 'dias ativos',
      sequenciaAtual: 'sequência atual',
      maiorSequencia: 'maior sequência',
      melhorDia: 'melhor dia',
    },
    semContribuicoes: 'sem contribuições no período',
  },
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
        cargo: 'Especialista em Suporte Técnico Meta Ads',
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
      {
        curso: 'Pós-graduação em Engenharia de Software',
        instituicao: 'Descomplica',
        periodo: 'nov 2025 a nov 2026',
      },
    ],
    cursosTitulo: 'Cursos',
    cursos: [
      {
        nome: 'Python Master (Logic, Django e Integration)',
        instituicao: 'PyCodeBR',
        resumo:
          'Pacote completo que reúne quatro formações: lógica e algoritmos em Python para iniciantes, Django full-stack com APIs e deploy na AWS, IA na prática com LLMs e agentes autônomos, e integração de sistemas com APIs REST e webhooks.',
      },
      {
        nome: 'IA Master',
        instituicao: 'PyCodeBR',
        resumo:
          'Aplicações de IA com LangChain e RAG, criação de agentes autônomos e chatbots integrados a canais como WhatsApp.',
      },
      {
        nome: 'IA Master Elite',
        instituicao: 'PyCodeBR',
        resumo:
          'Mentoria ao vivo por 8 meses, com foco em deploy avançado de IA, observabilidade, arquitetura de agentes e o lado comercial de soluções em IA.',
      },
      {
        nome: 'AI Builders',
        instituicao: 'PyCodeBR',
        resumo:
          'Arquitetar e colocar em produção fluxos complexos de IA, com OpenAI, LangChain, RAG, agentes autônomos e MCP. Inclui Claude Code, Codex e Gemini CLI para planejar e programar sistemas, além da visão de produto: transformar isso em SaaS ou solução corporativa.',
      },
      {
        nome: 'Imersão de Agentes Autônomos',
        instituicao: 'PyCodeBR',
        resumo:
          'Foco em infraestrutura: em vez de só escrever prompts, a estrutura em volta do agente — deploy em VPS Linux, domínio, DNS, Cloudflare e acesso por SSH. O objetivo é operação contínua, com ferramentas conectadas, memória de longo prazo e bases de contexto.',
      },
      {
        nome: 'Workshop FastAPI',
        instituicao: 'PyCodeBR',
        resumo:
          'APIs de alta performance com FastAPI, cobrindo Docker, Kubernetes, testes, CI/CD e deploy escalável na AWS.',
      },
    ],
    idiomasTitulo: 'Idiomas',
    idiomas: [
      { nome: 'Português', nivel: 'nativo', bandeira: 'br' },
      { nome: 'Inglês', nivel: 'fluente', bandeira: 'gb' },
      { nome: 'Espanhol', nivel: 'básico', bandeira: 'es' },
    ],
  },
  contato: {
    titulo: 'Contato',
    texto:
      'Você pode me encontrar no LinkedIn e acompanhar meus projetos no GitHub.',
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
    anosRotulo: 'anos em tecnologia',
    repositorios: 'repositórios públicos',
    contribuicoes: 'contribuições no último ano',
  },
  eventos: {
    rotulo: 'Atividade recente',
    carregando: 'Carregando atividade…',
    indisponivel: 'Atividade indisponível agora.',
    push: 'push',
    criou: 'criou',
  },
  rodape: 'Portfólio de Jonas Klimaitis.',
  meses: [
    'jan',
    'fev',
    'mar',
    'abr',
    'mai',
    'jun',
    'jul',
    'ago',
    'set',
    'out',
    'nov',
    'dez',
  ],
};
