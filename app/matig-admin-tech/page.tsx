"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (form.email === "admin@matigtechnologix.online" && form.password === "zxkP2F&[2udjabo") {
      localStorage.setItem("matig-admin", "true");
      router.push("/matig-admin-tech/dashboard");
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };

  return (
    <main style={{ minHeight: "100vh", background: "linear-gradient(135deg, #020d1a 0%, #041a2e 50%, #020d1a 100%)", display: "flex", fontFamily: "Manrope, sans-serif", overflow: "hidden", position: "relative" }}>
      
      {/* Background effects */}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,245,160,0.06), transparent 70%)", top: -200, right: 200, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,150,255,0.08), transparent 70%)", bottom: -100, left: 100, pointerEvents: "none" }} />

      {/* Left side */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "4rem", position: "relative" }}>
        
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "3rem" }}>
          <div style={{ width: 56, height: 56, background: "linear-gradient(135deg, #00f5a0, #00c97a)", borderRadius: "1rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", fontWeight: 900, color: "#020d1a" }}>M</div>
          <div>
            <div style={{ color: "#fff", fontSize: "1.4rem", fontWeight: 800, letterSpacing: "-0.04em" }}>MATIG Technologix CMS</div>
            <div style={{ color: "#8892a4", fontSize: "0.82rem", marginTop: "0.2rem" }}>Manage • Control • Grow</div>
          </div>
        </div>

        <p style={{ color: "#8892a4", fontSize: "1rem", lineHeight: 1.7, maxWidth: 360, marginBottom: "3rem" }}>
          Powerful CMS platform for seamless management and better performance.
        </p>

        {/* Features */}
        <div style={{ display: "flex", gap: "2rem" }}>
          {[["🛡️", "Secure", "Your data is safe"], ["⚡", "Fast", "Built for speed"], ["📊", "Reliable", "Always online"]].map(([icon, title, sub]) => (
            <div key={title}>
              <div style={{ width: 44, height: 44, background: "rgba(0,245,160,0.1)", border: "1px solid rgba(0,245,160,0.2)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", marginBottom: "0.75rem" }}>{icon}</div>
              <div style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 600 }}>{title}</div>
              <div style={{ color: "#8892a4", fontSize: "0.78rem", marginTop: "0.2rem" }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Login form */}
      <div style={{ width: 480, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
        <div style={{ width: "100%", background: "rgba(13,25,48,0.95)", border: "1px solid rgba(0,245,160,0.2)", borderRadius: "1.5rem", padding: "2.5rem", backdropFilter: "blur(20px)", boxShadow: "0 0 60px rgba(0,245,160,0.05)" }}>
          
          {/* Icon */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
            <div style={{ width: 64, height: 64, background: "linear-gradient(135deg, rgba(0,245,160,0.15), rgba(0,150,255,0.1))", border: "1px solid rgba(0,245,160,0.3)", borderRadius: "1.25rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", fontWeight: 900, color: "#00f5a0" }}>M</div>
          </div>

          <h1 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: 800, textAlign: "center", margin: "0 0 0.5rem" }}>
            Admin <span style={{ color: "#00f5a0" }}>Login</span>
          </h1>
          <p style={{ color: "#8892a4", textAlign: "center", fontSize: "0.85rem", marginBottom: "2rem" }}>Sign in to access your MATIG Technologix CMS</p>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ color: "#c8d0dc", fontSize: "0.82rem", display: "block", marginBottom: "0.5rem" }}>Email</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#8892a4" }}>✉️</span>
                <input type="email" required placeholder="Enter your email address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                  style={{ width: "100%", padding: "0.9rem 1rem 0.9rem 2.75rem", background: "#081326", border: "1px solid #1e2d40", borderRadius: "0.75rem", color: "#fff", fontSize: "0.9rem", boxSizing: "border-box" as any, outline: "none" }} />
              </div>
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ color: "#c8d0dc", fontSize: "0.82rem", display: "block", marginBottom: "0.5rem" }}>Password</label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "#8892a4" }}>🔒</span>
                <input type={showPass ? "text" : "password"} required placeholder="Enter your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  style={{ width: "100%", padding: "0.9rem 3rem 0.9rem 2.75rem", background: "#081326", border: "1px solid #1e2d40", borderRadius: "0.75rem", color: "#fff", fontSize: "0.9rem", boxSizing: "border-box" as any, outline: "none" }} />
                <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#8892a4", cursor: "pointer", fontSize: "1.1rem" }}>
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {error && <p style={{ color: "#ff6b6b", fontSize: "0.85rem", marginBottom: "1rem", textAlign: "center" }}>{error}</p>}

            <button type="submit" disabled={loading}
              style={{ width: "100%", padding: "1rem", background: "linear-gradient(135deg, #00f5a0, #00c97a)", color: "#020d1a", border: "none", borderRadius: "0.75rem", fontSize: "1rem", fontWeight: 700, cursor: "pointer", letterSpacing: "-0.02em" }}>
              {loading ? "Signing in..." : "Login →"}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem", color: "#8892a4", fontSize: "0.78rem" }}>
            <span>🛡️</span> Secure Access
          </div>
        </div>
      </div>
    </main>
  );
}
