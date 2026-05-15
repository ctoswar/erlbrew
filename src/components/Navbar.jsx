import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    setScrolled(window.scrollY > 40);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const solid = !isHome || scrolled;
  const links = [
    { to: "/",          label: "Home" },
    { to: "/menu",      label: "Menu" },
    { to: "/locations", label: "Find Us" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 h-[72px] transition-all duration-500 ${solid ? "glass-light shadow-md shadow-brown/[0.04]" : "bg-transparent"}`}>
      <button onClick={() => navigate("/")} className={`font-label text-[19px] tracking-[0.12em] border-none bg-transparent cursor-pointer transition-all duration-300 hover:tracking-[0.16em] ${solid ? "text-brown" : "text-white"}`}>
        Erlbrew Café
      </button>
      <ul className="hidden md:flex gap-10 list-none m-0 p-0">
        {links.map(({ to, label }) => (
          <li key={to}>
            <button onClick={() => navigate(to)} className={`font-body text-[11px] font-semibold tracking-[0.16em] uppercase bg-transparent border-none cursor-pointer pb-1.5 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-caramel after:transition-all after:duration-300 ${location.pathname === to ? "after:w-full " + (solid ? "text-brown" : "text-white") : "after:w-0 hover:after:w-full " + (solid ? "text-steam hover:text-caramel" : "text-white/60 hover:text-caramel")}`}>
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}