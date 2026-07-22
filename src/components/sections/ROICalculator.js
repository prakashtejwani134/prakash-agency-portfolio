"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { TrendingUp, Users, Target } from "lucide-react";
import { fadeUp, staggerContainer } from "@/utils/variants";
import { cn } from "@/utils/cn";

const STATIC_VISITOR_TO_LEAD = 0.02;
const ENGINE_VISITOR_TO_LEAD = 0.05;
const STATIC_CLOSE_RATE = 0.2;
const ENGINE_CLOSE_RATE = 0.4;

function AnimatedNumber({ value, decimals = 0, className }) {
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, { damping: 22, stiffness: 120 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    motionValue.set(value);
  }, [value, motionValue]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => setDisplay(latest));
    return () => unsub();
  }, [spring]);

  return (
    <span className={className}>
      {decimals
        ? display.toFixed(decimals)
        : Math.round(display).toLocaleString()}
    </span>
  );
}

export default function ROICalculator() {
  const [mode, setMode] = useState("visitors");
  const [visitors, setVisitors] = useState(5000);
  const [leadGoal, setLeadGoal] = useState(120);

  let staticClients;
  let engineClients;

  if (mode === "visitors") {
    const staticLeads = visitors * STATIC_VISITOR_TO_LEAD;
    const engineLeads = visitors * ENGINE_VISITOR_TO_LEAD;
    staticClients = staticLeads * STATIC_CLOSE_RATE;
    engineClients = engineLeads * ENGINE_CLOSE_RATE;
  } else {
    staticClients = leadGoal * STATIC_CLOSE_RATE;
    engineClients = leadGoal * ENGINE_CLOSE_RATE;
  }

  const multiplier = staticClients > 0 ? engineClients / staticClients : 0;

  const sliderValue = mode === "visitors" ? visitors : leadGoal;
  const sliderMin = mode === "visitors" ? 500 : 10;
  const sliderMax = mode === "visitors" ? 20000 : 500;
  const sliderStep = mode === "visitors" ? 100 : 5;
  const sliderPercent =
    ((sliderValue - sliderMin) / (sliderMax - sliderMin)) * 100;

  return (
    <section id="roi" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-5xl">
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
            Client ROI Calculator
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif text-4xl italic leading-tight text-alabaster md:text-5xl"
          >
            Standard site vs. custom architecture.
          </motion.h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel p-8 md:p-12"
        >
          <div className="mb-8 inline-flex rounded-full border border-white/[0.08] bg-white/[0.02] p-1">
            {[
              { id: "visitors", label: "Monthly Visitors", icon: Users },
              { id: "leads", label: "Lead Goal", icon: Target },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={cn(
                  "cursor-pointer-target flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors",
                  mode === id
                    ? "bg-emerald text-obsidian"
                    : "text-alabaster/50 hover:text-alabaster"
                )}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <label
              htmlFor="roi-slider"
              className="font-mono text-xs uppercase tracking-wider text-alabaster/60"
            >
              {mode === "visitors" ? "Monthly website visitors" : "Target monthly leads"}
            </label>
            <span className="font-serif text-2xl italic text-emerald">
              {sliderValue.toLocaleString()}
            </span>
          </div>

          <input
            id="roi-slider"
            type="range"
            min={sliderMin}
            max={sliderMax}
            step={sliderStep}
            value={sliderValue}
            onChange={(e) =>
              mode === "visitors"
                ? setVisitors(Number(e.target.value))
                : setLeadGoal(Number(e.target.value))
            }
            className="cursor-pointer-target mt-6 h-1.5 w-full appearance-none rounded-full bg-white/10 accent-emerald"
            style={{
              background: `linear-gradient(90deg, #00FF87 ${sliderPercent}%, rgba(255,255,255,0.1) ${sliderPercent}%)`,
            }}
          />
          <div className="mt-2 flex justify-between font-mono text-[10px] text-alabaster/35">
            <span>{sliderMin.toLocaleString()}</span>
            <span>{sliderMax.toLocaleString()}</span>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <p className="font-mono text-[10px] uppercase tracking-wider text-alabaster/40">
                Standard Static Site
              </p>
              <p className="mt-3 font-serif text-4xl italic text-alabaster/50">
                <AnimatedNumber value={staticClients} />
              </p>
              <p className="mt-1 font-mono text-[10px] text-alabaster/30">
                clients / month
              </p>
            </div>

            <div className="rounded-2xl border border-emerald/25 bg-emerald/[0.06] p-6 shadow-glow">
              <p className="font-mono text-[10px] uppercase tracking-wider text-emerald/70">
                Custom Architecture System
              </p>
              <p className="mt-3 font-serif text-4xl italic text-emerald">
                <AnimatedNumber value={engineClients} />
              </p>
              <p className="mt-1 font-mono text-[10px] text-emerald/60">
                clients / month
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-gold/25 bg-gold/[0.06] p-6">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-gold/80">
                <TrendingUp size={13} />
                Revenue Multiplier
              </div>
              <p className="mt-3 font-serif text-4xl italic text-gold">
                <AnimatedNumber value={multiplier} decimals={1} />x
              </p>
            </div>
          </div>

          <p className="mt-8 font-mono text-[10.5px] leading-relaxed text-alabaster/30">
            Estimates based on aggregate conversion and close-rate
            improvements observed across deployed lead engines. Actual
            results vary by industry, offer, and traffic quality.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
