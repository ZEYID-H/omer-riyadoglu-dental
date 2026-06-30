import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import LazyMount from "./components/ui/LazyMount";
import { branches } from "./data";

const TrustSection = lazy(() => import("./components/TrustSection"));
const Services = lazy(() => import("./components/Services"));
const ClinicGallery = lazy(() => import("./components/ClinicGallery"));
const BeforeAfter = lazy(() => import("./components/BeforeAfter"));
const Reviews = lazy(() => import("./components/Reviews"));
const Certifications = lazy(() => import("./components/Certifications"));
const FAQ = lazy(() => import("./components/FAQ"));
const BranchSelector = lazy(() => import("./components/BranchSelector"));
const InteractiveMap = lazy(() => import("./components/InteractiveMap"));
const ContactCards = lazy(() => import("./components/ContactCards"));
const Footer = lazy(() => import("./components/Footer"));
const FloatingCTA = lazy(() => import("./components/FloatingCTA"));
const DentalAIAssistant = lazy(() => import("./components/DentalAIAssistant"));

import { BookingModal, XRayModal, CallBackModal, TreatmentPlanModal } from "./components/Modals";

export default function App() {
  const [activeBranchId, setActiveBranchId] = useState("basaksehir");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isXRayOpen, setIsXRayOpen] = useState(false);
  const [isCallBackOpen, setIsCallBackOpen] = useState(false);
  const [isTreatmentOpen, setIsTreatmentOpen] = useState(false);
  // Floating widgets are non-critical: mount them once the main thread is idle
  // (or on first user interaction) so they don't add to initial TBT/LCP.
  const [showWidgets, setShowWidgets] = useState(false);
  const [aiAutoOpen, setAiAutoOpen] = useState(false);

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  const openBooking = useCallback(() => setIsBookingOpen(true), []);

  useEffect(() => {
    const handleOpenBooking = () => setIsBookingOpen(true);
    // If the AI assistant is triggered (e.g. hero button) before the deferred
    // widget has mounted, force-mount it and let it open itself.
    const handleOpenAI = () => {
      setShowWidgets(true);
      setAiAutoOpen(true);
    };
    window.addEventListener("open-booking", handleOpenBooking);
    window.addEventListener("open-ai-assistant", handleOpenAI);
    return () => {
      window.removeEventListener("open-booking", handleOpenBooking);
      window.removeEventListener("open-ai-assistant", handleOpenAI);
    };
  }, []);

  useEffect(() => {
    if (showWidgets) return;
    const reveal = () => setShowWidgets(true);
    const ric = (window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    }).requestIdleCallback;
    const id = ric ? ric(reveal, { timeout: 2500 }) : window.setTimeout(reveal, 1500);
    window.addEventListener("scroll", reveal, { once: true, passive: true });
    window.addEventListener("pointerdown", reveal, { once: true });
    return () => {
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("pointerdown", reveal);
    };
  }, [showWidgets]);

  const handleTreatmentProceed = useCallback(() => {
    setIsTreatmentOpen(false);
    setIsBookingOpen(true);
  }, []);

  return (
    <div className="bg-[#131313] min-h-screen text-[#e5e2e1] font-sans selection:bg-[#f2ca50]/20 selection:text-primary">
      <Navbar onOpenBooking={openBooking} onOpenTreatment={() => setIsTreatmentOpen(true)} />

      <main>
        <Hero onOpenBooking={openBooking} />

        <LazyMount id="trust" minHeight={460}>
          <TrustSection />
        </LazyMount>

        <LazyMount id="services" minHeight={680}>
          <Services />
        </LazyMount>

        <LazyMount id="gallery" minHeight={900}>
          <ClinicGallery />
        </LazyMount>

        <LazyMount id="before-after" minHeight={720}>
          <BeforeAfter />
        </LazyMount>

        <LazyMount id="reviews" minHeight={560}>
          <Reviews />
        </LazyMount>

        <LazyMount id="certifications" minHeight={520}>
          <Certifications />
        </LazyMount>

        <LazyMount id="faq" minHeight={480}>
          <FAQ />
        </LazyMount>

        <LazyMount minHeight={120}>
          <BranchSelector
            branches={branches}
            activeBranchId={activeBranchId}
            onSelectBranch={setActiveBranchId}
          />
        </LazyMount>

        <LazyMount id="map-section" minHeight={620}>
          <InteractiveMap activeBranch={activeBranch} />
        </LazyMount>

        <LazyMount id="contact" minHeight={720}>
          <ContactCards
            activeBranch={activeBranch}
            onOpenBooking={openBooking}
            onOpenCallBack={() => setIsCallBackOpen(true)}
            onOpenXRay={() => setIsXRayOpen(true)}
          />
        </LazyMount>

        <LazyMount minHeight={520}>
          <Footer onOpenBooking={openBooking} />
        </LazyMount>
      </main>

      {showWidgets && (
        <Suspense fallback={null}>
          <FloatingCTA />
          <DentalAIAssistant autoOpen={aiAutoOpen} />
        </Suspense>
      )}

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <XRayModal isOpen={isXRayOpen} onClose={() => setIsXRayOpen(false)} />
      <CallBackModal isOpen={isCallBackOpen} onClose={() => setIsCallBackOpen(false)} />
      <TreatmentPlanModal
        isOpen={isTreatmentOpen}
        onClose={() => setIsTreatmentOpen(false)}
        onProceed={handleTreatmentProceed}
      />
    </div>
  );
}
