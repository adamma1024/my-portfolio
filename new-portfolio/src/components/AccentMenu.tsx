import { useState, type KeyboardEvent } from "react";
import { Popover } from "@base-ui/react/popover";
import { ACCENTS } from "@/content";
import { useApp } from "@/app/useApp";
import { tint } from "@/lib/tint";

const MOVES: Record<string, number> = { ArrowRight: 1, l: 1, ArrowLeft: -1, h: -1, ArrowDown: 7, j: 7, ArrowUp: -7, k: -7 };

export function AccentMenu() {
  const { accent, setAccent, accentOpen, setAccentOpen, t } = useApp();
  const [hovered, setHovered] = useState<string | null>(null);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = MOVES[e.key];
    if (!step) return;
    const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>("[data-a]"));
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    e.preventDefault();
    e.stopPropagation();
    const next = buttons[(i + step + buttons.length) % buttons.length];
    next.focus();
    setHovered(next.dataset.a ?? null);
  };

  return (
    <Popover.Root open={accentOpen} onOpenChange={(open) => setAccentOpen(open)}>
      <Popover.Trigger className="acc-btn" aria-label={`${t.accentT}: ${accent}`}>
        <span className="sw" />
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Positioner side="bottom" align="end" sideOffset={8} className="acc-pos">
          <Popover.Popup className="acc-pop" initialFocus={false} onKeyDown={onKeyDown} data-testid="accent-menu">
            <div className="ttl">
              <span>{t.accentT}</span>
              <span>catppuccin</span>
            </div>
            <div className="acc-grid" onMouseLeave={() => setHovered(null)}>
              {ACCENTS.map((a) => (
                <button
                  key={a}
                  data-a={a}
                  style={tint(a)}
                  aria-label={a}
                  title={a}
                  aria-pressed={a === accent}
                  autoFocus={a === accent}
                  onMouseEnter={() => setHovered(a)}
                  onClick={() => {
                    setAccent(a);
                    setAccentOpen(false);
                  }}
                />
              ))}
            </div>
            <div className="acc-name">{hovered ?? accent}</div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
