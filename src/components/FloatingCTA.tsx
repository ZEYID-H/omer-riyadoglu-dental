import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  CalendarRange,
  MessageSquare,
  FileUp,
  ClipboardList,
  Home,
  MapPin,
  CalendarDays,
} from "lucide-react";

interface FloatingCTAProps {
  onOpenBooking: () => void;
  onOpenXRay: () => void;
  onOpenCallBack: () => void;
  onOpenTreatment: () => void;
  onOpenWhatsApp: () => void;
}

export default function FloatingCTA({
  onOpenBooking,
  onOpenXRay,
  onOpenTreatment,
  onOpenWhatsApp,
}: FloatingCTAProps) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const deskActions = [
    { icon: CalendarRange, label: "Free Consultation", onClick: onOpenBooking, primary: true },
    { icon: MessageSquare, label: "WhatsApp", onClick: onOpenWhatsApp },
    { icon: FileUp, label: "Send X-Ray", onClick: onOpenXRay },
    { icon: ClipboardList, label: "Treatment Plan", onClick: onOpenTreatment },
  ];

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
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-[760px] hidden md:block"
          >
            <div className="glass-card rounded-2xl flex items-center justify-around p-3 border-t border-white/10 shadow-2xl">
              {deskActions.map(({ icon: Icon, label, onClick, primary }, idx) => (
                <div key={label} className="flex items-center">
                  {idx > 0 && <div className="w-[1px] h-8 bg-white/10 mr-2" />}
                  <motion.button
                    onClick={onClick}
                    whileHover={reduceMotion ? undefined : { y: -3 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className={`flex flex-col items-center gap-1.5 px-4 lg:px-5 py-2.5 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                      primary
                        ? "text-primary hover:bg-primary/10"
                        : "text-on-surface-variant hover:text-white hover:bg-white/5 group"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 ${primary ? "text-primary" : "group-hover:text-primary transition-colors"}`}
                    />
                    <span className="text-[9px] font-bold tracking-widest font-sans uppercase whitespace-nowrap">
                      {label}
                    </span>
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile bottom navigation bar */}
      <div className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-zinc-950/90 backdrop-blur-2xl border-t border-white/10 flex justify-around items-center h-[68px] px-4 shadow-xl pb-[env(safe-area-inset-bottom)]">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-white active:scale-90 p-2 transition-all"
          aria-label="Back to top"
        >
          <Home className="w-5 h-5" />
          <span className="text-[9px] font-semibold tracking-wider font-sans mt-1">Home</span>
        </button>

        <button
          onClick={() => document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" })}
          className="flex flex-col items-center justify-center text-primary bg-primary/10 border border-primary/20 rounded-2xl px-3 py-1.5 active:scale-90 transition-all"
          aria-label="View location"
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[9px] font-bold tracking-wider font-sans mt-0.5">Location</span>
        </button>

        <button
          onClick={onOpenWhatsApp}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-white active:scale-90 p-2 transition-all"
          aria-label="Contact via WhatsApp"
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[9px] font-semibold tracking-wider font-sans mt-1">WhatsApp</span>
        </button>

        <button
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center text-on-surface-variant hover:text-white active:scale-90 p-2 transition-all"
          aria-label="Book consultation"
        >
          <CalendarDays className="w-5 h-5" />
          <span className="text-[9px] font-semibold tracking-wider font-sans mt-1">Book</span>
        </button>
      </div>
    </>
  );
}
