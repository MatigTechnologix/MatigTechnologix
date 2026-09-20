import { Footer, Nav } from "../../components/site";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getPosts() {
  const res = await fetch(`${SURL}/rest/v1/BlogPost?status=eq.Published&order=createdAt.desc`, {
    headers: { apikey: SKEY, Authorization: `Bearer ${SKEY}` },
    cache: "no-store",
  });
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <Nav />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>Blog</h1>
        {!posts?.length ? <p style={{ color: "#888" }}>No posts yet.</p> :
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "2rem" }}>
            {posts.map((p: any) => (
              <a href={`/blog/${p.slug}`} key={p.id} style={{ background: "#111", borderRadius: 12, overflow: "hidden", textDecoration: "none", color: "inherit", border: "1px solid #222", display: "block" }}>
                {p.image && <img src={p.image} alt={p.title} style={{ width: "100%", height: 200, objectFit: "cover" }} />}
                <div style={{ padding: "1.2rem" }}>
                  <p style={{ color: "#888", fontSize: "0.8rem", marginBottom: "0.5rem" }}>{new Date(p.createdAt).toLocaleDateString()}</p>
                  <h2 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{p.title}</h2>
                  <p style={{ color: "#888", fontSize: "0.9rem" }}>{p.content?.slice(0, 100)}...</p>
                </div>
              </a>
            ))}
          </div>
        }
      </main>
      <Footer />
    </>
  );
}