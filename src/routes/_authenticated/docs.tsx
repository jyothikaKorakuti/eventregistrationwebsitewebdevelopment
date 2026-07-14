import { createFileRoute } from "@tanstack/react-router";
import { BookOpen } from "lucide-react";
import { ModuleStub } from "@/components/soc/module-stub";

export const Route = createFileRoute("/_authenticated/docs")({
  head: () => ({ meta: [{ title: "Documentation · PDT-SOC" }] }),
  component: () => (
    <ModuleStub
      icon={BookOpen}
      moduleNumber={10}
      title="Documentation Pack"
      description="Full project documentation for the final-year submission — architecture, DFDs, schemas, and setup guides."
      features={[
        "ER diagram + database schema",
        "System architecture diagram",
        "Data-flow diagram (DFD levels 0–2)",
        "Sequence & use-case diagrams",
        "API documentation",
        "Installation guide + final-year report",
      ]}
    />
  ),
});
