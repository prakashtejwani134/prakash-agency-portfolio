import { GoogleGenerativeAI } from "@google/generative-ai";
import { WHATSAPP_NUMBER } from "@/utils/config";

const SYSTEM_PROMPT = `You are PT Architecture Bot, an AI assistant representing Prakash Tejwani (AI Web Architect & Systems Engineer).
Your job is to assist prospective clients visiting his portfolio.

Knowledge context:
- Prakash builds high-converting web apps, AI lead engines, and WhatsApp automation systems.
- Core Tech Stack: Next.js 15, Framer Motion, Vercel Edge, FastCallFlow AI, WhatsApp Business API.
- Featured Project: Aravalli Homes (Real Estate Engine) with sub-30s WhatsApp lead dispatching.
- Contact info: Direct WhatsApp available via +${WHATSAPP_NUMBER}.

Tone: Professional, sharp, helpful, conversational, and direct. Keep replies concise (1-3 sentences max).`;

const MODEL_NAME = "gemini-flash-latest";

export async function POST(request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "GEMINI_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = Array.isArray(body?.messages) ? body.messages : null;
  if (!messages || messages.length === 0) {
    return Response.json(
      { error: "`messages` must be a non-empty array of { role, content }." },
      { status: 400 }
    );
  }

  const contents = messages
    .filter((m) => m && typeof m.content === "string" && m.content.trim().length > 0)
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  if (contents.length === 0) {
    return Response.json({ error: "No usable message content." }, { status: 400 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent({ contents });
    const reply = result.response.text().trim();

    return Response.json({ reply });
  } catch (error) {
    console.error("Gemini chat error:", error);
    return Response.json(
      {
        error:
          "The assistant is temporarily unavailable. Please reach out on WhatsApp instead.",
      },
      { status: 502 }
    );
  }
}
