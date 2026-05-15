import { useState } from "react";
import { useAdmin } from "../../context/AdminContext.jsx";
import { MENU_CATEGORIES, BADGE_LABELS } from "../../data/index.js";

const EMPTY_ITEM = { name: "", price: "", desc: "", img: "", tag: "", badges: [] };

export default function AdminMenu() {
  const { menuData, addMenuItem, updateMenuItem, deleteMenuItem, resetAll } = useAdmin();
  const [activeCategory, setActiveCategory] = useState("brews");
  const [editing, setEditing] = useState(null); // { category, index }
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(EMPTY_ITEM);

  const allCategories = [
    ...MENU_CATEGORIES,
    { key: "handpoured", label: "Hand-poured", icon: "water_drop" },
  ];

  const items = menuData[activeCategory] || [];
  const isEditingNew = adding;
  const isEditingExisting = editing !== null;

  const handleEdit = (category, index) => {
    const item = menuData[category][index];
    setForm({ ...item, badges: item.badges || [] });
    setEditing({ category, index });
    setAdding(false);
  };

  const handleAdd = () => {
    setForm(EMPTY_ITEM);
    setAdding(true);
    setEditing(null);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    if (isEditingExisting) {
      updateMenuItem(editing.category, editing.index, form);
      setEditing(null);
    } else if (isEditingNew) {
      addMenuItem(activeCategory, form);
      setAdding(false);
    }
    setForm(EMPTY_ITEM);
  };

  const handleDelete = (category, index) => {
    if (confirm("Delete this item?")) {
      deleteMenuItem(category, index);
    }
  };

  const toggleBadge = (badge) => {
    setForm((prev) => ({
      ...prev,
      badges: prev.badges.includes(badge)
        ? prev.badges.filter((b) => b !== badge)
        : [...prev.badges, badge],
    }));
  };

  const cancelEdit = () => {
    setEditing(null);
    setAdding(false);
    setForm(EMPTY_ITEM);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-bold text-brown">Menu Items</h1>
          <p className="font-body text-steam text-sm mt-1">Manage drinks, pastries, and brews</p>
        </div>
        <button onClick={handleAdd} className="bg-caramel text-white border-none px-5 py-2.5 font-body text-xs font-medium tracking-[0.1em] uppercase cursor-pointer transition-colors hover:bg-roast active:scale-[0.98] rounded-lg flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">add</span>
          Add Item
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 mb-6 overflow-x-auto">
        {allCategories.map((c) => (
          <button
            key={c.key}
            onClick={() => { setActiveCategory(c.key); cancelEdit(); }}
            className={`px-4 py-2 font-body text-xs font-medium tracking-wide uppercase border-none cursor-pointer transition-colors rounded-lg ${
              activeCategory === c.key ? "bg-brown text-white" : "bg-brown/8 text-steam hover:bg-brown/12"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Item List */}
      <div className="space-y-2">
        {items.map((item, i) => (
          editing && editing.category === activeCategory && editing.index === i ? (
            <ItemForm key={i} form={form} setForm={setForm} onSave={handleSave} onCancel={cancelEdit} toggleBadge={toggleBadge} />
          ) : (
            <div key={i} className="glass-panel-light bg-white/80 backdrop-blur-xl p-4 rounded-xl flex items-center gap-4 group hover:bg-white/95 transition-colors">
              <img src={item.img} alt={item.name} className="w-14 h-14 object-cover rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-display text-base font-semibold text-brown truncate">{item.name}</div>
                <div className="font-body text-xs text-steam truncate">{item.desc}</div>
              </div>
              <div className="font-display text-caramel font-semibold shrink-0">{item.price}</div>
              <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleEdit(activeCategory, i)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-brown/8 border-none cursor-pointer text-brown hover:bg-brown/15 transition-colors">
                  <span className="material-symbols-outlined text-sm">edit</span>
                </button>
                <button onClick={() => handleDelete(activeCategory, i)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-error/10 border-none cursor-pointer text-error hover:bg-error/20 transition-colors">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
            </div>
          )
        ))}

        {adding && (
          <ItemForm form={form} setForm={setForm} onSave={handleSave} onCancel={cancelEdit} toggleBadge={toggleBadge} isNew />
        )}
      </div>
    </div>
  );
}

function ItemForm({ form, setForm, onSave, onCancel, toggleBadge, isNew }) {
  const badgeOptions = Object.keys(BADGE_LABELS);
  return (
    <div className="glass-panel-light bg-champagne/80 backdrop-blur-xl p-5 rounded-xl space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel" />
        <input placeholder="Price (e.g. $6.75)" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel" />
      </div>
      <input placeholder="Description" value={form.desc} onChange={(e) => setForm((f) => ({ ...f, desc: e.target.value }))} className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel" />
      <input placeholder="Image URL" value={form.img} onChange={(e) => setForm((f) => ({ ...f, img: e.target.value }))} className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input placeholder="Tag (e.g. Signature)" value={form.tag} onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))} className="w-full bg-white border border-brown/10 rounded-lg px-3 py-2 font-body text-sm text-brown outline-none focus:border-caramel" />
        <div className="flex gap-2 items-center flex-wrap">
          <span className="font-body text-xs text-steam">Badges:</span>
          {badgeOptions.map((b) => (
            <button
              key={b}
              onClick={() => toggleBadge(b)}
              className={`px-2 py-0.5 text-[10px] font-body font-medium tracking-wide uppercase border rounded cursor-pointer transition-colors ${
                form.badges?.includes(b) ? "bg-caramel text-white border-caramel" : "bg-white text-steam border-brown/15 hover:border-caramel"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-2 pt-1">
        <button onClick={onSave} className="bg-caramel text-white border-none px-5 py-2 font-body text-xs font-medium tracking-wide uppercase cursor-pointer hover:bg-roast transition-colors rounded-lg">
          {isNew ? "Add" : "Save"}
        </button>
        <button onClick={onCancel} className="bg-transparent text-steam border border-brown/15 px-5 py-2 font-body text-xs tracking-wide cursor-pointer hover:bg-brown/5 transition-colors rounded-lg">
          Cancel
        </button>
      </div>
    </div>
  );
}