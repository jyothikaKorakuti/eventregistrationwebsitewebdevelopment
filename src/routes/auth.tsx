import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertCircle, Loader2, Shield } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in · Predictive Digital Twin SOC" },
      {
        name: "description",
        content:
          "Sign in to the Predictive Digital Twin SOC — AI-driven cybersecurity platform for attack path simulation, risk scoring, and proactive threat prevention.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  // If already signed in, bounce to dashboard.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard", replace: true });
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) navigate({ to: "/dashboard", replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setInfo(null);
    try {
      if (tab === "signup") {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: displayName || email.split("@")[0] },
          },
        });
        if (err) throw err;
        setInfo(
          "Account created. If email confirmation is enabled, check your inbox — otherwise you're signed in.",
        );
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) throw err;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    setSubmitting(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) throw result.error;
      // If not redirected, session is already set — onAuthStateChange will navigate.
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
      setSubmitting(false);
    }
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left: brand panel */}
      <div className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(600px 400px at 20% 20%, oklch(0.35 0.15 220 / 0.35), transparent 60%), radial-gradient(500px 400px at 80% 80%, oklch(0.30 0.15 280 / 0.30), transparent 60%)",
          }}
        />
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/40">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <div className="text-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Predictive Digital Twin
            </div>
            <div className="text-lg font-semibold tracking-tight">Security Operations Center</div>
          </div>
        </div>

        <div className="max-w-lg">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight">
            Simulate attacks.{" "}
            <span className="text-primary">Predict risk.</span>{" "}
            Prevent breaches.
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            An AI-driven cybersecurity platform that mirrors your enterprise as a live digital
            twin — mapping assets, attack paths, and MITRE ATT&amp;CK coverage so SOC teams can act
            before adversaries do.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
            {[
              { label: "Attack Graph", value: "Lateral Movement" },
              { label: "Risk Engine", value: "AI · CVSS · Exposure" },
              { label: "MITRE ATT&CK", value: "Tactic Mapping" },
              { label: "Simulation", value: "5 Threat Vectors" },
            ].map((f) => (
              <div key={f.label} className="glass-panel rounded-md px-3 py-2.5">
                <div className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {f.label}
                </div>
                <div className="mt-0.5 text-sm font-medium">{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Classification · Internal · SOC Access Required
        </div>
      </div>

      {/* Right: form */}
      <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/40">
                <Shield className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold tracking-tight">PDT-SOC</div>
            </div>
          </div>

          <h2 className="text-2xl font-semibold tracking-tight">Access the SOC console</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in with your analyst credentials, or create a new account to get started.
          </p>

          <Tabs value={tab} onValueChange={(v) => setTab(v as "signin" | "signup")} className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="mt-6">
              <form className="space-y-4" onSubmit={handleEmailSubmit}>
                <EmailPasswordFields
                  email={email}
                  password={password}
                  onEmail={setEmail}
                  onPassword={setPassword}
                />
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Sign in
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="mt-6">
              <form className="space-y-4" onSubmit={handleEmailSubmit}>
                <div className="space-y-1.5">
                  <Label htmlFor="displayName">Display name</Label>
                  <Input
                    id="displayName"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Ava Sharma"
                    autoComplete="name"
                  />
                </div>
                <EmailPasswordFields
                  email={email}
                  password={password}
                  onEmail={setEmail}
                  onPassword={setPassword}
                />
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Create account
                </Button>
                <p className="text-xs text-muted-foreground">
                  The first account created becomes the platform admin. Later accounts default to the
                  Analyst role.
                </p>
              </form>
            </TabsContent>
          </Tabs>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              or continue with
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={handleGoogle}
            disabled={submitting}
          >
            <GoogleGlyph />
            Sign in with Google
          </Button>

          {error && (
            <div className="mt-4 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          {info && (
            <div className="mt-4 rounded-md border border-info/40 bg-info/10 p-3 text-sm text-info">
              {info}
            </div>
          )}

          <p className="mt-8 text-xs text-muted-foreground">
            By continuing you agree to internal acceptable use policies.{" "}
            <Link to="/" className="underline underline-offset-2">
              Back home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function EmailPasswordFields(props: {
  email: string;
  password: string;
  onEmail: (v: string) => void;
  onPassword: (v: string) => void;
}) {
  return (
    <>
      <div className="space-y-1.5">
        <Label htmlFor="email">Work email</Label>
        <Input
          id="email"
          type="email"
          value={props.email}
          onChange={(e) => props.onEmail(e.target.value)}
          placeholder="analyst@company.com"
          autoComplete="email"
          required
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={props.password}
          onChange={(e) => props.onPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="current-password"
          minLength={6}
          required
        />
      </div>
    </>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.5c-.24 1.4-1.68 4.1-5.5 4.1-3.3 0-6-2.7-6-6.2s2.7-6.2 6-6.2c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.2 14.6 2.3 12 2.3 6.8 2.3 2.7 6.5 2.7 12s4.1 9.7 9.3 9.7c5.4 0 8.9-3.8 8.9-9.1 0-.6-.07-1.1-.15-1.6H12z"
      />
    </svg>
  );
}
