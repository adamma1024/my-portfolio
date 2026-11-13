import { createContext, useContext } from "react";
import type { Accent, L10n } from "@/content";
import type { Dict } from "@/i18n/dict";
import type { Lang } from "@/lib/lang";

export type Theme = "light" | "dark";

export type Store = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  tx: (v: L10n) => string;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
  accent: Accent;
  setAccent: (a: Accent) => void;
  toastMsg: string;
  toast: (msg: string) => void;
  copyEmail: () => void;
  paletteOpen: boolean;
  setPaletteOpen: (v: boolean) => void;
  helpOpen: boolean;
  setHelpOpen: (v: boolean) => void;
  accentOpen: boolean;
  setAccentOpen: (v: boolean) => void;
};

export const AppCtx = createContext<Store | null>(null);

export function useApp(): Store {
  const v = useContext(AppCtx);
  if (!v) throw new Error("useApp must be used inside <AppProvider>");
  return v;
}
