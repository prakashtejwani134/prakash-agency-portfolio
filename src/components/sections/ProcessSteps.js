"use client";

import { motion } from "framer-motion";
import { Compass, Cpu, Rocket } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import { fadeUp, staggerContainer } from "@/utils/variants";

const STEPS = [
  {
    icon: Compass,
    title: "Discovery & Architecture",
    text: "We map your funnel, tech stack, and lead flow before a single line of code is written.",
  },
  {
    icon: Cpu,
    title: "Build & AI Integration",
    text: "Your system gets built — Next.js frontend, AI qualification logic, and WhatsApp routing wired in.",
  },
  {
    icon: Rocket,
    title: "Launch & Live Lead Routing",
    text: "It goes live on Vercel Edge — leads start qualifying and routing to WhatsApp immediately.",
  },
];

export default function ProcessSteps() {
  return (
    <section id="process" className="relative px-6 py-28 md:px-12 md:py-36">
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
            The Process
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif text-4xl italic leading-tight text-alabaster md:text-5xl"
          >
            A transparent, 3-step build.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-alabaster/55">
            No black boxes. Here&apos;s exactly how your system gets built and
            launched.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer()}
          className="grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <motion.div key={title} variants={fadeUp}>
              <GlassCard className="flex h-full flex-col p-8">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald/30 bg-emerald/[0.06] text-emerald">
                    <Icon size={20} />
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-alabaster/30">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-serif text-xl italic text-alabaster">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-alabaster/60">
                  {text}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
