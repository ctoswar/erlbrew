import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useAdmin } from "../context/AdminContext.jsx";

import AdminLogin from "./admin/AdminLogin.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AdminMenu from "./admin/AdminMenu.jsx";
import AdminSeasonal from "./admin/AdminSeasonal.jsx";
import AdminGallery from "./admin/AdminGallery.jsx";

export default function AdminPage() {
  const { isAuthenticated } = useAdmin();

  if (!isAuthenticated) return <AdminLogin />;

  return (
    <div className="min-h-screen bg-cream">
      <AdminSidebar />
      <div className="md:ml-64 p-5 md:p-10 pb-28 md:pb-10">
        <Routes>
          <Route path="" element={<AdminDashboard />} />
          <Route path="menu" element={<AdminMenu />} />
          <Route path="seasonal" element={<AdminSeasonal />} />
          <Route path="gallery" element={<AdminGallery />} />
        </Routes>
      </div>
    </div>
  );
}

function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAdmin();
  const [hovered, setHovered] = useState(null);

  const links = [
    { to: "/admin",          icon: "dashboard",       label: "Dashboard" },
    { to: "/admin/menu",     icon: "restaurant_menu", label: "Menu Items" },
    { to: "/admin/seasonal", icon: "auto_awesome",   label: "Seasonal" },
    { to: "/admin/gallery",  icon: "photo_library",   label: "Gallery" },
  ];

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-64 bg-ink/95 backdrop-blur-xl text-white flex flex-col z-10 border-r border-white/[0.06]">
      <div className="p-6 border-b border-white/[0.06]">
        <button onClick={() => navigate("/")} className="font-label text-lg tracking-[0.12em] text-white bg-transparent border-none cursor-pointer hover:text-caramel transition-colors">
          Erlbrew Café
        </button>
        <div className="font-body text-[10px] text-white/30 mt-2 tracking-[0.2em] uppercase">Admin Panel</div>
      </div>
      <nav className="flex-1 py-3">
        {links.map(({ to, icon, label }) => {
          const active = location.pathname === to;
          return (
            <button
              key={to}
              onClick={() => navigate(to)}
              onMouseEnter={() => setHovered(to)}
              onMouseLeave={() => setHovered(null)}
              className={`w-full flex items-center gap-3 px-6 py-3.5 text-[13px] font-body border-none cursor-pointer transition-all duration-200 relative ${
                active ? "text-caramel" : "text-white/45 hover:text-white/80"
              }`}
            >
              {active && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-caramel rounded-r" />}
              <span className={`material-symbols-outlined text-lg ${active ? "text-caramel" : ""}`}>{icon}</span>
              {label}
              {active && <span className="absolute inset-0 bg-caramel/[0.08] rounded-r" />}
            </button>
          );
        })}
      </nav>
      <div className="p-5 border-t border-white/[0.06]">
        <button
          onClick={() => { logout(); navigate("/"); }}
          className="w-full flex items-center gap-2 justify-center bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.15] text-white/40 hover:text-white/70 text-[11px] font-body tracking-[0.12em] uppercase py-2.5 cursor-pointer transition-all duration-200 rounded-xl"
        >
          <span className="material-symbols-outlined text-sm">logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}