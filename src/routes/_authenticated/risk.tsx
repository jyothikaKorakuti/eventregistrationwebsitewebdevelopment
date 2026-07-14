import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { ModuleStub } from "@/components/soc/module-stub";

export const Route = createFileRoute("/_authenticated/risk")({
  head: () => ({ meta: [{ title: "AI Risk Engine · PDT-SOC" }] }),
  component: () => (
    <ModuleStub
      icon={Sparkles}
      moduleNumber={5}
      title="AI Risk Prediction Engine"
      description="Transparent, explainable risk scoring for every asset — weighted feature model plus AI-generated reasoning."
      features={[
        "Weighted score (0–100) per asset",
        "Inputs: CVSS, patch status, criticality, exposure, incidents",
        "Attack probability + confidence score",
        "Explainability powered by Lovable AI",
        "Prioritised remediation queue",
        "Trend analysis across time",
      ]}
    />
  ),
});
