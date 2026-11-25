
"use client";

import { useState, useEffect } from "react";
import { Footer } from "../../../components/site";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}` };

const blue = "#001F76";
const green = "#0EAB14";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    context: "",
    honeypot: "",
    timestamp: Date.now(),
  });

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${SURL}/rest/v1/Service?status=eq.Published&order=createdAt.asc`, {
      headers: H,
    })
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) setServices(data);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setForm({
          name: "",
          email: "",
          service: "",
          context: "",
          honeypot: "",
          timestamp: Date.now(),
        });
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const field = {
    width: "100%",
    padding: "14px 16px",
    background: "#F8FAFF",
    border: "1px solid #DCE4F2",
    borderRadius: "10px",
    color: "#14213D",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box" as const,
    fontFamily: "inherit",
  };

  const label = {
    display: "block",
    color: "#14213D",
    fontSize: "14px",
    fontWeight: 600,
    marginBottom: "9px",
  };

  return (
    <>
      <main style={{ background: "#F4F7FC", minHeight: "100vh" }}>

        {/* HERO */}
        <section style={{
          background: "#FFFFFF",
          padding: "85px 24px 75px",
          textAlign: "center",
          borderBottom: "1px solid #E8EDF5",
        }}>
          <div style={{
            maxWidth: "760px",
            margin: "0 auto",
          }}>
            <span style={{
              color: green,
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "2px",
              textTransform: "uppercase",
            }}>
              LET'S TALK BUSINESS
            </span>

            <h1 style={{
              color: blue,
              fontSize: "clamp(36px, 5vw, 58px)",
              lineHeight: 1.12,
              fontWeight: 800,
              margin: "18px 0",
            }}>
              Let's Build Something
              <span style={{ color: green }}> Great Together.</span>
            </h1>

            <p style={{
              color: "#64748B",
              fontSize: "17px",
              lineHeight: 1.8,
              maxWidth: "620px",
              margin: "0 auto",
            }}>
              Tell us about your goals. Our team will help you find
              the right solution to move your business forward.
            </p>
          </div>
        </section>

        {/* CONTACT CONTENT */}
        <section style={{
          padding: "75px 24px 90px",
        }}>
          <div style={{
            maxWidth: "1150px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
            gap: "45px",
            alignItems: "start",
          }}>

            {/* LEFT INFORMATION */}
            <div style={{ paddingTop: "15px" }}>
              <span style={{
                color: green,
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "1.5px",
              }}>
                START A CONVERSATION
              </span>

              <h2 style={{
                color: blue,
                fontSize: "clamp(30px, 4vw, 42px)",
                lineHeight: 1.2,
                fontWeight: 800,
                margin: "18px 0",
              }}>
                Your Next Big Idea Starts Here.
              </h2>

              <p style={{
                color: "#64748B",
                fontSize: "16px",
                lineHeight: 1.9,
                marginBottom: "35px",
              }}>
                Whether you need lead generation, web development,
                outreach or digital marketing, MATIG is ready to help.
                Share your requirements and let's discuss your project.
              </p>

              <div style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                marginBottom: "25px",
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  background: "#E8F7E9",
                  color: green,
                  borderRadius: "12px",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "22px",
                  flexShrink: 0,
                }}>✓</div>
                <div>
                  <strong style={{ color: blue, fontSize: "16px" }}>
                    Tailored Solutions
                  </strong>
                  <p style={{ color: "#64748B", fontSize: "14px", margin: "5px 0 0" }}>
                    Solutions based on your business goals.
                  </p>
                </div>
              </div>

              <div style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
                marginBottom: "25px",
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  background: "#E8F0FF",
                  color: blue,
                  borderRadius: "12px",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "22px",
                  flexShrink: 0,
                }}>↗</div>
                <div>
                  <strong style={{ color: blue, fontSize: "16px" }}>
                    Experienced Team
                  </strong>
                  <p style={{ color: "#64748B", fontSize: "14px", margin: "5px 0 0" }}>
                    Human expertise with smart processes.
                  </p>
                </div>
              </div>

              <div style={{
                display: "flex",
                gap: "15px",
                alignItems: "center",
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  background: "#E8F7E9",
                  color: green,
                  borderRadius: "12px",
                  display: "grid",
                  placeItems: "center",
                  fontSize: "22px",
                  flexShrink: 0,
                }}>◷</div>
                <div>
                  <strong style={{ color: blue, fontSize: "16px" }}>
                    Quick Response
                  </strong>
                  <p style={{ color: "#64748B", fontSize: "14px", margin: "5px 0 0" }}>
                    Expect your free sample within 48 hours.
                  </p>
                </div>
              </div>

              <div style={{
                marginTop: "40px",
                padding: "22px",
                background: "#EAF0FF",
                borderRadius: "14px",
                borderLeft: `4px solid ${green}`,
              }}>
                <p style={{
                  color: blue,
                  fontWeight: 600,
                  fontSize: "15px",
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  "Let's turn your business challenges into opportunities."
                </p>
              </div>
            </div>

            {/* FORM CARD */}
            <div style={{
              background: "#FFFFFF",
              border: "1px solid #E5EAF3",
              borderRadius: "20px",
              padding: "clamp(22px, 4vw, 38px)",
              boxShadow: "0 15px 45px rgba(0,31,118,0.08)",
            }}>
              {success ? (
                <div style={{
                  textAlign: "center",
                  padding: "55px 10px",
                }}>
                  <div style={{
                    width: "70px",
                    height: "70px",
                    background: "#E8F7E9",
                    color: green,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    fontSize: "32px",
                    margin: "0 auto 22px",
                  }}>✓</div>

                  <h3 style={{
                    color: blue,
                    fontSize: "26px",
                    marginBottom: "12px",
                  }}>
                    Thank You!
                  </h3>

                  <p style={{
                    color: "#64748B",
                    lineHeight: 1.7,
                  }}>
                    Your request has been received.
                    Our team will get back to you soon.
                  </p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: "28px" }}>
                    <h3 style={{
                      color: blue,
                      fontSize: "26px",
                      fontWeight: 800,
                      margin: "0 0 9px",
                    }}>
                      Request Your Free Sample
                    </h3>
                    <p style={{
                      color: "#64748B",
                      fontSize: "14px",
                      margin: 0,
                      lineHeight: 1.6,
                    }}>
                      Fill in the details below and we'll take it from there.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="honeypot"
                      value={form.honeypot}
                      onChange={e => setForm({ ...form, honeypot: e.target.value })}
                      style={{ display: "none" }}
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div style={{ marginBottom: "20px" }}>
                      <label style={label}>Your Name *</label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                        style={field}
                      />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={label}>Work Email *</label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                        style={field}
                      />
                    </div>

                    <div style={{ marginBottom: "20px" }}>
                      <label style={label}>Interested Service *</label>
                      <select
                        value={form.service}
                        onChange={e => setForm({ ...form, service: e.target.value })}
                        required
                        style={{
                          ...field,
                          cursor: "pointer",
                          color: form.service ? "#14213D" : "#94A3B8",
                        }}
                      >
                        <option value="">Choose a service</option>
                        {services.map(s => (
                          <option key={s.id} value={s.title}>
                            {s.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div style={{ marginBottom: "23px" }}>
                      <label style={label}>
                        Tell Us About Your Project
                        <span style={{
                          color: "#94A3B8",
                          fontWeight: 400,
                        }}> (Optional)</span>
                      </label>
                      <textarea
                        placeholder="Describe your requirements or goals..."
                        value={form.context}
                        onChange={e => setForm({ ...form, context: e.target.value })}
                        rows={5}
                        style={{
                          ...field,
                          resize: "vertical",
                          minHeight: "120px",
                        }}
                      />
                    </div>

                    {error && (
                      <p style={{
                        color: "#DC2626",
                        fontSize: "14px",
                        background: "#FEF2F2",
                        padding: "12px",
                        borderRadius: "9px",
                        marginBottom: "18px",
                      }}>
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        width: "100%",
                        padding: "16px",
                        background: loading ? "#94A3B8" : green,
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "16px",
                        fontWeight: 700,
                        cursor: loading ? "not-allowed" : "pointer",
                        boxShadow: "0 7px 18px rgba(14,171,20,0.18)",
                      }}
                    >
                      {loading ? "Sending Request..." : "Submit Your Request →"}
                    </button>

                    <p style={{
                      color: "#94A3B8",
                      fontSize: "12px",
                      textAlign: "center",
                      marginTop: "16px",
                    }}>
                      No spam. No commitment. Just useful work.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
