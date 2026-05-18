import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FooterNewsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 4000);
    } else {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Newsletter signup">
      <div className="flex border-b border-white/15 dark:border-dark-border focus-within:border-caramel transition-colors duration-300">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address for newsletter"
          className={`bg-transparent border-none outline-none flex-1 text-white/90 dark:text-cream text-sm py-3 font-body placeholder:text-white/25 ${
            status === "error" ? "border-b border-error" : ""
          }`}
        />
        <button
          type="submit"
          className="material-symbols-outlined bg-transparent border-none cursor-pointer text-caramel text-xl hover:text-white transition-colors duration-200 active:scale-95"
          aria-label="Subscribe to newsletter"
        >
          arrow_forward
        </button>
      </div>
      {status === "success" && (
        <p className="text-success text-[11px] mt-2 tracking-wide" role="status">Welcome to the ritual. Check your inbox!</p>
      )}
      {status === "error" && (
        <p className="text-error text-[11px] mt-2 tracking-wide" role="alert">Please enter a valid email address.</p>
      )}
    </form>
  );
}

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-ink dark:bg-dark-bg pt-20 pb-8 px-5 md:px-12" role="contentinfo">
      <div className="max-w-[1360px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          <div>
            <div className="font-label text-lg text-white dark:text-cream tracking-[0.1em] mb-4">Erlbrew Café</div>
            <p className="text-white/40 dark:text-dark-muted text-sm leading-relaxed max-w-[260px]">
              Crafting exceptional coffee experiences for the local community since 2026.
            </p>
          </div>

          <div>
            <div className="font-label text-[10px] tracking-[0.3em] text-caramel uppercase mb-5">Experience</div>
            <ul className="list-none flex flex-col gap-3" role="list">
              <li><button onClick={() => navigate("/")} className="text-white/45 bg-transparent border-none cursor-pointer font-body text-sm text-left p-0 transition-colors duration-200 hover:text-white dark:hover:text-cream">Our Story</button></li>
              <li><button onClick={() => navigate("/menu")} className="text-white/45 bg-transparent border-none cursor-pointer font-body text-sm text-left p-0 transition-colors duration-200 hover:text-white dark:hover:text-cream">Menu</button></li>
              <li><button onClick={() => navigate("/locations")} className="text-white/45 bg-transparent border-none cursor-pointer font-body text-sm text-left p-0 transition-colors duration-200 hover:text-white dark:hover:text-cream">Locations</button></li>
            </ul>
          </div>

          <div>
            <div className="font-label text-[10px] tracking-[0.3em] text-caramel uppercase mb-5">Connect</div>
            <ul className="list-none flex flex-col gap-3" role="list">
              <li><button className="text-white/45 bg-transparent border-none cursor-pointer font-body text-sm text-left p-0 transition-colors duration-200 hover:text-white dark:hover:text-cream">Instagram</button></li>
              <li><button className="text-white/45 bg-transparent border-none cursor-pointer font-body text-sm text-left p-0 transition-colors duration-200 hover:text-white dark:hover:text-cream">Newsletter</button></li>
              <li><button className="text-white/45 bg-transparent border-none cursor-pointer font-body text-sm text-left p-0 transition-colors duration-200 hover:text-white dark:hover:text-cream">Wholesale</button></li>
              <li><button className="text-white/45 bg-transparent border-none cursor-pointer font-body text-sm text-left p-0 transition-colors duration-200 hover:text-white dark:hover:text-cream">Careers</button></li>
            </ul>
          </div>

          <div>
            <div className="font-label text-[10px] tracking-[0.3em] text-caramel uppercase mb-5">Newsletter</div>
            <p className="text-white/40 dark:text-dark-muted text-sm leading-relaxed mb-4">
              Get brewing tips and seasonal updates.
            </p>
            <FooterNewsletter />
          </div>
        </div>

        <div className="border-t border-white/[0.07] dark:border-dark-border pt-7 flex justify-between items-center flex-wrap gap-3">
          <span className="text-white/25 dark:text-dark-muted/50 text-xs">© 2026 Erlbrew Café. All rights reserved.</span>
          <div className="flex gap-6">
            <button className="text-white/25 dark:text-dark-muted/50 bg-transparent border-none cursor-pointer font-body text-xs transition-colors duration-200 hover:text-white/60 dark:hover:text-dark-muted">Privacy Policy</button>
            <button className="text-white/25 dark:text-dark-muted/50 bg-transparent border-none cursor-pointer font-body text-xs transition-colors duration-200 hover:text-white/60 dark:hover:text-dark-muted">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  );
}