import { useState } from "react";

import "./styles/globals.css";

import Navbar        from "./components/Navbar.jsx";
import MobileNav     from "./components/MobileNav.jsx";
import Footer        from "./components/Footer.jsx";
import Cursor        from "./components/Cursor.jsx";

import HomePage      from "./pages/HomePage.jsx";
import MenuPage      from "./pages/MenuPage.jsx";
import LocationsPage from "./pages/LocationsPage.jsx";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      <Cursor />
      <Navbar page={page} setPage={setPage} />

      {page === "home"      && <HomePage      setPage={setPage} />}
      {page === "menu"      && <MenuPage />}
      {page === "locations" && <LocationsPage />}

      <Footer setPage={setPage} />
      <MobileNav page={page} setPage={setPage} />
    </>
  );
}
