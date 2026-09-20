import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, service, context } = body;

    if (!name || !email || !service) {
      return NextResponse.json(
        { error: "Name, email and service are required" },
        { status: 400 }
      );
    }

    const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    const response = await fetch(
      `${SURL}/rest/v1/ContactMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SKEY!,
          "Authorization": `Bearer ${SKEY!}`,
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
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Supabase error:", error);
      throw new Error("Database error");
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}