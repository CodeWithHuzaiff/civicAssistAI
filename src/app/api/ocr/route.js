import { NextRequest, NextResponse } from "next/server";

// Mock OCR endpoint - in production, use Tesseract.js or a cloud OCR service
export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") | null;

        if (!file) {
            return NextResponse.json(
                { error: "No file uploaded" },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: "Invalid file type. Please upload an image or PDF." },
                { status: 400 }
            );
        }

        // Mock OCR extraction - returns sample extracted fields
        // In a real implementation, this would use an OCR engine
        const mockExtractedData = {
            success: true,
            extractedFields: {
                name: "Extracted Name",
                income: 180000,
                idNumber: "XXXX-XXXX-1234",
                age: 35,
                state: "Maharashtra",
            },
            rawText:
                "This is a mock OCR result. In production, this would contain the actual extracted text from the uploaded document.",
            confidence: 0.87,
        };

        // Simulate processing delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return NextResponse.json(mockExtractedData);
    } catch (error) {
        console.error("OCR API error:", error);
        return NextResponse.json(
            { error: "OCR processing failed. Please try again." },
            { status: 500 }
        );
    }
}
