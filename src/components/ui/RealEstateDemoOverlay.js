"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  MousePointerClick,
  Filter,
  PhoneCall,
  MessageSquareText,
  CheckCircle2,
  X,
  Send,
} from "lucide-react";
import Portal from "@/components/ui/Portal";
import { buildWhatsAppLink } from "@/utils/config";

const STEPS = [
  {
    icon: MousePointerClick,
    label: "User Ad Click Simulated",
    detail: "utm_source=meta · utm_campaign=aravalli_launch",
  },
  {
    icon: Filter,
    label: "AI Lead Scoring & Qualification Log",
    detail: "intent_score: 92/100 · budget_match: HIGH",
  },
  {
    icon: PhoneCall,
    label: "FastCallFlow Voice Dispatch Triggered",
    detail: "outbound call queued · connecting in 4s",
  },
  {
    icon: MessageSquareText,
    label: "WhatsApp Routing Completed",
    detail: "lead forwarded to sales WhatsApp ✓",
  },
];

const STEP_INTERVAL = 900;

export default function RealEstateDemoOverlay({ open, onClose }) {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    setSent(false);
    setPhone("");

    const timers = STEPS.map((_, i) =>
      setTimeout(() => setStep(i + 1), STEP_INTERVAL * (i + 1))
    );
    return () => timers.forEach(clearTimeout);
  }, [open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    const message = `Hi Prakash, I just ran the Aravalli Homes demo simulation. Please send me the live WhatsApp demo payload. My number: ${phone}`;
    window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const done = step >= STEPS.length;

  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[96] flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel w-full max-w-lg overflow-hidden shadow-panel"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-emerald/80">
                  Live System Simulation · Real Estate Engine
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="cursor-pointer-target flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] text-alabaster/50 hover:text-alabaster"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="p-6 md:p-8">
                <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full bg-emerald"
                    animate={{ width: `${(step / STEPS.length) * 100}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>

                <div className="space-y-4">
                  {STEPS.map((s, i) => {
                    const Icon = s.icon;
                    const isDone = i < step;
                    const isActive = i === step;
                    if (i > step) return null;
                    return (
                      <motion.div
                        key={s.label}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35 }}
                        className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${
                          isDone
                            ? "border-emerald/25 bg-emerald/[0.05]"
                            : "border-white/[0.08] bg-white/[0.02]"
                        }`}
                      >
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
                            isDone
                              ? "border-emerald/40 text-emerald"
                              : "border-white/[0.12] text-alabaster/50"
                          }`}
                        >
                          {isDone ? <CheckCircle2 size={13} /> : <Icon size={13} />}
                        </span>
                        <div>
                          <p className="text-sm text-alabaster">{s.label}</p>
                          <p className="mt-0.5 font-mono text-[11px] text-alabaster/40">
                            {s.detail}
                          </p>
                        </div>
                        {isActive && !isDone && (
                          <span className="ml-auto mt-1 h-2 w-2 shrink-0 animate-pulseDot rounded-full bg-emerald" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {done && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-6 overflow-hidden border-t border-white/[0.08] pt-6"
                    >
                      {!sent ? (
                        <form onSubmit={handleSubmit}>
                          <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-alabaster/60">
                            Enter your phone number to receive a live WhatsApp
                            demo payload now.
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="tel"
                              required
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+91 98765 43210"
                              className="w-full flex-1 rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-alabaster placeholder:text-alabaster/25 focus:border-emerald/40 focus:outline-none"
                            />
                            <button
                              type="submit"
                              className="cursor-pointer-target flex shrink-0 items-center gap-2 rounded-xl bg-emerald px-4 py-3 font-mono text-xs uppercase tracking-wider text-obsidian"
                            >
                              Send
                              <Send size={13} />
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex items-center gap-3 rounded-xl border border-emerald/25 bg-emerald/[0.06] px-4 py-3">
                          <CheckCircle2 size={16} className="shrink-0 text-emerald" />
                          <p className="text-sm text-alabaster/75">
                            Opening WhatsApp — you&apos;re one tap from the live
                            demo payload.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
