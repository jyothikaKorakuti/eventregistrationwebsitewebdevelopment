import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { ModuleStub } from "@/components/soc/module-stub";

export const Route = createFileRoute("/_authenticated/reports")({
  head: () => ({ meta: [{ title: "Reports · PDT-SOC" }] }),
  component: () => (
    <ModuleStub
      icon={FileText}
      moduleNumber={9}
      title="Reports"
      description="Export executive-ready PDF and CSV artefacts covering risk posture, incidents, and simulation results."
      features={[
        "PDF export (client-side, offline-safe)",
        "Executive summary + technical annex",
        "MITRE ATT&CK coverage report",
        "Attack path evidence pack",
        "Compliance-ready formatting",
        "Scheduled report generation",
      ]}
    />
  ),
});
