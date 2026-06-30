import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Plus, HelpCircle } from "lucide-react";
import Reveal from "./ui/Reveal";

/**
 * FAQ accordion. The same questions/answers are mirrored in the FAQPage
 * JSON-LD in index.html — keep them in sync if you edit copy here.
 */
export const faqs = [
  {
    q: "How often should I visit the dentist?",
    a: "For most people, a check-up and cleaning every six months helps prevent problems early. Your dentist may suggest a different interval based on your needs.",
  },
  {
    q: "What should I do if I have severe tooth pain?",
    a: "Severe or worsening pain — especially with swelling, fever, or difficulty opening your mouth — may need prompt dental attention. Please contact the clinic as soon as possible, or seek urgent care if symptoms are severe. This is general guidance, not a diagnosis.",
  },
  {
    q: "Do you provide emergency appointments?",
    a: "Yes. Same-day slots are often available for urgent dental pain. Call or message us and we will do our best to see you quickly.",
  },
  {
    q: "How can I book an appointment?",
    a: "You can book through the appointment form on this site, message us on WhatsApp, or call the clinic directly. Our team will confirm your preferred date and time.",
  },
  {
    q: "How long does teeth whitening take?",
    a: "An in-clinic whitening session typically takes around an hour. Your dentist will confirm the best approach for you during a short consultation.",
  },
];

export default function FAQ() {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#0e0e0e] border-t border-white/5 relative z-20">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <Reveal className="text-center mb-14">
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary font-semibold flex items-center justify-center gap-1.5 mb-2">
            <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-white tracking-tight">Questions &amp; Answers</h2>
        </Reveal>

        <Reveal stagger staggerAmount={0.06} className="space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.q}
                className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden transition-colors hover:border-white/10"
              >
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 text-left px-5 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-2xl"
                  >
                    <span className="font-serif text-base md:text-lg text-white">{item.q}</span>
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-on-surface-variant leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
