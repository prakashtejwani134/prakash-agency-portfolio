export function pulseHighlight(id, { duration = 2600 } = {}) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.classList.add("demo-glow");
  window.setTimeout(() => el.classList.remove("demo-glow"), duration);
}
