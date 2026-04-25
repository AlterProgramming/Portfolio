export type ProjectLinkLabel = 'Live' | 'Demo' | 'Writeup' | 'Route'

export type Project = {
  id: string
  title: string
  outcome: string
  highlights: string[]
  tags: string[]
  links?: { label: ProjectLinkLabel; href: string }[]
  status?: 'Refining' | 'Stable' | 'Prototype'
  artifactNote?: string
  artifactLabel: string
  artifactGradient: [string, string]
}

export const projects: Project[] = [
  {
    id: 'showdown-agent',
    title: 'Pokemon App',
    outcome: 'Public route for the Pokemon battle product and active model-backed experience.',
    highlights: [
      'Uses a single production route so visitors land directly on the intended product.',
      'Keeps battle UX, flow, and deployment behavior aligned with ongoing model work.',
      'Acts as the primary launch destination from the root portfolio hub.',
    ],
    tags: ['Pokemon', 'Battle UX', 'Live Route'],
    links: [{ label: 'Route', href: 'https://battle.jakpakoun.com' }],
    status: 'Refining',
    artifactNote: 'Primary launch route: battle.jakpakoun.com',
    artifactLabel: 'Pokemon live route',
    artifactGradient: ['#fff1c8', '#ffe4e6'],
  },
  {
    id: 'command-center',
    title: 'Agent Command Center',
    outcome: 'Local operations workspace for capture, device workflows, media launchers, and state.',
    highlights: [
      'Keeps internal tooling local instead of over-expanding public endpoints.',
      'Maintains durable state files for fast inspection, audit, and handoff.',
      'Packages reusable scripts for Roku launch and browser proxy investigation.',
    ],
    tags: ['Local Tools', 'Proxy Capture', 'Workflow UI'],
    links: [{ label: 'Writeup', href: '#routes' }],
    status: 'Stable',
    artifactNote: 'Local-first project surface, not a public login endpoint.',
    artifactLabel: 'Control surface',
    artifactGradient: ['#dbeafe', '#f8fafc'],
  },
  {
    id: 'portfolio-v1',
    title: 'Portfolio Hub',
    outcome: 'Navigation-first root surface for launches, repositories, and project context.',
    highlights: [
      'Presents the root as a clear launch map instead of a single-project landing page.',
      'Keeps secondary archive routes visible without competing with current product routes.',
      'Uses static export so deployment stays simple and reliable on existing infrastructure.',
    ],
    tags: ['Next.js Export', 'Project Navigation', 'Static Deploy'],
    links: [{ label: 'Live', href: 'https://jakpakoun.com' }],
    status: 'Prototype',
    artifactNote: 'Root target: jakpakoun.com',
    artifactLabel: 'Hub root',
    artifactGradient: ['#ffe8cc', '#f8fafc'],
  },
]
