"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
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
    <main style={{
      minHeight: "100vh",
      background: "#0a0f1a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "#111827",
        border: "1px solid #1e2d40",
        borderRadius: "1.25rem",
        padding: "2.5rem",
        width: "100%",
        maxWidth: "400px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.4)",
      }}>
        <h1 style={{ color: "#fff", marginBottom: "0.5rem", fontSize: "1.5rem" }}>
          Admin Login
        </h1>
        <p style={{ color: "#8892a4", marginBottom: "2rem", fontSize: "0.9rem" }}>
          MATIG Technologix CMS
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.25rem" }}>
            <label style={{ color: "#c8d0dc", fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>
              Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              style={{
                width: "100%", padding: "0.85rem 1rem",
                background: "#0d1520", border: "1px solid #1e2d40",
                borderRadius: "0.6rem", color: "#fff",
                fontSize: "0.95rem", boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ color: "#c8d0dc", fontSize: "0.85rem", display: "block", marginBottom: "0.5rem" }}>
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={{
                width: "100%", padding: "0.85rem 1rem",
                background: "#0d1520", border: "1px solid #1e2d40",
                borderRadius: "0.6rem", color: "#fff",
                fontSize: "0.95rem", boxSizing: "border-box",
              }}
            />
          </div>

          {error && (
            <p style={{ color: "#ff6b6b", fontSize: "0.85rem", marginBottom: "1rem" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "1rem",
              background: "#00f5a0", color: "#0a0f1a",
              border: "none", borderRadius: "0.6rem",
              fontSize: "0.95rem", fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>
        </form>
      </div>
    </main>
  );
}
