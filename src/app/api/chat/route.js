import { NextResponse } from "next/server";
import OpenAI from "openai";
import { schemes } from "@/lib/schemes/schemes-data";

// Lazy-initialize Gemini client
let client = null;
function getClient() {
    if (!client) {
        client = new OpenAI({
            apiKey: process.env.GEMINI_API_KEY || "placeholder",
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
        });
    }
    return client;
}

// Build a compact scheme summary to keep prompt small
function buildSchemeContext() {
    return schemes
        .map(
            (s) =>
                `${s.name}: ${s.description.slice(0, 80)}. Income≤₹${s.eligibility.maxIncome || "N/A"}, Age ${s.eligibility.minAge || "any"}-${s.eligibility.maxAge || "any"}. Benefits: ${s.benefits.slice(0, 60)}`
        )
        .join("\n");
}

const SYSTEM_PROMPT = `You are CivicAssist AI, a helpful assistant for Indian government schemes.

Known schemes:
${buildSchemeContext()}

Rules: Be concise (2-4 sentences). Reference specific eligibility criteria. Reply in Hindi if asked in Hindi. Suggest the Eligibility Checker for personalized results.`;

// Helper to wait
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function POST(request) {
    try {
        const { message, history } = await request.json();

        if (!message || typeof message !== "string") {
            return NextResponse.json(
                { error: "Message is required" },
                { status: 400 }
            );
        }

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({
                reply: "I'm currently in offline mode. Please add your Gemini API key to .env.local to enable AI chat. In the meantime, try the **Eligibility Checker** for scheme recommendations!",
            });
        }

        // Build messages with limited history
        const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...(history || []).slice(-6).map((msg) => ({
                role: msg.role,
                content: msg.content,
            })),
            { role: "user", content: message },
        ];

        // Try up to 2 times with a delay for rate limits
        let lastError;
        for (let attempt = 0; attempt < 2; attempt++) {
            try {
                if (attempt > 0) await delay(2000);

                const completion = await getClient().chat.completions.create({
                    model: "gemini-2.0-flash",
                    messages,
                    temperature: 0.5,
                    max_tokens: 300,
                });

                const reply =
                    completion.choices[0]?.message?.content ||
                    "Sorry, I couldn't generate a response. Please try again.";

                return NextResponse.json({ reply });
            } catch (err) {
                lastError = err;
                if (err.status !== 429) break; // Only retry on rate limit
            }
        }

        // If all retries failed, return a helpful fallback
        console.error("Chat API error:", lastError);

        // Provide a basic keyword-based answer as fallback
        const lowerMsg = message.toLowerCase();
        const matchedScheme = schemes.find((s) => {
            // Match against scheme ID (with/without dashes)
            if (lowerMsg.includes(s.id) || lowerMsg.includes(s.id.replace(/-/g, " "))) return true;
            // Match against scheme name
            if (lowerMsg.includes(s.name.toLowerCase())) return true;
            // Match against significant words in the name (3+ chars)
            const nameWords = s.name.toLowerCase().split(/\s+/).filter((w) => w.length >= 3);
            return nameWords.some((word) => lowerMsg.includes(word));
        });

        if (matchedScheme) {
            return NextResponse.json({
                reply: `**${matchedScheme.name}**: ${matchedScheme.description}\n\n**Benefits**: ${matchedScheme.benefits}\n\n**Eligibility**: Income up to ₹${matchedScheme.eligibility.maxIncome?.toLocaleString("en-IN") || "no limit"}, Ages ${matchedScheme.eligibility.minAge || "any"}-${matchedScheme.eligibility.maxAge || "any"}.\n\n_(AI is temporarily rate-limited. Try again shortly for more detailed answers.)_`,
            });
        }

        return NextResponse.json({
            reply: "I'm temporarily rate-limited. Please try again in a few seconds, or use the **Eligibility Checker** page for detailed scheme recommendations!",
        });
    } catch (error) {
        console.error("Chat API error:", error);
        return NextResponse.json({
            reply: "Something went wrong. Please try again in a moment.",
        });
    }
}
