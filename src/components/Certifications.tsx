import { ShieldCheck, Award, FileText, Activity, Heart, Star } from "lucide-react";

export default function Certifications() {
  const list = [
    {
      name: "ADA",
      title: "American Dental Association",
      desc: "Our materials and techniques are fully compliant with clinical standards recommended by the ADA.",
      icon: <Award className="w-6 h-6 text-primary" />
    },
    {
      name: "ISO 9001",
      title: "Quality Management Certified",
      desc: "Globally accredited standard for surgical precision, sterilization workflows, and medical service quality.",
      icon: <ShieldCheck className="w-6 h-6 text-primary" />
    },
    {
      name: "Ministry of Health",
      title: "Licensed Health Institution",
      desc: "Fully authorized health tourism organization compliant with international patient charter regulations.",
      icon: <Activity className="w-6 h-6 text-primary" />
    },
    {
      name: "Health Europe",
      title: "European Healthcare Standards",
      desc: "Recognized European medical system aligning pre-operative checks and surgical protocols with EU guidelines.",
      icon: <Heart className="w-6 h-6 text-primary" />
    },
    {
      name: "5.0 Rating",
      title: "Patient Satisfaction",
      desc: "Consistently rated 5.0 stars for our five-star concierge hospitality and medical dental outcomes.",
      icon: <Star className="w-6 h-6 text-primary fill-primary/10" />
    },
    {
      name: "DMCA",
      title: "Protected IP & Design",
      desc: "All custom 3D digital smile designs and surgical blueprints are secure under patient privacy and copyright laws.",
      icon: <FileText className="w-6 h-6 text-primary" />
    }
  ];

  return (
    <section id="certifications" className="py-20 bg-zinc-950 border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Minimal header */}
        <div className="mb-12 text-center md:text-left">
          <span className="text-[10px] uppercase tracking-widest text-primary font-semibold block mb-1">
            TRUST & SECURITY
          </span>
          <h2 className="font-serif text-3xl text-white">Global Accreditations</h2>
          <p className="text-sm text-on-surface-variant max-w-lg mt-1">
            Lema Dental is a certified luxury dental care provider trusted by thousands of patients worldwide.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
          {list.map((item, idx) => (
            <div 
              key={idx}
              className="glass-card p-6 rounded-2xl border border-white/5 hover:border-primary/20 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <div className="font-serif text-lg text-white font-bold tracking-tight mb-1">{item.name}</div>
                <div className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">{item.title}</div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Minimalistic trust strip below the cards */}
        <div className="mt-16 border-t border-white/5 pt-8 flex flex-wrap justify-center md:justify-between items-center gap-6 opacity-30 grayscale hover:grayscale-0 hover:opacity-60 transition-all duration-500">
          <span className="text-sm uppercase tracking-widest font-bold text-white">ADA Compliant</span>
          <span className="text-sm uppercase tracking-widest font-bold text-white">ISO 9001:2015</span>
          <span className="text-sm uppercase tracking-widest font-bold text-white">Ministry of Health licensed</span>
          <span className="text-sm uppercase tracking-widest font-bold text-white">Health Europe Approved</span>
          <span className="text-sm uppercase tracking-widest font-bold text-white">5.0 Google Rating</span>
          <span className="text-sm uppercase tracking-widest font-bold text-white">DMCA Protected</span>
        </div>
      </div>
    </section>
  );
}
