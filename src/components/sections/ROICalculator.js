"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { TrendingUp, DollarSign, IndianRupee, Loader2 } from "lucide-react";
import { fadeUp, staggerContainer } from "@/utils/variants";
import { cn } from "@/utils/cn";

const STATIC_RATE = 0.005;
const ENGINE_RATE = 0.035;

const EXCHANGE_RATE_API = "https://open.er-api.com/v6/latest/USD";
const FALLBACK_INR_RATE = 96.54;

function useLiveInrRate() {
  const [rate, setRate] = useState(FALLBACK_INR_RATE);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(EXCHANGE_RATE_API)
      .then((res) => {
        if (!res.ok) throw new Error("Exchange rate request failed");
        return res.json();
      })
      .then((data) => {
        const liveRate = data?.rates?.INR;
        if (!cancelled && typeof liveRate === "number") {
          setRate(liveRate);
          setIsLive(true);
        }
      })
      .catch(() => {
        // Network/API failure — keep the FALLBACK_INR_RATE already in state.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { rate, loading, isLive };
}

function AnimatedNumber({ value, prefix = "", locale = "en-US", className }) {
  const motionValue = useMotionValue(value);
  const spring = useSpring(motionValue, { damping: 24, stiffness: 120 });
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
      {prefix}
      {Math.round(display).toLocaleString(locale)}
    </span>
  );
}

function ComparisonBar({ label, percent, tone }) {
  const motionValue = useMotionValue(percent);
  const spring = useSpring(motionValue, { damping: 20, stiffness: 120 });
  const [width, setWidth] = useState(percent);

  useEffect(() => {
    motionValue.set(percent);
  }, [percent, motionValue]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => setWidth(latest));
    return () => unsub();
  }, [spring]);

  const isEngine = tone === "emerald";

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-wider text-alabaster/50">
          {label}
        </span>
      </div>
      <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className={cn(
            "h-full rounded-full",
            isEngine ? "bg-emerald shadow-glow" : "bg-alabaster/30"
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

export default function ROICalculator() {
  const [visitors, setVisitors] = useState(8000);
  const [clientValue, setClientValue] = useState(3000); // always stored in base USD
  const [currency, setCurrency] = useState("$");
  const { rate: inrRate, loading: rateLoading, isLive } = useLiveInrRate();

  const isInr = currency === "₹";
  const fxRate = isInr ? inrRate : 1;
  const locale = isInr ? "en-IN" : "en-US";

  // All ROI math runs in base USD; the live rate only scales values for display.
  const staticClients = visitors * STATIC_RATE;
  const engineClients = visitors * ENGINE_RATE;
  const staticRevenue = staticClients * clientValue;
  const engineRevenue = engineClients * clientValue;
  const extraRevenue = engineRevenue - staticRevenue;

  const displayClientValue = clientValue * fxRate;
  const displayStaticRevenue = staticRevenue * fxRate;
  const displayEngineRevenue = engineRevenue * fxRate;
  const displayExtraRevenue = extraRevenue * fxRate;
  const displayMinValue = 50 * fxRate;
  const displayMaxValue = 25000 * fxRate;

  const maxRevenue = Math.max(staticRevenue, engineRevenue, 1);
  const staticBarPercent = (staticRevenue / maxRevenue) * 100;
  const engineBarPercent = (engineRevenue / maxRevenue) * 100;

  const visitorsPercent = ((visitors - 500) / (50000 - 500)) * 100;
  const valuePercent = ((clientValue - 50) / (25000 - 50)) * 100;

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
          <div className="flex flex-wrap items-center justify-end gap-3">
            <AnimatePresence mode="wait">
              {isInr && (
                <motion.span
                  key={rateLoading ? "loading" : "rate"}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-1.5 font-mono text-[10px] text-alabaster/40"
                >
                  {rateLoading ? (
                    <>
                      <Loader2 size={11} className="animate-spin text-emerald/70" />
                      Fetching live rate…
                    </>
                  ) : (
                    <>
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          isLive ? "animate-pulseDot bg-emerald" : "bg-alabaster/30"
                        )}
                      />
                      Live rate: 1 USD = ₹{inrRate.toFixed(2)}
                      {!isLive && " (fallback)"}
                    </>
                  )}
                </motion.span>
              )}
            </AnimatePresence>

            <span className="font-mono text-[10px] uppercase tracking-wider text-alabaster/40">
              Currency
            </span>
            <div className="inline-flex rounded-full border border-white/[0.08] bg-white/[0.02] p-0.5">
              {[
                { id: "$", icon: DollarSign },
                { id: "₹", icon: IndianRupee },
              ].map(({ id, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setCurrency(id)}
                  className={cn(
                    "cursor-pointer-target flex h-6 w-6 items-center justify-center rounded-full transition-colors",
                    currency === id
                      ? "bg-emerald text-obsidian"
                      : "text-alabaster/40 hover:text-alabaster"
                  )}
                >
                  <Icon size={11} />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="visitors-slider"
                  className="font-mono text-xs uppercase tracking-wider text-alabaster/60"
                >
                  Monthly website visitors
                </label>
                <span className="font-serif text-xl italic text-emerald">
                  {visitors.toLocaleString("en-US")}
                </span>
              </div>
              <input
                id="visitors-slider"
                type="range"
                min={500}
                max={50000}
                step={500}
                value={visitors}
                onChange={(e) => setVisitors(Number(e.target.value))}
                className="cursor-pointer-target mt-4 h-1.5 w-full appearance-none rounded-full bg-white/10 accent-emerald"
                style={{
                  background: `linear-gradient(90deg, #00FF87 ${visitorsPercent}%, rgba(255,255,255,0.1) ${visitorsPercent}%)`,
                }}
              />
              <div className="mt-2 flex justify-between font-mono text-[10px] text-alabaster/35">
                <span>500</span>
                <span>50,000</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="value-slider"
                  className="font-mono text-xs uppercase tracking-wider text-alabaster/60"
                >
                  Average client value
                </label>
                <span className="font-serif text-xl italic text-gold">
                  {currency}
                  {Math.round(displayClientValue).toLocaleString(locale)}
                </span>
              </div>
              <input
                id="value-slider"
                type="range"
                min={50}
                max={25000}
                step={50}
                value={clientValue}
                onChange={(e) => setClientValue(Number(e.target.value))}
                className="cursor-pointer-target mt-4 h-1.5 w-full appearance-none rounded-full bg-white/10 accent-gold"
                style={{
                  background: `linear-gradient(90deg, #D4AF37 ${valuePercent}%, rgba(255,255,255,0.1) ${valuePercent}%)`,
                }}
              />
              <div className="mt-2 flex justify-between font-mono text-[10px] text-alabaster/35">
                <span>
                  {currency}
                  {Math.round(displayMinValue).toLocaleString(locale)}
                </span>
                <span>
                  {currency}
                  {Math.round(displayMaxValue).toLocaleString(locale)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              <p className="font-mono text-[10px] uppercase tracking-wider text-alabaster/40">
                Standard Website · {(STATIC_RATE * 100).toFixed(1)}% conversion
              </p>
              <p className="mt-3 font-serif text-3xl italic text-alabaster/50">
                <AnimatedNumber value={displayStaticRevenue} prefix={currency} locale={locale} />
              </p>
              <p className="mt-1 font-mono text-[10px] text-alabaster/30">
                revenue / month
              </p>
            </div>

            <div className="rounded-2xl border border-emerald/25 bg-emerald/[0.06] p-6 shadow-glow">
              <p className="font-mono text-[10px] uppercase tracking-wider text-emerald/70">
                Custom AI Architecture · {(ENGINE_RATE * 100).toFixed(1)}% conversion
              </p>
              <p className="mt-3 font-serif text-3xl italic text-emerald">
                <AnimatedNumber value={displayEngineRevenue} prefix={currency} locale={locale} />
              </p>
              <p className="mt-1 font-mono text-[10px] text-emerald/60">
                revenue / month
              </p>
            </div>

            <div className="flex flex-col justify-center rounded-2xl border border-gold/25 bg-gold/[0.06] p-6">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-gold/80">
                <TrendingUp size={13} />
                Extra Monthly Revenue
              </div>
              <p className="mt-3 font-serif text-3xl italic text-gold">
                +<AnimatedNumber value={displayExtraRevenue} prefix={currency} locale={locale} />
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <ComparisonBar
              label={`Standard Website · ${currency}${Math.round(displayStaticRevenue).toLocaleString(locale)}`}
              percent={staticBarPercent}
              tone="alabaster"
            />
            <ComparisonBar
              label={`Custom AI Architecture · ${currency}${Math.round(displayEngineRevenue).toLocaleString(locale)}`}
              percent={engineBarPercent}
              tone="emerald"
            />
          </div>

          <p className="mt-8 font-mono text-[10.5px] leading-relaxed text-alabaster/30">
            Estimates based on aggregate conversion-rate improvements observed
            across deployed lead engines. Actual results vary by industry,
            offer, and traffic quality.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
