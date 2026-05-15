import { useState } from "react";
import { useAdmin } from "../../context/AdminContext.jsx";

export default function AdminGallery() {
  const { galleryImages, addGalleryImage, updateGalleryImage, deleteGalleryImage } = useAdmin();
  const [editingIndex, setEditingIndex] = useState(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ src: "", label: "" });

  const handleEdit = (i) => {
    setForm({ ...galleryImages[i] });
    setEditingIndex(i);
    setAdding(false);
  };

  const handleAdd = () => {
    setForm({ src: "", label: "" });
    setAdding(true);
    setEditingIndex(null);
  };

  const handleSave = () => {
    if (!form.src || !form.label) return;
    if (editingIndex !== null) {
      updateGalleryImage(editingIndex, form);
    } else {
      addGalleryImage(form);
    }
    setForm({ src: "", label: "" });
    setEditingIndex(null);
    setAdding(false);
  };

  const handleDelete = (i) => {
    if (confirm("Delete this image?")) deleteGalleryImage(i);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setAdding(false);
    setForm({ src: "", label: "" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-brown">Gallery</h1>
          <p className="font-body text-steam text-sm mt-1">Manage homepage photo gallery</p>
        </div>
        <button onClick={handleAdd} className="bg-caramel text-white border-none px-5 py-2.5 font-body text-xs font-medium tracking-[0.1em] uppercase cursor-pointer transition-colors hover:bg-roast active:scale-[0.98] rounded-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">add</span>
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {galleryImages.map((img, i) => (
          editingIndex === i ? (
            <div key={i} className="glass-panel-light bg-champagne/80 backdrop-blur-xl p-4 rounded-xl space-y-3">
              <input placeholder="Image URL" value={form.src} onChange={(e) => setForm((f) => ({ ...f, src: e.target.value }))} className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel" />
              <input placeholder="Label" value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel" />
              <div className="flex gap-2">
                <button onClick={handleSave} className="bg-caramel text-white border-none px-4 py-1.5 font-body text-xs font-medium tracking-wide uppercase cursor-pointer hover:bg-roast transition-colors rounded-lg">Save</button>
                <button onClick={cancelEdit} className="bg-transparent text-steam border border-brown/15 px-4 py-1.5 font-body text-xs cursor-pointer hover:bg-brown/5 transition-colors rounded-lg">Cancel</button>
              </div>
            </div>
          ) : (
            <div key={i} className="glass-panel-light bg-white/80 backdrop-blur-xl rounded-xl overflow-hidden group">
              <div className="relative aspect-[3/4]">
                <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-ink/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => handleEdit(i)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-colors">
                    <span className="material-symbols-outlined text-lg">edit</span>
                  </button>
                  <button onClick={() => handleDelete(i)} className="w-10 h-10 flex items-center justify-center rounded-full bg-error/30 border border-error/40 text-white hover:bg-error/50 transition-colors">
                    <span className="material-symbols-outlined text-lg">delete</span>
                  </button>
                </div>
              </div>
              <div className="p-3">
                <div className="font-display text-sm font-medium text-brown truncate">{img.label}</div>
              </div>
            </div>
          )
        ))}

        {adding && (
          <div className="glass-panel-light bg-champagne/80 backdrop-blur-xl p-4 rounded-xl space-y-3">
            <input placeholder="Image URL" value={form.src} onChange={(e) => setForm((f) => ({ ...f, src: e.target.value }))} className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel" />
            <input placeholder="Label (e.g. The Morning Pour)" value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel" />
            {form.src && <img src={form.src} alt="Preview" className="w-full aspect-[3/4] object-cover rounded-lg" />}
            <div className="flex gap-2">
              <button onClick={handleSave} className="bg-caramel text-white border-none px-4 py-1.5 font-body text-xs font-medium tracking-wide uppercase cursor-pointer hover:bg-roast transition-colors rounded-lg">Add</button>
              <button onClick={cancelEdit} className="bg-transparent text-steam border border-brown/15 px-4 py-1.5 font-body text-xs cursor-pointer hover:bg-brown/5 transition-colors rounded-lg">Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}