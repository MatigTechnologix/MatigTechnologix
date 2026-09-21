"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Nav, Footer } from "../../components/site";

const SURL = "https://flrccmjaiyutynhydxeo.supabase.co";
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}` };

export default function Blog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SURL}/rest/v1/BlogPost?status=eq.Published&order=createdAt.desc`, { headers: H })
      .then(r => r.json())
      .then(data => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Nav />
      <main>
        <section className="hero grid-bg" style={{ minHeight: "40vh" }}>
          <div className="shell hero-copy">
            <span className="eyebrow">Insights</span>
            <h1>Ideas worth sharing.</h1>
            <p>Research, strategy and craft from the MATIG team.</p>
          </div>
        </section>

        <section className="shell" style={{ padding: "4rem 0" }}>
          {loading ? (
            <p style={{ color: "#8892a4" }}>Loading...</p>
          ) : posts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p style={{ color: "#8892a4" }}>No posts published yet.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "2rem" }}>
              {posts.map(post => (
                <Link key={post.id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "1rem", overflow: "hidden", transition: "border-color 0.2s" }}>
                    {post.image && (
                      <img src={post.image} alt={post.title} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                    )}
                    <div style={{ padding: "1.5rem" }}>
                      <span style={{ color: "#00f5a0", fontSize: "0.78rem", letterSpacing: "0.1em" }}>
                        {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                      <h2 style={{ color: "#fff", fontSize: "1.2rem", fontWeight: "600", margin: "0.5rem 0", lineHeight: "1.4" }}>{post.title}</h2>
                      <p style={{ color: "#8892a4", fontSize: "0.9rem", lineHeight: "1.6", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {post.content}
                      </p>
                      <span style={{ color: "#00f5a0", fontSize: "0.85rem", marginTop: "1rem", display: "block" }}>Read more →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}