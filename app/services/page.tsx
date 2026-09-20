import { CTA, Footer, PageHero } from "../../components/site";
import { services as defaultServices } from "../../lib/services-data";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

async function getServices() {
  try {
    const res = await fetch(`${SURL}/rest/v1/Service?status=eq.Published&order=createdAt.desc`, {
      headers: { apikey: SKEY, Authorization: `Bearer ${SKEY}` },
      cache: "no-store",
    });
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : null;
  } catch { return null; }
}

export default async function Services() {
  const managed = await getServices();
  const cards = managed ?? defaultServices.map(([title, detail, slug]) => ({ id: slug, title, detail, status: "Published" }));
  return (
    <>
      <PageHero eyebrow="Capabilities" title="The practical side of ambitious growth." copy="Specialist-led services that turn sharp positioning and useful intelligence into a more reliable B2B pipeline." />
      <main>
        <section className="shell">
          <div className="cards">
            {cards.map((item: any, index: number) => (
              <article className="card" key={item.id}>
                {item.image && <img src={item.image} alt={item.title} style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "0.5rem", marginBottom: "1rem" }} />}
                <span className="num">0{index + 1} / Service</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}