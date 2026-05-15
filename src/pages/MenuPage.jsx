import { useAdmin } from "../context/AdminContext.jsx";
import { MENU_CATEGORIES } from "../data/index.js";
import Reveal from "../components/Reveal.jsx";
import DietaryBadge from "../components/DietaryBadge.jsx";

function MenuSection({ icon, label, items }) {
  return (
    <div>
      <div className="flex items-center gap-4 pb-4 mb-7 border-b-2 border-parchment/80">
        <div className="w-11 h-11 rounded-2xl glass-light flex items-center justify-center">
          <span className="material-symbols-outlined text-caramel text-xl">{icon}</span>
        </div>
        <h3 className="font-display text-2xl md:text-[28px] font-bold text-brown tracking-[-0.01em]">{label}</h3>
      </div>
      {items.map((item, i) => (
        <Reveal key={i} delay={Math.min(i + 1, 4)}>
          <div className="glass-card-light bg-white/40 p-5 rounded-2xl mb-3 flex gap-4 md:gap-5 group hover:bg-white/70">
            <div className="w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-xl shrink-0">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 mb-1.5">
                <h4 className="font-display text-[17px] md:text-lg font-semibold text-brown truncate">{item.name}</h4>
                <div className="flex-1 border-b-2 border-dotted border-brown/10 mb-[3px] min-w-[20px]" />
                <span className="font-display text-[15px] md:text-base text-caramel font-semibold whitespace-nowrap">{item.price}</span>
              </div>
              <p className="font-body text-[13px] md:text-sm text-steam/80 leading-[1.55]">{item.desc}</p>
              {item.badges && (
                <div className="flex gap-1.5 mt-2.5">
                  {item.badges.map((b) => <DietaryBadge key={b} code={b} />)}
                </div>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function MenuPage() {
  const { menuData } = useAdmin();

  const allSections = [
    ...MENU_CATEGORIES.map((c) => ({ ...c, items: menuData[c.key] })),
    { key: "handpoured", icon: "water_drop", label: "Hand-poured Selection", items: menuData.handpoured },
  ];

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-espresso" />
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.08]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=60')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-espresso via-transparent to-espresso" />
        <div className="relative z-10 py-20 md:py-28 px-5 md:px-12 text-center">
          <Reveal>
            <div className="label text-caramel justify-center">Erlbrew Café</div>
            <h1 className="font-display text-[clamp(40px,5.5vw,68px)] font-bold text-white leading-[1.05] tracking-[-0.02em]">The Full Menu</h1>
            <p className="text-white/40 italic text-[17px] max-w-[560px] mx-auto mt-5 leading-[1.75]">
              From the gentle morning pour-over to the deep resonance of our signature espresso — every cup is a journey through origin and craftsmanship.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Image Strip */}
      <div className="grid grid-cols-3 gap-[2px]">
        {[
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80",
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80",
          "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=700&q=80",
        ].map((src, i) => (
          <div key={i} className="overflow-hidden aspect-video">
            <img src={src} alt="Erlbrew café atmosphere" className="w-full h-full object-cover brightness-[0.82] saturate-[0.85] transition-transform duration-600 hover:scale-[1.04]" />
          </div>
        ))}
      </div>

      {/* Menu Body */}
      <div className="max-w-[1360px] mx-auto px-5 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        {allSections.map((s) => (
          <MenuSection key={s.key} icon={s.icon} label={s.label} items={s.items || []} />
        ))}
      </div>
    </div>
  );
}