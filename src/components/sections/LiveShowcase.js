"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Gauge, Radio, MessageCircle, Home } from "lucide-react";
import { fadeUp, staggerContainer } from "@/utils/variants";
import { ARAVALLI_LIVE_URL } from "@/utils/config";

const METRICS = [
  { icon: Gauge, label: "Speed", value: "100", tone: "text-emerald" },
  { icon: Radio, label: "Conversion Engine", value: "Active", tone: "text-emerald" },
  { icon: MessageCircle, label: "Lead Routing", value: "WhatsApp", tone: "text-gold" },
];

export default function LiveShowcase() {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 12 });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <section id="showcase" className="relative px-6 py-28 md:px-12 md:py-36">
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
            Live Proof, Not a Mockup
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif text-4xl italic leading-tight text-alabaster md:text-5xl"
          >
            Aravalli Homes —{" "}
            <span className="text-gradient-gold not-italic">
              A High-Converting Real Estate Engine
            </span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-alabaster/55">
            Modern, sleek, and powered by Vercel Edge, Next.js 15, and
            instant WhatsApp lead capture.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetTilt}
          style={{ perspective: 1200 }}
          className="cursor-pointer-target group"
        >
          <motion.div
            id="aravalli-card"
            animate={{ rotateX: tilt.x, rotateY: tilt.y }}
            transition={{ type: "spring", stiffness: 150, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
            className="glass-panel overflow-hidden shadow-panel transition-[border-color,box-shadow] duration-300 hover:border-cyan/30 hover:shadow-glow-cyan"
          >
            <div className="flex items-center gap-2 border-b border-white/[0.08] bg-black/40 px-5 py-3.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 animate-pulseDot rounded-full bg-[#27c93f]" />
              <div className="ml-3 flex-1 rounded-full bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-alabaster/40">
                aravali-homes-seven.vercel.app
              </div>
            </div>

            <div className="relative h-[280px] overflow-hidden bg-gradient-to-br from-graphite via-graphite-dark to-black p-8 sm:h-[360px] md:p-12">
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold/10 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-emerald/10 blur-[100px]" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-gold/80">
                  <Home size={13} />
                  Real Estate Engine · Live Deployment
                </div>
                <div>
                  <h3 className="font-serif text-3xl italic text-alabaster md:text-5xl">
                    A high-converting, modern real estate engine.
                  </h3>
                  <p className="mt-3 max-w-md text-sm text-alabaster/50 md:text-base">
                    Powered by Vercel Edge, Next.js 15, and AI-qualified lead
                    routing — every visitor dispatched instantly on WhatsApp.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-px bg-white/[0.06] sm:grid-cols-3">
              {METRICS.map(({ icon: Icon, label, value, tone }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 bg-graphite/60 px-6 py-5"
                >
                  <Icon size={18} className={tone} />
                  <div>
                    <div className={`font-serif text-lg italic ${tone}`}>
                      {value}
                    </div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-alabaster/45">
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-white/[0.06] px-6 py-5">
              <p className="font-mono text-[11px] text-alabaster/40">
                Deployed on Vercel · Edge Network
              </p>
              <a
                href={ARAVALLI_LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer-target flex items-center gap-2 rounded-full border border-white/[0.12] px-5 py-2.5 font-mono text-[11px] uppercase tracking-wider text-alabaster transition-colors hover:border-emerald/40 hover:text-emerald"
              >
                Launch Live Deployment
                <ExternalLink size={13} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
