import React from "react";
import {
  Globe,
  Instagram,
  Facebook,
  Phone,
  Mail,
  MapPin,
  Clock,
  Navigation,
  ShieldAlert,
  FileSignature,
  ScrollText,
} from "lucide-react";
import Reveal from "./ui/Reveal";
import Logo from "./ui/Logo";
import { clinic } from "../clinicInfo";

interface FooterProps {
  onOpenBooking: () => void;
}

const quickLinks = [
  { label: "Services", href: "#services" },
  { label: "Clinic Gallery", href: "#gallery" },
  { label: "Before & After", href: "#before-after" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

export default function Footer({ onOpenBooking }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <footer className="w-full pt-24 pb-28 md:pb-12 bg-[#0e0e0e] border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/5">
          {/* Logo & description */}
          <div className="space-y-6">
            <Logo size={56} />
            <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm">
              Premium, patient-first dental care with {clinic.doctor} in {clinic.city}, {clinic.region}.
              From routine check-ups to smile design, implants, and veneers.
            </p>
            <a
              href={clinic.googleMapsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-white transition-colors"
            >
              <Navigation className="w-4 h-4" /> Open in Google Maps
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Quick Links</h5>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-xs text-on-surface-variant hover:text-primary transition-colors font-medium"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Working hours & contact */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Hours &amp; Contact</h5>
            <ul className="space-y-3.5 text-xs text-on-surface-variant">
              <li className="flex items-start gap-2.5">
                <Clock className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <span>{clinic.hours}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <span>{clinic.addressFull}</span>
              </li>
              <li>
                <a href={`tel:+${clinic.whatsapp}`} className="flex items-center gap-2.5 hover:text-primary transition-colors">
                  <Phone className="w-3.5 h-3.5 text-primary shrink-0" /> {clinic.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${clinic.email}`} className="flex items-center gap-2.5 hover:text-primary transition-colors">
                  <Mail className="w-3.5 h-3.5 text-primary shrink-0" /> {clinic.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Social & CTA */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-6">Follow Us</h5>
            <div className="flex gap-4 mb-6">
              <a href={clinic.social.website} target="_blank" rel="noreferrer" title="Website"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all">
                <Globe className="w-4 h-4" />
              </a>
              <a href={clinic.social.instagram} target="_blank" rel="noreferrer" title="Instagram"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={clinic.social.facebook} target="_blank" rel="noreferrer" title="Facebook"
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
            <button
              onClick={onOpenBooking}
              className="w-full bg-primary/10 hover:bg-primary text-primary hover:text-on-primary py-3 rounded-xl text-[11px] uppercase tracking-wider font-semibold transition-all active:scale-[0.98]"
            >
              Book Appointment
            </button>
          </div>
        </Reveal>

        {/* Bottom copyright & legal anchors */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-on-surface-variant text-center md:text-left">
            © {currentYear} {clinic.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[11px]">
            <a href="#faq" onClick={(e) => handleLinkClick(e, "#faq")}
              className="text-on-surface-variant hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4 flex items-center gap-1">
              <FileSignature className="w-3.5 h-3.5" /> Privacy Policy
            </a>
            <a href="#faq" onClick={(e) => handleLinkClick(e, "#faq")}
              className="text-on-surface-variant hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4 flex items-center gap-1">
              <ScrollText className="w-3.5 h-3.5" /> Terms
            </a>
            <a href="#faq" onClick={(e) => handleLinkClick(e, "#faq")}
              className="text-on-surface-variant hover:text-primary transition-colors underline decoration-primary/20 underline-offset-4 flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Medical Disclaimer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
