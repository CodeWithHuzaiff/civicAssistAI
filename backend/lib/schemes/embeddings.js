const { schemes } = require("./schemes-data");

// Pre-computed semantic descriptors for each scheme (used for keyword-based matching)
const schemeKeywords = {
    "pm-kisan": [
        "farmer", "agriculture", "farming", "crop", "rural", "land", "kisan",
        "income support", "small farmer", "marginal farmer", "cultivation",
    ],
    "ayushman-bharat": [
        "health", "hospital", "medical", "insurance", "treatment", "surgery",
        "illness", "disease", "doctor", "healthcare", "patient", "sick",
    ],
    "pmay": [
        "house", "housing", "home", "construction", "dwelling", "shelter",
        "apartment", "flat", "loan", "property", "rent", "accommodation",
    ],
    "mudra-loan": [
        "business", "loan", "entrepreneur", "startup", "shop", "vendor",
        "self-employed", "trade", "micro enterprise", "small business", "capital",
    ],
    "scholarship-sc-st": [
        "student", "education", "scholarship", "sc", "st", "scheduled caste",
        "scheduled tribe", "college", "university", "study", "tuition", "school",
    ],
    "lpg-subsidy": [
        "lpg", "gas", "cooking", "cylinder", "fuel", "kitchen", "women",
        "household", "bpl", "below poverty", "ujjwala", "stove",
    ],
    "msme-credit": [
        "msme", "enterprise", "credit", "manufacturing", "industry", "factory",
        "small business", "medium business", "collateral", "guarantee", "udyam",
    ],
    "skill-india": [
        "skill", "training", "job", "employment", "vocational", "certification",
        "placement", "career", "course", "youth", "apprentice", "workshop",
    ],
    "state-scholarship-obc": [
        "obc", "backward class", "scholarship", "student", "education",
        "state", "college", "university", "tuition", "higher education",
    ],
    "senior-citizen-pension": [
        "senior", "old age", "pension", "elderly", "retired", "retirement",
        "aged", "60 years", "old", "social security", "monthly pension",
    ],
};

/**
 * Simple TF-IDF-like similarity between a query and a keyword set.
 */
function computeSimilarity(query, keywords) {
    const queryTokens = query.toLowerCase().split(/\s+/);
    let matchCount = 0;
    let totalWeight = 0;

    for (const keyword of keywords) {
        const keyTokens = keyword.toLowerCase().split(/\s+/);
        for (const kt of keyTokens) {
            totalWeight += 1;
            for (const qt of queryTokens) {
                if (qt.includes(kt) || kt.includes(qt)) {
                    matchCount += 1;
                    break;
                }
            }
        }
    }

    return totalWeight > 0 ? matchCount / totalWeight : 0;
}

/**
 * Search schemes using keyword-based semantic similarity.
 */
function searchSchemes(query, topK = 5) {
    const results = schemes.map((scheme) => ({
        scheme,
        score: computeSimilarity(
            query + " " + scheme.description,
            schemeKeywords[scheme.id] || []
        ),
    }));

    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
}

/**
 * Cosine similarity between two vectors.
 */
function cosineSimilarity(a, b) {
    if (a.length !== b.length) return 0;
    let dotProduct = 0;
    let normA = 0;
    let normB = 0;
    for (let i = 0; i < a.length; i++) {
        dotProduct += a[i] * b[i];
        normA += a[i] * a[i];
        normB += b[i] * b[i];
    }
    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Apply rule-based hard constraint filtering.
 */
function filterByEligibility(schemesInput, userProfile) {
    return schemesInput.filter((scheme) => {
        const e = scheme.eligibility;

        // Income check
        if (userProfile.income && e.maxIncome && userProfile.income > e.maxIncome) {
            return false;
        }

        // Age check
        if (userProfile.age) {
            if (e.minAge && userProfile.age < e.minAge) return false;
            if (e.maxAge && userProfile.age > e.maxAge) return false;
        }

        // Gender check
        if (userProfile.gender && e.genders && e.genders.length > 0) {
            if (
                !e.genders
                    .map((g) => g.toLowerCase())
                    .includes(userProfile.gender.toLowerCase())
            ) {
                return false;
            }
        }

        // Category check
        if (userProfile.category && e.categories && e.categories.length > 0) {
            if (
                !e.categories
                    .map((c) => c.toLowerCase())
                    .includes(userProfile.category.toLowerCase())
            ) {
                return false;
            }
        }

        // State check
        if (userProfile.state && e.states !== "all" && e.states) {
            if (
                !e.states
                    .map((s) => s.toLowerCase())
                    .includes(userProfile.state.toLowerCase())
            ) {
                return false;
            }
        }

        // Family size check
        if (
            userProfile.familySize &&
            e.maxFamilySize &&
            userProfile.familySize > e.maxFamilySize
        ) {
            return false;
        }

        return true;
    });
}

module.exports = { searchSchemes, cosineSimilarity, filterByEligibility };
