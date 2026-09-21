"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CTA, Footer } from "../components/site";

const SURL = "https://flrccmjaiyutynhydxeo.supabase.co";
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}` };

const defaultHero = {
  eyebrow: "B2B growth, made human",
  title: "More signal. Less chasing.",
  copy: "MATIG brings sharp research, intentional outreach, and great digital craft together to create B2B opportunities worth having.",
  cta1: "Get a Free Sample →",
  cta2: "Explore our services",
};

const defaultServices = [
  { id: "1", title: "Lead Generation", detail: "Targeted prospect lists designed around your exact ICP.", slug: "lead-generation" },
  { id: "2", title: "LinkedIn Outreach", detail: "Thoughtful conversations that earn qualified replies.", slug: "linkedin-outreach" },
  { id: "3", title: "B2B Prospect Research", detail: "Decision-maker intelligence your sales team can trust.", slug: "prospect-research" },
];

export default function Home() {
  const [hero, setHero] = useState(defaultHero);
  const [services, setServices] = useState(defaultServices);

  useEffect(() => {
    fetch(`${SURL}/rest/v1/Setting?select=key,value`, { headers: H, cache: "no-store" })
      .then(r => r.json())
      .then((data: any) => {
        if (!Array.isArray(data)) return;
        const s: Record<string, string> = {};
        data.forEach((d: any) => s[d.key] = d.value);
        setHero({
          eyebrow: s["hero_eyebrow"] || defaultHero.eyebrow,
          title: s["hero_title"] || defaultHero.title,
          copy: s["hero_copy"] || defaultHero.copy,
          cta1: s["hero_cta1"] || defaultHero.cta1,
          cta2: s["hero_cta2"] || defaultHero.cta2,
        });
      }).catch(() => {});

    fetch(`${SURL}/rest/v1/Service?status=eq.Published&order=createdAt.asc`, { headers: H })
      .then(r => r.json())
      .then((data: any) => {
        if (Array.isArray(data) && data.length > 0) setServices(data);
      }).catch(() => {});
  }, []);

  return (
    <>
      <main>
        <section className="hero grid-bg">
          <div className="orb one" />
          <div className="orb two" />
          <div className="circuit"><i className="dot" /></div>
          <div className="shell hero-copy">
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1>{hero.title}</h1>
            <p>{hero.copy}</p>
            <div className="hero-actions">
              <Link href="/contact" className="btn primary">{hero.cta1}</Link>
              <Link href="/services" className="btn secondary">{hero.cta2}</Link>
            </div>
            <div className="proof">
              <div><strong>2.4×</strong><span>Average reply lift</span></div>
              <div><strong>48hr</strong><span>Sample turnaround</span></div>
              <div><strong>100%</strong><span>Human-checked data</span></div>
            </div>
          </div>
        </section>

        <section className="shell">
          <div className="section-head">
            <div>
              <span className="eyebrow">What we do</span>
              <h2>Every engagement starts with the right signal.</h2>
            </div>
            <p>We pair dedicated specialists with a practical, connected process—so every touchpoint feels considered.</p>
          </div>
          <div className="cards">
            {services.slice(0, 3).map((item: any, index) => (
              <Link className="card" href="/services" key={item.id}>
                <span className="num">0{index + 1} / {item.title}</span>
                <h3>{item.title}</h3>
                <p>{item.detail || item.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div className="shell split">
            <div>
              <span className="eyebrow">The MATIG approach</span>
              <p className="statement">We don't believe a fuller pipeline starts with more noise. It starts with better context.</p>
              <Link href="/about" className="btn secondary">Meet MATIG →</Link>
            </div>
            <div className="steps">
              {[
                ["01", "Map the market", "We identify the accounts, people, and moments most worth pursuing."],
                ["02", "Create the signal", "Our specialists build messages and assets that deserve attention."],
                ["03", "Make momentum", "Clear reporting turns every campaign into smarter next steps."],
              ].map(x => (
                <div className="step" key={x[0]}>
                  <b>{x[0]}</b>
                  <div><h3>{x[1]}</h3><p>{x[2]}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band">
          <div className="shell">
            <span className="eyebrow">Built for ambitious teams</span>
            <h2>Good growth work connects the dots between who you are and who you need to reach.</h2>
            <div className="logos">
              <span>FINTECH</span><span>SAAS</span><span>HEALTHCARE</span>
              <span>PROFESSIONAL SERVICES</span><span>MANUFACTURING</span>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}