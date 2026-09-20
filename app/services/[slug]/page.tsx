import Link from "next/link";
import { services } from "../../../lib/services-data";
import { CTA, Footer, PageHero } from "../../../components/site";

export function generateStaticParams() {
  return services.map(([, , slug]) => ({ slug }));
}

export default async function ServiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services.find(x => x[2] === slug) ?? services[0];
  return (
    <>
      <PageHero eyebrow="Service / MATIG" title={service[0]} copy={service[1]} />
      <main>
        <section className="shell split">
          <div>
            <span className="eyebrow">What's included</span>
            <p className="statement">Work that is precise enough to earn attention, and practical enough to generate next steps.</p>
          </div>
          <div className="steps">
            {[
              ["01", "Strategy & targeting", "We align on your ideal customer profile, buying context and campaign objective."],
              ["02", "Specialist execution", "A dedicated team researches, builds and quality-checks every deliverable."],
              ["03", "Actionable handoff", "Simple reporting and clear recommendations keep the next move obvious."],
            ].map(x => (
              <div className="step" key={x[0]}>
                <b>{x[0]}</b>
                <div><h3>{x[1]}</h3><p>{x[2]}</p></div>
              </div>
            ))}
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  );
}