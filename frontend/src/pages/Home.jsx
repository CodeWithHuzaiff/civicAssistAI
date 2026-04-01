import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    Shield,
    ArrowRight,
    Sparkles,
    Languages,
    Lock,
    Search,
    FileCheck,
    Users,
    Network
} from "lucide-react";

export default function HomePage() {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-background">
             {/* Dynamic Mesh Gradient Background */}
             <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen dark:opacity-20 dark:mix-blend-lighten transition-opacity duration-700">
                <div className="absolute -top-48 -left-48 h-[600px] w-[600px] rounded-full bg-blue-500/30 blur-[120px] animate-pulse" style={{ animationDuration: "8s" }} />
                <div className="absolute top-24 -right-24 h-[500px] w-[500px] rounded-full bg-emerald-500/20 blur-[100px] animate-pulse" style={{ animationDuration: "12s", animationDelay: "2s" }} />
                <div className="absolute -bottom-48 left-1/3 h-[700px] w-[700px] rounded-full bg-indigo-500/20 blur-[130px] animate-pulse" style={{ animationDuration: "10s", animationDelay: "4s" }} />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pb-40">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-2 rounded-full border border-blue-200/50 bg-blue-50/50 dark:border-blue-800/50 dark:bg-blue-900/20 px-5 py-1.5 mb-8 shadow-sm backdrop-blur-md"
                    >
                        <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-sm font-semibold text-blue-800 dark:text-blue-300">
                            Revolutionizing GovTech with AI
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl"
                    >
                        Unlock Government <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 dark:from-blue-400 dark:via-indigo-400 dark:to-violet-400">
                            Benefits in Seconds
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mx-auto mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-slate-600 dark:text-slate-300"
                    >
                        CivicAssist AI acts as your personal navigator. Automatically cross-reference your profile with active state and central schemes to claim what's rightfully yours.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link to="/eligibility">
                            <Button
                                size="lg"
                                className="relative overflow-hidden group bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-7 text-lg font-semibold shadow-lg shadow-blue-600/30 transition-all hover:scale-105 hover:shadow-blue-600/50"
                            >
                                <span className="relative z-10 flex items-center">
                                    Start Eligibility Check
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 h-full w-full pointer-events-none">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-in-out" />
                                </div>
                            </Button>
                        </Link>
                        <Link to="/admin">
                            <Button
                                variant="outline"
                                size="lg"
                                className="rounded-full border-slate-300 dark:border-slate-700 px-8 py-7 text-lg font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all hover:scale-105"
                            >
                                Admin Dashboard
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="mt-20 pt-10 border-t border-slate-200/50 dark:border-slate-800/50 grid grid-cols-3 gap-8 max-w-2xl mx-auto"
                    >
                        {[
                            { value: "10+", label: "Active Schemes" },
                            { value: "RAG", label: "Powered Engine" },
                            { value: "< 5s", label: "Wait Time" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center space-y-1">
                                <h4 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                                    {stat.value}
                                </h4>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Bento Grid Features */}
            <section className="relative z-10 py-24 bg-slate-50/50 dark:bg-slate-900/20 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                            Next-Generation Civic Engagement
                        </h2>
                        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                            Our engine integrates machine learning directly into standard scheme datasets.
                        </p>
                    </div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {/* Large Feature 1 */}
                        <motion.div variants={itemVariants} className="md:col-span-2 group">
                            <div className="h-full rounded-[2rem] border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl p-8 hover:shadow-xl transition-all duration-500 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Network className="h-40 w-40 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="h-14 w-14 rounded-2xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-12">
                                        <Search className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Semantic Matching</h3>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                                            Traditional eligibility checkers use rigid dropdowns. We use Gemini 2.0 to semantically match your conversational profile against hundreds of conditions simultaneously.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Small Feature 1 */}
                        <motion.div variants={itemVariants} className="group">
                            <div className="h-full rounded-[2rem] border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl p-8 hover:shadow-xl transition-all duration-500">
                                <div className="h-14 w-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-6">
                                    <Languages className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Multilingual Sync</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Receive results in Hindi or English, powered by AI translation ensuring no legal context is lost.
                                </p>
                            </div>
                        </motion.div>

                        {/* Small Feature 2 */}
                        <motion.div variants={itemVariants} className="group">
                            <div className="h-full rounded-[2rem] border border-slate-200/60 dark:border-slate-800/60 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl p-8 hover:shadow-xl transition-all duration-500">
                                <div className="h-14 w-14 rounded-2xl bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center mb-6">
                                    <Lock className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Absolute Privacy</h3>
                                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                    Your data remains strictly in your session cache. No profiles are built or sold without consent.
                                </p>
                            </div>
                        </motion.div>

                         {/* Large Feature 2 */}
                         <motion.div variants={itemVariants} className="md:col-span-2 group">
                            <div className="h-full rounded-[2rem] border border-slate-200/60 dark:border-slate-800/60 bg-gradient-to-r from-blue-600 to-indigo-700 p-8 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 overflow-hidden relative">
                                <div className="absolute -bottom-10 -right-10 opacity-30">
                                    <Shield className="h-56 w-56 text-white" />
                                </div>
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-12 border border-white/20">
                                        <FileCheck className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-3">Instant Action Plans</h3>
                                        <p className="text-blue-100 leading-relaxed max-w-md">
                                            Don't just discover schemes—get actionable, step-by-step application flows and exact required document checklists generated on the fly.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="relative z-10 py-32">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl mb-6">
                            Start claiming what's yours
                        </h2>
                        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto">
                            Join thousands using CivicAssist to bypass bureaucratic confusion.
                        </p>
                        <Link to="/eligibility">
                            <Button
                                size="lg"
                                className="rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 px-10 py-8 text-xl font-bold shadow-2xl transition-all hover:scale-105"
                            >
                                Launch Navigator
                                <ArrowRight className="ml-3 h-6 w-6" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 border-t border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-slate-950/50 backdrop-blur-xl py-12">
                <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <span className="font-bold text-slate-900 dark:text-white tracking-tight">CivicAssist AI</span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">
                        © 2026 MERN Stack Migration Edition. Not official government property.
                    </p>
                </div>
            </footer>
        </div>
    );
}
