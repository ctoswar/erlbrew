import { useState, useEffect } from "react";
import { useAdmin } from "../../context/AdminContext.jsx";

export default function AdminSeasonal() {
  const { seasonal, updateSeasonal } = useAdmin();
  const [form, setForm] = useState({ ...seasonal });
  const [saved, setSaved] = useState(false);

  useEffect(() => { setForm({ ...seasonal }); }, [seasonal]);

  const handleSave = () => {
    updateSeasonal(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brown mb-2">Seasonal Special</h1>
      <p className="font-body text-steam text-sm mb-8">Edit the featured seasonal drink on the homepage.</p>

      <div className="glass-panel-light bg-white/80 backdrop-blur-xl p-6 rounded-2xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-label text-[9px] tracking-[0.2em] text-caramel uppercase block mb-1.5">Title</label>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel" />
          </div>
          <div>
            <label className="font-label text-[9px] tracking-[0.2em] text-caramel uppercase block mb-1.5">Price</label>
            <input value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel" />
          </div>
        </div>

        <div>
          <label className="font-label text-[9px] tracking-[0.2em] text-caramel uppercase block mb-1.5">Description</label>
          <textarea value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))} rows={3} className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel resize-y" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-label text-[9px] tracking-[0.2em] text-caramel uppercase block mb-1.5">Badge Label</label>
            <input value={form.badge} onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))} className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel" />
          </div>
          <div>
            <label className="font-label text-[9px] tracking-[0.2em] text-caramel uppercase block mb-1.5">Ends At (optional ISO date)</label>
            <input value={form.endsAt || ""} onChange={(e) => setForm((f) => ({ ...f, endsAt: e.target.value || null }))} placeholder="e.g. 2026-03-20T00:00:00" className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel" />
          </div>
        </div>

        <div>
          <label className="font-label text-[9px] tracking-[0.2em] text-caramel uppercase block mb-1.5">Background Image URL</label>
          <input value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel" />
          {form.image && <img src={form.image} alt="Seasonal preview" className="mt-2 w-full max-h-40 object-cover rounded-lg" />}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button onClick={handleSave} className="bg-caramel text-white border-none px-6 py-2.5 font-body text-xs font-medium tracking-[0.1em] uppercase cursor-pointer hover:bg-roast transition-colors rounded-lg active:scale-[0.98]">
            Save Changes
          </button>
          {saved && <span className="text-success font-body text-sm">✓ Saved!</span>}
        </div>
      </div>
    </div>
  );
}