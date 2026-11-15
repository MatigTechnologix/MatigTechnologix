import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

function sanitize(str: string): string {
  return str.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").trim().slice(0,1000);
}

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { name, email, service, context, honeypot, timestamp } = body;

    if (honeypot) return NextResponse.json({ success: true });
    if (!timestamp || Date.now() - timestamp < 3000) return NextResponse.json({ success: true });
    if (!name || !email || !service) return NextResponse.json({ error: "Required fields missing" }, { status: 400 });

    const safeName = sanitize(String(name));
    const safeEmail = sanitize(String(email));
    const safeService = sanitize(String(service));
    const safeContext = sanitize(String(context || ""));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(safeEmail)) return NextResponse.json({ error: "Invalid email address" }, { status: 400 });

    await fetch(`${SURL}/rest/v1/ContactMessage`, {
      method: "POST",
      headers: { "Content-Type":"application/json", "apikey":SKEY, "Authorization":`Bearer ${SKEY}`, "Prefer":"return=minimal" },
      body: JSON.stringify({ id: crypto.randomUUID(), name: safeName, email: safeEmail, message: `Service: ${safeService}\n\nContext: ${safeContext || "N/A"}`, read: false, createdAt: new Date().toISOString() })
    });

    await resend.emails.send({
      from: "MATIG Contact <noreply@matigtechnologix.online>",
      to: "muhammadmehboobceo@gmail.com",
      subject: `New inquiry: ${safeService} from ${safeName}`,
      html: `<div style="font-family:sans-serif;padding:2rem;background:#0a0f1a;color:#fff;max-width:600px"><h2 style="color:#00f5a0">New Contact Form Submission</h2><p><b>Name:</b> ${safeName}</p><p><b>Email:</b> ${safeEmail}</p><p><b>Service:</b> ${safeService}</p><p><b>Context:</b> ${safeContext || "N/A"}</p></div>`,
      replyTo: safeEmail,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
