import { LOCATIONS } from "../data/index.js";
import "../styles/LocationsPage.css";

export default function LocationsPage() {
  const loc = LOCATIONS[0];

  return (
    <div className="page locations-page">
      {/* Hero */}
      <div className="loc-hero">
        <div className="loc-hero-content">
          <div className="section-label">Where to Find Us</div>
          <h1 className="section-title">Our Location</h1>
          <p className="loc-hero-desc">
            Come visit us in person and experience the atmosphere, the craft,
            and the coffee that defines Erlbrew.
          </p>
        </div>
      </div>

      {/* Single Location — split layout */}
      <div className="loc-single-grid">
        {/* Info Panel */}
        <div className="loc-single-info">
          <div className="section-label" style={{ marginBottom: 12 }}>Flagship Location</div>
          <h2 className="loc-single-name">{loc.name}</h2>

          <div className="loc-detail-row">
            <span className="material-symbols-outlined loc-detail-icon">location_on</span>
            <div>
              <div className="loc-detail-label">Address</div>
              <div className="loc-detail-value">{loc.address}</div>
            </div>
          </div>

          <div className="loc-detail-row">
            <span className="material-symbols-outlined loc-detail-icon">schedule</span>
            <div>
              <div className="loc-detail-label">Hours (Taipei Standard Time)</div>
              <div className="loc-detail-value">Mon – Fri &nbsp; 6:00 AM – 9:00 PM TST</div>
              <div className="loc-detail-value">Sat – Sun &nbsp; 7:00 AM – 10:00 PM TST</div>
            </div>
          </div>

          <div className="loc-detail-row">
            <span className="material-symbols-outlined loc-detail-icon">public</span>
            <div>
              <div className="loc-detail-label">Timezone</div>
              <div className="loc-detail-value">UTC+8 · Taipei Standard Time (TST)</div>
            </div>
          </div>

          <div className="loc-detail-row">
            <span className="material-symbols-outlined loc-detail-icon">wifi</span>
            <div>
              <div className="loc-detail-label">Amenities</div>
              <div className="loc-detail-value">Free Wi-Fi · Outdoor Seating · Takeaway</div>
            </div>
          </div>

          <button
            className="loc-directions-btn"
            onClick={() =>
              window.open(
                "https://www.google.com/maps/place/Wash+'n+Spices+Auto+Oasis/@14.4102166,120.9009586,17z",
                "_blank"
              )
            }
          >
            <span className="material-symbols-outlined">directions</span>
            Get Directions
          </button>
        </div>

        {/* Map Panel */}
        <div className="loc-single-map">
          <iframe
            title={loc.name}
            src={loc.mapSrc}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Full-width photo strip */}
      <div className="loc-photo-strip">
        {[
          { src: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800&q=80", label: "The Space" },
          { src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", label: "At the Bar" },
          { src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80", label: "The Ritual" },
        ].map((img, i) => (
          <div className="loc-photo-item" key={i}>
            <img src={img.src} alt={img.label} />
            <div className="loc-photo-label">{img.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
