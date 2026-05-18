import { useState, useEffect } from "react";
import { useAdmin } from "../context/AdminContext.jsx";

export default function Lightbox({ initialIndex, onClose }) {
  const { galleryImages } = useAdmin();
  const [index, setIndex] = useState(initialIndex);
  const [closing, setClosing] = useState(false);

  useEffect(() => { setIndex(initialIndex); }, [initialIndex]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", handleKey); document.body.style.overflow = ""; };
  }, [index]);

  const handleClose = () => { setClosing(true); setTimeout(() => onClose(), 250); };
  const prev = () => setIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setIndex((i) => (i + 1) % galleryImages.length);
  const img = galleryImages[index];

  return (
    <div
      className={`fixed inset-0 z-[1000] flex items-center justify-center backdrop-blur-xl bg-ink/92 dark:bg-dark-bg/95 ${closing ? "animate-[lightbox-fade-out_0.25s_ease_forwards]" : "animate-[lightbox-fade-in_0.35s_ease_forwards]"}`}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      <button className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 rounded-full flex items-center justify-center border border-white/15 bg-white/8 text-white hover:bg-white/15 hover:border-caramel transition-all duration-200 font-material text-2xl" onClick={handleClose} aria-label="Close lightbox">close</button>
      <button className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 w-12 md:w-14 h-12 md:h-14 rounded-full flex items-center justify-center border border-white/12 bg-white/6 text-white hover:bg-white/12 hover:border-caramel transition-all duration-200 font-material text-[24px] md:text-[28px]" onClick={prev} aria-label="Previous image">chevron_left</button>
      <button className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 w-12 md:w-14 h-12 md:h-14 rounded-full flex items-center justify-center border border-white/12 bg-white/6 text-white hover:bg-white/12 hover:border-caramel transition-all duration-200 font-material text-[24px] md:text-[28px]" onClick={next} aria-label="Next image">chevron_right</button>

      <img src={img.src} alt={img.label} className="max-w-[min(90vw,1000px)] max-h-[80vh] object-contain rounded-sm animate-[lightbox-scale-in_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards] shadow-2xl" />

      <div className="absolute bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 font-label text-[11px] tracking-[0.3em] text-white/60 uppercase">{img.label}</div>
      <div className="absolute top-8 md:top-10 left-1/2 -translate-x-1/2 font-body text-[13px] text-white/40 tracking-wider">{index + 1} / {galleryImages.length}</div>
    </div>
  );
}