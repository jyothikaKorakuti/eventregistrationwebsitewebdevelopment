import type { LucideIcon } from "lucide-react";
import { Sparkles } from "lucide-react";

interface ModuleStubProps {
  icon: LucideIcon;
  title: string;
  moduleNumber: number;
  description: string;
  features: string[];
}

/**
 * Placeholder rendered by each module route until that module is built.
 * Keeps navigation and IA testable end-to-end during incremental delivery.
 */
export function ModuleStub({
  icon: Icon,
  title,
  moduleNumber,
  description,
  features,
}: ModuleStubProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
          <Icon className="h-7 w-7" />
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span className="text-mono">Module {String(moduleNumber).padStart(2, "0")}</span>
            <span className="rounded-full border border-warning/40 bg-warning/10 px-2 py-0.5 text-[10px] font-semibold text-warning">
              Roadmap
            </span>
          </div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="glass-panel rounded-xl p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-primary">
          <Sparkles className="h-4 w-4" />
          Planned capabilities
        </div>
        <ul className="grid gap-2 sm:grid-cols-2">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 rounded-md border border-border/60 bg-background/40 p-3 text-sm text-foreground/90"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted-foreground">
          This module ships in a later increment. Auth, RBAC, and the SOC shell (Module 01) are live now.
        </p>
      </div>
    </div>
  );
}
