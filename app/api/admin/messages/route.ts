import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/ContactMessage?order=createdAt.desc`,
      {
        headers: {
          "apikey": process.env.SUPABASE_ANON_KEY!,
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY!}`,
        },
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}