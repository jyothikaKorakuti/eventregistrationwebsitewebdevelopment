import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { ModuleStub } from "@/components/soc/module-stub";

export const Route = createFileRoute("/_authenticated/recommendations")({
  head: () => ({ meta: [{ title: "Recommendations · PDT-SOC" }] }),
  component: () => (
    <ModuleStub
      icon={ShieldAlert}
      moduleNumber={8}
      title="Recommendation Engine"
      description="Rule-based + AI-augmented remediation guidance tailored to your twin's risk profile."
      features={[
        "Patch prioritisation",
        "MFA rollout recommendations",
        "Firewall rule improvements",
        "Password policy hardening",
        "Segmentation guidance",
        "Impact vs effort matrix",
      ]}
    />
  ),
});
