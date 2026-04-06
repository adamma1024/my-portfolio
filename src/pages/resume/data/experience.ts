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
    programming_languages: ["JavaScript", "TypeScript", "Python", "C/C++"],
    frontend: ['React', 'Vue2/Vue3', 'Web Components', 'Micro Frontend', 'Tailwind CSS', 'CSS-in-JS'],
    backend: ['Node.js', 'Microservices', 'REST', 'GraphQL', 'gRPC', 'Kafka', 'Message Queue'],
    database: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'SQL Server'],
    ai_machine_learning_engineering: ['Ollama', 'RAG', 'MCP Server', 'Embeddings', 'LangChain'],
    tools_platforms: ['Docker', 'Kubernetes', 'AWS', 'Azure', 'Vite', 'webpack', 'Turborepo', 'CI/CD', 'Playwright', 'Vitest', 'Git'],
    concepts: ['Micro-frontend Architecture', 'Distributed Systems', 'System Design', 'Performance Optimization', 'Scalability', 'Data Security'],
    soft_skills: ['Problem-Solving', 'Collaboration', 'Innovation'],
    others: ['Unit Testing', 'E2E Testing', 'HTTP/2', 'WebSocket', 'TCP/IP', 'Linux', 'Design Patterns', 'Code Review'],
  },
  experiences: [
    {
      company: 'Microsoft',
      department: 'Azure Data',
      position: 'SDE II',
      startDate: '2022.01',
      endDate: '2024.08',
      type: 'fullstack',
      works: [{
        title: 'Built several core web apps for Microsoft Fabric (React, TypeScript)',
        content: '— Notebook, Spark Job Definition, and Runtime Settings — used daily by thousands of enterprise customers. Also added AI features to the Notebook: code completion and natural-language-to-code, both powered by LLM APIs.',
      },
      {
        title: 'Set up the team\'s monitoring and testing infrastructure from scratch.',
        content: 'This included real-time alerting dashboards (tracking performance and user behavior) and a push to get unit + E2E test coverage to 80%, which noticeably cut down production incidents.',
      },
      {
        title: 'Cut our CI/CD pipeline from ~2 hours down to 20 minutes.',
        content: 'I wrote a tool that parses Git diffs using TypeScript AST analysis to figure out which modules actually changed, so the pipeline only runs what\'s needed. Several teams across the org adopted it.',
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
        title: 'Owned the Formula Kit end-to-end — editor, renderer, and backend (React, Node.js, Python).',
        content: 'The editor used Monaco for syntax highlighting and supported LaTeX input via keyboard, OCR, and plain text. I also wrote a custom line-breaking algorithm for formula rendering, which we filed as a patent.',
      },
      {
        title: 'Improved system throughput by about 50% during a traffic spike.',
        content: 'The fix involved moving to a multi-threaded architecture and deploying on a FaaS platform so we could scale horizontally without manual intervention.',
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
        content: "Introduced the company's first micro-frontend setup and built a shared Vue component library. Before that, 20+ teams were each doing their own thing — this gave everyone a common UI foundation and cut way down on integration headaches.",
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
        'Built a conversational AI agent for agricultural Q&A. It runs Ollama with RAG for better accuracy and connects directly to PostgreSQL via MCP for live data queries.',
        'Added multimodal input — users can upload images, record voice, and get spoken responses back. Used LangChain for managing conversation history. The whole thing is modular so each capability is a separate component.',
        'Deployed deepseek-r1:32b and qwen2.5-VL:32b on A100 GPUs locally for faster inference.',
      ]
    },
    {
      name: 'Security Evaluation Platform for AI-Generated Code',
      startDate: '2025.01',
      endDate: '2025.05',
      type: 'AI',
      role: 'Research Assistant',
      details: [
        'Built a tool to catch security issues in AI-generated code. The system uses RAG with Qdrant as the vector store and runs LLMs locally via Ollama. I fed it security rules from OWASP and CWE as the knowledge base, then created evaluation benchmarks to measure how well it actually catches vulnerabilities in C, Python, and JavaScript.',
      ]
    },
  ],
}
