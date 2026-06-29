import { useState } from "react";
import { clinic } from "../../clinicInfo";

interface LogoProps {
  /** Show the wordmark text next to the emblem (used by the fallback). */
  showText?: boolean;
  /** Emblem height in pixels. */
  size?: number;
  className?: string;
}

/**
 * Brand mark for the clinic.
 *
 * Renders the uploaded crest from `public/logo.png`. The logo art is gold on a
 * black field, so `mix-blend-screen` lets the black background drop out cleanly
 * against the site's dark theme. If the image is missing, it falls back to a
 * gold tooth emblem + serif wordmark so the UI never shows a broken image.
 */
export default function Logo({ showText = true, size = 40, className = "" }: LogoProps) {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <span className={`inline-flex items-center gap-2.5 ${className}`}>
        <img
          src={clinic.logo}
          alt={clinic.name}
          height={size}
          style={{ height: size }}
          onError={() => setImgError(true)}
          className="w-auto object-contain mix-blend-screen select-none shrink-0"
        />
        {showText && (
          <span className="flex flex-col leading-none">
            <span className="font-sans text-[8px] md:text-[9px] tracking-[0.25em] text-on-surface-variant uppercase mb-0.5">
              {clinic.eyebrow}
            </span>
            <span className="font-serif text-lg md:text-xl text-primary font-bold tracking-tight">
              {clinic.shortName}
            </span>
          </span>
        )}
      </span>
    );
  }

  // Fallback: gold tooth emblem + serif wordmark.
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        role="img"
        aria-label={clinic.name}
        className="shrink-0"
      >
        <defs>
          <linearGradient id="logo-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#f2ca50" />
            <stop offset="1" stopColor="#d4af37" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="#1a1a1a" />
        <rect
          x="1.5"
          y="1.5"
          width="61"
          height="61"
          rx="14.5"
          fill="none"
          stroke="url(#logo-gold)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <path
          transform="translate(20 16)"
          fill="url(#logo-gold)"
          d="M12 0C8.5 0 7 2 5.5 2 4 2 3 1 2.6 2.2 2 4 3 7 3.8 10.5 4.3 12.7 4.3 15 5.2 17.5 5.7 19 6.3 20 7.2 20 8.3 20 8.6 18 9.2 15.7 9.6 14 10.7 13 12 13c1.3 0 2.4 1 2.8 2.7.6 2.3 1.2 4.3 2.3 4.3.9 0 1.5-1 2-2.5C20 15.3 20 13 20.5 10.8 21.3 7.3 22.3 4 21.7 2.2 21.3 1 20.3 2 18.8 2 17.3 2 15.5 0 12 0Z"
        />
      </svg>
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-lg md:text-xl text-primary font-bold tracking-tight">
            {clinic.shortName}
          </span>
          <span className="font-sans text-[8px] md:text-[9px] tracking-[0.25em] text-on-surface-variant uppercase mt-0.5">
            {clinic.eyebrow}
          </span>
        </span>
      )}
    </span>
  );
}
