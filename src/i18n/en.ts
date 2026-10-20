import type { Dicionario } from './types';

export const en: Dicionario = {
  idioma: 'en',
  titulo: 'Portfolio · Jonas Klimaitis',
  troca: { rotulo: 'PT', href: '/', idioma: 'pt-BR', rotuloAcessivel: 'Mudar para português' },
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
      { rotulo: 'GitHub', href: 'https://github.com/Jklimaitis', variante: 'ghost' },
    ],
  },
  stack: {
    titulo: 'What I work with',
    grupos: [
      { nome: 'Backend', itens: ['Python', 'FastAPI', 'Django', 'REST APIs', 'JWT with refresh', 'bcrypt with pepper'] },
      { nome: 'Architecture', itens: ['layered architecture', 'SOLID', 'Clean Code', 'decoupled services'] },
      { nome: 'Data', itens: ['PostgreSQL', 'MySQL', 'Oracle', 'SQL', 'relational modeling'] },
      { nome: 'Infrastructure and DevOps', itens: ['Docker', 'Linux (WSL and Ubuntu)', 'Git and GitHub', 'systemd', 'nginx', 'Proxmox'] },
      { nome: 'Testing and quality', itens: ['pytest', 'API testing', 'code review', 'verification by execution'] },
      { nome: 'Other languages', itens: ['Java', 'JavaScript', 'Node.js', 'React', 'Bash'] },
      { nome: 'Automation and AI', itens: ['process automation', 'API integration', 'agent orchestration', 'multi-agent on Slack', 'LLM as an engineering tool'] },
    ],
    estudoTitulo: 'Learning',
    estudo: ['OAuth2', 'MongoDB', 'AWS', 'microservices', 'TDD', 'UiPath'],
  },
  projetos: { titulo: 'Projects', provisorio: 'Under construction.' },
  github: { titulo: 'GitHub activity', provisorio: 'Under construction.' },
  trajetoria: { titulo: 'Journey', provisorio: 'Under construction.' },
  contato: { titulo: 'Contact', provisorio: 'Under construction.' },
  rodape: 'Portfolio of Jonas Klimaitis.',
};
