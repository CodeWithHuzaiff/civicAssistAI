"use client";

import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export default function LanguageToggle({
    currentLanguage,
    onToggle,
    isLoading,
}) {
    return (
        <div className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-slate-500" />
            <div className="flex rounded-lg border border-slate-200 overflow-hidden">
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={isLoading}
                    onClick={() => onToggle("en")}
                    className={`rounded-none px-3 py-1 text-xs font-medium h-8 ${currentLanguage === "en"
                        ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                        : "text-slate-600 hover:bg-blue-50"
                        }`}
                >
                    English
                </Button>
                <Button
                    variant="ghost"
                    size="sm"
                    disabled={isLoading}
                    onClick={() => onToggle("hi")}
                    className={`rounded-none px-3 py-1 text-xs font-medium h-8 ${currentLanguage === "hi"
                        ? "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                        : "text-slate-600 hover:bg-blue-50"
                        }`}
                >
                    हिन्दी
                </Button>
            </div>
            {isLoading && (
                <span className="text-xs text-slate-500 animate-pulse">Translating...</span>
            )}
        </div>
    );
}
