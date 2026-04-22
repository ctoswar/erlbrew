import { useState, useEffect } from "react";
import "../styles/Navbar.css";

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);

  // On non-home pages the hero video is absent, so always show the solid style
  const isHome = page === "home";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    // Reset on page change
    setScrolled(window.scrollY > 40);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  const navigate = (target) => {
    setPage(target);
    window.scrollTo(0, 0);
  };

  const links = [
    { id: "home",      label: "Home" },
    { id: "menu",      label: "Menu" },
    { id: "locations", label: "Locations" },
  ];

  // solid = dark text on cream bg; transparent = light text over video
  const solid = !isHome || scrolled;

  return (
    <nav className={`nav${solid ? " scrolled" : ""}`}>
      <button className="nav-logo" onClick={() => navigate("home")}>
        Erlbrew Café
      </button>

      <ul className="nav-links">
        {links.map(({ id, label }) => (
          <li key={id}>
            <button
              className={page === id ? "active" : ""}
              onClick={() => navigate(id)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

