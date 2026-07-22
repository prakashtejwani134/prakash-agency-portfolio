import Hero from "@/components/sections/Hero";
import TrustBadges from "@/components/sections/TrustBadges";
import SystemVisualizer from "@/components/sections/SystemVisualizer";
import FastCallFlowShowcase from "@/components/sections/FastCallFlowShowcase";
import LiveShowcase from "@/components/sections/LiveShowcase";
import PositioningGrid from "@/components/sections/PositioningGrid";
import ServicesMatrix from "@/components/sections/ServicesMatrix";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ROICalculator from "@/components/sections/ROICalculator";
import ContactTerminal from "@/components/sections/ContactTerminal";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Hero />
      <TrustBadges />
      <SystemVisualizer />
      <FastCallFlowShowcase />
      <LiveShowcase />
      <PositioningGrid />
      <ServicesMatrix />
      <ProcessSteps />
      <ROICalculator />
      <ContactTerminal />
    </main>
  );
}
