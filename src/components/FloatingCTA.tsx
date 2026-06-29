import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Phone, MessageSquare, CalendarDays, Bot } from "lucide-react";
import { clinic, buildWhatsAppUrl } from "../clinicInfo";

/**
 * Floating quick actions: Call, WhatsApp, Book, AI Assistant.
 * Self-contained — uses the clinic config and window events so it needs no props.
 */
const telHref = `tel:+${clinic.whatsapp.replace(/[^0-9]/g, "")}`;

const openBooking = () => window.dispatchEvent(new CustomEvent("open-booking"));
const openAI = () => window.dispatchEvent(new CustomEvent("open-ai-assistant"));
const openWhatsApp = () =>
  window.open(buildWhatsAppUrl(), "_blank", "noopener,noreferrer");

type Action = {
  icon: typeof Phone;
  label: string;
  onClick?: () => void;
  href?: string;
  primary?: boolean;
};

const actions: Action[] = [
  { icon: Phone, label: "Call", href: telHref },
  { icon: MessageSquare, label: "WhatsApp", onClick: openWhatsApp },
  { icon: CalendarDays, label: "Book", onClick: openBooking, primary: true },
  { icon: Bot, label: "AI Assistant", onClick: openAI },
];

export default function FloatingCTA() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop / tablet floating action bar */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-auto hidden md:block"
          >
            <div className="glass-card rounded-2xl flex items-center gap-1 p-2.5 border-t border-white/10 shadow-2xl">
              {actions.map(({ icon: Icon, label, onClick, href, primary }, idx) => {
                const inner = (
                  <>
                    <Icon
                      className={`w-5 h-5 ${
                        primary ? "text-on-primary" : "text-primary group-hover:scale-110 transition-transform"
                      }`}
                    />
                    <span className="text-[9px] font-bold tracking-widest font-sans uppercase whitespace-nowrap">
                      {label}
                    </span>
                  </>
                );
                const cls = `group flex flex-col items-center gap-1.5 px-5 py-2.5 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                  primary
                    ? "bg-primary text-on-primary hover:brightness-110"
                    : "text-on-surface-variant hover:text-white hover:bg-white/5"
                }`;
                return (
                  <div key={label} className="flex items-center">
                    {idx > 0 && !primary && <div className="w-[1px] h-8 bg-white/10 mr-1" />}
                    {href ? (
                      <a href={href} className={cls} aria-label={label}>
                        {inner}
                      </a>
                    ) : (
                      <motion.button
                        onClick={onClick}
                        aria-label={label}
                        whileHover={reduceMotion ? undefined : { y: -3 }}
                        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                        transition={{ type: "spring", stiffness: 400, damping: 22 }}
                        className={cls}
                      >
                        {inner}
                      </motion.button>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom navigation bar */}
      <div className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-zinc-950/90 backdrop-blur-2xl border-t border-white/10 flex justify-around items-center h-[68px] px-2 shadow-xl pb-[env(safe-area-inset-bottom)]">
        {actions.map(({ icon: Icon, label, onClick, href, primary }) => {
          const inner = (
            <>
              <Icon className="w-5 h-5" />
              <span className="text-[9px] font-semibold tracking-wider font-sans mt-1">{label}</span>
            </>
          );
          const cls = `flex flex-col items-center justify-center active:scale-90 p-2 transition-all ${
            primary
              ? "text-primary bg-primary/10 border border-primary/20 rounded-2xl px-3"
              : "text-on-surface-variant hover:text-white"
          }`;
          return href ? (
            <a key={label} href={href} className={cls} aria-label={label}>
              {inner}
            </a>
          ) : (
            <button key={label} onClick={onClick} className={cls} aria-label={label}>
              {inner}
            </button>
          );
        })}
      </div>
    </>
  );
}
