export type CasoResumo = {
  slug: string;
  titulo: string;
  resumo: string;
  tags: string[];
  href: string;
};

export const casosPt: CasoResumo[] = [
  {
    slug: 'multiagent-lab',
    titulo: 'Operar cinco agentes 24/7',
    resumo:
      'Um coordenador e quatro especialistas rodando em container, com estado isolado, gate de evidência e backup que passa por restore.',
    tags: ['orquestração', '5 perfis', 'Proxmox'],
    href: '/casos/multiagent-lab/',
  },
];

export const casosEn: CasoResumo[] = [
  {
    slug: 'multiagent-lab',
    titulo: 'Running five agents 24/7',
    resumo:
      'One coordinator and four specialists in a container, with isolated state, an evidence gate and a backup that is verified by restoring it.',
    tags: ['orchestration', '5 profiles', 'Proxmox'],
    href: '/en/casos/multiagent-lab/',
  },
];
