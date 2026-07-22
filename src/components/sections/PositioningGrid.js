"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Ban,
  GitBranch,
  Zap,
  Building2,
  GraduationCap,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { fadeUp, staggerContainer } from "@/utils/variants";

function LeadCounter() {
  const [count, setCount] = useState(128);
  useEffect(() => {
    const id = setInterval(() => setCount((c) => c + Math.ceil(Math.random() * 3)), 1400);
    return () => clearInterval(id);
  }, []);
  return <span>{count.toLocaleString()}</span>;
}

function FlowDiagram() {
  const nodes = ["Lead", "AI Qualifies", "WhatsApp"];
  return (
    <div className="flex items-center justify-between gap-2">
      {nodes.map((node, i) => (
        <div key={node} className="flex flex-1 items-center gap-2">
          <div className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-3 text-center">
            <span className="font-mono text-[10px] uppercase tracking-wider text-alabaster/70">
              {node}
            </span>
          </div>
          {i < nodes.length - 1 && (
            <div className="relative h-px w-4 bg-white/10 sm:w-6">
              <motion.span
                className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-emerald"
                animate={{ left: ["0%", "100%"] }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function PositioningGrid() {
  return (
    <section id="systems" className="relative px-6 py-28 md:px-12 md:py-36">
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
            The Repositioning
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif text-4xl italic leading-tight text-alabaster md:text-5xl"
          >
            This isn&apos;t a website.
            <br /> It&apos;s an operating system.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer()}
          className="grid grid-cols-1 gap-5 md:grid-cols-12"
        >
          <motion.div variants={fadeUp} className="md:col-span-7">
            <GlassCard className="flex h-full flex-col justify-between p-8">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-alabaster/50">
                <Ban size={14} className="text-alabaster/40" />
                Traditional Websites Are Dead
              </div>
              <h3 className="mt-6 font-serif text-2xl italic text-alabaster">
                Static brochures don&apos;t convert.
              </h3>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 opacity-60">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-alabaster/40">
                    Static Brochure
                  </p>
                  <p className="mt-4 font-serif text-3xl italic text-alabaster/40">
                    0 leads
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-alabaster/30">
                    sits there, hopes
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald/25 bg-emerald/[0.06] p-5 shadow-glow">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-emerald/70">
                    Dynamic Lead Engine
                  </p>
                  <p className="mt-4 font-serif text-3xl italic text-emerald">
                    <LeadCounter /> leads
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-emerald/60">
                    qualifies, routes, closes
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-5">
            <GlassCard className="flex h-full flex-col justify-between p-8">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-alabaster/50">
                <GitBranch size={14} className="text-gold" />
                AI-Powered Lead Routing
              </div>
              <h3 className="mt-6 font-serif text-2xl italic text-alabaster">
                Every visitor, qualified in real time.
              </h3>
              <div className="mt-8">
                <FlowDiagram />
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-5">
            <GlassCard id="performance-card" className="flex h-full flex-col justify-between p-8">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-alabaster/50">
                <Zap size={14} className="text-emerald" />
                Sub-Second Performance
              </div>
              <h3 className="mt-6 font-serif text-2xl italic text-alabaster">
                Built for speed, not just looks.
              </h3>
              <div className="mt-8 flex items-center justify-between">
                {[
                  ["100", "Perf"],
                  ["100", "SEO"],
                  ["60", "FPS"],
                ].map(([value, label]) => (
                  <div key={label} className="text-center">
                    <div className="font-serif text-4xl italic text-emerald">
                      {value}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-alabaster/45">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          <motion.div variants={fadeUp} className="md:col-span-7">
            <GlassCard className="flex h-full flex-col justify-between p-8">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-alabaster/50">
                <Building2 size={14} className="text-alabaster/40" />
                Custom Business Operating Systems
              </div>
              <h3 className="mt-6 font-serif text-2xl italic text-alabaster">
                One architecture, any industry.
              </h3>
              <div className="mt-8 grid grid-cols-3 gap-3">
                {[
                  [Building2, "Property"],
                  [GraduationCap, "Coaching"],
                  [ShoppingBag, "Commerce"],
                ].map(([Icon, label]) => (
                  <div
                    key={label}
                    id={label === "Coaching" ? "coaching-tile" : undefined}
                    className="group flex flex-col items-center gap-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-3 py-5 transition-colors hover:border-emerald/30"
                  >
                    <Icon size={20} className="text-alabaster/60 transition-colors group-hover:text-emerald" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-alabaster/50">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        <motion.a
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          href="#services"
          className="cursor-pointer-target mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-alabaster/50 transition-colors hover:text-emerald"
        >
          See the systems in detail
          <ArrowRight size={14} />
        </motion.a>
      </div>
    </section>
  );
}
