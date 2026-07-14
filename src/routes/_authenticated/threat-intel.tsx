import { createFileRoute } from "@tanstack/react-router";
import { Radar } from "lucide-react";
import { ModuleStub } from "@/components/soc/module-stub";

export const Route = createFileRoute("/_authenticated/threat-intel")({
  head: () => ({ meta: [{ title: "Threat Intelligence · PDT-SOC" }] }),
  component: () => (
    <ModuleStub
      icon={Radar}
      moduleNumber={6}
      title="Threat Intelligence"
      description="Continuously enrich the twin with CVE data and MITRE ATT&CK mappings."
      features={[
        "CVE import (NVD-format JSON)",
        "MITRE ATT&CK tactic & technique mapping",
        "Severity + exploitability weighting",
        "Enrichment against enterprise assets",
        "Threat feed timeline",
        "IOCs & campaign correlation",
      ]}
    />
  ),
});
