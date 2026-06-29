import { ShieldCheck, Award, FileText, Activity, Heart, Star } from "lucide-react";
import Reveal from "./ui/Reveal";
import GlassCard from "./ui/GlassCard";

const list = [
  {
    name: "ADA",
    title: "American Dental Association",
    desc: "Our materials and techniques are fully compliant with clinical standards recommended by the ADA.",
    icon: Award,
  },
  {
    name: "ISO 9001",
    title: "Quality Management Certified",
    desc: "Globally accredited standard for surgical precision, sterilization workflows, and medical service quality.",
    icon: ShieldCheck,
  },
  {
    name: "Ministry of Health",
    title: "Licensed Health Institution",
    desc: "Fully authorized health tourism organization compliant with international patient charter regulations.",
    icon: Activity,
  },
  {
    name: "Health Europe",
    title: "European Healthcare Standards",
    desc: "Recognized European medical system aligning pre-operative checks and surgical protocols with EU guidelines.",
    icon: Heart,
  },
  {
    name: "5.0 Rating",
    title: "Patient Satisfaction",
    desc: "Consistently rated 5.0 stars for our five-star concierge hospitality and medical dental outcomes.",
    icon: Star,
  },
  {
    name: "DMCA",
    title: "Protected IP & Design",
    desc: "All custom 3D digital smile designs and surgical blueprints are secure under patient privacy and copyright laws.",
    icon: FileText,
  },
];

const trustStrip = [
  "ADA Compliant",
  "ISO 9001:2015",
  "Ministry of Health licensed",
  "Health Europe Approved",
  "5.0 Google Rating",
  "DMCA Protected",
];

export default function Certifications() {
  return (
    <section id="certifications" className="py-20 bg-zinc-950 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="mb-12 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-widest text-primary font-semibold block mb-1">
            Trust &amp; Security
          </span>
          <h2 className="font-serif text-3xl text-white">Global Accreditations</h2>
          <p className="text-sm text-on-surface-variant max-w-lg mt-1 mx-auto md:mx-0">
            Lema Dental is a certified luxury dental care provider trusted by thousands of patients worldwide.
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
