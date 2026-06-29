import React from "react";
import { Globe, Instagram, Facebook, Sparkles, ShieldAlert, FileSignature } from "lucide-react";
import Reveal from "./ui/Reveal";
import Logo from "./ui/Logo";
import { clinic } from "../clinicInfo";

interface FooterProps {
  onOpenBooking: () => void;
}

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

export default function Footer({ onOpenBooking }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, label: string) => {
    e.preventDefault();
    if (label === "Contact") {
      onOpenBooking();
    } else {
      const map: Record<string, string> = {
        "Smile Design": "#gallery",
        "Dental Implants": "#gallery",
        "Veneers": "#gallery",
        "Teeth Whitening": "#gallery",
        "Our Doctors": "#map-section",
        "Patient Stories": "#gallery",
        "About Us": "#certifications",
      };
      if (map[label]) scrollTo(map[label]);
    }
  };

  return (
    <footer className="w-full pt-24 pb-24 md:pb-12 bg-[#0e0e0e] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 pb-16 border-b border-white/5">
          {/* Logo & description */}
          <div className="space-y-6">
            <Logo size={64} />
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm">
              Premium dental care with {clinic.doctor} in {clinic.city}, {clinic.region}. From routine
              check-ups to smile design, implants, and veneers — delivered with a calm, patient-first approach.
            </p>
          </div>

          {/* Column 2: Our Services */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Our Services</h5>
            <ul className="space-y-3">
              {["Smile Design", "Dental Implants", "Veneers", "Teeth Whitening"].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    onClick={(e) => handleLinkClick(e, link)}
                    className="text-xs text-on-surface-variant hover:text-primary transition-colors font-medium"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Company</h5>
            <ul className="space-y-3">
              {["About Us", "Our Doctors", "Patient Stories", "Contact"].map((link) => (
                <li key={link}>
                  <a 
                    href="#" 
                    onClick={(e) => handleLinkClick(e, link)}
                    className="text-xs text-on-surface-variant hover:text-primary transition-colors font-medium"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Social / Contact */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Follow Us</h5>
            <div className="flex gap-4">
              <a
                href={clinic.social.website}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all"
                title="Website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href={clinic.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={clinic.social.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            
            <div className="mt-6 flex items-center gap-1.5 text-[10px] text-on-surface-variant bg-white/5 border border-white/5 rounded-xl p-3 max-w-[200px]">
              <Sparkles className="w-3.5 h-3.5 text-primary" /> Active Online Support
            </div>
          </div>
        </Reveal>

        {/* Bottom copyright & legal anchors */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-on-surface-variant">
            © {currentYear} {clinic.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 text-[11px]">
            <a
              href="#certifications"
              onClick={(e) => { e.preventDefault(); scrollTo("#certifications"); }}
              className="text-on-surface-variant hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4 flex items-center gap-1"
            >
              <FileSignature className="w-3.5 h-3.5" /> Privacy Policy
            </a>
            <a
              href="#certifications"
              onClick={(e) => { e.preventDefault(); scrollTo("#certifications"); }}
              className="text-on-surface-variant hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4 flex items-center gap-1"
            >
              <ShieldAlert className="w-3.5 h-3.5" /> Medical Ethics
            </a>
            <a
              href="#certifications"
              onClick={(e) => { e.preventDefault(); scrollTo("#certifications"); }}
              className="text-on-surface-variant hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" /> Certifications
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
