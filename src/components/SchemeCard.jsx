"use client";

import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    CheckCircle2,
    FileText,
    ChevronRight,
    TrendingUp,
} from "lucide-react";

export default function SchemeCard({
    schemeName,
    description,
    benefitAmount,
    whyQualifies,
    requiredDocuments,
    nextSteps,
    confidenceScore,
    index,
}) {
    const confidenceColor =
        confidenceScore >= 0.8
            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
            : confidenceScore >= 0.5
                ? "bg-amber-100 text-amber-800 border-amber-200"
                : "bg-slate-100 text-slate-700 border-slate-200";

    const confidenceLabel =
        confidenceScore >= 0.8
            ? "High Match"
            : confidenceScore >= 0.5
                ? "Moderate Match"
                : "Possible Match";

    return (
        <Card
            className="group overflow-hidden border-slate-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-blue-800 transition-colors">
                            {schemeName}
                        </CardTitle>
                        <CardDescription className="mt-1.5 text-sm leading-relaxed text-slate-600">
                            {description}
                        </CardDescription>
                    </div>
                    <Badge
                        variant="outline"
                        className={`shrink-0 ${confidenceColor} text-xs font-medium px-2.5 py-1`}
                    >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {confidenceLabel} ({Math.round(confidenceScore * 100)}%)
                    </Badge>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Benefits */}
                <div className="rounded-lg bg-gradient-to-r from-emerald-50 to-green-50 p-3.5 border border-emerald-100">
                    <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
                        Benefits
                    </p>
                    <p className="text-sm font-medium text-emerald-900">
                        {benefitAmount}
                    </p>
                </div>

                {/* Why You Qualify */}
                <div className="rounded-lg bg-blue-50 p-3.5 border border-blue-100">
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider mb-1">
                        Why You Qualify
                    </p>
                    <p className="text-sm text-blue-900 leading-relaxed">
                        {whyQualifies}
                    </p>
                </div>

                {/* Required Documents */}
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        Required Documents
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                        {requiredDocuments.map((doc, i) => (
                            <Badge
                                key={i}
                                variant="secondary"
                                className="text-xs bg-slate-100 text-slate-700 hover:bg-slate-200"
                            >
                                {doc}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Next Steps */}
                <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Next Steps
                    </p>
                    <ol className="space-y-1.5">
                        {nextSteps.map((step, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                                <ChevronRight className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                                <span>{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </CardContent>
        </Card>
    );
}
