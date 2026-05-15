import { useState } from "react";

export default function ProgressiveImage({ src, alt, className = "", style }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden bg-parchment" style={style}>
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-500 ${
          loaded ? "blur-0 saturate-100 opacity-100 scale-100" : "blur-xl saturate-50 opacity-70 scale-105"
        } ${className}`}
      />
    </div>
  );
}