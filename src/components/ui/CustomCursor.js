"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const dotX = useSpring(cursorX, { damping: 32, stiffness: 900, mass: 0.4 });
  const dotY = useSpring(cursorY, { damping: 32, stiffness: 900, mass: 0.4 });
  const ringX = useSpring(cursorX, { damping: 24, stiffness: 220, mass: 0.6 });
  const ringY = useSpring(cursorY, { damping: 24, stiffness: 220, mass: 0.6 });
  const glowX = useSpring(cursorX, { damping: 30, stiffness: 80, mass: 1 });
  const glowY = useSpring(cursorY, { damping: 30, stiffness: 80, mass: 1 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    setEnabled(mq.matches);
    if (!mq.matches) return;

    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      const target = e.target;
      setIsPointer(
        !!target.closest("a, button, [role='button'], input, textarea, select, .cursor-pointer-target")
      );
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <motion.div
        className="absolute h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-xl"
        style={{
          left: glowX,
          top: glowY,
          background: "radial-gradient(circle, #00FF87 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald/50 transition-[width,height] duration-200"
        style={{
          left: ringX,
          top: ringY,
          width: isPointer ? 52 : 32,
          height: isPointer ? 52 : 32,
          borderColor: isPointer ? "rgba(212,175,55,0.7)" : "rgba(0,255,135,0.5)",
        }}
      />
      <motion.div
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald"
        style={{ left: dotX, top: dotY }}
      />
    </div>
  );
}
