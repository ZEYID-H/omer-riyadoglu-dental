import { forwardRef, useState, type ButtonHTMLAttributes, type ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
  "relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-widest rounded-full transition-[transform,background-color,box-shadow,color,filter] duration-300 will-change-transform hover:scale-[1.02] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:opacity-50 disabled:pointer-events-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100";

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

/**
 * Premium button: hover/tap scale + a gold ripple on click — implemented with
 * pure CSS (no animation library) so it never pulls a JS runtime into the
 * critical above-the-fold path.
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", children, fullWidth, className = "", onClick, ...props },
  ref
) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick: ButtonProps["onClick"] = (e) => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      const rect = e.currentTarget.getBoundingClientRect();
      const rsize = Math.max(rect.width, rect.height) * 2;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top, size: rsize }]);
      window.setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 650);
    }
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      onClick={handleClick}
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
      <span className="relative z-10 inline-flex items-center justify-center gap-2">{children}</span>
    </button>
  );
});

export default Button;
