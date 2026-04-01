const { analyzeEligibility } = require('../lib/ai/rag');
const { schemes } = require('../lib/schemes/schemes-data');
const OpenAI = require('openai');
const { getTranslationPrompt } = require('../lib/ai/prompts');

// In-memory rate limiting placeholder
const requestCounts = new Map();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60000;

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

// 1. Analyze Controller
exports.analyze = async (req, res) => {
    try {
        const ip = req.ip || req.connection.remoteAddress || "anonymous";
        if (!checkRateLimit(ip)) {
            return res.status(429).json({ error: "Rate limit exceeded. Please try again later." });
        }

        const body = req.body;
        if (!body || typeof body !== "object") {
            return res.status(400).json({ error: "Invalid request body" });
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

        if (!userProfile.income && !userProfile.description) {
            return res.status(400).json({ error: "Please provide at least your income or a description of your situation." });
        }

        const result = await analyzeEligibility(userProfile);
        return res.json(result);
    } catch (error) {
        console.error("Analysis API error:", error);
        return res.status(500).json({ error: "An error occurred while analyzing eligibility. Please try again." });
    }
};

// 2. Chat Controller
let chatClient = null;
function getChatClient() {
    if (!chatClient) {
        chatClient = new OpenAI({
            apiKey: process.env.GEMINI_API_KEY || "placeholder",
            baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
        });
    }
    return chatClient;
}

function buildSchemeContext() {
    return schemes.map(
        (s) => `${s.name}: ${s.description.slice(0, 80)}. Income≤₹${s.eligibility.maxIncome || "N/A"}, Age ${s.eligibility.minAge || "any"}-${s.eligibility.maxAge || "any"}. Benefits: ${s.benefits.slice(0, 60)}`
    ).join("\n");
}

const SYSTEM_PROMPT = `You are CivicAssist AI, a helpful assistant for Indian government schemes.
Known schemes:
${buildSchemeContext()}
Rules: Be concise (2-4 sentences). Reference specific eligibility criteria. Reply in Hindi if asked in Hindi. Suggest the Eligibility Checker for personalized results.`;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

exports.chat = async (req, res) => {
    try {
        const { message, history } = req.body;
        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Message is required" });
        }

        if (!process.env.GEMINI_API_KEY) {
            return res.json({ reply: "I'm currently in offline mode. Please add your Gemini API key to .env to enable AI chat." });
        }

        const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...(history || []).slice(-6).map((msg) => ({ role: msg.role, content: msg.content })),
            { role: "user", content: message },
        ];

        let lastError;
        for (let attempt = 0; attempt < 2; attempt++) {
            try {
                if (attempt > 0) await delay(2000);
                const completion = await getChatClient().chat.completions.create({
                    model: "gemini-2.0-flash", messages, temperature: 0.5, max_tokens: 300,
                });
                const reply = completion.choices[0]?.message?.content || "Sorry, I couldn't generate a response. Please try again.";
                return res.json({ reply });
            } catch (err) {
                lastError = err;
                if (err.status !== 429) break;
            }
        }

        console.error("Chat API error:", lastError);
        const lowerMsg = message.toLowerCase();
        const matchedScheme = schemes.find((s) => {
            if (lowerMsg.includes(s.id) || lowerMsg.includes(s.id.replace(/-/g, " "))) return true;
            if (lowerMsg.includes(s.name.toLowerCase())) return true;
            const nameWords = s.name.toLowerCase().split(/\s+/).filter((w) => w.length >= 3);
            return nameWords.some((word) => lowerMsg.includes(word));
        });

        if (matchedScheme) {
            return res.json({ reply: `**${matchedScheme.name}**: ${matchedScheme.description}\n\n**Benefits**: ${matchedScheme.benefits}\n\n**Eligibility**: Income up to ₹${matchedScheme.eligibility.maxIncome?.toLocaleString("en-IN") || "no limit"}, Ages ${matchedScheme.eligibility.minAge || "any"}-${matchedScheme.eligibility.maxAge || "any"}.\n\n_(AI is temporarily rate-limited. Try again shortly for more detailed answers.)_` });
        }

        return res.json({ reply: "I'm temporarily rate-limited. Please try again in a few seconds." });
    } catch (error) {
        console.error("Chat API error:", error);
        return res.status(500).json({ reply: "Something went wrong. Please try again in a moment." });
    }
};

// 3. Translate Controller
exports.translate = async (req, res) => {
    try {
        const body = req.body;
        if (!body.content || !body.targetLanguage) {
            return res.status(400).json({ error: "Missing content or targetLanguage" });
        }

        const systemPrompt = getTranslationPrompt(body.targetLanguage);
        const completion = await getChatClient().chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Translate this JSON to ${body.targetLanguage}:\n\n${JSON.stringify(body.content, null, 2)}` },
            ],
            temperature: 0.2, max_tokens: 4000,
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) throw new Error("Empty translation response");

        const translated = JSON.parse(content);
        return res.json(translated);
    } catch (error) {
        console.error("Translation API error:", error);
        return res.status(500).json({ error: "Translation failed. Please try again." });
    }
};

// 4. OCR Controller (Mock)
exports.ocr = async (req, res) => {
    try {
        // We will just return the mocked data as before since it is mock.
        const mockExtractedData = {
            success: true,
            extractedFields: {
                name: "Extracted Name", income: 180000, idNumber: "XXXX-XXXX-1234", age: 35, state: "Maharashtra",
            },
            rawText: "This is a mock OCR result. In production, this would contain the actual extracted text from the uploaded document.",
            confidence: 0.87,
        };
        await delay(1000);
        return res.json(mockExtractedData);
    } catch (error) {
        return res.status(500).json({ error: "OCR processing failed. Please try again." });
    }
};

// 5. Evaluate Controller
const defaultTestProfiles = [
    { name: "Young Farmer in UP", profile: { income: 120000, state: "Uttar Pradesh", occupation: "farmer", age: 28, gender: "Male", familySize: 5, description: "I am a small farmer growing wheat and rice on 2 acres of land." }, expectedSchemes: ["pm-kisan", "ayushman-bharat", "skill-india"] },
    { name: "SC Student in Bihar", profile: { income: 150000, state: "Bihar", occupation: "student", age: 20, gender: "Female", category: "SC", familySize: 6, description: "I am pursuing my B.A. degree and need financial support for education." }, expectedSchemes: ["scholarship-sc-st", "ayushman-bharat"] },
    { name: "Senior Citizen in Maharashtra", profile: { income: 90000, state: "Maharashtra", age: 68, gender: "Male", familySize: 2, description: "I am retired and living with my wife. We need pension and health support." }, expectedSchemes: ["senior-citizen-pension", "ayushman-bharat"] },
    { name: "Woman Entrepreneur in Gujarat", profile: { income: 250000, state: "Gujarat", occupation: "self-employed", age: 35, gender: "Female", familySize: 4, description: "I run a small tailoring business and want to expand it." }, expectedSchemes: ["mudra-loan", "msme-credit"] },
    { name: "BPL Family in Rajasthan", profile: { income: 80000, state: "Rajasthan", occupation: "laborer", age: 40, gender: "Female", familySize: 6, description: "We are a BPL family. I need gas connection, housing, and health insurance." }, expectedSchemes: ["lpg-subsidy", "pmay", "ayushman-bharat"] },
];

exports.evaluate = async (req, res) => {
    try {
        const profiles = req.body.profiles || defaultTestProfiles;
        const evaluationResults = [];
        let totalCorrect = 0, totalExpected = 0;

        for (const testProfile of profiles) {
            try {
                const result = await analyzeEligibility(testProfile.profile);
                const matchedSchemeIds = result.recommendations.map((r) => r.schemeId);
                const expectedSet = new Set(testProfile.expectedSchemes);
                const matchedExpected = matchedSchemeIds.filter((id) => expectedSet.has(id));

                const precision = matchedSchemeIds.length > 0 ? matchedExpected.length / matchedSchemeIds.length : 0;
                const recall = testProfile.expectedSchemes.length > 0 ? matchedExpected.length / testProfile.expectedSchemes.length : 0;

                totalCorrect += matchedExpected.length;
                totalExpected += testProfile.expectedSchemes.length;

                evaluationResults.push({
                    profileName: testProfile.name, profile: testProfile.profile, expectedSchemes: testProfile.expectedSchemes, matchedSchemes: matchedSchemeIds, recommendations: result.recommendations,
                    metrics: { precision: Math.round(precision * 100) / 100, recall: Math.round(recall * 100) / 100, f1Score: precision + recall > 0 ? Math.round(((2 * precision * recall) / (precision + recall)) * 100) / 100 : 0 },
                    avgConfidence: result.recommendations.length > 0 ? Math.round((result.recommendations.reduce((sum, r) => sum + r.confidenceScore, 0) / result.recommendations.length) * 100) / 100 : 0,
                });
            } catch (error) {
                evaluationResults.push({ profileName: testProfile.name, error: "Analysis failed for this profile", profile: testProfile.profile });
            }
        }

        const overallPrecision = totalExpected > 0 ? Math.round((totalCorrect / totalExpected) * 100) / 100 : 0;
        return res.json({
            results: evaluationResults,
            overallMetrics: { totalProfiles: profiles.length, overallRecall: overallPrecision, averageConfidence: evaluationResults.filter((r) => "avgConfidence" in r).reduce((sum, r) => sum + (r.avgConfidence || 0), 0) / evaluationResults.length },
        });
    } catch (error) {
        console.error("Evaluation API error:", error);
        return res.status(500).json({ error: "Evaluation failed. Please try again." });
    }
};
