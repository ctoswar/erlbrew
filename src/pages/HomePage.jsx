import { useState, useEffect } from "react";
import {
  MENU_DATA,
  LOCATIONS,
  TESTIMONIALS,
  GALLERY_IMAGES,
  FEATURES,
} from "../data/index.js";
import "../styles/HomePage.css";

// ── Video Hero ────────────────────────────────────────────────────────────
function Hero({ setPage }) {
  return (
    <section className="hero">
      {/* Fallback background image (shown if video fails / slow load) */}
      <div className="hero-fallback" />

      {/* Actual video */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=80"
      >
        {/*
          Replace src below with your own hosted .mp4 for production.
          Using a public royalty-free coffee video for demo purposes.
        */}
        <source
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          type="video/mp4"
        />
      </video>

      <div className="hero-overlay" />

      <div className="hero-content">
        <div className="hero-eyebrow">Established 2026 · Artisanal Coffee</div>

        <h1 className="hero-title">
          Where Every<br />Cup is <em>Ritual</em>
        </h1>

        <p className="hero-sub">
          From the gentle morning pour-over to the deep resonance of our
          signature espresso — every cup is a journey through origin and craftsmanship.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => setPage("menu")}>
            Explore Our Menu
          </button>
          <button className="btn-ghost" onClick={() => setPage("locations")}>
            Find a Location
          </button>
        </div>
      </div>

      <div className="hero-scroll">
        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
          keyboard_arrow_down
        </span>
        Scroll
      </div>
    </section>
  );
}

// ── Features Strip ────────────────────────────────────────────────────────
function FeaturesStrip() {
  return (
    <div className="features-row">
      {FEATURES.map((f, i) => (
        <div className="feature-card" key={i}>
          <div className="feature-icon material-symbols-outlined">{f.icon}</div>
          <div className="feature-title">{f.title}</div>
          <p className="feature-body">{f.body}</p>
        </div>
      ))}
    </div>
  );
}

// ── Story ─────────────────────────────────────────────────────────────────
function OurStory({ setPage }) {
  return (
    <section className="section">
      <div className="story-grid">
        <div className="story-img">
          <img
            src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80"
            alt="Barista carefully crafting a pour-over coffee"
          />
          <div className="story-badge">Est. 2026</div>
        </div>
        <div>
          <div className="section-label">Our Story</div>
          <h2 className="section-title">Brewed with Intention,<br />Served with Soul</h2>
          <p className="section-sub story-text">
            Erlbrew was born from a simple belief: exceptional coffee should be
            accessible, unhurried, and deeply considered. We built our first café
            as a sanctuary — away from the noise, toward the ritual.
          </p>
          <p
            className="section-sub story-text"
            style={{ maxWidth: "none", marginBottom: 36 }}
          >
            Today we operate our flagship location in New York, designed
            to feel like a room you never want to leave. The menu rotates. The
            music is curated. The coffee is always extraordinary.
          </p>
          <button
            className="btn-primary"
            style={{ fontSize: 12 }}
            onClick={() => setPage("menu")}
          >
            View Full Menu
          </button>
        </div>
      </div>
    </section>
  );
}

// ── Photo Gallery ─────────────────────────────────────────────────────────
function PhotoGallery() {
  return (
    <div className="gallery-strip">
      {GALLERY_IMAGES.map((img, i) => (
        <div className="gallery-item" key={i}>
          <img src={img.src} alt={img.label} />
          <div className="gallery-item-overlay">
            <span className="gallery-item-label">{img.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Menu Preview ──────────────────────────────────────────────────────────
function MenuPreview({ setPage }) {
  const [activeTab, setActiveTab] = useState("brews");

  const tabs = [
    { id: "brews",    label: "Signature Brews" },
    { id: "espresso", label: "Espresso" },
    { id: "pastries", label: "Pastries" },
  ];

  return (
    <section className="menu-section">
      <div className="menu-inner">
        <div className="section-label">The Menu</div>
        <div className="menu-header-row">
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Handcrafted<br />with Care
          </h2>
          <button className="btn-ghost" onClick={() => setPage("menu")}>
            Full Menu →
          </button>
        </div>

        <div className="menu-tabs">
          {tabs.map((t) => (
            <button
              key={t.id}
              className={`menu-tab${activeTab === t.id ? " active" : ""}`}
              onClick={() => setActiveTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="menu-grid">
          {MENU_DATA[activeTab].map((item, i) => (
            <div className="menu-card" key={i}>
              <div className="menu-card-img">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="menu-card-tag">{item.tag}</div>
              <div className="menu-card-name">{item.name}</div>
              <div className="menu-card-desc">{item.desc}</div>
              <div className="menu-card-footer">
                <span className="menu-card-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Seasonal Banner ───────────────────────────────────────────────────────
function SeasonalBanner({ setPage }) {
  return (
    <section className="seasonal">
      <div className="seasonal-label">Seasonal Special</div>
      <h2 className="seasonal-title">Winter Spiced Bourbon Latte</h2>
      <div className="seasonal-price">$7.50 · Available Now</div>
      <p className="seasonal-desc">
        House-infused bourbon syrup, star anise, orange zest, and our 'Heritage'
        espresso. A cup for the cold months.
      </p>
      <button className="btn-primary" onClick={() => setPage("menu")}>
        See Full Menu
      </button>
    </section>
  );
}

// ── Map Section ───────────────────────────────────────────────────────────
function MapSection({ setPage }) {
  const loc = LOCATIONS[0];

  return (
    <section>
      <div className="map-grid">
        <div className="map-info">
          <div className="section-label">Find Us</div>
          <h2 className="section-title">
            Visit Our<br />Space
          </h2>
          <div
            className="location-item selected"
            style={{ cursor: "default", marginBottom: 36 }}
          >
            <span className="location-icon material-symbols-outlined">
              location_on
            </span>
            <div>
              <div className="location-name">{loc.name}</div>
              <div className="location-addr">{loc.address}</div>
              <div className="location-hours">{loc.hours}</div>
            </div>
          </div>
          <button
            className="btn-primary"
            style={{ alignSelf: "flex-start", fontSize: 12 }}
            onClick={() => setPage("locations")}
          >
            View Location →
          </button>
        </div>

        <div className="map-embed">
          <iframe
            title={loc.name}
            src={loc.mapSrc}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────
function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIdx((i) => (i + 1) % TESTIMONIALS.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="testimonials">
      <div className="testimonials-inner">
        <div
          className="section-label"
          style={{ textAlign: "center", marginBottom: 8 }}
        >
          Guest Stories
        </div>
        <div className="quote-mark">"</div>
        <p className="quote-text">{TESTIMONIALS[idx].text}</p>
        <span className="quote-author">— {TESTIMONIALS[idx].author}</span>
        <div className="testimonial-dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`dot${idx === i ? " active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function HomePage({ setPage }) {
  return (
    <div className="page">
      <Hero setPage={setPage} />
      <FeaturesStrip />
      <OurStory setPage={setPage} />
      <PhotoGallery />
      <MenuPreview setPage={setPage} />
      <SeasonalBanner setPage={setPage} />
      <MapSection setPage={setPage} />
      <Testimonials />
    </div>
  );
}
