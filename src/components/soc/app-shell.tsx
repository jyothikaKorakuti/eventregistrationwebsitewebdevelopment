import { Link, Outlet, useLocation, useRouter } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Bell,
  BookOpen,
  Boxes,
  ChevronLeft,
  ChevronRight,
  FileText,
  GitBranch,
  LayoutDashboard,
  LogOut,
  Network,
  Radar,
  Settings,
  Shield,
  ShieldAlert,
  Sparkles,
  Target,
  User as UserIcon,
} from "lucide-react";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  module: number;
}

const NAV: NavItem[] = [
  { to: "/dashboard", label: "SOC Dashboard", icon: LayoutDashboard, module: 9 },
  { to: "/assets", label: "Asset Discovery", icon: Boxes, module: 2 },
  { to: "/twin", label: "Digital Twin", icon: Network, module: 3 },
  { to: "/attack-graph", label: "Attack Graph", icon: GitBranch, module: 4 },
  { to: "/risk", label: "AI Risk Engine", icon: Sparkles, module: 5 },
  { to: "/threat-intel", label: "Threat Intel", icon: Radar, module: 6 },
  { to: "/simulation", label: "Attack Simulation", icon: Target, module: 7 },
  { to: "/recommendations", label: "Recommendations", icon: ShieldAlert, module: 8 },
  { to: "/reports", label: "Reports", icon: FileText, module: 9 },
  { to: "/docs", label: "Documentation", icon: BookOpen, module: 10 },
];

export function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, roles } = useAuth();
  const location = useLocation();
  const router = useRouter();
  const queryClient = useQueryClient();

  const isAdmin = roles.includes("admin");

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    router.navigate({ to: "/auth", replace: true });
  }

  const initials =
    (user?.user_metadata?.display_name as string | undefined)
      ?.split(" ")
      .map((s) => s[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() ??
    user?.email?.[0]?.toUpperCase() ??
    "S";

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside
        className={cn(
          "sticky top-0 z-30 flex h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200",
          collapsed ? "w-16" : "w-64",
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/30">
            <Shield className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold tracking-tight">PDT-SOC</div>
              <div className="truncate text-[10px] uppercase tracking-widest text-muted-foreground">
                Digital Twin SOC
              </div>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-0.5">
            {NAV.map((item) => {
              const active =
                location.pathname === item.to ||
                (item.to !== "/dashboard" && location.pathname.startsWith(item.to));
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-[inset_2px_0_0_0] shadow-primary"
                        : "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="truncate">{item.label}</span>
                        <span className="ml-auto text-mono text-[10px] text-muted-foreground">
                          M{String(item.module).padStart(2, "0")}
                        </span>
                      </>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border p-2">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="flex w-full items-center justify-center gap-2 rounded-md py-2 text-xs text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/70 px-6 backdrop-blur-md">
          <div className="flex items-center gap-2 text-mono text-xs text-muted-foreground">
            <Activity className="h-3.5 w-3.5 text-success" />
            <span>Digital Twin</span>
            <span className="text-border">/</span>
            <span className="text-foreground">
              {NAV.find(
                (n) =>
                  location.pathname === n.to ||
                  (n.to !== "/dashboard" && location.pathname.startsWith(n.to)),
              )?.label ?? "Console"}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:text-foreground"
              aria-label="Alerts"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-critical px-1 text-[9px] font-bold text-critical-foreground">
                0
              </span>
            </button>
            <button
              type="button"
              className="hidden sm:flex h-9 items-center gap-1.5 rounded-md border border-warning/40 bg-warning/10 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-warning"
              aria-label="Threat level"
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              THREATCON: Elevated
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 gap-2 px-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-semibold text-primary ring-1 ring-primary/30">
                    {initials}
                  </div>
                  <div className="hidden text-left leading-tight md:block">
                    <div className="text-xs font-medium">
                      {(user?.user_metadata?.display_name as string | undefined) ??
                        user?.email ??
                        "Analyst"}
                    </div>
                    <div className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      {isAdmin ? "Admin" : roles[0] ?? "Analyst"}
                    </div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/settings">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile & Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-6 py-8">
          <Outlet />
        </main>

        <footer className="border-t border-border px-6 py-3 text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Predictive Digital Twin SOC · v0.1.0</span>
            <span>Session encrypted · TLS 1.3</span>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Silence unused-import linter for icons kept for future modules
void Settings;
