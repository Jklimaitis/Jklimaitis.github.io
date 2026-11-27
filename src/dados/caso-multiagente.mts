export type Bloco = {
  titulo: string;
  paragrafos: string[];
  lista?: { titulo: string; texto: string }[];
  diagrama?: boolean;
};

export type Caso = {
  idioma: string;
  titulo: string;
  lead: string;
  meta: string[];
  voltar: { href: string; rotulo: string };
  marca: string;
  troca: { href: string; rotulo: string; rotuloAcessivel: string };
  blocos: Bloco[];
  fecho: { titulo: string; texto: string };
};

export const casoPt: Caso = {
  idioma: 'pt-BR',
  titulo: 'Operar cinco agentes 24/7',
  lead: 'Notas de um laboratório de orquestração: várias IAs especializadas trabalhando em paralelo, sem se atropelar e sem inventar estado.',
  meta: ['2026', 'Laboratório pessoal', 'Proxmox · Slack · systemd'],
  voltar: { href: '/', rotulo: 'Voltar ao portfólio' },
  marca: 'Jonas Klimaitis',
  troca: {
    href: '/en/casos/multiagent-lab/',
    rotulo: 'EN',
    rotuloAcessivel: 'Read this case in English',
  },
  blocos: [
    {
      titulo: 'O problema',
      paragrafos: [
        'Meu trabalho de engenharia estava espalhado entre máquinas, perfis e sessões de agente, sem um registro de quem fez o quê e sem nenhuma forma de provar que uma entrega estava de fato pronta. O que eu queria era simples de enunciar e chato de construir: várias IAs especializadas trabalhando em paralelo, sem se atropelar e sem inventar estado.',
      ],
    },
    {
      titulo: 'A arquitetura',
      diagrama: true,
      paragrafos: [
        'Um container LXC no Proxmox (Ubuntu 24.04, 8 GB) hospeda o cérebro: sessões, memórias, skills e a base de conhecimento. Cinco perfis rodam ali — um coordenador e quatro especialistas (backend, produto, frontend e processo), cada um com banco de estado, memórias e skills próprios.',
        'A entrada é por Slack, Telegram e Discord. O trabalho anda num Kanban: o worker entrega a mudança não commitada, e o merge é uma etapa separada, explicitamente autorizada.',
      ],
    },
    {
      titulo: 'Três decisões e o preço de cada uma',
      paragrafos: [],
      lista: [
        {
          titulo: 'Estado separado por perfil',
          texto:
            'Compartilhar um único banco entre os perfis seria mais simples de operar — e produziria um agente que "lembra" contexto alheio, sem como separar o dado de um do dado de outro. O custo foi operacional: cinco lugares para atualizar, cinco backups a conferir.',
        },
        {
          titulo: 'Um único coordenador despacha',
          texto:
            'Deixar qualquer agente abrir card parece mais ágil e produz duas execuções concorrentes sobre o mesmo repositório — que é como se perde trabalho de duas horas. O custo é fila e latência.',
        },
        {
          titulo: 'Nada conta como entregue sem evidência',
          texto:
            'Arquivo no disco, linha de log ou saída de comando. O custo é rejeitar entrega que "parece pronta" — e foi exatamente isso que pegou três vezes.',
        },
      ],
    },
    {
      titulo: 'O que quebrou',
      paragrafos: [],
      lista: [
        {
          titulo: 'Restart que se matava',
          texto:
            'Reiniciar o gateway de dentro da própria árvore de processos não funciona: o SIGTERM se propaga e mata quem ia executar o restart. A solução foi um timer oneshot com 90 segundos de atraso, rodando fora da árvore — tempo para a resposta sair antes de o processo cair.',
        },
        {
          titulo: 'Script em diretório temporário',
          texto:
            'O script desse restart morava no diretório de rascunho, que é podado a cada 24 horas. O restart teria falhado em silêncio semanas depois, sem ninguém ligar uma coisa à outra. Ele passou para o diretório persistente.',
        },
        {
          titulo: 'Backup que parecia pronto',
          texto:
            'O comando de snapshot aceitava um destino e não gerava arquivo; e o pacote não incluía o diretório de projetos, então dados reais ficavam de fora. A rotina passou a falhar quando um arquivo esperado não está no pacote, em vez de seguir adiante.',
        },
      ],
    },
    {
      titulo: 'Como eu sei que funciona',
      paragrafos: [
        'O backup é cifrado com chave que só existe na outra máquina, e a verificação é restaurar: decifrar em diretório temporário e rodar a verificação de integridade do banco.',
        'A conferência vai além do "abriu": conta sessões, mensagens e registros do arquivo restaurado e compara com o esperado. No boot, o gateway sobe sem restarts e as conexões aparecem como estabelecidas no log — não por "deve ter subido".',
      ],
    },
  ],
  fecho: {
    titulo: 'O que eu faria diferente',
    texto:
      'Teria desenhado o backup no primeiro dia, e não depois de perceber que nunca havia testado um restore. Um sistema que você não restaurou é uma hipótese, não um backup.',
  },
};

export const casoEn: Caso = {
  idioma: 'en',
  titulo: 'Running five agents 24/7',
  lead: 'Notes from an orchestration lab: several specialised AIs working in parallel, without stepping on each other and without inventing state.',
  meta: ['2026', 'Personal lab', 'Proxmox · Slack · systemd'],
  voltar: { href: '/en/', rotulo: 'Back to portfolio' },
  marca: 'Jonas Klimaitis',
  troca: {
    href: '/casos/multiagent-lab/',
    rotulo: 'PT',
    rotuloAcessivel: 'Ler este caso em português',
  },
  blocos: [
    {
      titulo: 'The problem',
      paragrafos: [
        'My engineering work was spread across machines, agent profiles and sessions, with no record of who did what and no way to prove that a delivery was actually finished. What I wanted was easy to state and annoying to build: several specialised agents working in parallel, without stepping on each other and without inventing state.',
      ],
    },
    {
      titulo: 'The architecture',
      diagrama: true,
      paragrafos: [
        'One LXC container on Proxmox (Ubuntu 24.04, 8 GB) holds the brain: sessions, memories, skills and the knowledge base. Five profiles run there — a coordinator and four specialists (backend, product, frontend and process), each with its own state database, memories and skills.',
        'Work arrives through Slack, Telegram and Discord, and moves on a Kanban board: a worker delivers an uncommitted change, and merging is a separate, explicitly authorised step.',
      ],
    },
    {
      titulo: 'Three decisions, and what each one cost',
      paragrafos: [],
      lista: [
        {
          titulo: 'Separate state per profile',
          texto:
            "Sharing one database across profiles would be simpler to operate, and it would produce an agent that \"remembers\" someone else's context with no way to tell one profile's data from another's. The price was operational: five places to update, five backups to verify.",
        },
        {
          titulo: 'One coordinator dispatches',
          texto:
            'Letting any agent open a card looks faster and produces two concurrent runs against the same repository — which is how two hours of work get lost. The price is queueing and latency.',
        },
        {
          titulo: 'Nothing counts as delivered without evidence',
          texto:
            'A file on disk, a log line, or command output. The price is rejecting work that "looks done" — and that is precisely what caught me three times.',
        },
      ],
    },
    {
      titulo: 'What broke',
      paragrafos: [],
      lista: [
        {
          titulo: 'A restart that killed itself',
          texto:
            'Restarting the gateway from inside its own process tree does not work: SIGTERM propagates and kills the process that was going to perform the restart. The fix was a one-shot timer with a 90-second delay, running outside the tree — long enough for the reply to leave before the process goes down.',
        },
        {
          titulo: 'A script in a temporary directory',
          texto:
            'That restart script lived in the scratch directory, which is pruned every 24 hours. The restart would have failed silently weeks later, with nobody connecting the two facts. It moved to a persistent path.',
        },
        {
          titulo: 'A backup that only looked ready',
          texto:
            'The snapshot command accepted a destination and produced no file, and the package left the projects directory out, so real data was missing. The routine now fails when an expected file is absent from the package instead of moving on.',
        },
      ],
    },
    {
      titulo: 'How I know it works',
      paragrafos: [
        'The backup is encrypted with a key that exists only on the other machine, and verification means restoring: decrypt into a temporary directory and run an integrity check on the database.',
        'The check goes past "it opened": it counts sessions, messages and records inside the restored file and compares them with what was expected. After a boot, the gateway comes up with no restarts and the connections show as established in the log — not "it should have started".',
      ],
    },
  ],
  fecho: {
    titulo: 'What I would do differently',
    texto:
      'I would have designed the backup on day one, instead of after realising I had never tested a restore. A system you have not restored is a hypothesis, not a backup.',
  },
};
