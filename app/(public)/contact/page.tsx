"use client";
import { useState, useEffect } from "react";
import { Footer, PageHero } from "../../../components/site";

const SURL = "https://flrccmjaiyutynhydxeo.supabase.co";
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}` };

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "", context: "" });
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${SURL}/rest/v1/Service?status=eq.Published&order=createdAt.asc`, { headers: H })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setServices(data); });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", service: "", context: "" });
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inp: any = { width:"100%", padding:"0.85rem 1rem", background:"#0d1520", border:"1px solid #1e2d40", borderRadius:"0.6rem", color:"#fff", fontSize:"0.95rem", outline:"none", boxSizing:"border-box" };

  return (
    <>
      <main>
        <PageHero eyebrow="Start with proof" title="Get a free sample, tailored to your market." copy="Tell us where you are trying to go. We'll show you what a sharper first move could look like—no obligation." />

        <section style={{ padding:"5rem 2rem", background:"#0a0f1a" }}>
          <div style={{ maxWidth:"1100px", margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center" }}>

            {/* Left */}
            <div>
              <span style={{ color:"#00f5a0", fontSize:"0.75rem", fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase" as any, display:"block", marginBottom:"1.5rem" }}>WHAT TO EXPECT</span>
              <h2 style={{ fontSize:"clamp(2rem,4vw,3.2rem)", fontWeight:700, color:"#fff", lineHeight:1.15, marginBottom:"1.5rem" }}>A useful sample,<br />not a sales pitch.</h2>
              <p style={{ color:"#8892a4", fontSize:"1rem", lineHeight:1.7, marginBottom:"3rem", maxWidth:400 }}>Within 48 hours, you'll receive a focused piece of work based on your selected service.</p>
              <div style={{ display:"flex", gap:"2.5rem" }}>
                {[["2.4×","Average reply lift"],["48hr","Sample turnaround"],["100%","Human-checked data"]].map(([v,l]) => (
                  <div key={l}>
                    <div style={{ fontSize:"1.8rem", fontWeight:700, color:"#00f5a0", marginBottom:"0.25rem" }}>{v}</div>
                    <div style={{ fontSize:"0.8rem", color:"#8892a4" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Form */}
            <div style={{ background:"#111827", border:"1px solid #1e2d40", borderRadius:"1.25rem", padding:"2.5rem", boxShadow:"0 25px 60px rgba(0,0,0,0.4)" }}>
              {success ? (
                <div style={{ textAlign:"center", padding:"3rem 0" }}>
                  <div style={{ width:64, height:64, background:"rgba(0,245,160,0.1)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.5rem", fontSize:"1.75rem" }}>✓</div>
                  <h3 style={{ color:"#fff", fontSize:"1.5rem", marginBottom:"0.75rem" }}>Request received!</h3>
                  <p style={{ color:"#8892a4" }}>We will send your free sample within 48 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom:"1.25rem" }}>
                    <label style={{ display:"block", color:"#c8d0dc", fontSize:"0.85rem", marginBottom:"0.5rem" }}>Name</label>
                    <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name:e.target.value})} required style={inp} />
                  </div>

                  <div style={{ marginBottom:"1.25rem" }}>
                    <label style={{ display:"block", color:"#c8d0dc", fontSize:"0.85rem", marginBottom:"0.5rem" }}>Work email</label>
                    <input type="email" placeholder="you@company.com" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required style={inp} />
                  </div>

                  <div style={{ marginBottom:"1.25rem" }}>
                    <label style={{ display:"block", color:"#c8d0dc", fontSize:"0.85rem", marginBottom:"0.5rem" }}>I'm interested in</label>
                    <select value={form.service} onChange={e => setForm({...form, service:e.target.value})} required
                      style={{ ...inp, color: form.service ? "#fff" : "#8892a4", cursor:"pointer" }}>
                      <option value="">Select a service</option>
                      {services.map(s => (
                        <option key={s.id} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>

                  <div style={{ marginBottom:"1.5rem" }}>
                    <label style={{ display:"block", color:"#c8d0dc", fontSize:"0.85rem", marginBottom:"0.5rem" }}>A little context <span style={{ color:"#8892a4", fontWeight:400 }}>(optional)</span></label>
                    <textarea placeholder="What are you hoping to achieve?" value={form.context} onChange={e => setForm({...form, context:e.target.value})} rows={4}
                      style={{ ...inp, resize:"vertical", fontFamily:"inherit" }} />
                  </div>

                  {error && <p style={{ color:"#ff6b6b", fontSize:"0.85rem", marginBottom:"1rem", padding:"0.75rem", background:"rgba(255,107,107,0.1)", borderRadius:"0.5rem" }}>{error}</p>}

                  <button type="submit" disabled={loading}
                    style={{ width:"100%", padding:"1rem", background:loading?"#1e2d40":"#00f5a0", color:loading?"#8892a4":"#0a0f1a", border:"none", borderRadius:"0.6rem", fontSize:"0.95rem", fontWeight:600, cursor:loading?"not-allowed":"pointer" }}>
                    {loading ? "Sending..." : "Request my free sample →"}
                  </button>
                  <p style={{ textAlign:"center", color:"#8892a4", fontSize:"0.78rem", marginTop:"1rem" }}>No spam. No commitment. Just useful work.</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
