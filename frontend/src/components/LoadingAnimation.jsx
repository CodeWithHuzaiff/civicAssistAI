"use client";

import { Card } from "@/components/ui/card";

export default function LoadingAnimation() {
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header skeleton */}
            <div className="text-center space-y-3">
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="h-16 w-16 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-8 w-8 rounded-full bg-blue-100 animate-pulse" />
                        </div>
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-800">
                    Analyzing Your Eligibility...
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                    Our AI is reviewing government schemes and matching them to your
                    profile. This may take a moment.
                </p>
            </div>

            {/* Progress steps */}
            <div className="max-w-sm mx-auto space-y-3">
                {["Reviewing your profile", "Searching government schemes", "Matching eligibility criteria", "Generating personalized recommendations"].map(
                    (step, i) => (
                        <div
                            key={i}
                            className="flex items-center gap-3 text-sm"
                            style={{ animationDelay: `${i * 800}ms` }}
                        >
                            <div
                                className="h-2 w-2 rounded-full bg-blue-500 animate-pulse"
                                style={{ animationDelay: `${i * 400}ms` }}
                            />
                            <span className="text-slate-600">{step}</span>
                        </div>
                    )
                )}
            </div>

            {/* Skeleton cards */}
            <div className="space-y-4 mt-8">
                {[1, 2, 3].map((i) => (
                    <Card key={i} className="p-6 border-slate-200">
                        <div className="space-y-3 animate-pulse">
                            <div className="flex justify-between items-start">
                                <div className="space-y-2 flex-1">
                                    <div className="h-5 w-2/3 bg-slate-200 rounded" />
                                    <div className="h-3 w-full bg-slate-100 rounded" />
                                    <div className="h-3 w-4/5 bg-slate-100 rounded" />
                                </div>
                                <div className="h-6 w-24 bg-slate-200 rounded-full" />
                            </div>
                            <div className="h-16 w-full bg-slate-50 rounded-lg" />
                            <div className="flex gap-2">
                                <div className="h-6 w-20 bg-slate-100 rounded" />
                                <div className="h-6 w-24 bg-slate-100 rounded" />
                                <div className="h-6 w-16 bg-slate-100 rounded" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
