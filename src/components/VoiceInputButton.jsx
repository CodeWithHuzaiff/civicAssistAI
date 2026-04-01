"use client";

import { useState, useCallback } from "react";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VoiceInputButton({ onTranscript }) {
    const [isListening, setIsListening] = useState(false);

    const handleClick = useCallback(() => {
        if (isListening) {
            setIsListening(false);
            return;
        }

        setIsListening(true);

        // Mock voice input - simulates a 3-second listening period
        setTimeout(() => {
            const mockTranscripts = [
                "I am a small farmer from Uttar Pradesh with an annual income of around 1.5 lakh rupees. I have 2 acres of agricultural land and I need financial support for my farming activities.",
                "I am a 22 year old female student from Bihar pursuing my graduation. My family income is below 2 lakh and I belong to Scheduled Caste category. I need a scholarship for my education.",
                "I am a 65 year old retired person from Maharashtra. My monthly pension is very low and I need health insurance and old age pension support.",
                "I am a woman entrepreneur running a small business in Gujarat. I want to get a loan to expand my tailoring shop. My annual income is about 2 lakh rupees.",
            ];
            const randomTranscript =
                mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)];
            onTranscript(randomTranscript);
            setIsListening(false);
        }, 2500);
    }, [isListening, onTranscript]);

    return (
        <Button
            type="button"
            variant={isListening ? "destructive" : "outline"}
            size="sm"
            onClick={handleClick}
            className={`gap-2 transition-all ${isListening
                ? "bg-red-500 hover:bg-red-600 text-white animate-pulse shadow-lg shadow-red-200"
                : "border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                }`}
        >
            {isListening ? (
                <>
                    <MicOff className="h-4 w-4" />
                    <span>Listening...</span>
                    <span className="flex items-center gap-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                </>
            ) : (
                <>
                    <Mic className="h-4 w-4" />
                    <span>Voice Input</span>
                </>
            )}
        </Button>
    );
}
