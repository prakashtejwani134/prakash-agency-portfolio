"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clapperboard, X } from "lucide-react";
import Portal from "@/components/ui/Portal";
import { SYSTEM_OVERVIEW_VIDEO_URL } from "@/utils/config";

export default function VideoOverviewModal({ open, onClose }) {
  return (
    <Portal>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
            onClick={onClose}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel w-full max-w-2xl overflow-hidden shadow-panel"
            >
              <div className="flex items-center justify-between border-b border-white/[0.08] px-6 py-4">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-emerald/80">
                  <Clapperboard size={14} />
                  90s System Overview
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="cursor-pointer-target flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.1] text-alabaster/50 hover:text-alabaster"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black">
                {SYSTEM_OVERVIEW_VIDEO_URL ? (
                  <iframe
                    src={SYSTEM_OVERVIEW_VIDEO_URL}
                    title="90s System Overview"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-graphite via-graphite-dark to-black px-8 text-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald/30 text-emerald">
                      <Clapperboard size={22} />
                    </span>
                    <p className="font-serif text-xl italic text-alabaster">
                      Video breakdown launching soon.
                    </p>
                    <p className="max-w-sm text-sm text-alabaster/50">
                      A 90-second walkthrough of the lead-to-client architecture is in
                      production. Check back shortly, or message directly on WhatsApp.
                    </p>
                  </div>
                )}
              </div>

              <div className="px-6 py-5">
                <p className="text-sm text-alabaster/55">
                  See exactly how a click becomes a qualified, WhatsApp-routed client —
                  ad traffic, AI scoring, and instant dispatch in one continuous system.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Portal>
  );
}
