import { Playfair_Display, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Prakash Tejwani | AI Web Architect & Growth Systems",
  description:
    "Architecting high-converting digital systems and AI-powered software solutions for real estate, coaching, and e-commerce brands.",
  keywords: [
    "AI web architect",
    "growth systems",
    "custom lead engines",
    "Next.js developer",
    "WhatsApp automation",
  ],
  openGraph: {
    title: "Prakash Tejwani | AI Web Architect & Growth Systems",
    description:
      "Architecting high-converting digital systems and AI-powered software solutions.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jetbrainsMono.variable} ${inter.variable}`}
    >
      <body className="bg-obsidian text-alabaster antialiased">
        <SmoothScrollProvider>
          <CustomCursor />
          <GrainOverlay />
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
