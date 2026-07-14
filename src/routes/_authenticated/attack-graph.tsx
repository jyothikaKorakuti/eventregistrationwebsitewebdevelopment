import { createFileRoute } from "@tanstack/react-router";
import { GitBranch } from "lucide-react";
import { ModuleStub } from "@/components/soc/module-stub";

export const Route = createFileRoute("/_authenticated/attack-graph")({
  head: () => ({ meta: [{ title: "Attack Graph · PDT-SOC" }] }),
  component: () => (
    <ModuleStub
      icon={GitBranch}
      moduleNumber={4}
      title="Attack Graph Generator"
      description="Compute realistic attack paths across the digital twin and visualise lateral movement opportunities."
      features={[
        "Path-finding across trust boundaries",
        "Lateral movement visualisation",
        "Kill-chain stage annotations",
        "Choke-point & bottleneck detection",
        "Interactive graph with entry-point highlighting",
        "Export path evidence for reports",
      ]}
    />
  ),
});
