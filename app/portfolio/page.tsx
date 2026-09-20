import { Footer, Nav } from "../../components/site";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getPortfolio() {
  const res = await fetch(`${SURL}/rest/v1/Portfolio?status=eq.Published&order=createdAt.desc`, {
    headers: { apikey: SKEY, Authorization: `Bearer ${SKEY}` },
    cache: "no-store",
  });
  return res.json();
}

export default async function PortfolioPage() {
  const items = await getPortfolio();
  return (
    <>
      <Nav />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Portfolio</h1>
        {!items?.length ? <p style={{ color: "#888" }}>No projects yet.</p> :
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "2rem" }}>
            {items.map((item: any) => (
              <div key={item.id} style={{ background: "#111", borderRadius: 12, overflow: "hidden", border: "1px solid #222" }}>
                {item.image && <img src={item.image} alt={item.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />}
                <div style={{ padding: "1.2rem" }}>
                  <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{item.title}</h2>
                  <p style={{ color: "#888", fontSize: "0.9rem" }}>{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        }
      </main>
      <Footer />
    </>
  );
}