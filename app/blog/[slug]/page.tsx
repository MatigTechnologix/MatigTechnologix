import { Footer, Nav } from "../../../components/site";
import { notFound } from "next/navigation";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(`${SURL}/rest/v1/BlogPost?slug=eq.${slug}&status=eq.Published`, {
    headers: { apikey: SKEY, Authorization: `Bearer ${SKEY}` },
    cache: "no-store",
  });
  const data = await res.json();
  const post = data?.[0];
  if (!post) notFound();
  return (
    <>
      <Nav />
      <main style={{ maxWidth: 860, margin: "0 auto", padding: "3rem 1rem" }}>
        <a href="/blog" style={{ color: "#00f5a0", fontSize: "0.9rem" }}>← Back to Blog</a>
        {post.image && <img src={post.image} alt={post.title} style={{ width: "100%", height: 400, objectFit: "cover", borderRadius: 12, margin: "1.5rem 0" }} />}
        <p style={{ color: "#888", fontSize: "0.85rem" }}>{new Date(post.createdAt).toLocaleDateString()}</p>
        <h1 style={{ fontSize: "2rem", margin: "0.5rem 0 2rem" }}>{post.title}</h1>
        <div style={{ lineHeight: 1.8, color: "#ccc" }} dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>
      <Footer />
    </>
  );
}