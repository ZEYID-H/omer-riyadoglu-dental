import { useState } from "react";
import {
  MapPin,
  Phone,
  MessageSquare,
  Clipboard,
  ClipboardCheck,
  ArrowRight,
  Calendar,
  Navigation,
  PhoneCall,
  FileUp,
  Clock,
  Mail,
  Sparkles,
} from "lucide-react";
import { Branch } from "../types";
import { clinic } from "../clinicInfo";
import Reveal from "./ui/Reveal";
import GlassCard from "./ui/GlassCard";

interface ContactCardsProps {
  activeBranch: Branch;
  onOpenBooking: () => void;
  onOpenCallBack: () => void;
  onOpenXRay: () => void;
}

const cardShell = "p-8 flex flex-col h-full";
const iconBox = "w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-transform duration-300 group-hover:scale-110";

export default function ContactCards({ activeBranch, onOpenBooking, onOpenCallBack, onOpenXRay }: ContactCardsProps) {
  const [copied, setCopied] = useState(false);
  const whatsappUrl = `https://wa.me/${activeBranch.whatsapp.replace(/[^0-9]/g, "")}`;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(activeBranch.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quickActions = [
    { icon: Calendar, label: "Book Appointment", onClick: onOpenBooking },
    { icon: MessageSquare, label: "Send WhatsApp", href: whatsappUrl },
    { icon: Navigation, label: "Get Directions", href: activeBranch.googleMapsUrl },
    { icon: PhoneCall, label: "Request Call Back", onClick: onOpenCallBack },
    { icon: FileUp, label: "Send X-Ray", onClick: onOpenXRay },
  ];

  return (
    <section id="contact" className="py-12 bg-zinc-950 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/5 pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-primary font-semibold block mb-1">
              Get in Touch
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-white">
              {activeBranch.name}
            </h3>
          </div>
          <div className="text-xs text-on-surface-variant flex items-center gap-1.5 bg-white/5 px-4 py-2.5 rounded-2xl border border-white/5 self-start md:self-auto">
            <Sparkles className="w-4 h-4 text-primary" /> Active Response Zone
          </div>
        </Reveal>

        <Reveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Address */}
          <GlassCard className={cardShell}>
            <div className={iconBox}>
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl text-white mb-3">Address</h4>
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed flex-grow mb-6">
              {activeBranch.address}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={activeBranch.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border border-white/5 hover:border-primary/20 transition-all"
              >
                <Navigation className="w-4 h-4 text-primary" /> Get Directions
              </a>
              <button
                onClick={handleCopyAddress}
                className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-primary hover:text-white transition-all self-start"
              >
                {copied ? (
                  <>Address Copied! <ClipboardCheck className="w-4 h-4 text-green-400" /></>
                ) : (
                  <>Copy Address <Clipboard className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </GlassCard>

          {/* Contact details */}
          <GlassCard className={cardShell}>
            <div className={iconBox}>
              <Phone className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl text-white mb-3">Contact Details</h4>
            <div className="space-y-3.5 mb-6 flex-grow">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs text-on-surface-variant flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-primary/70" /> Phone</span>
                <a href={`tel:+${clinic.whatsapp}`} className="text-xs font-semibold text-white hover:text-primary transition-colors">
                  {clinic.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs text-on-surface-variant flex items-center gap-1.5"><MessageSquare className="w-3.5 h-3.5 text-primary/70" /> WhatsApp</span>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="text-xs font-semibold text-white hover:text-primary transition-colors">
                  {clinic.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs text-on-surface-variant flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-primary/70" /> Email</span>
                <a href={`mailto:${clinic.email}`} className="text-xs font-semibold text-white hover:text-primary transition-colors truncate max-w-[170px]">
                  {clinic.email}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface-variant flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-primary/70" /> Hours</span>
                <span className="text-xs font-semibold text-white text-right max-w-[180px]">{clinic.hours}</span>
              </div>
            </div>
            <a
              href={`tel:+${clinic.whatsapp}`}
              className="w-full bg-primary hover:brightness-110 text-on-primary py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" /> Call Now
            </a>
          </GlassCard>

          {/* Quick actions */}
          <GlassCard className={cardShell}>
            <div className={iconBox}>
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-xl text-white mb-4">Quick Actions</h4>
            <div className="grid grid-cols-1 gap-2 flex-grow">
              {quickActions.map(({ icon: Icon, label, onClick, href }) => {
                const inner = (
                  <>
                    <span className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-primary" /> {label}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-60 transition-transform group-hover/qa:translate-x-1" />
                  </>
                );
                const cls =
                  "group/qa flex items-center justify-between p-3 rounded-xl bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left text-xs font-semibold text-on-surface-variant hover:text-white";
                return href ? (
                  <a key={label} href={href} target="_blank" rel="noreferrer" className={cls}>
                    {inner}
                  </a>
                ) : (
                  <button key={label} onClick={onClick} className={cls}>
                    {inner}
                  </button>
                );
              })}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
