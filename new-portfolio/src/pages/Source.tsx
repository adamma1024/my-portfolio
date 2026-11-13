import { useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { useApp } from "@/app/useApp";
import { usePageKeys } from "@/app/keys";
import { PageHead } from "@/components/bits";
import { tint } from "@/lib/tint";
import { MOD } from "@/lib/platform";
import { SOURCE_FILES, SOURCE_PATHS, TREE_ORDER, type SourceFile } from "./source-files";

const fileBy = (path: string) => SOURCE_FILES.find((f) => f.path === path);
const base = (path: string) => path.split("/").pop() ?? path;

function Markdown({ lines, lang }: { lines: string[]; lang: string }) {
  const out: ReactNode[] = [];
  let para: string[] = [];
  let list: string[] = [];
  const inline = (s: string): ReactNode[] => {
    const parts: ReactNode[] = [];
    let last = 0;
    for (const m of s.matchAll(/\[([^\]]+)\]\(([^)]+)\)/g)) {
      parts.push(s.slice(last, m.index));
      parts.push(<a key={m.index} href={m[2]} target="_blank" rel="noopener">{m[1]}</a>);
      last = (m.index ?? 0) + m[0].length;
    }
    parts.push(s.slice(last));
    return parts;
  };
  const flush = () => {
    if (para.length) out.push(<p key={out.length}>{inline(para.join(lang === "zh" ? "" : " "))}</p>);
    if (list.length) out.push(<ul key={out.length}>{list.map((l) => <li key={l}>{inline(l)}</li>)}</ul>);
    para = [];
    list = [];
  };
  for (const l of lines) {
    if (l.startsWith("- ")) {
      if (para.length) flush();
      list.push(l.slice(2));
      continue;
    }
    if (list.length) flush();
    if (!l.trim()) flush();
    else if (l.startsWith("# ")) { flush(); out.push(<h1 key={out.length}>{l.slice(2)}</h1>); }
    else if (l.startsWith("## ")) { flush(); out.push(<h2 key={out.length}>{l.slice(3)}</h2>); }
    else if (l.startsWith("> ")) { flush(); out.push(<blockquote key={out.length}>{l.slice(2)}</blockquote>); }
    else para.push(l);
  }
  flush();
  return <div className="pv" data-testid="md-preview">{out}</div>;
}

export default function Source() {
  const { t, lang, theme } = useApp();
  const [params] = useSearchParams();
  const [open, setOpen] = useState<string[]>(["README.md", "experience/sekai.ts"]);
  const [active, setActive] = useState<string | null>("README.md");
  const [previews, setPreviews] = useState<Set<string>>(new Set());
  const [closed, setClosed] = useState<Set<string>>(new Set());
  const [line, setLine] = useState(1);

  const openFile = (path: string) => {
    setOpen((prev) => (prev.includes(path) ? prev : [...prev, path]));
    setActive(path);
    setLine(1);
  };
  const requested = params.get("file");
  const [seenRequest, setSeenRequest] = useState<string | null>(null);
  if (requested !== seenRequest) {
    setSeenRequest(requested);
    if (requested && SOURCE_PATHS.includes(requested)) openFile(requested);
    else if (requested) console.error(`Ignoring ?file=${requested}. Known files: ${SOURCE_PATHS.join(", ")}`);
  }

  const file: SourceFile | undefined = active ? fileBy(active) : undefined;
  const ctx = { lang, t };
  const lines = file ? file.lines(ctx) : [];
  const previewing = !!file?.markdown && previews.has(file.path);

  const closeTab = (path: string) => {
    const rest = open.filter((p) => p !== path);
    setOpen(rest);
    if (active === path) setActive(rest[rest.length - 1] ?? null);
  };
  const togglePreview = () => {
    if (!file?.markdown) return;
    setPreviews((prev) => {
      const next = new Set(prev);
      if (next.has(file.path)) next.delete(file.path);
      else next.add(file.path);
      return next;
    });
  };
  const moveLine = (to: number) => {
    if (!file || previewing) return;
    const next = Math.max(1, Math.min(lines.length, to));
    setLine(next);
    const el = document.querySelector<HTMLElement>(`.ln[data-ln="${next}"]`);
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.bottom > window.innerHeight - 60 || r.top < 80) window.scrollBy({ top: r.top - window.innerHeight / 2 });
  };
  const cycle = (delta: number) => {
    if (!open.length) return;
    const i = Math.max(0, open.indexOf(active ?? ""));
    setActive(open[(i + delta + open.length) % open.length]);
    setLine(1);
  };
  usePageKeys({
    j: () => moveLine(line + 1),
    k: () => moveLine(line - 1),
    gg: () => moveLine(1),
    G: () => moveLine(lines.length),
    "]": () => cycle(1),
    "[": () => cycle(-1),
    p: togglePreview,
    x: () => active && closeTab(active),
  });

  const folders = new Map<string, SourceFile[]>();
  for (const f of SOURCE_FILES) {
    const [dir, rest] = f.path.split("/");
    if (rest) folders.set(dir, [...(folders.get(dir) ?? []), f]);
  }
  const node = (f: SourceFile, nested: boolean) => (
    <button key={f.path} className={`node ${nested ? "d1" : ""} ${f.path === active ? "on" : ""}`} onClick={() => openFile(f.path)}>
      <span className="ico" style={tint(f.icon[1])}>{f.icon[0]}</span>
      {base(f.path)}
    </button>
  );

  return (
    <section className="study">
      <PageHead title={t.srcT} sub={t.srcP} keys={t.srcK} />
      <div className="ed" data-testid="editor">
        <div className="ed-title">
          <span className="lights" aria-hidden="true"><i /><i /><i /></span>
          <span>lin-ma — {file ? file.path : "Welcome"}</span>
          <span>{MOD}K</span>
        </div>
        <nav className="ed-side" aria-label={t.explorer}>
          <div className="tree-h">{t.explorer} · lin-ma</div>
          {TREE_ORDER.map((name) => {
            const children = folders.get(name);
            if (!children) {
              const f = fileBy(name);
              return f ? node(f, false) : null;
            }
            const isClosed = closed.has(name);
            return (
              <div key={name} style={{ display: "contents" }}>
                <button
                  className="node"
                  aria-expanded={!isClosed}
                  onClick={() =>
                    setClosed((prev) => {
                      const next = new Set(prev);
                      if (isClosed) next.delete(name);
                      else next.add(name);
                      return next;
                    })
                  }
                >
                  <span className="chev">▾</span>
                  {name}
                </button>
                {!isClosed && children.map((f) => node(f, true))}
              </div>
            );
          })}
        </nav>
        <div className="ed-main">
          <div className="ed-tabs" role="tablist">
            {open.map((p) => {
              const f = fileBy(p);
              if (!f) return null;
              return (
                <div
                  key={p}
                  className={`ed-tab ${p === active ? "on" : ""}`}
                  role="tab"
                  tabIndex={0}
                  aria-selected={p === active}
                  onClick={() => { setActive(p); setLine(1); }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(p);
                      setLine(1);
                    }
                  }}
                >
                  <span className="ico" style={tint(f.icon[1])}>{f.icon[0]}</span>
                  {base(p)}
                  <span className="x" role="button" aria-label={`Close ${p}`} onClick={(e) => { e.stopPropagation(); closeTab(p); }}>×</span>
                </div>
              );
            })}
          </div>
          <div className="crumb">
            <span>
              lin-ma{" "}
              {file?.path.split("/").map((s) => (
                <span key={s}>› <b>{s}</b> </span>
              ))}
            </span>
            {file?.markdown && (
              <button className="pv-btn" aria-pressed={previewing} onClick={togglePreview}>
                {t.preview} · p
              </button>
            )}
          </div>
          {!file ? (
            <div className="ed-empty">
              <div>{t.noEditors}</div>
              <div>
                {t.noEditorsP} <kbd>{MOD}</kbd> <kbd>K</kbd>
              </div>
            </div>
          ) : previewing && file.markdown ? (
            <Markdown lines={file.markdown(ctx)} lang={lang} />
          ) : (
            <div className="code">
              {lines.map((content, i) => (
                <div key={i} className={`ln ${i + 1 === line ? "cur" : ""}`} data-ln={i + 1} onClick={() => setLine(i + 1)}>
                  <span className="no">{i + 1}</span>
                  <span className="tx">{content === "" ? " " : content}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="ed-status">
          <span>
            <span>⎇ main</span>
            <span>✓ {t.problems}</span>
          </span>
          <span>
            <span data-testid="ed-line">{file && !previewing ? `Ln ${line}, Col 1` : ""}</span>
            <span>{file?.language}</span>
            <span>UTF-8</span>
            <span>Catppuccin {theme === "dark" ? "Mocha" : "Latte"}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
