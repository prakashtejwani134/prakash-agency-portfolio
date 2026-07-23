"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, X } from "lucide-react";
import { buildWhatsAppLink } from "@/utils/config";

const SUGGESTIONS = ["Lead routing", "Speed-to-lead", "Pricing"];

const WHATSAPP_HANDOFF = {
  key: "handoff",
  from: "bot",
  text: "Want the full breakdown? Tap below and I'll connect you straight to Prakash on WhatsApp.",
  cta: true,
};

const FALLBACK_REPLY =
  "Connection hiccup on my end — try again in a moment, or message Prakash directly on WhatsApp.";

export default function AIAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      key: "intro",
      from: "bot",
      text: "Hey, I'm the PT Architecture Bot. Ask me about lead routing, speed-to-lead, or pricing models.",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, typing]);

  const ask = async (question) => {
    const trimmed = question.trim();
    if (!trimmed) return;

    const userMsg = { key: `u-${Date.now()}`, from: "user", text: trimmed };
    const history = [...messages, userMsg]
      .filter((m) => !m.cta)
      .map((m) => ({ role: m.from === "user" ? "user" : "assistant", content: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      const data = await res.json();
      const answer = res.ok && data.reply ? data.reply : data.error || FALLBACK_REPLY;

      setMessages((prev) => [
        ...prev,
        { key: `b-${Date.now()}`, from: "bot", text: answer },
        { ...WHATSAPP_HANDOFF, key: `h-${Date.now()}` },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { key: `b-${Date.now()}`, from: "bot", text: FALLBACK_REPLY },
        { ...WHATSAPP_HANDOFF, key: `h-${Date.now()}` },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open PT Architecture Bot"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="cursor-pointer-target fixed bottom-24 right-5 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-emerald/30 bg-obsidian shadow-glow md:bottom-28 md:right-8"
      >
        {open ? <X size={18} className="text-alabaster" /> : <Bot size={20} className="text-emerald" />}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-[9.5rem] right-5 z-[90] flex h-[26rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-black/80 shadow-panel backdrop-blur-glass md:bottom-[11rem] md:right-8"
          >
            <div className="flex items-center gap-2 border-b border-white/[0.08] px-4 py-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-emerald/30 text-emerald">
                <Bot size={13} />
              </span>
              <div>
                <p className="text-xs font-medium text-alabaster">PT Architecture Bot</p>
                <p className="font-mono text-[10px] text-emerald/70">online · instant answers</p>
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4 font-mono text-[12px] leading-relaxed scrollbar-none">
              {messages.map((m) =>
                m.cta ? (
                  <div key={m.key} className="flex flex-col gap-2">
                    <div className="max-w-[85%] rounded-2xl rounded-tl-sm border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-alabaster/75">
                      {m.text}
                    </div>
                    <a
                      href={buildWhatsAppLink("Hi Prakash, the architecture bot sent me — I'd like to talk.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer-target inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald px-3 py-1.5 text-[10px] uppercase tracking-wider text-obsidian"
                    >
                      Continue on WhatsApp
                    </a>
                  </div>
                ) : (
                  <div
                    key={m.key}
                    className={
                      m.from === "user"
                        ? "ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-emerald/[0.12] px-3 py-2 text-alabaster"
                        : "max-w-[85%] rounded-2xl rounded-tl-sm border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-alabaster/75"
                    }
                  >
                    {m.text}
                  </div>
                )
              )}

              {typing && (
                <div className="flex w-fit items-center gap-1.5 rounded-2xl rounded-tl-sm border border-white/[0.08] bg-white/[0.03] px-3 py-2.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-emerald/70"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              )}
              <div ref={endRef} />
            </div>

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-2 border-t border-white/[0.08] px-4 py-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => ask(s)}
                    className="cursor-pointer-target rounded-full border border-white/[0.1] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-alabaster/60 hover:border-emerald/40 hover:text-emerald"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                ask(input);
              }}
              className="flex items-center gap-2 border-t border-white/[0.08] p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pricing, speed, routing..."
                className="w-full flex-1 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2 font-mono text-[11px] text-alabaster placeholder:text-alabaster/25 focus:border-emerald/40 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                className="cursor-pointer-target flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald text-obsidian"
              >
                <Send size={13} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
