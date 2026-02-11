export type ProjectLinkLabel = 'Live' | 'GitHub' | 'Demo' | 'Writeup'

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
    title: 'Pokémon Showdown Agent',
    outcome:
      'Learns legal actions from battle state and selects strong moves under uncertainty.',
    highlights: [
      'Encodes battle context into a compact decision-ready state vector.',
      'Constrains action selection to legal moves and switches each turn.',
      'Improves consistency through replay-driven training data ingestion.',
    ],
    tags: ['State Vectorization', 'Policy Head', 'Dataset Ingestion'],
    links: [
      { label: 'GitHub', href: '#' },
      { label: 'Writeup', href: '#' },
    ],
    status: 'Refining',
    artifactNote: 'Artifact focus: policy confidence overlays during turn resolution.',
    artifactLabel: 'Battle policy viewer',
    artifactGradient: ['#ede9fe', '#ffffff'],
  },
  {
    id: 'resume-ranker',
    title: 'Resume Ranker',
    outcome:
      'Scores candidate resumes against role requirements to accelerate hiring decisions.',
    highlights: [
      'Extracts skill signals from CV text and job criteria in one scoring pass.',
      'Ranks candidate fit with transparent weighted components.',
      'Surfaces concise rationale snippets to support recruiter review.',
    ],
    tags: ['Next.js', 'TypeScript', 'OpenAI API'],
    links: [
      { label: 'Demo', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
    status: 'Stable',
    artifactNote: 'Artifact focus: side-by-side role rubric and candidate score breakdown.',
    artifactLabel: 'Ranking dashboard',
    artifactGradient: ['#e8f7ee', '#ffffff'],
  },
  {
    id: 'portfolio-v1',
    title: 'Portfolio v1',
    outcome:
      'Introduces a token-driven design system for a calmer and more maintainable UI.',
    highlights: [
      'Defines clear separation of page background, surfaces, and edge borders.',
      'Uses constrained accent behavior to preserve visual hierarchy.',
      'Aligns interaction patterns across cards, links, and keyboard focus.',
    ],
    tags: ['Design Tokens', 'Accessibility', 'CSS Architecture'],
    links: [{ label: 'Live', href: '#' }],
    status: 'Prototype',
    artifactNote: 'Artifact focus: modular viewer built for single-project deep scanning.',
    artifactLabel: 'Interface system preview',
    artifactGradient: ['#fff4ea', '#ffffff'],
  },
]
