import { useAdmin } from "../../context/AdminContext.jsx";
import { MENU_CATEGORIES } from "../../data/index.js";

export default function AdminDashboard() {
  const { menuData, galleryImages, seasonal } = useAdmin();
  const totalMenuItems = MENU_CATEGORIES.reduce((sum, c) => sum + (menuData[c.key]?.length || 0), 0) + (menuData.handpoured?.length || 0);

  const cards = [
    { icon: "restaurant_menu", count: totalMenuItems, label: "Menu Items", color: "from-caramel/20 to-caramel/5" },
    { icon: "photo_library", count: galleryImages.length, label: "Gallery Photos", color: "from-brown/15 to-brown/5" },
    { icon: "auto_awesome", count: null, label: seasonal.title, color: "from-green/20 to-green/5" },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display text-[32px] font-bold text-brown tracking-tight">Dashboard</h1>
        <p className="font-body text-steam/70 mt-1">Manage your café's content from here.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <div key={i} className={`glass-panel-light bg-gradient-to-br ${card.color} backdrop-blur-xl p-6 rounded-2xl group hover:shadow-xl hover:shadow-brown/5 transition-all duration-400`}>
            <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-xl text-caramel">{card.icon}</span>
            </div>
            <div className="font-display text-3xl font-bold text-brown">
              {card.count !== null ? card.count : <span className="text-lg font-semibold truncate block">{card.label}</span>}
            </div>
            <div className="font-body text-steam/60 text-sm mt-1">
              {card.count !== null ? card.label : "Seasonal Special"}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 glass-panel-light bg-white/60 backdrop-blur-xl p-7 rounded-2xl">
        <h3 className="font-display text-lg font-semibold text-brown mb-5 flex items-center gap-2">
          <span className="material-symbols-outlined text-caramel text-xl">lightbulb</span>
          Quick Tips
        </h3>
        <ul className="space-y-3 font-body text-[14px] text-steam/80">
          <li className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-lg glass flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-caramel text-[14px]">restaurant_menu</span>
            </span>
            <span><strong className="text-brown">Menu Items</strong> — Add, edit, or remove drinks and pastries across all categories.</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-lg glass flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-caramel text-[14px]">auto_awesome</span>
            </span>
            <span><strong className="text-brown">Seasonal</strong> — Change the featured seasonal drink, price, description, and countdown timer.</span>
          </li>
          <li className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-lg glass flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-caramel text-[14px]">photo_library</span>
            </span>
            <span><strong className="text-brown">Gallery</strong> — Manage homepage photo gallery images and labels.</span>
          </li>
        </ul>
        <p className="font-body text-steam/40 text-[12px] mt-4">All changes are saved to your browser's localStorage automatically.</p>
      </div>
    </div>
  );
}