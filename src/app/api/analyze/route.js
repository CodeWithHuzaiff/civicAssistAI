import { NextRequest, NextResponse } from "next/server";
import { analyzeEligibility } from "@/lib/ai/rag";

// Simple in-memory rate limiting placeholder
const requestCounts = new Map();
const RATE_LIMIT = 10; // requests per minute
const RATE_WINDOW = 60000; // 1 minute

function checkRateLimit(ip) {
    const now = Date.now();
    const record = requestCounts.get(ip);

    if (!record || now > record.resetTime) {
        requestCounts.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
        return true;
    }

    if (record.count >= RATE_LIMIT) {
        return false;
    }

    record.count++;
    return true;
}

export async function POST(request) {
    try {
        // Rate limiting
        const ip = request.headers.get("x-forwarded-for") || "anonymous";
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Rate limit exceeded. Please try again later." },
                { status: 429 }
            );
        }

        const body = await request.json();

        // Validate required fields
        if (!body || typeof body !== "object") {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        const userProfile = {
            income: body.income ? Number(body.income) : undefined,
            state: body.state || undefined,
            occupation: body.occupation || undefined,
            age: body.age ? Number(body.age) : undefined,
            gender: body.gender || undefined,
            category: body.category || undefined,
            familySize: body.familySize ? Number(body.familySize) : undefined,
            description: body.description || undefined,
        };

        // At least income or description should be provided
        if (!userProfile.income && !userProfile.description) {
            return NextResponse.json(
                {
                    error:
                        "Please provide at least your income or a description of your situation.",
                },
                { status: 400 }
            );
        }

        const result = await analyzeEligibility(userProfile);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Analysis API error:", error);
        return NextResponse.json(
            { error: "An error occurred while analyzing eligibility. Please try again." },
            { status: 500 }
        );
    }
}
