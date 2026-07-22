"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { pulseHighlight } from "@/utils/highlight";
import RealEstateDemoOverlay from "@/components/ui/RealEstateDemoOverlay";

const BOOT_LINES = [
  "$ system.init --target=production",
  "> compiling architecture...",
  "> stack: Next.js · Framer Motion · AI Layer",
  "> conversion_engine: ACTIVE",
  "> lead_routing: WHATSAPP_ENABLED",
  "> latency: 42ms · uptime: 99.98%",
  "> status: 200 OK ✓",
];

const COMMANDS = [
  {
    id: "real-estate-demo",
    label: "run real-estate-demo",
    response: [
      "> loading Aravalli Homes engine...",
      "> launching live simulation overlay ✓",
    ],
    highlight: "aravalli-card",
    overlay: true,
  },
  {
    id: "coaching-demo",
    label: "run coaching-demo",
    response: [
      "> spinning up Coaching System module...",
      "> redirecting viewport → Business OS grid ✓",
    ],
    highlight: "coaching-tile",
  },
  {
    id: "check-system-speed",
    label: "check-system-speed",
    response: [
      "> pinging edge network...",
      "> lighthouse: 100/100 · latency 42ms ✓",
    ],
    highlight: "performance-card",
  },
];

export default function TerminalWidget() {
  const [displayed, setDisplayed] = useState(() => Array(BOOT_LINES.length).fill(""));
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [log, setLog] = useState([]);
  const [demoOpen, setDemoOpen] = useState(false);
  const logEndRef = useRef(null);

  useEffect(() => {
    if (lineIndex >= BOOT_LINES.length) {
      const resetTimeout = setTimeout(() => {
        setDisplayed(Array(BOOT_LINES.length).fill(""));
        setLineIndex(0);
        setCharIndex(0);
      }, 2600);
      return () => clearTimeout(resetTimeout);
    }

    const current = BOOT_LINES[lineIndex];
    if (charIndex <= current.length) {
      const timeout = setTimeout(() => {
        setDisplayed((prev) => {
          const next = [...prev];
          next[lineIndex] = current.slice(0, charIndex);
          return next;
        });
        setCharIndex((c) => c + 1);
      }, 16 + Math.random() * 28);
      return () => clearTimeout(timeout);
    }

    const lineTimeout = setTimeout(() => {
      setLineIndex((l) => l + 1);
      setCharIndex(0);
    }, 260);
    return () => clearTimeout(lineTimeout);
  }, [charIndex, lineIndex]);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [log]);

  const runCommand = (command) => {
    setLog((prev) => [
      ...prev,
      { key: `${command.id}-${Date.now()}`, cmd: command.label, response: command.response },
    ]);
    if (command.highlight) pulseHighlight(command.highlight);
    if (command.overlay) setDemoOpen(true);
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-white/[0.08] bg-black/60 shadow-panel backdrop-blur-glass">
      <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 animate-pulseDot rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-[11px] text-alabaster/40">
          architecture.sh
        </span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-emerald/70">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
          </span>
          live
        </span>
      </div>

      <div className="h-[190px] space-y-1.5 overflow-y-auto p-4 font-mono text-[12px] leading-relaxed text-emerald/90 scrollbar-none">
        {BOOT_LINES.map((line, i) => (
          <div key={line} className={i > lineIndex ? "invisible" : ""}>
            {displayed[i] || " "}
            {i === lineIndex && <span className="animate-blink">▌</span>}
          </div>
        ))}

        <AnimatePresence initial={false}>
          {log.map((entry) => (
            <motion.div
              key={entry.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="pt-1"
            >
              <div className="text-alabaster/70">$ {entry.cmd}</div>
              {entry.response.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={logEndRef} />
      </div>

      <div className="flex flex-wrap gap-2 border-t border-white/[0.08] p-3">
        {COMMANDS.map((command) => (
          <button
            key={command.id}
            onClick={() => runCommand(command)}
            className="cursor-pointer-target group flex items-center gap-1.5 rounded-full border border-white/[0.1] bg-white/[0.02] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-alabaster/60 transition-colors hover:border-emerald/40 hover:text-emerald"
          >
            <PlayCircle size={11} className="text-emerald/70 group-hover:text-emerald" />
            {command.label}
          </button>
        ))}
      </div>

      <RealEstateDemoOverlay open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}
