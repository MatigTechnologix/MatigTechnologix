import Link from "next/link";

export const services = [
  ["Lead Generation", "Targeted prospect lists designed around your exact ICP.", "lead-generation"],
  ["LinkedIn Outreach", "Thoughtful conversations that earn qualified replies.", "linkedin-outreach"],
  ["B2B Prospect Research", "Decision-maker intelligence your sales team can trust.", "prospect-research"],
  ["Digital Marketing", "Campaigns built to generate attention and action.", "digital-marketing"],
  ["Branding & Design", "Distinct visual systems for credible B2B brands.", "branding-design"],
  ["Website Development", "Fast, considered sites engineered to convert.", "website-development"],
];

export function Nav(){return <nav className="nav shell" aria-label="Main navigation"><Link href="/" className="brand"><i/>MATIG</Link><div className="links"><Link href="/services">Services</Link><Link href="/industries">Industries</Link><Link href="/work">Our work</Link><Link href="/about">About</Link><Link href="/resources">Insights</Link></div><Link href="/contact" className="btn primary">Get a Free Sample <span>↗</span></Link><span className="mobile" aria-hidden>☰</span></nav>}
export function Footer(){return <footer className="footer"><div className="shell foot-grid"><div><Link href="/" className="brand"><i/>MATIG</Link><p style={{color:"var(--muted)",fontSize:".84rem",lineHeight:1.7,maxWidth:260}}>The human-powered growth partner for B2B teams ready to build momentum.</p></div><div><h4>Services</h4><Link href="/services">Lead generation</Link><Link href="/services">LinkedIn outreach</Link><Link href="/services">Web development</Link></div><div><h4>Company</h4><Link href="/about">About MATIG</Link><Link href="/work">Case studies</Link><Link href="/contact">Contact</Link></div><div><h4>Connect</h4><a href="mailto:hello@matig.com">hello@matig.com</a><Link href="/resources">Resources</Link></div></div><div className="shell copyright"><span>© 2026 MATIG Technologix. All rights reserved.</span><span>Built for meaningful growth.</span></div></footer>}
export function PageHero({eyebrow,title,copy}:{eyebrow:string,title:string,copy:string}){return <><Nav/><header className="page-hero grid-bg"><div className="orb one"/><div className="shell" style={{position:"relative"}}><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div></header></>}
export function CTA(){return <section className="cta"><div className="shell cta-inner"><div><span className="eyebrow" style={{color:"#a2ffe1"}}>Start with proof</span><h2>See what thoughtful outreach can do for your pipeline.</h2></div><Link className="btn primary" href="/contact">Get a Free Sample ↗</Link></div></section>}
export function Layout({children}:{children:React.ReactNode}){return <>{children}<Footer/></>}
