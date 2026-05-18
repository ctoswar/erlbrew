import { useState, useEffect, useRef } from "react";
import { useAdmin } from "../context/AdminContext.jsx";
import Reveal from "../components/Reveal.jsx";
import ProgressiveImage from "../components/ProgressiveImage.jsx";
import DietaryBadge from "../components/DietaryBadge.jsx";
import Lightbox from "../components/Lightbox.jsx";

/* ── Hero ────────────────────────────────────────────────────────────────── */
function Hero() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative min-h-screen min-h-[max(100dvh,600px)] sm:min-h-[700px] sm:min-h-[max(100dvh,700px)] flex items-center justify-center" aria-label="Hero banner">
      {/* Background image with cinematic overlays */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center"
        role="img"
        aria-label="Coffee brewing atmosphere"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=80')",
        }}
      />
      {/* Deep atmospheric overlays */}
      <div className="absolute inset-0 bg-ink/55 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-br from-ink/40 via-transparent to-brown/70 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/10 to-transparent dark:from-dark-bg dark:via-dark-bg/10 z-[3] opacity-80" />
      {/* Decorative vignette */}
      <div className="absolute inset-0 z-[3]" style={{ background: "radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(26,21,16,0.4) 100%)" }} />

      <div className="relative z-[4] text-center px-6 max-w-[900px] mx-auto w-full">
        <div className="flex items-center justify-center gap-5 mb-8 opacity-0" style={{ animation: "hero-fade-in 1s ease 0.3s forwards" }}>
          <span className="w-12 h-px bg-gradient-to-r from-transparent to-caramel/60" />
          <span className="font-label text-[10px] tracking-[0.5em] text-caramel/90 uppercase" aria-hidden="true">Established 2026 · Artisanal Coffee</span>
          <span className="w-12 h-px bg-gradient-to-l from-transparent to-caramel/60" />
        </div>

        <h1
          className="font-display text-[clamp(48px,10vw,140px)] sm:text-[clamp(64px,12vw,140px)] font-bold text-white leading-[0.85] mb-10 tracking-[-0.03em] opacity-0"
          style={{ animation: "hero-fade-in 1.2s cubic-bezier(0.16,1,0.3,1) 0.5s forwards" }}
        >
          Where Every
          <br />
          <em
            className="not-italic text-caramel"
            style={{ display: "inline-block", animation: "float 4s ease-in-out infinite" }}
          >
            Ritual
          </em>
        </h1>

        <p
          className="font-body text-[clamp(15px,1.8vw,19px)] font-light text-white/50 max-w-[540px] mx-auto mb-14 leading-[1.85] tracking-[0.02em] opacity-0"
          style={{ animation: "hero-fade-in 1s ease 0.7s forwards" }}
        >
          From the gentle morning pour-over to the deep resonance of our signature espresso — every cup is a journey through origin and craftsmanship.
        </p>

        <div
          className="flex gap-5 justify-center flex-wrap opacity-0"
          style={{ animation: "hero-fade-in 1s ease 0.9s forwards" }}
        >
          <a href="/menu" className="btn-primary">Explore Our Menu</a>
          <a href="/locations" className="btn-ghost">Find a Location</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2 text-white/30 text-[9px] tracking-[0.25em] uppercase transition-opacity duration-500 ${scrolled ? "opacity-0 pointer-events-none" : ""}`}
        style={{ animation: "scroll-bounce 2.5s ease infinite" }}
        aria-hidden="true"
      >
        <span className="material-symbols-outlined text-base">keyboard_arrow_down</span>
        Scroll
      </div>
    </section>
  );
}

/* ── Brand Marquee ─────────────────────────────────────────────────────── */
function BrandMarquee() {
  const text = "ERLBREW · RITUAL · CRAFT · ORIGIN · ERLBREW · RITUAL · CRAFT · ORIGIN · ";
  return (
    <div className="overflow-hidden bg-ink dark:bg-dark-bg py-5 border-y border-white/[0.04] dark:border-dark-border" aria-hidden="true">
      <div className="marquee-track flex whitespace-nowrap">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-label text-[11px] tracking-[0.35em] text-white/15 uppercase shrink-0"
            aria-hidden={i === 1}
          >
            {text}{text}{text}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Features → Philosophy ─────────────────────────────────────────────── */
function Philosophy() {
  const { features } = useAdmin();
  return (
    <section className="bg-cream dark:bg-dark-bg py-20 md:py-36 px-5 md:px-12" aria-label="Our philosophy">
      <div className="max-w-[1360px] mx-auto">
        <Reveal>
          <div className="label text-caramel">Our Philosophy</div>
          <h2 className="font-display text-[clamp(32px,5vw,56px)] font-bold text-brown dark:text-cream leading-[1.05] mb-16 md:mb-20 tracking-[-0.02em]">
            What We<br /><span className="text-caramel">Stand For</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-steam/15 dark:bg-dark-border/30">
          {features.map((f, i) => (
            <Reveal key={i} delay={i + 1}>
              <div className="bg-cream dark:bg-dark-surface group p-8 md:p-14 relative overflow-hidden transition-all duration-300 hover:bg-champagne/60 dark:hover:bg-dark-card">
                {/* Hover accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-caramel scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                {/* Large decorative number */}
                <span className="font-display text-[80px] md:text-[100px] leading-none font-bold text-brown/[0.04] dark:text-cream/[0.04] absolute -top-2 -right-1 select-none pointer-events-none" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="material-symbols-outlined text-[32px] text-caramel mb-8 block" aria-hidden="true">{f.icon}</span>
                <h3 className="font-display text-[20px] md:text-[22px] font-semibold text-brown dark:text-cream mb-4 tracking-[-0.01em]">{f.title}</h3>
                <p className="font-body text-[14px] text-steam dark:text-dark-muted leading-[1.8] tracking-[0.005em]">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Our Story ──────────────────────────────────────────────────────────── */
function OurStory() {
  return (
    <section className="bg-cream dark:bg-dark-bg" aria-label="Our story">
      <div className="py-20 md:py-44 px-5 md:px-12 max-w-[1360px] mx-auto relative">
        {/* Decorative background element */}
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-caramel/[0.03] dark:bg-caramel/[0.06] rounded-full blur-[100px] pointer-events-none" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-28 items-center">
        <Reveal>
          <div className="relative aspect-[4/5] w-full min-h-[320px] sm:min-h-[400px]">
            <ProgressiveImage src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80" alt="Barista carefully crafting a pour-over coffee at Erlbrew" style={{ position: "absolute", inset: 0 }} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
            {/* Overlapping badge */}
            <div className="absolute bottom-6 right-3 md:-right-8 z-10">
              <div className="bg-ink dark:bg-dark-card text-white px-6 py-4">
                <span className="font-label text-[10px] tracking-[0.3em] text-caramel/80 uppercase block">Est.</span>
                <span className="font-display text-2xl font-bold">2026</span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={2}>
          <div>
            <div className="label text-caramel">Our Story</div>
            <h2 className="font-display text-[clamp(32px,5vw,64px)] font-bold text-brown dark:text-cream leading-[1.05] mb-8 tracking-[-0.02em]">
              Brewed with Intention,
              <br />
              <span className="text-caramel">Served with Soul</span>
            </h2>
            <p className="font-body text-[16px] text-steam/90 dark:text-dark-muted leading-[1.85] max-w-[520px] mb-6 tracking-[0.005em]">
              Erlbrew was born from a simple belief: exceptional coffee should be accessible, unhurried, and deeply considered. We built our first café as a sanctuary — away from the noise, toward the ritual.
            </p>
            <p className="font-body text-[16px] text-steam/90 dark:text-dark-muted leading-[1.85] mb-12">
              Today we operate our flagship location, designed to feel like a room you never want to leave. The menu rotates. The music is curated. The coffee is always extraordinary.
            </p>
            <a href="/menu" className="btn-primary">View Full Menu</a>
          </div>
        </Reveal>
      </div>
      </div>
    </section>
  );
}

/* ── Photo Gallery ─────────────────────────────────────────────────────── */
function PhotoGallery() {
  const { galleryImages } = useAdmin();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <section className="bg-ink/95 dark:bg-dark-bg py-20 md:py-36" aria-label="Photo gallery">
        <div className="max-w-[1360px] mx-auto px-5 md:px-12 mb-12">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <div className="label text-caramel">Gallery</div>
                <h2 className="font-display text-[clamp(32px,5vw,56px)] font-bold text-white leading-[1.05] tracking-[-0.02em]">
                  Inside the <span className="text-caramel">Space</span>
                </h2>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2 max-w-[1360px] mx-auto">
          {galleryImages.map((img, i) => (
            <Reveal key={i} delay={i + 1}>
              <div
                className={`relative overflow-hidden cursor-pointer group ${
                  i === 0 ? "md:col-span-2 md:row-span-2 aspect-square" : "aspect-[3/4]"
                }`}
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={0}
                aria-label={`View ${img.label} in lightbox`}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIndex(i); } }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4 md:p-6">
                  <span className="font-display text-[16px] md:text-[18px] text-white/90 italic">{img.label}</span>
                  <span className="w-10 h-10 rounded-full glass-dark flex items-center justify-center" aria-hidden="true">
                    <span className="material-symbols-outlined text-white/70 text-base">open_in_full</span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      {lightboxIndex !== null && <Lightbox initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
    </>
  );
}

/* ── Menu Preview ───────────────────────────────────────────────────────── */
function MenuPreview() {
  const { menuData } = useAdmin();
  const [activeTab, setActiveTab] = useState("brews");
  const tabs = [
    { id: "brews", label: "Signature Brews" },
    { id: "espresso", label: "Espresso" },
    { id: "pastries", label: "Pastries" },
  ];

  return (
    <section className="relative bg-espresso dark:bg-dark-surface py-20 md:py-40 overflow-hidden" aria-label="Menu preview">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(192,125,58,0.08)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(192,125,58,0.05)_0%,transparent_50%)]" />
      {/* Decorative noise texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

      <div className="relative max-w-[1360px] mx-auto px-5 md:px-12">
        <Reveal>
          <div className="label text-caramel">The Menu</div>
          <div className="flex justify-between items-end flex-wrap gap-4 mb-0">
            <h2 className="font-display text-[clamp(36px,5vw,64px)] font-bold text-white leading-[1.05] tracking-[-0.02em]">
              Handcrafted
              <br />
              <span className="text-caramel">with Care</span>
            </h2>
            <a href="/menu" className="btn-ghost hidden sm:inline-flex">
              Full Menu →
            </a>
          </div>
        </Reveal>

        <div className="flex gap-1 flex-wrap my-12" role="tablist" aria-label="Menu categories">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              role="tab"
              aria-selected={activeTab === t.id}
              className={`px-5 sm:px-7 py-3 border-none cursor-pointer font-body text-[11px] font-semibold tracking-[0.14em] uppercase transition-all duration-300 rounded-full ${
                activeTab === t.id
                  ? "glass text-white shadow-lg shadow-caramel/20"
                  : "bg-white/[0.04] text-white/40 hover:bg-white/[0.08] hover:text-white/70"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 md:gap-5" role="tabpanel">
          {menuData[activeTab]?.map((item, i) => (
            <Reveal key={i} delay={Math.min(i + 1, 4)}>
              <div className="glass-card-dark group rounded-2xl overflow-hidden cursor-pointer">
                <div className="relative overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.06]" loading="lazy" />
                  <div className="absolute top-4 left-4 glass-dark rounded-full px-3 py-1">
                    <span className="font-label text-[8px] tracking-[0.3em] text-caramel/90 uppercase">{item.tag}</span>
                  </div>
                </div>
                <div className="p-6 pb-5">
                  <h3 className="font-display text-[18px] md:text-xl font-semibold text-white mb-2 leading-tight tracking-[-0.01em]">{item.name}</h3>
                  <p className="font-body text-[13px] text-white/40 leading-[1.65] mb-5">{item.desc}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-display text-xl text-caramel">{item.price}</span>
                    {item.badges && (
                      <div className="flex gap-1.5">
                        {item.badges.map((b) => <DietaryBadge key={b} code={b} />)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Seasonal Banner ───────────────────────────────────────────────────── */
function SeasonalBanner() {
  const { seasonal } = useAdmin();
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const seasonEnd = seasonal.endsAt ? new Date(seasonal.endsAt) : (() => {
      const d = new Date(); d.setMonth(2, 20);
      if (d < new Date()) d.setFullYear(d.getFullYear() + 1);
      return d;
    })();

    const update = () => {
      const diff = Math.max(0, seasonEnd - new Date());
      setTimeLeft({ d: Math.floor(diff / 86400000), h: Math.floor((diff / 3600000) % 24), m: Math.floor((diff / 60000) % 60), s: Math.floor((diff / 1000) % 60) });
    };
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [seasonal.endsAt]);

  return (
    <section className="relative py-20 md:py-44 px-5 md:px-12 text-center" aria-label="Seasonal special">
      {/* Background atmosphere */}
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: seasonal.image ? `url('${seasonal.image}')` : "none", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }} />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(56,68,22,0.35)_0%,rgba(26,21,16,0.95)_100%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(56,68,22,0.25)_0%,rgba(15,13,10,0.95)_100%)]" />

      <Reveal>
        <div className="relative z-10 max-w-[700px] mx-auto">
          <div className="label text-green">{seasonal.badge || "Seasonal Special"}</div>
          <h2 className="font-display text-[clamp(32px,6vw,64px)] font-bold text-white dark:text-cream mb-4 leading-[1.05] tracking-[-0.02em]">
            {seasonal.title}
          </h2>
          <div className="font-display text-2xl text-caramel mb-10">{seasonal.price} · Available Now</div>
          <p className="text-white/40 dark:text-dark-muted text-[16px] max-w-[480px] mx-auto mb-12 leading-[1.8] tracking-[0.005em]">{seasonal.desc}</p>

          <div className="flex flex-wrap gap-3 sm:gap-5 justify-center mb-12" role="timer" aria-label="Time remaining for seasonal special">
            {[
              { v: timeLeft.d, l: "Days" },
              { v: timeLeft.h, l: "Hrs" },
              { v: timeLeft.m, l: "Min" },
              { v: timeLeft.s, l: "Sec" },
            ].map(({ v, l }) => (
              <div key={l} className="glass rounded-2xl px-5 py-4 sm:px-7 sm:py-5 text-center min-w-[56px] sm:min-w-[76px]" style={{ animation: "glow-pulse 3s ease-in-out infinite" }}>
                <div className="font-display text-2xl sm:text-4xl font-bold text-white dark:text-cream leading-none tabular-nums">{String(v).padStart(2, "0")}</div>
                <div className="font-label text-[8px] sm:text-[9px] tracking-[0.3em] text-white/35 dark:text-dark-muted uppercase mt-2">{l}</div>
              </div>
            ))}
          </div>

          <a href="/menu" className="btn-primary">See Full Menu</a>
        </div>
      </Reveal>
    </section>
  );
}

/* ── Map Section ─────────────────────────────────────────────────────────── */
function MapSection() {
  const { locations } = useAdmin();
  const loc = locations[0];

  return (
    <section className="bg-parchment/40 dark:bg-dark-surface" aria-label="Find us location">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] min-h-[500px] md:min-h-[600px]">
        <Reveal>
          <div className="bg-parchment/60 dark:bg-dark-card backdrop-blur-sm p-8 md:p-16 md:pr-20 flex flex-col justify-center">
            <div className="label text-caramel">Find Us</div>
            <h2 className="font-display text-[clamp(32px,5vw,64px)] font-bold text-brown dark:text-cream leading-[1.05] mb-10 tracking-[-0.02em]">
              Visit Our
              <br />
              <span className="text-caramel">Space</span>
            </h2>

            <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm rounded-2xl p-5 mb-4 flex gap-4 border-l-[3px] border-l-caramel shadow-sm">
              <span className="material-symbols-outlined text-2xl text-caramel mt-0.5 shrink-0" aria-hidden="true">location_on</span>
              <div>
                <div className="font-display text-lg font-semibold text-brown dark:text-cream">{loc.name}</div>
                <div className="font-body text-[14px] text-steam/80 dark:text-dark-muted mt-1 leading-relaxed">{loc.address}</div>
                <div className="font-body text-[12px] text-caramel/80 mt-1 tracking-wide leading-relaxed">{loc.hours}</div>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-dark-bg/50 backdrop-blur-sm rounded-2xl p-5 mb-10 flex gap-4 shadow-sm">
              <span className="material-symbols-outlined text-2xl text-caramel mt-0.5 shrink-0" aria-hidden="true">wifi</span>
              <div>
                <div className="font-label text-[9px] tracking-[0.3em] text-caramel/80 uppercase mb-1">Amenities</div>
                <div className="font-body text-[14px] text-brown/80 dark:text-dark-muted leading-relaxed">Free Wi-Fi · Outdoor Seating · Takeaway</div>
              </div>
            </div>

            <a href="/locations" className="btn-primary self-start">View Location →</a>
          </div>
        </Reveal>
        <Reveal delay={2}>
          <div className="overflow-hidden relative min-h-[300px] md:min-h-0">
            <iframe title={loc.name} src={loc.mapSrc} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full min-h-[300px] md:min-h-[440px] border-0 block sepia-[0.12] contrast-[0.95]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── Testimonials ───────────────────────────────────────────────────────── */
function Testimonials() {
  const { testimonials } = useAdmin();
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => { setIdx((i) => (i + 1) % testimonials.length); setAnimating(false); }, 400);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section className="relative bg-cream dark:bg-dark-bg py-20 md:py-40 px-5 md:px-12 text-center overflow-hidden" aria-label="Guest testimonials">
      {/* Subtle warm radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(192,125,58,0.06)_0%,transparent_65%)] dark:bg-[radial-gradient(circle_at_50%_30%,rgba(192,125,58,0.04)_0%,transparent_65%)]" />

      <div className="relative max-w-[800px] mx-auto">
        <Reveal>
          <div className="label justify-center text-caramel">Guest Stories</div>
        </Reveal>
        {/* Large decorative quote */}
        <div className="font-display text-[120px] md:text-[140px] leading-[0.6] text-caramel/[0.08] mb-[-20px] select-none pointer-events-none" aria-hidden="true">"</div>
        <blockquote className={`font-display text-[clamp(20px,3.5vw,34px)] italic text-brown dark:text-cream leading-snug mb-8 transition-all duration-500 ${animating ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"}`}>
          {testimonials[idx].text}
        </blockquote>
        <cite className={`inline-block font-body text-[12px] tracking-[0.22em] text-steam/70 dark:text-dark-muted uppercase not-italic transition-all duration-500 ${animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
          — {testimonials[idx].author}
        </cite>
        <div className="flex gap-3 justify-center mt-14" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setAnimating(true); setTimeout(() => { setIdx(i); setAnimating(false); }, 400); }}
              className={`w-2.5 h-2.5 rounded-full border-none cursor-pointer transition-all duration-300 ${
                idx === i ? "bg-caramel scale-125" : "bg-parchment dark:bg-dark-border hover:bg-caramel/40"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-selected={idx === i}
              role="tab"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div>
      <Hero />
      <BrandMarquee />
      <Philosophy />
      <OurStory />
      <PhotoGallery />
      <BrandMarquee />
      <MenuPreview />
      <SeasonalBanner />
      <MapSection />
      <Testimonials />
    </div>
  );
}
