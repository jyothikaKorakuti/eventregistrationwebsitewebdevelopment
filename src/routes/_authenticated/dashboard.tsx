import { createFileRoute } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Boxes,
  GitBranch,
  Radar,
  ShieldAlert,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";

import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "SOC Dashboard · Predictive Digital Twin SOC" },
      {
        name: "description",
        content:
          "Real-time SOC overview — assets, vulnerabilities, risk heatmap, MITRE coverage, alerts, and AI recommendations.",
      },
    ],
  }),
  component: DashboardPage,
});

interface Kpi {
  label: string;
  value: string;
  delta: string;
  tone: "info" | "success" | "warning" | "critical";
  icon: typeof Boxes;
}

const KPIS: Kpi[] = [
  { label: "Total Assets", value: "—", delta: "Awaiting scan", tone: "info", icon: Boxes },
  { label: "High-Risk Assets", value: "—", delta: "Module 5 live soon", tone: "critical", icon: AlertTriangle },
  { label: "Open Vulnerabilities", value: "—", delta: "CVE feed pending", tone: "warning", icon: ShieldAlert },
  { label: "MITRE Coverage", value: "—", delta: "Module 6 live soon", tone: "success", icon: Radar },
];

const MODULE_STATUS = [
  { m: 1, label: "Auth & Shell", status: "Live" },
  { m: 2, label: "Asset Discovery", status: "Next" },
  { m: 3, label: "Digital Twin Engine", status: "Planned" },
  { m: 4, label: "Attack Graph", status: "Planned" },
  { m: 5, label: "AI Risk Engine", status: "Planned" },
  { m: 6, label: "Threat Intelligence", status: "Planned" },
  { m: 7, label: "Attack Simulation", status: "Planned" },
  { m: 8, label: "Recommendations", status: "Planned" },
  { m: 9, label: "Dashboard & Reports", status: "In progress" },
  { m: 10, label: "Documentation Pack", status: "Planned" },
];

function DashboardPage() {
  const { user, roles } = useAuth();

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header>
        <div className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Command Center
        </div>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Welcome back,{" "}
          <span className="text-primary">
            {(user?.user_metadata?.display_name as string | undefined) ?? user?.email?.split("@")[0] ?? "Analyst"}
          </span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Role: <span className="text-mono">{roles.join(", ") || "analyst"}</span> · The Digital Twin is being built module-by-module.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((kpi) => (
          <KpiCard key={kpi.label} kpi={kpi} />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="glass-panel rounded-xl p-6 lg:col-span-2">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Activity className="h-4 w-4" />
            Build progress
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Modules ship in sequence. Approve each module completion to unlock the next.
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {MODULE_STATUS.map((row) => {
              const tone =
                row.status === "Live"
                  ? "text-success border-success/40 bg-success/10"
                  : row.status === "Next" || row.status === "In progress"
                    ? "text-warning border-warning/40 bg-warning/10"
                    : "text-muted-foreground border-border bg-muted/40";
              return (
                <li
                  key={row.m}
                  className="flex items-center justify-between rounded-md border border-border/60 bg-background/40 px-3 py-2 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-mono text-[10px] text-muted-foreground">
                      M{String(row.m).padStart(2, "0")}
                    </span>
                    <span className="text-foreground/90">{row.label}</span>
                  </div>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${tone}`}>
                    {row.status}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            What lands next
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            <NextItem icon={Boxes} title="Asset Discovery" body="Manual entry, JSON/CSV import, simulated Nmap seed." />
            <NextItem icon={GitBranch} title="Digital Twin Engine" body="Nodes/edges schema for devices, users, AD, firewalls, vulns." />
            <NextItem icon={Target} title="Attack Graph" body="Cytoscape visualization + path-finding in TypeScript." />
            <NextItem icon={TrendingUp} title="AI Risk Engine" body="Weighted score + Lovable AI explanation & recommendations." />
          </ul>
        </div>
      </section>
    </div>
  );
}

function KpiCard({ kpi }: { kpi: Kpi }) {
  const toneRing =
    kpi.tone === "critical"
      ? "ring-critical/40 bg-critical/10 text-critical"
      : kpi.tone === "warning"
        ? "ring-warning/40 bg-warning/10 text-warning"
        : kpi.tone === "success"
          ? "ring-success/40 bg-success/10 text-success"
          : "ring-info/40 bg-info/10 text-info";
  const Icon = kpi.icon;
  return (
    <div className="glass-panel rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {kpi.label}
          </div>
          <div className="mt-2 text-3xl font-semibold tracking-tight">{kpi.value}</div>
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-md ring-1 ${toneRing}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 text-xs text-muted-foreground">{kpi.delta}</div>
    </div>
  );
}

function NextItem({ icon: Icon, title, body }: { icon: typeof Boxes; title: string; body: string }) {
  return (
    <li className="flex items-start gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div>
        <div className="text-sm font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{body}</div>
      </div>
    </li>
  );
}
