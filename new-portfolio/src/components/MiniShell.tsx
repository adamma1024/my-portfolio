import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { ACCENTS, CAREER_START, EMAIL, ENTRIES, SKILLS, SOCIAL, type Accent } from "@/content";
import { useApp } from "@/app/useApp";
import { uptimeSince } from "@/lib/time";
import { tint } from "@/lib/tint";

const NAMES = ["help", "whoami", "neofetch", "uptime", "ls", "experience", "skills", "links", "theme", "accent", "lang", "clear"];
const CHIPS = ["neofetch", "uptime", "theme dark", "accent peach", "lang zh", "help"];
const SWATCH: Accent[] = ["red", "peach", "yellow", "green", "teal", "blue", "mauve", "pink"];

const Prompt = () => (
  <span className="ps">
    <span className="u">lin</span>@adamma.me <span className="d">~</span> <span className="a">❯</span>
  </span>
);

type Block = { id: number; cmd: string; out: ReactNode };

export function MiniShell() {
  const { t, tx, theme, setTheme, accent, setAccent, setLang, copyEmail } = useApp();
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(0);
  const nextId = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const flavor = theme === "dark" ? "Mocha" : "Latte";

  const Cmd = ({ c }: { c: string }) => (
    <button className="lnk" onClick={() => run(c)}>
      {c}
    </button>
  );

  const output = (name: string, arg: string): ReactNode => {
    const u = uptimeSince(CAREER_START, new Date());
    switch (name) {
      case "help":
        return (
          <div className="kv">
            {[["whoami", "intro"], ["neofetch", "system info"], ["uptime", "since the first commit"], ["experience", "roles"], ["skills", "the stack"], ["links", "resume, blog, github"], ["theme", "light | dark"], ["accent", "blue | mauve | peach …"], ["lang", "en | zh"], ["clear", "clear"]].map(([c, d]) => (
              <span key={c} style={{ display: "contents" }}>
                <span>
                  <Cmd c={c} />
                </span>
                <span>{d}</span>
              </span>
            ))}
          </div>
        );
      case "whoami":
        return (
          <div>
            <b>Lin Ma</b> <span className="dim">· {t.role} · {t.founderLine}</span>
          </div>
        );
      case "neofetch":
        return (
          <div className="neo">
            <pre>{"╭─────╮\n│ L M │\n╰─────╯"}</pre>
            <div>
              <div>
                <b style={{ color: "var(--green)" }}>lin</b>@<b>adamma.me</b>
              </div>
              <div className="dim">──────────────</div>
              <div className="kv">
                <span>role</span><span>Head of Client Eng</span>
                <span>host</span><span>Sekai</span>
                <span>founder</span><span>DreamRealized</span>
                <span>uptime</span><span>{u.y}y {u.m}m {u.d}d</span>
                <span>keys</span><span>vim</span>
                <span>theme</span><span>Catppuccin {flavor}</span>
                <span>accent</span><span>{accent}</span>
              </div>
              <div className="swatch">
                {SWATCH.map((c) => (
                  <i key={c} style={tint(c)} />
                ))}
              </div>
            </div>
          </div>
        );
      case "uptime":
        return (
          <div>
            {u.clock} up {u.y} years, {u.m} months, {u.d} days, <span className="dim">load average: 1 role, 1 company, 0 regrets</span>
          </div>
        );
      case "ls":
        return (
          <div style={{ display: "flex", gap: "3ch", flexWrap: "wrap" }}>
            <Cmd c="experience" />
            <Cmd c="skills" />
            <Cmd c="links" />
          </div>
        );
      case "experience":
        return (
          <div className="kv" style={{ gridTemplateColumns: "11ch minmax(0,1fr)" }}>
            {ENTRIES.filter((e) => e.kind === "job" || e.kind === "venture").map((e) => (
              <span key={e.id} style={{ display: "contents" }}>
                <span>{e.from.slice(0, 4)}–{e.to === "present" ? "now" : e.to.slice(0, 4)}</span>
                <span>
                  {tx(e.short)} <span className="dim">{tx(e.title)}</span>
                </span>
              </span>
            ))}
          </div>
        );
      case "skills":
        return (
          <div className="kv">
            {(["client", "ai", "infra"] as const).map((g) => (
              <span key={g} style={{ display: "contents" }}>
                <span>{g}</span>
                <span>{SKILLS.filter((s) => s.group === g).map((s) => tx(s.name)).join(", ")}</span>
              </span>
            ))}
          </div>
        );
      case "links":
        return (
          <div className="kv">
            <span>resume</span>
            <span><Link className="lnk" to="/resume">{SOCIAL[0].text}</Link></span>
            <span>blog</span>
            <span><a className="lnk" href={SOCIAL[1].href} target="_blank" rel="noopener">{SOCIAL[1].text}</a></span>
            <span>github</span>
            <span><a className="lnk" href={SOCIAL[2].href} target="_blank" rel="noopener">{SOCIAL[2].text}</a></span>
            <span>email</span>
            <span><button className="lnk" onClick={copyEmail}>{EMAIL}</button></span>
          </div>
        );
      case "theme": {
        if (["light", "latte", "dark", "mocha"].includes(arg)) {
          const want = arg === "light" || arg === "latte" ? "light" : "dark";
          setTheme(want);
          return `theme → ${want}`;
        }
        return <span className="dim">usage: theme light | dark (now {theme})</span>;
      }
      case "accent":
        if (ACCENTS.includes(arg as Accent)) {
          setAccent(arg as Accent);
          return `accent → ${arg}`;
        }
        return <span className="dim">usage: accent {ACCENTS.join(" | ")}</span>;
      case "lang":
        if (arg === "en" || arg === "zh") {
          setLang(arg);
          return `lang → ${arg}`;
        }
        return <span className="dim">usage: lang en | zh</span>;
      case "sudo":
        return <span className="dim">lin is not in the sudoers file. This incident will be reported.</span>;
      default:
        return (
          <span className="dim">
            command not found: {name}. Try <Cmd c="help" />.
          </span>
        );
    }
  };

  function run(raw: string, record = true) {
    const trimmed = raw.trim();
    if (record && trimmed) {
      history.current.push(raw);
      cursor.current = history.current.length;
    }
    const parts = trimmed.toLowerCase().replace(/^(cat|cd|open)\s+/, "").replace(/\/$/, "").replace(/\.txt$/, "").split(/\s+/);
    let name = parts[0] ?? "";
    if (name.startsWith("sudo")) name = "sudo";
    if (["resume", "blog", "github", "email", "contact"].includes(name)) name = "links";
    if (name === "clear") {
      setBlocks([]);
      return;
    }
    const out = name ? output(name, parts.slice(1).join(" ")) : null;
    setBlocks((prev) => [...prev, { id: nextId.current++, cmd: raw, out }]);
  }

  const booted = useRef(false);
  useEffect(() => {
    if (booted.current) return; // StrictMode runs effects twice in dev
    booted.current = true;
    run("neofetch", false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- boot once

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [blocks]);

  return (
    <div
      className="sh"
      onClick={(e) => {
        if (!(e.target as HTMLElement).closest("a,button") && !window.getSelection()?.toString()) inputRef.current?.focus({ preventScroll: true });
      }}
    >
      <div className="sh-log" ref={logRef} data-testid="shell-log">
        {blocks.map((b) => (
          <div className="blk" key={b.id}>
            <div className="echo">
              <Prompt />
              <span>{b.cmd}</span>
            </div>
            {b.out != null && <div>{b.out}</div>}
          </div>
        ))}
      </div>
      <label className="sh-live" htmlFor="sh-mini">
        <Prompt />
        <input
          id="sh-mini"
          ref={inputRef}
          value={value}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          placeholder="neofetch"
          aria-label="Shell command"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            const h = history.current;
            if (e.key === "Enter") {
              run(value);
              setValue("");
            } else if (e.key === "ArrowUp" && h.length) {
              e.preventDefault();
              cursor.current = Math.max(0, cursor.current - 1);
              setValue(h[cursor.current]);
            } else if (e.key === "ArrowDown" && h.length) {
              e.preventDefault();
              cursor.current = Math.min(h.length, cursor.current + 1);
              setValue(h[cursor.current] ?? "");
            } else if (e.key === "Tab" && value.trim()) {
              e.preventDefault();
              const matches = NAMES.filter((n) => n.startsWith(value.trim().toLowerCase()));
              if (matches.length === 1) setValue(`${matches[0]} `);
              else if (matches.length > 1) setBlocks((prev) => [...prev, { id: nextId.current++, cmd: value, out: <span className="dim">{matches.join("   ")}</span> }]);
            }
          }}
        />
      </label>
      <div className="sh-chips">
        {CHIPS.map((c) => (
          <button key={c} className="chip" onClick={() => { run(c); inputRef.current?.focus({ preventScroll: true }); }}>
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
