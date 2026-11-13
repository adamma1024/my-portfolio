import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { ENTRIES, entryById, type EntryKind } from "@/content";
import { useApp } from "@/app/useApp";
import { usePageKeys } from "@/app/keys";
import { currentMonth, monthIndex, monthLabel } from "@/lib/time";
import { LinkChips, PageHead } from "@/components/bits";
import { tint } from "@/lib/tint";

const FROM = 2013 * 12;
const LANES: [EntryKind, "mauve" | "lavender" | "pink" | "sapphire"][] = [["job", "mauve"], ["venture", "lavender"], ["edu", "pink"], ["project", "sapphire"]];
const ORDER: Record<EntryKind, number> = { job: 0, venture: 1, project: 2, edu: 3 };
const CJK = /[\u2e80-\u9fff\uff00-\uffef]/;
const labelWidth = (s: string) => [...s].reduce((n, ch) => n + (CJK.test(ch) ? 12.5 : 7.6), 0);

export default function Experience() {
  const { t, tx, lang } = useApp();
  const [params] = useSearchParams();
  const NOW = useMemo(() => currentMonth(), []);
  const TO = Math.floor(NOW / 12) * 12 + 11;
  const N = TO - FROM + 1;
  const FIRST = useMemo(() => Math.min(...ENTRIES.map((e) => monthIndex(e.from, NOW))), [NOW]);
  const clamp = useCallback((m: number) => Math.max(FROM, Math.min(NOW, Math.round(m))), [NOW]);
  const pct = (m: number) => ((m - FROM) / N) * 100;

  const at = params.get("at");
  const initial = useMemo(() => {
    if (!at) return NOW;
    try {
      return clamp(monthIndex(at, NOW));
    } catch (err) {
      console.error(`Ignoring ?at=${at}`, err);
      return NOW;
    }
  }, [at, NOW, clamp]);
  const [month, setMonth] = useState(initial);
  const [seenInitial, setSeenInitial] = useState(initial);
  if (initial !== seenInitial) {
    setSeenInitial(initial);
    setMonth(initial);
  }

  const [playing, setPlaying] = useState(false);
  const raf = useRef(0);
  const lanesRef = useRef<HTMLDivElement>(null);
  const stop = useCallback(() => {
    cancelAnimationFrame(raf.current);
    setPlaying(false);
  }, []);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const play = () => {
    if (playing) return stop();
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setMonth(NOW);
    const from = month >= NOW ? FIRST : month;
    const t0 = performance.now();
    const duration = Math.max(400, ((NOW - from) / (NOW - FIRST)) * 7000);
    setPlaying(true);
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / duration);
      setMonth(clamp(from + (NOW - from) * k));
      if (k < 1) raf.current = requestAnimationFrame(step);
      else setPlaying(false);
    };
    raf.current = requestAnimationFrame(step);
  };

  const move = (delta: number) => {
    stop();
    setMonth((m) => clamp(m + delta));
  };
  const jump = (m: number) => {
    stop();
    setMonth(clamp(m));
  };
  usePageKeys({ h: () => move(-1), l: () => move(1), b: () => move(-12), w: () => move(12), "0": () => jump(FROM), $: () => jump(NOW), " ": play });

  const monthAt = (clientX: number) => {
    const r = lanesRef.current?.getBoundingClientRect();
    return r ? FROM + Math.floor(((clientX - r.left) / r.width) * N) : month;
  };

  const active = ENTRIES.filter((e) => monthIndex(e.from, NOW) <= month && month <= monthIndex(e.to, NOW)).sort((a, b) => ORDER[a.kind] - ORDER[b.kind]);
  const sinceFirst = month - FIRST;
  const years = Array.from({ length: Math.floor(TO / 12) - 2013 + 1 }, (_, i) => 2013 + i);

  return (
    <section className="study">
      <PageHead title={t.expT} sub={t.expP} keys={t.expK} />
      <div className="trc">
        <div className="tr-head">
          <div className="tc">
            <span className="lbl">{t.timecode}</span>
            <span className="tc-v" data-testid="timecode">{monthLabel(month)}</span>
            <span className="tc-rel">
              {sinceFirst < 0 ? t.before : (
                <>
                  <b>T+{Math.floor(sinceFirst / 12)}y {String(sinceFirst % 12).padStart(2, "0")}m</b> {t.since}
                </>
              )}
            </span>
          </div>
          <div className="tr-ctl">
            <button className="btn pri" onClick={play}>{playing ? t.pause : t.play}</button>
            <button className="btn" onClick={() => jump(NOW)}>{t.now}</button>
          </div>
        </div>

        <div className="tr-scroll">
          <div className="tr-area">
            <div className="tr-labels">
              <span />
              {LANES.map(([kind, color]) => (
                <span key={kind}>
                  <span className="dot" style={tint(color)} />
                  {t.lanes[kind]}
                </span>
              ))}
            </div>
            <div
              className="tr-lanes"
              ref={lanesRef}
              onPointerDown={(e) => {
                if (e.button !== 0) return;
                stop();
                const clip = (e.target as HTMLElement).closest<HTMLElement>(".clip");
                if (clip?.dataset.id) return setMonth(monthIndex(entryById(clip.dataset.id).from, NOW));
                if ((e.target as HTMLElement).closest(".ph-h") === null) setMonth(clamp(monthAt(e.clientX)));
                e.currentTarget.setPointerCapture(e.pointerId);
              }}
              onPointerMove={(e) => {
                if (e.currentTarget.hasPointerCapture(e.pointerId)) setMonth(clamp(monthAt(e.clientX)));
              }}
            >
              <div className="ruler">
                {years.map((y) => (
                  <span key={y}>
                    <span className="tick" style={{ left: `${pct(y * 12)}%` }}>
                      <span>{y}</span>
                    </span>
                    <span className="tick minor" style={{ left: `${pct(y * 12 + 6)}%` }} />
                  </span>
                ))}
              </div>
              {LANES.map(([kind]) => (
                <div className="lane" key={kind}>
                  {ENTRIES.filter((e) => e.kind === kind).map((e) => {
                    const a = monthIndex(e.from, NOW);
                    const b = monthIndex(e.to, NOW);
                    const label = tx(e.short);
                    const narrow = (b - a + 1) * 4.4 < labelWidth(label) + 16;
                    return (
                      <button
                        key={e.id}
                        data-id={e.id}
                        className={`clip ${narrow ? "out-l" : ""} ${active.includes(e) ? "on" : ""}`}
                        style={{ ...tint(e.color), left: `${pct(a)}%`, width: `${((b - a + 1) / N) * 100}%` }}
                        aria-label={`${tx(e.title)}, ${e.from} – ${e.to === "present" ? t.present : e.to}`}
                      >
                        <span>{label}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
              <div className="ph" style={{ left: `${pct(month + 0.5)}%` }}>
                <button
                  className="ph-h"
                  role="slider"
                  aria-label="Playhead"
                  aria-valuemin={FROM}
                  aria-valuemax={NOW}
                  aria-valuenow={month}
                  aria-valuetext={monthLabel(month)}
                  onKeyDown={(e) => {
                    const stepBy = e.shiftKey ? 12 : 1;
                    if (e.key === "ArrowLeft" || e.key === "ArrowDown") move(-stepBy);
                    else if (e.key === "ArrowRight" || e.key === "ArrowUp") move(stepBy);
                    else if (e.key === "Home") jump(FROM);
                    else if (e.key === "End") jump(NOW);
                    else return;
                    e.preventDefault();
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="insp" aria-live="polite" data-testid="inspector">
          {active.length === 0 ? (
            <div className="ic-empty">
              {monthLabel(month)} · {t.between}
            </div>
          ) : (
            active.map((e) => {
              const start = monthIndex(e.from, NOW);
              const total = monthIndex(e.to, NOW) - start + 1;
              return (
                <article className="ic" key={e.id} style={tint(e.color)}>
                  <span className="lbl">
                    <span className="dot" />
                    {t.lanes[e.kind]} · {t.monthOf(month - start + 1, `${total}${e.to === "present" ? "+" : ""}`)}
                  </span>
                  <h4>{tx(e.title)}</h4>
                  <div className="meta">
                    {tx(e.org)} · {tx(e.team)} · {e.from} – {e.to === "present" ? t.present : e.to}
                  </div>
                  {e.points.en.length > 0 && (
                    <ul>
                      {e.points[lang].map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                  <LinkChips entry={e} />
                </article>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
