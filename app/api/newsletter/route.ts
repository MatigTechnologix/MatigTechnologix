import { NextRequest, NextResponse } from "next/server";
const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}`, "Content-Type": "application/json" };

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

  const check = await fetch(`${SURL}/rest/v1/Newsletter?email=eq.${encodeURIComponent(email)}&select=id`, { headers: H });
  const existing = await check.json();
  if (existing?.length > 0) return NextResponse.json({ error: "Already subscribed!" }, { status: 409 });

  const res = await fetch(`${SURL}/rest/v1/Newsletter`, {
    method: "POST", headers: H,
    body: JSON.stringify({ email, createdAt: new Date().toISOString() }),
  });

  if (!res.ok) return NextResponse.json({ error: "Failed" }, { status: 500 });
  return NextResponse.json({ success: true });
}