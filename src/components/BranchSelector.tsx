import { motion, useReducedMotion } from "motion/react";
import { Branch } from "../types";
import Reveal from "./ui/Reveal";

interface BranchSelectorProps {
  branches: Branch[];
  activeBranchId: string;
  onSelectBranch: (id: string) => void;
}

export default function BranchSelector({
  branches,
  activeBranchId,
  onSelectBranch,
}: BranchSelectorProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-8 bg-zinc-950/60 border-y border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <Reveal className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
            Global Dental Network
          </span>
          <h2 className="font-serif text-lg text-white mt-1">Select Your Nearest Branch</h2>
        </Reveal>

        <div className="overflow-x-auto scrollbar-none flex justify-start md:justify-center items-center pb-2">
          <div className="flex gap-2.5 min-w-max px-4">
            {branches.map((b) => {
              const isActive = b.id === activeBranchId;
              return (
                <motion.button
                  key={b.id}
                  onClick={() => onSelectBranch(b.id)}
                  whileTap={reduceMotion ? undefined : { scale: 0.95 }}
                  aria-pressed={isActive}
                  className={`relative px-6 py-3 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-colors duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                    isActive
                      ? "text-primary border-primary/30"
                      : "text-on-surface-variant hover:text-white hover:border-white/10 border-transparent bg-white/5"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="branch-active"
                      className="absolute inset-0 rounded-full gold-pill-active shadow-md shadow-primary/5"
                      transition={
                        reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }
                      }
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                    {b.city} ({b.country})
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
