import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  FolderGit2,
  BrainCircuit,
  Wrench,
  Inbox as InboxIcon,
  Activity,
} from "lucide-react";
import { cn, manifest } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Dashboard", Icon: LayoutDashboard, end: true },
  { to: "/projects", label: "Projects", Icon: FolderGit2 },
  { to: "/memory", label: "Memory", Icon: BrainCircuit },
  { to: "/capabilities", label: "Capabilities", Icon: Wrench },
  { to: "/inbox", label: "Inbox", Icon: InboxIcon },
];

export function Layout() {
  const generated = new Date(manifest.generatedAt);
  return (
    <div className="grid min-h-screen grid-cols-[260px_1fr]">
      <aside className="border-r border-border bg-bg-elevated/40 backdrop-blur-sm">
        <div className="sticky top-0 flex h-screen flex-col">
          <div className="flex items-center gap-3 border-b border-border px-6 py-5">
            <div className="relative grid h-9 w-9 place-items-center rounded-lg border border-border bg-bg shadow-glow">
              <span className="font-mono text-sm font-bold text-primary">J</span>
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 animate-pulse rounded-full bg-success" />
            </div>
            <div className="leading-tight">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-fg-subtle">
                JARVIS
              </div>
              <div className="text-sm font-semibold text-fg">Desktop</div>
            </div>
          </div>

          <nav className="flex-1 px-3 py-4">
            <ul className="space-y-1">
              {NAV.map(({ to, label, Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      cn(
                        "group flex items-center gap-3 rounded-md px-3 py-2 font-medium transition-colors",
                        "text-fg-muted hover:bg-bg-subtle hover:text-fg",
                        isActive &&
                          "bg-bg-subtle text-fg ring-1 ring-primary/40 shadow-glow"
                      )
                    }
                  >
                    <Icon size={16} className="shrink-0" aria-hidden />
                    <span className="text-sm">{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t border-border px-6 py-4">
            <div className="flex items-center gap-2 font-mono text-[11px] text-fg-subtle">
              <Activity size={12} className="text-success" />
              <span className="uppercase tracking-wider">Vault online</span>
            </div>
            <div className="mt-1 font-mono text-[11px] text-fg-subtle">
              {manifest.total} notes &middot; manifest{" "}
              {generated.toISOString().slice(0, 10)}
            </div>
          </div>
        </div>
      </aside>

      <main className="min-w-0">
        <div className="mx-auto max-w-6xl px-8 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
