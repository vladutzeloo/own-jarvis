import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  FolderGit2,
  BrainCircuit,
  Wrench,
  Inbox as InboxIcon,
  Sparkles,
} from "lucide-react";
import { manifest, recentNotes, notesIn, notesOfType } from "@/lib/utils";

export function Dashboard() {
  const recent = recentNotes(6);
  const projects = notesIn("04_Projects").filter((n) => n.type === "project");
  const decisions = notesOfType("decision", "learning", "episode");
  const capabilities = notesIn("02_Capabilities").length;
  const inbox = notesIn("07_Inbox").length;

  const stats = [
    {
      label: "Active projects",
      value: projects.filter((p) => p.status === "active").length,
      to: "/projects",
      Icon: FolderGit2,
    },
    { label: "Memory items", value: decisions.length, to: "/memory", Icon: BrainCircuit },
    { label: "Capabilities", value: capabilities, to: "/capabilities", Icon: Wrench },
    { label: "Inbox", value: inbox, to: "/inbox", Icon: InboxIcon },
  ];

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <div className="badge">
          <Sparkles size={11} className="text-accent" aria-hidden="true" />
          <span>Online &middot; {manifest.total} notes indexed</span>
        </div>
        <h1 className="font-sans text-5xl font-light tracking-tight text-fg">
          Good to see you, <span className="font-semibold text-primary">Vladimir</span>.
        </h1>
        <p className="max-w-2xl font-mono text-sm leading-relaxed text-fg-muted">
          Your knowledge vault, surfaced. Pick up where you left off &mdash; recent
          activity below, every layer of capability one click away.
        </p>
      </header>

      <section
        aria-label="Vault statistics"
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {stats.map(({ label, value, to, Icon }) => (
          <Link
            key={label}
            to={to}
            className="card card-hover group p-5 outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="flex items-start justify-between">
              <Icon size={16} className="text-fg-subtle group-hover:text-primary" aria-hidden="true" />
              <ArrowUpRight
                size={14}
                className="text-fg-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden="true"
              />
            </div>
            <div className="mt-6 stat-value">{value}</div>
            <div className="mt-1 stat-label">{label}</div>
          </Link>
        ))}
      </section>

      <section aria-label="Recent activity" className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="font-mono text-xs uppercase tracking-[0.22em] text-fg-subtle">
            Recent activity
          </h2>
          <span className="font-mono text-[11px] text-fg-subtle">
            sorted by frontmatter `updated`
          </span>
        </div>
        <div className="card divide-y divide-border">
          {recent.map((note) => (
            <article
              key={note.path}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-4 transition-colors hover:bg-bg-subtle/40"
            >
              <span className="badge">{note.folder.replace(/^\d+_/, "")}</span>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-fg">{note.title}</div>
                {note.excerpt && (
                  <div className="mt-1 truncate font-mono text-[11px] text-fg-subtle">
                    {note.excerpt}
                  </div>
                )}
              </div>
              <span className="font-mono text-[11px] tabular-nums text-fg-muted">
                {note.updated ?? "—"}
              </span>
            </article>
          ))}
          {recent.length === 0 && (
            <div className="px-5 py-6 font-mono text-sm text-fg-muted">
              No dated notes yet. Add `updated:` to frontmatter to see activity here.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
