"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Footer, PageHero } from "../../components/site";

const SURL = "https://flrccmjaiyutynhydxeo.supabase.co";
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHl4eGUiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc4OTkwMjgwNCwiZXhwIjoyMTA1NDc4ODA0fQ.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}` };

const fallback = [
  { id: "1", title: "Lead Generation", detail: "Targeted prospect lists designed around your exact ICP.", slug: "lead-generation", image: null },
  { id: "2", title: "LinkedIn Outreach", detail: "Thoughtful conversations that earn qualified replies.", slug: "linkedin-outreach", image: null },
  { id: "3", title: "B2B Prospect Research", detail: "Decision-maker intelligence your sales team can trust.", slug: "prospect-research", image: null },
  { id: "4", title: "Digital Marketing", detail: "Campaigns built to generate attention and action.", slug: "digital-marketing", image: null },
  { id: "5", title: "Branding & Design", detail: "Distinct visual systems for credible B2B brands.", slug: "branding-design", image: null },
  { id: "6", title: "Website Development", detail: "Fast, considered sites engineered to convert.", slug: "website-development", image: null },
];

export default function Services() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SURL}/rest/v1/Service?status=eq.Published&order=createdAt.desc`, { headers: H })
      .then(r => r.json())
      .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const list = items.length > 0 ? items : fallback;

  return (
    <>
      <main>
        <PageHero
          eyebrow="What we do"
          title="Services built for B2B growth."
          copy="Every service is designed to move the right people closer to you."
        />

        <section className="shell" style={{ padding: "4rem 0" }}>
          {loading ? <p style={{ color: "#8892a4" }}>Loading...</p> :
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
            {list.map((item, i) => (
              <Link key={item.id} href={`/services/${item.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "1rem", overflow: "hidden", height: "100%" }}>
                  {item.image && <img src={item.image} alt={item.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />}
                  <div style={{ padding: "1.5rem" }}>
                    <span style={{ color: "#00f5a0", fontSize: "0.78rem", letterSpacing: "0.1em" }}>0{i + 1}</span>
                    <h2 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: "600", margin: "0.5rem 0" }}>{item.title}</h2>
                    <p style={{ color: "#8892a4", fontSize: "0.9rem", lineHeight: "1.6" }}>{item.detail}</p>
                    <span style={{ color: "#00f5a0", fontSize: "0.85rem", marginTop: "1rem", display: "block" }}>Learn more →</span>
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