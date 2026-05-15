import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  MENU_DATA as DEFAULT_MENU,
  HAND_POURED as DEFAULT_HAND_POURED,
  LOCATIONS as DEFAULT_LOCATIONS,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  GALLERY_IMAGES as DEFAULT_GALLERY,
  FEATURES as DEFAULT_FEATURES,
  SEASONAL as DEFAULT_SEASONAL,
} from "../data/index.js";

const AdminContext = createContext(null);

const STORAGE_KEY = "erlbrew_admin_data";

function loadData() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return null;
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* ignore */ }
}

export function AdminProvider({ children }) {
  const [menuData, setMenuData] = useState(() => loadData()?.menuData ?? DEFAULT_MENU);
  const [handPoured, setHandPoured] = useState(() => loadData()?.handPoured ?? DEFAULT_HAND_POURED);
  const [galleryImages, setGalleryImages] = useState(() => loadData()?.galleryImages ?? DEFAULT_GALLERY);
  const [seasonal, setSeasonal] = useState(() => loadData()?.seasonal ?? DEFAULT_SEASONAL);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const ADMIN_PASSWORD = "erlbrew2026";

  const login = useCallback((pwd) => {
    if (pwd === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  // Persist on change
  useEffect(() => {
    saveData({ menuData, handPoured, galleryImages, seasonal });
  }, [menuData, handPoured, galleryImages, seasonal]);

  // ── Menu CRUD ──
  const updateMenuCategory = useCallback((category, items) => {
    setMenuData((prev) => ({ ...prev, [category]: items }));
  }, []);

  const addMenuItem = useCallback((category, item) => {
    setMenuData((prev) => ({
      ...prev,
      [category]: [...(prev[category] || []), item],
    }));
  }, []);

  const updateMenuItem = useCallback((category, index, item) => {
    setMenuData((prev) => {
      const items = [...(prev[category] || [])];
      items[index] = item;
      return { ...prev, [category]: items };
    });
  }, []);

  const deleteMenuItem = useCallback((category, index) => {
    setMenuData((prev) => {
      const items = (prev[category] || []).filter((_, i) => i !== index);
      return { ...prev, [category]: items };
    });
  }, []);

  // ── Gallery CRUD ──
  const addGalleryImage = useCallback((img) => {
    setGalleryImages((prev) => [...prev, img]);
  }, []);

  const updateGalleryImage = useCallback((index, img) => {
    setGalleryImages((prev) => {
      const next = [...prev];
      next[index] = img;
      return next;
    });
  }, []);

  const deleteGalleryImage = useCallback((index) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // ── Seasonal ──
  const updateSeasonal = useCallback((data) => {
    setSeasonal((prev) => ({ ...prev, ...data }));
  }, []);

  // ── Reset ──
  const resetAll = useCallback(() => {
    setMenuData(DEFAULT_MENU);
    setHandPoured(DEFAULT_HAND_POURED);
    setGalleryImages(DEFAULT_GALLERY);
    setSeasonal(DEFAULT_SEASONAL);
  }, []);

  const value = {
    // Public data
    menuData,
    handPoured,
    galleryImages,
    seasonal,
    locations: DEFAULT_LOCATIONS,
    testimonials: DEFAULT_TESTIMONIALS,
    features: DEFAULT_FEATURES,

    // Admin
    isAuthenticated,
    login,
    logout,

    // Menu CRUD
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    updateMenuCategory,

    // Gallery CRUD
    addGalleryImage,
    updateGalleryImage,
    deleteGalleryImage,

    // Seasonal
    updateSeasonal,

    // Reset
    resetAll,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}