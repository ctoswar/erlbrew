import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.scrollY > 40;
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    setScrolled(window.scrollY > 40);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // Lock scroll when mobile menu open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const solid = !isHome || scrolled;

  const links = [
    { to: "/",          label: "Home" },
    { to: "/menu",      label: "Menu" },
    { to: "/locations", label: "Find Us" },
  ];

  const handleNav = (to) => {
    setMobileOpen(false);
    navigate(to);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-12 h-[72px] transition-all duration-300 ${
          solid
            ? "glass-light shadow-md shadow-brown/[0.04] dark:bg-dark-surface/90 dark:shadow-black/20"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <button
          onClick={() => handleNav("/")}
          className={`font-label text-[19px] tracking-[0.12em] border-none bg-transparent cursor-pointer transition-all duration-300 hover:tracking-[0.16em] ${
            solid ? "text-brown dark:text-cream" : "text-white"
          }`}
          aria-label="Erlbrew Café home"
        >
          Erlbrew Café
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none m-0 p-0" role="list">
          {links.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <li key={to} role="listitem">
                <button
                  onClick={() => handleNav(to)}
                  className={`font-body text-[11px] font-semibold tracking-[0.16em] uppercase bg-transparent border-none cursor-pointer pb-1.5 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-px after:bg-caramel after:transition-all after:duration-300 ${
                    active
                      ? "after:w-full " + (solid ? "text-brown dark:text-cream" : "text-white")
                      : "after:w-0 hover:after:w-full " + (solid ? "text-steam dark:text-dark-muted hover:text-caramel" : "text-white/60 hover:text-caramel")
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`md:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 bg-transparent border-none cursor-pointer z-[60] ${mobileOpen ? "hamburger-open" : ""}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
        >
          <span className={`hamburger-line block w-5 h-[2px] rounded-full transition-all duration-300 ${solid || mobileOpen ? "bg-brown dark:bg-cream" : "bg-white"}`} />
          <span className={`hamburger-line block w-5 h-[2px] rounded-full transition-all duration-300 ${solid || mobileOpen ? "bg-brown dark:bg-cream" : "bg-white"}`} />
          <span className={`hamburger-line block w-5 h-[2px] rounded-full transition-all duration-300 ${solid || mobileOpen ? "bg-brown dark:bg-cream" : "bg-white"}`} />
        </button>
      </nav>

      {/* Mobile dropdown overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[55] transition-all duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Mobile navigation menu"
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-ink/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        {/* Menu panel */}
        <div className={`absolute top-0 right-0 w-[280px] h-full bg-cream dark:bg-dark-surface shadow-2xl transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}>
          <div className="pt-[88px] px-8 flex flex-col gap-2">
            {links.map(({ to, label }) => {
              const active = location.pathname === to;
              return (
                <button
                  key={to}
                  onClick={() => handleNav(to)}
                  className={`w-full text-left px-4 py-4 border-none rounded-xl cursor-pointer transition-all duration-200 font-body text-[13px] font-semibold tracking-[0.1em] uppercase ${
                    active
                      ? "bg-caramel/10 text-caramel"
                      : "bg-transparent text-brown dark:text-cream hover:bg-parchment/60 dark:hover:bg-dark-card"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
