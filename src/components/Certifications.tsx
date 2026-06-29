import { ShieldCheck, Stethoscope, FileText, Activity, Heart, Smile } from "lucide-react";
import Reveal from "./ui/Reveal";
import GlassCard from "./ui/GlassCard";
import { clinic } from "../clinicInfo";

const list = [
  {
    name: "Patient-First",
    title: "Personalized Care",
    desc: "Every treatment plan starts with listening. We take time to understand your concerns and tailor care to your needs.",
    icon: Heart,
  },
  {
    name: "Hygiene",
    title: "Sterile & Safe",
    desc: "Strict sterilization and infection-control routines are followed for every patient, every visit.",
    icon: ShieldCheck,
  },
  {
    name: "Modern Tools",
    title: "Up-to-date Technology",
    desc: "Modern dental equipment supports accurate diagnosis and comfortable, efficient treatment.",
    icon: Activity,
  },
  {
    name: "Clear Plans",
    title: "Transparent Treatment",
    desc: "Your options, steps, and expectations are explained clearly before any treatment begins.",
    icon: FileText,
  },
  {
    name: "Experienced",
    title: "Led by Dr. Ömer Riyadoğlu",
    desc: "Care is delivered with attention to detail and a calm, reassuring chair-side approach.",
    icon: Stethoscope,
  },
  {
    name: "Comfort",
    title: "Relaxed Environment",
    desc: "A calm, welcoming clinic designed to help anxious and first-time patients feel at ease.",
    icon: Smile,
  },
];

const trustStrip = [
  "Patient-First Care",
  "Sterile & Safe",
  "Modern Technology",
  "Transparent Treatment",
  "Comfortable Clinic",
  "Avcılar, İstanbul",
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-zinc-950 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="mb-12 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-widest text-primary font-semibold block mb-1">
            About the Clinic
          </span>
          <h2 className="font-serif text-3xl text-white">Why Choose Us</h2>
          <p className="text-sm text-on-surface-variant max-w-2xl mt-1 mx-auto md:mx-0">
            {clinic.name} is a dental clinic in {clinic.city}, {clinic.region}, led by {clinic.doctor}.
            We focus on honest, patient-first dentistry in a calm, modern setting — taking the time to
            explain your options and help you feel comfortable at every visit.
          </p>
        </Reveal>

        <Reveal stagger staggerAmount={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {list.map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard key={item.name} className="p-6 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon className={`w-6 h-6 text-primary ${item.name === "5.0 Rating" ? "fill-primary/10" : ""}`} />
                  </div>
                  <div className="font-serif text-lg text-white font-bold tracking-tight mb-1">{item.name}</div>
                  <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">{item.title}</div>
                  <p className="text-[11px] text-on-surface-variant leading-relaxed font-light">{item.desc}</p>
                </div>
              </GlassCard>
            );
          })}
        </Reveal>

        <Reveal className="mt-16 border-t border-white/5 pt-8 flex flex-wrap justify-center md:justify-between items-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-60 transition-all duration-500">
          {trustStrip.map((label) => (
            <span key={label} className="text-sm uppercase tracking-widest font-bold text-white">
              {label}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
