import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechNova 2026 – Future of Innovation" },
      {
        name: "description",
        content:
          "TechNova 2026 — Where Innovation Meets Opportunity. Join 2000+ attendees on August 15, 2026 in Hyderabad.",
      },
      { property: "og:title", content: "TechNova 2026 – Future of Innovation" },
      {
        property: "og:description",
        content: "A premier summit on AI, Cybersecurity, Cloud, and Entrepreneurship.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/index.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#0a0a14", color: "#f3f4f8", fontFamily: "system-ui, sans-serif" }}>
      <p>Loading TechNova 2026…</p>
    </div>
  );
}
