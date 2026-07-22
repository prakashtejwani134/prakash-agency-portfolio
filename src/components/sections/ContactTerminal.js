"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Home, GraduationCap, Bot, Sparkles } from "lucide-react";
import { fadeUp, staggerContainer } from "@/utils/variants";
import { buildWhatsAppLink } from "@/utils/config";
import { cn } from "@/utils/cn";
import MagneticButton from "@/components/ui/MagneticButton";

const SCOPES = [
  { id: "real-estate", label: "Real Estate Engine", icon: Home },
  { id: "coaching", label: "Coaching System", icon: GraduationCap },
  { id: "automation", label: "Custom Automation", icon: Bot },
  { id: "other", label: "Something Else", icon: Sparkles },
];

export default function ContactTerminal() {
  const [scope, setScope] = useState(SCOPES[0].id);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const scopeLabel = SCOPES.find((s) => s.id === scope)?.label ?? "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const brief = [
      `Hi Prakash, I'm ${name || "reaching out"} and I'd like to discuss a ${scopeLabel}.`,
      email ? `Email: ${email}` : null,
      message ? `Brief: ${message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(buildWhatsAppLink(brief), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contact" className="relative px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer()}
          className="mb-12 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-emerald/80"
          >
            Contact Terminal
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-serif text-4xl italic leading-tight text-alabaster md:text-5xl"
          >
            Initiate the build.
          </motion.h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className="glass-panel p-6 md:p-10"
        >
          <div className="mb-8 rounded-2xl border border-white/[0.06] bg-black/40 p-4 font-mono text-[12px] leading-relaxed text-emerald/80">
            <p>&gt; initiate_project()</p>
            <p className="text-alabaster/40">// fill scope to generate a WhatsApp brief</p>
          </div>

          <div className="mb-6">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-alabaster/50">
              Select scope
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {SCOPES.map(({ id, label, icon: Icon }) => {
                const isActive = scope === id;
                return (
                  <button
                    type="button"
                    key={id}
                    onClick={() => setScope(id)}
                    className={cn(
                      "cursor-pointer-target flex flex-col items-center gap-2 rounded-2xl border px-3 py-4 text-center transition-colors",
                      isActive
                        ? "border-emerald/40 bg-emerald/[0.06] text-emerald"
                        : "border-white/[0.08] bg-white/[0.02] text-alabaster/60 hover:border-white/[0.15]"
                    )}
                  >
                    <Icon size={18} />
                    <span className="font-mono text-[10px] uppercase tracking-wider">
                      {label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-alabaster/50">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-alabaster placeholder:text-alabaster/25 focus:border-emerald/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-alabaster/50">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                required
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-alabaster placeholder:text-alabaster/25 focus:border-emerald/40 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-alabaster/50">
              Project brief
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="Tell me about your business and what you want the system to do..."
              className="w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-sm text-alabaster placeholder:text-alabaster/25 focus:border-emerald/40 focus:outline-none"
            />
          </div>

          <MagneticButton
            as="button"
            type="submit"
            wrapperClassName="mt-8 block w-full"
            className="cursor-pointer-target flex w-full items-center justify-center gap-2 rounded-full bg-emerald px-6 py-4 font-mono text-xs uppercase tracking-wider text-obsidian transition-transform hover:scale-[1.01]"
          >
            Transmit Brief via WhatsApp
            <Send size={14} />
          </MagneticButton>
        </motion.form>
      </div>
    </section>
  );
}
