"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Megaphone, Cpu, Filter, MessageCircle, X, TrendingUp } from "lucide-react";
import { fadeUp, staggerContainer } from "@/utils/variants";
import { cn } from "@/utils/cn";

const NODES = [
  {
    id: "ads-traffic",
    label: "Ads Traffic",
    icon: Megaphone,
    advantage:
      "Server-side conversion tracking captures every paid click with zero data loss from ad blockers or iOS ATT restrictions — your ad platforms see the truth.",
    boost: "+18% attribution accuracy",
  },
  {
    id: "ai-engine",
    label: "Custom AI Engine",
    icon: Cpu,
    advantage:
      "A purpose-built Next.js + AI layer renders sub-second pages and scores visitor intent in real time, before they've even scrolled.",
    boost: "2.3x more visitors reach the offer",
  },
  {
    id: "lead-qualification",
    label: "Lead Qualification",
    icon: Filter,
    advantage:
      "The AI cross-references budget, timeline, and intent signals before a lead ever reaches your inbox — only sales-ready prospects pass through.",
    boost: "3.4x higher close rate",
  },
  {
    id: "whatsapp-dispatcher",
    label: "WhatsApp Dispatcher",
    icon: MessageCircle,
    advantage:
      "Qualified leads are auto-routed to WhatsApp in under 10 seconds — no manual follow-up delay, no lead ever goes cold.",
    boost: "+60% response-driven conversion",
  },
];

export default function SystemVisualizer() {
  const [active, setActive] = useState(null);
  const activeNode = NODES.find((n) => n.id === active);

  return (
    <section id="architecture" className="relative px-6 py-28 md:px-12 md:py-36">
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
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald/80"
          >
            System Architecture
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif text-4xl italic leading-tight text-alabaster md:text-5xl"
          >
            Trace the lead from click to client.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-alabaster/55">
            Click any node to see the technical advantage and the conversion
            boost it delivers.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer()}
          className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-0"
        >
          {NODES.map((node, i) => {
            const Icon = node.icon;
            const isActive = active === node.id;
            return (
              <div key={node.id} className="flex flex-1 items-center md:gap-0">
                <motion.button
                  variants={fadeUp}
                  onClick={() => setActive(isActive ? null : node.id)}
                  className={cn(
                    "cursor-pointer-target group flex w-full flex-col items-center gap-3 rounded-2xl border px-5 py-7 text-center transition-colors",
                    isActive
                      ? "border-emerald/40 bg-emerald/[0.07] shadow-glow"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.18]"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl border transition-colors",
                      isActive
                        ? "border-emerald/50 text-emerald"
                        : "border-white/[0.1] text-alabaster/60 group-hover:text-alabaster"
                    )}
                  >
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-alabaster/40">
                    0{i + 1}
                  </span>
                  <span className="text-sm font-medium text-alabaster">
                    {node.label}
                  </span>
                </motion.button>

                {i < NODES.length - 1 && (
                  <div className="relative mx-2 hidden h-px flex-1 bg-white/10 md:block">
                    <motion.span
                      className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-emerald"
                      animate={{ left: ["0%", "100%"] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.45,
                      }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          {activeNode && (
            <motion.div
              key={activeNode.id}
              initial={{ opacity: 0, y: -16, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -16, height: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 overflow-hidden"
            >
              <div className="glass-panel relative p-8 shadow-panel md:p-10">
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close"
                  className="cursor-pointer-target absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] text-alabaster/50 hover:text-alabaster"
                >
                  <X size={14} />
                </button>

                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-emerald/80">
                  <activeNode.icon size={14} />
                  {activeNode.label}
                </div>

                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-alabaster/75 md:text-xl">
                  {activeNode.advantage}
                </p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.06] px-4 py-2">
                  <TrendingUp size={14} className="text-gold" />
                  <span className="font-mono text-xs uppercase tracking-wider text-gold">
                    {activeNode.boost}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
