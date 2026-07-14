import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, GitBranch, Radar, Shield, Sparkles, Target } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Predictive Digital Twin SOC · AI-Driven Cybersecurity Platform" },
      {
        name: "description",
        content:
          "AI-driven cybersecurity platform that mirrors your enterprise as a live digital twin — attack path simulation, risk scoring, MITRE ATT&CK mapping, and proactive threat prevention.",
      },
      { property: "og:title", content: "Predictive Digital Twin SOC" },
      {
        property: "og:description",
        content:
          "Simulate attacks, predict risk, and prevent breaches. A next-gen SOC console powered by digital twins and AI.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const navigate = useNavigate();

  useEffect(() => {
    // If signed in, jump straight to the console.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard", replace: true });
    });
  }, [navigate]);

  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/15 text-primary ring-1 ring-primary/40">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="text-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Predictive Digital Twin
            </div>
            <div className="text-sm font-semibold">Security Operations Center</div>
          </div>
        </div>
        <Link
          to="/auth"
          className="inline-flex items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/20"
        >
          Enter console <ArrowRight className="h-4 w-4" />
        </Link>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20">
        <section className="py-16 lg:py-24">
          <div className="text-mono text-[10px] uppercase tracking-[0.3em] text-primary">
            Final-year research platform
          </div>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            Simulate attacks. <span className="text-primary">Predict risk.</span>
            <br />
            Prevent breaches — before they happen.
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground">
            An AI-driven cybersecurity platform that builds a live digital twin of your enterprise
            IT infrastructure, computes attack paths, scores risk with explainable AI, and gives SOC
            analysts proactive remediation guidance grounded in MITRE ATT&amp;CK.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              Launch SOC console <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#modules"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium hover:bg-accent"
            >
              Explore capabilities
            </a>
          </div>
        </section>

        <section id="modules" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: GitBranch, title: "Attack Graph", body: "Compute realistic lateral movement across the twin." },
            { icon: Sparkles, title: "AI Risk Engine", body: "Explainable 0–100 scores per asset, powered by Lovable AI." },
            { icon: Radar, title: "MITRE ATT&CK", body: "Live technique coverage across your environment." },
            { icon: Target, title: "5 Threat Simulations", body: "Phishing, ransomware, cred theft, priv-esc, lateral." },
            { icon: Shield, title: "Recommendations", body: "Rule- and AI-driven remediation prioritisation." },
            { icon: Shield, title: "Reports", body: "Executive PDFs and audit-ready evidence packs." },
          ].map((f) => (
            <div key={f.title} className="glass-panel rounded-xl p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary ring-1 ring-primary/30">
                <f.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-base font-semibold">{f.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-border py-6 text-center text-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        PDT-SOC · Final-year Cybersecurity Project · v0.1.0
      </footer>
    </div>
  );
}
