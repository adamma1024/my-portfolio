import { Dialog } from "@base-ui/react/dialog";
import { useApp } from "@/app/useApp";

type Row = [string[], string];

function Section({ title, rows }: { title: string; rows: Row[] }) {
  return (
    <div>
      <h3>{title}</h3>
      <dl>
        {rows.map(([keys, label]) => (
          <div key={keys.join()} style={{ display: "contents" }}>
            <dt>
              {keys.map((k) => (
                <kbd key={k}>{k}</kbd>
              ))}
            </dt>
            <dd>{label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const fromHints = (hints: [string, string, string][]): Row[] => hints.map(([a, b, label]) => [[a, b].filter(Boolean), label]);

export function KeyHelp() {
  const { helpOpen, setHelpOpen, t } = useApp();
  return (
    <Dialog.Root open={helpOpen} onOpenChange={(open) => setHelpOpen(open)}>
      <Dialog.Portal>
        <Dialog.Backdrop className="help-backdrop" />
        <Dialog.Popup className="help-box help-pop" data-testid="key-help">
          <Dialog.Title render={<h2 />}>{t.help}</Dialog.Title>
          <Dialog.Description render={<p />}>{t.helpP}</Dialog.Description>
          <div className="help-grid">
            <Section title={t.helpS.global} rows={t.helpG} />
            <Section title={t.helpS.nav} rows={t.helpN} />
            <Section title={t.helpS.home} rows={t.helpH} />
            <Section title={t.helpS.exp} rows={fromHints(t.expK)} />
            <Section title={t.helpS.sk} rows={fromHints(t.skK)} />
            <Section title={t.helpS.src} rows={fromHints(t.srcK)} />
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
