import { createFileRoute } from "@tanstack/react-router";
import { Target } from "lucide-react";
import { ModuleStub } from "@/components/soc/module-stub";

export const Route = createFileRoute("/_authenticated/simulation")({
  head: () => ({ meta: [{ title: "Attack Simulation · PDT-SOC" }] }),
  component: () => (
    <ModuleStub
      icon={Target}
      moduleNumber={7}
      title="Attack Simulation"
      description="Run five realistic threat scenarios against the twin and observe how the environment holds up."
      features={[
        "Phishing scenario",
        "Ransomware propagation",
        "Credential theft",
        "Privilege escalation",
        "Lateral movement",
        "Blast-radius impact scoring",
      ]}
    />
  ),
});
