const OpenAI = require("openai");
const { schemes } = require("../schemes/schemes-data");
const { searchSchemes, filterByEligibility } = require("../schemes/embeddings");
const {
    getAnalysisSystemPrompt,
    getAnalysisUserPrompt,
} = require("../ai/prompts");

// Lazy-initialize OpenAI client with Gemini-compatible endpoint
let openaiClient = null;
function getOpenAI() {
    if (!openaiClient) {
        openaiClient = new OpenAI({
            apiKey: process.env.GEMINI_API_KEY || "placeholder",
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
        });
    }
    return openaiClient;
}

function buildSearchQuery(profile) {
    const parts = [];
    if (profile.occupation) parts.push(profile.occupation);
    if (profile.state) parts.push(profile.state);
    if (profile.category) parts.push(profile.category);
    if (profile.description) parts.push(profile.description);
    if (profile.age && profile.age >= 60) parts.push("senior citizen pension");
    if (profile.income && profile.income < 150000) parts.push("BPL poverty");
    return parts.join(" ") || "government scheme benefits";
}

async function analyzeEligibility(userProfile) {
    // Step 1: Build search query from user profile
    const searchQuery = buildSearchQuery(userProfile);

    // Step 2: Search for relevant schemes
    const searchResults = searchSchemes(searchQuery, 8);

    // Step 3: Filter by hard eligibility criteria
    const eligibleSchemes = filterByEligibility(
        searchResults.map((r) => r.scheme),
        userProfile
    );

    // Step 4: Prepare scheme details for the prompt
    const schemeDetails = eligibleSchemes
        .map(
            (s) =>
                `- ${s.name} (ID: ${s.id}): ${s.description} | Eligibility: income<${s.eligibility.maxIncome}, age ${s.eligibility.minAge || "any"}-${s.eligibility.maxAge || "any"} | Benefits: ${s.benefits}`
        )
        .join("\n");

    // Step 5: Get AI analysis
    const systemPrompt = getAnalysisSystemPrompt(schemeDetails);
    const userPrompt = getAnalysisUserPrompt(userProfile);

    if (!process.env.GEMINI_API_KEY) {
        return buildFallbackResponse(eligibleSchemes, userProfile);
    }

    try {
        const completion = await getOpenAI().chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", content: systemPrompt }, {
                    role: "user",
                    content: userPrompt,
                },
            ],
            temperature: 0.3,
        });

        const responseText = completion.choices[0]?.message?.content || "";

        // Parse JSON from response
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        return buildFallbackResponse(eligibleSchemes, userProfile);
    } catch (error) {
        console.error("GPT analysis failed:", error);
        return buildFallbackResponse(eligibleSchemes, userProfile);
    }
}

function buildFallbackResponse(eligibleSchemes, userProfile) {
    const recommendations = eligibleSchemes.map(
        (scheme) => ({
            schemeId: scheme.id,
            schemeName: scheme.name,
            description: scheme.description,
            benefitAmount: scheme.benefits,
            whyQualifies: `Based on your profile (income: ₹${(userProfile.income || 0).toLocaleString("en-IN")}) and occupation (${userProfile.occupation || "not specified"}), you may be eligible for this scheme.`,
            requiredDocuments: scheme.requiredDocuments,
            nextSteps: scheme.nextSteps,
            confidenceScore: 0.6,
        })
    );

    return {
        recommendations,
        summary: `Found ${recommendations.length} potentially eligible schemes based on your profile. AI personalization may be limited due to API rate limits — try again in a minute for richer explanations.`,
    };
}

module.exports = { analyzeEligibility };
