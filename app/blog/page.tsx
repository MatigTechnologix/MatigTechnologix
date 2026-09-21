"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Footer, PageHero } from "../../components/site";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}` };

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SURL}/rest/v1/BlogPost?status=eq.Published&order=createdAt.desc`, { headers: H })
      .then(r => r.json())
      .then(data => { setPosts(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  return (
    <>
      <PageHero eyebrow="Insights" title="Ideas worth sharing." copy="Research, strategy and craft from the MATIG team." />
      <main>
        <section className="shell" style={{ padding: "4rem 0" }}>
          {loading ? <p style={{ color: "#8892a4" }}>Loading...</p> :
           posts.length === 0 ? <p style={{ color: "#8892a4", textAlign: "center", padding: "4rem 0" }}>No posts published yet.</p> :
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
            {posts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "1rem", overflow: "hidden" }}>
                  {post.image && <img src={post.image} alt={post.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />}
                  <div style={{ padding: "1.5rem" }}>
                    <span style={{ color: "#00f5a0", fontSize: "0.78rem", letterSpacing: "0.1em" }}>
                      {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                    <h2 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: "600", margin: "0.5rem 0" }}>{post.title}</h2>
                    <p style={{ color: "#8892a4", fontSize: "0.9rem", lineHeight: "1.6" }}>{post.content?.slice(0, 120)}...</p>
                    <span style={{ color: "#00f5a0", fontSize: "0.85rem", marginTop: "1rem", display: "block" }}>Read more →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>}
        </section>
      </main>
      <Footer />
    </>
  );
}