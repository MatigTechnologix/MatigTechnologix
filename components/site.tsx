"use client";
import React, { useState } from "react";
import Link from "next/link";

export function Nav(){
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <nav className="nav shell" aria-label="Main navigation" style={{position:"sticky",top:0,zIndex:100,background:"rgba(7,16,31,.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid var(--line)"}}>
        <Link href="/" className="brand" onClick={()=>setOpen(false)}>
          <img src="https://res.cloudinary.com/folpmq9g/image/upload/v1790393882/ChatGPT_Image_Sep_26_2026_08_30_38_AM.png" alt="MATIG" style={{height:"38px",objectFit:"contain"}} />
        </Link>
        <div className="links">
          <Link href="/services">Services</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/work">Our work</Link>
          <Link href="/about">About</Link>
          <Link href="/resources">Insights</Link>
        </div>
        <Link href="/contact" className="btn primary hide-mobile">Get a Free Sample <span>↗</span></Link>
        <span className="mobile" onClick={()=>setOpen(!open)} style={{cursor:"pointer",fontSize:"1.5rem",userSelect:"none" as any}}>{open ? "✕" : "☰"}</span>
      </nav>
      {open && (
        <div style={{position:"fixed",top:"76px",left:0,right:0,bottom:0,background:"rgba(7,16,31,.98)",zIndex:99,display:"flex",flexDirection:"column",padding:"2rem",gap:"1.25rem",overflowY:"auto"}}>
          {[["Services","/services"],["Industries","/industries"],["Our work","/work"],["About","/about"],["Insights","/resources"],["Contact","/contact"]].map(([label,href])=>(
            <Link key={href} href={href} onClick={()=>setOpen(false)} style={{color:"#fff",fontSize:"1.1rem",fontWeight:600,textDecoration:"none",padding:"0.75rem 0",borderBottom:"1px solid rgba(255,255,255,0.08)"}}>{label}</Link>
          ))}
          <Link href="/contact" className="btn primary" onClick={()=>setOpen(false)} style={{marginTop:"1rem",textAlign:"center" as any}}>Get a Free Sample ↗</Link>
        </div>
      )}
    </>
  );
}

export function Footer(){
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const data = await res.json();
    if (res.ok) { setMsg("✅ Subscribed!"); setEmail(""); } else setMsg(data.error || "Error");
  };
  return (
    <footer className="footer">
      <div className="shell foot-grid">
        <div>
          <Link href="/" className="brand"><img src="https://res.cloudinary.com/folpmq9g/image/upload/v1790393882/ChatGPT_Image_Sep_26_2026_08_30_38_AM.png" alt="MATIG" style={{height:"34px",objectFit:"contain"}} /></Link>
          <p style={{color:"var(--muted)",fontSize:".84rem",lineHeight:1.7,maxWidth:260}}>The human-powered growth partner for B2B teams ready to build momentum.</p>
          <form onSubmit={subscribe} style={{marginTop:"1rem",display:"flex",gap:"0.5rem",flexWrap:"wrap"}}>
            <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email" style={{padding:"0.5rem 0.75rem",borderRadius:"0.4rem",border:"1px solid #333",background:"#111",color:"#fff",fontSize:"0.85rem",flex:1,minWidth:160}}/>
            <button type="submit" style={{padding:"0.5rem 1rem",background:"#00f5a0",color:"#0a0f1a",border:"none",borderRadius:"0.4rem",fontWeight:600,cursor:"pointer",fontSize:"0.85rem"}}>Subscribe</button>
          </form>
          {msg && <p style={{color:"#00f5a0",fontSize:"0.8rem",marginTop:"0.5rem"}}>{msg}</p>}
        </div>
        <div><h4>Services</h4><Link href="/services">Lead generation</Link><Link href="/services">LinkedIn outreach</Link><Link href="/services">Web development</Link></div>
        <div><h4>Company</h4><Link href="/about">About MATIG</Link><Link href="/case-studies">Case Studies</Link><Link href="/team">Our Team</Link><Link href="/testimonials">Testimonials</Link><Link href="/blog">Blog</Link><Link href="/contact">Contact</Link></div>
        <div><h4>Connect</h4><a href="mailto:hello@matigtechnologix.online">hello@matigtechnologix.online</a><Link href="/resources">Resources</Link></div>
      </div>
      <div className="shell copyright"><span>© 2026 MATIG Technologix. All rights reserved.</span><span>Built for meaningful growth.</span></div>
    </footer>
  );
}

export function PageHero({eyebrow,title,copy}:{eyebrow:string,title:string,copy?:string}){return <header className="page-hero grid-bg"><div className="orb one"/><div className="shell" style={{position:"relative"}}><span className="eyebrow">{eyebrow}</span><h1>{title}</h1>{copy&&<p>{copy}</p>}</div></header>}
export function CTA(){return <section className="cta"><div className="shell cta-inner"><div><span className="eyebrow" style={{color:"#a2ffe1"}}>Start with proof</span><h2>See what thoughtful outreach can do for your pipeline.</h2></div><Link className="btn primary" href="/contact">Get a Free Sample ↗</Link></div></section>}
export function Layout({children}:{children:React.ReactNode}){return <>{children}<Footer/></>}
