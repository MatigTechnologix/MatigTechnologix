"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SURL = "https://flrccmjaiyutynhydxeo.supabase.co";
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}`, "Content-Type": "application/json" };

export default function PortalLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${SURL}/rest/v1/Member?email=eq.${form.email}&password=eq.${form.password}&status=eq.Active`, { headers: H });
      const data = await res.json();
      if (data.length > 0) {
        localStorage.setItem("matig-member", JSON.stringify({ id: data[0].id, name: data[0].name, position: data[0].position }));
        router.push("/portal/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch { setError("Something went wrong"); }
    setLoading(false);
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0a0f1a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Manrope, sans-serif" }}>
      <div style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "1.25rem", padding: "2.5rem", width: "100%", maxWidth: "420px", boxShadow: "0 25px 60px rgba(0,0,0,0.4)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
          <span style={{ display: "inline-block", width: 10, height: 10, background: "#00f5a0", transform: "rotate(45deg)" }} />
          <span style={{ fontWeight: 800, fontSize: "1.1rem", letterSpacing: "-0.06em" }}>MATIG CMS</span>
        </div>
        <h1 style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.4rem" }}>Member Login</h1>
        <p style={{ color: "#8892a4", fontSize: "0.88rem", marginBottom: "2rem" }}>Welcome back! Please login to your account.</p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ color: "#c8d0dc", fontSize: "0.82rem", display: "block", marginBottom: "0.5rem" }}>Email Address</label>
            <input type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              style={{ width: "100%", padding: "0.85rem 1rem", background: "#0d1520", border: "1px solid #1e2d40", borderRadius: "0.6rem", color: "#fff", fontSize: "0.9rem", boxSizing: "border-box" as any }} />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ color: "#c8d0dc", fontSize: "0.82rem", display: "block", marginBottom: "0.5rem" }}>Password</label>
            <input type="password" required value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              style={{ width: "100%", padding: "0.85rem 1rem", background: "#0d1520", border: "1px solid #1e2d40", borderRadius: "0.6rem", color: "#fff", fontSize: "0.9rem", boxSizing: "border-box" as any }} />
          </div>
          {error && <p style={{ color: "#ff6b6b", fontSize: "0.85rem", marginBottom: "1rem" }}>{error}</p>}
          <button type="submit" disabled={loading}
            style={{ width: "100%", padding: "1rem", background: "#00f5a0", color: "#0a0f1a", border: "none", borderRadius: "0.6rem", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer" }}>
            {loading ? "Signing in..." : "Sign In →"}
          </button>
        </form>
        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          <a href="/matig-admin-tech" style={{ color: "#8892a4", fontSize: "0.82rem" }}>← Back to Dashboard</a>
        </div>
      </div>
    </main>
  );
}
