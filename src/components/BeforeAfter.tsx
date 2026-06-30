import { useCallback, useRef, useState } from "react";
import { motion } from "motion/react";
import { Sparkles, ChevronsLeftRight } from "lucide-react";
import Reveal from "./ui/Reveal";
import { fadeUp } from "../lib/animations";

/**
 * Before / After gallery with a draggable comparison slider.
 *
 * NOTE: The images below are GENERIC STOCK PHOTOS used as preliminary
 * placeholders (stored in /public/before-after/). They are NOT real patients
 * of this clinic. Replace them with real, consented patient photos when
 * available — just swap the files at the same paths, or edit the URLs here.
 */
interface Case {
  id: string;
  label: string;
  before: string;
  after: string;
}

const cases: Case[] = [
  { id: "case-1", label: "Smile Design", before: "/before-after/case1-before.webp", after: "/before-after/case1-after.webp" },
  { id: "case-2", label: "Veneers", before: "/before-after/case2-before.webp", after: "/before-after/case2-after.webp" },
  { id: "case-3", label: "Teeth Whitening", before: "/before-after/case3-before.webp", after: "/before-after/case3-after.webp" },
  { id: "case-4", label: "Orthodontics (Braces)", before: "/before-after/case4-before.webp", after: "/before-after/case4-after.webp" },
];

function CompareSlider({ before, after, label }: { before: string; after: string; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const draggingRef = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (draggingRef.current) setFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    draggingRef.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className="relative aspect-[3/4] w-full overflow-hidden select-none cursor-ew-resize touch-none bg-zinc-900"
    >
      {/* After (base, full) */}
      <img
        src={after}
        alt={`${label} — after (sample placeholder)`}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      <span className="absolute top-3 right-3 z-10 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-primary pointer-events-none">
        After
      </span>

      {/* Before (clipped to the left of the handle) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <img
          src={before}
          alt={`${label} — before (sample placeholder)`}
          loading="lazy"
          decoding="async"
          draggable={false}
          className="absolute inset-0 w-full h-full object-cover grayscale-[0.5] brightness-90"
        />
        <span className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
          Before
        </span>
      </div>

      {/* Divider + handle */}
      <div className="absolute inset-y-0 z-10 pointer-events-none" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -translate-x-1/2 w-0.5 bg-white/80 shadow-[0_0_10px_rgba(0,0,0,0.5)]" />
        <button
          type="button"
          aria-label={`Drag to compare ${label} before and after`}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg shadow-black/40 pointer-events-auto cursor-ew-resize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <ChevronsLeftRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  return (
    <section className="py-24 bg-[#0e0e0e] border-t border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold flex items-center justify-center gap-1.5 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Real Transformations
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight">Before &amp; After</h2>
          <p className="text-sm text-on-surface-variant max-w-xl mt-3 mx-auto">
            Drag the slider to compare. Sample placeholder images shown — real, consented patient
            photos will appear here.
          </p>
        </Reveal>

        <Reveal stagger staggerAmount={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cases.map((c) => (
            <motion.div key={c.id} variants={fadeUp}>
              <div className="rounded-3xl overflow-hidden border border-white/5 shadow-lg hover:border-primary/30 hover:shadow-[0_24px_70px_-20px_rgba(212,175,55,0.3)] transition-[border-color,box-shadow] duration-500">
                <CompareSlider before={c.before} after={c.after} label={c.label} />
                <div className="p-5 bg-zinc-950/60 text-center">
                  <h3 className="font-serif text-lg text-white">{c.label}</h3>
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                    Drag to compare · sample
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
