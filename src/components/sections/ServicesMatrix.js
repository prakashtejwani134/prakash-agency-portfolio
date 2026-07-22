"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TrendingUp, Bot, Target, ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/utils/variants";
import { cn } from "@/utils/cn";

const SERVICES = [
  {
    icon: TrendingUp,
    title: "Custom Lead & Sales Engines",
    summary: "Websites engineered as conversion machinery, not portfolios.",
    points: [
      "Bespoke funnels mapped to your sales process",
      "Real-time lead scoring and qualification",
      "CRM-ready data pipelines from day one",
    ],
  },
  {
    icon: Bot,
    title: "AI Automation & WhatsApp Flow Infrastructure",
    summary: "Every lead met instantly, on the channel they already use.",
    points: [
      "AI-qualified WhatsApp routing in seconds",
      "Automated follow-ups and reminder sequences",
      "Human handoff when a deal needs a closer",
    ],
  },
  {
    icon: Target,
    title: "Performance Marketing & Ad Funnel Architecture",
    summary: "Traffic infrastructure built to survive the click.",
    points: [
      "Landing systems tuned for paid acquisition",
      "Server-side tracking and attribution",
      "Continuous CRO backed by real data",
    ],
  },
];

export default function ServicesMatrix() {
  const [active, setActive] = useState(0);
  const ActiveIcon = SERVICES[active].icon;

  return (
    <section id="services" className="relative px-6 py-28 md:px-12 md:py-36">
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
            Services &amp; Systems Matrix
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif text-4xl italic leading-tight text-alabaster md:text-5xl"
          >
            Three systems. One architecture.
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.3fr]">
          <div className="flex flex-row gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              const isActive = active === i;
              return (
                <button
                  key={service.title}
                  onClick={() => setActive(i)}
                  className={cn(
                    "cursor-pointer-target group relative flex min-w-[240px] flex-1 items-center gap-4 rounded-2xl border px-5 py-5 text-left transition-colors lg:min-w-0",
                    isActive
                      ? "border-emerald/30 bg-emerald/[0.05]"
                      : "border-white/[0.07] bg-white/[0.02] hover:border-white/[0.15]"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border",
                      isActive
                        ? "border-emerald/40 text-emerald"
                        : "border-white/[0.1] text-alabaster/50"
                    )}
                  >
                    <Icon size={17} />
                  </span>
                  <div>
                    <p
                      className={cn(
                        "font-mono text-[10px] uppercase tracking-wider",
                        isActive ? "text-emerald/70" : "text-alabaster/40"
                      )}
                    >
                      0{i + 1}
                    </p>
                    <p className="mt-0.5 text-sm font-medium leading-snug text-alabaster">
                      {service.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="glass-panel relative min-h-[380px] overflow-hidden p-8 md:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-emerald/10 blur-[100px]" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald/30 bg-emerald/[0.06] text-emerald">
                  <ActiveIcon size={24} />
                </span>
                <h3 className="mt-6 font-serif text-3xl italic text-alabaster">
                  {SERVICES[active].title}
                </h3>
                <p className="mt-3 max-w-md text-alabaster/55">
                  {SERVICES[active].summary}
                </p>
                <ul className="mt-8 space-y-3">
                  {SERVICES[active].points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 font-mono text-[13px] text-alabaster/70"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="cursor-pointer-target group mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-alabaster transition-colors hover:text-emerald"
                >
                  Scope this system
                  <ArrowUpRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
