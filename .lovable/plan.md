## Predictive Digital Twin SOC — Lovable-Adapted Plan

You asked for a FastAPI + Neo4j + Python-ML + Docker stack. Lovable's runtime is React + TanStack Start (TypeScript) on Cloudflare Workers with Lovable Cloud (Postgres + Auth). I'm adapting the stack so the platform actually runs live here; the research value (attack graphs, risk scoring, MITRE mapping, simulations, recommendations) is fully preserved.

### Adapted stack

| Your spec | Lovable build |
|---|---|
| React + TS + Tailwind + Recharts + Cytoscape | ✅ Same |
| FastAPI (Python) | TanStack Start server functions (TypeScript) |
| PostgreSQL | Lovable Cloud (Supabase Postgres + RLS) |
| Neo4j graph DB | Postgres adjacency tables (`nodes`, `edges`) with graph algorithms in TS |
| scikit-learn / XGBoost | Transparent weighted risk engine in TS **+** Lovable AI (Gemini) for explanations & recommendations |
| Nmap / OpenVAS / AD / Wazuh | Simulated + import (JSON/CSV) — no shell access on Workers |
| Docker Compose | Lovable auto-deploy (no self-hosting needed) |

### Scope decision

Replacing the current TechNova static site (kept as `public/` legacy) and building the SOC platform as the main app in this project.

### Module build order (I will stop after each and wait for your OK)

1. **Auth + App Shell** ← starting now
   - Enable Lovable Cloud
   - `profiles` table + `user_roles` table (enum: `admin`, `analyst`) with `has_role()` security-definer
   - Email/password + Google login, `/auth` page, `_authenticated` gate
   - Dark SOC theme (Sentinel/Cortex-inspired), sidebar shell, top bar, route scaffolding for all future modules
2. Asset Discovery (manual add, CSV/JSON import, simulated Nmap seed)
3. Digital Twin Engine (nodes + edges schema, org/device/user/AD/firewall/vuln modeling)
4. Attack Graph Generator (Cytoscape, path-finding in TS)
5. AI Risk Prediction Engine (weighted score + Lovable AI explanation)
6. Threat Intel (CVE + MITRE ATT&CK mapping, seeded dataset)
7. Attack Simulation (phishing / ransomware / cred theft / priv-esc / lateral)
8. Recommendation Engine (rule-based + AI-augmented)
9. SOC Dashboard (heatmap, MITRE coverage, alerts, trends, PDF export)
10. Documentation pack (`/docs`: ER, DFD, sequence, use-case, API, install, final-year report, README) — mermaid diagrams

### Module 1 deliverables (this turn)

- Enable Lovable Cloud
- Migration: `profiles`, `app_role` enum, `user_roles`, `has_role()`, RLS + GRANTs, signup trigger
- `/auth` route (email/password + Google, redirect-back)
- `_authenticated` protected layout, sign-out hygiene
- Dark SOC theme tokens in `src/styles.css` (deep navy/cyan/red accents, mono for telemetry)
- App shell: collapsible sidebar with all module routes (stubs), top bar with user menu + role badge
- Stub routes for every module returning "Coming in Module N" placeholder so navigation works end-to-end
- `/dashboard` landing with KPI card skeletons wired to the shell
- Old TechNova files retained under `public/` legacy (not linked)

Ready to build Module 1. Approve to proceed.
