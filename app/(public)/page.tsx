"use client";

import "../home.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CTA, Footer, SocialBar } from "../../components/site";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}` };

const defaultHero = {
  eyebrow: "B2B growth, made human",
  title: "More Signal. Less Chasing.",
  copy: "MATIG brings sharp research, intentional outreach, and great digital craft together to create B2B opportunities worth having.",
  cta1: "Get a Free Sample →",
  cta2: "Explore our services",
};

const defaultServices = [
  { id: "1", title: "Lead Generation", detail: "Targeted prospect lists designed around your exact ICP.", slug: "lead-generation" },
  { id: "2", title: "LinkedIn Outreach", detail: "Thoughtful conversations that earn qualified replies.", slug: "linkedin-outreach" },
  { id: "3", title: "B2B Prospect Research", detail: "Decision-maker intelligence your sales team can trust.", slug: "prospect-research" },
];

const packages = [
  {
    icon: "people",
    title: "Full Growth Engine",
    sub: "Find, understand, and engage your ideal customers.",
    items: ["Lead Generation", "B2B Prospect Research", "LinkedIn Outreach"],
    ideal: "Startups & Growing Businesses",
    color: "green",
  },
  {
    icon: "code",
    title: "Dev & QA Partnership",
    sub: "Build reliable software, launch with confidence.",
    items: ["Web Development", "QA Testing (Manual + Automation)", "API Testing (Postman)"],
    ideal: "Product Teams & Tech Companies",
    color: "blue",
  },
  {
    icon: "chart",
    title: "Intelligence-Led Outreach",
    sub: "Reach the right decision-makers.",
    items: ["Prospect Research", "LinkedIn Outreach", "Targeted Lead Lists"],
    ideal: "B2B Sales & Agencies",
    color: "purple",
  },
];

const testimonials = [
  {
    name: "Alan Somerfield",
    company: "Apex Ideas Ltd",
    message: "Great work identifying UK mechanical products and manufacturers. Very thorough research, accurate data, and delivered on time. Highly recommended!",
  },
  {
    name: "Alex Hall",
    company: "Upwork Client",
    message: "Completed the email scraping task efficiently and accurately. Fast turnaround, great communication throughout the project. Will work again.",
  },
  {
    name: "Andrea Nguyen",
    company: "Koi Studios",
    message: "Excellent lead generation for our design agency. High quality prospect lists tailored to our exact ICP. Very professional team.",
  },
  {
    name: "Andreas Larsen",
    company: "Lead Media",
    message: "Solid lead generation listbuilding work. Delivered exactly what was needed. Great communication and fast delivery.",
  },
  {
    name: "Azhar Siddiqui",
    company: "RepStack",
    message: "Amazing working with the team for over a year. The whole company is such a great place to work with. I highly recommend these guys!",
  },
  {
    name: "Chris Zawitus",
    company: "Upwork Client",
    message: "Company qualification and personalisation research done perfectly. Very detailed and accurate results.",
  },
];

function PackageIcon({ type }: { type: string }) {
  if (type === "people") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="7" r="4" />
        <path d="M2 21v-2a7 7 0 0 1 14 0v2M16 4a4 4 0 0 1 0 7M19 14a5 5 0 0 1 3 5v2" />
      </svg>
    );
  }

  if (type === "code") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m8 17-5-5 5-5M16 7l5 5-5 5M14 4l-4 16" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 3v18h18M8 15l4-4 4 3 5-7" />
    </svg>
  );
}

export default function Home() {
  const [hero, setHero] = useState(defaultHero);
  const [services, setServices] = useState<any[]>(defaultServices);

  useEffect(() => {
    fetch(`${SURL}/rest/v1/Setting?select=key,value`, {
      headers: H,
      cache: "no-store",
    })
      .then((r) => r.json())
      .then((data: any) => {
        if (!Array.isArray(data)) return;

        const settings: Record<string, string> = {};
        data.forEach((d: any) => {
          settings[d.key] = d.value;
        });

        setHero({
          eyebrow: settings["hero_eyebrow"] || defaultHero.eyebrow,
          title: settings["hero_title"] || defaultHero.title,
          copy: settings["hero_copy"] || defaultHero.copy,
          cta1: settings["hero_cta1"] || defaultHero.cta1,
          cta2: settings["hero_cta2"] || defaultHero.cta2,
        });
      })
      .catch(() => {});

    fetch(`${SURL}/rest/v1/Service?status=eq.Published&order=createdAt.asc`, {
      headers: H,
    })
      .then((r) => r.json())
      .then((data: any) => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data);
        }
      })
      .catch(() => {});
  }, []);

  const steps = [
    ["01", "Map the market", "We identify the accounts, people, and moments most worth pursuing."],
    ["02", "Create the signal", "Our specialists build messages and assets that deserve attention."],
    ["03", "Make momentum", "Clear reporting turns every campaign into smarter next steps."],
  ];

  const stats = [
    ["$60K+", "Upwork Earned"],
    ["7,172+", "Hours Logged"],
    ["202+", "Total Jobs"],
    ["100%", "Job Success"],
  ];

  return (
    <>
      <main className="home-page">
        {/* HERO */}
        <section
          className="home-hero"
          style={{
            backgroundImage:
              "url('https://res.cloudinary.com/folpmq9g/image/upload/v1795272062/1766650508731.jpg')",
          }}
        >
          <div
  className="home-hero-overlay"
  style={{
    background: "linear-gradient(90deg, rgba(5,15,30,0.62), rgba(5,15,30,0.18))"
  }}
/>
          <div className="home-hero-decoration home-decoration-one" />
          <div className="home-hero-decoration home-decoration-two" />
          <SocialBar />

          <div className="home-container home-hero-content">
            <span className="home-eyebrow">{hero.eyebrow}</span>
            <h1>{hero.title}</h1>
            <p>{hero.copy}</p>

            <div className="home-actions">
              <Link href="/contact" className="home-button home-button-primary">
                {hero.cta1}
              </Link>
              <Link href="/services" className="home-button home-button-outline">
                {hero.cta2}
              </Link>
            </div>

            <div className="home-proof">
              <div><strong>2.4×</strong><span>Average reply lift</span></div>
              <div><strong>48hr</strong><span>Sample turnaround</span></div>
              <div><strong>100%</strong><span>Human-checked data</span></div>
            </div>
          </div>
        </section>

        {/* APPROACH */}
        <section className="home-section home-approach">
          <div className="home-container home-split">
            <div className="home-approach-copy">
              <span className="home-eyebrow">The MATIG approach</span>
              <h2>
                We don't believe a fuller pipeline starts with more noise.
                <span> It starts with better context.</span>
              </h2>
              <Link href="/about" className="home-button home-button-outline-dark">
                Meet MATIG →
              </Link>
            </div>

            <div className="home-steps">
              {steps.map(([number, title, description]) => (
                <div className="home-step" key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PACKAGES */}
        <section className="home-section home-packages" id="packages">
          <div className="home-offer-strip">
            🎉 NEW YEAR OFFER — FREE SAMPLE WITH EVERY PACKAGE · LIMITED SPOTS
          </div>

          <div className="home-container">
            <div className="home-section-heading">
              <span className="home-eyebrow">Our Solutions</span>
              <h2>Our 3 <span>Powerful</span> Service Packages</h2>
              <p>Choose the right solution to achieve your business goals.</p>
            </div>

            <div className="home-package-grid">
              {packages.map((pkg) => (
                <article className={`home-package-card ${pkg.color}`} key={pkg.title}>
                  <div className="home-package-icon">
                    <PackageIcon type={pkg.icon} />
                  </div>

                  <h3>{pkg.title}</h3>
                  <p className="home-package-description">{pkg.sub}</p>

                  <ul>
                    {pkg.items.map((item) => (
                      <li key={item}><span>✓</span>{item}</li>
                    ))}
                  </ul>

                  <div className="home-package-ideal">
                    <strong>IDEAL FOR</strong>
                    <span>{pkg.ideal}</span>
                  </div>

                  <div className="home-package-offer">
                    🎁 FREE sample included with your package
                  </div>

                  <Link
                    href={`/contact?service=${encodeURIComponent(pkg.title)}`}
                    className="home-button home-package-button"
                  >
                    Get Started →
                  </Link>
                </article>
              ))}
            </div>

            <p className="home-package-note">
              No commitment. No spam. Just useful work delivered fast.
            </p>
          </div>
        </section>

        {/* STATS */}
        <section className="home-section home-stats">
          <div className="home-container">
            <div className="home-section-heading">
              <span className="home-eyebrow">Our Success</span>
              <h2>Results that speak for themselves.</h2>
              <p>Here are some snapshots of our success over the years.</p>
            </div>

            <div className="home-stats-grid">
              {stats.map(([number, label]) => (
                <div className="home-stat" key={label}>
                  <div className="home-stat-circle">{number}</div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="home-section home-about" id="about">
          <div className="home-container home-about-grid">
            <div className="home-about-image">
              <img
                src="https://res.cloudinary.com/folpmq9g/image/upload/v1795272062/1766650508731.jpg"
                alt="MATIG Team"
              />
            </div>

            <div className="home-about-content">
              <span className="home-eyebrow">Know About Us</span>
              <h2>About <span>MATIG Technologix</span></h2>

              <p>
                MATIG Technologix is leading and evolving the way B2B organizations
                connect with their ideal customers.
              </p>

              <p>
                Founded in 2020, we have delivered sharp research, intentional
                outreach, and reliable technology to clients across USA, UK,
                Australia and beyond. Our team combines human expertise with smart
                processes to build B2B pipelines worth having.
              </p>

              <div className="home-founder">
                <strong>Hafiz Tajwer Kamran</strong>
                <span>CEO @ MATIG Technologix</span>
              </div>

              <Link href="/team" className="home-button home-button-outline-dark">
                Meet the Team →
              </Link>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="home-section home-services" id="home-services">
          <div className="home-container home-services-layout">
            <div className="home-services-intro">
              <span className="home-eyebrow">What We're Offering</span>
              <h2>Services We're Providing</h2>
              <p>
                We bring you targeted B2B lead generation, LinkedIn outreach, and
                reliable web solutions rooted in our expertise and deep knowledge
                of customer behavior.
              </p>
              <Link href="/services" className="home-button home-button-primary">
                View All Services →
              </Link>
            </div>

            <div className="home-services-grid">
              {services.slice(0, 4).map((item: any) => (
                <Link
                  href={`/services/${encodeURIComponent(item.slug || "")}`}
                  className="home-service-card"
                  key={item.id}
                >
                  <span className="home-service-symbol">✳</span>
                  <h3>{item.title}</h3>
                  <p>{item.detail || item.description || ""}</p>
                  <span className="home-service-link">Explore service →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="home-section home-industries">
          <div className="home-container">
            <span className="home-eyebrow">Built for ambitious teams</span>
            <h2>
              Good growth work connects the dots between who you are and who you
              need to reach.
            </h2>
            <div className="home-industry-list">
              <span>FINTECH</span>
              <span>SAAS</span>
              <span>HEALTHCARE</span>
              <span>PROFESSIONAL SERVICES</span>
              <span>MANUFACTURING</span>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="home-section home-testimonials">
          <div className="home-container">
            <div className="home-section-heading">
              <span className="home-eyebrow">Our Client Feedback</span>
              <h2>What Our Customers Say!</h2>
            </div>

            <div className="home-testimonial-grid">
              {testimonials.map((review) => (
                <article className="home-testimonial-card" key={review.name}>
                  <div className="home-quote-mark">“</div>
                  <div className="home-stars">★★★★★</div>
                  <p>{review.message}</p>
                  <div className="home-review-author">
                    <div>{review.name.charAt(0)}</div>
                    <section>
                      <strong>{review.name}</strong>
                      <span>{review.company}</span>
                    </section>
                  </div>
                </article>
              ))}
            </div>

            <div className="home-reviews-link">
              <Link href="/testimonials" className="home-button home-button-outline-dark">
                View All Reviews →
              </Link>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
