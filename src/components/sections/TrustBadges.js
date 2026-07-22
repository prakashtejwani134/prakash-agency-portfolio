"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Gauge, ShieldCheck, PhoneCall } from "lucide-react";
import { fadeUp, staggerContainer } from "@/utils/variants";

const BADGES = [
  "Next.js 15",
  "Framer Motion",
  "FastCallFlow AI",
  "WhatsApp Business API",
  "Vercel Edge",
];

const METRICS = [
  { icon: Gauge, value: "Sub-Second", label: "Latency" },
  { icon: ShieldCheck, value: "99.9%", label: "Uptime" },
  { icon: PhoneCall, value: "30s", label: "Call Dispatch" },
];

export default function TrustBadges() {
  return (
    <section className="relative px-6 py-16 md:px-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer()}
        className="mx-auto max-w-6xl"
      >
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-3 border-y border-white/[0.06] py-6"
        >
          <span className="mr-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-alabaster/35">
            <BadgeCheck size={12} className="text-emerald" />
            Built on
          </span>
          {BADGES.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-1.5 font-mono text-[11px] text-alabaster/60"
            >
              {badge}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-8 grid grid-cols-3 gap-4"
        >
          {METRICS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-6 text-center"
            >
              <Icon size={16} className="text-emerald" />
              <div className="font-serif text-xl italic text-emerald sm:text-2xl">
                {value}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-wider text-alabaster/45 sm:text-[10px]">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
