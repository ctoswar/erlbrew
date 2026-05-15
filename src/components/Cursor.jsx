import { useEffect, useRef, useState, useCallback } from "react";

function CoffeeCupSVG() {
  return (
    <svg width="42" height="52" viewBox="0 0 42 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path className="cursor-steam-1" d="M12 10 C11 7, 13 5, 12 2" stroke="#C07D3A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path className="cursor-steam-2" d="M20 9 C19 6, 21 4, 20 1" stroke="#C07D3A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        <path className="cursor-steam-3" d="M28 10 C27 7, 29 5, 28 2" stroke="#C07D3A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      </g>
      <path d="M6 14 L8 44 Q8.5 47 12 47 L30 47 Q33.5 47 34 44 L36 14 Z" fill="#3A2010" stroke="#6B3B1C" strokeWidth="1" />
      <ellipse cx="21" cy="17" rx="14" ry="3.5" fill="#C07D3A" opacity="0.9" />
      <path d="M15 17 Q18 15, 21 17 Q24 19, 27 17" stroke="#EDE5D4" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.6" />
      <ellipse cx="21" cy="14" rx="15" ry="3" fill="#4E3629" stroke="#6B3B1C" strokeWidth="0.8" />
      <path d="M34 22 Q44 22, 44 30 Q44 38, 34 38" stroke="#4E3629" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M34 22 Q41 22, 41 30 Q41 38, 34 38" stroke="#6B3B1C" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <ellipse cx="21" cy="47" rx="17" ry="3.5" fill="#4E3629" stroke="#6B3B1C" strokeWidth="0.8" />
      <ellipse cx="21" cy="47" rx="13" ry="2" fill="#3A2010" opacity="0.6" />
      <path d="M11 20 Q12 28, 11.5 36" stroke="rgba(255,255,255,0.12)" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export default function Cursor() {
  const wrapperRef = useRef(null);
  const dotRef = useRef(null);
  const rippleRef = useRef(null);
  const posRef = useRef({ x: -200, y: -200 });
  const dotPosRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const animateDot = useCallback(() => {
    const target = posRef.current;
    const current = dotPosRef.current;
    current.x += (target.x - current.x) * 0.18;
    current.y += (target.y - current.y) * 0.18;
    if (dotRef.current) {
      dotRef.current.style.left = `${current.x}px`;
      dotRef.current.style.top = `${current.y}px`;
    }
    rafRef.current = requestAnimationFrame(animateDot);
  }, []);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover)");
    setIsDesktop(mql.matches);
    if (!mql.matches) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (wrapperRef.current) {
        wrapperRef.current.style.left = `${e.clientX}px`;
        wrapperRef.current.style.top = `${e.clientY}px`;
      }
    };
    const CLICKABLE = 'a, button, [role="button"], input, select, textarea, label, [tabindex]';
    const onOver = (e) => { if (e.target.closest(CLICKABLE)) setHovering(true); };
    const onOut = (e) => { if (e.target.closest(CLICKABLE)) setHovering(false); };
    const onClick = (e) => {
      if (!rippleRef.current) return;
      const r = rippleRef.current;
      r.classList.remove("pop");
      void r.offsetWidth;
      r.style.left = `${e.clientX}px`;
      r.style.top = `${e.clientY}px`;
      r.classList.add("pop");
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.addEventListener("click", onClick, { passive: true });
    rafRef.current = requestAnimationFrame(animateDot);

    const handleChange = (e) => setIsDesktop(e.matches);
    mql.addEventListener("change", handleChange);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafRef.current);
      mql.removeEventListener("change", handleChange);
    };
  }, [animateDot]);

  if (!isDesktop) return null;

  return (
    <>
      <div ref={wrapperRef} className={`fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform ${hovering ? "hovering" : ""}`}>
        <div className={`absolute transition-transform duration-75 ease-out ${hovering ? "translate-x-[-8px] translate-y-[-38px] rotate-[12deg] scale-110 drop-shadow-[0_4px_12px_rgba(192,125,58,0.5)]" : "translate-x-[-8px] translate-y-[-38px] drop-shadow-[0_2px_6px_rgba(58,32,16,0.35)]"}`}>
          <CoffeeCupSVG />
        </div>
      </div>
      <div ref={dotRef} className={`fixed pointer-events-none z-[99998] w-1.5 h-1.5 rounded-full bg-caramel/60 transition-all duration-200 ${hovering ? "opacity-0 scale-0" : ""}`} />
      <div ref={rippleRef} className="cursor-ripple" />
    </>
  );
}