import { motion, useReducedMotion } from "motion/react";
import { Sparkles, Bone, Gem, Sun, Grip, Clock, ArrowRight, type LucideIcon } from "lucide-react";
import { treatments } from "../data";
import { fadeUp } from "../lib/animations";
import Reveal from "./ui/Reveal";
import GlassCard from "./ui/GlassCard";

const icons: Record<string, LucideIcon> = {
  "smile-design": Sparkles,
  "dental-implants": Bone,
  veneers: Gem,
  "teeth-whitening": Sun,
  orthodontics: Grip,
};

const openBooking = () => window.dispatchEvent(new CustomEvent("open-booking"));

export default function Services() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="services" className="py-24 bg-zinc-950 border-t border-white/5 relative z-20">
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <Reveal className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Our Treatments
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight">Dental Services</h2>
          <p className="text-sm text-on-surface-variant max-w-xl mt-3 mx-auto">
            Comprehensive care tailored to your needs — explained clearly before any treatment begins.
          </p>
        </Reveal>

        <Reveal stagger staggerAmount={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {treatments.map((t) => {
            const Icon = icons[t.id] ?? Sparkles;
            return (
              <GlassCard key={t.id} className="p-7 flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-5 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl text-white mb-2">{t.name}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-5 flex-grow">
                  {t.description}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant mb-5">
                  <Clock className="w-3.5 h-3.5 text-primary" />
                  <span className="font-semibold">{t.duration}</span>
                </div>
                <motion.button
                  onClick={openBooking}
                  whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                  className="group/cta w-full flex items-center justify-between px-4 py-3 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-on-primary text-[11px] font-semibold uppercase tracking-wider transition-all"
                >
                  Book This Service
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
                </motion.button>
              </GlassCard>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
