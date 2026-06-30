import { Suspense, useEffect, useRef, useState, type ReactNode } from "react";

interface LazyMountProps {
  children: ReactNode;
  /** Anchor id placed on the always-present wrapper (so nav links + active-section
   *  tracking work even before the heavy section mounts). */
  id?: string;
  /** Reserved height before mount — keeps scroll height stable (no CLS). */
  minHeight?: number;
  /** How early to mount before entering the viewport. */
  rootMargin?: string;
  className?: string;
}

/**
 * Defers mounting (and therefore the JS execution + image loading) of a
 * below-the-fold section until it is near the viewport. This is what `React.lazy`
 * alone does NOT do — a lazily-imported component still mounts immediately if it
 * is rendered unconditionally. Gating the render behind an IntersectionObserver
 * removes its cost from the initial main-thread work (the key desktop-TBT fix).
 */
export default function LazyMount({
  children,
  id,
  minHeight = 400,
  rootMargin = "800px 0px",
  className = "",
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return (
    <div ref={ref} id={id} className={className} style={show ? undefined : { minHeight }}>
      {show ? <Suspense fallback={null}>{children}</Suspense> : null}
    </div>
  );
}
