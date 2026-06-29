import type { ElementType, ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { fadeUp, staggerContainer, viewportOnce } from "../../lib/animations";

interface RevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  as?: ElementType;
  /** Stagger immediate children. */
  stagger?: boolean;
  staggerAmount?: number;
  delay?: number;
  id?: string;
}

/**
 * Scroll-triggered reveal wrapper. Animates once when it enters the viewport
 * and gracefully disables motion for users who prefer reduced motion.
 */
export default function Reveal({
  children,
  variants,
  className,
  as = "div",
  stagger = false,
  staggerAmount = 0.12,
  delay = 0,
  id,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion(as as ElementType);

  const resolvedVariants =
    variants ?? (stagger ? staggerContainer(staggerAmount, delay) : fadeUp);

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} id={id}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      variants={resolvedVariants}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </MotionTag>
  );
}
