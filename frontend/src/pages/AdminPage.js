import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogOut, Package, Users, Mail, BarChart3, Pencil, Trash2 } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminPage() {
  const [token, setToken] = useState(localStorage.getItem("lh_admin_token") || "");
  const [isAuthed, setIsAuthed] = useState(false);
  useEffect(() => {
    if (token) { axios.get(`${API}/admin/stats`, { headers: { Authorization: `Bearer ${token}` } }).then(() => setIsAuthed(true)).catch(() => { setIsAuthed(false); setToken(""); localStorage.removeItem("lh_admin_token"); }); }
  }, [token]);
  if (!isAuthed) return <LoginForm onLogin={(t) => { setToken(t); localStorage.setItem("lh_admin_token", t); }} />;
  return <AdminDashboard token={token} onLogout={() => { setToken(""); setIsAuthed(false); localStorage.removeItem("lh_admin_token"); }} />;
}

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => { e.preventDefault(); setLoading(true); setError("");
    try { const res = await axios.post(`${API}/admin/login`, { email, password }); onLogin(res.data.token); } catch { setError("Invalid credentials"); } setLoading(false); };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF4E2] px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="w-full max-w-sm">
        <p className="text-[#D3AB80] uppercase tracking-[0.3em] text-xs mb-8 text-center">Atelier Access</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input data-testid="admin-email-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
            className="w-full bg-transparent border-b border-[#D3AB80] text-[#472825] focus:border-[#472825] focus:outline-none py-4 px-0 placeholder:text-[#D3AB80] transition-colors duration-300 text-sm tracking-wide" required />
          <input data-testid="admin-password-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"
            className="w-full bg-transparent border-b border-[#D3AB80] text-[#472825] focus:border-[#472825] focus:outline-none py-4 px-0 placeholder:text-[#D3AB80] transition-colors duration-300 text-sm tracking-wide" required />
          {error && <p data-testid="admin-login-error" className="text-[#96786F] text-xs tracking-wide">{error}</p>}
          <button data-testid="admin-login-btn" type="submit" disabled={loading}
            className="w-full bg-[#472825] text-[#FFF4E2] hover:bg-[#96786F] transition-colors duration-500 font-medium py-4 uppercase tracking-[0.2em] text-xs disabled:opacity-50">
            {loading ? "Authenticating..." : "Enter"}</button>
        </form>
      </motion.div>
    </div>
  );
}

function AdminDashboard({ token, onLogout }) {
  const [tab, setTab] = useState("overview"); const [stats, setStats] = useState(null); const [products, setProducts] = useState([]);
  const [waitlist, setWaitlist] = useState([]); const [newsletter, setNewsletter] = useState([]);
  const headers = { Authorization: `Bearer ${token}` };
  const fetchData = async () => { try {
    const [s, p, w, n] = await Promise.all([axios.get(`${API}/admin/stats`, { headers }), axios.get(`${API}/products`), axios.get(`${API}/waitlist`, { headers }), axios.get(`${API}/newsletter`, { headers })]);
    setStats(s.data); setProducts(p.data); setWaitlist(w.data); setNewsletter(n.data); } catch (e) { console.error(e); } };
  useEffect(() => { fetchData(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const tabs = [{ id: "overview", label: "Overview", icon: BarChart3 }, { id: "products", label: "Products", icon: Package }, { id: "waitlist", label: "Waitlist", icon: Users }, { id: "newsletter", label: "Newsletter", icon: Mail }];

  return (
    <div data-testid="admin-dashboard" className="min-h-screen bg-[#FFF4E2] pt-24">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between mb-12">
          <div><p className="text-[#D3AB80] uppercase tracking-[0.3em] text-xs mb-2">Atelier</p><h1 className="font-agatho text-2xl text-[#472825]">Dashboard</h1></div>
          <button data-testid="admin-logout-btn" onClick={onLogout} className="flex items-center gap-2 text-[#D3AB80] hover:text-[#472825] transition-colors duration-300 text-xs uppercase tracking-[0.2em]"><LogOut size={14} /><span>Exit</span></button>
        </div>
        <div className="flex gap-6 mb-12 border-b border-[#D3AB80]/30 pb-4 overflow-x-auto">
          {tabs.map((t) => (
            <button key={t.id} data-testid={`admin-tab-${t.id}`} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 text-xs uppercase tracking-[0.2em] pb-2 border-b-2 transition-all duration-300 whitespace-nowrap ${tab === t.id ? "text-[#472825] border-[#472825]" : "text-[#D3AB80] border-transparent hover:text-[#96786F]"}`}>
              <t.icon size={14} />{t.label}</button>
          ))}
        </div>
        {tab === "overview" && stats && <OverviewTab stats={stats} />}
        {tab === "products" && <ProductsTab products={products} token={token} onRefresh={fetchData} />}
        {tab === "waitlist" && <WaitlistTab entries={waitlist} />}
        {tab === "newsletter" && <NewsletterTab entries={newsletter} />}
      </div>
    </div>
  );
}

function OverviewTab({ stats }) {
  const cards = [{ label: "Products", value: stats.products, icon: Package }, { label: "Pre-orders", value: stats.preorders, icon: BarChart3 }, { label: "Waitlist", value: stats.waitlist, icon: Users }, { label: "Newsletter", value: stats.newsletter, icon: Mail }];
  return (<div data-testid="overview-tab" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {cards.map((c) => (<div key={c.label} className="bg-[#FDE4BC] border border-[#D3AB80]/30 p-8"><c.icon size={18} className="text-[#472825] mb-4" /><p className="font-agatho text-3xl text-[#472825] mb-2">{c.value}</p><p className="text-[#D3AB80] uppercase tracking-[0.2em] text-xs">{c.label}</p></div>))}
  </div>);
}

function ProductsTab({ products, token, onRefresh }) {
  const [editing, setEditing] = useState(null); const [editData, setEditData] = useState({});
  const headers = { Authorization: `Bearer ${token}` };
  const handleSave = async () => { if (!editing) return; try { const u = {}; if (editData.name) u.name = editData.name; if (editData.price) u.price = parseInt(editData.price); if (editData.availability) u.availability = editData.availability; await axios.put(`${API}/products/${editing}`, u, { headers }); setEditing(null); setEditData({}); onRefresh(); } catch (e) { console.error(e); } };
  const handleDelete = async (id) => { if (!window.confirm("Delete this product?")) return; try { await axios.delete(`${API}/products/${id}`, { headers }); onRefresh(); } catch (e) { console.error(e); } };
  return (
    <div data-testid="products-tab" className="space-y-4">
      {products.map((p) => (
        <div key={p.id} className="bg-[#FDE4BC] border border-[#D3AB80]/30 p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
          <img src={p.image_url} alt={p.name} className="w-16 h-16 object-cover shrink-0" />
          <div className="flex-1 min-w-0">
            {editing === p.id ? (
              <div className="space-y-3">
                <input value={editData.name || ""} onChange={(e) => setEditData({ ...editData, name: e.target.value })} placeholder="Name" className="bg-transparent border-b border-[#D3AB80] text-[#472825] focus:border-[#472825] focus:outline-none py-2 w-full text-sm" />
                <input value={editData.price || ""} onChange={(e) => setEditData({ ...editData, price: e.target.value })} placeholder="Price" type="number" className="bg-transparent border-b border-[#D3AB80] text-[#472825] focus:border-[#472825] focus:outline-none py-2 w-full text-sm" />
                <select value={editData.availability || ""} onChange={(e) => setEditData({ ...editData, availability: e.target.value })} className="bg-[#FDE4BC] border border-[#D3AB80] text-[#472825] py-2 px-2 text-sm"><option value="pre-order">Pre-Order</option><option value="waitlist">Waitlist</option></select>
                <div className="flex gap-2"><button onClick={handleSave} className="bg-[#472825] text-[#FFF4E2] px-4 py-2 text-xs uppercase tracking-widest">Save</button><button onClick={() => setEditing(null)} className="text-[#D3AB80] px-4 py-2 text-xs uppercase tracking-widest">Cancel</button></div>
              </div>
            ) : (<><h3 className="font-agatho text-lg text-[#472825]">{p.name}</h3><p className="text-[#D3AB80] text-xs">{p.code} &middot; {"\u20B9"}{p.price.toLocaleString("en-IN")} &middot; {p.availability}</p></>)}
          </div>
          {editing !== p.id && <div className="flex gap-3">
            <button data-testid={`edit-product-${p.id}`} onClick={() => { setEditing(p.id); setEditData({ name: p.name, price: p.price.toString(), availability: p.availability }); }} className="text-[#D3AB80] hover:text-[#472825] transition-colors duration-300"><Pencil size={14} /></button>
            <button data-testid={`delete-product-${p.id}`} onClick={() => handleDelete(p.id)} className="text-[#D3AB80] hover:text-[#96786F] transition-colors duration-300"><Trash2 size={14} /></button>
          </div>}
        </div>
      ))}
    </div>
  );
}

function WaitlistTab({ entries }) {
  return (<div data-testid="waitlist-tab" className="space-y-3">
    {entries.length === 0 && <p className="text-[#D3AB80] text-sm tracking-wide">No entries yet</p>}
    {entries.map((e) => (<div key={e.id} className="bg-[#FDE4BC] border border-[#D3AB80]/30 p-5 flex flex-col md:flex-row md:items-center gap-3 justify-between">
      <div><p className="text-[#472825] text-sm">{e.email}</p><p className="text-[#D3AB80] text-xs mt-1">{e.product_name}</p></div>
      <span className={`text-xs uppercase tracking-[0.15em] px-3 py-1 ${e.entry_type === "pre-order" ? "text-[#472825] bg-[#472825]/10 border border-[#472825]/20" : "text-[#D3AB80] bg-[#FFF4E2] border border-[#D3AB80]/30"}`}>{e.entry_type}</span>
    </div>))}
  </div>);
}

function NewsletterTab({ entries }) {
  return (<div data-testid="newsletter-tab" className="space-y-3">
    {entries.length === 0 && <p className="text-[#D3AB80] text-sm tracking-wide">No subscribers yet</p>}
    {entries.map((e) => (<div key={e.id} className="bg-[#FDE4BC] border border-[#D3AB80]/30 p-5">
      <p className="text-[#472825] text-sm">{e.email}</p><p className="text-[#D3AB80] text-xs mt-1">{new Date(e.created_at).toLocaleDateString()}</p>
    </div>))}
  </div>);
}
