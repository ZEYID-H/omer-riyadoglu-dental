import { Star, Quote } from "lucide-react";
import Reveal from "./ui/Reveal";
import GlassCard from "./ui/GlassCard";
import { clinic } from "../clinicInfo";

/**
 * Patient reviews.
 *
 * SAMPLE PLACEHOLDERS — these are clearly marked sample reviews, not real
 * testimonials. To connect real Google reviews later, replace the `reviews`
 * array below (or feed it from the Google Places API). Each item maps 1:1 to a
 * Google review: author name, rating, text, and relative date.
 */
interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: "r1",
    name: "Elif Yılmaz",
    rating: 5,
    text: "Sample review placeholder — replace with a real Google review. The clinic was calm and everything was explained clearly before treatment.",
    date: "2 weeks ago",
  },
  {
    id: "r2",
    name: "Mehmet Demir",
    rating: 5,
    text: "Sample review placeholder — replace with a real Google review. Friendly, professional, and a comfortable experience from start to finish.",
    date: "1 month ago",
  },
  {
    id: "r3",
    name: "Zeynep Kaya",
    rating: 5,
    text: "Sample review placeholder — replace with a real Google review. Gentle, patient-focused care and a very clean clinic.",
    date: "1 month ago",
  },
  {
    id: "r4",
    name: "Ahmet Şahin",
    rating: 5,
    text: "Sample review placeholder — replace with a real Google review. Clear treatment plan with no pressure. Highly recommend.",
    date: "2 months ago",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");
}

export default function Reviews() {
  return (
    <section className="py-24 bg-zinc-950 border-t border-white/5 relative z-20">
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <Reveal className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold flex items-center justify-center gap-1.5 mb-2">
            <Star className="w-3.5 h-3.5 fill-primary" /> Patient Reviews
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight">What Patients Say</h2>
          <p className="text-sm text-on-surface-variant max-w-xl mt-3 mx-auto">
            Sample reviews shown below — these will be replaced with verified Google reviews.
          </p>
        </Reveal>

        <Reveal stagger staggerAmount={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r) => (
            <GlassCard key={r.id} className="p-6 flex flex-col">
              <Quote className="w-7 h-7 text-primary/30 mb-3" />
              <div className="flex items-center gap-0.5 mb-3" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < r.rating ? "fill-primary text-primary" : "text-white/15"}`}
                  />
                ))}
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed flex-grow mb-5">{r.text}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                  {initials(r.name)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-white truncate">{r.name}</div>
                  <div className="text-[10px] text-on-surface-variant">{r.date}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </Reveal>

        <Reveal className="text-center mt-12">
          <a
            href={clinic.googleMapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary hover:text-white transition-colors"
          >
            <Star className="w-4 h-4 fill-primary" /> See us on Google
          </a>
        </Reveal>
      </div>
    </section>
  );
}
