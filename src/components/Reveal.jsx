import { useEffect, useRef, useState } from "react";

export function useScrollReveal(options = {}) {
  const { threshold = 0.05, rootMargin = "0px 0px -40px 0px" } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let failsafe;
    let observer;

    const makeVisible = () => {
      setIsVisible(true);
      if (failsafe) clearTimeout(failsafe);
      if (observer) observer.disconnect();
    };

    const checkVisible = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        makeVisible();
        return true;
      }
      return false;
    };

    // Immediate viewport check: bypass IO/failsafe for elements already on screen
    if (checkVisible()) return;

    // Re-check after page-slide-in animation completes (0.5s + buffer)
    const recheckTimer = setTimeout(() => {
      if (checkVisible()) return;

      // Failsafe: force visible after 4s so content is never permanently hidden
      failsafe = setTimeout(() => makeVisible(), 4000);

      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            makeVisible();
          }
        },
        { threshold, rootMargin }
      );
      observer.observe(el);
    }, 600);

    return () => {
      if (observer) observer.disconnect();
      clearTimeout(failsafe);
      clearTimeout(recheckTimer);
    };
  }, [threshold, rootMargin]);

  return [ref, isVisible];
}

export default function Reveal({ children, className = "", delay = 0 }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} transition-opacity transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}
      style={delay > 0 ? { transitionDelay: `${delay * 100}ms` } : undefined}
    >
      {children}
    </div>
  );
}