
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Footer } from "../../../components/site";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Keep your existing SKEY line here, with your current anon key.
const SKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmNjbWphaXl1dHluaHlkeGVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk5MDI4MDQsImV4cCI6MjEwNTQ3ODgwNH0.u0Qd1doTLrghPh2iVQ6PfoM2vnLX7rDQJqcHh2t03I0";

const H = {
  apikey: SKEY,
  Authorization: `Bearer ${SKEY}`,
};

type SubService = {
  title: string;
  slug?: string;
};

type Service = {
  id: string;
  title: string;
  slug: string;
  detail?: string;
  subServices?: SubService[] | string;
  skills?: string[] | string;
};

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function getSubs(value: Service["subServices"]): SubService[] {
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch {
      return value.split("|").map(s => s.trim()).filter(Boolean).map(title => ({ title }));
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

// Custom abstract technology illustrations
function ServiceArt({ type }: { type: number }) {
  return (
    <div className={`service-art art-${type}`}>
      <svg viewBox="0 0 440 210" role="img" aria-label="Abstract technology illustration">
        <defs>
          <linearGradient id={`glow-${type}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00f5a0" />
            <stop offset="100%" stopColor="#168bff" />
          </linearGradient>
          <filter id={`shadow-${type}`}>
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <ellipse cx="220" cy="176" rx="170" ry="17" fill="none" stroke="#087e86" opacity=".4" />
        <ellipse cx="220" cy="176" rx="125" ry="11" fill="none" stroke="#087e86" opacity=".3" />
        <ellipse cx="220" cy="176" rx="80" ry="7" fill="none" stroke="#087e86" opacity=".25" />

        {type === 0 && (
          <>
            <path d="M220 105 L95 55 M220 105 L345 55 M220 105 L95 150 M220 105 L345 150" stroke="#00dca0" strokeWidth="1.5" opacity=".65" />
            {[95, 345].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy="55" r="22" fill="#102f4b" stroke="#00e5c0" />
                <circle cx={x} cy="150" r="22" fill="#102f4b" stroke="#00e5c0" />
                <circle cx={x} cy={55} r="7" fill="#38d9ff" />
                <path d={`M${x - 11} 68 Q${x} 49 ${x + 11} 68`} stroke="#38d9ff" fill="none" strokeWidth="5" />
                <circle cx={x} cy="150" r="7" fill="#38d9ff" />
              </g>
            ))}
            <rect x="165" y="67" width="110" height="75" rx="13" fill="#075078" stroke="#00f5c0" strokeWidth="2" />
            <text x="220" y="118" fill="white" textAnchor="middle" fontSize="35" fontWeight="bold">in</text>
            <path d="M285 72 L320 42 L345 52 L365 24" stroke="#00f5a0" strokeWidth="4" fill="none" />
            <path d="M352 25 L365 24 L363 38" stroke="#00f5a0" strokeWidth="4" fill="none" />
          </>
        )}

        {type === 1 && (
          <>
            <path d="M90 55 L220 55 L190 135 L120 135 Z" fill="#073e55" stroke="#00e8c0" strokeWidth="2" />
            {[135, 175, 215, 255, 295].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy="45" r="11" fill="#168bff" stroke="#5beaff" />
                <path d={`M${x - 14} 65 Q${x} 48 ${x + 14} 65`} fill="#087f9c" stroke="#00d8c0" />
              </g>
            ))}
            <path d="M155 135 L155 155 L235 155 L235 135" fill="none" stroke="#00e5b8" strokeWidth="3" />
            <circle cx="320" cy="105" r="48" fill="none" stroke="#00cba6" strokeWidth="7" />
            <circle cx="320" cy="105" r="29" fill="none" stroke="#168bff" strokeWidth="5" />
            <circle cx="320" cy="105" r="10" fill="#00f5a0" />
            <path d="M320 105 L368 48" stroke="#00f5a0" strokeWidth="5" />
            <path d="M351 48 L368 48 L368 65" stroke="#00f5a0" strokeWidth="4" fill="none" />
          </>
        )}

        {type === 2 && (
          <>
            <path d="M90 72 L145 50 L145 120 L90 140 Z" fill="#07536a" stroke="#00e9c0" strokeWidth="2" />
            <text x="116" y="104" fill="#8ffff0" fontSize="28" textAnchor="middle">&lt;/&gt;</text>
            <path d="M165 145 L290 145 L325 165 L135 165 Z" fill="#06435b" stroke="#00d9c0" />
            <path d="M160 135 L180 55 Q185 45 200 45 L310 60 L295 145 Z" fill="#0c3150" stroke="#00d8e5" strokeWidth="2" />
            <rect x="185" y="66" width="104" height="66" rx="5" fill="#102b49" stroke="#168bff" />
            <path d="M196 80 H275 M196 91 H250 M196 102 H264 M196 113 H235" stroke="#00f5a0" strokeWidth="3" opacity=".7" />
            <rect x="330" y="72" width="38" height="74" rx="7" fill="#087f91" stroke="#00f5a0" />
            <rect x="337" y="81" width="24" height="15" rx="3" fill="#1d91ff" />
            <rect x="337" y="102" width="24" height="15" rx="3" fill="#e65fa9" />
          </>
        )}

        {type === 3 && (
          <>
            <circle cx="220" cy="112" r="62" fill="#082e4a" stroke="#087c96" strokeWidth="2" />
            <path d="M158 104 Q158 35 220 35 Q282 35 282 104" fill="none" stroke="#168bff" strokeWidth="13" />
            <rect x="145" y="93" width="27" height="53" rx="11" fill="#087cba" stroke="#00e5d0" strokeWidth="2" />
            <rect x="268" y="93" width="27" height="53" rx="11" fill="#087cba" stroke="#00e5d0" strokeWidth="2" />
            <path d="M282 139 Q310 151 297 164 L260 164" fill="none" stroke="#00e5c0" strokeWidth="4" />
            <circle cx="310" cy="75" r="28" fill="#073d51" stroke="#00e9b9" strokeWidth="2" />
            <text x="310" y="84" fill="#00f5a0" fontSize="23" textAnchor="middle" fontWeight="bold">24</text>
            <path d="M95 75 Q110 60 125 75 L125 105 Q110 120 95 105 Z" fill="#087e91" stroke="#00e9c0" />
            <circle cx="105" cy="88" r="3" fill="white" />
            <circle cx="115" cy="88" r="3" fill="white" />
          </>
        )}

        {type === 4 && (
          <>
            <path d="M145 55 L290 55 L315 145 L165 145 Z" fill="#082c49" stroke="#00d9c0" strokeWidth="2" />
            <rect x="175" y="72" width="105" height="62" rx="7" fill="#0c4363" stroke="#168bff" />
            <circle cx="227" cy="102" r="15" fill="#168bff" />
            <path d="M202 125 Q227 90 252 125" stroke="#00f5a0" strokeWidth="4" fill="none" />
            {[
              { x: 100, y: 75, c: "#168bff", t: "in" },
              { x: 120, y: 140, c: "#00a96d", t: "f" },
              { x: 320, y: 75, c: "#db3d9b", t: "◎" },
              { x: 340, y: 140, c: "#777", t: "X" },
            ].map((item, i) => (
              <g key={i}>
                <rect x={item.x - 18} y={item.y - 18} width="36" height="36" rx="9" fill={item.c} />
                <text x={item.x} y={item.y + 7} fill="white" fontSize="20" textAnchor="middle" fontWeight="bold">{item.t}</text>
              </g>
            ))}
            <path d="M310 42 L335 28 L355 37 L375 15" stroke="#00f5a0" strokeWidth="3" fill="none" />
          </>
        )}

        <circle cx="42" cy="35" r="3" fill="#00f5a0" />
        <circle cx="390" cy="170" r="3" fill="#168bff" />
        <circle cx="70" cy="180" r="2" fill="#00f5a0" />
        <circle cx="370" cy="35" r="2" fill="#00f5a0" />
      </svg>
    </div>
  );
}

export default function Services() {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      `${SURL}/rest/v1/Service?status=eq.Published&order=createdAt.asc`,
      { headers: H }
    )
      .then(async response => {
        if (!response.ok) throw new Error("Could not load services");
        return response.json();
      })
      .then(data => setItems(Array.isArray(data) ? data : []))
      .catch(() => setError("Unable to load services. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <main className="services-page">

        <section className="services-hero">
          <div className="hero-orb orb-left" />
          <div className="hero-orb orb-right" />
          <div className="hero-dots" />

          <div className="hero-content">
            <span className="hero-eyebrow">OUR SERVICES</span>
            <h1>
              Services built for
              <br />
              <span>quality &amp; growth.</span>
            </h1>
            <p>
              Explore our professional solutions, discover our expertise
              and find the right services to grow your business.
            </p>
            <div className="hero-line" />
          </div>
        </section>

        <section className="services-shell">
          {loading ? (
            <div className="services-message">Loading our services...</div>
          ) : error ? (
            <div className="services-message error">{error}</div>
          ) : items.length === 0 ? (
            <div className="services-message">No published services found.</div>
          ) : (
            <div className="services-grid">
              {items.map((item, index) => {
                const subs = getSubs(item.subServices);
                const skills = getSkills(item.skills);
                const serviceSlug = item.slug || slugify(item.title);

                return (
                  <Link
                    key={item.id}
                    href={`/services/${encodeURIComponent(serviceSlug)}`}
                    className="service-card"
                  >
                    <ServiceArt type={index % 5} />

                    <div className="service-card-content">
                      <div className="service-number">
                        SERVICE / {String(index + 1).padStart(2, "0")}
                      </div>

                      <h2>{item.title}</h2>

                      <p className="service-description">
                        {item.detail ||
                          "Professional solutions designed to help your business grow."}
                      </p>

                      {subs.length > 0 && (
                        <div className="service-tags">
                          {subs.slice(0, 3).map((sub, i) => (
                            <span key={`${sub.title}-${i}`}>
                              {sub.title}
                            </span>
                          ))}
                          {subs.length > 3 && (
                            <span className="more-tag">
                              +{subs.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {skills.length > 0 && (
                        <div className="service-skills">
                          <span className="skills-label">EXPERTISE</span>
                          <div className="skills-list">
                            {skills.slice(0, 4).map((skill, i) => (
                              <span key={`${skill}-${i}`}>{skill}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="service-link">
                        Explore Service
                        <span className="arrow-circle">→</span>
                      </div>
                    </div>
                  </Link>
                );
              })}

              <div className="service-cta">
                <div className="cta-symbol">✳</div>
                <h2>
                  Let’s Build
                  <br />
                  Something Great <span>Together</span>
                </h2>
                <p>
                  Partner with MATIG for innovative solutions
                  and measurable results.
                </p>
                <Link href="/contact" className="cta-button">
                  Contact Us <span>→</span>
                </Link>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />

      <style jsx>{`
        .services-page {
          background: #030d18;
          min-height: 100vh;
          color: #fff;
          overflow: hidden;
        }

        .services-hero {
          position: relative;
          padding: 85px 20px 25px;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(0, 245, 160, .09), transparent 55%),
            #030d18;
        }

        .hero-content {
          max-width: 850px;
          margin: auto;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .hero-eyebrow {
          display: inline-block;
          color: #00f5a0;
          border: 1px solid #00cfa0;
          border-radius: 30px;
          padding: 9px 24px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 5px;
          margin-bottom: 22px;
        }

        .hero-content h1 {
          font-size: clamp(38px, 6vw, 64px);
          line-height: 1.08;
          font-weight: 850;
          letter-spacing: -2px;
          margin: 0;
        }

        .hero-content h1 span {
          color: #00e9a0;
        }

        .hero-content p {
          color: #a7bdd3;
          max-width: 620px;
          margin: 22px auto 0;
          line-height: 1.7;
          font-size: 17px;
        }

        .hero-line {
          width: 75px;
          height: 3px;
          background: #00f5a0;
          margin: 20px auto 0;
        }

        .hero-orb {
          position: absolute;
          width: 300px;
          height: 300px;
          border: 1px solid rgba(0, 245, 160, .16);
          border-radius: 50%;
          filter: blur(1px);
          pointer-events: none;
        }

        .orb-left {
          top: -220px;
          left: -150px;
          box-shadow: 0 0 80px rgba(0, 245, 160, .12);
        }

        .orb-right {
          right: -180px;
          bottom: -230px;
          box-shadow: 0 0 100px rgba(0, 245, 160, .12);
        }

        .hero-dots {
          position: absolute;
          top: 30px;
          right: 8%;
          width: 130px;
          height: 100px;
          opacity: .25;
          background-image: radial-gradient(#00e5c0 2px, transparent 2px);
          background-size: 25px 25px;
        }

        .services-shell {
          width: min(1320px, calc(100% - 48px));
          margin: 0 auto;
          padding: 20px 0 85px;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 26px;
        }

        .service-card {
          min-width: 0;
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: white;
          background: linear-gradient(145deg, #0b1a2b, #071321);
          border: 1px solid #24465a;
          border-radius: 19px;
          overflow: hidden;
          transition: transform .3s ease, border-color .3s ease, box-shadow .3s ease;
        }

        .service-card:hover {
          transform: translateY(-7px);
          border-color: #00e5b0;
          box-shadow: 0 15px 45px rgba(0, 245, 160, .12);
        }

        .service-art {
          height: 190px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px 18px 0;
          background:
            radial-gradient(ellipse at 50% 70%, rgba(0, 203, 190, .13), transparent 60%);
        }

        .service-art svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .service-card-content {
          padding: 0 25px 25px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .service-number {
          color: #00e9a0;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .service-card h2 {
          font-size: 21px;
          line-height: 1.3;
          margin: 0 0 9px;
          font-weight: 750;
        }

        .service-description {
          color: #a8bbcf;
          font-size: 14px;
          line-height: 1.7;
          margin: 0 0 17px;
        }

        .service-tags, .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .service-tags span, .skills-list span {
          background: #10253a;
          border: 1px solid #24445a;
          border-radius: 6px;
          color: #c2d5e5;
          font-size: 10px;
          padding: 6px 9px;
        }

        .service-tags .more-tag {
          color: #00e9a0;
          border-color: rgba(0, 245, 160, .35);
        }

        .service-skills {
          margin-top: 17px;
        }

        .skills-label {
          display: block;
          color: #00e9a0;
          font-size: 9px;
          letter-spacing: 2px;
          font-weight: 800;
          margin-bottom: 9px;
        }

        .service-link {
          margin-top: auto;
          padding-top: 22px;
          display: flex;
          align-items: center;
          gap: 12px;
          color: #00f5a0;
          font-size: 13px;
          font-weight: 750;
        }

        .arrow-circle {
          width: 27px;
          height: 27px;
          border: 1px solid #00e9a0;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 17px;
          transition: background .2s, color .2s;
        }

        .service-card:hover .arrow-circle {
          background: #00e9a0;
          color: #03121d;
        }

        .service-cta {
          border: 1px solid #24505a;
          border-radius: 19px;
          padding: 30px;
          background:
            radial-gradient(ellipse at 100% 100%, rgba(0, 245, 160, .12), transparent 60%),
            linear-gradient(145deg, #0b1a2b, #071321);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .cta-symbol {
          width: 48px;
          height: 48px;
          display: grid;
          place-items: center;
          border: 1px solid #00e9a0;
          border-radius: 50%;
          color: #00f5a0;
          font-size: 27px;
          margin-bottom: 20px;
        }

        .service-cta h2 {
          font-size: 25px;
          line-height: 1.3;
          margin: 0 0 13px;
        }

        .service-cta h2 span {
          color: #00e9a0;
        }

        .service-cta p {
          color: #a8bbcf;
          font-size: 14px;
          line-height: 1.7;
          margin: 0 0 23px;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          background: #00e9a0;
          color: #03121d;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
          padding: 13px 21px;
          border-radius: 30px;
          width: fit-content;
          transition: transform .2s, box-shadow .2s;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 245, 160, .25);
        }

        .services-message {
          color: #a8bbcf;
          text-align: center;
          padding: 70px 20px;
        }

        .services-message.error {
          color: #ff8b8b;
        }

        @media (max-width: 950px) {
          .services-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 600px) {
          .services-hero {
            padding-top: 65px;
          }

          .hero-content h1 {
            letter-spacing: -1px;
          }

          .hero-content p {
            font-size: 14px;
          }

          .services-shell {
            width: calc(100% - 30px);
          }

          .services-grid {
            grid-template-columns: 1fr;
            gap: 19px;
          }

          .service-art {
            height: 185px;
          }

          .service-card-content {
            padding: 0 20px 23px;
          }
        }
      `}</style>
    </>
  );
}
