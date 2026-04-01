import { NextRequest, NextResponse } from "next/server";
import { analyzeEligibility } from "@/lib/ai/rag";

const defaultTestProfiles = [
    {
        name: "Young Farmer in UP",
        profile: {
            income: 120000,
            state: "Uttar Pradesh",
            occupation: "farmer",
            age: 28,
            gender: "Male",
            familySize: 5,
            description: "I am a small farmer growing wheat and rice on 2 acres of land.",
        },
        expectedSchemes: ["pm-kisan", "ayushman-bharat", "skill-india"],
    },
    {
        name: "SC Student in Bihar",
        profile: {
            income: 150000,
            state: "Bihar",
            occupation: "student",
            age: 20,
            gender: "Female",
            category: "SC",
            familySize: 6,
            description: "I am pursuing my B.A. degree and need financial support for education.",
        },
        expectedSchemes: ["scholarship-sc-st", "ayushman-bharat"],
    },
    {
        name: "Senior Citizen in Maharashtra",
        profile: {
            income: 90000,
            state: "Maharashtra",
            age: 68,
            gender: "Male",
            familySize: 2,
            description: "I am retired and living with my wife. We need pension and health support.",
        },
        expectedSchemes: ["senior-citizen-pension", "ayushman-bharat"],
    },
    {
        name: "Woman Entrepreneur in Gujarat",
        profile: {
            income: 250000,
            state: "Gujarat",
            occupation: "self-employed",
            age: 35,
            gender: "Female",
            familySize: 4,
            description: "I run a small tailoring business and want to expand it.",
        },
        expectedSchemes: ["mudra-loan", "msme-credit"],
    },
    {
        name: "BPL Family in Rajasthan",
        profile: {
            income: 80000,
            state: "Rajasthan",
            occupation: "laborer",
            age: 40,
            gender: "Female",
            familySize: 6,
            description:
                "We are a BPL family. I need gas connection, housing, and health insurance.",
        },
        expectedSchemes: ["lpg-subsidy", "pmay", "ayushman-bharat"],
    },
];

export async function POST(request) {
    try {
        const body = await request.json();
        const profiles = body.profiles || defaultTestProfiles;

        const evaluationResults = [];
        let totalCorrect = 0;
        let totalExpected = 0;

        for (const testProfile of profiles) {
            try {
                const result = await analyzeEligibility(testProfile.profile);

                const matchedSchemeIds = result.recommendations.map((r) => r.schemeId);
                const expectedSet = new Set(testProfile.expectedSchemes);
                const matchedExpected = matchedSchemeIds.filter((id) =>
                    expectedSet.has(id)
                );

                const precision =
                    matchedSchemeIds.length > 0
                        ? matchedExpected.length / matchedSchemeIds.length
                        : 0;
                const recall =
                    testProfile.expectedSchemes.length > 0
                        ? matchedExpected.length / testProfile.expectedSchemes.length
                        : 0;

                totalCorrect += matchedExpected.length;
                totalExpected += testProfile.expectedSchemes.length;

                evaluationResults.push({
                    profileName: testProfile.name,
                    profile: testProfile.profile,
                    expectedSchemes: testProfile.expectedSchemes,
                    matchedSchemes: matchedSchemeIds,
                    recommendations: result.recommendations,
                    metrics: {
                        precision: Math.round(precision * 100) / 100,
                        recall: Math.round(recall * 100) / 100,
                        f1Score:
                            precision + recall > 0
                                ? Math.round(
                                    ((2 * precision * recall) / (precision + recall)) * 100
                                ) / 100
                                : 0,
                    },
                    avgConfidence:
                        result.recommendations.length > 0
                            ? Math.round(
                                (result.recommendations.reduce(
                                    (sum, r) => sum + r.confidenceScore,
                                    0
                                ) /
                                    result.recommendations.length) *
                                100
                            ) / 100
                            : 0,
                });
            } catch (error) {
                evaluationResults.push({
                    profileName: testProfile.name,
                    error: "Analysis failed for this profile",
                    profile: testProfile.profile,
                });
            }
        }

        const overallPrecision =
            totalExpected > 0
                ? Math.round((totalCorrect / totalExpected) * 100) / 100
                : 0;

        return NextResponse.json({
            results: evaluationResults,
            overallMetrics: {
                totalProfiles: profiles.length,
                overallRecall: overallPrecision,
                averageConfidence:
                    evaluationResults
                        .filter((r) => "avgConfidence" in r)
                        .reduce(
                            (sum, r) =>
                                sum + (r.avgConfidence || 0),
                            0
                        ) / evaluationResults.length,
            },
        });
    } catch (error) {
        console.error("Evaluation API error:", error);
        return NextResponse.json(
            { error: "Evaluation failed. Please try again." },
            { status: 500 }
        );
    }
}
