import { CTA, Footer, PageHero } from "../../components/site";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getPortfolio() {
  try {
    const res = await fetch(`${SURL}/rest/v1/Portfolio?status=eq.Published&order=createdAt.desc`, {
      headers: { apikey: SKEY, Authorization: `Bearer ${SKEY}` },
      cache: "no-store",
    });
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : null;
  } catch { return null; }
}

const staticWork = [
  ["FINTECH", "Reframing a specialist lender's outbound motion", "41%", "More qualified replies"],
  ["SAAS", "Turning product complexity into a buyer-ready website", "2.1×", "Demo conversion lift"],
  ["CONSULTING", "Finding whitespace in a crowded enterprise market", "318", "New buying contacts"],
];

export default async function Work() {
  const managed = await getPortfolio();
  return (
    <>
      <PageHero eyebrow="Selected work" title="Work made to move a business forward." copy="A snapshot of how research, outreach, and digital craft come together in real growth engagements." />
      <main>
        <section className="shell">
          <div className="filter">
            <button>All work</button><button>Outreach</button><button>Research</button><button>Digital</button>
          </div>
          <div className="cards">
            {managed
              ? managed.map((item: any) => (
                <article className="card case" key={item.id}>
                  {item.image && <img src={item.image} alt={item.title} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "0.5rem", marginBottom: "1rem" }} />}
                  <span className="num">{item.title}</span>
                  <h3>{item.detail}</h3>
                </article>
              ))
              : staticWork.map(x => (
                <article className="card case" key={x[1]}>
                  <span className="num">{x[0]}</span>
                  <h3>{x[1]}</h3>
                  <div className="result">{x[2]}</div>
                  <p>{x[3]}</p>
                </article>
              ))
            }
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}