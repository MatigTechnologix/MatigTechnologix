"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Nav, Footer } from "../../components/site";

const SURL = "https://flrccmjaiyutynhydxeo.supabase.co";
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}` };

export default function CaseStudies() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SURL}/rest/v1/CaseStudy?status=eq.Published&order=createdAt.desc`, { headers: H })
      .then(r => r.json())
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  return (
    <>
      <Nav />
      <main>
        <section className="hero grid-bg" style={{ minHeight: "40vh" }}>
          <div className="shell hero-copy">
            <span className="eyebrow">Case Studies</span>
            <h1>Real results for real teams.</h1>
            <p>How we have helped B2B teams build better pipelines.</p>
          </div>
        </section>
        <section className="shell" style={{ padding: "4rem 0" }}>
          {loading ? <p style={{ color: "#8892a4" }}>Loading...</p> :
           items.length === 0 ? <p style={{ color: "#8892a4", textAlign: "center", padding: "4rem 0" }}>No case studies yet.</p> :
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
            {items.map(item => (
              <Link key={item.id} href={`/case-studies/${item.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "1rem", overflow: "hidden" }}>
                  {item.image && <img src={item.image} alt={item.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />}
                  <div style={{ padding: "1.5rem" }}>
                    <h2 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: "600", margin: "0 0 0.5rem" }}>{item.title}</h2>
                    <p style={{ color: "#8892a4", fontSize: "0.9rem", lineHeight: "1.6" }}>{item.detail}</p>
                    <span style={{ color: "#00f5a0", fontSize: "0.85rem", marginTop: "1rem", display: "block" }}>Read case study →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>}
        </section>
      </main>
      <Footer />
    </>
  );
}