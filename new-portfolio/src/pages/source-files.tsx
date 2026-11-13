import type { ReactNode } from "react";
import { EMAIL, ENTRIES, SKILLS, SITE, SOCIAL, skillById, type Accent, type Entry } from "@/content";
import type { Dict } from "@/i18n/dict";
import type { Lang } from "@/lib/lang";

export type SourceFile = { path: string; language: string; icon: [string, Accent]; lines: (c: Ctx) => ReactNode[]; markdown?: (c: Ctx) => string[] };
type Ctx = { lang: Lang; t: Dict };

const T = (cls: string, text: string, k?: number) => <span key={k} className={cls}>{text}</span>;
const row = (...parts: ReactNode[]) => <>{parts.map((p, i) => <span key={i}>{p}</span>)}</>;
const str = (s: string) => T("s", `"${s}"`);
const pu = (s: string) => T("pu", s);
const kw = (s: string) => T("k", s);
const url = (href: string, quoted = true) => (
  <a className="s" href={href} target="_blank" rel="noopener">
    {quoted ? `"${href}"` : href}
  </a>
);
const until = (e: Entry, c: Ctx) => (e.to === "present" ? c.t.present : e.to);
const SOCIAL_ABS = SOCIAL.map((s) => ({ key: s.key, href: s.internal ? `${SITE}${s.href}` : s.href }));

function mdLine(line: string): ReactNode {
  if (line.startsWith("## ")) return T("h2", line);
  if (line.startsWith("# ")) return T("h1", line);
  if (line.startsWith("> ")) return T("q", line);
  const parts: ReactNode[] = [];
  const body = line.startsWith("- ") ? line.slice(1) : line;
  if (line.startsWith("- ")) parts.push(T("li", "-", -1));
  let last = 0;
  for (const m of body.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
    parts.push(body.slice(last, m.index));
    parts.push(T("lk", `[${m[1]}]`, m.index));
    parts.push(<a key={`u${m.index}`} className="url" href={m[2]} target="_blank" rel="noopener">({m[2]})</a>);
    last = (m.index ?? 0) + m[0].length;
  }
  parts.push(body.slice(last));
  return row(...parts);
}

const readme = ({ lang }: Ctx): string[] =>
  lang === "zh"
    ? ["# Lin Ma", "> Sekai 客户端工程负责人 · DreamRealized 创始人", "",
       "我在 Sekai 负责客户端工程：基于 Kotlin Multiplatform 的原生 iOS 与 Android，", "以及让团队任何人都能在 Slack 里发布 App 改动的 Agent 工具链。", "",
       "## 现在", "- Guy：Slack 提需求 → Agent 开发 → 模拟器验证 → 人工审批", "- 已交付 270+ 个 Task；崩溃率降到 0.4%", "- Flutter → 基于 Kotlin Multiplatform 的原生 iOS / Android", "",
       "## DreamRealized", "- Gradpazz：已上架 App Store 的校园与城市资源平台", "- Amber：住在 Obsidian vault 里的计划 app", "- Wooto：AI 创作工作室，开发中", "",
       "## 其他地方", ...SOCIAL_ABS.map((l) => `- [${l.key}](${l.href})`), `- email: ${EMAIL}`]
    : ["# Lin Ma", "> Head of Client Engineering @ Sekai · Founder @ DreamRealized", "",
       "I lead client engineering at Sekai: native iOS and Android on", "Kotlin Multiplatform, and the agent tooling that lets anyone on", "the team ship app changes from Slack.", "",
       "## Now", "- Guy: Slack ask → agent builds → simulator verifies → human approves", "- 270+ tasks shipped; crash rate down to 0.4%", "- Flutter → native iOS/Android on Kotlin Multiplatform", "",
       "## DreamRealized", "- Gradpazz: campus and city marketplace, live on the App Store", "- Amber: a planner that lives in your Obsidian vault", "- Wooto: an AI creative studio, in development", "",
       "## Elsewhere", ...SOCIAL_ABS.map((l) => `- [${l.key}](${l.href})`), `- email: ${EMAIL}`];

const projectMd = (e: Entry) => (c: Ctx): string[] => [
  `# ${e.title[c.lang]}`, `> ${e.team[c.lang]} · ${e.org[c.lang]} · ${e.from} – ${until(e, c)}`, "",
  ...e.points[c.lang].map((p) => `- ${p}`), "", `stack: ${e.uses.map((u) => skillById(u).name[c.lang]).join(", ")}`,
];

function tsLines(e: Entry, c: Ctx): ReactNode[] {
  const name = e.id.replace(/-(\w)/g, (_, ch: string) => ch.toUpperCase());
  const prop = (k: string, value: ReactNode) => row("  ", T("p", k), pu(":"), " ", value, pu(","));
  const list = (items: ReactNode[]) => row(pu("["), ...items.flatMap((x, i) => (i ? [pu(", "), x] : [x])), pu("]"));
  const type = e.kind === "venture" ? "Venture" : "Role";
  return [
    T("c", `// ${e.org[c.lang]} · ${e.from} → ${until(e, c)}`),
    row(kw("import type"), " ", pu("{"), " ", T("t", type), " ", pu("}"), " ", kw("from"), " ", str("../types"), pu(";")),
    "",
    row(kw("export const"), " ", T("v", name), " ", pu("="), " ", pu("{")),
    prop(e.kind === "venture" ? "company" : "company", str(e.org[c.lang])),
    prop("title", str(e.title[c.lang])),
    prop("team", str(e.team[c.lang])),
    prop("period", list([str(e.from), str(e.to)])),
    prop("stack", list(e.uses.map((u) => str(u)))),
    ...(e.links.length ? [row("  ", T("p", "links"), pu(": [")), ...e.links.map((l) => row("    ", url(l.href), pu(","))), row("  ", pu("],"))] : []),
    ...(e.products?.length
      ? [row("  ", T("p", "products"), pu(": [")),
         ...e.products.map((p) => row("    ", pu("{ "), T("p", "name"), pu(": "), str(p.name), pu(", "), T("p", "status"), pu(": "), str(p.status), ...(p.links[0] ? [pu(", "), T("p", "url"), pu(": "), url(p.links[0].href)] : []), pu(" },"))),
         row("  ", pu("],"))]
      : []),
    row("  ", T("p", "shipped"), pu(": [")),
    ...e.points[c.lang].map((p) => row("    ", str(p), pu(","))),
    row("  ", pu("],")),
    row(pu("}"), " ", kw("satisfies"), " ", T("t", type), pu(";")),
  ];
}

const of = (kind: Entry["kind"]) => ENTRIES.filter((e) => e.kind === kind);
const md = (path: string, source: (c: Ctx) => string[]): SourceFile => ({ path, language: "Markdown", icon: ["M↓", "lavender"], lines: (c) => source(c).map(mdLine), markdown: source });

export const SOURCE_FILES: SourceFile[] = [
  md("README.md", readme),
  ...of("job").map((e): SourceFile => ({ path: `experience/${e.id}.ts`, language: "TypeScript", icon: ["TS", "blue"], lines: (c) => tsLines(e, c) })),
  ...of("venture").map((e): SourceFile => ({ path: `ventures/${e.id}.ts`, language: "TypeScript", icon: ["TS", "blue"], lines: (c) => tsLines(e, c) })),
  ...of("project").map((e) => md(`projects/${e.id}.md`, projectMd(e))),
  {
    path: "education.yaml", language: "YAML", icon: ["Y", "red"],
    lines: (c) => of("edu").flatMap((e, i, all) => [
      row(pu("-"), " ", T("p", "school"), pu(":"), " ", T("s", e.org[c.lang])),
      row("  ", T("p", "degree"), pu(":"), " ", T("s", e.title[c.lang])),
      row("  ", T("p", "period"), pu(":"), " ", T("n", e.from), " ", pu("–"), " ", T("n", e.to)),
      ...(e.links[0] ? [row("  ", T("p", "site"), pu(":"), " ", url(e.links[0].href, false))] : []),
      ...(i < all.length - 1 ? [""] : []),
    ]),
  },
  {
    path: "skills.json", language: "JSON", icon: ["{}", "yellow"],
    lines: (c) => [pu("{"), ...(["client", "ai", "infra"] as const).map((g, i, all) => {
      const items = SKILLS.filter((s) => s.group === g).map((s) => str(s.name[c.lang]));
      return row("  ", T("p", `"${g}"`), pu(": ["), ...items.flatMap((x, j) => (j ? [pu(", "), x] : [x])), pu("]"), i < all.length - 1 ? pu(",") : "");
    }), pu("}")],
  },
  {
    path: "links.toml", language: "TOML", icon: ["T", "peach"],
    lines: () => [row(pu("["), T("t", "links"), pu("]")), ...SOCIAL_ABS.map((l) => row(T("p", l.key.padEnd(6)), " ", pu("="), " ", url(l.href))), row(T("p", "email "), " ", pu("="), " ", str(EMAIL))],
  },
];
export const SOURCE_PATHS = SOURCE_FILES.map((f) => f.path);
export const TREE_ORDER = ["README.md", "experience", "ventures", "projects", "education.yaml", "skills.json", "links.toml"];
