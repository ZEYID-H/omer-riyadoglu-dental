/**
 * Central clinic identity & contact configuration.
 *
 * This is the single source of truth for the clinic brand. Update the values
 * below when verified details become available. Fields that could not be
 * publicly verified are intentionally left as clear placeholders rather than
 * invented data.
 *
 * To swap in the real phone number, set `whatsapp` and `phone` below.
 */

// WhatsApp number used for chat links. Digits only, with country code, no "+".
export const CLINIC_WHATSAPP_NUMBER = "905344500251";

export const clinic = {
  name: "Diş Hekimi Ömer Riyadoğlu",
  shortName: "Ömer Riyadoğlu",
  eyebrow: "Diş Hekimi",
  tagline: "Mindmade With Care",
  doctor: "Dr. Ömer Riyadoğlu",

  // Logo image (uploaded crest in public/, optimized WebP ~16KB). The <Logo>
  // component falls back to a gold wordmark if this file is missing.
  // logo.png (optimized) is kept for social/OG scrapers in index.html.
  logo: "/logo.webp",

  // Verified public location (source: Google Maps listing).
  city: "Avcılar",
  region: "İstanbul",
  country: "Türkiye",
  countryCode: "TR",

  addressFull: "Tahtakale, Ispartakule Blv. No: 23, 34320 Avcılar/İstanbul",
  phoneDisplay: "0534 450 02 51",
  whatsapp: CLINIC_WHATSAPP_NUMBER,
  email: "riyadoglu@outlook.com",
  website: "https://omerriyadoglu.com",

  // Google Maps shows "Opens 11:00"; full weekly schedule not yet confirmed.
  hours: "Opens 11:00 — please confirm full weekly hours",

  // Precise Google Maps link (plus code 3PG5+7C, Avcılar/İstanbul).
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Di%C5%9F%20Hekimi%20%C3%96mer%20Riyado%C4%9Flu%20Ispartakule%20Bulvar%C4%B1%20No%2023%20Avc%C4%B1lar%20%C4%B0stanbul",
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=Ispartakule+Bulvar%C4%B1+No+23+Avc%C4%B1lar+%C4%B0stanbul&output=embed",
  yandexMapsUrl:
    "https://yandex.com/maps/?text=Ispartakule%20Bulvar%C4%B1%20No%2023%20Avc%C4%B1lar%20%C4%B0stanbul",

  // Approximate Ispartakule / Avcılar coordinates (for the location pin visual only).
  latitude: 41.0223,
  longitude: 28.7889,

  // Social links — update with the clinic's real profiles.
  social: {
    website: "https://omerriyadoglu.com",
    instagram: "https://instagram.com",
    facebook: "https://www.facebook.com/",
  },
} as const;

/** Builds a wa.me link, falling back to a plain WhatsApp open if unset. */
export function buildWhatsAppUrl(message?: string): string {
  const digits = clinic.whatsapp.replace(/[^0-9]/g, "");
  const base = digits ? `https://wa.me/${digits}` : "https://wa.me/";
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
