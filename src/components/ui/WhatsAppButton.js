"use client";

import { motion } from "framer-motion";
import { buildWhatsAppLink } from "@/utils/config";

export default function WhatsAppButton() {
  const href = buildWhatsAppLink(
    "Hi Prakash, I'd like to discuss a project for my business."
  );

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message on WhatsApp"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="cursor-pointer-target group fixed bottom-6 right-5 z-[90] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-glow md:bottom-8 md:right-8"
    >
      <span className="absolute inset-0 animate-pulseDot rounded-full" />
      <svg
        viewBox="0 0 32 32"
        className="relative h-7 w-7 fill-obsidian"
        aria-hidden="true"
      >
        <path d="M16.004 3C9.376 3 4 8.373 4 15c0 2.34.663 4.523 1.813 6.376L4 29l7.82-1.766A11.94 11.94 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.75c-1.98 0-3.833-.552-5.41-1.51l-.388-.23-4.64 1.048 1.07-4.516-.253-.402A9.7 9.7 0 0 1 5.25 15c0-5.93 4.82-10.75 10.754-10.75 5.93 0 10.75 4.82 10.75 10.75s-4.82 10.75-10.75 10.75Zm5.913-8.05c-.324-.163-1.917-.946-2.214-1.054-.297-.108-.513-.163-.73.163-.216.324-.837 1.054-1.026 1.27-.19.216-.378.244-.702.081-.324-.163-1.368-.504-2.605-1.607-.963-.859-1.613-1.92-1.803-2.244-.19-.325-.02-.5.143-.663.146-.146.324-.379.487-.568.163-.19.216-.325.324-.541.108-.216.054-.406-.027-.568-.081-.163-.73-1.756-1-2.406-.263-.633-.53-.548-.73-.558-.19-.008-.406-.01-.622-.01-.216 0-.568.081-.865.406-.297.325-1.135 1.109-1.135 2.703 0 1.594 1.162 3.133 1.324 3.35.163.216 2.287 3.492 5.542 4.898.774.334 1.378.534 1.849.683.777.247 1.484.212 2.043.129.623-.093 1.917-.784 2.187-1.541.27-.758.27-1.406.19-1.542-.081-.135-.297-.216-.622-.379Z" />
      </svg>
    </motion.a>
  );
}
