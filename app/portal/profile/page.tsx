"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SURL = "https://flrccmjaiyutynhydxeo.supabase.co";
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}`, "Content-Type": "application/json" };

export default function ProfilePage() {
  const router = useRouter();
  const [member, setMember] = useState<any>(null);
  const [form, setForm] = useState({ name: "", phone: "", password: "" });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const m = localStorage.getItem("matig-member");
    if (!m) { router.push("/portal"); return; }
    const parsed = JSON.parse(m);
    setMember(parsed);
    fetch(`${SURL}/rest/v1/Member?id=eq.${parsed.id}`, { headers: H })
      .then(r => r.json())
      .then(data => { if (data[0]) setForm({ name: data[0].name, phone: data[0].phone || "", password: "" }); });
  }, []);

  const save = async () => {
    setSaving(true);
    const body: any = { name: form.name, phone: form.phone };
    if (form.password) body.password = form.password;
    await fetch(`${SURL}/rest/v1/Member?id=eq.${member.id}`, { method: "PATCH", headers: H, body: JSON.stringify(body) });
    localStorage.setItem("matig-member", JSON.stringify({ ...member, name: form.name }));
    setMsg("✅ Profile updated!");
    setTimeout(() => setMsg(""), 3000);
    setSaving(false);
  };

  const logout = () => { localStorage.removeItem("matig-member"); router.push("/portal"); };

  const inp: any = { width: "100%", padding: "0.85rem", background: "#0d1520", border: "1px solid #1e2d40", borderRadius: "0.6rem", color: "#fff", fontSize: "0.9rem", boxSizing: "border-box", fontFamily: "inherit" };

  return (
    <div style={{ minHeight: "100vh", background: "#0a0f1a", display: "flex", fontFamily: "Manrope, sans-serif" }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: "#111827", borderRight: "1px solid #1e2d40", padding: "1.5rem", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
          <span style={{ display: "inline-block", width: 10, height: 10, background: "#00f5a0", transform: "rotate(45deg)" }} />
          <span style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.06em" }}>MATIG CMS</span>
        </div>
        <nav style={{ flex: 1 }}>
          {[["🏠", "Dashboard", "/portal/dashboard"], ["📋", "My Attendance", "/portal/attendance"], ["👤", "Profile", "/portal/profile"]].map(([icon, label, href]) => (
            <a key={label} href={href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 0.5rem", color: href === "/portal/profile" ? "#fff" : "#8892a4", fontSize: "0.88rem", borderLeft: href === "/portal/profile" ? "2px solid #00f5a0" : "2px solid transparent", paddingLeft: "0.75rem", marginBottom: "0.25rem", textDecoration: "none" }}>
              {icon} {label}
            </a>
          ))}
        </nav>
        <button onClick={logout} style={{ background: "transparent", border: "1px solid #1e2d40", color: "#8892a4", padding: "0.6rem", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.82rem" }}>⬅ Logout</button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "2rem", maxWidth: 600 }}>
        <h1 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.5rem" }}>My Profile</h1>
        <p style={{ color: "#8892a4", marginBottom: "2rem", fontSize: "0.88rem" }}>Update your personal information.</p>

        {msg && <div style={{ background: "rgba(0,245,160,0.1)", border: "1px solid #00f5a0", borderRadius: "0.6rem", padding: "0.75rem 1rem", marginBottom: "1.5rem", color: "#00f5a0", fontSize: "0.88rem" }}>{msg}</div>}

        <div style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "1rem", padding: "2rem" }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ color: "#8892a4", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase" as any, display: "block", marginBottom: "0.5rem" }}>Full Name</label>
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inp} />
          </div>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ color: "#8892a4", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase" as any, display: "block", marginBottom: "0.5rem" }}>Phone Number</label>
            <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} style={inp} />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ color: "#8892a4", fontSize: "0.78rem", letterSpacing: "0.08em", textTransform: "uppercase" as any, display: "block", marginBottom: "0.5rem" }}>New Password (leave blank to keep current)</label>
            <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={inp} placeholder="••••••••" />
          </div>
          <button onClick={save} disabled={saving} style={{ background: "#00f5a0", border: "none", color: "#0a0f1a", padding: "0.85rem 2rem", borderRadius: "0.6rem", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
