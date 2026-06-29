import { Branch } from "../types";

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
  return (
    <section className="py-8 bg-zinc-950/60 border-y border-white/5 relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Title / prompt */}
        <div className="text-center mb-6">
          <span className="text-[10px] uppercase tracking-widest text-primary font-semibold">
            Global Dental Network
          </span>
          <h2 className="font-serif text-lg text-white mt-1">Select Your Nearest Branch</h2>
        </div>

        {/* Scrollable container */}
        <div className="overflow-x-auto scrollbar-none flex justify-start md:justify-center items-center pb-2">
          <div className="flex gap-2.5 min-w-max px-4">
            {branches.map((b) => {
              const isActive = b.id === activeBranchId;
              return (
                <button
                  key={b.id}
                  onClick={() => onSelectBranch(b.id)}
                  className={`px-6 py-3 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 relative border ${
                    isActive
                      ? "gold-pill-active text-primary border-primary/30 shadow-md shadow-primary/5"
                      : "text-on-surface-variant hover:text-white hover:border-white/10 border-transparent bg-white/5"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    )}
                    {b.city} ({b.country})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
