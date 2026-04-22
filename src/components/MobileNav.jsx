import "../styles/MobileNav.css";

const NAV_ITEMS = [
  { id: "home",      icon: "home",           label: "Home" },
  { id: "menu",      icon: "restaurant_menu", label: "Menu" },
  { id: "locations", icon: "location_on",     label: "Find Us" },
];

export default function MobileNav({ page, setPage }) {
  const navigate = (id) => {
    setPage(id);
    window.scrollTo(0, 0);
  };

  return (
    <div className="mobile-nav">
      <div className="mobile-nav-items">
        {NAV_ITEMS.map(({ id, icon, label }) => (
          <button
            key={id}
            className={`mobile-nav-item${page === id ? " active" : ""}`}
            onClick={() => navigate(id)}
          >
            <span className="material-symbols-outlined">{icon}</span>
            <span className="label">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
