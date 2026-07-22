"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Compass } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import TerminalWidget from "@/components/sections/TerminalWidget";
import { staggerContainer, wordReveal, fadeUp } from "@/utils/variants";

const HEADLINE_LINES = [
  ["Architecting", "High-Converting"],
  ["Digital", "Systems", "&", "AI"],
  ["Software", "Solutions."],
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pb-16 pt-28 md:px-12 md:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-emerald/[0.08] blur-[120px]" />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5"
          >
            <Compass size={13} className="text-emerald" />
            <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-alabaster/60">
              AI Web Architect &amp; Growth Systems
            </span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.12, 0.15)}
            className="font-serif text-4xl italic leading-[1.05] tracking-tight text-alabaster sm:text-6xl lg:text-7xl xl:text-[5.5rem]"
          >
            {HEADLINE_LINES.map((line, li) => (
              <span key={li} className="block overflow-hidden pb-1">
                {line.map((word, wi) => (
                  <motion.span
                    key={word + wi}
                    variants={wordReveal}
                    className={
                      word === "AI"
                        ? "text-gradient-emerald mr-4 inline-block not-italic"
                        : "mr-4 inline-block"
                    }
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={2}
            className="mt-8 max-w-lg text-base leading-relaxed text-alabaster/60 md:text-lg"
          >
            I design and engineer business operating systems disguised as
            websites — sub-second performance, AI-qualified leads, and
            WhatsApp routing built in from line one.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={3}
            className="mb-8 mt-10 flex flex-wrap items-center gap-4 md:mb-0"
          >
            <MagneticButton
              as="a"
              href="#systems"
              className="rounded-full bg-alabaster px-7 py-4 font-mono text-xs uppercase tracking-wider text-obsidian transition-colors hover:bg-emerald"
            >
              Explore Systems
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </MagneticButton>
            <MagneticButton
              as="a"
              href="#contact"
              className="group rounded-full border border-white/[0.12] bg-white/[0.02] px-7 py-4 font-mono text-xs uppercase tracking-wider text-alabaster transition-colors hover:border-gold/50 hover:text-gold"
            >
              Book Consultation
              <ArrowUpRight
                size={14}
                strokeWidth={2.5}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-start justify-center lg:justify-end"
        >
          <div className="w-full max-w-sm lg:sticky lg:top-32">
            <TerminalWidget />
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                ["100", "Speed"],
                ["4.5x", "Conversions"],
                ["24/7", "Automation"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="glass-panel rounded-2xl px-3 py-3 text-center"
                >
                  <div className="font-serif text-xl italic text-emerald">
                    {value}
                  </div>
                  <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-alabaster/50">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
