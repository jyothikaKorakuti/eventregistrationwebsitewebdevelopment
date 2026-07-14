import { createFileRoute } from "@tanstack/react-router";
import { Boxes } from "lucide-react";
import { ModuleStub } from "@/components/soc/module-stub";

export const Route = createFileRoute("/_authenticated/assets")({
  head: () => ({ meta: [{ title: "Asset Discovery · PDT-SOC" }] }),
  component: () => (
    <ModuleStub
      icon={Boxes}
      moduleNumber={2}
      title="Asset Discovery"
      description="Inventory every device, server, user, and network element that composes the enterprise digital twin."
      features={[
        "Manual asset addition with device metadata",
        "Bulk import via JSON / CSV",
        "Simulated Nmap seed for lab environments",
        "Asset classification & criticality scoring",
        "Owner and business-unit tagging",
        "Real-time inventory search & filters",
      ]}
    />
  ),
});
