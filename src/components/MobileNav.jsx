import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/",          icon: "home",           label: "Home" },
  { to: "/menu",      icon: "restaurant_menu", label: "Menu" },
  { to: "/locations", icon: "location_on",     label: "Find Us" },
];

export default function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="hidden max-md:block fixed bottom-0 left-0 right-0 z-50 glass-light border-t border-brown/[0.06] pt-1.5 pb-5">
      <div className="flex justify-around">
        {NAV_ITEMS.map(({ to, icon, label }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className={`flex flex-col items-center gap-0.5 px-5 py-1.5 bg-transparent border-none cursor-pointer transition-colors duration-300 relative ${
              location.pathname === to ? "text-brown" : "text-steam/60"
            }`}
          >
            {location.pathname === to && (
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-5 h-[2px] bg-caramel rounded-full" />
            )}
            <span className="material-symbols-outlined text-xl">{icon}</span>
            <span className="font-body text-[9px] font-semibold tracking-[0.06em] uppercase">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}