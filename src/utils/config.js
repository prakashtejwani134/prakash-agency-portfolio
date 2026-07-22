// Central place for values you should replace with your real business details.

// WhatsApp number in international format, digits only, no "+" or spaces.
export const WHATSAPP_NUMBER = "916377986953";

// Default pre-filled message used by generic WhatsApp trigger buttons.
export const DEFAULT_WHATSAPP_MESSAGE = "Hi Prakash, I want to build a growth engine";

// Live deployment link for the Aravalli Homes case study shown in the showcase section.
export const ARAVALLI_LIVE_URL = "https://aravali-homes-seven.vercel.app/";

// Loom / YouTube embed URL for the "Watch 90s System Overview" modal. Leave empty to show
// the "coming soon" placeholder state instead of an embed.
export const SYSTEM_OVERVIEW_VIDEO_URL = ""; // TODO: paste your Loom/YouTube embed URL here

export function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}
