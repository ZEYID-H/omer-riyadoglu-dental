import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { fadeUp } from "../../lib/animations";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /** Enable hover lift + gold glow. */
  interactive?: boolean;
  variants?: Variants | null;
}

/** Glass surface with hover lift, soft shadow, and gold glow. */
export default function GlassCard({
  children,
  className = "",
  interactive = true,
  variants = fadeUp,
}: GlassCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={variants ?? undefined}
      whileHover={interactive && !reduceMotion ? { y: -8 } : undefined}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className={`group relative glass-card rounded-3xl border border-white/5 overflow-hidden transition-[border-color,box-shadow] duration-500 ${
        interactive
          ? "hover:border-primary/30 hover:shadow-[0_24px_70px_-20px_rgba(212,175,55,0.3)]"
          : ""
      } ${className}`}
    >
      {interactive && (
        <div className="pointer-events-none absolute -top-px -right-px w-32 h-32 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      {children}
    </motion.div>
  );
}
