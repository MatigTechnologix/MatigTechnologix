import { NextRequest, NextResponse } from "next/server";

const SURL = "https://flrccmjaiyutynhydxeo.supabase.co";
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";
const H: any = { apikey: SKEY, Authorization: `Bearer ${SKEY}`, "Content-Type": "application/json" };

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

    const check = await fetch(`${SURL}/rest/v1/Newsletter?email=eq.${encodeURIComponent(email)}&select=id`, { headers: H });
    const existing = await check.json();
    if (existing?.length > 0) return NextResponse.json({ error: "Already subscribed!" }, { status: 409 });

    const res = await fetch(`${SURL}/rest/v1/Newsletter`, {
      method: "POST",
      headers: { ...H, Prefer: "return=minimal" },
      body: JSON.stringify({ id: crypto.randomUUID(), email, createdAt: new Date().toISOString() }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Supabase error:", err);
      return NextResponse.json({ error: "Failed" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}