import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Bot,
  X,
  Send,
  Calendar,
  Phone,
  MessageCircle,
  AlertTriangle,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { clinic, buildWhatsAppUrl } from "../clinicInfo";

/**
 * AI Dental Assistant — a guided, front-end-only intake widget.
 *
 * It does NOT diagnose. It collects preliminary information, estimates urgency
 * with simple rule-based logic, and produces a case summary the visitor can
 * share with the clinic (WhatsApp), book an appointment, or call.
 */

const DISCLAIMER =
  "This assistant does not provide medical diagnosis. It only collects preliminary information to help the clinic understand your case before your visit. For emergencies or severe pain, contact the clinic or seek urgent medical care.";

type Urgency = "high" | "medium" | "low";

interface ChatMessage {
  id: number;
  role: "bot" | "user";
  text: string;
}

interface CaseData {
  concern: string;
  duration: string;
  pain: string;
  warnings: string[];
  previous: string;
}

type StepKey = "concern" | "duration" | "pain" | "warnings" | "previous" | "book";

interface Step {
  key: StepKey;
  question: string;
  options: string[];
  multi?: boolean;
  allowText?: boolean;
}

const STEPS: Step[] = [
  {
    key: "concern",
    question: "What dental problem are you experiencing?",
    options: [
      "Tooth pain",
      "Gum bleeding",
      "Swelling",
      "Broken tooth",
      "Braces issue",
      "Cosmetic consultation",
      "General check-up",
    ],
    allowText: true,
  },
  {
    key: "duration",
    question: "How long have you had this problem?",
    options: ["Today", "1–3 days", "More than a week", "More than a month"],
  },
  {
    key: "pain",
    question: "How severe is the pain, from 1 to 10?",
    options: ["No pain", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
  {
    key: "warnings",
    question:
      "Do you have any of these warning symptoms? Select all that apply, then continue.",
    options: [
      "Swelling",
      "Fever",
      "Bleeding that won't stop",
      "Pus",
      "Difficulty opening mouth",
      "Difficulty swallowing",
      "Difficulty breathing",
      "Recent injury / trauma",
    ],
    multi: true,
  },
  {
    key: "previous",
    question: "Have you taken any medication or seen a dentist for this issue before?",
    options: ["Taken medication", "Seen a dentist", "Both", "Not yet"],
    allowText: true,
  },
  {
    key: "book",
    question: "Would you like to book an appointment?",
    options: ["Yes, book an appointment", "Just send my summary"],
  },
];

const HIGH_URGENCY_KEYWORDS = [
  "severe",
  "swelling",
  "swollen",
  "fever",
  "pus",
  "abscess",
  "bleeding that won't stop",
  "won't stop",
  "trauma",
  "injury",
  "knocked out",
  "difficulty breathing",
  "difficulty swallowing",
  "difficulty opening",
  "can't open",
  "cannot open",
];

const MEDIUM_URGENCY_KEYWORDS = [
  "pain",
  "ache",
  "sensitiv",
  "broken",
  "chipped",
  "cracked",
  "gum bleeding",
  "lost filling",
  "filling",
  "crown",
  "loose",
];

function computeUrgency(data: CaseData): Urgency {
  const haystack = [
    data.concern,
    data.previous,
    data.warnings.join(" "),
  ]
    .join(" ")
    .toLowerCase();

  const pain = data.pain === "No pain" ? 0 : parseInt(data.pain, 10) || 0;

  const severeWarnings = data.warnings.filter((w) => w !== "").length > 0;
  const hasHighKeyword = HIGH_URGENCY_KEYWORDS.some((k) => haystack.includes(k));
  const brokenWithPain = haystack.includes("broken") && pain >= 7;

  if (severeWarnings || hasHighKeyword || brokenWithPain || pain >= 8) {
    return "high";
  }

  const hasMediumKeyword = MEDIUM_URGENCY_KEYWORDS.some((k) => haystack.includes(k));
  if (hasMediumKeyword || pain >= 4) {
    return "medium";
  }

  return "low";
}

const URGENCY_COPY: Record<Urgency, { label: string; action: string; tone: string }> = {
  high: {
    label: "High — may need urgent attention",
    action:
      "Your answers suggest this may need urgent dental attention. This is not a diagnosis, but we recommend contacting the clinic as soon as possible. If symptoms are severe (such as difficulty breathing or swallowing, spreading swelling, or bleeding that won't stop), seek urgent medical care now.",
    tone: "text-red-300 bg-red-500/10 border-red-500/30",
  },
  medium: {
    label: "Medium — book an appointment soon",
    action:
      "Your symptoms may require dental attention. We recommend booking an appointment soon so the dentist can assess your case. This is not a diagnosis.",
    tone: "text-primary bg-primary/10 border-primary/30",
  },
  low: {
    label: "Low — routine visit",
    action:
      "This looks like it can be handled with a routine appointment. Book whenever it is convenient for you. This is not a diagnosis.",
    tone: "text-green-300 bg-green-500/10 border-green-500/30",
  },
};

const phoneDigits = clinic.phoneDisplay.replace(/[^0-9+]/g, "");
const hasRealPhone = /\d/.test(phoneDigits);

let messageId = 0;
const nextId = () => ++messageId;

export default function DentalAIAssistant() {
  const reduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [draft, setDraft] = useState("");
  const [selectedWarnings, setSelectedWarnings] = useState<string[]>([]);
  const [data, setData] = useState<CaseData>({
    concern: "",
    duration: "",
    pain: "",
    warnings: [],
    previous: "",
  });
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: nextId(),
      role: "bot",
      text: `Hello, I'm ${clinic.shortName}'s AI Dental Assistant. I can ask you a few questions about your dental concern before booking. This is not a diagnosis, but it helps the doctor understand your case faster.`,
    },
    { id: nextId(), role: "bot", text: STEPS[0].question },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const currentStep = STEPS[stepIndex];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen, finished]);

  const pushMessage = (role: ChatMessage["role"], text: string) =>
    setMessages((prev) => [...prev, { id: nextId(), role, text }]);

  const finalize = (nextData: CaseData) => {
    const urgency = computeUrgency(nextData);
    setFinished(true);
    pushMessage("bot", URGENCY_COPY[urgency].action);
    pushMessage(
      "bot",
      "Here is your case summary. You can book an appointment, call us, or send it to the clinic via WhatsApp. Remember: this is preliminary information, not a diagnosis."
    );
  };

  const advance = (key: StepKey, value: string, nextData: CaseData) => {
    if (key === "book") {
      if (value.startsWith("Yes")) {
        // Scroll to / open the existing booking flow.
        window.dispatchEvent(new CustomEvent("open-booking"));
      }
      finalize(nextData);
      return;
    }
    const next = STEPS[stepIndex + 1];
    setStepIndex((i) => i + 1);
    pushMessage("bot", next.question);
  };

  const handleOption = (value: string) => {
    const key = currentStep.key;

    if (currentStep.multi) {
      // Toggle selection; confirmation happens via the Continue button.
      setSelectedWarnings((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      );
      return;
    }

    pushMessage("user", value);
    const nextData = { ...data, [key]: value } as CaseData;
    setData(nextData);
    advance(key, value, nextData);
  };

  const confirmWarnings = () => {
    const chosen = selectedWarnings;
    const label = chosen.length ? chosen.join(", ") : "None of these";
    pushMessage("user", label);
    const nextData = { ...data, warnings: chosen };
    setData(nextData);
    advance("warnings", label, nextData);
  };

  const handleSendText = () => {
    const text = draft.trim();
    if (!text || finished) return;
    setDraft("");

    if (currentStep.multi) {
      // Treat free text as an extra warning note.
      pushMessage("user", text);
      const nextData = { ...data, warnings: [...selectedWarnings, text] };
      setData(nextData);
      advance("warnings", text, nextData);
      return;
    }

    pushMessage("user", text);
    const nextData = { ...data, [currentStep.key]: text } as CaseData;
    setData(nextData);
    advance(currentStep.key, text, nextData);
  };

  const restart = () => {
    setStepIndex(0);
    setFinished(false);
    setDraft("");
    setSelectedWarnings([]);
    setData({ concern: "", duration: "", pain: "", warnings: [], previous: "" });
    setMessages([
      { id: nextId(), role: "bot", text: STEPS[0].question },
    ]);
  };

  const urgency = finished ? computeUrgency(data) : null;

  const summaryText = () => {
    const u = computeUrgency(data);
    return [
      `*${clinic.name} — Dental Assistant Summary*`,
      "",
      `Patient Concern: ${data.concern || "—"}`,
      `Duration: ${data.duration || "—"}`,
      `Pain Level (1-10): ${data.pain || "—"}`,
      `Warning Symptoms: ${data.warnings.length ? data.warnings.join(", ") : "None reported"}`,
      `Previous Treatment/Medication: ${data.previous || "—"}`,
      `Suggested Urgency: ${URGENCY_COPY[u].label}`,
      `Recommended Action: ${URGENCY_COPY[u].action}`,
      "",
      "Note: Collected by the website assistant. This is preliminary information, not a medical diagnosis.",
    ].join("\n");
  };

  const handleBook = () => {
    window.dispatchEvent(new CustomEvent("open-booking"));
    setIsOpen(false);
  };

  const handleCall = () => {
    if (hasRealPhone) {
      window.location.href = `tel:${phoneDigits}`;
    } else {
      // No phone configured yet — fall back to the booking flow.
      window.dispatchEvent(new CustomEvent("open-booking"));
      setIsOpen(false);
    }
  };

  const handleWhatsApp = () => {
    window.open(buildWhatsAppUrl(summaryText()), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Floating launcher button (bottom-right, clears mobile nav bar) */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Open AI Dental Assistant"
        aria-expanded={isOpen}
        whileHover={reduceMotion ? undefined : { scale: 1.05 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[60] flex items-center gap-2 rounded-full bg-primary text-on-primary shadow-xl shadow-primary/30 pl-4 pr-5 py-3 font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
      >
        <Bot className="w-5 h-5" />
        <span className="hidden sm:inline">AI Dental Assistant</span>
        <span className="sm:hidden">Assistant</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Mobile backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="AI Dental Assistant"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed z-[70] flex flex-col glass-card border border-white/10 shadow-2xl overflow-hidden
                inset-x-3 bottom-3 top-16
                md:inset-auto md:bottom-24 md:right-6 md:top-auto md:w-[400px] md:h-[600px]
                rounded-3xl"
            >
              {/* Header with clinic branding */}
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-white/10 bg-zinc-950/60">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center text-primary shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-serif text-sm text-primary font-bold truncate">
                      {clinic.shortName}
                    </div>
                    <div className="text-[10px] uppercase tracking-widest text-on-surface-variant">
                      AI Dental Assistant
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close assistant"
                  className="text-on-surface-variant hover:text-white p-2 rounded-full hover:bg-white/10 transition-all shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Disclaimer banner */}
              <div className="px-4 py-2.5 bg-primary/5 border-b border-white/5 flex items-start gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                <p className="text-[10px] leading-relaxed text-on-surface-variant">{DISCLAIMER}</p>
              </div>

              {/* Chat area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        m.role === "user"
                          ? "bg-primary text-on-primary rounded-br-sm font-medium"
                          : "bg-white/5 text-on-surface border border-white/5 rounded-bl-sm"
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}

                {/* Final summary card */}
                {finished && urgency && (
                  <div className="rounded-2xl border border-white/10 bg-zinc-950/60 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-primary">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-widest font-bold">Case Summary</span>
                    </div>
                    <dl className="space-y-1.5 text-[11px]">
                      <SummaryRow label="Patient Concern" value={data.concern || "—"} />
                      <SummaryRow label="Duration" value={data.duration || "—"} />
                      <SummaryRow label="Pain Level" value={data.pain ? `${data.pain}/10` : "—"} />
                      <SummaryRow
                        label="Warning Symptoms"
                        value={data.warnings.length ? data.warnings.join(", ") : "None reported"}
                      />
                      <SummaryRow label="Previous Treatment" value={data.previous || "—"} />
                    </dl>
                    <div className={`rounded-xl border px-3 py-2 text-[11px] font-semibold ${URGENCY_COPY[urgency].tone}`}>
                      Suggested Urgency: {URGENCY_COPY[urgency].label}
                    </div>
                    <p className="text-[10px] text-on-surface-variant leading-relaxed">
                      {URGENCY_COPY[urgency].action}
                    </p>

                    <div className="grid grid-cols-1 gap-2 pt-1">
                      <button
                        onClick={handleBook}
                        className="flex items-center justify-center gap-2 bg-primary text-on-primary py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider hover:brightness-110 transition-all active:scale-[0.98]"
                      >
                        <Calendar className="w-4 h-4" /> Book Appointment
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={handleCall}
                          className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider hover:bg-white/10 transition-all active:scale-[0.98]"
                          title={hasRealPhone ? "Call the clinic" : "Phone not configured — opens booking"}
                        >
                          <Phone className="w-4 h-4 text-primary" /> Call
                        </button>
                        <button
                          onClick={handleWhatsApp}
                          className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white py-2.5 rounded-xl text-[11px] font-semibold uppercase tracking-wider hover:bg-white/10 transition-all active:scale-[0.98]"
                        >
                          <MessageCircle className="w-4 h-4 text-primary" /> WhatsApp
                        </button>
                      </div>
                      <button
                        onClick={restart}
                        className="text-[10px] text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest mt-1"
                      >
                        Start over
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick options + input */}
              {!finished && (
                <div className="border-t border-white/10 bg-zinc-950/40">
                  <div className="px-4 pt-3 flex flex-wrap gap-2 max-h-[140px] overflow-y-auto">
                    {currentStep.options.map((opt) => {
                      const active = currentStep.multi && selectedWarnings.includes(opt);
                      return (
                        <button
                          key={opt}
                          onClick={() => handleOption(opt)}
                          className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border transition-all active:scale-95 ${
                            active
                              ? "bg-primary text-on-primary border-primary"
                              : "bg-white/5 text-on-surface-variant border-white/10 hover:text-white hover:border-primary/40"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {currentStep.multi && (
                    <div className="px-4 pt-2">
                      <button
                        onClick={confirmWarnings}
                        className="w-full bg-primary/10 text-primary border border-primary/30 py-2 rounded-xl text-[11px] font-semibold uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-all"
                      >
                        Continue{selectedWarnings.length ? ` (${selectedWarnings.length})` : " — none of these"}
                      </button>
                    </div>
                  )}

                  <div className="p-3 flex items-center gap-2">
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSendText();
                      }}
                      placeholder={
                        currentStep.allowText
                          ? "Type your answer…"
                          : "Or type a note…"
                      }
                      aria-label="Message the assistant"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all"
                    />
                    <button
                      onClick={handleSendText}
                      aria-label="Send"
                      className="w-10 h-10 shrink-0 rounded-xl bg-primary text-on-primary flex items-center justify-center hover:brightness-110 transition-all active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="text-on-surface-variant shrink-0 w-32">{label}:</dt>
      <dd className="text-white font-medium break-words">{value}</dd>
    </div>
  );
}
