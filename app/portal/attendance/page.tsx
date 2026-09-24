"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SURL = "https://flrccmjaiyutynhydxeo.supabase.co";
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}` };

export default function AttendancePage() {
  const router = useRouter();
  const [member, setMember] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const m = localStorage.getItem("matig-member");
    if (!m) { router.push("/portal"); return; }
    const parsed = JSON.parse(m);
    setMember(parsed);
    fetch(`${SURL}/rest/v1/Attendance?memberId=eq.${parsed.id}&order=date.desc`, { headers: H })
      .then(r => r.json())
      .then(data => { setRecords(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const logout = () => { localStorage.removeItem("matig-member"); router.push("/portal"); };

  const statusColor: any = { Present: "#00f5a0", Late: "#f59e0b", Absent: "#ff6b6b" };

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
            <a key={label} href={href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 0.5rem", color: href === "/portal/attendance" ? "#fff" : "#8892a4", fontSize: "0.88rem", borderLeft: href === "/portal/attendance" ? "2px solid #00f5a0" : "2px solid transparent", paddingLeft: "0.75rem", marginBottom: "0.25rem", textDecoration: "none" }}>
              {icon} {label}
            </a>
          ))}
        </nav>
        <button onClick={logout} style={{ background: "transparent", border: "1px solid #1e2d40", color: "#8892a4", padding: "0.6rem", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.82rem" }}>⬅ Logout</button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "2rem" }}>
        <h1 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.5rem" }}>My Attendance</h1>
        <p style={{ color: "#8892a4", marginBottom: "2rem", fontSize: "0.88rem" }}>View your past attendance records.</p>

        {loading ? <p style={{ color: "#8892a4" }}>Loading...</p> :
          records.length === 0 ? <p style={{ color: "#8892a4" }}>No attendance records yet.</p> :
          <div style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "1rem", overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #1e2d40" }}>
                  {["Date", "Check In", "Check Out", "Hours", "Status"].map(h => (
                    <th key={h} style={{ padding: "1rem", textAlign: "left", color: "#8892a4", fontWeight: 500, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((r: any) => (
                  <tr key={r.id} style={{ borderBottom: "1px solid #1e2d40" }}>
                    <td style={{ padding: "1rem", color: "#fff" }}>{new Date(r.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                    <td style={{ padding: "1rem", color: "#fff" }}>{r.checkIn || "--"}</td>
                    <td style={{ padding: "1rem", color: "#fff" }}>{r.checkOut || "--"}</td>
                    <td style={{ padding: "1rem", color: "#fff" }}>{r.hours || "--"}</td>
                    <td style={{ padding: "1rem" }}>
                      <span style={{ background: `${statusColor[r.status]}22`, color: statusColor[r.status], padding: "0.25rem 0.75rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 600 }}>{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  );
}
