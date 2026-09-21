"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Nav, Footer, CTA } from "../../../../components/site";

const SURL = "https://flrccmjaiyutynhydxeo.supabase.co";
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}` };

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SURL}/rest/v1/CaseStudy?slug=eq.${slug}`, { headers: H })
      .then(r => r.json())
      .then(data => { setItem(Array.isArray(data) && data.length > 0 ? data[0] : null); setLoading(false); });
  }, [slug]);

  if (loading) return <><Nav /><main><div style={{ padding: "4rem", color: "#8892a4" }}>Loading...</div></main><Footer /></>;
  if (!item) return <><Nav /><main><div style={{ padding: "4rem", textAlign: "center" }}><p style={{ color: "#8892a4" }}>Not found.</p><Link href="/case-studies" style={{ color: "#00f5a0" }}>← Back</Link></div></main><Footer /></>;

  return (
    <>
      <Nav />
      <main>
        {item.image && <div style={{ width: "100%", height: "400px", overflow: "hidden" }}><img src={item.image} alt={item.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} /></div>}
        <section className="shell" style={{ maxWidth: "760px", padding: "4rem 2rem" }}>
          <Link href="/case-studies" style={{ color: "#00f5a0", fontSize: "0.85rem", textDecoration: "none", display: "block", marginBottom: "2rem" }}>← Back to case studies</Link>
          <span className="eyebrow">Case Study</span>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "700", margin: "1rem 0 2rem" }}>{item.title}</h1>
          <div style={{ color: "#c8d0dc", fontSize: "1.05rem", lineHeight: "1.8", whiteSpace: "pre-wrap" }}>{item.detail}</div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}