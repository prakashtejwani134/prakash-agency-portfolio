import Hero from "@/components/sections/Hero";
import SystemVisualizer from "@/components/sections/SystemVisualizer";
import LiveShowcase from "@/components/sections/LiveShowcase";
import PositioningGrid from "@/components/sections/PositioningGrid";
import ServicesMatrix from "@/components/sections/ServicesMatrix";
import ROICalculator from "@/components/sections/ROICalculator";
import ContactTerminal from "@/components/sections/ContactTerminal";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <SystemVisualizer />
      <LiveShowcase />
      <PositioningGrid />
      <ServicesMatrix />
      <ROICalculator />
      <ContactTerminal />
    </main>
  );
}
