"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SURL = "https://flrccmjaiyutynhydxeo.supabase.co";
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}`, "Content-Type": "application/json" };

export default function MemberDashboard() {
  const router = useRouter();
  const [member, setMember] = useState<any>(null);
  const [today, setToday] = useState<any>(null);
  const [stats, setStats] = useState({ total: 0, present: 0, late: 0, absent: 0 });
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    const m = localStorage.getItem("matig-member");
    if (!m) { router.push("/portal"); return; }
    const parsed = JSON.parse(m);
    setMember(parsed);
    fetchData(parsed.id);
  }, []);

  const fetchData = async (memberId: string) => {
    const todayDate = new Date().toISOString().split("T")[0];
    const [todayRes, allRes] = await Promise.all([
      fetch(`${SURL}/rest/v1/Attendance?memberId=eq.${memberId}&date=eq.${todayDate}`, { headers: H }).then(r => r.json()),
      fetch(`${SURL}/rest/v1/Attendance?memberId=eq.${memberId}`, { headers: H }).then(r => r.json()),
    ]);
    setToday(todayRes[0] || null);
    if (Array.isArray(allRes)) {
      setStats({
        total: allRes.length,
        present: allRes.filter((a: any) => a.status === "Present").length,
        late: allRes.filter((a: any) => a.status === "Late").length,
        absent: allRes.filter((a: any) => a.status === "Absent").length,
      });
    }
    setLoading(false);
  };

  const checkIn = async () => {
    setCheckingIn(true);
    const now = new Date();
    const time = now.toTimeString().slice(0, 5);
    const date = now.toISOString().split("T")[0];
    const hour = now.getHours();
    const status = hour >= 9 && (hour > 9 || now.getMinutes() > 15) ? "Late" : "Present";
    await fetch(`${SURL}/rest/v1/Attendance`, {
      method: "POST", headers: H,
      body: JSON.stringify({ memberId: member.id, date, checkIn: time, status }),
    });
    await fetchData(member.id);
    setCheckingIn(false);
  };

  const checkOut = async () => {
    setCheckingOut(true);
    const now = new Date();
    const time = now.toTimeString().slice(0, 5);
    const checkInTime = today.checkIn;
    const [inH, inM] = checkInTime.split(":").map(Number);
    const [outH, outM] = time.split(":").map(Number);
    const totalMins = (outH * 60 + outM) - (inH * 60 + inM);
    const hours = `${Math.floor(totalMins / 60)}h ${totalMins % 60}m`;
    await fetch(`${SURL}/rest/v1/Attendance?id=eq.${today.id}`, {
      method: "PATCH", headers: H,
      body: JSON.stringify({ checkOut: time, hours }),
    });
    await fetchData(member.id);
    setCheckingOut(false);
  };

  const logout = () => { localStorage.removeItem("matig-member"); router.push("/portal"); };

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  const s: any = { fontFamily: "Manrope, sans-serif" };

  return (
    <div style={{ ...s, minHeight: "100vh", background: "#0a0f1a", display: "flex" }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: "#111827", borderRight: "1px solid #1e2d40", padding: "1.5rem", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
          <span style={{ display: "inline-block", width: 10, height: 10, background: "#00f5a0", transform: "rotate(45deg)" }} />
          <span style={{ fontWeight: 800, fontSize: "1rem", letterSpacing: "-0.06em" }}>MATIG CMS</span>
        </div>
        <nav style={{ flex: 1 }}>
          {[["🏠", "Dashboard", "/portal/dashboard"], ["📋", "My Attendance", "/portal/attendance"], ["👤", "Profile", "/portal/profile"]].map(([icon, label, href]) => (
            <a key={label} href={href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 0.5rem", color: href === "/portal/dashboard" ? "#fff" : "#8892a4", fontSize: "0.88rem", borderLeft: href === "/portal/dashboard" ? "2px solid #00f5a0" : "2px solid transparent", paddingLeft: "0.75rem", marginBottom: "0.25rem", textDecoration: "none" }}>
              {icon} {label}
            </a>
          ))}
        </nav>
        <button onClick={logout} style={{ background: "transparent", border: "1px solid #1e2d40", color: "#8892a4", padding: "0.6rem", borderRadius: "0.5rem", cursor: "pointer", fontSize: "0.82rem" }}>⬅ Logout</button>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "2rem" }}>
        {loading ? <p style={{ color: "#8892a4" }}>Loading...</p> : <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
            <div>
              <p style={{ color: "#00f5a0", fontSize: "0.75rem", fontFamily: "DM Mono, monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>MATIG CMS</p>
              <h1 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: 800, margin: "0 0 0.25rem" }}>{greeting}, {member?.name}! 👋</h1>
              <p style={{ color: "#8892a4", fontSize: "0.85rem" }}>Here's your attendance overview for today.</p>
            </div>
            <span style={{ color: "#8892a4", fontSize: "0.82rem" }}>{dateStr}</span>
          </div>

          {/* Check In/Out */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
            <button onClick={checkIn} disabled={!!today?.checkIn || checkingIn}
              style={{ padding: "1.5rem", background: today?.checkIn ? "#1e2d40" : "#00f5a0", color: today?.checkIn ? "#8892a4" : "#0a0f1a", border: "none", borderRadius: "1rem", cursor: today?.checkIn ? "not-allowed" : "pointer", textAlign: "left" as any }}>
              <p style={{ fontSize: "0.78rem", marginBottom: "0.5rem", opacity: 0.7 }}>📅 Check In</p>
              <p style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0 }}>{today?.checkIn || (checkingIn ? "..." : "--:--")}</p>
            </button>
            <button onClick={checkOut} disabled={!today?.checkIn || !!today?.checkOut || checkingOut}
              style={{ padding: "1.5rem", background: "#111827", border: "1px solid #1e2d40", borderRadius: "1rem", cursor: (!today?.checkIn || today?.checkOut) ? "not-allowed" : "pointer", textAlign: "left" as any }}>
              <p style={{ fontSize: "0.78rem", color: "#8892a4", marginBottom: "0.5rem" }}>📅 Check Out</p>
              <p style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", margin: 0 }}>{today?.checkOut || (checkingOut ? "..." : "--:--")}</p>
            </button>
          </div>

          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "2rem" }}>
            {[["Total Days", stats.total, "#fff"], ["Present", stats.present, "#00f5a0"], ["Late", stats.late, "#f59e0b"], ["Absent", stats.absent, "#ff6b6b"]].map(([label, val, color]) => (
              <div key={label as string} style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "0.75rem", padding: "1.25rem" }}>
                <p style={{ color: "#8892a4", fontSize: "0.75rem", margin: "0 0 0.5rem" }}>{label}</p>
                <p style={{ color: color as string, fontSize: "1.8rem", fontWeight: 800, margin: 0 }}>{val}</p>
              </div>
            ))}
          </div>

          {/* Today Status */}
          {today?.checkIn && (
            <div style={{ background: "rgba(0,245,160,0.08)", border: "1px solid rgba(0,245,160,0.2)", borderRadius: "0.75rem", padding: "1rem 1.25rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ color: "#00f5a0", fontSize: "1.2rem" }}>✅</span>
              <div>
                <p style={{ color: "#00f5a0", fontWeight: 600, margin: 0, fontSize: "0.9rem" }}>You are checked in for today</p>
                <p style={{ color: "#8892a4", margin: 0, fontSize: "0.82rem" }}>Your attendance has been recorded. {today.checkOut ? `Hours: ${today.hours}` : ""}</p>
              </div>
            </div>
          )}
        </>}
      </div>
    </div>
  );
}
