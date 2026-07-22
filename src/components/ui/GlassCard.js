import { cn } from "@/utils/cn";

const GLOW_STYLES = {
  emerald: "hover:border-emerald/30 hover:shadow-glow",
  gold: "hover:border-gold/30 hover:shadow-glow-gold",
  cyan: "hover:border-cyan/30 hover:shadow-glow-cyan",
};

export default function GlassCard({ children, className, glow = "emerald", ...props }) {
  return (
    <div
      className={cn(
        "glass-panel shadow-panel transition-[border-color,box-shadow] duration-300",
        GLOW_STYLES[glow] ?? GLOW_STYLES.emerald,
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/[0.05] before:to-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
