import { manifest } from "@/lib/utils";

const LAYERS = [
  { key: "skills", label: "Skills", subpath: "skills" },
  { key: "tools", label: "Tools", subpath: "tools" },
  { key: "connectors", label: "Connectors", subpath: "connectors" },
  { key: "integrations", label: "Integrations", subpath: "integrations" },
  { key: "agents", label: "Agents", subpath: "agents" },
];

export function Capabilities() {
  const cap = manifest.notes.filter((n) => n.folder === "02_Capabilities");

  const grouped = LAYERS.map((l) => ({
    ...l,
    items: cap.filter((n) =>
      n.path.startsWith(`02_Capabilities/${l.subpath}/`)
    ),
  }));

  const topLevel = cap.filter(
    (n) => n.path.split("/").length === 2 // 02_Capabilities/<file>.md
  );

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <div className="badge">02_Capabilities</div>
        <h1 className="font-sans text-4xl font-light tracking-tight">Capabilities</h1>
        <p className="font-mono text-sm text-fg-muted">
          The four-layer model from the vault: skills, tools, connectors, integrations,
          agents. Counts come from the manifest, not from a hand-maintained list.
        </p>
      </header>

      {topLevel.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-fg-subtle">
            Overview docs
          </h2>
          <div className="card divide-y divide-border">
            {topLevel.map((n) => (
              <div key={n.path} className="flex items-center justify-between px-5 py-3">
                <span className="text-sm text-fg">{n.title}</span>
                <span className="font-mono text-[11px] text-fg-subtle">
                  {n.path}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="grid gap-4 md:grid-cols-2">
        {grouped.map(({ key, label, items }) => (
          <article key={key} className="card p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-sans text-base font-semibold text-fg">{label}</h3>
              <span className="stat-value !text-2xl">{items.length}</span>
            </div>
            {items.length === 0 ? (
              <p className="mt-3 font-mono text-[12px] text-fg-subtle">
                None registered yet.
              </p>
            ) : (
              <ul className="mt-3 space-y-1.5">
                {items.slice(0, 6).map((n) => (
                  <li
                    key={n.path}
                    className="flex items-baseline justify-between gap-3 font-mono text-[12px]"
                  >
                    <span className="truncate text-fg-muted">{n.title}</span>
                    {n.status && (
                      <span className="badge !text-[10px]">{n.status}</span>
                    )}
                  </li>
                ))}
                {items.length > 6 && (
                  <li className="font-mono text-[11px] text-fg-subtle">
                    +{items.length - 6} more
                  </li>
                )}
              </ul>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}
