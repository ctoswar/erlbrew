import { useState } from "react";
import { useAdmin } from "../../context/AdminContext.jsx";

export default function AdminLogin() {
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!login(password)) {
      setError(true);
      setShake(true);
      setTimeout(() => { setError(false); setShake(false); }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(192,125,58,0.06)_0%,transparent_70%)]" />
      <div className={`glass-panel-light w-full max-w-[400px] p-10 relative ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl glass mx-auto mb-5 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl text-caramel">lock</span>
          </div>
          <div className="font-label text-[11px] tracking-[0.3em] text-caramel/70 uppercase mb-3">Erlbrew Café</div>
          <h1 className="font-display text-[32px] font-bold text-brown tracking-tight">Admin Panel</h1>
          <p className="font-body text-steam/70 text-sm mt-2">Enter your password to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="font-label text-[9px] tracking-[0.3em] text-caramel/60 uppercase block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-white/80 backdrop-blur-sm border ${error ? "border-error" : "border-brown/10"} rounded-xl px-4 py-3.5 font-body text-brown text-sm outline-none focus:border-caramel focus:bg-white transition-all placeholder:text-steam/40`}
              placeholder="••••••••"
              autoFocus
            />
            {error && <p className="text-error text-[11px] font-body mt-2 tracking-wide">Incorrect password. Please try again.</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-brown text-white border-none py-3.5 font-body text-[11px] font-semibold tracking-[0.16em] uppercase cursor-pointer transition-all duration-300 hover:bg-roast hover:shadow-lg hover:shadow-brown/20 active:scale-[0.98] rounded-xl"
          >
            Sign In
          </button>
        </form>

        <p className="text-steam/30 text-[10px] text-center mt-8 font-body tracking-wide">Default: erlbrew2026</p>
      </div>
    </div>
  );
}