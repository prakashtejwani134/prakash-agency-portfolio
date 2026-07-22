import { cn } from "@/utils/cn";

export default function GlassCard({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "glass-panel shadow-panel",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-white/[0.05] before:to-transparent",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
