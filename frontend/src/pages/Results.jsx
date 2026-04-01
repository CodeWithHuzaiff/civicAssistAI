import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, Shield } from "lucide-react";
import SchemeCard from "@/components/SchemeCard";
import LoadingAnimation from "@/components/LoadingAnimation";
import LanguageToggle from "@/components/LanguageToggle";
import { schemes } from "@/lib/schemes/schemes-data";

// Build Hindi translations locally from the schemes data
function buildLocalHindiTranslation(results) {
    const hindiRecommendations = results.recommendations.map((rec) => {
        const scheme = schemes.find((s) => s.id === rec.schemeId);
        if (scheme) {
            return {
                ...rec,
                schemeName: scheme.nameHi,
                description: scheme.descriptionHi,
                benefitAmount: scheme.benefitsHi,
                whyQualifies: `आपकी प्रोफ़ाइल के आधार पर, आप इस योजना के लिए पात्र हो सकते हैं।`,
                requiredDocuments: scheme.requiredDocuments.map((doc) => {
                    const docMap = {
                        "Aadhaar Card": "आधार कार्ड",
                        "PAN Card": "पैन कार्ड",
                        "Ration Card": "राशन कार्ड",
                        "BPL Ration Card": "बीपीएल राशन कार्ड",
                        "Income certificate": "आय प्रमाण पत्र",
                        "Bank account details": "बैंक खाता विवरण",
                        "Passport-size photographs": "पासपोर्ट साइज फोटो",
                        "Land ownership documents": "भूमि स्वामित्व दस्तावेज",
                        "State domicile certificate": "राज्य अधिवास प्रमाण पत्र",
                        "Family details": "परिवार विवरण",
                        "Property documents": "संपत्ति दस्तावेज",
                        "Bank statements": "बैंक स्टेटमेंट",
                        "Proof of not owning a pucca house": "पक्का मकान न होने का प्रमाण",
                        "Business plan or proposal": "व्यवसाय योजना या प्रस्ताव",
                        "Identity & address proof": "पहचान और पता प्रमाण",
                        "Caste certificate (SC/ST)": "जाति प्रमाण पत्र (अनुसूचित जाति/जनजाति)",
                        "Caste certificate (OBC)": "जाति प्रमाण पत्र (ओबीसी)",
                        "Previous year marksheets": "पिछले वर्ष की मार्कशीट",
                        "Current admission proof": "वर्तमान प्रवेश प्रमाण",
                        "Address proof": "पता प्रमाण",
                        "Educational certificates": "शैक्षिक प्रमाण पत्र",
                        "Domicile certificate": "अधिवास प्रमाण पत्र",
                        "Udyam Registration Certificate": "उद्यम पंजीकरण प्रमाण पत्र",
                        "Business financial statements": "व्यवसाय वित्तीय विवरण",
                        "GST registration (if applicable)": "जीएसटी पंजीकरण (यदि लागू हो)",
                        "Bank statements (last 6 months)": "बैंक स्टेटमेंट (पिछले 6 महीने)",
                        "Age proof / Birth certificate": "आयु प्रमाण / जन्म प्रमाण पत्र",
                        "BPL Card or Income certificate": "बीपीएल कार्ड या आय प्रमाण पत्र",
                        "Passport-size photograph": "पासपोर्ट साइज फोटो",
                    };
                    return docMap[doc] || doc;
                }),
                nextSteps: scheme.nextSteps.map((step) => {
                    // Simple Hindi translations for common next step phrases
                    return step
                        .replace("Visit", "जाएं")
                        .replace("Apply", "आवेदन करें")
                        .replace("Submit", "जमा करें")
                        .replace("Fill", "भरें")
                        .replace("Register", "पंजीकरण करें")
                        .replace("your", "अपना")
                        .replace("and", "और");
                }),
            };
        }
        return rec;
    });

    return {
        recommendations: hindiRecommendations,
        summary: `आपकी प्रोफ़ाइल के आधार पर ${hindiRecommendations.length} संभावित पात्र योजनाएं मिलीं।`,
    };
}

export default function ResultsPage() {
    const navigate = useNavigate();
    const [results, setResults] = useState(null);
    const [translatedResults, setTranslatedResults] = useState(null);
    const [language, setLanguage] = useState("en");
    const [isTranslating, setIsTranslating] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = sessionStorage.getItem("civicassist_results");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setResults(parsed);
            } catch {
                // Invalid data
            }
        }
        // Short delay to show loading animation
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleLanguageToggle = async (lang) => {
        setLanguage(lang);

        if (lang === "hi" && !translatedResults && results) {
            setIsTranslating(true);
            try {
                // Try API translation first
                const res = await fetch("/api/translate", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        content: results,
                        targetLanguage: "Hindi",
                    }),
                });

                if (res.ok) {
                    const data = await res.json();
                    setTranslatedResults(data);
                } else {
                    // API failed (rate limit etc.) — use local Hindi data
                    const localHindi = buildLocalHindiTranslation(results);
                    setTranslatedResults(localHindi);
                }
            } catch {
                // Network error — use local Hindi data
                const localHindi = buildLocalHindiTranslation(results);
                setTranslatedResults(localHindi);
            } finally {
                setIsTranslating(false);
            }
        }
    };

    const displayResults = language === "hi" && translatedResults ? translatedResults : results;

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-950">
                <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
                    <LoadingAnimation />
                </div>
            </div>
        );
    }

    if (!results || !displayResults) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-950 flex items-center justify-center">
                <div className="text-center px-4">
                    <Shield className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-slate-800 mb-2">
                        No Results Found
                    </h2>
                    <p className="text-slate-600 mb-6">
                        Please fill out the eligibility form first to get personalized
                        recommendations.
                    </p>
                    <Link to="/eligibility">
                        <Button className="bg-blue-700 hover:bg-blue-800">
                            Go to Eligibility Form
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-950">
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-8">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-700 mb-2 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            {language === "hi" ? "फॉर्म पर वापस जाएं" : "Back to Form"}
                        </button>
                        <h1 className="text-3xl font-bold text-slate-900">
                            {language === "hi" ? "आपकी पात्र योजनाएं" : "Your Eligible Schemes"}
                        </h1>
                        <p className="mt-1 text-slate-600">
                            {displayResults.summary ||
                                (language === "hi"
                                    ? `आपकी प्रोफ़ाइल से ${displayResults.recommendations.length} योजनाएं मिलीं।`
                                    : `Found ${displayResults.recommendations.length} scheme${displayResults.recommendations.length !== 1 ? "s" : ""} matching your profile.`)}
                        </p>
                    </div>
                    <LanguageToggle
                        currentLanguage={language}
                        onToggle={handleLanguageToggle}
                        isLoading={isTranslating}
                    />
                </div>

                {/* Results */}
                {displayResults.recommendations.length > 0 ? (
                    <div className="space-y-5">
                        {displayResults.recommendations.map((scheme, index) => (
                            <SchemeCard
                                key={scheme.schemeId || index}
                                schemeName={scheme.schemeName}
                                description={scheme.description}
                                benefitAmount={scheme.benefitAmount}
                                whyQualifies={scheme.whyQualifies}
                                requiredDocuments={scheme.requiredDocuments}
                                nextSteps={scheme.nextSteps}
                                confidenceScore={scheme.confidenceScore}
                                index={index}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <Shield className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-slate-800 mb-2">
                            {language === "hi" ? "कोई मिलान योजना नहीं मिली" : "No Matching Schemes Found"}
                        </h3>
                        <p className="text-slate-600 max-w-md mx-auto mb-6">
                            {language === "hi"
                                ? "आपकी प्रोफ़ाइल के आधार पर, हमें मिलान योजनाएं नहीं मिलीं। अपना विवरण अपडेट करें।"
                                : "Based on your profile, we couldn't find matching schemes. Try updating your details or providing more information."}
                        </p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
                    <Link to="/eligibility">
                        <Button
                            variant="outline"
                            className="border-blue-200 text-blue-700 hover:bg-blue-50 gap-2"
                        >
                            <RotateCcw className="h-4 w-4" />
                            {language === "hi" ? "फिर से शुरू करें" : "Start Over"}
                        </Button>
                    </Link>
                    <Link to="/">
                        <Button variant="ghost" className="text-slate-500">
                            {language === "hi" ? "होम पर वापस जाएं" : "Return Home"}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
