"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";
import MagneticButton from "@/components/ui/MagneticButton";

const LINKS = [
  { href: "#architecture", label: "Flow" },
  { href: "#showcase", label: "Showcase" },
  { href: "#systems", label: "Systems" },
  { href: "#services", label: "Services" },
  { href: "#roi", label: "ROI" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");
  const [hovered, setHovered] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-4 z-[90] flex justify-center px-4 transition-all duration-500 md:top-6",
        )}
      >
        <div
          className={cn(
            "glass-pill flex w-full max-w-5xl items-center justify-between gap-3 px-4 py-2.5 shadow-panel transition-all duration-500 md:px-5",
            scrolled ? "bg-obsidian/70" : "bg-white/[0.03]"
          )}
        >
          <a
            href="#hero"
            className="cursor-pointer-target font-serif text-lg italic tracking-tight text-alabaster"
          >
            PT<span className="text-emerald">.</span>
          </a>

          <nav className="relative hidden items-center gap-1 md:flex">
            {LINKS.map((link) => {
              const isActive = active === link.href;
              const isHovered = hovered === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.href)}
                  onMouseLeave={() => setHovered(null)}
                  className="cursor-pointer-target relative rounded-full px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-alabaster/70 transition-colors hover:text-alabaster"
                >
                  {(isActive || isHovered) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-white/[0.08]"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <div className="flex items-center gap-2 whitespace-nowrap rounded-full border border-emerald/20 bg-emerald/[0.06] px-3 py-1.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              <span className="font-mono text-[10.5px] tracking-wide text-emerald/90">
                Available for Q3 Systems &amp; Digital Architecture
              </span>
            </div>
          </div>

          <MagneticButton
            as="a"
            href="#contact"
            className="hidden rounded-full bg-alabaster px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-obsidian transition-colors hover:bg-emerald md:inline-flex"
          >
            Book Call
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </MagneticButton>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="cursor-pointer-target flex h-9 w-9 items-center justify-center rounded-full border border-white/[0.08] text-alabaster md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-20 z-[89] glass-panel flex flex-col gap-1 p-4 md:hidden"
          >
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer-target rounded-2xl px-4 py-3 font-mono text-sm uppercase tracking-wider text-alabaster/80 hover:bg-white/[0.05] hover:text-alabaster"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-2 rounded-2xl border border-emerald/20 bg-emerald/[0.06] px-4 py-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
              </span>
              <span className="font-mono text-[10.5px] tracking-wide text-emerald/90">
                Available for Q3 Systems
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
