import { forwardRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  fullWidth?: boolean;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

const base =
  "relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-widest rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-on-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/40 hover:brightness-110",
  outline:
    "border border-primary/30 text-primary hover:border-primary/60 hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/15",
  ghost: "text-on-surface-variant hover:text-white hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  sm: "px-5 py-2.5 text-[11px]",
  md: "px-7 py-3.5 text-xs",
  lg: "px-10 py-4 text-xs",
};

/** Premium button: hover glow, tap scale, and a gold ripple on click. */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", children, fullWidth, className = "", onClick, ...props },
  ref
) {
  const reduceMotion = useReducedMotion();
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick: ButtonProps["onClick"] = (e) => {
    if (!reduceMotion) {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const id = Date.now();
      setRipples((prev) => [
        ...prev,
        { id, x: e.clientX - rect.left, y: e.clientY - rect.top, size },
      ]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    }
    onClick?.(e);
  };

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/30 animate-ripple"
          style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
        />
      ))}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
});

export default Button;
