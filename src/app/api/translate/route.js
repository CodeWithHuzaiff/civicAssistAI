import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { getTranslationPrompt } from "@/lib/ai/prompts";

function getOpenAI() {
    return new OpenAI({
        apiKey: process.env.GEMINI_API_KEY || "placeholder",
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });
}

export async function POST(request) {
    try {
        const body = await request.json();

        if (!body.content || !body.targetLanguage) {
            return NextResponse.json(
                { error: "Missing content or targetLanguage" },
                { status: 400 }
            );
        }

        const systemPrompt = getTranslationPrompt(body.targetLanguage);

        const completion = await getOpenAI().chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", content: systemPrompt },
                {
                    role: "user",
                    content: `Translate this JSON to ${body.targetLanguage}:\n\n${JSON.stringify(body.content, null, 2)}`,
                },
            ],
            temperature: 0.2,
            max_tokens: 4000,
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) {
            throw new Error("Empty translation response");
        }

        const translated = JSON.parse(content);
        return NextResponse.json(translated);
    } catch (error) {
        console.error("Translation API error:", error);
        return NextResponse.json(
            { error: "Translation failed. Please try again." },
            { status: 500 }
        );
    }
}
