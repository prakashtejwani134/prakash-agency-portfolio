"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export default function MagneticButton({
  children,
  className,
  as: Comp = "button",
  strength = 0.35,
  ...props
}) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setPos({ x, y });
  };

  const reset = () => setPos({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.6 }}
      className="inline-block cursor-pointer-target"
    >
      <Comp
        className={cn(
          "relative inline-flex items-center justify-center gap-2 whitespace-nowrap",
          className
        )}
        {...props}
      >
        {children}
      </Comp>
    </motion.div>
  );
}
