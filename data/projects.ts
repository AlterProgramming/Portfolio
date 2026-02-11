export type ProjectLinkLabel = 'Live' | 'GitHub' | 'Demo' | 'Writeup'

export type Project = {
  id: string
  title: string
  outcome: string
  tags: string[]
  links?: { label: ProjectLinkLabel; href: string }[]
  status?: 'Refining' | 'Stable' | 'Prototype'
}

export const projects: Project[] = [
  {
    id: 'showdown-agent',
    title: 'Pokémon Showdown Agent',
    outcome:
      'Learns legal actions from battle state and selects moves under uncertainty.',
    tags: ['State vectorization', 'Policy head', 'Dataset ingestion'],
    links: [
      { label: 'GitHub', href: '#' },
      { label: 'Writeup', href: '#' },
    ],
    status: 'Refining',
  },
  {
    id: 'resume-ranker',
    title: 'Resume Ranker',
    outcome:
      'Scores candidate resumes against role requirements to accelerate hiring decisions.',
    tags: ['Next.js', 'TypeScript', 'OpenAI API'],
    links: [
      { label: 'Demo', href: '#' },
      { label: 'GitHub', href: '#' },
    ],
    status: 'Stable',
  },
  {
    id: 'portfolio-v1',
    title: 'Portfolio v1',
    outcome:
      'Introduces a token-driven design system for a cleaner and more maintainable UI.',
    tags: ['Design tokens', 'Accessibility', 'CSS architecture'],
    links: [{ label: 'Live', href: '#' }],
    status: 'Prototype',
  },
]
