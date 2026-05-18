import { useAdmin } from "../context/AdminContext.jsx";
import Reveal from "../components/Reveal.jsx";

export default function LocationsPage() {
  const { locations } = useAdmin();
  const loc = locations[0];

  return (
    <div className="pt-[72px] pb-16 md:pb-24 dark:bg-dark-bg">
      {/* Hero */}
      <div className="relative overflow-hidden" aria-label="Locations page hero">
        <div className="absolute inset-0 bg-green dark:bg-dark-bg" />
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.1]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=60')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-green via-transparent to-green dark:from-dark-bg dark:via-transparent dark:to-dark-bg" />
        <div className="relative z-10 py-16 md:py-28 px-5 md:px-12 text-center">
          <Reveal>
            <div className="label text-green justify-center">Where to Find Us</div>
            <h1 className="font-display text-[clamp(36px,5.5vw,68px)] font-bold text-white leading-[1.05] tracking-[-0.02em]">Our Location</h1>
            <p className="text-white/40 dark:text-dark-muted text-[15px] sm:text-[17px] max-w-[480px] mx-auto mt-5 leading-[1.75]">
              Come visit us in person and experience the atmosphere, the craft, and the coffee that defines Erlbrew.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Location Split */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] min-h-[500px] md:min-h-[560px]">
        <Reveal>
          <div className="glass-light dark:bg-dark-card bg-parchment/50 backdrop-blur-2xl p-8 md:p-14 md:pr-16 flex flex-col justify-center">
            <div className="label text-caramel">Flagship Location</div>
            <h2 className="font-display text-[32px] md:text-[42px] font-bold text-brown dark:text-cream mb-10 leading-tight tracking-[-0.02em]">{loc.name}</h2>

            {[
              { icon: "location_on", label: "Address", value: loc.address },
              { icon: "schedule", label: "Hours (TST)", value: "Mon – Fri 6:00 AM – 9:00 PM\nSat – Sun 7:00 AM – 10:00 PM", multiline: true },
              { icon: "public", label: "Timezone", value: "UTC+8 · Taipei Standard Time" },
              { icon: "wifi", label: "Amenities", value: "Free Wi-Fi · Outdoor Seating · Takeaway" },
            ].map(({ icon, label, value, multiline }) => (
              <div key={label} className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-xl glass dark:bg-dark-bg/50 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-caramel" aria-hidden="true">{icon}</span>
                </div>
                <div>
                  <div className="font-label text-[9px] tracking-[0.3em] text-caramel/70 uppercase mb-1.5">{label}</div>
                  <div className="font-body text-[15px] text-brown/80 dark:text-dark-muted leading-relaxed whitespace-pre-line">{value}</div>
                </div>
              </div>
            ))}

            <a
              href="https://www.google.com/maps/place/Wash+'n+Spices+Auto+Oasis/@14.4102166,120.9009586,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-3 mt-2 bg-brown dark:bg-caramel text-white dark:text-ink border-none px-10 py-4 font-body text-[11px] font-semibold tracking-[0.16em] uppercase cursor-pointer transition-all duration-300 hover:bg-roast dark:hover:bg-caramel/90 hover:shadow-lg hover:shadow-brown/20 active:scale-[0.97] rounded-xl"
            >
              <span className="material-symbols-outlined text-lg" aria-hidden="true">directions</span>
              Get Directions
            </a>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div className="overflow-hidden">
            <iframe title={loc.name} src={loc.mapSrc} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full h-full min-h-[300px] md:min-h-[440px] border-0 block sepia-[0.12] contrast-[0.95]" />
          </div>
        </Reveal>
      </div>

      {/* Photo Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[2px]">
        {[
          { src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80", alt: "The interior space at Erlbrew café" },
          { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", alt: "Coffee being prepared at the bar" },
          { src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80", alt: "The ritual of pour-over coffee at Erlbrew" },
        ].map((img, i) => (
          <Reveal key={i} delay={i + 1}>
            <div className="relative aspect-video md:aspect-[16/10] overflow-hidden group">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover brightness-[0.82] saturate-[0.85] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" loading="lazy" />
              <div className="absolute bottom-0 left-0 right-0 py-7 px-8 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-display text-xl text-white/90 italic">{img.alt}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}