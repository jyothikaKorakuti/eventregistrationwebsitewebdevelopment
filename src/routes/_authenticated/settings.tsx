import { createFileRoute } from "@tanstack/react-router";
import { Settings as SettingsIcon, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings · PDT-SOC" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user, roles } = useAuth();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
          <SettingsIcon className="h-7 w-7" />
        </div>
        <div>
          <div className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Module 01 · Live
          </div>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">Profile & Settings</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your account, role assignments, and preferences.
          </p>
        </div>
      </header>

      <section className="glass-panel rounded-xl p-6">
        <div className="flex items-center gap-2 text-sm font-medium text-primary">
          <UserIcon className="h-4 w-4" />
          Account
        </div>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2 text-sm">
          <Field label="Display name" value={(user?.user_metadata?.display_name as string | undefined) ?? "—"} />
          <Field label="Email" value={user?.email ?? "—"} />
          <Field label="User ID" value={user?.id ?? "—"} mono />
          <Field label="Roles" value={roles.length ? roles.join(", ") : "analyst"} mono />
        </dl>
      </section>

      <section className="glass-panel rounded-xl p-6">
        <div className="text-sm font-medium text-primary">Coming in later modules</div>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          <li>· Organization management (Module 2)</li>
          <li>· User invitations & admin role assignment</li>
          <li>· Notification preferences</li>
          <li>· API tokens for integrations</li>
        </ul>
      </section>
    </div>
  );
}

function Field({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </dt>
      <dd className={`mt-1 truncate text-foreground ${mono ? "text-mono text-xs" : ""}`}>{value}</dd>
    </div>
  );
}
