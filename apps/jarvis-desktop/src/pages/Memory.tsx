import { notesIn } from "@/lib/utils";

type Bucket = "decisions" | "learnings" | "episodes" | "other";

const BUCKET_BY_TYPE: Record<string, Bucket> = {
  decision: "decisions",
  learning: "learnings",
  episode: "episodes",
};

export function Memory() {
  const items = notesIn("06_Memory");
  const buckets: Record<Bucket, typeof items> = {
    decisions: [],
    learnings: [],
    episodes: [],
    other: [],
  };
  for (const n of items) {
    const bucket = BUCKET_BY_TYPE[n.type ?? ""] ?? "other";
    buckets[bucket].push(n);
  }

  const sections = [
    { title: "Decisions", items: buckets.decisions, accent: "text-primary" },
    { title: "Learnings", items: buckets.learnings, accent: "text-accent" },
    { title: "Episodes", items: buckets.episodes, accent: "text-success" },
    { title: "Other", items: buckets.other, accent: "text-fg-muted" },
  ];

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <div className="badge">06_Memory</div>
        <h1 className="font-sans text-4xl font-light tracking-tight">Memory</h1>
        <p className="font-mono text-sm text-fg-muted">
          Decisions, learnings, and episodes &mdash; what Jarvis remembers between
          sessions.
        </p>
      </header>

      {sections.map(({ title, items, accent }) => (
        <section key={title} className="space-y-3">
          <h2 className={`font-mono text-xs uppercase tracking-[0.22em] ${accent}`}>
            {title} &middot; {items.length}
          </h2>
          {items.length === 0 ? (
            <p className="font-mono text-xs text-fg-subtle">None yet.</p>
          ) : (
            <ol className="space-y-2 border-l border-border pl-4">
              {items.map((n) => (
                <li key={n.path} className="relative">
                  <span className="absolute -left-[5px] top-2 h-1.5 w-1.5 rounded-full bg-border-strong" />
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="text-sm text-fg">{n.title}</div>
                    {n.updated && (
                      <span className="font-mono text-[11px] tabular-nums text-fg-subtle">
                        {n.updated}
                      </span>
                    )}
                  </div>
                  {n.excerpt && (
                    <div className="mt-0.5 font-mono text-[11px] leading-relaxed text-fg-muted">
                      {n.excerpt}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          )}
        </section>
      ))}
    </div>
  );
}
