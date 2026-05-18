import { useState, useRef, useEffect } from "react";

export default function ProgressiveImage({ src, alt, className = "", style }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className="relative overflow-hidden bg-parchment dark:bg-dark-surface h-full w-full" style={style}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 ${
          loaded ? "blur-0 saturate-100 opacity-100 scale-100" : "blur-xl saturate-50 opacity-70 scale-105"
        } ${className}`}
      />
    </div>
  );
}
