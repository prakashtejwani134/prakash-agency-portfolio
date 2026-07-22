"use client";

import { motion } from "framer-motion";
import { PhoneCall, Timer, Mic, ArrowUpRight, AlertCircle, Wrench, CheckCircle2 } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { fadeUp, staggerContainer } from "@/utils/variants";

const BREAKDOWN = [
  {
    icon: AlertCircle,
    label: "Problem Solved",
    text: "Manual lead follow-ups were taking hours — by then, most leads had already gone cold.",
  },
  {
    icon: Wrench,
    label: "The Solution Built",
    text: "Automated voice & WhatsApp qualification, firing within 30 seconds of lead capture.",
  },
  {
    icon: CheckCircle2,
    label: "Real Result Metrics",
    text: "Sub-30s dispatch time, 100% automated handling — no human needed until the lead is warm.",
  },
];

const TIMELINE = [
  { time: "0:00", label: "Lead captured" },
  { time: "0:07", label: "Voice AI dialing" },
  { time: "0:22", label: "Qualifying live" },
  { time: "0:30", label: "Routed to sales" },
];

const FEATURES = [
  "Outbound voice call within 30s of form or WhatsApp submission",
  "AI voice agent qualifies budget, timeline & intent live on the call",
  "Warm, qualified leads forwarded instantly to your sales WhatsApp",
];

export default function FastCallFlowShowcase() {
  return (
    <section id="fastcallflow" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer()}
          className="mb-14 max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold/80"
          >
            Featured Systems
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif text-4xl italic leading-tight text-alabaster md:text-5xl"
          >
            FastCallFlow<span className="align-super text-lg not-italic">™</span>
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer()}
          className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_0.9fr]"
        >
          <motion.div variants={fadeUp}>
            <GlassCard glow="gold" className="flex h-full flex-col justify-between p-8 md:p-10">
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold/30 bg-gold/[0.06] text-gold">
                  <PhoneCall size={20} />
                </span>
                <h3 className="mt-6 font-serif text-2xl italic text-alabaster md:text-3xl">
                  Voice AI &amp; instant dispatch, built in-house.
                </h3>
                <p className="mt-4 max-w-md text-alabaster/60">
                  Fires automated AI voice qualification calls within 30
                  seconds of lead capture — before a human ever needs to be
                  involved.
                </p>

                <ul className="mt-8 space-y-3">
                  {FEATURES.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 font-mono text-[13px] text-alabaster/70"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#contact"
                className="cursor-pointer-target group mt-10 inline-flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-wider text-alabaster transition-colors hover:text-gold"
              >
                Add FastCallFlow to my system
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeUp}>
            <GlassCard glow="gold" className="flex h-full flex-col justify-between p-8 md:p-10">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-alabaster/50">
                <Timer size={14} className="text-gold" />
                Live Dispatch Timeline
              </div>

              <div className="mt-8 space-y-6">
                {TIMELINE.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-4">
                    <span className="font-mono text-xs text-gold/70">
                      {step.time}
                    </span>
                    <div className="relative flex-1">
                      <div className="h-px w-full bg-white/10" />
                      <motion.div
                        className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-gold"
                        initial={{ left: "0%", opacity: 0 }}
                        whileInView={{ left: "100%", opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.5, ease: "easeInOut" }}
                      />
                    </div>
                    <span className="w-32 shrink-0 text-right text-sm text-alabaster/70">
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex items-center gap-3 rounded-2xl border border-gold/20 bg-gold/[0.05] p-5">
                <Mic size={18} className="shrink-0 text-gold" />
                <p className="font-mono text-[11px] leading-relaxed text-gold/80">
                  Average dispatch-to-answer time across deployed systems: 30
                  seconds flat.
                </p>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer()}
          className="mt-5"
        >
          <GlassCard glow="gold" className="p-8 md:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-gold/70">
              Live Proof &amp; Case Study Breakdown
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {BREAKDOWN.map(({ icon: Icon, label, text }) => (
                <motion.div key={label} variants={fadeUp}>
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-gold/80">
                    <Icon size={14} />
                    {label}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-alabaster/65">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
