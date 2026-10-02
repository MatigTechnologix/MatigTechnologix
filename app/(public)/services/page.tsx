"use client";
import { useEffect, useState } from "react";
import { Footer, PageHero } from "../../../components/site";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}` };

const icons: any = { "QA Engineer": "🧪", "Web Development": "💻" };

export default function Services() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SURL}/rest/v1/Service?status=eq.Published&order=createdAt.asc`, { headers: H })
      .then(r => r.json())
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  return (
    <>
      <main>
        <PageHero eyebrow="What I do" title="Services built for quality & growth." copy="Professional QA engineering and web development services tailored to your needs." />

        <section className="shell" style={{ padding: "4rem 0" }}>
          {loading ? <p style={{ color: "#8892a4" }}>Loading...</p> :
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(480px, 1fr))", gap: "2rem" }}>
            {items.map((item, i) => (
              <div key={item.id} style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "1.25rem", overflow: "hidden" }}>
                {/* Header */}
                <div style={{ padding: "2rem", borderBottom: "1px solid #1e2d40", background: "linear-gradient(135deg, rgba(0,245,160,0.05), transparent)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
                    <div style={{ width: 48, height: 48, background: "rgba(0,245,160,0.1)", border: "1px solid rgba(0,245,160,0.2)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>
                      {icons[item.title] || "⚡"}
                    </div>
                    <div>
                      <span style={{ color: "#00f5a0", fontSize: "0.72rem", letterSpacing: "0.1em", fontFamily: "DM Mono, monospace" }}>0{i + 1}</span>
                      <h2 style={{ color: "#fff", fontSize: "1.4rem", fontWeight: 700, margin: 0, letterSpacing: "-0.03em" }}>{item.title}</h2>
                    </div>
                  </div>
                  <p style={{ color: "#8892a4", fontSize: "0.9rem", lineHeight: 1.7, margin: 0 }}>{item.detail}</p>
                </div>

                {/* Sub-services */}
                {item.subServices && (
                  <div style={{ padding: "1.5rem 2rem" }}>
                    <p style={{ color: "#8892a4", fontSize: "0.72rem", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "1rem", fontFamily: "DM Mono, monospace" }}>What's included</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.6rem" }}>
                      {item.subServices.split("|").map((sub: string) => (
                        <div key={sub} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 0.75rem", background: "#0d1520", borderRadius: "0.5rem", border: "1px solid #1e2d40" }}>
                          <span style={{ color: "#00f5a0", fontSize: "0.75rem" }}>✓</span>
                          <span style={{ color: "#c8d0dc", fontSize: "0.82rem" }}>{sub.trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div style={{ padding: "1rem 2rem 1.5rem" }}>
                  <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "#00f5a0", fontSize: "0.85rem", fontWeight: 600, textDecoration: "none" }}>
                    Get in touch →
                  </a>
                </div>
              </div>
            ))}
          </div>}
        </section>
      </main>
      <Footer />
    </>
  );
}
