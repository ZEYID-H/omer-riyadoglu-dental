import { motion, useReducedMotion } from "motion/react";
import { MessageSquare, Calendar, HeartPulse, Sparkles, Shield, MapPin } from "lucide-react";
import Button from "./ui/Button";
import { fadeUp, staggerContainer } from "../lib/animations";
import { clinic } from "../clinicInfo";

interface HeroProps {
  onOpenBooking: () => void;
  onOpenWhatsApp: () => void;
}

const trustBadges = [
  { value: "Modern", label: "Up-to-date Clinic", icon: Sparkles, fill: false },
  { value: "Patient-First", label: "Personalized Care", icon: HeartPulse, fill: false },
  { value: "Sterile", label: "Hygiene & Safety", icon: Shield, fill: false },
  { value: clinic.city, label: `${clinic.region}, ${clinic.country}`, icon: MapPin, fill: false },
];

export default function Hero({ onOpenBooking, onOpenWhatsApp }: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative pt-32 pb-16 md:pt-48 md:pb-24 overflow-hidden min-h-[90vh] flex flex-col justify-between">
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
        className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center flex-grow flex flex-col justify-center"
      >
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest font-semibold text-primary mb-6 mx-auto"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Now Welcoming New Patients
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-serif text-[42px] sm:text-5xl md:text-7xl leading-[1.1] mb-6 text-white text-glow"
        >
          Healthy Smiles Begin Here
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="font-sans text-sm sm:text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          Premium dental care with {clinic.doctor} in {clinic.city}, {clinic.region}. A calm, modern
          clinic where every treatment is explained clearly and tailored to you — from routine
          check-ups to smile design.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto w-full mb-16"
        >
          <Button size="lg" fullWidth onClick={onOpenBooking} className="sm:w-auto">
            <Calendar className="w-4 h-4" /> Book Free Consultation
          </Button>
          <Button size="lg" variant="outline" fullWidth onClick={onOpenWhatsApp} className="sm:w-auto">
            <MessageSquare className="w-4 h-4" /> Contact via WhatsApp
          </Button>
        </motion.div>
      </motion.div>

      {/* Trust badges */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          variants={staggerContainer(0.1, 0.3)}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 border-t border-white/5 pt-12 text-center pb-6"
        >
          {trustBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <motion.div
                key={badge.label}
                variants={fadeUp}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                className="flex flex-col items-center group cursor-default"
              >
                <div className="flex items-center gap-1.5 mb-1 text-primary">
                  <Icon className={`w-4 h-4 text-primary ${badge.fill ? "fill-primary" : ""}`} />
                  <span className="font-serif text-xl sm:text-2xl md:text-3xl text-white font-medium group-hover:text-primary transition-colors">
                    {badge.value}
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-semibold">
                  {badge.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
