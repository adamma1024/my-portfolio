import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { ENTRIES, SKILLS, entryById, skillById, type EntryKind, type SkillGroup } from "@/content";
import { useApp } from "@/app/useApp";
import { usePageKeys } from "@/app/keys";
import { LinkChips, PageHead } from "@/components/bits";
import { tint } from "@/lib/tint";

type NodeRef = { type: "w" | "s"; id: string };
type Edge = { w: string; s: string; d: string };
const GROUPS: SkillGroup[] = ["client", "ai", "infra"];
const WORK: EntryKind[] = ["job", "venture", "project"];
const key = (n: NodeRef) => `${n.type}:${n.id}`;

function parsePin(raw: string | null): NodeRef | null {
  if (!raw) return { type: "w", id: "sekai" };
  const [type, id] = raw.split(":");
  if (type === "w" && ENTRIES.some((e) => e.id === id)) return { type, id };
  if (type === "s" && SKILLS.some((s) => s.id === id)) return { type, id };
  console.error(`Ignoring ?pin=${raw}: expected w:<entry id> or s:<skill id>`);
  return { type: "w", id: "sekai" };
}

export default function Skills() {
  const { t, tx, lang } = useApp();
  const [params] = useSearchParams();
  const pinParam = params.get("pin");
  const [pin, setPin] = useState<NodeRef | null>(() => parsePin(pinParam));
  const [seenPin, setSeenPin] = useState(pinParam);
  if (pinParam !== seenPin) {
    setSeenPin(pinParam);
    setPin(parsePin(pinParam));
  }
  const [hover, setHover] = useState<NodeRef | null>(null);
  const [filter, setFilter] = useState<"all" | SkillGroup>("all");
  const [edges, setEdges] = useState<Edge[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const canvas = useRef<HTMLDivElement>(null);
  const nodes = useRef(new Map<string, HTMLButtonElement>());

  const work = ENTRIES.filter((e) => WORK.includes(e.kind));
  const active = hover ?? pin;
  const litW = new Set<string>();
  const litS = new Set<string>();
  if (active?.type === "w") {
    litW.add(active.id);
    entryById(active.id).uses.forEach((s) => litS.add(s));
  } else if (active?.type === "s") {
    litS.add(active.id);
    ENTRIES.filter((e) => e.uses.includes(active.id)).forEach((e) => litW.add(e.id));
  }

  const draw = useCallback(() => {
    const cv = canvas.current;
    if (!cv) return;
    const cr = cv.getBoundingClientRect();
    const next: Edge[] = [];
    for (const e of work) {
      for (const sid of e.uses) {
        const a = nodes.current.get(`w:${e.id}`)?.getBoundingClientRect();
        const b = nodes.current.get(`s:${sid}`)?.getBoundingClientRect();
        if (!a || !b) continue;
        const x1 = a.right - cr.left, y1 = a.top + a.height / 2 - cr.top;
        const x2 = b.left - cr.left, y2 = b.top + b.height / 2 - cr.top;
        const dx = (x2 - x1) * 0.55;
        next.push({ w: e.id, s: sid, d: `M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}` });
      }
    }
    setBox({ w: cr.width, h: cr.height });
    setEdges(next);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- `work` is derived from static content

  useLayoutEffect(() => {
    draw();
    const ro = new ResizeObserver(draw);
    if (canvas.current) ro.observe(canvas.current);
    document.fonts?.ready.then(draw).catch((err: unknown) => console.error("Font loading failed; graph wires may be slightly off", err));
    return () => ro.disconnect();
  }, [draw, lang]);

  const focusNode = (n: NodeRef) => {
    const el = nodes.current.get(key(n));
    el?.focus({ preventScroll: true });
    el?.scrollIntoView({ block: "nearest" });
  };
  const column = (type: "w" | "s"): NodeRef[] =>
    type === "w" ? work.map((e) => ({ type, id: e.id })) : GROUPS.flatMap((g) => SKILLS.filter((s) => s.group === g).map((s) => ({ type, id: s.id })));
  const focused = (): NodeRef | null => {
    const el = document.activeElement;
    for (const [k, node] of nodes.current) if (node === el) return { type: k[0] as "w" | "s", id: k.slice(2) };
    return null;
  };
  const step = (delta: number) => {
    const cur = focused() ?? pin ?? { type: "w" as const, id: work[0].id };
    const list = column(cur.type);
    const i = list.findIndex((n) => n.id === cur.id);
    focusNode(list[Math.max(0, Math.min(list.length - 1, i + delta))]);
  };
  const side = (type: "w" | "s") => {
    const cur = focused() ?? pin;
    const y = cur ? (nodes.current.get(key(cur))?.getBoundingClientRect().top ?? 0) : 0;
    const list = column(type);
    const nearest = list.reduce((best, n) => {
      const dy = Math.abs((nodes.current.get(key(n))?.getBoundingClientRect().top ?? 0) - y);
      return dy < best.dy ? { n, dy } : best;
    }, { n: list[0], dy: Infinity });
    focusNode(nearest.n);
  };
  usePageKeys({
    j: () => step(1),
    k: () => step(-1),
    h: () => side("w"),
    l: () => side("s"),
    Escape: () => {
      setPin(null);
      setHover(null);
    },
  });

  const toggle = (n: NodeRef) => {
    setPin(pin && key(pin) === key(n) ? null : n);
    setHover(null);
  };
  const nodeProps = (n: NodeRef) => ({
    ref: (el: HTMLButtonElement | null) => {
      if (el) nodes.current.set(key(n), el);
      else nodes.current.delete(key(n));
    },
    onMouseEnter: () => setHover(n),
    onMouseLeave: () => setHover(null),
    onFocus: () => setHover(n),
    onBlur: () => setHover(null),
    onClick: () => toggle(n),
  });
  const isPinned = (n: NodeRef) => !!pin && key(pin) === key(n);
  const pinnedTag = active && isPinned(active) ? ` · ${t.pinned}` : "";

  return (
    <section className="study">
      <PageHead title={t.skT} sub={t.skP} keys={t.skK} />
      <div className="gc">
        <div className="g-head">
          <span className="lbl">stack.graph</span>
          <div className="seg" role="group" aria-label="Filter">
            {(["all", ...GROUPS] as const).map((f) => (
              <button key={f} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                {f === "all" ? t.all : t.groups[f]}
              </button>
            ))}
          </div>
        </div>
        <div className="g-body">
          <div className={`g-canvas ${active ? "act" : ""} ${filter !== "all" ? "fl" : ""}`} ref={canvas} data-testid="graph">
            <svg className="g-svg" viewBox={`0 0 ${box.w} ${box.h}`} aria-hidden="true">
              {edges.map((e) => {
                const lit = !!active && (active.type === "w" ? e.w === active.id : e.s === active.id);
                return <path key={`${e.w}-${e.s}`} className={`edge ${lit ? "lit" : ""}`} d={e.d} style={{ "--ec": `var(--ctp-${entryById(e.w).color})` } as React.CSSProperties} />;
              })}
            </svg>
            <div className="g-col g-work">
              {WORK.map((kind) => (
                <div key={kind} style={{ display: "contents" }}>
                  <div className="g-h">{kind === "job" ? t.rolesH : kind === "venture" ? t.venturesH : t.projectsH}</div>
                  {work.filter((e) => e.kind === kind).map((e) => {
                    const n: NodeRef = { type: "w", id: e.id };
                    return (
                      <button key={e.id} className={`gn ${litW.has(e.id) ? "lit" : ""} ${isPinned(n) ? "pin" : ""}`} style={tint(e.color)} data-node={key(n)} {...nodeProps(n)}>
                        <span className="dot" />
                        <span className="t">{tx(e.short)}</span>
                        <span className="ct">{e.uses.length}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
            <div className="g-col g-skill">
              {GROUPS.map((g) => (
                <div key={g} style={{ display: "contents" }}>
                  <div className="g-h">{t.groups[g]}</div>
                  {SKILLS.filter((s) => s.group === g).map((s) => {
                    const n: NodeRef = { type: "s", id: s.id };
                    return (
                      <button key={s.id} className={`gn ${litS.has(s.id) ? "lit" : ""} ${isPinned(n) ? "pin" : ""} ${filter !== "all" && filter !== g ? "off" : ""}`} style={tint("acc")} data-node={key(n)} {...nodeProps(n)}>
                        <span className="dot" />
                        <span className="t">{tx(s.name)}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <aside className="g-detail" aria-live="polite" data-testid="graph-detail">
            {!active ? (
              <>
                <span className="lbl">{t.nothing}</span>
                <p className="sub">{t.nothingP}</p>
              </>
            ) : active.type === "w" ? (
              (() => {
                const e = entryById(active.id);
                return (
                  <>
                    <span className="lbl">
                      <span className="dot" style={tint(e.color)} />
                      {t.kind[e.kind]}
                      {pinnedTag}
                    </span>
                    <h3>{tx(e.title)}</h3>
                    <div className="meta">
                      {tx(e.org)} · {tx(e.team)} · {e.from} – {e.to === "present" ? t.present : e.to}
                    </div>
                    <ul>
                      {e.points[lang].map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <LinkChips entry={e} />
                    <div className="chips">
                      {e.uses.map((s) => (
                        <button key={s} className="chip" onClick={() => { setPin({ type: "s", id: s }); setHover(null); }}>
                          {tx(skillById(s).name)}
                        </button>
                      ))}
                    </div>
                  </>
                );
              })()
            ) : (
              (() => {
                const s = skillById(active.id);
                const users = ENTRIES.filter((e) => e.uses.includes(s.id));
                return (
                  <>
                    <span className="lbl">
                      <span className="dot" style={tint("acc")} />
                      {t.skill1} · {t.groups[s.group]}
                      {pinnedTag}
                    </span>
                    <h3>{tx(s.name)}</h3>
                    <div className="meta">{t.usedIn(users.length)}</div>
                    <div className="uses">
                      {users.map((e) => (
                        <button key={e.id} style={tint(e.color)} onClick={() => { setPin({ type: "w", id: e.id }); setHover(null); }}>
                          <span>
                            {tx(e.short)} <small>{tx(e.title)}</small>
                          </span>
                          <small>{e.from.slice(0, 4)}</small>
                        </button>
                      ))}
                    </div>
                  </>
                );
              })()
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
