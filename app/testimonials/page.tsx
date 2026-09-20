import { Footer, Nav } from "../../components/site";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getTestimonials() {
  const res = await fetch(`${SURL}/rest/v1/Testimonial?order=createdAt.desc`, {
    headers: { apikey: SKEY, Authorization: `Bearer ${SKEY}` },
    cache: "no-store",
  });
  return res.json();
}

export default async function TestimonialsPage() {
  const items = await getTestimonials();
  return (
    <>
      <Nav />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Testimonials</h1>
        {!items?.length ? <p style={{ color: "#888" }}>No testimonials yet.</p> :
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "2rem" }}>
            {items.map((item: any) => (
              <div key={item.id} style={{ background: "#111", borderRadius: 12, border: "1px solid #222", padding: "1.5rem" }}>
                <p style={{ color: "#fff", fontSize: "1rem", lineHeight: 1.7, marginBottom: "1rem" }}>"{item.message}"</p>
                <p style={{ color: "#00f5a0", fontWeight: 600 }}>{item.name}</p>
                <p style={{ color: "#888", fontSize: "0.85rem" }}>{item.company}</p>
                <p style={{ color: "#FFD700", fontSize: "1rem" }}>{"⭐".repeat(item.rating || 5)}</p>
              </div>
            ))}
          </div>
        }
      </main>
      <Footer />
    </>
  );
}