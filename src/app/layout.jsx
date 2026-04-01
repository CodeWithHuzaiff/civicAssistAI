import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "CivicAssist AI — Government Benefits Navigator",
  description:
    "AI-powered multilingual navigator to help Indian citizens discover government schemes and benefits they are eligible for.",
  keywords: [
    "government schemes",
    "benefits navigator",
    "Indian government",
    "eligibility check",
    "AI powered",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  );
}
