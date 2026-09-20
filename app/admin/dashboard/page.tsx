"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SURL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SKEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const H = { apikey: SKEY, Authorization: `Bearer ${SKEY}`, "Content-Type": "application/json" };

const get = (t: string) => fetch(`${SURL}/rest/v1/${t}?order=createdAt.desc`, { headers: H }).then(r => r.json());
const ins = (t: string, b: object) => fetch(`${SURL}/rest/v1/${t}`, { method: "POST", headers: { ...H, Prefer: "return=minimal" }, body: JSON.stringify(b) });
const upd = (t: string, id: string, b: object) => fetch(`${SURL}/rest/v1/${t}?id=eq.${id}`, { method: "PATCH", headers: H, body: JSON.stringify({ ...b, updatedAt: new Date().toISOString() }) });
const del = (t: string, id: string) => fetch(`${SURL}/rest/v1/${t}?id=eq.${id}`, { method: "DELETE", headers: H });

const menu = [
  { id: "dashboard", label: "Dashboard" },
  { id: "messages", label: "Messages" },
  { id: "blog", label: "Blog" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "case-studies", label: "Case Studies" },
  { id: "team", label: "Team" },
  { id: "testimonials", label: "Testimonials" },
  { id: "newsletter", label: "Newsletter" },
  { id: "settings", label: "Settings" },
];

function Modal({ fields, form, setForm, onSave, onClose, editing }: any) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "1rem", padding: "2rem", width: "100%", maxWidth: "500px" }}>
        <h3 style={{ color: "#fff", marginBottom: "1.5rem" }}>{editing ? "Edit Record" : "Add New Record"}</h3>
        {fields.map(({ key, label, type = "text" }: any) => (
          <div key={key} style={{ marginBottom: "1rem" }}>
            <label style={{ color: "#c8d0dc", fontSize: "0.85rem", display: "block", marginBottom: "0.4rem" }}>{label}</label>
            {type === "textarea"
              ? <textarea rows={3} value={form[key] || ""} onChange={e => setForm((p: any) => ({ ...p, [key]: e.target.value }))}
                  style={{ width: "100%", padding: "0.75rem", background: "#0d1520", border: "1px solid #1e2d40", borderRadius: "0.5rem", color: "#fff", boxSizing: "border-box" }} />
              : <input type={type} value={form[key] || ""} onChange={e => setForm((p: any) => ({ ...p, [key]: e.target.value }))}
                  style={{ width: "100%", padding: "0.75rem", background: "#0d1520", border: "1px solid #1e2d40", borderRadius: "0.5rem", color: "#fff", boxSizing: "border-box" }} />
            }
          </div>
        ))}
        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
          <button onClick={onClose} style={{ flex: 1, padding: "0.75rem", background: "transparent", border: "1px solid #1e2d40", color: "#8892a4", borderRadius: "0.5rem", cursor: "pointer" }}>Cancel</button>
          <button onClick={onSave} style={{ flex: 1, padding: "0.75rem", background: "#00f5a0", border: "none", color: "#0a0f1a", borderRadius: "0.5rem", cursor: "pointer", fontWeight: "600" }}>Save</button>
        </div>
      </div>
    </div>
  );
}

function Table({ cols, rows, onEdit, onDelete }: any) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
        <thead>
          <tr>
            {cols.map((c: string) => <th key={c} style={{ textAlign: "left", padding: "0.75rem", color: "#8892a4", borderBottom: "1px solid #1e2d40", fontSize: "0.75rem" }}>{c.toUpperCase()}</th>)}
            <th style={{ padding: "0.75rem", borderBottom: "1px solid #1e2d40" }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0
            ? <tr><td colSpan={cols.length + 1} style={{ padding: "2rem", textAlign: "center", color: "#8892a4" }}>No records yet</td></tr>
            : rows.map((row: any) => (
              <tr key={row.id} style={{ borderBottom: "1px solid #1e2d40" }}>
                {cols.map((c: string) => <td key={c} style={{ padding: "0.75rem", color: "#fff", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{row[c] || "—"}</td>)}
                <td style={{ padding: "0.75rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {onEdit && <button onClick={() => onEdit(row)} style={{ background: "#1e2d40", border: "none", color: "#fff", padding: "0.3rem 0.75rem", borderRadius: "0.4rem", cursor: "pointer", fontSize: "0.8rem" }}>Edit</button>}
                    <button onClick={() => onDelete(row.id)} style={{ background: "rgba(255,107,107,0.1)", border: "none", color: "#ff6b6b", padding: "0.3rem 0.75rem", borderRadius: "0.4rem", cursor: "pointer", fontSize: "0.8rem" }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminDashboard() {
  const router = useRouter();
  const [active, setActive] = useState("dashboard");
  const [data, setData] = useState<Record<string, any[]>>({ messages: [], blog: [], services: [], portfolio: [], caseStudies: [], team: [], testimonials: [], newsletter: [] });
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>({});
  const [editing, setEditing] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("matig-admin")) router.push("/admin");
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    const [msgs, blogs, svcs, ports, cases, tm, testi, news] = await Promise.all([
      get("ContactMessage"), get("BlogPost"), get("Service"), get("Portfolio"),
      get("CaseStudy"), get("TeamMember"), get("Testimonial"), get("Newsletter"),
    ]);
    setData({
      messages: Array.isArray(msgs) ? msgs : [],
      blog: Array.isArray(blogs) ? blogs : [],
      services: Array.isArray(svcs) ? svcs : [],
      portfolio: Array.isArray(ports) ? ports : [],
      caseStudies: Array.isArray(cases) ? cases : [],
      team: Array.isArray(tm) ? tm : [],
      testimonials: Array.isArray(testi) ? testi : [],
      newsletter: Array.isArray(news) ? news : [],
    });
    setLoading(false);
  };

  const openAdd = () => { setEditing(null); setForm({}); setShowModal(true); };
  const openEdit = (item: any) => { setEditing(item); setForm({ ...item }); setShowModal(true); };
  const closeModal = () => { setShowModal(false); setEditing(null); setForm({}); };

  const save = async (table: string, body: object) => {
    if (editing?.id) {
      await upd(table, editing.id, body);
    } else {
      await ins(table, { ...body, id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    }
    closeModal();
    fetchAll();
  };

  const remove = async (table: string, id: string) => {
    if (!confirm("Delete?")) return;
    await del(table, id);
    fetchAll();
  };

  const slug = (t: string) => t?.toLowerCase().replace(/\s+/g, "-") || "";

  const Header = ({ title }: any) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
      <h2 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: "700", margin: 0 }}>{title}</h2>
      <button onClick={openAdd} style={{ background: "#00f5a0", border: "none", color: "#0a0f1a", padding: "0.6rem 1.2rem", borderRadius: "0.5rem", cursor: "pointer", fontWeight: "600" }}>+ Add New</button>
    </div>
  );

  const pages: Record<string, JSX.Element> = {
    dashboard: (
      <div>
        <p style={{ color: "#00f5a0", fontSize: "0.8rem", letterSpacing: "0.15em", marginBottom: "1rem" }}>MATIG CMS</p>
        <h1 style={{ color: "#fff", fontSize: "clamp(2rem,4vw,3rem)", fontWeight: "700", marginBottom: "1rem" }}>Content dashboard.</h1>
        <p style={{ color: "#8892a4", marginBottom: "2.5rem" }}>Everything connected to Supabase.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1rem" }}>
          {[
            { label: "CONTACT MESSAGES", value: data.messages.length },
            { label: "UNREAD", value: data.messages.filter((m: any) => !m.read).length },
            { label: "BLOG POSTS", value: data.blog.length },
            { label: "NEWSLETTER", value: data.newsletter.length },
            { label: "SERVICES", value: data.services.length },
            { label: "TEAM", value: data.team.length },
          ].map(s => (
            <div key={s.label} style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "1rem", padding: "1.5rem" }}>
              <p style={{ color: "#8892a4", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "0.75rem" }}>{s.label}</p>
              <p style={{ color: "#fff", fontSize: "2.5rem", fontWeight: "700", margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    ),

    messages: (
      <div>
        <h2 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: "700", marginBottom: "1.5rem" }}>Contact Messages</h2>
        {loading ? <p style={{ color: "#8892a4" }}>Loading...</p> :
          data.messages.map((m: any) => (
            <div key={m.id} style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "0.75rem", padding: "1.25rem", marginBottom: "1rem", borderLeft: m.read ? "3px solid #1e2d40" : "3px solid #00f5a0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "#fff", fontWeight: "600" }}>{m.name}</span>
                <span style={{ color: "#8892a4", fontSize: "0.8rem" }}>{new Date(m.createdAt).toLocaleDateString()}</span>
              </div>
              <div style={{ color: "#00f5a0", fontSize: "0.85rem", marginBottom: "0.5rem" }}>{m.email}</div>
              <div style={{ color: "#8892a4" }}>{m.message}</div>
            </div>
          ))}
      </div>
    ),

    blog: (
      <div>
        <Header title="Blog Posts" />
        <Table cols={["title", "status"]} rows={data.blog} onEdit={openEdit} onDelete={(id: string) => remove("BlogPost", id)} />
        {showModal && <Modal form={form} setForm={setForm} editing={editing} onClose={closeModal}
          fields={[{ key: "title", label: "Title" }, { key: "slug", label: "Slug" }, { key: "content", label: "Content", type: "textarea" }, { key: "status", label: "Status" }]}
          onSave={() => save("BlogPost", { title: form.title, slug: form.slug || slug(form.title), content: form.content, status: form.status || "Draft" })} />}
      </div>
    ),

    services: (
      <div>
        <Header title="Services" />
        <Table cols={["title", "status"]} rows={data.services} onEdit={openEdit} onDelete={(id: string) => remove("Service", id)} />
        {showModal && <Modal form={form} setForm={setForm} editing={editing} onClose={closeModal}
          fields={[{ key: "title", label: "Title" }, { key: "slug", label: "Slug" }, { key: "detail", label: "Detail", type: "textarea" }, { key: "status", label: "Status" }]}
          onSave={() => save("Service", { title: form.title, slug: form.slug || slug(form.title), detail: form.detail, status: form.status || "Published" })} />}
      </div>
    ),

    portfolio: (
      <div>
        <Header title="Portfolio" />
        <Table cols={["title", "status"]} rows={data.portfolio} onEdit={openEdit} onDelete={(id: string) => remove("Portfolio", id)} />
        {showModal && <Modal form={form} setForm={setForm} editing={editing} onClose={closeModal}
          fields={[{ key: "title", label: "Title" }, { key: "slug", label: "Slug" }, { key: "detail", label: "Detail", type: "textarea" }, { key: "status", label: "Status" }]}
          onSave={() => save("Portfolio", { title: form.title, slug: form.slug || slug(form.title), detail: form.detail, status: form.status || "Published" })} />}
      </div>
    ),

    "case-studies": (
      <div>
        <Header title="Case Studies" />
        <Table cols={["title", "status"]} rows={data.caseStudies} onEdit={openEdit} onDelete={(id: string) => remove("CaseStudy", id)} />
        {showModal && <Modal form={form} setForm={setForm} editing={editing} onClose={closeModal}
          fields={[{ key: "title", label: "Title" }, { key: "slug", label: "Slug" }, { key: "detail", label: "Detail", type: "textarea" }, { key: "status", label: "Status" }]}
          onSave={() => save("CaseStudy", { title: form.title, slug: form.slug || slug(form.title), detail: form.detail, status: form.status || "Published" })} />}
      </div>
    ),

    team: (
      <div>
        <Header title="Team Members" />
        <Table cols={["name", "role"]} rows={data.team} onEdit={openEdit} onDelete={(id: string) => remove("TeamMember", id)} />
        {showModal && <Modal form={form} setForm={setForm} editing={editing} onClose={closeModal}
          fields={[{ key: "name", label: "Name" }, { key: "role", label: "Role" }, { key: "bio", label: "Bio", type: "textarea" }, { key: "image", label: "Image URL" }]}
          onSave={() => save("TeamMember", { name: form.name, role: form.role, bio: form.bio, image: form.image })} />}
      </div>
    ),

    testimonials: (
      <div>
        <Header title="Testimonials" />
        <Table cols={["name", "company"]} rows={data.testimonials} onEdit={openEdit} onDelete={(id: string) => remove("Testimonial", id)} />
        {showModal && <Modal form={form} setForm={setForm} editing={editing} onClose={closeModal}
          fields={[{ key: "name", label: "Client Name" }, { key: "company", label: "Company" }, { key: "message", label: "Message", type: "textarea" }, { key: "rating", label: "Rating (1-5)" }]}
          onSave={() => save("Testimonial", { name: form.name, company: form.company, message: form.message, rating: parseInt(form.rating) || 5 })} />}
      </div>
    ),

    newsletter: (
      <div>
        <h2 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: "700", marginBottom: "1.5rem" }}>Newsletter Subscribers</h2>
        <Table cols={["email", "createdAt"]} rows={data.newsletter} onEdit={null} onDelete={(id: string) => remove("Newsletter", id)} />
      </div>
    ),

    settings: (
      <div>
        <h2 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: "700", marginBottom: "1.5rem" }}>Settings</h2>
        <div style={{ background: "#111827", border: "1px solid #1e2d40", borderRadius: "1rem", padding: "2rem" }}>
          <p style={{ color: "#8892a4" }}>Settings module coming soon.</p>
        </div>
      </div>
    ),
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#0a0f1a" }}>
      <div style={{ width: "220px", background: "#0d1520", borderRight: "1px solid #1e2d40", padding: "2rem 0", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "0 1.5rem", marginBottom: "2rem" }}>
          <div style={{ color: "#00f5a0", fontWeight: "700", fontSize: "1.1rem" }}>◆ MATIG</div>
        </div>
        <p style={{ color: "#8892a4", fontSize: "0.7rem", letterSpacing: "0.1em", padding: "0 1.5rem", marginBottom: "0.5rem" }}>CMS LITE</p>
        <nav style={{ flex: 1 }}>
          {menu.map(item => (
            <button key={item.id} onClick={() => { setActive(item.id); closeModal(); }} style={{
              display: "block", width: "100%", textAlign: "left", padding: "0.65rem 1.5rem",
              background: "transparent", border: "none",
              borderLeft: active === item.id ? "2px solid #00f5a0" : "2px solid transparent",
              color: active === item.id ? "#fff" : "#8892a4", fontSize: "0.9rem", cursor: "pointer",
            }}>{item.label}</button>
          ))}
        </nav>
        <div style={{ padding: "1rem 1.5rem" }}>
          <button onClick={() => { localStorage.removeItem("matig-admin"); router.push("/admin"); }}
            style={{ background: "transparent", border: "1px solid #1e2d40", color: "#8892a4", padding: "0.5rem 1rem", borderRadius: "0.5rem", cursor: "pointer", width: "100%", fontSize: "0.85rem" }}>
            Logout
          </button>
        </div>
      </div>
      <div style={{ flex: 1, padding: "2.5rem", overflowY: "auto" }}>
        {pages[active] || pages["dashboard"]}
      </div>
    </div>
  );
}