"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Settings,
    Play,
    Loader2,
    CheckCircle2,
    AlertTriangle,
    BarChart3,
    Users,
    Target,
} from "lucide-react";

const testProfiles = [
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
            description: "I am pursuing my B.A. degree and need financial support.",
        },
    },
    {
        name: "Senior Citizen in Maharashtra",
        profile: {
            income: 90000,
            state: "Maharashtra",
            age: 68,
            gender: "Male",
            familySize: 2,
            description: "I am retired and need pension and health support.",
        },
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
            description: "We are a BPL family needing gas connection, housing and health insurance.",
        },
    },
];

export default function AdminPage() {
    const [isRunning, setIsRunning] = useState(false);
    const [results, setResults] = useState(null);
    const [overallMetrics, setOverallMetrics] = useState(null);
    const [progress, setProgress] = useState(0);

    const runEvaluation = async () => {
        setIsRunning(true);
        setResults(null);
        setOverallMetrics(null);
        setProgress(0);

        const progressInterval = setInterval(() => {
            setProgress((prev) => Math.min(prev + 8, 90));
        }, 500);

        try {
            const res = await fetch("/api/admin/evaluate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });

            const data = await res.json();
            clearInterval(progressInterval);
            setProgress(100);

            if (data.results) {
                setResults(data.results);
                setOverallMetrics(data.overallMetrics);
            }
        } catch {
            clearInterval(progressInterval);
            setProgress(0);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-950">
            <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Settings className="h-5 w-5 text-blue-600" />
                            <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
                        </div>
                        <p className="text-slate-600">
                            Test and evaluate the AI recommendation engine with predefined profiles.
                        </p>
                    </div>
                    <Button
                        onClick={runEvaluation}
                        disabled={isRunning}
                        className="bg-blue-700 hover:bg-blue-800 gap-2 shadow-md"
                    >
                        {isRunning ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Running...
                            </>
                        ) : (
                            <>
                                <Play className="h-4 w-4" />
                                Run Evaluation
                            </>
                        )}
                    </Button>
                </div>

                {/* Progress */}
                {isRunning && (
                    <Card className="mb-6 border-blue-200 bg-blue-50/50">
                        <CardContent className="pt-5 pb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-blue-800">
                                    Running evaluation...
                                </span>
                                <span className="text-sm text-blue-600">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2" />
                        </CardContent>
                    </Card>
                )}

                {/* Test Profiles */}
                <Card className="mb-6 border-slate-200 shadow-sm">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Users className="h-5 w-5 text-slate-500" />
                            Test Profiles
                        </CardTitle>
                        <CardDescription>
                            These predefined profiles simulate different citizen scenarios.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {testProfiles.map((profile, i) => (
                                <div
                                    key={i}
                                    className="rounded-lg border border-slate-200 p-3 bg-white hover:border-blue-200 hover:shadow-sm transition-all"
                                >
                                    <p className="font-medium text-sm text-slate-900 mb-1.5">
                                        {profile.name}
                                    </p>
                                    <div className="space-y-0.5 text-xs text-slate-500">
                                        {profile.profile.income && (
                                            <p>
                                                Income: ₹{profile.profile.income.toLocaleString("en-IN")}
                                            </p>
                                        )}
                                        {profile.profile.state && <p>State: {profile.profile.state}</p>}
                                        {profile.profile.age && <p>Age: {profile.profile.age}</p>}
                                        {profile.profile.occupation && (
                                            <p>Occupation: {profile.profile.occupation}</p>
                                        )}
                                        {profile.profile.category && (
                                            <p>Category: {profile.profile.category}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Overall Metrics */}
                {overallMetrics && (
                    <div className="grid sm:grid-cols-3 gap-4 mb-6">
                        <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
                            <CardContent className="pt-5 pb-4 text-center">
                                <Target className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                                <p className="text-xs font-medium text-blue-700 uppercase tracking-wider">
                                    Total Profiles
                                </p>
                                <p className="text-3xl font-bold text-blue-900 mt-1">
                                    {overallMetrics.totalProfiles}
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-white">
                            <CardContent className="pt-5 pb-4 text-center">
                                <BarChart3 className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                                <p className="text-xs font-medium text-emerald-700 uppercase tracking-wider">
                                    Overall Recall
                                </p>
                                <p className="text-3xl font-bold text-emerald-900 mt-1">
                                    {Math.round(overallMetrics.overallRecall * 100)}%
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-violet-200 bg-gradient-to-br from-violet-50 to-white">
                            <CardContent className="pt-5 pb-4 text-center">
                                <CheckCircle2 className="h-6 w-6 text-violet-600 mx-auto mb-2" />
                                <p className="text-xs font-medium text-violet-700 uppercase tracking-wider">
                                    Avg Confidence
                                </p>
                                <p className="text-3xl font-bold text-violet-900 mt-1">
                                    {Math.round(overallMetrics.averageConfidence * 100)}%
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                )}

                {/* Results Table */}
                {results && (
                    <Card className="border-slate-200 shadow-sm">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <BarChart3 className="h-5 w-5 text-slate-500" />
                                Evaluation Results
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-lg border overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-slate-50">
                                            <TableHead className="font-semibold">Profile</TableHead>
                                            <TableHead className="font-semibold">Matched Schemes</TableHead>
                                            <TableHead className="font-semibold">Precision</TableHead>
                                            <TableHead className="font-semibold">Recall</TableHead>
                                            <TableHead className="font-semibold">F1 Score</TableHead>
                                            <TableHead className="font-semibold">Confidence</TableHead>
                                            <TableHead className="font-semibold">Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {results.map((result, i) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium text-sm">
                                                    {result.profileName}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-wrap gap-1">
                                                        {result.matchedSchemes?.map((id, j) => (
                                                            <Badge
                                                                key={j}
                                                                variant="secondary"
                                                                className="text-[10px] bg-blue-50 text-blue-700"
                                                            >
                                                                {id}
                                                            </Badge>
                                                        )) || (
                                                                <span className="text-xs text-slate-400">-</span>
                                                            )}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm tabular-nums">
                                                    {result.metrics
                                                        ? `${Math.round(result.metrics.precision * 100)}%`
                                                        : "-"}
                                                </TableCell>
                                                <TableCell className="text-sm tabular-nums">
                                                    {result.metrics
                                                        ? `${Math.round(result.metrics.recall * 100)}%`
                                                        : "-"}
                                                </TableCell>
                                                <TableCell className="text-sm tabular-nums">
                                                    {result.metrics
                                                        ? `${Math.round(result.metrics.f1Score * 100)}%`
                                                        : "-"}
                                                </TableCell>
                                                <TableCell className="text-sm tabular-nums">
                                                    {result.avgConfidence
                                                        ? `${Math.round(result.avgConfidence * 100)}%`
                                                        : "-"}
                                                </TableCell>
                                                <TableCell>
                                                    {result.error ? (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-red-600 border-red-200 bg-red-50 text-[10px]"
                                                        >
                                                            <AlertTriangle className="h-3 w-3 mr-1" />
                                                            Error
                                                        </Badge>
                                                    ) : (
                                                        <Badge
                                                            variant="outline"
                                                            className="text-emerald-600 border-emerald-200 bg-emerald-50 text-[10px]"
                                                        >
                                                            <CheckCircle2 className="h-3 w-3 mr-1" />
                                                            Done
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
