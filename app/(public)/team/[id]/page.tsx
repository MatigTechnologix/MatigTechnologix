
import { notFound } from "next/navigation";
import { Footer, PageHero } from "../../../../components/site";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getMember(id: string) {
  const res = await fetch(
    `${SURL}/rest/v1/TeamMember?id=eq.${encodeURIComponent(id)}&select=*`,
    {
      headers: {
        apikey: SKEY,
        Authorization: `Bearer ${SKEY}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data?.[0] || null;
}

export default async function TeamProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await getMember(id);

  if (!member) notFound();

  return (
    <>
      <PageHero
        eyebrow="MEET OUR TEAM"
        title={member.name}
        copy={member.role}
      />

      <main style={{
        background: "#f3f7ff",
        padding: "65px 20px",
        minHeight: "600px"
      }}>
        <div style={{
          maxWidth: "950px",
          margin: "0 auto",
          background: "#fff",
          borderRadius: "24px",
          padding: "45px",
          border: "1px solid #dce8fa",
          boxShadow: "0 15px 45px rgba(20,65,130,.08)"
        }}>

          <div style={{ textAlign: "center" }}>
            {member.image && (
              <img
                src={member.image}
                alt={member.name}
                style={{
                  width: "210px",
height: "210px",
objectFit: "cover",
borderRadius: "50%",
border: "6px solid #e4edff",
boxShadow: "0 8px 25px rgba(8, 102, 194, 0.15)",
margin: "0 auto 28px"
                }}
              />
            )}

            <h1 style={{
              color: "#12366b",
              fontSize: "32px",
              fontWeight: 700
            }}>
              {member.name}
            </h1>

            <p style={{
              color: "#0877d8",
              fontSize: "18px",
              fontWeight: 600,
              marginTop: "10px"
            }}>
              {member.role}
            </p>
          </div>

          <div style={{ marginTop: "45px" }}>
            <h2 style={{
              color: "#12366b",
              fontSize: "23px",
              marginBottom: "15px"
            }}>
              About
            </h2>

            <p style={{
              color: "#64748b",
              fontSize: "16px",
              lineHeight: 1.9
            }}>
              {member.bio || "Professional team member at MATIG Technologix."}
            </p>
          </div>

          {Array.isArray(member.skills) && member.skills.length > 0 && (
            <div style={{ marginTop: "35px" }}>
              <h2 style={{
                color: "#12366b",
                fontSize: "23px",
                marginBottom: "18px"
              }}>
                Skills & Expertise
              </h2>

              <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px"
              }}>
                {member.skills.map((skill: string, i: number) => (
                  <span key={i} style={{
                    background: "#edf5ff",
                    color: "#15549b",
                    border: "1px solid #d4e6ff",
                    borderRadius: "25px",
                    padding: "10px 18px",
                    fontSize: "14px",
                    fontWeight: 600
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {member.linkedin && (
            <div style={{ marginTop: "40px", textAlign: "center" }}>
              <a
                href={member.linkedin.startsWith("http") ? member.linkedin : `https://${member.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  background: "#0866c2",
                  color: "#fff",
                  padding: "14px 30px",
                  borderRadius: "10px",
                  textDecoration: "none",
                  fontWeight: 600
                }}
              >
                Connect on LinkedIn →
              </a>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </>
  );
}
