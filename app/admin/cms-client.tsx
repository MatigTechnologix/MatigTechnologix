"use client";

import Link from "next/link";
import { ChangeEvent, FormEvent, useEffect, useMemo, useRef, useState } from "react";

type RecordItem = { id: string; title: string; detail: string; status: string; updated: string };
type Store = Record<string, RecordItem[]>;
type Module = { name: string; description: string; fields: [string, string, string] };

const modules: Module[] = [
  { name: "Dashboard", description: "A live overview of your CMS.", fields: ["", "", ""] },
  { name: "Homepage", description: "Manage the messaging and calls to action on your homepage.", fields: ["Section", "Copy", "Published"] },
  { name: "About", description: "Keep your company story and values current.", fields: ["Section", "Copy", "Published"] },
  { name: "Services", description: "Maintain the services shown on the website.", fields: ["Service", "Description", "Published"] },
  { name: "Portfolio", description: "Organise portfolio work and project highlights.", fields: ["Project", "Summary", "Published"] },
  { name: "Case Studies", description: "Publish client results and case studies.", fields: ["Case study", "Result", "Published"] },
  { name: "Team", description: "Manage team profiles displayed on the website.", fields: ["Name", "Role", "Published"] },
  { name: "Testimonials", description: "Curate proof from clients and partners.", fields: ["Client", "Quote", "Published"] },
  { name: "Client Logos", description: "Manage client and partner logos.", fields: ["Client", "Logo URL", "Published"] },
  { name: "Blog", description: "Draft, schedule, and publish articles.", fields: ["Article title", "Excerpt", "Draft"] },
  { name: "Media Library", description: "Track website media and image assets.", fields: ["Asset name", "Asset URL", "Available"] },
  { name: "SEO", description: "Set page metadata and search visibility.", fields: ["Page", "Meta description", "Optimised"] },
  { name: "Settings", description: "Manage global brand and contact settings.", fields: ["Setting", "Value", "Active"] },
  { name: "Contact Messages", description: "Review messages received from your contact form.", fields: ["Sender", "Message", "New"] },
  { name: "Newsletter Subscribers", description: "Maintain your newsletter audience.", fields: ["Email", "Source", "Subscribed"] },
];

const starter: Store = {
  Homepage: [{ id: "home-1", title: "More signal. Less chasing.", detail: "MATIG brings sharp research, intentional outreach, and great digital craft together to create B2B opportunities worth having.", status: "Published", updated: "Today" }],
  About: [{ id: "about-1", title: "Growth is a people problem.", detail: "MATIG is a technology-enabled service agency for B2B teams.", status: "Published", updated: "Today" }],
  Services: [
    { id: "s-1", title: "Lead Generation", detail: "Targeted prospect lists designed around your exact ICP.", status: "Published", updated: "Today" },
    { id: "s-2", title: "LinkedIn Outreach", detail: "Thoughtful conversations that earn qualified replies.", status: "Published", updated: "Today" },
  ],
  Portfolio: [], "Case Studies": [], Team: [], Testimonials: [], "Client Logos": [], Blog: [],
  "Media Library": [],
  SEO: [{ id: "seo-1", title: "Homepage", detail: "Precision outreach, research and digital services for ambitious B2B teams.", status: "Optimised", updated: "Today" }],
  Settings: [{ id: "set-1", title: "Contact email", detail: "hello@matig.com", status: "Active", updated: "Today" }],
  "Contact Messages": [],
  "Newsletter Subscribers": [],
};

const storageKey = "matig-cms-lite-v1";
const cloneStarter = (): Store => JSON.parse(JSON.stringify(starter));
const dateLabel = () => new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(new Date());

const makeId = (name: string) => `${name.toLowerCase().replace(/\s/g, "-")}-${Date.now()}`;

export default function CmsClient() {
  const [active, setActive] = useState("Dashboard");
  const [store, setStore] = useState<Store>(starter);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<RecordItem | null>(null);
  const [notice, setNotice] = useState("");
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (saved) { try { setStore(JSON.parse(saved)); } catch { window.localStorage.removeItem(storageKey); } }
  }, []);

  useEffect(() => { if (ready) window.localStorage.setItem(storageKey, JSON.stringify(store)); }, [store]);
  const [ready, setReady] = useState(false);
  useEffect(() => { setReady(true); }, []);

  useEffect(() => {
    if (!notice) return;
    const t = window.setTimeout(() => setNotice(""), 2600);
    return () => window.clearTimeout(t);
  }, [notice]);

  const module = modules.find((m) => m.name === active)!;
  const records = store[active] || [];
  const filtered = useMemo(() => records.filter((r) => `${r.title} ${r.detail} ${r.status}`.toLowerCase().includes(query.toLowerCase())), [records, query]);
  const contentModules = modules.filter((m) => m.name !== "Dashboard").map((m) => m.name);
  const totalItems = contentModules.reduce((t, n) => t + (store[n]?.length || 0), 0);
  const published = contentModules.reduce((t, n) => t + (store[n] || []).filter((r) => ["Published", "Optimised", "Available", "Active", "Subscribed"].includes(r.status)).length, 0);

  function saveRecord(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const record: RecordItem = {
      id: editing?.id || makeId(active),
      title: String(values.get("title") || "").trim(),
      detail: String(values.get("detail") || "").trim(),
      status: String(values.get("status") || "Draft"),
      updated: dateLabel(),
    };
    if (!record.title || !record.detail) return;
    setStore((c) => ({ ...c, [active]: editing?.id ? (c[active] || []).map((r) => r.id === record.id ? record : r) : [record, ...(c[active] || [])] }));
    setEditing(null);
    setNotice(editing?.id ? "Record updated" : "Record added");
  }

  function removeRecord(id: string) {
    if (!window.confirm("Delete this record?")) return;
    setStore((c) => ({ ...c, [active]: (c[active] || []).filter((r) => r.id !== id) }));
    setNotice("Record deleted");
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(store, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "matig-cms-backup.json"; a.click();
    URL.revokeObjectURL(url);
    setNotice("CMS backup exported");
  }

  function importData(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        if (!data || typeof data !== "object") throw new Error();
        setStore({ ...cloneStarter(), ...data });
        setNotice("CMS backup imported");
      } catch { setNotice("That backup file could not be read"); }
    };
    reader.readAsText(file);
    event.target.value = "";
  }

  function resetData() {
    if (window.confirm("Reset all CMS content to the starter data?")) {
      setStore(cloneStarter());
      setNotice("CMS reset to starter data");
    }
  }

  return (
    <main className="dashboard cms-shell">
      <aside className="side cms-side">
        <Link href="/" className="brand"><i />MATIG</Link>
        <p className="eyebrow" style={{ marginTop: 42 }}>CMS Lite</p>
        <nav>
          {modules.map((m) => (
            <button type="button" key={m.name} className={active === m.name ? "cms-nav-active" : ""}
              onClick={() => { setActive(m.name); setQuery(""); setEditing(null); }}>
              {m.name}
            </button>
          ))}
        </nav>
        <Link href="/" className="cms-back">← Back to site</Link>
      </aside>
      <section className="dashmain cms-main">
        {notice && <div className="cms-notice" role="status">{notice}</div>}
        {active === "Dashboard" ? (
          <Dashboard totalItems={totalItems} published={published} messages={store["Contact Messages"]?.length || 0} subscribers={store["Newsletter Subscribers"]?.length || 0} onSelect={setActive} />
        ) : (
          <ModuleView module={module} records={filtered} query={query} setQuery={setQuery}
            onCreate={() => setEditing({ id: "", title: "", detail: "", status: module.fields[2], updated: "" })}
            onEdit={setEditing} onDelete={removeRecord} />
        )}
        {active !== "Dashboard" && editing && <Editor module={module} item={editing} onSave={saveRecord} onClose={() => setEditing(null)} />}
        {active === "Settings" && (
          <div className="cms-tools">
            <button type="button" className="btn secondary" onClick={exportData}>Export backup</button>
            <button type="button" className="btn secondary" onClick={() => importRef.current?.click()}>Import backup</button>
            <button type="button" className="cms-danger" onClick={resetData}>Reset CMS</button>
            <input ref={importRef} className="cms-file" type="file" accept="application/json" onChange={importData} />
          </div>
        )}
      </section>
    </main>
  );
}

function Dashboard({ totalItems, published, messages, subscribers, onSelect }: { totalItems: number; published: number; messages: number; subscribers: number; onSelect: (n: string) => void }) {
  return <>
    <span className="eyebrow">MATIG CMS LITE</span>
    <h1>Content dashboard.</h1>
    <p className="cms-intro">Everything is saved locally in this browser. Add content, update records, and export a backup whenever you need it.</p>
    <div className="metrics cms-metrics">
      <Metric label="CONTENT RECORDS" value={totalItems} />
      <Metric label="PUBLISHED / READY" value={published} />
      <Metric label="CONTACT MESSAGES" value={messages} />
      <Metric label="SUBSCRIBERS" value={subscribers} />
    </div>
    <div className="cms-panel">
      <div><span className="eyebrow">Quick actions</span><h2>Manage what matters.</h2></div>
      <div className="cms-quick">
        <button type="button" onClick={() => onSelect("Homepage")}>Edit homepage</button>
        <button type="button" onClick={() => onSelect("Blog")}>Create article</button>
        <button type="button" onClick={() => onSelect("Media Library")}>Manage media</button>
      </div>
    </div>
  </>;
}

function Metric({ label, value }: { label: string; value: number }) {
  return <div className="metric"><span>{label}</span><strong>{String(value).padStart(2, "0")}</strong></div>;
}

function ModuleView({ module, records, query, setQuery, onCreate, onEdit, onDelete }: { module: Module; records: RecordItem[]; query: string; setQuery: (v: string) => void; onCreate: () => void; onEdit: (r: RecordItem) => void; onDelete: (id: string) => void }) {
  return <>
    <span className="eyebrow">CMS MODULE</span>
    <div className="cms-heading">
      <div><h1>{module.name}.</h1><p className="cms-intro">{module.description}</p></div>
      <button type="button" className="btn primary" onClick={onCreate}>+ Add record</button>
    </div>
    <div className="cms-toolbar">
      <input aria-label="Search records" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={`Search ${module.name.toLowerCase()}`} />
      <span>{records.length} record{records.length === 1 ? "" : "s"}</span>
    </div>
    <div className="cms-records">
      {records.length ? records.map((r) => (
        <article className="cms-record" key={r.id}>
          <div><span className="tag">{r.status}</span><h2>{r.title}</h2><p>{r.detail}</p><small>Updated {r.updated}</small></div>
          <div className="cms-actions">
            <button type="button" onClick={() => onEdit(r)}>Edit</button>
            <button type="button" onClick={() => onDelete(r.id)}>Delete</button>
          </div>
        </article>
      )) : <div className="cms-empty"><h2>No records yet.</h2><p>Create your first record for this module.</p></div>}
    </div>
  </>;
}

function Editor({ module, item, onSave, onClose }: { module: Module; item: RecordItem; onSave: (e: FormEvent<HTMLFormElement>) => void; onClose: () => void }) {
  const isNew = !item.id;
  return (
    <div className="cms-overlay" role="dialog" aria-modal="true">
      <form className="cms-editor" onSubmit={onSave}>
        <div className="cms-editor-head">
          <div><span className="eyebrow">{module.name}</span><h2>{isNew ? "Add record" : "Edit record"}</h2></div>
          <button type="button" onClick={onClose}>×</button>
        </div>
        <label>{module.fields[0]}<input name="title" defaultValue={item.title} required autoFocus /></label>
        <label>{module.fields[1]}<textarea name="detail" defaultValue={item.detail} required /></label>
        <label>Status
          <select name="status" defaultValue={item.status || "Draft"}>
            <option>Draft</option><option>Published</option><option>Available</option>
            <option>Active</option><option>Optimised</option><option>New</option><option>Subscribed</option>
          </select>
        </label>
        <div className="cms-editor-actions">
          <button type="button" className="btn secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn primary">{isNew ? "Add record" : "Save changes"}</button>
        </div>
      </form>
    </div>
  );
}