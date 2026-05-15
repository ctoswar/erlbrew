import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import "./styles/index.css";

import { AdminProvider } from "./context/AdminContext.jsx";

import Navbar    from "./components/Navbar.jsx";
import MobileNav from "./components/MobileNav.jsx";
import Footer    from "./components/Footer.jsx";
import Cursor    from "./components/Cursor.jsx";

import HomePage      from "./pages/HomePage.jsx";
import MenuPage      from "./pages/MenuPage.jsx";
import LocationsPage from "./pages/LocationsPage.jsx";
import AdminPage     from "./pages/AdminPage.jsx";

export default function App() {
  const location = useLocation();
  const [transitionKey, setTransitionKey] = useState(0);
  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    setTransitionKey((k) => k + 1);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AdminProvider>
      <div className="grain-overlay">
        {!isAdmin && <Cursor />}
        {!isAdmin && <Navbar />}

        <main key={transitionKey} style={{ animation: "page-slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}>
          <Routes>
            <Route path="/"         element={<HomePage />} />
            <Route path="/menu"     element={<MenuPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/admin/*"  element={<AdminPage />} />
          </Routes>
        </main>

        {!isAdmin && <Footer />}
        {!isAdmin && <MobileNav />}
      </div>
    </AdminProvider>
  );
}