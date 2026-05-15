import { useEffect, useRef, useState } from "react";

export function useScrollReveal(options = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -60px 0px" } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}

export default function Reveal({ children, className = "", delay = 0 }) {
  const [ref, isVisible] = useScrollReveal();
  const delayClass = delay > 0 && delay <= 5 ? `delay-${delay * 100}` : "";

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${delayClass}`}
      style={delay > 0 ? { transitionDelay: `${delay * 100}ms` } : {}}
    >
      {children}
    </div>
  );
}