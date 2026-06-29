import { useState } from "react";
import { MapPin, Phone, MessageSquare, Mail, Clipboard, ClipboardCheck, ArrowRight, Calendar, Navigation, PhoneCall, Sparkles } from "lucide-react";
import { Branch } from "../types";

interface ContactCardsProps {
  activeBranch: Branch;
  onOpenBooking: () => void;
  onOpenCallBack: () => void;
}

export default function ContactCards({
  activeBranch,
  onOpenBooking,
  onOpenCallBack,
}: ContactCardsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(activeBranch.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 bg-zinc-950 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Branch Context Info Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-white/5 pb-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-primary font-semibold block mb-1">
              Currently Displaying Details For
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-white">
              {activeBranch.name} ({activeBranch.city})
            </h3>
          </div>
          <div className="text-xs text-on-surface-variant flex items-center gap-1.5 bg-white/5 px-4.5 py-2.5 rounded-2xl border border-white/5">
            <Sparkles className="w-4 h-4 text-primary" /> Active Response Zone
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* CARD 1: ADDRESS */}
          <div className="glass-card p-8 rounded-3xl flex flex-col h-full border border-white/5 hover:border-primary/20 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <MapPin className="w-5 h-5" />
            </div>
            
            <h4 className="font-serif text-xl text-white mb-3">Address</h4>
            
            <p className="font-sans text-xs text-on-surface-variant leading-relaxed flex-grow mb-6">
              {activeBranch.address}
            </p>
            
            <button
              onClick={handleCopyAddress}
              className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-primary hover:text-white transition-all self-start"
            >
              {copied ? (
                <>
                  Address Copied! <ClipboardCheck className="w-4 h-4 text-green-400" />
                </>
              ) : (
                <>
                  Copy Address <Clipboard className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* CARD 2: CONTACT DETAILS */}
          <div className="glass-card p-8 rounded-3xl flex flex-col h-full border border-white/5 hover:border-primary/20 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Phone className="w-5 h-5" />
            </div>
            
            <h4 className="font-serif text-xl text-white mb-3">Contact Details</h4>
            
            <div className="space-y-4 mb-6 flex-grow">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs text-on-surface-variant">Phone</span>
                <a 
                  href={`tel:${activeBranch.phone}`}
                  className="text-xs font-semibold text-white hover:text-primary transition-colors"
                >
                  {activeBranch.phone}
                </a>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-xs text-on-surface-variant">WhatsApp</span>
                <a 
                  href={`https://wa.me/${activeBranch.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-white hover:text-primary transition-colors"
                >
                  {activeBranch.whatsapp}
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-on-surface-variant">Email</span>
                <a 
                  href={`mailto:${activeBranch.email}`}
                  className="text-xs font-semibold text-white hover:text-primary transition-colors truncate max-w-[180px]"
                >
                  {activeBranch.email}
                </a>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-on-primary py-3.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all"
            >
              Contact Us
            </button>
          </div>

          {/* CARD 3: QUICK ACTIONS */}
          <div className="glass-card p-8 rounded-3xl flex flex-col h-full border border-white/5 hover:border-primary/20 transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Sparkles className="w-5 h-5" />
            </div>
            
            <h4 className="font-serif text-xl text-white mb-4">Quick Actions</h4>
            
            <div className="grid grid-cols-1 gap-2 flex-grow">
              <button
                onClick={onOpenBooking}
                className="flex items-center justify-between p-3 rounded-xl bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left text-xs font-semibold text-on-surface-variant hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-primary" /> Book Consultation
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>

              <a
                href={`https://wa.me/${activeBranch.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left text-xs font-semibold text-on-surface-variant hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-primary" /> Send WhatsApp
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <a
                href={activeBranch.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left text-xs font-semibold text-on-surface-variant hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <Navigation className="w-4 h-4 text-primary" /> Get Directions
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </a>

              <button
                onClick={onOpenCallBack}
                className="flex items-center justify-between p-3 rounded-xl bg-white/0 hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left text-xs font-semibold text-on-surface-variant hover:text-white"
              >
                <span className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-primary" /> Request Call Back
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-60" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
