
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Footer, CTA } from "../../../../components/site";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Keep your existing Supabase anon key.
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";

const H = {
  apikey: SKEY,
  Authorization: `Bearer ${SKEY}`,
};

type SubService = {
  title: string;
  slug?: string;
  detail?: string;
  description?: string;
  skills?: string[];
};

type Service = {
  id: string;
  title: string;
  slug: string;
  detail?: string;
  image?: string;
  subServices?: SubService[] | string;
  skills?: string[] | string;
};

function getSubs(value: Service["subServices"]): SubService[] {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return value
        .split("|")
        .map(s => s.trim())
        .filter(Boolean)
        .map(title => ({ title }));
    }
  }

  return [];
}

function getSkills(value: Service["skills"]): string[] {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return value.split(",").map(s => s.trim()).filter(Boolean);
    }
  }

  return [];
}

// Custom abstract technology illustration
function DetailArt() {
  return (
    <div className="detail-art">
      <svg viewBox="0 0 600 350" role="img" aria-label="Abstract digital technology illustration">
        <defs>
          <linearGradient id="detailGlow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00f5a0" />
            <stop offset="100%" stopColor="#168bff" />
          </linearGradient>
          <radialGradient id="detailOrb">
            <stop offset="0%" stopColor="#00f5a0" stopOpacity=".35" />
            <stop offset="100%" stopColor="#00f5a0" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="300" cy="165" r="155" fill="url(#detailOrb)" />

        <ellipse cx="300" cy="280" rx="220" ry="28"
          fill="none" stroke="#087e86" strokeWidth="1.5" />
        <ellipse cx="300" cy="280" rx="165" ry="19"
          fill="none" stroke="#087e86" opacity=".6" />
        <ellipse cx="300" cy="280" rx="105" ry="12"
          fill="none" stroke="#087e86" opacity=".4" />

        <path d="M300 65 L140 155 L300 245 L460 155 Z"
          fill="#0b3044" stroke="#00d9b0" strokeWidth="2" opacity=".85" />

        <path d="M300 65 L300 245 M140 155 L460 155"
          stroke="#00d9b0" strokeWidth="1.5" opacity=".5" />

        <rect x="225" y="95" width="150" height="125" rx="18"
          fill="#082a45" stroke="url(#detailGlow)" strokeWidth="3" />

        <rect x="245" y="115" width="110" height="85" rx="9"
          fill="#0c3d57" stroke="#168bff" />

        <path d="M260 135 H340 M260 150 H320 M260 165 H330 M260 180 H300"
          stroke="#00f5a0" strokeWidth="4" strokeLinecap="round" opacity=".8" />

        <circle cx="125" cy="105" r="28" fill="#0c3450" stroke="#00f5a0" strokeWidth="2" />
        <circle cx="125" cy="105" r="9" fill="#168bff" />
        <path d="M125 135 L125 155" stroke="#00f5a0" strokeWidth="2" />

        <circle cx="475" cy="105" r="28" fill="#0c3450" stroke="#168bff" strokeWidth="2" />
        <circle cx="475" cy="105" r="9" fill="#00f5a0" />
        <path d="M475 135 L475 155" stroke="#168bff" strokeWidth="2" />

        <path d="M153 105 L225 130 M447 105 L375 130"
          stroke="#00e9a0" strokeWidth="2" strokeDasharray="5 6" />

        <path d="M85 225 L115 200 L145 215 L175 180"
          stroke="#00f5a0" strokeWidth="4" fill="none" />
        <path d="M163 180 L175 180 L175 193"
          stroke="#00f5a0" strokeWidth="3" fill="none" />

        <circle cx="85" cy="225" r="5" fill="#00f5a0" />
        <circle cx="515" cy="225" r="5" fill="#168bff" />

        <path d="M425 205 L455 175 L485 190 L515 155"
          stroke="#168bff" strokeWidth="3" fill="none" />

        <circle cx="300" cy="42" r="4" fill="#00f5a0" />
        <circle cx="55" cy="145" r="3" fill="#168bff" />
        <circle cx="545" cy="145" r="3" fill="#00f5a0" />
      </svg>
    </div>
  );
}

export default function ServiceDetail() {
  const params = useParams();
  const slug = params.slug;

  const [item, setItem] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSub, setActiveSub] = useState<number | null>(null);

  useEffect(() => {
    if (!slug || typeof slug !== "string") return;

    const searchParams = new URLSearchParams({
      slug: `eq.${slug}`,
      status: "eq.Published",
    });

    fetch(
      `${SURL}/rest/v1/Service?${searchParams.toString()}`,
      { headers: H }
    )
      .then(async response => {
        if (!response.ok) {
          throw new Error("Could not load service.");
        }
        return response.json();
      })
      .then(data => {
        setItem(Array.isArray(data) && data.length > 0 ? data[0] : null);
      })
      .catch(() => {
        setError("Unable to load this service. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <>
        <main className="detail-page">
          <div className="detail-message">Loading service...</div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !item) {
    return (
      <>
        <main className="detail-page">
          <div className="detail-message">
            <h2>{error ? "Something went wrong" : "Service not found"}</h2>
            <p>{error || "This service may have been unpublished or its URL may be incorrect."}</p>
            <Link href="/services" className="detail-back">
              ← Back to all services
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const subs = getSubs(item.subServices);
  const skills = getSkills(item.skills);

  // When no separate skills are stored, use the actual service offerings
  // as capability labels rather than inventing additional skills.
  const capabilities = skills.length > 0
    ? skills
    : subs.map(sub => sub.title);

  return (
    <>
      <main className="detail-page">

        {/* HERO */}
        <section className="detail-hero">
          <div className="detail-glow glow-one" />
          <div className="detail-glow glow-two" />

          <div className="detail-container">
            <Link href="/services" className="detail-back">
              ← All Services
            </Link>

            <div className="detail-hero-grid">
              <div className="detail-hero-copy">
                <span className="detail-eyebrow">MATIG TECHNOLOGIX / SERVICES</span>

                <h1>{item.title}</h1>

                <p>
                  {item.detail ||
                    "Explore our professional solutions and discover how our expertise can support your business growth."}
                </p>

                <Link href="/contact" className="detail-button">
                  Discuss Your Project <span>→</span>
                </Link>
              </div>

              <DetailArt />
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="detail-container detail-overview">
          <div className="section-heading">
            <span>OUR EXPERTISE</span>
            <h2>What We Bring to Your Business</h2>
            <p>
              Professional capabilities and solutions designed around your needs.
            </p>
          </div>

          <div className="overview-grid">
            <div className="overview-card">
              <span className="overview-number">01</span>
              <h3>Professional Expertise</h3>
              <p>
                Focused service delivery backed by structured processes
                and attention to quality.
              </p>
            </div>

            <div className="overview-card">
              <span className="overview-number">02</span>
              <h3>Business-Focused Solutions</h3>
              <p>
                Practical solutions designed to support your goals
                and improve your business operations.
              </p>
            </div>

            <div className="overview-card">
              <span className="overview-number">03</span>
              <h3>Reliable Collaboration</h3>
              <p>
                A professional approach focused on communication,
                consistency and delivery.
              </p>
            </div>
          </div>
        </section>

        {/* SUB SERVICES */}
        <section className="detail-sub-section">
          <div className="detail-container">
            <div className="section-heading">
              <span>OUR SOLUTIONS</span>
              <h2>Explore Our {item.title} Services</h2>
              <p>
                Select any service below to explore its details.
              </p>
            </div>

            {subs.length > 0 ? (
              <div className="sub-grid">
                {subs.map((sub, index) => (
                  <div
                    key={`${sub.title}-${index}`}
                    className={`sub-card ${activeSub === index ? "sub-active" : ""}`}
                  >
                    <button
                      type="button"
                      className="sub-card-button"
                      onClick={() =>
                        setActiveSub(activeSub === index ? null : index)
                      }
                      aria-expanded={activeSub === index}
                    >
                      <span className="sub-index">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span className="sub-card-title">{sub.title}</span>

                      <span className="sub-expand">
                        {activeSub === index ? "−" : "+"}
                      </span>
                    </button>

                    {activeSub === index && (
                      <div className="sub-expanded">
                        <p>
                          {sub.detail ||
                            sub.description ||
                            `Explore ${sub.title} with MATIG. Contact our team to discuss your requirements and the right solution for your business.`}
                        </p>

                        {Array.isArray(sub.skills) && sub.skills.length > 0 && (
                          <div className="sub-skill-tags">
                            {sub.skills.map((skill, i) => (
                              <span key={i}>{skill}</span>
                            ))}
                          </div>
                        )}

                        <Link
                          href={`/contact?service=${encodeURIComponent(sub.title)}`}
                          className="sub-contact"
                        >
                          Enquire About This Service →
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="detail-empty">
                Sub-services have not been added for this category yet.
              </div>
            )}
          </div>
        </section>

        {/* SKILLS */}
        <section className="detail-container detail-skills">
          <div className="section-heading">
            <span>CAPABILITIES</span>
            <h2>Skills & Areas of Expertise</h2>
            <p>
              Our service capabilities and areas of focus.
            </p>
          </div>

          {capabilities.length > 0 ? (
            <div className="skill-cloud">
              {capabilities.map((skill, index) => (
                <div className="skill-chip" key={`${skill}-${index}`}>
                  <span>✓</span>
                  {skill}
                </div>
              ))}
            </div>
          ) : (
            <div className="detail-empty">
              Skills will appear here once they are added to this service in the database.
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="detail-final-cta">
          <div className="detail-container final-cta-inner">
            <div>
              <span>LET'S WORK TOGETHER</span>
              <h2>Ready to grow your business?</h2>
              <p>
                Talk to MATIG about your requirements and let's find
                the right solution for your business.
              </p>
            </div>

            <Link href="/contact" className="detail-button">
              Contact Our Team <span>→</span>
            </Link>
          </div>
        </section>

      </main>

      <CTA />
      <Footer />

      <style jsx>{`
        .detail-page {
          background: #030d18;
          color: #fff;
          min-height: 100vh;
          overflow: hidden;
        }

        .detail-container {
          width: min(1200px, calc(100% - 44px));
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .detail-hero {
          position: relative;
          overflow: hidden;
          padding: 45px 0 75px;
          background:
            radial-gradient(ellipse at 70% 40%, rgba(0,245,160,.09), transparent 50%),
            #030d18;
        }

        .detail-glow {
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          filter: blur(100px);
          opacity: .13;
          pointer-events: none;
        }

        .glow-one {
          background: #00f5a0;
          top: -180px;
          left: -120px;
        }

        .glow-two {
          background: #168bff;
          bottom: -220px;
          right: -100px;
        }

        .detail-back {
          display: inline-block;
          color: #00e9a0;
          text-decoration: none;
          font-size: 13px;
          margin-bottom: 40px;
        }

        .detail-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 45px;
        }

        .detail-eyebrow,
        .section-heading > span,
        .final-cta-inner > div > span {
          color: #00e9a0;
          font-size: 10px;
          letter-spacing: 3px;
          font-weight: 800;
        }

        .detail-hero-copy h1 {
          font-size: clamp(36px, 5vw, 58px);
          line-height: 1.1;
          letter-spacing: -1.5px;
          margin: 20px 0;
        }

        .detail-hero-copy p {
          color: #a8bbcf;
          font-size: 16px;
          line-height: 1.9;
          max-width: 540px;
          white-space: pre-wrap;
        }

        .detail-button {
          display: inline-flex;
          align-items: center;
          gap: 18px;
          padding: 14px 22px;
          border-radius: 30px;
          margin-top: 20px;
          background: #00e9a0;
          color: #03121d;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          transition: .2s ease;
        }

        .detail-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 30px rgba(0,245,160,.22);
        }

        .detail-art {
          min-height: 310px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(ellipse, rgba(0,220,190,.10), transparent 68%);
        }

        .detail-art svg {
          width: 100%;
          max-width: 580px;
        }

        .detail-overview {
          padding-top: 75px;
          padding-bottom: 80px;
        }

        .section-heading {
          text-align: center;
          margin-bottom: 38px;
        }

        .section-heading h2 {
          font-size: clamp(25px, 4vw, 37px);
          margin: 13px 0;
          letter-spacing: -.7px;
        }

        .section-heading p {
          color: #91a5bb;
          font-size: 14px;
          line-height: 1.7;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .overview-card {
          padding: 28px;
          border: 1px solid #203c50;
          border-radius: 15px;
          background: linear-gradient(145deg, #0c1c2d, #071321);
        }

        .overview-number {
          color: #00e9a0;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .overview-card h3 {
          font-size: 18px;
          margin: 20px 0 10px;
        }

        .overview-card p {
          color: #91a5bb;
          font-size: 13px;
          line-height: 1.8;
        }

        .detail-sub-section {
          padding: 80px 0;
          background: #071321;
          border-top: 1px solid #172c40;
          border-bottom: 1px solid #172c40;
        }

        .sub-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
        }

        .sub-card {
          border: 1px solid #24445a;
          border-radius: 12px;
          background: #0b1a2b;
          overflow: hidden;
          transition: border-color .2s, box-shadow .2s;
        }

        .sub-card:hover,
        .sub-active {
          border-color: #00dca0;
          box-shadow: 0 8px 30px rgba(0,245,160,.06);
        }

        .sub-card-button {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 17px;
          padding: 21px;
          border: 0;
          background: transparent;
          color: white;
          text-align: left;
          cursor: pointer;
        }

        .sub-index {
          color: #00e9a0;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .sub-card-title {
          flex: 1;
          font-size: 14px;
          font-weight: 650;
        }

        .sub-expand {
          width: 28px;
          height: 28px;
          display: grid;
          place-items: center;
          border: 1px solid #00dca0;
          border-radius: 50%;
          color: #00f5a0;
          font-size: 20px;
        }

        .sub-expanded {
          padding: 0 21px 22px 49px;
        }

        .sub-expanded p {
          color: #a8bbcf;
          font-size: 13px;
          line-height: 1.8;
          margin: 0 0 15px;
        }

        .sub-skill-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-bottom: 15px;
        }

        .sub-skill-tags span {
          font-size: 11px;
          color: #bcefe0;
          background: #10352f;
          padding: 6px 10px;
          border-radius: 6px;
        }

        .sub-contact {
          color: #00e9a0;
          font-size: 12px;
          font-weight: 750;
          text-decoration: none;
        }

        .detail-skills {
          padding-top: 80px;
          padding-bottom: 85px;
        }

        .skill-cloud {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .skill-chip {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 13px 18px;
          background: #0c2030;
          border: 1px solid #234457;
          border-radius: 9px;
          color: #d1e0ed;
          font-size: 13px;
        }

        .skill-chip span {
          color: #00e9a0;
          font-weight: 800;
        }

        .detail-empty {
          text-align: center;
          padding: 35px;
          border: 1px dashed #315066;
          border-radius: 12px;
          color: #91a5bb;
          font-size: 14px;
        }

        .detail-final-cta {
          padding: 55px 0;
          background:
            radial-gradient(ellipse at 90% 50%, rgba(0,245,160,.12), transparent 55%),
            #0a1a29;
          border-top: 1px solid #1d3c4c;
        }

        .final-cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .final-cta-inner h2 {
          font-size: clamp(24px, 4vw, 35px);
          margin: 12px 0;
        }

        .final-cta-inner p {
          color: #91a5bb;
          font-size: 14px;
          line-height: 1.7;
          max-width: 600px;
        }

        .detail-message {
          text-align: center;
          padding: 110px 20px;
          color: #a8bbcf;
        }

        .detail-message h2 {
          color: white;
        }

        .detail-message p {
          line-height: 1.7;
        }

        @media(max-width: 800px) {
          .detail-hero-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .detail-art {
            min-height: 240px;
          }

          .overview-grid {
            grid-template-columns: 1fr;
          }
        }

        @media(max-width: 600px) {
          .detail-container {
            width: calc(100% - 32px);
          }

          .detail-hero {
            padding-top: 30px;
          }

          .detail-hero-copy h1 {
            font-size: 38px;
          }

          .sub-grid {
            grid-template-columns: 1fr;
          }

          .final-cta-inner {
            align-items: flex-start;
            flex-direction: column;
          }

          .detail-overview,
          .detail-sub-section,
          .detail-skills {
            padding-top: 55px;
            padding-bottom: 55px;
          }
        }
      `}</style>
    </>
  );
}
