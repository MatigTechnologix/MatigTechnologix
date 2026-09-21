"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Nav, Footer } from "../../../../components/site";

const SURL = "https://flrccmjaiyutynhydxeo.supabase.co";
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}` };

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${SURL}/rest/v1/BlogPost?slug=eq.${slug}&status=eq.Published`, { headers: H })
      .then(r => r.json())
      .then(data => {
        setPost(Array.isArray(data) && data.length > 0 ? data[0] : null);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <><Nav /><main><div style={{ padding: "4rem", color: "#8892a4" }}>Loading...</div></main><Footer /></>;
  if (!post) return <><Nav /><main><div style={{ padding: "4rem", textAlign: "center" }}><p style={{ color: "#8892a4" }}>Post not found.</p><Link href="/blog" style={{ color: "#00f5a0" }}>← Back to blog</Link></div></main><Footer /></>;

  return (
    <>
      <Nav />
      <main>
        {post.image && (
          <div style={{ width: "100%", height: "400px", overflow: "hidden" }}>
            <img src={post.image} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <section className="shell" style={{ maxWidth: "760px", padding: "4rem 2rem" }}>
          <Link href="/blog" style={{ color: "#00f5a0", fontSize: "0.85rem", textDecoration: "none", display: "block", marginBottom: "2rem" }}>← Back to blog</Link>
          <span style={{ color: "#8892a4", fontSize: "0.85rem" }}>
            {new Date(post.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </span>
          <h1 style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: "700", margin: "1rem 0 2rem", lineHeight: "1.2" }}>{post.title}</h1>
          <div style={{ color: "#c8d0dc", fontSize: "1.05rem", lineHeight: "1.8", whiteSpace: "pre-wrap" }}>{post.content}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}