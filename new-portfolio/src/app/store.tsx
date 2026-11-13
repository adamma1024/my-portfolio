import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useSearchParams } from "react-router";
import { ACCENTS, EMAIL, type Accent } from "@/content";
import { DICT } from "@/i18n/dict";
import { AppCtx, type Store, type Theme } from "./useApp";
import { pickLang, type Lang } from "@/lib/lang";

const read = (k: string): string | null => {
  try {
    return localStorage.getItem(k);
  } catch {
    return null; // private mode or blocked storage: fall back to defaults
  }
};
const write = (k: string, v: string) => {
  try {
    localStorage.setItem(k, v);
  } catch {
    /* preference simply won't persist */
  }
};

const isAccent = (v: unknown): v is Accent => ACCENTS.includes(v as Accent);
const initialTheme = (): Theme => (document.documentElement.classList.contains("mocha") ? "dark" : "light");

export function AppProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useSearchParams();
  const [lang, setLangState] = useState<Lang>(() => pickLang(window.location.search, read("ps-lang"), navigator.language || "en"));
  const [theme, setThemeState] = useState<Theme>(initialTheme);
  const [accent, setAccentState] = useState<Accent>(() => {
    const a = read("ps-accent");
    return isAccent(a) ? a : "blue";
  });
  const [toastMsg, setToastMsg] = useState("");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [accentOpen, setAccentOpen] = useState(false);
  const toastTimer = useRef<number | undefined>(undefined);

  // A shared link with ?lang= wins over the remembered choice (state adjusted during render, not in an effect).
  const urlLang = params.get("lang");
  const [seenUrlLang, setSeenUrlLang] = useState(urlLang);
  if (urlLang !== seenUrlLang) {
    setSeenUrlLang(urlLang);
    if ((urlLang === "en" || urlLang === "zh") && urlLang !== lang) setLangState(urlLang);
  }

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("mocha", theme === "dark");
    root.classList.toggle("latte", theme === "light");
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.accent = accent;
  }, [accent]);

  // Follow the OS until the visitor makes an explicit choice.
  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!read("ps-theme")) setThemeState(mq.matches ? "dark" : "light");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setLang = useCallback(
    (l: Lang) => {
      setLangState(l);
      write("ps-lang", l);
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (l === "zh") next.set("lang", "zh");
          else next.delete("lang");
          return next;
        },
        { replace: true },
      );
    },
    [setParams],
  );
  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    write("ps-theme", next);
  }, []);
  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      write("ps-theme", next);
      return next;
    });
  }, []);
  const setAccent = useCallback((a: Accent) => {
    setAccentState(a);
    write("ps-accent", a);
  }, []);
  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMsg(""), 2600);
  }, []);

  const t = DICT[lang];
  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(
      () => toast(`${t.copied} ${EMAIL}`),
      (err: unknown) => {
        console.error("Clipboard write failed", err);
        toast(`${t.copyBlocked} ${EMAIL}`);
      },
    );
  }, [t, toast]);

  const value = useMemo<Store>(
    () => ({
      lang, setLang, t, tx: (v) => v[lang], theme, toggleTheme, setTheme, accent, setAccent, toastMsg, toast, copyEmail,
      paletteOpen, setPaletteOpen, helpOpen, setHelpOpen, accentOpen, setAccentOpen,
    }),
    [lang, setLang, t, theme, toggleTheme, setTheme, accent, setAccent, toastMsg, toast, copyEmail, paletteOpen, helpOpen, accentOpen],
  );
  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}
