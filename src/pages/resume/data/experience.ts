export type Skills = {
  programming_languages: string[],
  frontend: string[],
  backend: string[],
  database: string[],
  ai_machine_learning_engineering: string[],
  tools_platforms: string[],
  concepts: string[],
  soft_skills: string[],
  others: string[],
}

export type WorkItem = {
  title: string,
  content: string,
  prompts?: string,
}

export type ExperienceItem = {
  company: string,
  department: string,
  position: string,
  location?: string,
  startDate: string,
  endDate: string,
  type: 'fullstack' | 'AI' | 'early career',
  works: WorkItem[],
}

export type ProjectItem = {
  name: string,
  startDate: string,
  endDate: string,
  type: 'fullstack' | 'AI',
  role: string,
  details: string[],
}

export type ResumeVariant = 'fullstack' | 'ai' | 'frontend';

export type Experience = {
  skills: Skills,
  experiences: ExperienceItem[],
  projects: ProjectItem[]
}

export const experience: Experience = {
  skills: {
    programming_languages: ["JavaScript", "TypeScript", "Kotlin", "Swift", "Python", "C/C++"],
    frontend: ['React', 'Next.js', 'Kotlin Multiplatform', 'SwiftUI', 'Jetpack Compose', 'Vue2/Vue3', 'Web Components', 'Micro Frontend', 'Tailwind CSS', 'CSS-in-JS'],
    backend: ['Node.js', 'Microservices', 'REST', 'GraphQL', 'gRPC', 'Kafka', 'Message Queue'],
    database: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'SQL Server'],
    ai_machine_learning_engineering: ['Coding Agents (Claude Code, Codex)', 'Agent Harness & Guardrails', 'MCP Server', 'Context Engineering', 'Ollama', 'RAG', 'Embeddings', 'LangChain'],
    tools_platforms: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Vite', 'webpack', 'Turborepo', 'CI/CD', 'Playwright', 'Vitest', 'Git'],
    concepts: ['Micro-frontend Architecture', 'Distributed Systems', 'System Design', 'Performance Optimization', 'Scalability', 'Data Security'],
    soft_skills: ['Problem-Solving', 'Collaboration', 'Innovation'],
    others: ['Unit Testing', 'E2E Testing', 'HTTP/2', 'WebSocket', 'TCP/IP', 'Linux', 'Design Patterns', 'Code Review'],
  },
  experiences: [
    {
      company: 'Sekai',
      department: 'Mobile & Web',
      position: 'Head of Mobile & Web Engineering',
      startDate: '2026.05',
      endDate: 'Present',
      type: 'fullstack',
      works: [{
        title: 'Built Guy, letting any employee ship app/web changes from Slack',
        content: 'PMs and designers ask; agents build, Mac mini simulators verify, humans approve. 270+ Tasks shipped.',
      },
      {
        title: 'Built agent context and guardrails',
        content: 'knowledge index, Task lifecycle, per-Task worktrees, fail-closed checks and Slack approvals.',
      },
      {
        title: 'Led Flutter → native iOS/Android migration on Kotlin Multiplatform',
        content: '80+ releases in 4 months; D1 retention +23% on Android (30% → 37%) and +18% on iOS (40% → 47%).',
      },
      {
        title: 'Cut crash rate to 0.4%',
        content: 'under half of Google Play\'s 1.09% bad-behavior threshold, via device-proof CI gates and an LLM crash-triage agent.',
      },
      {
        title: 'Modernizing the sekai.ai web app (Next.js, React 19)',
        content: 'authored 25 of 39 ADRs.',
      }]
    },
    {
      company: 'Microsoft',
      department: 'Azure Data',
      position: 'SDE II',
      startDate: '2022.01',
      endDate: '2024.08',
      type: 'fullstack',
      works: [{
        title: 'Built core Microsoft Fabric apps',
        content: 'Notebook, Spark Job and Runtime Settings for thousands of enterprise customers; added LLM code completion.',
      },
      {
        title: 'Led the monorepo migration (pnpm + Turborepo, 50+ packages)',
        content: 'and moved to Vite, cutting dev startup from 40 s to 2 s.',
      },
      {
        title: 'Raised test coverage to 80%',
        content: 'and built real-time alerting, cutting production incidents.',
      },
      {
        title: 'Cut CI/CD from 2 h to 20 min',
        content: 'with a Git-diff + TypeScript AST impact tool adopted across the org.',
      }]
    },
    {
      company: 'ByteDance',
      department: 'Education',
      position: 'Fullstack Engineer',
      startDate: '2020.04',
      endDate: '2021.12',
      type: 'fullstack',
      works: [{
        title: 'Owned Formula Kit end-to-end',
        content: 'editor, renderer and backend; patented a formula line-breaking algorithm.',
      },
      {
        title: 'Raised throughput 50% during a traffic spike',
        content: 'via multi-threading on auto-scaling FaaS.',
      }],
    },
    {
      company: 'Join-Cheer Software Ltd.',
      department: 'BigData',
      position: 'Fullstack Engineer',
      startDate: '2017.02',
      endDate: '2020.04',
      type: 'early career',
      works: [{
        title: "",
        content: "Built the company's first micro-frontend and a shared Vue library for 20+ teams.",
      }],
    }],
  projects: [
    {
      name: 'AI Chatbot For Agriculture (Open Source)',
      startDate: '2025.05',
      endDate: '2025.09',
      type: 'AI',
      role: 'Tech Lead & Main Contributor',
      details: [
        'Agricultural Q&A agent: Ollama + RAG, live PostgreSQL via MCP, image and voice I/O.',
        'Self-hosted deepseek-r1:32b and qwen2.5-VL:32b on A100 GPUs.',
      ]
    },
    {
      name: 'Security Evaluation Platform for AI-Generated Code',
      startDate: '2025.01',
      endDate: '2025.05',
      type: 'AI',
      role: 'Research Assistant',
      details: [
        'RAG (Qdrant + Ollama) over OWASP/CWE rules to flag vulnerabilities in AI-generated code, with custom benchmarks.',
      ]
    },
  ],
}
