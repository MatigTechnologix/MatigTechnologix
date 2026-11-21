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
    const { name, email, service, context, honeypot } = body;

    if (honeypot) return NextResponse.json({ success: true });
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

    // Email to admin
    const emailResult = await resend.emails.send({
      from: "MATIG Contact <noreply@matigtechnologix.online>",
      to: "mehboob@matigtechnologix.online",
      subject: `New inquiry: ${safeService} from ${safeName}`,
      html: `<div style="font-family:sans-serif;padding:2rem"><h2 style="color:#00f5a0">New Contact Form Submission</h2><p><b>Name:</b> ${safeName}</p><p><b>Email:</b> ${safeEmail}</p><p><b>Service:</b> ${safeService}</p><p><b>Context:</b> ${safeContext || "N/A"}</p></div>`,
      replyTo: safeEmail,
    });

    // Confirmation to client
    await resend.emails.send({
      from: "MATIG Technologix <onboarding@resend.dev>",
      to: safeEmail,
      subject: "We received your request — MATIG Technologix",
      html: `<div style="font-family:sans-serif;padding:2rem;background:#0a0f1a;color:#fff"><h2 style="color:#00f5a0">Thank you, ${safeName}!</h2><p>We have received your inquiry about <b>${safeService}</b>.</p><p>Our team will get back to you within 48 hours.</p><br/><p style="color:#8892a4;font-size:0.85rem">— MATIG Technologix Team</p></div>`,
    });

    console.log("Email result:", JSON.stringify(emailResult));
    return NextResponse.json({ success: true, emailId: emailResult.data?.id });

  } catch(err) {
    console.error("Error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}