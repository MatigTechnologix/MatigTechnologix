"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const menuItems = [
  { id: "dashboard", label: "Dashboard" },
  { id: "homepage", label: "Homepage" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "case-studies", label: "Case Studies" },
  { id: "team", label: "Team" },
  { id: "testimonials", label: "Testimonials" },
  { id: "client-logos", label: "Client Logos" },
  { id: "blog", label: "Blog" },
  { id: "media-library", label: "Media Library" },
  { id: "seo", label: "SEO" },
  { id: "messages", label: "Messages" },
  { id: "newsletter", label: "Newsletter" },
  { id: "settings", label: "Settings" },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [active, setActive] = useState("dashboard");
  const [messages, setMessages] = useState<any[]>([]);
  const [newsletter, setNewsletter] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = localStorage.getItem("matig-admin");
    if (!auth) router.push("/admin");
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/messages");
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("matig-admin");
    router.push("/admin");
  };

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return (
          <div>
            <p style={{ color: "#00f5a0", fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: "1rem" }}>MATIG CMS LITE</p>
            <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: "700", marginBottom: "1rem" }}>Content dashboard.</h1>
            <p style={{ color: "#8892a4", fontSize: "1rem", marginBottom: "2.5rem", maxWidth: "500px" }}>
              Everything is connected to Supabase. Add content, update records, and manage your site.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "2rem" }}>
              {[
                { label: "CONTACT MESSAGES", value: messages.length },
                { label: "UNREAD MESSAGES", value: messages.filter(m => !m.read).length },
                { label: "SUBSCRIBERS", value: newsletter.length },
                { label: "PUBLISHED", value: "—" },
              ].map((stat) => (
                <div key={stat.label} style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "1rem", padding: "1.5rem" }}>
                  <p style={{ color: "#8892a4", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{stat.label}</p>
                  <p style={{ color: "#fff", fontSize: "2.5rem", fontWeight: "700", margin: 0 }}>{stat.value}</p>
                </div>
              ))}
            </div>
            <div style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "1rem", padding: "1.5rem" }}>
              <p style={{ color: "#00f5a0", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "1rem" }}>QUICK ACTIONS</p>
              <h3 style={{ color: "#fff", marginBottom: "1rem" }}>Manage what matters</h3>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                {["Messages", "Blog", "Services", "Team"].map((item) => (
                  <button key={item} onClick={() => setActive(item.toLowerCase())} style={{ background: "#1e2d40", border: "none", color: "#fff", padding: "0.6rem 1.2rem", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.9rem" }}>
                    {item === "Messages" ? "View messages" : item === "Blog" ? "Create article" : `Manage ${item.toLowerCase()}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "messages":
        return (
          <div>
            <h2 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: "700", marginBottom: "0.5rem" }}>Contact Messages</h2>
            <p style={{ color: "#8892a4", marginBottom: "2rem" }}>All form submissions from your website.</p>
            {loading ? (
              <p style={{ color: "#8892a4" }}>Loading...</p>
            ) : messages.length === 0 ? (
              <p style={{ color: "#8892a4" }}>No messages yet.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {messages.map((msg) => (
                  <div key={msg.id} style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "0.75rem", padding: "1.25rem", borderLeft: msg.read ? "3px solid #1e2d40" : "3px solid #00f5a0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ color: "#fff", fontWeight: "600" }}>{msg.name}</span>
                      <span style={{ color: "#8892a4", fontSize: "0.8rem" }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div style={{ color: "#00f5a0", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{msg.email}</div>
                    <div style={{ color: "#8892a4", fontSize: "0.9rem" }}>{msg.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return (
          <div>
            <h2 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: "700", marginBottom: "0.5rem", textTransform: "capitalize" }}>
              {active.replace("-", " ")}
            </h2>
            <p style={{ color: "#8892a4", marginBottom: "2rem" }}>This module is coming soon.</p>
            <div style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "1rem", padding: "3rem", textAlign: "center" }}>
              <p style={{ color: "#8892a4" }}>🚧 Under construction — check back soon!</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0f1a" }}>
      {/* Sidebar */}
      <div style={{ width: "220px", background: "#0d1520", borderRight: "1px solid #1e2d40", padding: "2rem 0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "0 1.5rem", marginBottom: "2rem" }}>
          <div style={{ color: "#00f5a0", fontWeight: "700", fontSize: "1.1rem" }}>◆ MATIG</div>
        </div>
        <p style={{ color: "#8892a4", fontSize: "0.7rem", letterSpacing: "0.1em", padding: "0 1.5rem", marginBottom: "0.5rem" }}>CMS LITE</p>
        <nav style={{ flex: 1 }}>
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => setActive(item.id)} style={{
              display: "block", width: "100%", textAlign: "left",
              padding: "0.65rem 1.5rem", background: "transparent",
              border: "none", borderLeft: active === item.id ? "2px solid #00f5a0" : "2px solid transparent",
              color: active === item.id ? "#fff" : "#8892a4",
              fontSize: "0.9rem", cursor: "pointer",
              transition: "all 0.15s",
            }}>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "1rem 1.5rem" }}>
          <button onClick={logout} style={{ background: "transparent", border: "1px solid #1e2d40", color: "#8892a4", padding: "0.5rem 1rem", borderRadius: "0.5rem", cursor: "pointer", width: "100%", fontSize: "0.85rem" }}>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "2.5rem", overflowY: "auto" }}>
        {renderContent()}
      </div>
    </div>
  );
}