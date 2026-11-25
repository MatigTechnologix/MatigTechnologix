"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CTA, Footer, SocialBar } from "../../components/site";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
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

const packages = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#39e7a4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Full Growth Engine",
    sub: "Find, understand, and engage your ideal customers.",
    items: ["Lead Generation", "B2B Prospect Research", "LinkedIn Outreach"],
    ideal: "Startups & Growing Businesses",
    color: "#39e7a4",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7474ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Dev & QA Partnership",
    sub: "Build reliable software, launch with confidence.",
    items: ["Web Development", "QA Testing (Manual + Automation)", "API Testing (Postman)"],
    ideal: "Product Teams & Tech Companies",
    color: "#7474ff",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/>
        <line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/>
      </svg>
    ),
    title: "Intelligence-Led Outreach",
    sub: "Reach the right decision-makers.",
    items: ["Prospect Research", "LinkedIn Outreach", "Targeted Lead Lists"],
    ideal: "B2B Sales & Agencies",
    color: "#a855f7",
  },
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
        <section className="hero grid-bg" style={{position:"relative",backgroundImage:`url('https://res.cloudinary.com/folpmq9g/image/upload/v1795272062/1766650508731.jpg')`,backgroundSize:"cover",backgroundPosition:"center"}}>
          <div style={{position:"absolute",inset:0,background:"rgba(7,16,31,0.78)",zIndex:0}} />
          <div className="orb one" />
          <SocialBar />
          <div className="orb two" />
          <div className="circuit"><i className="dot" /></div>
          <div className="shell hero-copy" style={{position:"relative",zIndex:1}}>
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

        {/* Packages Section - New Year Campaign */}
        <section id="packages" style={{ background: "rgba(7,16,31,0.6)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(90deg,#39e7a4,#7474ff,#a855f7)", padding: "10px", textAlign: "center" }}>
            <span style={{ color: "#fff", fontSize: ".82rem", fontWeight: 700, letterSpacing: ".08em" }}>
              🎉 NEW YEAR OFFER — FREE SAMPLE WITH EVERY PACKAGE · LIMITED SPOTS
            </span>
          </div>
          <div className="shell" style={{ paddingTop: "60px", paddingBottom: "60px" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span className="eyebrow">New Year 2025 Campaign</span>
              <h2 style={{ fontSize: "clamp(2rem,4vw,3.4rem)", letterSpacing: "-.06em", margin: "12px 0 12px" }}>
                Our 3 <em style={{ fontStyle: "normal", color: "var(--emerald)" }}>Powerful</em> Service Packages
              </h2>
              <p style={{ color: "var(--muted)", fontSize: ".95rem" }}>Choose the right solution to achieve your business goals.</p>
            </div>
            <div className="cards">
              {packages.map((pkg) => (
                <div key={pkg.title} className="card" style={{ display: "flex", flexDirection: "column", gap: "14px", minHeight: "320px", borderColor: `${pkg.color}33` }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${pkg.color}22`, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${pkg.color}44` }}>
                    {pkg.icon}
                  </div>
                  <h3 style={{ margin: 0, fontSize: "1.15rem", letterSpacing: "-.04em" }}>{pkg.title}</h3>
                  <p style={{ margin: 0, color: "var(--muted)", fontSize: ".84rem", lineHeight: 1.6 }}>{pkg.sub}</p>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "7px" }}>
                    {pkg.items.map(item => (
                      <li key={item} style={{ fontSize: ".84rem", color: "var(--text)", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "var(--emerald)", fontSize: ".8rem" }}>✓</span> {item}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginTop: "auto", paddingTop: "14px", borderTop: "1px solid var(--line)" }}>
                    <span style={{ fontSize: ".72rem", color: pkg.color, fontFamily: "DM Mono", letterSpacing: ".08em" }}>IDEAL FOR: </span>
                    <span style={{ fontSize: ".8rem", color: "var(--muted)" }}>{pkg.ideal}</span>
                  </div>
                  <div style={{ background: `${pkg.color}11`, border: `1px dashed ${pkg.color}44`, borderRadius: "6px", padding: "8px 12px", textAlign: "center" }}>
                    <span style={{ fontSize: ".75rem", color: pkg.color, fontWeight: 700 }}>🎁 FREE sample included this January</span>
                  </div>
                  <Link href={`/contact?service=${encodeURIComponent(pkg.title)}`} className="btn primary" style={{ textAlign: "center", marginTop: "4px", background: pkg.color, color: "#0a0f1a" }}>
                    Get Started →
                  </Link>
                </div>
              ))}
            </div>
            <p style={{ textAlign: "center", color: "var(--muted)", fontSize: ".78rem", marginTop: "28px" }}>
              No commitment. No spam. Just useful work delivered fast.
            </p>
          </div>
        </section>
      
        {/* Stats Section */}
<section style={{background:"rgba(7,16,31,0.4)",borderTop:"1px solid var(--line)",borderBottom:"1px solid var(--line)"}}>
  <div className="shell" style={{padding:"60px 0",textAlign:"center"}}>
    <span className="eyebrow">Our Success</span>
    <h2 style={{marginBottom:"8px"}}>Here are some snapshots of our success over the years.</h2>
    <div style={{display:"flex",justifyContent:"center",gap:"48px",marginTop:"48px",flexWrap:"wrap"}}>
      {[
        {num:"$60K+",label:"Upwork Earned"},
        {num:"7,172+",label:"Hours Logged"},
        {num:"202+",label:"Total Jobs"},
        {num:"100%",label:"Job Success"},
      ].map(({num,label})=>(
        <div key={label} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"12px"}}>
          <div style={{width:120,height:120,borderRadius:"50%",border:"3px solid var(--emerald)",display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(57,231,164,0.06)",boxShadow:"0 0 24px rgba(57,231,164,0.15)",transition:"all .3s",cursor:"default"}}
            onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.background="rgba(57,231,164,0.18)";el.style.transform="scale(1.08)";el.style.boxShadow="0 0 40px rgba(57,231,164,0.35)"}}
            onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.background="rgba(57,231,164,0.06)";el.style.transform="scale(1)";el.style.boxShadow="0 0 24px rgba(57,231,164,0.15)"}}>
            <span style={{fontSize:"1.4rem",fontWeight:800,color:"var(--text)",letterSpacing:"-.04em"}}>{num}</span>
          </div>
          <span style={{fontSize:".85rem",color:"var(--muted)",fontWeight:500}}>{label}</span>
        </div>
      ))}
    </div>
  </div>
</section>
{/* About Section */}
<section id="about" style={{borderTop:"1px solid var(--line)"}}>
  <div className="shell" style={{padding:"80px 0"}}>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"60px",alignItems:"center"}}>
      
      {/* Left - Image */}
      <div style={{position:"relative"}}>
        <div style={{position:"absolute",top:-16,left:-16,width:"100%",height:"100%",border:"2px solid var(--emerald)",borderRadius:"12px",opacity:0.3,zIndex:0}} />
        <img
          src="https://res.cloudinary.com/folpmq9g/image/upload/v1795272062/1766650508731.jpg"
          alt="MATIG Team"
          style={{width:"100%",borderRadius:"12px",objectFit:"cover",maxHeight:"420px",position:"relative",zIndex:1}}
        />
      </div>

      {/* Right - Text */}
      <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
        <span className="eyebrow">Know About Us</span>
        <h2 style={{fontSize:"clamp(1.8rem,3vw,2.8rem)",letterSpacing:"-.04em",margin:0}}>
          About <em style={{fontStyle:"normal",color:"var(--emerald)"}}>MATIG Technologix</em>
        </h2>
        <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:".95rem"}}>
          MATIG Technologix is leading and evolving the way B2B organizations connect with their ideal customers.
        </p>
        <p style={{color:"var(--muted)",lineHeight:1.8,fontSize:".95rem"}}>
          Founded in 2020, we have delivered sharp research, intentional outreach, and reliable technology to clients across USA, UK, Australia and beyond. Our team combines human expertise with smart processes to build B2B pipelines worth having.
        </p>
        <div style={{marginTop:"8px",paddingTop:"16px",borderTop:"1px solid var(--line)"}}>
          <p style={{fontFamily:"Georgia,serif",fontSize:"1.4rem",color:"var(--emerald)",margin:0,fontStyle:"italic"}}>Hafiz Tajwer Kamran</p>
          <p style={{color:"var(--muted)",fontSize:".82rem",margin:"4px 0 0"}}>CEO @ MATIG Technologix</p>
        </div>
        <Link href="/team" className="btn secondary" style={{marginTop:"8px",alignSelf:"flex-start"}}>Meet the Team →</Link>
      </div>
    </div>
  </div>
</section>
{/* Services Split Section */}
<section id="home-services" style={{background:"#f8fafc",borderTop:"1px solid #e2e8f0"}}>
  <div className="shell" style={{padding:"80px 0"}}>
    <div className="services-layout" style={{display:"grid",gridTemplateColumns:"1fr 1.6fr",gap:"60px",alignItems:"start"}}>
      <div className="services-intro" style={{display:"flex",flexDirection:"column",gap:"16px",position:"sticky",top:"100px"}}>
        <span style={{fontSize:".78rem",color:"#64748b",letterSpacing:".1em",textTransform:"uppercase" as any,fontWeight:600}}>What We're Offering</span>
        <div style={{width:"40px",height:"3px",background:"var(--emerald)",borderRadius:"2px"}} />
        <h2 style={{fontSize:"clamp(1.8rem,3vw,2.6rem)",letterSpacing:"-.04em",margin:0,color:"#0f172a"}}>Services We're Providing</h2>
        <p style={{color:"#64748b",lineHeight:1.8,fontSize:".92rem"}}>We bring you targeted B2B lead generation, LinkedIn outreach, and reliable web solutions rooted in our expertise and deep knowledge of customer behavior.</p>
        <Link href="/services" className="btn primary" style={{alignSelf:"flex-start",marginTop:"8px"}}>View All Services →</Link>
      </div>
      <div className="services-cards" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}}>
        {services.slice(0,4).map((item:any)=>(
          <div key={item.id} style={{background:"#fff",border:"1px solid #e2e8f0",borderRadius:"12px",padding:"28px",display:"flex",flexDirection:"column",gap:"14px",transition:"all .25s",cursor:"default"}}
            onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="#06b6d4";el.style.boxShadow="0 4px 20px rgba(6,182,212,0.12)"}}
            onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.borderColor="#e2e8f0";el.style.boxShadow="none"}}>
            <div>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <h3 style={{margin:0,fontSize:"1.05rem",letterSpacing:"-.03em",color:"#0f172a",fontWeight:700}}>{item.title}</h3>
            <p style={{margin:0,color:"#64748b",fontSize:".83rem",lineHeight:1.7}}>{item.detail||item.description||""}</p>
          </div>
        ))}
      </div>
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
       {/* Testimonials Section */}
<section style={{background:"#f8fafc",borderTop:"1px solid #e2e8f0",borderBottom:"1px solid #e2e8f0"}}>
  <div className="shell" style={{padding:"80px 0"}}>
    <div style={{textAlign:"center",marginBottom:"56px"}}>
      <span style={{fontSize:".78rem",color:"#06b6d4",letterSpacing:".1em",textTransform:"uppercase" as any,fontWeight:600}}>Our Client Feedbacks</span>
      <div style={{width:"40px",height:"3px",background:"#06b6d4",borderRadius:"2px",margin:"10px auto"}} />
      <h2 style={{color:"#0f172a",margin:"12px 0 0",fontSize:"clamp(1.8rem,3vw,2.4rem)"}}>What Our Customers Say!</h2>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"24px"}}>
      {[
        {name:"Alan Somerfield",company:"Apex Ideas Ltd",message:"Great work identifying UK mechanical products and manufacturers. Very thorough research, accurate data, and delivered on time. Highly recommended!",rating:5},
        {name:"Alex Hall",company:"Upwork Client",message:"Completed the email scraping task efficiently and accurately. Fast turnaround, great communication throughout the project. Will work again.",rating:5},
        {name:"Andrea Nguyen",company:"Koi Studios",message:"Excellent lead generation for our design agency. High quality prospect lists tailored to our exact ICP. Very professional team.",rating:5},
        {name:"Andreas Larsen",company:"Lead Media",message:"Solid lead generation listbuilding work. Delivered exactly what was needed. Great communication and fast delivery.",rating:5},
        {name:"Azhar Siddiqui",company:"RepStack",message:"Amazing working with the team for over a year. The whole company is such a great place to work with. I highly recommend these guys!",rating:5},
        {name:"Chris Zawitus",company:"Upwork Client",message:"Company qualification and personalisation research done perfectly. Very detailed and accurate results.",rating:5},
      ].map(({name,company,message,rating})=>(
        <div key={name} style={{background:"#fff",borderRadius:"16px",padding:"32px",boxShadow:"0 2px 16px rgba(0,0,0,0.06)",border:"1px solid #e2e8f0",display:"flex",flexDirection:"column",gap:"16px",transition:"all .25s",cursor:"default"}}
          onMouseEnter={e=>{const el=e.currentTarget as HTMLElement;el.style.boxShadow="0 8px 32px rgba(6,182,212,0.15)";el.style.borderColor="#06b6d4";el.style.transform="translateY(-4px)"}}
          onMouseLeave={e=>{const el=e.currentTarget as HTMLElement;el.style.boxShadow="0 2px 16px rgba(0,0,0,0.06)";el.style.borderColor="#e2e8f0";el.style.transform="translateY(0)"}}>
          {/* Quote icon */}
          <div style={{width:40,height:40,borderRadius:"50%",background:"rgba(6,182,212,0.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#06b6d4"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
          </div>
          {/* Stars */}
          <div style={{color:"#f59e0b",fontSize:"1rem",letterSpacing:"2px"}}>{"★".repeat(rating)}</div>
          {/* Review */}
          <p style={{color:"#475569",fontSize:".88rem",lineHeight:1.8,margin:0,flex:1}}>{message}</p>
          {/* Author */}
          <div style={{paddingTop:"16px",borderTop:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{width:42,height:42,borderRadius:"50%",background:"linear-gradient(135deg,#06b6d4,#39e7a4)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#fff",fontSize:".95rem",flexShrink:0}}>
              {name.charAt(0)}
            </div>
            <div>
              <p style={{margin:0,fontWeight:700,fontSize:".88rem",color:"#0f172a"}}>{name}</p>
              <p style={{margin:"2px 0 0",fontSize:".76rem",color:"#64748b"}}>{company}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div style={{textAlign:"center",marginTop:"40px"}}>
      <Link href="/testimonials" className="btn secondary">View All Reviews →</Link>
    </div>
  </div>
</section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}