import { NextRequest, NextResponse } from "next/server";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; reset: number }>();

function sanitize(str: string): string {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim()
    .slice(0, 1000);
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(ip);
  if (!limit || now > limit.reset) {
    rateLimit.set(ip, { count: 1, reset: now + 60000 });
    return true;
  }
  if (limit.count >= 5) return false;
  limit.count++;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, service, context } = body;

    if (!name || !email || !service) {
      return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
    }

    // Sanitize all inputs
    const safeName = sanitize(String(name));
    const safeEmail = sanitize(String(email));
    const safeService = sanitize(String(service));
    const safeContext = sanitize(String(context || ""));

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(safeEmail)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
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
