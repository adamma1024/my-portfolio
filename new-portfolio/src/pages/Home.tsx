import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { CAREER_START, EMAIL, ENTRIES, METRICS, POSTS, SKILLS, SOCIAL, entryById, postUrl, skillById } from "@/content";
import { useApp } from "@/app/useApp";
import { usePageKeys } from "@/app/keys";
import { uptimeSince } from "@/lib/time";
import { Avatar } from "@/components/bits";
import { tint } from "@/lib/tint";
import { MiniShell } from "@/components/MiniShell";

const GROUPS = ["client", "ai", "infra"] as const;
const STATUS_COLOR = { live: "green", building: "yellow", oss: "blue" } as const;

function Uptime() {
  const { t } = useApp();
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  const u = uptimeSince(CAREER_START, now);
  const count = (kind: string) => ENTRIES.filter((e) => e.kind === kind).length;
  return (
    <article className="tile t4">
      <span className="lbl">$ uptime</span>
      <div className="up-val" data-testid="uptime">
        {u.y}<span className="u">{t.units[0]}</span>
        {u.m}<span className="u">{t.units[1]}</span>
        {u.d}<span className="u">{t.units[2]}</span>
      </div>
      <div className="up-clock">{u.clock}</div>
      <p className="sub">{t.upSub}</p>
      <div className="load">
        <span>load average:</span>
        <span><b>{count("job")}</b> {t.roles}</span>
        <span><b>{count("venture")}</b> {t.ventures}</span>
        <span><b>{count("edu")}</b> {t.degrees}</span>
      </div>
    </article>
  );
}

export default function Home() {
  const { t, tx, lang, copyEmail } = useApp();
  const navigate = useNavigate();
  const [cap, setCap] = useState<string | null>(null);
  const venture = entryById("dreamrealized");

  usePageKeys({
    i: () => {
      const input = document.getElementById("sh-mini");
      input?.focus({ preventScroll: true });
      input?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    },
  });

  return (
    <section className="study">
      <div
        className="bento"
        onPointerMove={(e) => {
          for (const el of e.currentTarget.querySelectorAll<HTMLElement>(".tile")) {
            const r = el.getBoundingClientRect();
            el.style.setProperty("--mx", `${e.clientX - r.left}px`);
            el.style.setProperty("--my", `${e.clientY - r.top}px`);
          }
        }}
      >
        <article className="tile hero t8">
          <div className="hero-top">
            <Avatar />
            <a className="status" href="https://sekai.ai" target="_blank" rel="noopener">
              <span className="pulse" aria-hidden="true" />
              {t.status} ↗
            </a>
          </div>
          <div>
            <h2>
              Lin Ma<i>.</i>
            </h2>
            <p className="role">{t.role}</p>
            <p className="founder">
              <span className="dot" style={tint(venture.color)} />
              {t.founderLine}
            </p>
          </div>
          <p className="sum">{t.summary}</p>
          <div className="hero-act">
            <Link className="btn pri" to="/resume">{t.resume}</Link>
            <a className="btn" href={SOCIAL[1].href} target="_blank" rel="noopener">{t.blog}</a>
            <a className="btn" href={SOCIAL[2].href} target="_blank" rel="noopener">GitHub</a>
            <button className="btn" onClick={copyEmail}>
              {EMAIL} <span className="k">{t.copy} · yy</span>
            </button>
          </div>
        </article>

        <Uptime />

        {METRICS.map((m, i) => {
          const e = entryById(m.entry);
          return (
            <button key={i} className="tile t3 metric" style={tint(e.color)} onClick={() => navigate(`/experience?at=${e.from}`)}>
              <span className="lbl">
                <span className="dot" />
                {tx(e.short)}
              </span>
              {m.big ? (
                <span className="m-v">{m.big}</span>
              ) : (
                m.diff && (
                  <span className="m-diff">
                    <del>{m.diff[lang][0]}</del>
                    <ins>{m.diff[lang][1]}</ins>
                  </span>
                )
              )}
              <span className="m-lab">{tx(m.label)}</span>
              <span className="m-ctx">{tx(m.context)}</span>
              <span className="m-go">{t.openRole}</span>
            </button>
          );
        })}

        <article className="tile t12" data-testid="venture">
          <div className="tile-h">
            <span className="lbl">{t.ventureLbl}</span>
            <a href={venture.links[0].href} target="_blank" rel="noopener">dreamrealized.net ↗</a>
          </div>
          <p className="sub">{t.ventureSub}</p>
          <div className="products">
            {(venture.products ?? []).map((p) => (
              <div className="product" key={p.id}>
                <div className="product-h">
                  <h3>{p.name}</h3>
                  <span className="pill" style={tint(STATUS_COLOR[p.status])}>{t.productStatus[p.status]}</span>
                </div>
                <span className="plat">{tx(p.platform)}</span>
                <p>{tx(p.blurb)}</p>
                {p.links.length > 0 && (
                  <div className="lks">
                    {p.links.map((l) => (
                      <a key={l.href} className="lk-chip" href={l.href} target="_blank" rel="noopener" style={tint(venture.color)}>
                        <span>{tx(l.label)}</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </article>

        <article className="tile t8">
          <div className="tile-h">
            <span className="lbl">{t.blogLbl}</span>
            <a href={SOCIAL[1].href} target="_blank" rel="noopener">{t.allPosts}</a>
          </div>
          <div className="posts">
            {POSTS.map((p, i) => (
              <a key={p.slug} className="post" href={postUrl(p)} target="_blank" rel="noopener" style={tint(p.color)}>
                <span className="cover">
                  <b className={p.glyph.length > 5 ? "sm" : ""}>{p.glyph}</b>
                  <span className="no">#{String(POSTS.length - i).padStart(2, "0")}</span>
                </span>
                <span className="post-b">
                  <time dateTime={p.date}>{p.date.replace(/-/g, ".")}</time>
                  <h3>{tx(p.title)}</h3>
                  <p>{tx(p.desc)}</p>
                </span>
              </a>
            ))}
          </div>
        </article>

        <article className="tile t4">
          <span className="lbl">{t.guyLbl}</span>
          <p className="sub">{t.guySub}</p>
          <ol className="pipe">
            {t.steps.map(([a, b]) => (
              <li key={a}>
                {a}
                <small>{b}</small>
              </li>
            ))}
          </ol>
          <div className="big-stat">
            <b>270+</b>
            <span>{t.tasks}</span>
          </div>
        </article>

        <article className="tile t7">
          <span className="lbl">{t.capsLbl}</span>
          <div className="caps">
            {GROUPS.map((g) => (
              <div className="cap-g" key={g}>
                <span>{t.groups[g]}</span>
                <div className="cap-row">
                  {SKILLS.filter((s) => s.group === g).map((s) => (
                    <button key={s.id} className="cap" aria-pressed={cap === s.id} onClick={() => setCap(cap === s.id ? null : s.id)}>
                      {tx(s.name)}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="cap-cap" data-testid="cap-caption">
            {cap ? (
              <>
                <span>
                  <b>{tx(skillById(cap).name)}</b> → {ENTRIES.filter((e) => e.uses.includes(cap)).map((e) => tx(e.short)).join(", ")}
                </span>
                <button onClick={() => navigate(`/skills?pin=s:${cap}`)}>{t.trace}</button>
              </>
            ) : (
              t.capsHint
            )}
          </div>
        </article>

        <article className="tile t5">
          <span className="lbl">
            ~/shell · <kbd>i</kbd>
          </span>
          <MiniShell />
        </article>
      </div>
    </section>
  );
}
