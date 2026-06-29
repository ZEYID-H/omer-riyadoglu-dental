import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
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

const SectionFallback = () => (
  <div className="py-24 flex items-center justify-center" aria-hidden="true">
    <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
  </div>
);

export default function App() {
  const [activeBranchId, setActiveBranchId] = useState("basaksehir");
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isXRayOpen, setIsXRayOpen] = useState(false);
  const [isCallBackOpen, setIsCallBackOpen] = useState(false);
  const [isTreatmentOpen, setIsTreatmentOpen] = useState(false);

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  const openBooking = useCallback(() => setIsBookingOpen(true), []);

  useEffect(() => {
    const handleOpenBooking = () => setIsBookingOpen(true);
    window.addEventListener("open-booking", handleOpenBooking);
    return () => window.removeEventListener("open-booking", handleOpenBooking);
  }, []);

  const handleTreatmentProceed = useCallback(() => {
    setIsTreatmentOpen(false);
    setIsBookingOpen(true);
  }, []);

  return (
    <div className="bg-[#131313] min-h-screen text-[#e5e2e1] font-sans selection:bg-[#f2ca50]/20 selection:text-primary">
      <Navbar onOpenBooking={openBooking} onOpenTreatment={() => setIsTreatmentOpen(true)} />

      <main>
        <Hero onOpenBooking={openBooking} />

        <Suspense fallback={<SectionFallback />}>
          <TrustSection />

          <Services />

          <ClinicGallery />

          <BeforeAfter />

          <Reviews />

          <Certifications />

          <FAQ />

          <BranchSelector
            branches={branches}
            activeBranchId={activeBranchId}
            onSelectBranch={setActiveBranchId}
          />

          <InteractiveMap activeBranch={activeBranch} />

          <ContactCards
            activeBranch={activeBranch}
            onOpenBooking={openBooking}
            onOpenCallBack={() => setIsCallBackOpen(true)}
            onOpenXRay={() => setIsXRayOpen(true)}
          />

          <Footer onOpenBooking={openBooking} />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <FloatingCTA />
        <DentalAIAssistant />
      </Suspense>

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
