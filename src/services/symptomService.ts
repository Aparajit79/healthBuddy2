// symptomService.ts — AI-powered via Anthropic API
// Bug fixes applied:
//   1. Removed singleton mutable state (currentSymptom leaking across sessions)
//   2. Replaced keyword-matching with real Claude API calls
//   3. Full conversation history sent each turn for context

const SYSTEM_PROMPT = `You are Health Buddy, a compassionate and knowledgeable AI health assistant. Your role is to:
- Listen carefully to symptoms and provide helpful, evidence-based health information
- Ask relevant follow-up questions to understand the situation better
- Suggest practical home remedies and over-the-counter options where appropriate
- Clearly indicate when symptoms warrant professional medical attention
- Be empathetic, clear, and avoid medical jargon
- Always include a brief reminder to consult a healthcare professional for diagnosis or treatment
- Keep responses concise (3-5 sentences typically) unless a detailed explanation is needed
- IMPORTANT: Never diagnose. Provide guidance and information only, not a medical diagnosis.
- For emergencies (chest pain, difficulty breathing, stroke symptoms, severe allergic reactions), always tell the user to call emergency services immediately.`;

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function getAIResponse(messages: Message[]): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json();
  const text = data.content
    ?.map((block: { type: string; text?: string }) =>
      block.type === "text" ? block.text : ""
    )
    .join("") ?? "";

  if (!text) throw new Error("Empty response from API");
  return text;
}

export const INITIAL_GREETING =
  "Hello! I'm Health Buddy, your AI health assistant. I can help you understand your symptoms and suggest general guidance. What's bothering you today?";
