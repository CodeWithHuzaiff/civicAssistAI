"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Upload, FileText, AlertCircle, Loader2, ArrowRight } from "lucide-react";
import VoiceInputButton from "@/components/VoiceInputButton";
import { INDIAN_STATES } from "@/lib/schemes/schemes-data";

export default function EligibilityPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadResult, setUploadResult] = useState(null);

    const [formData, setFormData] = useState({
        income: "",
        state: "",
        occupation: "",
        age: "",
        gender: "",
        category: "",
        familySize: "",
        description: "",
    });

    const updateField = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setError(null);
    };

    const handleVoiceTranscript = useCallback((text) => {
        setFormData((prev) => ({ ...prev, description: text }));
    }, []);

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setUploadResult(null);

        try {
            const fd = new FormData();
            fd.append("file", file);

            const res = await fetch("/api/ocr", { method: "POST", body: fd });
            const data = await res.json();

            if (data.success && data.extractedFields) {
                const fields = data.extractedFields;
                setFormData((prev) => ({
                    ...prev,
                    income: fields.income ? String(fields.income) : prev.income,
                    age: fields.age ? String(fields.age) : prev.age,
                    state: fields.state || prev.state,
                }));
                setUploadResult(
                    `Document processed! Extracted: Income ₹${fields.income?.toLocaleString("en-IN") || "N/A"}, Age ${fields.age || "N/A"}, State ${fields.state || "N/A"}`
                );
            }
        } catch {
            setUploadResult("Failed to process document. Please fill in details manually.");
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.income && !formData.description) {
            setError("Please provide at least your income or describe your situation.");
            return;
        }

        setIsSubmitting(true);

        try {
            const payload = {
                income: formData.income ? Number(formData.income) : undefined,
                state: formData.state || undefined,
                occupation: formData.occupation || undefined,
                age: formData.age ? Number(formData.age) : undefined,
                gender: formData.gender || undefined,
                category: formData.category || undefined,
                familySize: formData.familySize ? Number(formData.familySize) : undefined,
                description: formData.description || undefined,
            };

            const res = await fetch("/api/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || "Analysis failed");
            }

            const result = await res.json();

            // Store results in sessionStorage for the results page
            sessionStorage.setItem("civicassist_results", JSON.stringify(result));
            sessionStorage.setItem("civicassist_profile", JSON.stringify(payload));

            router.push("/results");
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Something went wrong. Please try again."
            );
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-950">
            <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">
                        Check Your Eligibility
                    </h1>
                    <p className="mt-2 text-slate-600">
                        Tell us about yourself and we&apos;ll find government schemes you may qualify for.
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        {/* Document Upload */}
                        <Card className="border-dashed border-2 border-blue-200 bg-blue-50/30">
                            <CardContent className="pt-5 pb-4 px-5">
                                <div className="flex items-start gap-4">
                                    <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                                        <Upload className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-slate-900 text-sm">
                                            Quick Fill with Document Upload
                                        </h3>
                                        <p className="text-xs text-slate-600 mt-0.5 mb-3">
                                            Upload your Aadhaar, income certificate, or any ID
                                            document to auto-fill fields (mock OCR).
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <label className="cursor-pointer">
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*,.pdf"
                                                    onChange={handleFileUpload}
                                                    disabled={isUploading}
                                                />
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors">
                                                    {isUploading ? (
                                                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                    ) : (
                                                        <FileText className="h-3.5 w-3.5" />
                                                    )}
                                                    {isUploading ? "Processing..." : "Upload Document"}
                                                </span>
                                            </label>
                                            {uploadResult && (
                                                <span className="text-xs text-emerald-700">
                                                    {uploadResult}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Main Form */}
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">Personal Information</CardTitle>
                                <CardDescription>
                                    Provide your details to get accurate scheme recommendations.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                {/* Row 1: Income + State */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="income" className="text-sm font-medium">
                                            Annual Income (₹) <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            id="income"
                                            type="number"
                                            placeholder="e.g., 150000"
                                            value={formData.income}
                                            onChange={(e) => updateField("income", e.target.value)}
                                            className="border-slate-300 focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="state" className="text-sm font-medium">
                                            State
                                        </Label>
                                        <Select
                                            value={formData.state}
                                            onValueChange={(val) => updateField("state", val)}
                                        >
                                            <SelectTrigger className="border-slate-300 focus:border-blue-500">
                                                <SelectValue placeholder="Select your state" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {INDIAN_STATES.map((state) => (
                                                    <SelectItem key={state} value={state}>
                                                        {state}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Row 2: Occupation + Age */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="occupation" className="text-sm font-medium">
                                            Occupation
                                        </Label>
                                        <Select
                                            value={formData.occupation}
                                            onValueChange={(val) => updateField("occupation", val)}
                                        >
                                            <SelectTrigger className="border-slate-300">
                                                <SelectValue placeholder="Select occupation" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {[
                                                    "Farmer",
                                                    "Student",
                                                    "Self-Employed",
                                                    "Business",
                                                    "Laborer",
                                                    "Government Employee",
                                                    "Private Employee",
                                                    "Retired",
                                                    "Homemaker",
                                                    "Unemployed",
                                                    "Other",
                                                ].map((occ) => (
                                                    <SelectItem
                                                        key={occ}
                                                        value={occ.toLowerCase().replace(" ", "-")}
                                                    >
                                                        {occ}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="age" className="text-sm font-medium">
                                            Age
                                        </Label>
                                        <Input
                                            id="age"
                                            type="number"
                                            placeholder="e.g., 35"
                                            min={1}
                                            max={120}
                                            value={formData.age}
                                            onChange={(e) => updateField("age", e.target.value)}
                                            className="border-slate-300"
                                        />
                                    </div>
                                </div>

                                {/* Row 3: Gender + Category (optional) */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="gender" className="text-sm font-medium">
                                            Gender{" "}
                                            <span className="text-slate-400 font-normal">
                                                (optional)
                                            </span>
                                        </Label>
                                        <Select
                                            value={formData.gender}
                                            onValueChange={(val) => updateField("gender", val)}
                                        >
                                            <SelectTrigger className="border-slate-300">
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Male">Male</SelectItem>
                                                <SelectItem value="Female">Female</SelectItem>
                                                <SelectItem value="Other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="category" className="text-sm font-medium">
                                            Category{" "}
                                            <span className="text-slate-400 font-normal">
                                                (optional)
                                            </span>
                                        </Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(val) => updateField("category", val)}
                                        >
                                            <SelectTrigger className="border-slate-300">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="General">General</SelectItem>
                                                <SelectItem value="OBC">OBC</SelectItem>
                                                <SelectItem value="SC">SC</SelectItem>
                                                <SelectItem value="ST">ST</SelectItem>
                                                <SelectItem value="EWS">EWS</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                {/* Row 4: Family Size */}
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="familySize" className="text-sm font-medium">
                                            Family Size
                                        </Label>
                                        <Input
                                            id="familySize"
                                            type="number"
                                            placeholder="e.g., 4"
                                            min={1}
                                            max={20}
                                            value={formData.familySize}
                                            onChange={(e) => updateField("familySize", e.target.value)}
                                            className="border-slate-300"
                                        />
                                    </div>
                                </div>

                                <Separator className="my-2" />

                                {/* Description */}
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="description" className="text-sm font-medium">
                                            Describe Your Situation
                                        </Label>
                                        <VoiceInputButton onTranscript={handleVoiceTranscript} />
                                    </div>
                                    <Textarea
                                        id="description"
                                        placeholder="Tell us more about your circumstances. For example: I am a small farmer from UP with 2 acres of land. My family has 5 members and we need financial support..."
                                        rows={4}
                                        value={formData.description}
                                        onChange={(e) => updateField("description", e.target.value)}
                                        className="border-slate-300 resize-none"
                                    />
                                    <p className="text-xs text-slate-500">
                                        The more details you provide, the better our recommendations
                                        will be.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Error */}
                        {error && (
                            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting}
                            className="w-full bg-blue-700 hover:bg-blue-800 py-6 text-base font-semibold shadow-lg shadow-blue-200/60 hover:shadow-blue-300/60 transition-all"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                    Analyzing Eligibility...
                                </>
                            ) : (
                                <>
                                    Find My Benefits
                                    <ArrowRight className="h-5 w-5 ml-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
