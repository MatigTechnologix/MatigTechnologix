import { Footer, PageHero } from "../../../components/site";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getTeam() {
  const res = await fetch(`${SURL}/rest/v1/TeamMember?order=createdAt.desc`, {
    headers: { apikey: SKEY, Authorization: `Bearer ${SKEY}` },
    cache: "no-store",
  });
  return res.json();
}

export default async function TeamPage() {
  const members = await getTeam();
  return (
    <>
      <PageHero eyebrow="Our Team" title="The people behind MATIG." copy="A dedicated team of specialists who care about the details." />
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1rem" }}>
        {!members?.length ? <p style={{ color: "#888" }}>No team members yet.</p> :
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "2rem" }}>
            {members.map((m: any) => (
              <div key={m.id} style={{ background: "#111", borderRadius: 12, overflow: "hidden", border: "1px solid #222", textAlign: "center", padding: "2rem 1rem" }}>
                {m.image && <img src={m.image} alt={m.name} style={{ width: 100, height: 100, objectFit: "cover", borderRadius: "50%", marginBottom: "1rem" }} />}
                <h2 style={{ fontSize: "1.1rem", marginBottom: "0.25rem" }}>{m.name}</h2>
                <p style={{ color: "#00f5a0", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{m.role}</p>
                                <p style={{ color: "#888", fontSize: "0.85rem" }}>{m.bio}</p>
                {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "1rem", color: "#00f5a0", fontSize: "0.85rem", fontWeight: "600" }}>Learn More →</a>}
              </div>
            ))}
          </div>
        }
      </main>
      <Footer />
    </>
  );
}