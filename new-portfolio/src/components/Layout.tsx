import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { EMAIL, SOCIAL } from "@/content";
import { useApp } from "@/app/useApp";
import { KeysCtx, type KeyMap } from "@/app/keys";
import { PAGES } from "@/app/pages";
import { MOD, reducedMotion } from "@/lib/platform";
import { resolveKey } from "@/lib/keys";
import { AccentMenu } from "./AccentMenu";
import { Avatar, MoonIcon, SearchIcon, SunIcon } from "./bits";

// Overlays are split out of the first-load bundle and warmed up once the page is idle.
const loadPalette = () => import("./CommandPalette").then((m) => ({ default: m.CommandPalette }));
const loadHelp = () => import("./KeyHelp").then((m) => ({ default: m.KeyHelp }));
const CommandPalette = lazy(loadPalette);
const KeyHelp = lazy(loadHelp);

const NAV = [
  ["/", "home"],
  ["/experience", "experience"],
  ["/skills", "skills"],
  ["/source", "source"],
] as const;

export function Layout({ children }: { children: ReactNode }) {
  const app = useApp();
  const { t, lang, setLang, theme, toggleTheme } = app;
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const pageKeys = useRef<KeyMap>({});
  const [mode, setMode] = useState<"NORMAL" | "INSERT">("NORMAL");
  const [shown, setShown] = useState("");
  const [spin, setSpin] = useState(0);

  // The key handler is registered once; it reads fresh state through this ref.
  const live = useRef({ app, pathname, navigate });
  useLayoutEffect(() => {
    live.current = { app, pathname, navigate };
  });

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    const warm = () => {
      loadPalette().catch((err: unknown) => console.error("Could not preload the command palette", err));
      loadHelp().catch((err: unknown) => console.error("Could not preload keyboard help", err));
    };
    const id = window.setTimeout(warm, 1500);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const sync = () => {
      const a = document.activeElement;
      setMode(a instanceof HTMLInputElement || a instanceof HTMLTextAreaElement ? "INSERT" : "NORMAL");
    };
    const later = () => window.setTimeout(sync, 0);
    document.addEventListener("focusin", sync);
    document.addEventListener("focusout", later);
    return () => {
      document.removeEventListener("focusin", sync);
      document.removeEventListener("focusout", later);
    };
  }, []);

  useEffect(() => {
    let pending = "";
    let pendingTimer: number | undefined;
    let shownTimer: number | undefined;
    const show = (s: string) => {
      setShown(s);
      window.clearTimeout(shownTimer);
      if (s) shownTimer = window.setTimeout(() => setShown(""), 900);
    };
    const scroll = (top: number, e: KeyboardEvent) => window.scrollBy({ top, behavior: e.repeat || reducedMotion() ? "auto" : "smooth" });
    const scrollTo = (top: number) => window.scrollTo({ top, behavior: reducedMotion() ? "auto" : "smooth" });
    const go = (delta: number) => {
      // Read the real URL: during a lazy route transition React's location lags behind it.
      const i = PAGES.indexOf(window.location.pathname as (typeof PAGES)[number]);
      live.current.navigate(PAGES[(Math.max(i, 0) + delta + PAGES.length) % PAGES.length]);
    };
    const global: KeyMap = {
      j: (e) => scroll(72, e),
      k: (e) => scroll(-72, e),
      d: (e) => scroll(window.innerHeight / 2, e),
      u: (e) => scroll(-window.innerHeight / 2, e),
      gg: () => scrollTo(0),
      G: () => scrollTo(document.body.scrollHeight),
      gt: () => go(1),
      gT: () => go(-1),
      "/": () => live.current.app.setPaletteOpen(true),
      ":": () => live.current.app.setPaletteOpen(true),
      "?": () => live.current.app.setHelpOpen(true),
      t: () => {
        live.current.app.toggleTheme();
        setSpin((n) => n + 1);
      },
      c: () => live.current.app.setAccentOpen(true),
      L: () => live.current.app.setLang(live.current.app.lang === "zh" ? "en" : "zh"),
      yy: () => live.current.app.copyEmail(),
      "1": () => live.current.navigate(PAGES[0]),
      "2": () => live.current.navigate(PAGES[1]),
      "3": () => live.current.navigate(PAGES[2]),
      "4": () => live.current.navigate(PAGES[3]),
    };

    const onKey = (e: KeyboardEvent) => {
      const { app: a } = live.current;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        a.setPaletteOpen(!a.paletteOpen);
        return;
      }
      if (a.paletteOpen || a.accentOpen) return; // those surfaces own the keyboard while open
      if (a.helpOpen) {
        if (e.key === "?" || e.key === "q") a.setHelpOpen(false);
        return;
      }
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]")) {
        if (e.key === "Escape") (target as HTMLElement).blur();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") {
        pending = "";
        show("");
        pageKeys.current.Escape?.(e);
        (document.activeElement as HTMLElement | null)?.blur?.();
        return;
      }
      if (e.key === "Enter") {
        pageKeys.current.Enter?.(e);
        return;
      }
      if (e.key.length !== 1) return;
      const r = resolveKey(pending, e.key, Object.keys(pageKeys.current), Object.keys(global));
      window.clearTimeout(pendingTimer);
      if (r.type === "pending") {
        pending = r.seq;
        show(r.seq);
        pendingTimer = window.setTimeout(() => (pending = ""), 900);
        e.preventDefault();
        return;
      }
      pending = "";
      if (r.type === "none") return;
      // A focused button or link keeps the space bar for itself.
      if (r.seq === " " && target?.closest("button, a")) return;
      e.preventDefault();
      show(r.seq === " " ? "␣" : r.seq);
      (r.scope === "page" ? pageKeys.current : global)[r.seq]?.(e);
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.dataset.keys = "on";
    return () => {
      document.removeEventListener("keydown", onKey);
      delete document.documentElement.dataset.keys;
      window.clearTimeout(pendingTimer);
      window.clearTimeout(shownTimer);
    };
  }, []);

  return (
    <KeysCtx value={pageKeys}>
      <header className="bar">
        <div className="bar-in">
          <Link className="brand" to="/">
            <Avatar />
            <strong>Lin Ma</strong>
          </Link>
          <nav className="nav" aria-label="Pages">
            {NAV.map(([to, key], i) => (
              <NavLink key={to} to={to} end>
                <span className="n">{i + 1}</span>
                {t.nav[key]}
              </NavLink>
            ))}
            <a className="ext" href={SOCIAL[1].href} target="_blank" rel="noopener">
              {t.nav.blog}
            </a>
          </nav>
          <div className="tools">
            <div className="seg" role="group" aria-label="Language">
              <button aria-pressed={lang === "en"} onClick={() => setLang("en")}>
                EN
              </button>
              <button aria-pressed={lang === "zh"} onClick={() => setLang("zh")}>
                中
              </button>
            </div>
            <AccentMenu />
            <button
              key={spin}
              type="button"
              className={`icon-btn theme-btn ${spin ? "spin" : ""}`}
              title={theme === "dark" ? t.toLight : t.toDark}
              aria-label={t.themeLabel(t[theme])}
              data-testid="theme-toggle"
              onClick={() => {
                toggleTheme();
                setSpin((n) => n + 1);
              }}
            >
              <SunIcon />
              <MoonIcon />
            </button>
            <button className="kbtn" aria-label={t.palPh} onClick={() => app.setPaletteOpen(true)}>
              <SearchIcon />
              <kbd>{MOD}</kbd>
              <kbd>K</kbd>
            </button>
          </div>
        </div>
      </header>

      <main className="wrap">{children}</main>

      <footer className="foot">
        <span>© 2026 {t.foot}</span>
        <span>{EMAIL}</span>
      </footer>

      <button className={`vim ${mode === "INSERT" ? "ins" : ""}`} type="button" aria-label={t.help} data-testid="vim-status" onClick={() => app.setHelpOpen(true)}>
        <span className="mode">{mode}</span>
        <span className="cmd" data-testid="vim-cmd">
          {shown}
        </span>
        <span>{t.vimHint}</span>
      </button>
      <Suspense fallback={null}>
        {app.helpOpen && <KeyHelp />}
        {app.paletteOpen && <CommandPalette />}
      </Suspense>
      <div className={`toast ${app.toastMsg ? "on" : ""}`} role="status" aria-live="polite">
        {app.toastMsg}
      </div>
    </KeysCtx>
  );
}
