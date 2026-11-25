
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

const FB = "https://www.facebook.com/matigtechnologix/";
const LI = "https://www.linkedin.com/company/matigtechnologix";
const UP = "https://www.upwork.com/agencies/1326827692116914176/";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}` };


 // SOCIAL BAR
export function SocialBar() {
  const [socialOpen, setSocialOpen] = useState(false);

  const socialLinks = [
    {
      href: FB,
      label: "Facebook",
      color: "#1877F2",
      d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
    },
    {
      href: LI,
      label: "LinkedIn",
      color: "#0A66C2",
      d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"
    },
    {
      href: UP,
      label: "Upwork",
      color: "#14A800",
      d: "M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3.645 0 6.188-2.737 6.188-6.32-0.001-3.517-2.711-5.159-5.188-5.429z"
    }
  ];

  return (
    <div
      onMouseEnter={() => setSocialOpen(true)}
      onMouseLeave={() => setSocialOpen(false)}
      style={{
        position: "fixed",
        left: "18px",
        bottom: "24px",
        zIndex: 95,
        display: "flex",
        alignItems: "center",
        gap: "9px",
        padding: "7px",
        borderRadius: "40px",
        background: "rgba(255,255,255,0.94)",
        border: "1px solid #dbe5f0",
        boxShadow: "0 6px 25px rgba(15,35,65,0.15)",
        backdropFilter: "blur(12px)"
      }}
    >
      <button
        type="button"
        aria-label="Toggle social links"
        onClick={() => setSocialOpen(!socialOpen)}
        style={{
          width: "43px",
          height: "43px",
          flexShrink: 0,
          border: "none",
          borderRadius: "50%",
          background: "#0b1f3a",
          color: "#ffffff",
          fontSize: "19px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {socialOpen ? "×" : "↗"}
      </button>

      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "9px",
        overflow: "hidden",
        maxWidth: socialOpen ? "180px" : "0px",
        opacity: socialOpen ? 1 : 0,
        transition: "max-width 0.35s ease, opacity 0.25s ease"
      }}>
        {socialLinks.map(({ href, label, color, d }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            title={label}
            style={{
              width: "37px",
              height: "37px",
              flexShrink: 0,
              borderRadius: "50%",
              background: "#f1f5f9",
              color: "#17365d",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = color;
              e.currentTarget.style.color = "#ffffff";
              e.currentTarget.style.transform = "scale(1.12)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#f1f5f9";
              e.currentTarget.style.color = "#17365d";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d={d} />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}


// NAVIGATION
export function Nav() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [services, setServices] = useState<any[]>([]);
  const [activeService, setActiveService] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${SURL}/rest/v1/Service?status=eq.Published&order=createdAt.asc`, {
      headers: H
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch(() => {});
  }, []);

  const companyLinks = [
    ["About Us", "/#about"],
    ["Our Team", "/team"],
    ["Case Studies", "/case-studies"],
    ["Testimonials", "/testimonials"]
  ];

  const chevronStyle = {
    width: "7px",
    height: "7px",
    borderRight: "1.7px solid currentColor",
    borderBottom: "1.7px solid currentColor",
    transform: "rotate(45deg)",
    display: "inline-block" as const,
    marginLeft: "5px",
    marginTop: "-4px",
    transition: "transform 0.2s ease"
  };

  const menuTitleStyle = {
    cursor: "pointer",
    color: "#102b4e",
    fontSize: "14px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    padding: "28px 0",
    gap: "4px",
    whiteSpace: "nowrap" as const
  };

  const dropdownLinkStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    color: "#17365d",
    fontSize: "13px",
    fontWeight: 600,
    textDecoration: "none",
    borderRadius: "8px",
    transition: "all 0.2s ease"
  };

  const megaMenuStyle = {
    position: "absolute" as const,
    top: "100%",
    left: "-20px",
    width: "570px",
    display: "grid",
    gridTemplateColumns: "235px 1fr",
    background: "#ffffff",
    border: "1px solid #e2eaf3",
    borderRadius: "14px",
    overflow: "visible",
    boxShadow: "0 20px 50px rgba(15,35,65,0.15)",
    zIndex: 500
  };

  const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = "#edf5ff";
    e.currentTarget.style.color = "#0878d1";
  };

  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = "transparent";
    e.currentTarget.style.color = "#17365d";
  };

  return (
    <>
      <nav
        className="nav"
        aria-label="Main navigation"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 300,
          background: "#ffffff",
          borderBottom: "1px solid #e8eef5",
          width: "100%",
          minHeight: "82px",
          padding: "0 4%",
          boxSizing: "border-box",
          boxShadow: "0 3px 18px rgba(15,35,65,0.04)"
        }}
      >
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <img
            src="https://res.cloudinary.com/folpmq9g/image/upload/v1790393882/ChatGPT_Image_Sep_26_2026_08_30_38_AM.png"
            alt="MATIG"
            style={{
              height: "49px",
              width: "auto",
              objectFit: "contain"
            }}
          />
        </Link>

        <div className="links" style={{ position: "relative" }}>

          {/* SERVICES */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setDropdown("services")}
            onMouseLeave={() => {
              setDropdown(null);
              setActiveService(null);
            }}
          >
            <span style={menuTitleStyle}>
              Services <span style={chevronStyle} />
            </span>

            {dropdown === "services" && (
              <div style={megaMenuStyle}>

                {/* LEFT SIDE */}
                <div style={{
                  padding: "18px 12px",
                  background: "#f5f9ff",
                  borderRadius: "14px 0 0 14px"
                }}>
                  <div style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    color: "#8295ad",
                    letterSpacing: "1.5px",
                    padding: "5px 12px 13px"
                  }}>
                    OUR SERVICES
                  </div>

                  {services.map((item: any) => (
                    <div
                      key={item.id}
                      onMouseEnter={() => setActiveService(item.id)}
                      style={{
                        position: "relative",
                        background: activeService === item.id ? "#ffffff" : "transparent",
                        borderRadius: "8px",
                        marginBottom: "4px",
                        boxShadow: activeService === item.id
                          ? "0 3px 12px rgba(15,35,65,0.06)"
                          : "none"
                      }}
                    >
                      <Link
                        href="/#home-services"
                        onClick={() => setDropdown(null)}
                        style={{
                          ...dropdownLinkStyle,
                          color: activeService === item.id ? "#0878d1" : "#17365d"
                        }}
                        onMouseOver={handleHover}
                        onMouseOut={handleLeave}
                      >
                        {item.title}
                        <span style={{ fontSize: "19px" }}>›</span>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* RIGHT SIDE */}
                <div style={{
                  padding: "22px 18px",
                  minHeight: "220px"
                }}>
                  <div style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    color: "#8295ad",
                    letterSpacing: "1.5px",
                    marginBottom: "15px"
                  }}>
                    EXPLORE SERVICES
                  </div>

                  {services.find((item: any) => item.id === activeService)
                    ?.subServices?.length > 0 ? (
                    services
                      .find((item: any) => item.id === activeService)
                      .subServices.map((sub: any) => (
                        <Link
                          key={sub.slug}
                          href="/#home-services"
                          onClick={() => setDropdown(null)}
                          style={dropdownLinkStyle}
                          onMouseOver={handleHover}
                          onMouseOut={handleLeave}
                        >
                          {sub.title}
                          <span style={{ color: "#0878d1" }}>→</span>
                        </Link>
                      ))
                  ) : (
                    <div style={{
                      padding: "12px",
                      color: "#71839a",
                      fontSize: "13px",
                      lineHeight: 1.7
                    }}>
                      Move your mouse over a service to explore its sub-services.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <Link href="/industries">Industries</Link>
          <Link href="/work">Our work</Link>

          {/* COMPANY */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setDropdown("company")}
            onMouseLeave={() => setDropdown(null)}
          >
            <span style={menuTitleStyle}>
              Company <span style={chevronStyle} />
            </span>

            {dropdown === "company" && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: "-18px",
                width: "225px",
                background: "#ffffff",
                border: "1px solid #e2eaf3",
                borderRadius: "12px",
                padding: "10px",
                boxShadow: "0 18px 40px rgba(15,35,65,0.14)",
                zIndex: 500
              }}>
                {companyLinks.map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setDropdown(null)}
                    style={dropdownLinkStyle}
                    onMouseOver={handleHover}
                    onMouseOut={handleLeave}
                  >
                    {label}
                    <span style={{ color: "#0878d1" }}>→</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/resources">Insights</Link>
          <Link href="/contact">Contact Us</Link>
        </div>

        {/* RIGHT CORNER CTA */}
        <Link
          href="/contact"
          className="btn primary hide-mobile"
          style={{
            background: "#0878d1",
            color: "#ffffff",
            borderRadius: "7px",
            padding: "13px 21px",
            fontWeight: 700,
            fontSize: "13px",
            whiteSpace: "nowrap",
            boxShadow: "0 5px 15px rgba(8,120,209,0.18)"
          }}
        >
          Schedule a Call →
        </Link>

        <span
          className="mobile"
          onClick={() => setOpen(!open)}
          style={{
            cursor: "pointer",
            fontSize: "25px",
            color: "#102b4e"
          }}
        >
          {open ? "✕" : "☰"}
        </span>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div style={{
          position: "fixed",
          top: "76px",
          left: 0,
          right: 0,
          bottom: 0,
          background: "#0b1f3a",
          zIndex: 299,
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          gap: "1.25rem",
          overflowY: "auto"
        }}>
          {[
            ["Services", "/services"],
            ["Industries", "/industries"],
            ["Our work", "/work"],
            ["About", "/about"],
            ["Our Team", "/team"],
            ["Case Studies", "/case-studies"],
            ["Insights", "/resources"],
            ["Contact", "/contact"]
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                color: "#fff",
                fontSize: "1.1rem",
                fontWeight: 600,
                textDecoration: "none",
                padding: "0.75rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="btn primary"
            onClick={() => setOpen(false)}
            style={{
              marginTop: "1rem",
              textAlign: "center"
            }}
          >
            Schedule a Call →
          </Link>
        </div>
      )}
    </>
  );
}


// FOOTER
export function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (res.ok) {
      setMsg("✅ Subscribed successfully!");
      setEmail("");
    } else {
      setMsg(data.error || "Something went wrong");
    }
  };

  const socialLinks = [
    { href: FB, label: "Facebook", d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
    { href: LI, label: "LinkedIn", d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" },
    { href: UP, label: "Upwork", d: "M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.696 2.66zM18.561 5.018c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c0 1.406-1.141 2.546-2.547 2.546S2.738 12.01 2.736 10.604V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303s5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3.645 0 6.188-2.737 6.188-6.32-3.517 0-5.188-5.569-5.188-5.569z" }
  ];

  const headingStyle = {
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: 700,
    marginBottom: "22px"
  } as const;

  const linkStyle = {
    display: "block",
    color: "#b8c7dc",
    textDecoration: "none",
    fontSize: "14px",
    marginBottom: "14px"
  } as const;

  return (
    <footer style={{
      background: "#0b1f3a",
      color: "#ffffff",
      position: "relative",
      overflow: "hidden",
      paddingTop: "75px"
    }}>
      <div className="shell" style={{
        position: "relative",
        zIndex: 1,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
        gap: "45px",
        paddingBottom: "55px"
      }}>
        <div>
          <Link href="/" style={{ display: "inline-block", marginBottom: "20px" }}>
            <img
              src="https://res.cloudinary.com/folpmq9g/image/upload/v1790393882/ChatGPT_Image_Sep_26_2026_08_30_38_AM.png"
              alt="MATIG Technologix"
              style={{ height: "48px", objectFit: "contain" }}
            />
          </Link>

          <p style={{
            color: "#b8c7dc",
            fontSize: "14px",
            lineHeight: 1.8,
            maxWidth: "280px",
            marginBottom: "25px"
          }}>
            Your trusted technology and growth partner. We help businesses build stronger connections, smarter systems, and meaningful growth.
          </p>

          <h4 style={{ ...headingStyle, marginBottom: "15px" }}>
            Stay Connected
          </h4>

          <form onSubmit={subscribe} style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap"
          }}>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                flex: 1,
                minWidth: "140px",
                padding: "12px",
                borderRadius: "7px",
                border: "1px solid #345071",
                background: "#142d4d",
                color: "#ffffff",
                fontSize: "13px"
              }}
            />

            <button type="submit" style={{
              padding: "12px 17px",
              background: "#1685e5",
              color: "#ffffff",
              border: "none",
              borderRadius: "7px",
              fontWeight: 600,
              cursor: "pointer"
            }}>
              Subscribe
            </button>
          </form>

          {msg && (
            <p style={{ color: "#8fcaff", fontSize: "13px", marginTop: "10px" }}>
              {msg}
            </p>
          )}

          <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
            {socialLinks.map(({ href, label, d }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "9px",
                  background: "#17385e",
                  border: "1px solid #345071",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#ffffff"
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d={d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

       <div>
  <h4 style={headingStyle}>Our Services</h4>
  <a href="/services" style={linkStyle}>Lead Generation</a>
  <a href="/services" style={linkStyle}>LinkedIn Outreach</a>
  <a href="/services" style={linkStyle}>Web Development</a>
  <a href="/services" style={linkStyle}>Business Automation</a>
  <a href="/services" style={linkStyle}>Digital Solutions</a>
</div>

        <div>
          <h4 style={headingStyle}>Company</h4>
          <Link href="/about" style={linkStyle}>About MATIG</Link>
          <Link href="/case-studies" style={linkStyle}>Case Studies</Link>
          <Link href="/team" style={linkStyle}>Our Team</Link>
          <Link href="/testimonials" style={linkStyle}>Testimonials</Link>
          <Link href="/blog" style={linkStyle}>Blog</Link>
          <Link href="/contact" style={linkStyle}>Contact Us</Link>
        </div>

        <div>
          <h4 style={headingStyle}>Get in Touch</h4>
          <p style={{
            color: "#8fcaff",
            fontSize: "13px",
            fontWeight: 600,
            marginBottom: "8px"
          }}>
            Email Us
          </p>

          <a href="mailto:hello@matigtechnologix.online" style={{
            ...linkStyle,
            overflowWrap: "anywhere"
          }}>
            hello@matigtechnologix.online
          </a>

          <h4 style={{ ...headingStyle, marginTop: "28px" }}>
            Explore
          </h4>
          <Link href="/resources" style={linkStyle}>Resources</Link>
          <Link href="/contact" style={linkStyle}>Get a Free Sample</Link>
        </div>
      </div>

      <div style={{
        borderTop: "1px solid #29415e",
        background: "#08182d"
      }}>
        <div className="shell" style={{
          padding: "22px 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap"
        }}>
          <span style={{ color: "#91a6c0", fontSize: "13px" }}>
            © 2026 MATIG Technologix. All rights reserved.
          </span>
          <span style={{ color: "#91a6c0", fontSize: "13px" }}>
            Built for meaningful growth.
          </span>
        </div>
      </div>
    </footer>
  );
}

// PAGE HERO
export function PageHero({
  eyebrow,
  title,
  copy
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <header className="page-hero grid-bg">
      <div className="orb one" />
      <div className="shell" style={{ position: "relative" }}>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {copy && <p>{copy}</p>}
      </div>
    </header>
  );
}

// CALL TO ACTION
export function CTA() {
  return (
    <section className="cta">
      <div className="shell cta-inner">
        <div>
          <span className="eyebrow" style={{ color: "#a2ffe1" }}>
            Start with proof
          </span>
          <h2>See what thoughtful outreach can do for your pipeline.</h2>
        </div>
        <Link className="btn primary" href="/contact">
          Get a Free Sample ↗
        </Link>
      </div>
    </section>
  );
}

// LAYOUT
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
