import { NextRequest, NextResponse } from "next/server";

const SURL = "https://flrccmjaiyutynhydxeo.supabase.co";
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, service, context } = body;

    if (!name || !email || !service) {
      return NextResponse.json({ error: "Name, email and service are required" }, { status: 400 });
    }

    const response = await fetch(`${SURL}/rest/v1/ContactMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SKEY,
        "Authorization": `Bearer ${SKEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        name,
        email,
        message: `Service: ${service}\n\nContext: ${context || "N/A"}`,
        read: false,
        createdAt: new Date().toISOString()
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Supabase error:", error);
      throw new Error("Database error");
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}