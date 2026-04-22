import { MENU_DATA, HAND_POURED } from "../data/index.js";
import "../styles/MenuPage.css";

const MENU_SECTIONS = [
  {
    key:   "brews",
    icon:  "auto_awesome",
    label: "Signature Brews",
    items: null, // filled from MENU_DATA
  },
  {
    key:   "espresso",
    icon:  "coffee_maker",
    label: "Espresso Classics",
    items: null,
  },
  {
    key:   "pastries",
    icon:  "bakery_dining",
    label: "Artisanal Pastries",
    items: null,
  },
  {
    key:   "handpoured",
    icon:  "water_drop",
    label: "Hand-poured Selection",
    items: HAND_POURED,
  },
];

function MenuSection({ icon, label, items }) {
  return (
    <div>
      <div className="full-menu-col-title">
        <span className="material-symbols-outlined">{icon}</span>
        {label}
      </div>
      {items.map((item, i) => (
        <div className="full-menu-item" key={i}>
          <div className="full-menu-item-img">
            <img src={item.img} alt={item.name} />
          </div>
          <div className="full-menu-item-info">
            <div className="full-menu-item-header">
              <span className="full-menu-item-name">{item.name}</span>
              <div className="full-menu-item-leader" />
              <span className="full-menu-item-price">{item.price}</span>
            </div>
            <p className="full-menu-item-desc">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function MenuPage() {
  return (
    <div className="page menu-page">
      {/* Hero */}
      <div className="menu-page-hero">
        <div className="menu-page-hero-content">
          <div className="section-label">Erlbrew Café</div>
          <h1 className="section-title">The Full Menu</h1>
          <p className="menu-page-hero-desc">
            From the gentle morning pour-over to the deep resonance of our
            signature espresso — every cup is a journey through origin and craftsmanship.
          </p>
        </div>
      </div>

      {/* Hero image strip */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 3,
          maxHeight: 260,
          overflow: "hidden",
        }}
      >
        {[
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=700&q=80",
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&q=80",
          "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=700&q=80",
        ].map((src, i) => (
          <div
            key={i}
            style={{ overflow: "hidden", aspectRatio: "16/9" }}
          >
            <img
              src={src}
              alt="Erlbrew café atmosphere"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "brightness(0.85) saturate(0.9)",
              }}
            />
          </div>
        ))}
      </div>

      {/* Menu body */}
      <div className="full-menu-body">
        {MENU_SECTIONS.map((s) => (
          <MenuSection
            key={s.key}
            icon={s.icon}
            label={s.label}
            items={s.items ?? MENU_DATA[s.key]}
          />
        ))}
      </div>
    </div>
  );
}
