import type { Lang } from "@/lib/lang";

export type L10n = Record<Lang, string>;
export type Accent =
  | "rosewater" | "flamingo" | "pink" | "mauve" | "red" | "maroon" | "peach"
  | "yellow" | "green" | "teal" | "sky" | "sapphire" | "blue" | "lavender";
export const ACCENTS: readonly Accent[] = [
  "rosewater", "flamingo", "pink", "mauve", "red", "maroon", "peach",
  "yellow", "green", "teal", "sky", "sapphire", "blue", "lavender",
];

export type Link = { label: L10n; href: string };
export type EntryKind = "job" | "venture" | "edu" | "project";
export type SkillGroup = "client" | "ai" | "infra";
export type Product = { id: string; name: string; status: "live" | "building" | "oss"; platform: L10n; blurb: L10n; links: Link[] };
export type Entry = {
  id: string;
  kind: EntryKind;
  color: Accent;
  from: string;
  to: string;
  short: L10n;
  org: L10n;
  title: L10n;
  team: L10n;
  points: Record<Lang, string[]>;
  uses: string[];
  links: Link[];
  products?: Product[];
};
export type Skill = { id: string; name: L10n; group: SkillGroup };

const same = (s: string): L10n => ({ en: s, zh: s });

export const EMAIL = "adamma2048@gmail.com";
export const SITE = "https://www.adamma.me";
export const SOCIAL = [
  { key: "resume", href: "/resume", text: "adamma.me/resume", internal: true },
  { key: "blog", href: `${SITE}/blog/`, text: "adamma.me/blog", internal: false },
  { key: "github", href: "https://github.com/adamma1024", text: "github.com/adamma1024", internal: false },
] as const;

export const SKILLS: Skill[] = [
  { id: "kotlin", name: same("Kotlin"), group: "client" },
  { id: "kmp", name: same("Kotlin Multiplatform"), group: "client" },
  { id: "swift", name: same("Swift / SwiftUI"), group: "client" },
  { id: "compose", name: same("Jetpack Compose"), group: "client" },
  { id: "rn", name: same("React Native"), group: "client" },
  { id: "ts", name: same("TypeScript"), group: "client" },
  { id: "vue", name: same("Vue"), group: "client" },
  { id: "mfe", name: { en: "Micro-frontends", zh: "微前端" }, group: "client" },
  { id: "editor", name: { en: "Editors & rendering", zh: "编辑器与渲染" }, group: "client" },
  { id: "agents", name: same("Coding agents"), group: "ai" },
  { id: "mcp", name: same("MCP servers"), group: "ai" },
  { id: "ctx", name: same("Context engineering"), group: "ai" },
  { id: "llm", name: same("LLMs"), group: "ai" },
  { id: "rag", name: same("RAG"), group: "ai" },
  { id: "ollama", name: same("Ollama"), group: "ai" },
  { id: "qdrant", name: same("Qdrant"), group: "ai" },
  { id: "pg", name: same("PostgreSQL"), group: "infra" },
  { id: "supabase", name: same("Supabase"), group: "infra" },
  { id: "turbo", name: same("pnpm + Turborepo"), group: "infra" },
  { id: "vite", name: same("Vite"), group: "infra" },
  { id: "testing", name: { en: "Testing", zh: "测试" }, group: "infra" },
  { id: "cicd", name: same("CI/CD"), group: "infra" },
  { id: "faas", name: same("FaaS"), group: "infra" },
];

export const ENTRIES: Entry[] = [
  {
    id: "sekai", kind: "job", color: "mauve", from: "2026.05", to: "present",
    short: same("Sekai"), org: same("Sekai"), title: { en: "Head of Client Engineering", zh: "客户端工程负责人" }, team: same("Client Engineering"),
    uses: ["kotlin", "kmp", "swift", "compose", "agents", "mcp", "ctx", "llm", "cicd"],
    points: {
      en: [
        "Built Guy: anyone on the team ships app and web changes from Slack. Agents build, simulators verify, humans approve. 270+ tasks shipped.",
        "Built agent context and guardrails: knowledge index, task lifecycle, per-task worktrees, fail-closed checks.",
        "Led the Flutter → native iOS/Android migration on Kotlin Multiplatform. 80+ releases in 4 months; D1 retention +23% on Android, +18% on iOS.",
        "Cut the crash rate to 0.4% with device-proof CI gates and an LLM crash-triage agent.",
      ],
      zh: [
        "搭建 Guy：任何人都能在 Slack 里发布 App / Web 改动。Agent 开发，模拟器验证，人工审批；已交付 270+ 个 Task。",
        "搭建 Agent 上下文与护栏体系：知识索引、Task 生命周期、每个 Task 独立 worktree、fail-closed 检查。",
        "主导基于 Kotlin Multiplatform 的 Flutter → 原生 iOS / Android 迁移。4 个月发布 80+ 个版本；次日留存 Android +23%，iOS +18%。",
        "崩溃率降至 0.4%：靠真机验证的 CI 门禁和 LLM 崩溃分诊 Agent。",
      ],
    },
    links: [
      { label: same("sekai.ai"), href: "https://sekai.ai" },
      { label: same("Sekai MCP"), href: "https://sekai.ai/mcp" },
      { label: { en: "Series A led by Khosla · Axios", zh: "Khosla 领投 A 轮 · Axios" }, href: "https://www.axios.com/2026/06/01/sekai-mini-app-startup-funding" },
    ],
  },
  {
    id: "dreamrealized", kind: "venture", color: "lavender", from: "2025.05", to: "present",
    short: same("DreamRealized"), org: same("DreamRealized Tech LLC"), title: { en: "Founder", zh: "创始人" }, team: { en: "Turning ideas into AI products", zh: "用 AI 把想法做成产品" },
    uses: ["rn", "swift", "supabase", "pg", "rag", "ollama", "mcp", "llm"],
    points: {
      en: [
        "Founded DreamRealized Tech LLC to turn ideas into shipped AI products.",
        "Gradpazz: a campus and city marketplace for students, live on the App Store. Expo, React Native, Supabase and PostGIS; bilingual.",
        "Amber: a Mac and iOS planner that reads and writes an Obsidian vault through GitHub, with no server. Signed, notarized, on Homebrew.",
        "Agriculture Chatbot (open source): Ollama + RAG agent with live PostgreSQL via MCP, plus image and voice I/O.",
      ],
      zh: [
        "创立 DreamRealized Tech LLC，用 AI 把想法做成上线的产品。",
        "Gradpazz：面向学生的校园与城市资源平台，已上架 App Store。Expo、React Native、Supabase、PostGIS；中英双语。",
        "Amber：通过 GitHub 直接读写 Obsidian vault 的 Mac / iOS 计划 app，无服务器。已签名公证，可用 Homebrew 安装。",
        "Agriculture Chatbot（开源）：Ollama + RAG 农业问答 Agent，通过 MCP 实时查询 PostgreSQL，支持图片与语音。",
      ],
    },
    links: [
      { label: same("dreamrealized.net"), href: "https://dreamrealized.net" },
      { label: { en: "GitHub org", zh: "GitHub 组织" }, href: "https://github.com/DreamRealized" },
    ],
    products: [
      { id: "gradpazz", name: "Gradpazz", status: "live", platform: same("iOS"),
        blurb: { en: "Campus and city marketplace for students: secondhand, rentals, nearby.", zh: "面向学生的校园与城市资源平台：二手、租房、附近。" },
        links: [{ label: same("App Store"), href: "https://apps.apple.com/us/app/gradpazz/id6761963554" }, { label: same("gradpass.site"), href: "https://gradpass.site" }] },
      { id: "amber", name: "Amber", status: "live", platform: same("macOS · iOS"),
        blurb: { en: "A planner that lives in your Obsidian vault. One highlight a day, no server.", zh: "住在 Obsidian vault 里的计划 app。每天一件要事，无服务器。" },
        links: [{ label: { en: "Releases", zh: "下载" }, href: "https://github.com/DreamRealized/amber-releases" }] },
      { id: "wooto", name: "Wooto", status: "building", platform: { en: "Mac first", zh: "Mac 优先" },
        blurb: { en: "An AI creative studio and community for games, stories, images and music.", zh: "AI 创作工作室与社区：游戏、故事、图像、音乐。" },
        links: [] },
      { id: "agri", name: "Agriculture Chatbot", status: "oss", platform: same("Web"),
        blurb: { en: "LLM assistant for farmers: RAG, image and voice in, Mandarin voice out.", zh: "面向农户的 LLM 助手：RAG、图片与语音输入、普通话语音输出。" },
        links: [{ label: same("GitHub"), href: "https://github.com/DreamRealized/agriculture-chatbot" }] },
    ],
  },
  {
    id: "microsoft", kind: "job", color: "blue", from: "2022.01", to: "2024.08",
    short: { en: "Microsoft", zh: "微软" }, org: { en: "Microsoft", zh: "微软" }, title: same("SDE II"), team: same("Azure Data"),
    uses: ["ts", "turbo", "vite", "testing", "cicd", "llm"],
    points: {
      en: [
        "Built core Microsoft Fabric apps (Notebook, Spark Job, Runtime Settings) and added LLM code completion.",
        "Led the monorepo move to pnpm + Turborepo (50+ packages) and Vite: dev startup from 40 s to 2 s.",
        "Cut CI/CD from 2 h to 20 min with a Git-diff + TypeScript AST impact tool.",
        "Raised test coverage to 80% and built real-time alerting.",
      ],
      zh: [
        "开发 Microsoft Fabric 核心应用（Notebook、Spark Job、Runtime Settings），并接入 LLM 代码补全。",
        "主导 monorepo 迁移（pnpm + Turborepo，50+ 个包）并迁到 Vite：本地启动从 40 秒降到 2 秒。",
        "自研 Git diff + TypeScript AST 影响分析工具，CI/CD 从 2 小时缩短到 20 分钟。",
        "测试覆盖率提升至 80%，并搭建实时告警。",
      ],
    },
    links: [
      { label: same("Microsoft Fabric"), href: "https://www.microsoft.com/en-us/microsoft-fabric" },
      { label: { en: "Fabric notebooks", zh: "Fabric Notebook 文档" }, href: "https://learn.microsoft.com/en-us/fabric/data-engineering/how-to-use-notebook" },
      { label: { en: "Spark job definitions", zh: "Spark Job Definition 文档" }, href: "https://learn.microsoft.com/en-us/fabric/data-engineering/spark-job-definition" },
    ],
  },
  {
    id: "bytedance", kind: "job", color: "peach", from: "2020.04", to: "2021.12",
    short: { en: "ByteDance", zh: "字节跳动" }, org: { en: "ByteDance", zh: "字节跳动" }, title: { en: "Fullstack Engineer", zh: "全栈工程师" }, team: { en: "Education", zh: "教育" },
    uses: ["editor", "faas"],
    points: {
      en: [
        "Owned Formula Kit end to end: editor, renderer and backend. Patented a formula line-breaking algorithm.",
        "Raised throughput 50% during a traffic spike with multi-threading on auto-scaling FaaS.",
      ],
      zh: [
        "端到端负责公式套件（Formula Kit）：编辑器、渲染器与后端；公式折行算法已申请专利。",
        "流量激增期间在自动扩缩容的 FaaS 上引入多线程，吞吐量提升 50%。",
      ],
    },
    links: [{ label: { en: "bytedance.com", zh: "字节跳动官网" }, href: "https://www.bytedance.com" }],
  },
  {
    id: "join-cheer", kind: "job", color: "teal", from: "2017.02", to: "2020.04",
    short: { en: "Join-Cheer", zh: "久其" }, org: { en: "Join-Cheer Software", zh: "久其软件" }, title: { en: "Fullstack Engineer", zh: "全栈工程师" }, team: { en: "BigData", zh: "大数据" },
    uses: ["vue", "mfe"],
    points: {
      en: ["Built the company's first micro-frontend and a shared Vue library used by 20+ teams."],
      zh: ["搭建公司第一个微前端架构，以及供 20+ 个团队使用的 Vue 公共组件库。"],
    },
    links: [{ label: { en: "jiuqi.com.cn", zh: "久其软件官网" }, href: "https://www.jiuqi.com.cn" }],
  },
  {
    id: "secure-gen", kind: "project", color: "sapphire", from: "2025.01", to: "2025.05",
    short: { en: "Security eval", zh: "安全评估" }, org: { en: "Research", zh: "研究" }, title: { en: "Security Evaluation for AI-Generated Code", zh: "AI 生成代码安全评估平台" }, team: { en: "Research assistant", zh: "研究助理" },
    uses: ["rag", "qdrant", "ollama", "llm"],
    points: {
      en: ["RAG over OWASP and CWE rules (Qdrant + Ollama) that flags vulnerabilities in AI-generated code, with custom benchmarks."],
      zh: ["基于 OWASP / CWE 规则的 RAG（Qdrant + Ollama），检测 AI 生成代码中的漏洞，并构建自定义评测基准。"],
    },
    links: [],
  },
  {
    id: "bu", kind: "edu", color: "pink", from: "2024.09", to: "2026.01",
    short: { en: "BU", zh: "波士顿大学" }, org: { en: "Boston University", zh: "波士顿大学" }, title: { en: "M.S. Computer Science", zh: "计算机科学 硕士" }, team: { en: "Boston, MA", zh: "美国，波士顿" },
    uses: [], points: { en: [], zh: [] },
    links: [{ label: { en: "BU Computer Science", zh: "BU 计算机系" }, href: "https://www.bu.edu/cs/" }],
  },
  {
    id: "dmu", kind: "edu", color: "yellow", from: "2013.09", to: "2017.06",
    short: { en: "DMU", zh: "大连海事" }, org: { en: "Dalian Maritime University", zh: "大连海事大学" }, title: { en: "B.S. Management Information Systems", zh: "信息管理与信息系统 本科" }, team: { en: "Dalian, China", zh: "中国，大连" },
    uses: [], points: { en: [], zh: [] },
    links: [{ label: { en: "dlmu.edu.cn", zh: "大连海事大学官网" }, href: "https://www.dlmu.edu.cn/" }],
  },
];

export type Metric = { entry: string; big?: string; diff?: Record<Lang, [string, string]>; label: L10n; context: L10n };
export const METRICS: Metric[] = [
  { entry: "sekai", big: "270+", label: { en: "tasks shipped through Guy", zh: "通过 Guy 交付的 Task" }, context: { en: "Slack ask → agent → simulator → human approval", zh: "Slack 提需求 → Agent → 模拟器 → 人工审批" } },
  { entry: "sekai", big: "0.4%", label: { en: "crash rate", zh: "崩溃率" }, context: { en: "Under half of Google Play's 1.09% bad-behavior threshold", zh: "不到 Google Play 1.09% 不良行为阈值的一半" } },
  { entry: "microsoft", diff: { en: ["40 s", "2 s"], zh: ["40 秒", "2 秒"] }, label: { en: "dev startup", zh: "本地启动" }, context: { en: "pnpm + Turborepo monorepo on Vite, 50+ packages", zh: "pnpm + Turborepo monorepo，迁到 Vite，50+ 个包" } },
  { entry: "microsoft", diff: { en: ["2 h", "20 min"], zh: ["2 小时", "20 分钟"] }, label: { en: "CI/CD per change", zh: "单次 CI/CD" }, context: { en: "Git-diff + TypeScript AST impact analysis", zh: "Git diff + TypeScript AST 影响分析" } },
];

export type Post = { slug: string; date: string; color: Accent; glyph: string; title: L10n; desc: L10n };
export const POSTS: Post[] = [
  { slug: "vim", date: "2021-05-22", color: "green", glyph: ":wq", title: same("Learn to use vim"), desc: { en: "Vim modes and the instructions that matter.", zh: "Vim 的模式与常用指令。" } },
  { slug: "design-pattern-2", date: "2021-05-05", color: "peach", glyph: "<Proxy/>", title: { en: "Relearning Design Patterns (Part 2): Structural Patterns", zh: "重学设计模式（二）：结构型设计模式" }, desc: { en: "Adapter, Bridge, Composite, Facade, Decorator, Flyweight, Proxy.", zh: "适配器、桥接、组合、外观、装饰、享元、代理。" } },
  { slug: "451", date: "2021-05-02", color: "red", glyph: "451", title: { en: "The Origin of HTTP 451: Fahrenheit 451", zh: "HTTP 451 的起源：《华氏 451》" }, desc: { en: "I'd call it the romance of programmers.", zh: "我愿称之为程序员的浪漫。" } },
  { slug: "design-pattern-1", date: "2021-05-02", color: "blue", glyph: "new()", title: { en: "Relearning Design Patterns (Part 1): Creational Patterns", zh: "重学设计模式（一）：创建型设计模式" }, desc: { en: "Factory, Abstract Factory, Builder, Prototype, Singleton.", zh: "工厂、抽象工厂、建造者、原型、单例。" } },
];
export const postUrl = (p: Post) => `${SITE}/blog/posts/${p.slug}/`;

export const entryById = (id: string): Entry => {
  const e = ENTRIES.find((x) => x.id === id);
  if (!e) throw new Error(`Unknown entry "${id}". Known ids: ${ENTRIES.map((x) => x.id).join(", ")}`);
  return e;
};
export const skillById = (id: string): Skill => {
  const s = SKILLS.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown skill "${id}". Add it to SKILLS in src/content/index.ts`);
  return s;
};
export const host = (href: string) => href.replace(/^https?:\/\/(www\.)?/, "").split("/")[0];
/** The career clock starts at the first commit at Join-Cheer. */
export const CAREER_START = new Date(2017, 1, 1);
