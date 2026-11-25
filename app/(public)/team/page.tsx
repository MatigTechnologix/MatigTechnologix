
import Link from "next/link";
import { Footer, PageHero } from "../../../components/site";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getTeam() {
  const res = await fetch(`${SURL}/rest/v1/TeamMember?order=createdAt.desc`, {
    headers: {
      apikey: SKEY,
      Authorization: `Bearer ${SKEY}`,
    },
    cache: "no-store",
  });

  return res.json();
}

export default async function TeamPage() {
  const members = await getTeam();

  return (
    <>
      <PageHero
        eyebrow="OUR TEAM"
        title="Meet the People Behind MATIG"
        copy="Meet the talented people turning ideas into meaningful results."
      />

      <main style={{
        background: "#f3f7ff",
        padding: "65px 20px",
        minHeight: "600px"
      }}>
        <div style={{
          maxWidth: "950px",
          margin: "0 auto 25px"
        }}>
         
        </div>
        
        <div style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 340px))",
          justifyContent: "center",
          gap: "30px"
        }}>
          {!members?.length ? (
            <p>No team members yet.</p>
          ) : (
            members.map((m: any) => (
              <div key={m.id} style={{
                background: "#ffffff",
                borderRadius: "22px",
                padding: "32px 25px",
                textAlign: "center",
                border: "1px solid #dce8fa",
                boxShadow: "0 15px 40px rgba(20, 65, 130, 0.09)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "390px"
              }}>
                {m.image && (
                  <img
                    src={m.image}
                    alt={m.name}
                    style={{
                      width: "130px",
                      height: "130px",
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "5px solid #e4edff",
                      marginBottom: "20px"
                    }}
                  />
                )}

                <h2 style={{
                  color: "#12366b",
                  fontSize: "23px",
                  fontWeight: 700,
                  marginBottom: "8px"
                }}>
                  {m.name}
                </h2>

                <p style={{
                  color: "#0877d8",
                  fontWeight: 600,
                  fontSize: "15px",
                  marginBottom: "14px"
                }}>
                  {m.role}
                </p>

                <p style={{
                  color: "#64748b",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  marginBottom: "20px",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden"
                }}>
                  {m.bio}
                </p>

                <div style={{ marginTop: "auto" }}>
                  <Link
                    href={`/team/${m.id}`}
                    style={{
                      display: "inline-block",
                      background: "#0866c2",
                      color: "#ffffff",
                      padding: "12px 28px",
                      borderRadius: "9px",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: "14px"
                    }}
                  >
                    View Profile →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
