import { useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";

type Size = "sm" | "md" | "lg" | "xl";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: Size;
  /** Disable the default glass panel styling (e.g. for the image lightbox). */
  bare?: boolean;
  panelClassName?: string;
  label: string;
}

const sizeMap: Record<Size, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-5xl",
};

/**
 * Accessible, animated modal shell. Locks body scroll, closes on ESC and
 * backdrop click, restores focus, and respects reduced-motion preferences.
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  size = "md",
  bare = false,
  panelClassName = "",
  label,
}: ModalProps) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    lastFocused.current = document.activeElement as HTMLElement;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    const focusTimer = window.setTimeout(() => {
      panelRef.current
        ?.querySelector<HTMLElement>(
          'input, button, textarea, select, [tabindex]:not([tabindex="-1"])'
        )
        ?.focus();
    }, 80);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", handleKey);
      window.clearTimeout(focusTimer);
      lastFocused.current?.focus?.();
    };
  }, [isOpen, onClose]);

  const duration = reduceMotion ? 0 : 0.3;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
          />

          <motion.div
            ref={panelRef}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            className={`relative w-full ${sizeMap[size]} z-10 ${
              bare
                ? ""
                : "glass-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            } ${panelClassName}`}
          >
            <button
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute top-5 right-5 text-on-surface-variant hover:text-white p-2 rounded-full hover:bg-white/10 transition-all z-30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <X className="w-5 h-5" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
