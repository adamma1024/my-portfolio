import { useEffect, type ReactNode } from "react";
import { Command } from "cmdk";
import { useNavigate } from "react-router";
import { ACCENTS, EMAIL, ENTRIES, POSTS, SOCIAL, host, postUrl } from "@/content";
import { useApp } from "@/app/useApp";
import { PAGES, PAGE_KEYS } from "@/app/pages";
import { tint } from "@/lib/tint";
import { SOURCE_PATHS } from "@/pages/source-files";

function Item({ label, hint, onSelect, keywords, lead }: { label: string; hint?: string; onSelect: () => void; keywords?: string[]; lead?: ReactNode }) {
  return (
    <Command.Item value={`${label} ${hint ?? ""}`} keywords={keywords} onSelect={onSelect}>
      <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {lead}
        {label}
      </span>
      <span className="h">{hint}</span>
    </Command.Item>
  );
}

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, t, tx, lang, setLang, theme, toggleTheme, accent, setAccent, copyEmail } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!paletteOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [paletteOpen, setPaletteOpen]);

  if (!paletteOpen) return null;
  const run = (fn: () => void) => () => {
    setPaletteOpen(false);
    fn();
  };
  const open = (href: string) => run(() => window.open(href, "_blank", "noopener"));
  const g = t.palG;

  return (
    <div className="pal" data-testid="palette" onMouseDown={(e) => e.target === e.currentTarget && setPaletteOpen(false)}>
      <Command label={t.palPh} loop>
        <Command.Input autoFocus placeholder={t.palPh} />
        <Command.List>
          <Command.Empty>{t.noMatch}</Command.Empty>
          <Command.Group heading={g.pages}>
            {PAGES.map((path, i) => (
              <Item key={path} label={t.nav[PAGE_KEYS[i]]} hint={String(i + 1)} keywords={[PAGE_KEYS[i]]} onSelect={run(() => navigate(path))} />
            ))}
            <Item label={t.nav.resume} hint="/resume" keywords={["resume", "cv"]} onSelect={run(() => navigate("/resume"))} />
            <Item label={t.nav.blog} hint="adamma.me/blog" onSelect={open(SOCIAL[1].href)} />
          </Command.Group>
          <Command.Group heading={g.file}>
            {SOURCE_PATHS.map((p) => (
              <Item key={p} label={p} hint={t.nav.source} onSelect={run(() => navigate(`/source?file=${encodeURIComponent(p)}`))} />
            ))}
          </Command.Group>
          <Command.Group heading={g.trace}>
            {ENTRIES.filter((e) => e.uses.length > 0).map((e) => (
              <Item key={e.id} label={`${t.traceL} ${tx(e.short)}`} hint={t.nav.skills} keywords={[e.id]} onSelect={run(() => navigate(`/skills?pin=w:${e.id}`))} />
            ))}
          </Command.Group>
          <Command.Group heading={g.time}>
            {ENTRIES.map((e) => (
              <Item key={e.id} label={`${t.jumpL} ${tx(e.short)}`} hint={e.from} keywords={[e.id]} onSelect={run(() => navigate(`/experience?at=${e.from}`))} />
            ))}
          </Command.Group>
          <Command.Group heading={g.posts}>
            {POSTS.map((p) => (
              <Item key={p.slug} label={tx(p.title)} hint={p.date} onSelect={open(postUrl(p))} />
            ))}
          </Command.Group>
          <Command.Group heading={g.theme}>
            <Item label={theme === "dark" ? t.toLight : t.toDark} hint="t" keywords={["theme", "dark", "light", "mocha", "latte"]} onSelect={run(toggleTheme)} />
          </Command.Group>
          <Command.Group heading={g.lang}>
            <Item label={lang === "zh" ? "English" : "中文"} hint="L" keywords={["language", "chinese", "english", "语言"]} onSelect={run(() => setLang(lang === "zh" ? "en" : "zh"))} />
          </Command.Group>
          <Command.Group heading={g.accent}>
            {ACCENTS.map((a) => (
              <Item key={a} label={a} hint={a === accent ? t.current : ""} keywords={["accent", "color"]} lead={<span className="dot" style={tint(a)} />} onSelect={run(() => setAccent(a))} />
            ))}
          </Command.Group>
          <Command.Group heading={g.links}>
            {ENTRIES.flatMap((e) =>
              e.links.map((l) => <Item key={e.id + l.href} label={`${tx(e.short)} · ${tx(l.label)}`} hint={host(l.href)} onSelect={open(l.href)} />),
            )}
          </Command.Group>
          <Command.Group heading={g.contact}>
            <Item label={t.copyEmail} hint={EMAIL} keywords={["email", "mail"]} onSelect={run(copyEmail)} />
            <Item label={`${t.openL} GitHub`} hint={SOCIAL[2].text} onSelect={open(SOCIAL[2].href)} />
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
