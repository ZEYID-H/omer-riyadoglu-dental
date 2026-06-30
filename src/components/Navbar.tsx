import React, { useState, useEffect } from "react";
import { Menu, X, Shield, Calendar, ClipboardList } from "lucide-react";
import { useActiveSection } from "../hooks/useActiveSection";
import Button from "./ui/Button";
import Logo from "./ui/Logo";
import { clinic } from "../clinicInfo";

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenTreatment: () => void;
}

const sectionLinks = [
  { label: "Services", href: "#services", id: "services" },
  { label: "Gallery", href: "#gallery", id: "gallery" },
  { label: "Reviews", href: "#reviews", id: "reviews" },
  { label: "FAQ", href: "#faq", id: "faq" },
  { label: "Contact", href: "#contact", id: "contact" },
];

/**
 * Navbar is above the fold, so it is intentionally animation-library-free —
 * all transitions are pure CSS so the critical bundle never pulls in a JS
 * animation runtime.
 */
export default function Navbar({ onOpenBooking, onOpenTreatment }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionLinks.map((l) => l.id));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
          isScrolled
            ? "bg-zinc-950/80 backdrop-blur-xl border-white/5 py-4 shadow-xl"
            : "bg-transparent border-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-2"
            aria-label={`${clinic.name} — home`}
          >
            <Logo size={52} eager className="transition-all duration-300 group-hover:opacity-90" />
          </a>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onOpenTreatment}
              className="relative font-sans text-xs uppercase tracking-widest font-semibold text-on-surface-variant hover:text-white transition-colors px-4 py-2"
            >
              Treatments
            </button>
            {sectionLinks.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative font-sans text-xs uppercase tracking-widest font-semibold transition-colors px-4 py-2 ${
                    isActive ? "text-white" : "text-on-surface-variant hover:text-white"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-4 right-4 -bottom-0.5 h-[2px] rounded-full bg-primary shadow-[0_0_8px_rgba(242,202,80,0.6)] origin-center transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button size="sm" onClick={onOpenBooking}>
              Book Free Consultation
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 hover:bg-white/5 rounded-xl transition-all"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer — always mounted, animated with CSS transforms */}
      <div
        onClick={() => setIsMobileMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/80 backdrop-blur-md cursor-pointer md:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <div
        aria-hidden={!isMobileMenuOpen}
        className={`fixed top-0 right-0 h-full w-[280px] z-50 bg-zinc-950 border-l border-white/5 p-8 flex flex-col justify-between md:hidden shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-12">
          <div className="flex items-center justify-between">
            <span className="font-serif text-lg text-primary font-bold">{clinic.shortName}</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-on-surface-variant hover:text-white p-2 rounded-full hover:bg-white/5"
              aria-label="Close menu"
              tabIndex={isMobileMenuOpen ? 0 : -1}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenTreatment();
              }}
              tabIndex={isMobileMenuOpen ? 0 : -1}
              className="text-left font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant hover:text-white transition-all py-3 border-b border-white/5"
            >
              Treatments
            </button>
            {sectionLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                tabIndex={isMobileMenuOpen ? 0 : -1}
                className="font-sans text-sm uppercase tracking-widest font-semibold text-on-surface-variant hover:text-white transition-all py-3 border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenBooking();
            }}
            tabIndex={isMobileMenuOpen ? 0 : -1}
            className="w-full bg-primary text-on-primary font-semibold py-4 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <Calendar className="w-4 h-4" /> Book Consultation
          </button>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenTreatment();
            }}
            tabIndex={isMobileMenuOpen ? 0 : -1}
            className="w-full border border-primary/30 text-primary font-semibold py-3.5 rounded-2xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <ClipboardList className="w-4 h-4" /> Treatment Plan
          </button>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-on-surface-variant">
            <Shield className="w-3.5 h-3.5 text-primary/70" /> Caring Dental Clinic
          </div>
        </div>
      </div>
    </>
  );
}
