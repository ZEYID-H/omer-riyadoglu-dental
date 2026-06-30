import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Maximize2, Sparkles, Star } from "lucide-react";
import { LightboxModal } from "./Modals";
import Reveal from "./ui/Reveal";
import { fadeUp } from "../lib/animations";
import { clinic } from "../clinicInfo";

interface GalleryItem {
  id: string;
  title: string;
  city: string;
  image: string;
  description: string;
  size: string;
  rating: string;
}

const locations: GalleryItem[] = [
  {
    id: "treatment-rooms",
    title: "Modern Treatment Rooms",
    city: "Comfort-focused care",
    image:
      "/clinic/interior-1.webp",
    description:
      "Calm, modern treatment rooms designed to put patients at ease. Every visit is unhurried, clearly explained, and tailored to your needs — from routine check-ups to detailed smile planning.",
    size: "The Clinic",
    rating: "Comfort first",
  },
  {
    id: "technology",
    title: "Up-to-date Technology",
    city: "Precise, careful treatment",
    image:
      "/clinic/interior-2.webp",
    description:
      "We use modern dental technology to support accurate diagnosis and comfortable, efficient treatment, so you can understand your options and feel confident about your care.",
    size: "The Clinic",
    rating: "Modern tools",
  },
  {
    id: "hygiene",
    title: "Hygiene & Sterilization",
    city: "Safety as standard",
    image:
      "/clinic/interior-3.webp",
    description:
      "Strict hygiene and sterilization protocols are followed throughout the clinic, so every patient is treated in a clean, safe, and welcoming environment.",
    size: "The Clinic",
    rating: "Clean & safe",
  },
];

export default function ClinicGallery() {
  const reduceMotion = useReducedMotion();
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    image: string;
    title: string;
    description: string;
  }>({ isOpen: false, image: "", title: "", description: "" });

  const openLightbox = (loc: GalleryItem) =>
    setLightboxData({ isOpen: true, image: loc.image, title: loc.title, description: loc.description });

  return (
    <section className="py-24 bg-zinc-950 border-t border-white/5 relative z-20">
      <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-widest text-primary font-semibold flex items-center justify-center gap-1.5 mb-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Inside Our Clinic
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight">A Calm, Modern Clinic</h2>
          <p className="font-serif text-base md:text-lg text-primary mt-2">
            Patient-first dental care in {clinic.city}, {clinic.region}
          </p>
        </Reveal>

        <Reveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((loc) => (
            <motion.div
              key={loc.id}
              variants={fadeUp}
              className="group cursor-pointer flex flex-col justify-between"
              onClick={() => openLightbox(loc)}
            >
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 bg-zinc-900 border border-white/5 shadow-lg group-hover:border-primary/30 group-hover:shadow-[0_24px_70px_-20px_rgba(212,175,55,0.3)] transition-[border-color,box-shadow] duration-500"
              >
                <img
                  src={loc.image}
                  alt={loc.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-85 transition-opacity group-hover:opacity-90" />

                <div className="absolute top-4 left-4 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-bold text-primary flex items-center gap-1 uppercase tracking-wider">
                  <Star className="w-3 h-3 fill-primary text-primary" /> {loc.rating}
                </div>

                <div className="absolute top-4 right-4 bg-zinc-950/85 backdrop-blur-md p-2 rounded-xl border border-white/10 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <Maximize2 className="w-4 h-4 text-white" />
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold block mb-1">
                    {loc.size}
                  </span>
                  <h4 className="font-serif text-2xl text-white mb-1">{loc.title}</h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{loc.city}</p>
                </div>
              </motion.div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openLightbox(loc);
                }}
                className="w-full py-4 border border-white/5 rounded-2xl text-xs font-semibold uppercase tracking-wider text-on-surface-variant hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all active:scale-[0.98]"
              >
                Explore Venue Details
              </button>
            </motion.div>
          ))}
        </Reveal>
      </div>

      <LightboxModal
        isOpen={lightboxData.isOpen}
        image={lightboxData.image}
        title={lightboxData.title}
        description={lightboxData.description}
        onClose={() => setLightboxData((prev) => ({ ...prev, isOpen: false }))}
      />
    </section>
  );
}
