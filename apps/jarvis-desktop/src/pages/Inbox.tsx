import { notesIn } from "@/lib/utils";
import { Inbox as InboxIcon } from "lucide-react";

export function Inbox() {
  const items = notesIn("07_Inbox");
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <div className="badge">07_Inbox</div>
        <h1 className="font-sans text-4xl font-light tracking-tight">Inbox</h1>
        <p className="font-mono text-sm text-fg-muted">
          Capture buffer. Prune weekly &mdash; durable items move to Memory or Knowledge.
        </p>
      </header>

      {items.length === 0 ? (
        <div className="card flex flex-col items-center justify-center gap-3 py-16 text-center">
          <div className="grid h-12 w-12 place-items-center rounded-full border border-border bg-bg-subtle">
            <InboxIcon size={20} className="text-fg-subtle" />
          </div>
          <p className="font-mono text-sm text-fg-muted">Inbox is empty.</p>
          <p className="font-mono text-[11px] text-fg-subtle">
            Drop new files into <code>07_Inbox/</code> in the vault.
          </p>
        </div>
      ) : (
        <ul className="card divide-y divide-border">
          {items.map((n) => (
            <li key={n.path} className="px-5 py-4">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium text-fg">{n.title}</span>
                {n.updated && (
                  <span className="font-mono text-[11px] tabular-nums text-fg-subtle">
                    {n.updated}
                  </span>
                )}
              </div>
              {n.excerpt && (
                <p className="mt-1 font-mono text-[11px] leading-relaxed text-fg-muted">
                  {n.excerpt}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
