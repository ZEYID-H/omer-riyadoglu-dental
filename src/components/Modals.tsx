import React, { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Upload,
  Calendar,
  Phone,
  CheckCircle2,
  Shield,
  Sparkles,
  X,
  Clock,
  Gem,
  ArrowRight,
  Check,
} from "lucide-react";
import { branches, treatments } from "../data";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fieldClass =
  "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all";
const selectClass =
  "w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all";
const labelClass =
  "block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1.5";

const stepMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
};

// ── Booking Modal ──────────────────────────────────────────────────────────
export function BookingModal({ isOpen, onClose }: ModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    branch: "basaksehir",
    treatment: "smile-design",
    date: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      const t = window.setTimeout(() => setStep(1), 300);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1500);
  };

  const selectedBranch = branches.find((b) => b.id === formData.branch);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" label="Book free consultation">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.form key="form" {...stepMotion} onSubmit={handleSubmit} className="p-8 relative">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-primary font-semibold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Luxury Concierge Service
              </span>
              <h3 className="font-serif text-2xl text-white">Book Free Consultation</h3>
              <p className="text-sm text-on-surface-variant mt-1">
                Begin your bespoke journey to a masterpiece smile.
              </p>
            </div>

            <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-1">
              <div>
                <label htmlFor="bk-name" className={labelClass}>Full Name</label>
                <input
                  id="bk-name"
                  type="text"
                  required
                  placeholder="e.g. Elizabeth Sterling"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={fieldClass}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bk-email" className={labelClass}>Email Address</label>
                  <input
                    id="bk-email"
                    type="email"
                    required
                    placeholder="e.g. elizabeth@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="bk-phone" className={labelClass}>Phone / WhatsApp</label>
                  <input
                    id="bk-phone"
                    type="tel"
                    required
                    placeholder="e.g. +1 (416) 555-0199"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bk-branch" className={labelClass}>Preferred Location</label>
                  <select
                    id="bk-branch"
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    className={selectClass}
                  >
                    {branches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.city})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="bk-treatment" className={labelClass}>Treatment Goal</label>
                  <select
                    id="bk-treatment"
                    value={formData.treatment}
                    onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                    className={selectClass}
                  >
                    {treatments.map((t) => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="bk-date" className={labelClass}>Preferred Consult Date</label>
                <input
                  id="bk-date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="bk-notes" className={labelClass}>Additional Notes (Optional)</label>
                <textarea
                  id="bk-notes"
                  rows={2}
                  placeholder="Share details about your expectations, dental history, or timeline."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className={`${fieldClass} resize-none`}
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3">
              <Button type="submit" size="lg" fullWidth disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                    Securing Suite Reservation...
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" /> Secure Consult Reservation
                  </>
                )}
              </Button>
              <div className="flex items-center justify-center gap-1.5 text-xs text-on-surface-variant">
                <Shield className="w-3.5 h-3.5 text-primary/70" /> Private and encrypted consultation booking
              </div>
            </div>
          </motion.form>
        ) : (
          <motion.div key="success" {...stepMotion} className="p-8 text-center relative flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
              Suite Blocked Successfully
            </span>
            <h3 className="font-serif text-3xl text-white mb-3">Reservation Pending</h3>
            <p className="text-sm text-on-surface-variant max-w-sm mb-6">
              Thank you, <strong>{formData.name}</strong>. A dedicated concierge specialist from our{" "}
              <strong>{selectedBranch?.name}</strong> has been assigned to you.
            </p>
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left space-y-2 mb-8 text-xs">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Reference ID:</span>
                <span className="font-mono text-white">LMA-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Assigned Clinic:</span>
                <span className="text-white font-medium">{selectedBranch?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">Consultation Type:</span>
                <span className="text-white font-medium">Digital Smile Consult</span>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant/80">
              We will contact you via phone/WhatsApp at <strong>{formData.phone}</strong> within 15 minutes.
            </p>
            <Button variant="ghost" size="sm" onClick={onClose} className="mt-8 bg-white/10 hover:bg-white/20 text-white">
              Close Window
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </Modal>
  );
}

// ── Treatment Plan Modal ─────────────────────────────────────────────────────
interface TreatmentPlanModalProps extends ModalProps {
  onProceed: () => void;
}

export function TreatmentPlanModal({ isOpen, onClose, onProceed }: TreatmentPlanModalProps) {
  const [selected, setSelected] = useState<string>(treatments[0]?.id ?? "");

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" label="Build your treatment plan">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="p-8 relative">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold flex items-center gap-1.5 mb-1">
            <Gem className="w-3.5 h-3.5" /> Bespoke Care Pathways
          </span>
          <h3 className="font-serif text-2xl text-white">Build Your Treatment Plan</h3>
          <p className="text-sm text-on-surface-variant mt-1">
            Select a signature pathway and our specialists will tailor every detail to you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[52vh] overflow-y-auto pr-1">
          {treatments.map((t) => {
            const isActive = selected === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelected(t.id)}
                aria-pressed={isActive}
                className={`relative text-left p-5 rounded-2xl border transition-all duration-300 ${
                  isActive
                    ? "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-white/5 bg-white/5 hover:border-primary/20 hover:bg-white/[0.07]"
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-serif text-lg text-white">{t.name}</h4>
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-all ${
                      isActive ? "bg-primary border-primary text-on-primary" : "border-white/20 text-transparent"
                    }`}
                  >
                    <Check className="w-3 h-3" />
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-4">{t.description}</p>
                <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-wider font-semibold">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-on-surface-variant">
                    <Clock className="w-3 h-3 text-primary" /> {t.duration}
                  </span>
                  {t.costEstimate && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      <Gem className="w-3 h-3" /> {t.costEstimate}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3">
          <Button size="lg" fullWidth onClick={onProceed}>
            Request This Treatment Plan <ArrowRight className="w-4 h-4" />
          </Button>
          <div className="flex items-center justify-center gap-1.5 text-xs text-on-surface-variant">
            <Shield className="w-3.5 h-3.5 text-primary/70" /> Personalized quote with no obligation
          </div>
        </div>
      </div>
    </Modal>
  );
}

// ── Send X-Ray Modal ─────────────────────────────────────────────────────────
export function XRayModal({ isOpen, onClose }: ModalProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(-1); // -1 idle, 0-100 progress, 101 done
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) {
      const t = window.setTimeout(() => {
        setFiles([]);
        setUploadProgress(-1);
      }, 300);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files?.length) addFiles(Array.from(e.dataTransfer.files));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(Array.from(e.target.files));
  };

  const addFiles = (newFiles: File[]) => {
    const valid = newFiles.filter(
      (f) => f.type.startsWith("image/") || f.name.endsWith(".dcm") || f.name.endsWith(".pdf")
    );
    setFiles((prev) => [...prev, ...valid]);
  };

  const removeFile = (index: number) => setFiles((prev) => prev.filter((_, i) => i !== index));

  const handleUpload = () => {
    if (files.length === 0) return;
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 101;
        }
        return prev + 10;
      });
    }, 150);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" label="Send your X-ray">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="p-8 relative">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold flex items-center gap-1.5 mb-1">
            <Upload className="w-3.5 h-3.5" /> Secure Treatment Mapping
          </span>
          <h3 className="font-serif text-2xl text-white">Send Your X-Ray</h3>
          <p className="text-sm text-on-surface-variant mt-1">
            Upload panoral scans or photographs for a preliminary, comprehensive dental plan.
          </p>
        </div>

        {uploadProgress === -1 ? (
          <div className="space-y-6">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload X-ray files"
              className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 ${
                isDragOver
                  ? "border-primary bg-primary/5 scale-[0.99]"
                  : "border-white/10 bg-white/5 hover:border-primary/40 hover:bg-white/10"
              }`}
            >
              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*,.pdf,.dcm"
              />
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm text-white font-medium mb-1">Drag and drop files here</p>
              <p className="text-xs text-on-surface-variant text-center max-w-[240px]">
                Supports JPG, PNG, PDF or DICOM dental X-rays (max 20MB)
              </p>
            </div>

            {files.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">
                  Selected Documents ({files.length})
                </h4>
                <div className="max-h-32 overflow-y-auto space-y-1.5 pr-1">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white"
                    >
                      <span className="truncate max-w-[70%] font-medium">{file.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-on-surface-variant font-mono">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          aria-label={`Remove ${file.name}`}
                          className="text-on-surface-variant hover:text-red-400 p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button size="lg" fullWidth disabled={files.length === 0} onClick={handleUpload}>
              Encrypt &amp; Submit Files
            </Button>
          </div>
        ) : uploadProgress <= 100 ? (
          <div className="py-12 flex flex-col items-center">
            <div className="relative w-24 h-24 flex items-center justify-center mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-white/5" />
              <div
                className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"
                style={{ animationDuration: "1.5s" }}
              />
              <span className="font-serif text-lg text-white font-medium">{uploadProgress}%</span>
            </div>
            <h4 className="font-serif text-xl text-white mb-2">Encrypting Transmission</h4>
            <p className="text-xs text-on-surface-variant max-w-xs text-center">
              Establishing a medical-grade end-to-end encrypted connection to our central diagnostics grid...
            </p>
            <div className="w-full max-w-xs bg-white/5 h-1.5 rounded-full mt-8 overflow-hidden">
              <div className="bg-primary h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
            </div>
          </div>
        ) : (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 animate-pulse">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-1">
              Secure Uplink Complete
            </span>
            <h3 className="font-serif text-2xl text-white mb-3">Transmission Handover</h3>
            <p className="text-sm text-on-surface-variant max-w-sm mb-6">
              Your diagnostic documents have been safely received and stored on our HIPAA-compliant server.
            </p>
            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs text-left mb-8 space-y-1 text-on-surface-variant">
              <div>• Review status: <strong className="text-primary font-medium">Under Diagnostic Consultation</strong></div>
              <div>• Expected response time: <strong className="text-white">2-4 Hours</strong></div>
              <div>• Case Coordinator notification sent via email.</div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="bg-white/10 hover:bg-white/20 text-white">
              Return to Clinic Dashboard
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}

// ── Call Back Modal ──────────────────────────────────────────────────────────
export function CallBackModal({ isOpen, onClose }: ModalProps) {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      const t = window.setTimeout(() => setStep(1), 300);
      return () => window.clearTimeout(t);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1200);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm" label="Request a call back">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="p-8 relative">
        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form key="cb-form" {...stepMotion} onSubmit={handleSubmit}>
              <div className="mb-6">
                <span className="text-xs uppercase tracking-widest text-primary font-semibold flex items-center gap-1.5 mb-1">
                  <Phone className="w-3.5 h-3.5" /> Express Call-back
                </span>
                <h3 className="font-serif text-2xl text-white">Request Call Back</h3>
                <p className="text-sm text-on-surface-variant mt-1">
                  Leave your number and a medical consultant will contact you instantly.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="cb-name" className={labelClass}>Your Name</label>
                  <input
                    id="cb-name"
                    type="text"
                    required
                    placeholder="e.g. Sterling Hunt"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="cb-phone" className={labelClass}>Phone / WhatsApp Number</label>
                  <input
                    id="cb-phone"
                    type="tel"
                    required
                    placeholder="e.g. +90 533 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={fieldClass}
                  />
                </div>
              </div>

              <Button type="submit" size="lg" fullWidth disabled={isSubmitting} className="mt-6">
                {isSubmitting ? "Connecting to Operator..." : "Call Me Back"}
              </Button>
            </motion.form>
          ) : (
            <motion.div key="cb-success" {...stepMotion} className="text-center flex flex-col items-center py-4">
              <div
                className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4 animate-ping"
                style={{ animationDuration: "2s" }}
              >
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl text-white mb-2">Request Lodged</h3>
              <p className="text-sm text-on-surface-variant max-w-xs mb-6">
                Thank you, <strong>{formData.name}</strong>. An available smile coordinator has been assigned to phone{" "}
                <strong>{formData.phone}</strong>.
              </p>
              <span className="text-xs text-primary font-medium px-4 py-2 bg-primary/10 rounded-full">
                Estimated call-back: Under 5 mins
              </span>
              <Button variant="ghost" size="sm" onClick={onClose} className="mt-8 bg-white/5 hover:bg-white/10 text-white">
                Dismiss
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}

// ── Lightbox Modal ───────────────────────────────────────────────────────────
interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
  description: string;
}

export function LightboxModal({ isOpen, onClose, image, title, description }: LightboxProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" bare label={title || "Clinic gallery"}>
      <div className="rounded-3xl overflow-hidden border border-white/10 bg-zinc-950 shadow-2xl flex flex-col md:flex-row">
        <div className="w-full md:w-3/5 aspect-video md:aspect-square relative bg-black flex items-center justify-center">
          <img src={image} alt={title} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden" />
        </div>

        <div className="w-full md:w-2/5 p-8 flex flex-col justify-between bg-zinc-950">
          <div className="space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-primary font-semibold mb-1 block">
                Lema Luxury Suites
              </span>
              <h3 className="font-serif text-3xl text-white">{title}</h3>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed">{description}</p>

            <div className="border-t border-white/5 pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs">★</div>
                <div>
                  <div className="text-xs font-semibold text-white">5.0 Star Accreditation</div>
                  <div className="text-[10px] text-on-surface-variant">Globally Certified Medical Facilities</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Multilingual Medical Concierge</div>
                  <div className="text-[10px] text-on-surface-variant">English, German, French, Italian &amp; Arabic</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <Button
              size="md"
              fullWidth
              onClick={() => {
                onClose();
                window.dispatchEvent(new CustomEvent("open-booking"));
              }}
            >
              Book Premium Tour &amp; Consult
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
