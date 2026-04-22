import "../styles/Footer.css";

export default function Footer({ setPage }) {
  const navigate = (id) => {
    setPage(id);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* Brand */}
        <div>
          <div className="footer-brand">Erlbrew Café</div>
          <p className="footer-tagline">
            Crafting exceptional coffee experiences for the local community since 2026.
          </p>
        </div>

        {/* Experience */}
        <div>
          <div className="footer-heading">Experience</div>
          <ul className="footer-links">
            <li><button onClick={() => navigate("home")}>Our Story</button></li>
            <li><button onClick={() => {}}>Sourcing</button></li>
            <li><button onClick={() => {}}>Brewing Guides</button></li>
            <li><button onClick={() => navigate("locations")}>Locations</button></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <div className="footer-heading">Connect</div>
          <ul className="footer-links">
            <li><button>Instagram</button></li>
            <li><button>Newsletter</button></li>
            <li><button>Wholesale</button></li>
            <li><button>Careers</button></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <div className="footer-heading">Newsletter</div>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginBottom: 16 }}>
            Get brewing tips and seasonal updates.
          </p>
          <div className="footer-newsletter">
            <input type="email" placeholder="Email address" />
            <button className="material-symbols-outlined">arrow_forward</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Erlbrew Café. All rights reserved.</span>
        <div className="footer-legal">
          <button>Privacy Policy</button>
          <button>Terms of Service</button>
        </div>
      </div>
    </footer>
  );
}
