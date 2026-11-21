"use client";

export default function TestimonialCards({items}:{items:any[]}) {
  if(!items.length) return <p style={{color:"#888",textAlign:"center"}}>No testimonials yet.</p>;
  return (
    <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:"24px"}}>
      {items.map((item:any)=>(
        <div key={item.id}
          style={{background:"#fff",borderRadius:"16px",padding:"32px",boxShadow:"0 2px 16px rgba(0,0,0,0.06)",border:"1px solid #e2e8f0",display:"flex",flexDirection:"column",gap:"16px",transition:"all .25s"}}
          onMouseEnter={e=>{const el=e.currentTarget;el.style.boxShadow="0 8px 32px rgba(6,182,212,0.15)";el.style.borderColor="#06b6d4";el.style.transform="translateY(-4px)"}}
          onMouseLeave={e=>{const el=e.currentTarget;el.style.boxShadow="0 2px 16px rgba(0,0,0,0.06)";el.style.borderColor="#e2e8f0";el.style.transform="translateY(0)"}}>
          <div style={{width:40,height:40,borderRadius:"50%",background:"rgba(6,182,212,0.1)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#06b6d4"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1zm12 0c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/></svg>
          </div>
          <div style={{color:"#f59e0b",fontSize:"1rem",letterSpacing:"2px"}}>{"★".repeat(item.rating||5)}</div>
          <p style={{color:"#475569",fontSize:".88rem",lineHeight:1.8,margin:0,flex:1}}>"{item.message}"</p>
          <div style={{paddingTop:"16px",borderTop:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:"12px"}}>
            <div style={{width:42,height:42,borderRadius:"50%",background:"linear-gradient(135deg,#06b6d4,#39e7a4)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,color:"#fff",fontSize:".95rem",flexShrink:0}}>
              {item.name?.charAt(0)}
            </div>
            <div>
              <p style={{margin:0,fontWeight:700,fontSize:".88rem",color:"#0f172a"}}>{item.name}</p>
              <p style={{margin:"2px 0 0",fontSize:".76rem",color:"#64748b"}}>{item.company}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
