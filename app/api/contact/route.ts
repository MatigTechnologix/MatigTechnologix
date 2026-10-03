import { NextRequest, NextResponse } from "next/server";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function sanitize(str: string): string {
  return str.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").trim().slice(0,1000);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, service, context, honeypot, timestamp } = body;

    // Honeypot check — bots fill hidden fields
    if (honeypot) {
      return NextResponse.json({ success: true }); // Silent fail for bots
    }

    // Timestamp check — form must be open at least 3 seconds
    if (!timestamp || Date.now() - timestamp < 3000) {
      return NextResponse.json({ success: true }); // Silent fail for bots
    }

    if (!name || !email || !service) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    const safeName = sanitize(String(name));
    const safeEmail = sanitize(String(email));
    const safeService = sanitize(String(service));
    const safeContext = sanitize(String(context || ""));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(safeEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const response = await fetch(`${SURL}/rest/v1/ContactMessage`, {
      method: "POST",
      headers: { "Content-Type":"application/json", "apikey":SKEY, "Authorization":`Bearer ${SKEY}`, "Prefer":"return=minimal" },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        name: safeName,
        email: safeEmail,
        message: `Service: ${safeService}\n\nContext: ${safeContext || "N/A"}`,
        read: false,
        createdAt: new Date().toISOString()
      })
    });

    if (!response.ok) throw new Error("Database error");
    return NextResponse.json({ success: true });

  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
