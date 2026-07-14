import { createFileRoute } from "@tanstack/react-router";
import { Network } from "lucide-react";
import { ModuleStub } from "@/components/soc/module-stub";

export const Route = createFileRoute("/_authenticated/twin")({
  head: () => ({ meta: [{ title: "Digital Twin Engine · PDT-SOC" }] }),
  component: () => (
    <ModuleStub
      icon={Network}
      moduleNumber={3}
      title="Digital Twin Engine"
      description="A living virtual model of the enterprise network — devices, users, AD, firewalls, vulnerabilities, and their relationships."
      features={[
        "Graph-native nodes & edges schema in Postgres",
        "Model devices, servers, users, AD, firewalls",
        "Vulnerability linkage to assets",
        "Trust boundaries and network segmentation",
        "Interactive topology view (Cytoscape)",
        "Snapshot & versioning of the twin state",
      ]}
    />
  ),
});
