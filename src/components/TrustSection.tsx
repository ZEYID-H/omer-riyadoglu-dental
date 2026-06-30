import { Star, Activity, HeartHandshake, Smile, Siren } from "lucide-react";
import Reveal from "./ui/Reveal";
import GlassCard from "./ui/GlassCard";

/**
 * Premium trust strip directly below the hero.
 *
 * NOTE: No statistics are invented. The Google rating was not publicly
 * verifiable, so generic wording is used. If a verified rating exists later,
 * replace "Top-Rated Care" / its description with the real number.
 */
const items = [
  {
    icon: Star,
    title: "Top-Rated Care",
    desc: "Trusted by patients for attentive, high-quality dentistry.",
    fill: true,
  },
  {
    icon: Activity,
    title: "Modern Equipment",
    desc: "Up-to-date dental technology for precise treatment.",
  },
  {
    icon: HeartHandshake,
    title: "Personalized Care",
    desc: "Every plan is tailored to your needs and comfort.",
  },
  {
    icon: Smile,
    title: "Comfortable Clinic",
    desc: "A calm, welcoming environment for anxious patients.",
  },
  {
    icon: Siren,
    title: "Emergency Appointments",
    desc: "Same-day slots available for urgent dental pain.",
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 md:py-20 bg-zinc-950 border-y border-white/5 relative z-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[200px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative">
        <Reveal className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold block mb-2">
            Why Patients Choose Us
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-white">A Standard of Care You Can Trust</h2>
        </Reveal>

        <Reveal
          stagger
          staggerAmount={0.08}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6"
        >
          {items.map(({ icon: Icon, title, desc, fill }) => (
            <GlassCard key={title} className="group p-6 rounded-2xl flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 transition-transform duration-300 group-hover:scale-110">
                <Icon className={`w-6 h-6 ${fill ? "fill-primary/20" : ""}`} />
              </div>
              <h3 className="font-serif text-lg text-white mb-1.5">{title}</h3>
              <p className="text-[11px] text-on-surface-variant leading-relaxed font-light">{desc}</p>
            </GlassCard>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
