import { motion, useReducedMotion } from "motion/react";
import { Calendar, Bot, ChevronDown } from "lucide-react";
import Button from "./ui/Button";
import { fadeUp, staggerContainer } from "../lib/animations";
import { clinic } from "../clinicInfo";

interface HeroProps {
  onOpenBooking: () => void;
}

const openAIAssistant = () => window.dispatchEvent(new CustomEvent("open-ai-assistant"));

export default function Hero({ onOpenBooking }: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative pt-36 pb-20 md:pt-52 md:pb-28 overflow-hidden min-h-[88vh] flex flex-col justify-center">
      {/* Cinematic gold backdrop glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[900px] md:h-[900px] opacity-[0.12] pointer-events-none rounded-full blur-[120px] bg-gradient-to-tr from-primary to-transparent" />
      <div className="absolute top-[45%] left-[10%] w-[300px] h-[300px] opacity-[0.06] pointer-events-none rounded-full blur-[100px] bg-primary-container" />
      <div className="absolute bottom-0 right-[15%] w-[400px] h-[400px] opacity-[0.05] pointer-events-none rounded-full blur-[130px] bg-primary" />

      {/* Decorative vertical architectural lines */}
      <div className="absolute inset-0 flex justify-between px-12 md:px-24 pointer-events-none opacity-[0.02]">
        <div className="w-[1px] h-full bg-white" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white hidden md:block" />
        <div className="w-[1px] h-full bg-white" />
      </div>

      <motion.div
        variants={staggerContainer(0.14, 0.1)}
        initial="hidden"
        animate="show"
        className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center"
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.25em] font-semibold text-primary mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          {clinic.eyebrow} {clinic.shortName} · {clinic.city}
        </motion.div>

        {/* LCP element — rendered immediately (no opacity:0 entrance) so it
            paints as soon as React mounts, instead of waiting on animation. */}
        <h1 className="font-serif text-[44px] sm:text-6xl md:text-7xl leading-[1.05] mb-8 text-white text-glow tracking-tight">
          Modern Dentistry
          <br className="hidden sm:block" /> Designed Around{" "}
          <span className="text-primary">Your Smile</span>
        </h1>

        <p className="font-sans text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-12 leading-relaxed font-light">
          Advanced, patient-first dental care with {clinic.doctor} in {clinic.city}, {clinic.region}.
          From routine check-ups to smile design — every visit is gentle, clear, and built around you.
        </p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto w-full"
        >
          <Button size="lg" fullWidth onClick={onOpenBooking} className="sm:w-auto">
            <Calendar className="w-4 h-4" /> Book Appointment
          </Button>
          <Button
            size="lg"
            variant="outline"
            fullWidth
            onClick={openAIAssistant}
            className="sm:w-auto"
          >
            <Bot className="w-4 h-4" /> AI Dental Assistant
          </Button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#trust"
        aria-label="Scroll to learn more"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("trust")?.scrollIntoView({ behavior: "smooth" });
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-on-surface-variant/60 hover:text-primary transition-colors hidden md:block"
      >
        <ChevronDown className={reduceMotion ? "w-6 h-6" : "w-6 h-6 animate-bounce"} />
      </motion.a>
    </section>
  );
}
