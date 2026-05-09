import { notesIn } from "@/lib/utils";

export function Projects() {
  const all = notesIn("04_Projects");
  const projects = all.filter((n) => n.type === "project");
  const supporting = all.filter((n) => n.type !== "project");

  const byStatus: Record<string, typeof projects> = {};
  for (const p of projects) {
    const s = p.status ?? "unspecified";
    (byStatus[s] ??= []).push(p);
  }
  // Preferred order first; any other statuses found in the data fall in after,
  // sorted alphabetically. Anything new (e.g. "draft", "backlog") is rendered,
  // never silently hidden.
  const PREFERRED = ["active", "paused", "done", "archived", "unspecified"];
  const extra = Object.keys(byStatus)
    .filter((s) => !PREFERRED.includes(s))
    .sort();
  const order = [...PREFERRED, ...extra];

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <div className="badge">04_Projects</div>
        <h1 className="font-sans text-4xl font-light tracking-tight">Projects</h1>
        <p className="font-mono text-sm text-fg-muted">
          Anything tagged `type: project`, grouped by status. Supporting files (specs,
          notes, drafts) listed separately.
        </p>
      </header>

      {order.map((status) => {
        const items = byStatus[status];
        if (!items?.length) return null;
        return (
          <section key={status} className="space-y-3">
            <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-fg-subtle">
              {status} &middot; {items.length}
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {items.map((p) => (
                <article key={p.path} className="card p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-sans text-base font-semibold text-fg">
                      {p.title}
                    </h3>
                    <span
                      className={`badge ${
                        status === "active"
                          ? "border-primary/40 text-primary"
                          : status === "paused"
                          ? "border-accent/40 text-accent"
                          : ""
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  {p.excerpt && (
                    <p className="mt-2 font-mono text-[12px] leading-relaxed text-fg-muted">
                      {p.excerpt}
                    </p>
                  )}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.tags.slice(0, 5).map((t) => (
                      <span key={t} className="badge">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 font-mono text-[11px] text-fg-subtle">
                    {p.path}
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      })}

      {supporting.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-fg-subtle">
            Supporting files &middot; {supporting.length}
          </h2>
          <div className="card divide-y divide-border">
            {supporting.map((n) => (
              <div
                key={n.path}
                className="flex items-center justify-between px-5 py-3"
              >
                <div className="min-w-0">
                  <div className="truncate text-sm text-fg">{n.title}</div>
                  <div className="truncate font-mono text-[11px] text-fg-subtle">
                    {n.path}
                  </div>
                </div>
                {n.type && <span className="badge">{n.type}</span>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
