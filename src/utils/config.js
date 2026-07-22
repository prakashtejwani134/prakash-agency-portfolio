// Central place for values you should replace with your real business details.

// WhatsApp number in international format, digits only, no "+" or spaces.
export const WHATSAPP_NUMBER = "911234567890"; // TODO: replace with your real WhatsApp number

// Live deployment link for the Aravalli Homes case study shown in the showcase section.
export const ARAVALLI_LIVE_URL = "https://aravalli-homes.vercel.app"; // TODO: replace with the real deployment URL

export function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
