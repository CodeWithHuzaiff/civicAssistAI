import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Loader2, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function LoginPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Invalid credentials");
            }

            // Save token
            localStorage.setItem("civicassist_token", data.token);
            localStorage.setItem("civicassist_user", JSON.stringify({
                _id: data._id,
                name: data.name,
                email: data.email,
                role: data.role,
            }));

            navigate("/");
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-slate-950">
            {/* Left Column: Form */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto w-full max-w-sm lg:w-96"
                >
                    <div className="mb-8">
                        <Link to="/" className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20 mb-6 hover:scale-105 transition-transform">
                            <Shield className="h-6 w-6 text-white" />
                        </Link>
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Welcome back
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Don't have an account?{" "}
                            <Link to="/signup" className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 transition-colors">
                                Create an account
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <motion.div 
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm border border-red-100 dark:border-red-900/50"
                                >
                                    <AlertCircle className="h-5 w-5 shrink-0" />
                                    <span className="font-medium">{error}</span>
                                </motion.div>
                            )}
                            
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-blue-500"
                                />
                            </div>
                            
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">Password</Label>
                                    <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400">
                                        Forgot password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-blue-500"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-base font-semibold shadow-lg shadow-blue-600/20 transition-all hover:shadow-blue-600/40"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Sign In <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>

            {/* Right Column: Graphic */}
            <div className="relative hidden w-0 flex-1 lg:block overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-blue-700 to-emerald-500" />
                
                {/* Abstract Shapes */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/10 blur-[100px] rounded-full mix-blend-overlay animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-400/20 blur-[100px] rounded-full mix-blend-overlay animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-xl text-center backdrop-blur-sm bg-white/10 border border-white/20 p-12 rounded-[2.5rem] shadow-2xl"
                    >
                        <div className="flex justify-center mb-6">
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-md border border-white/30 text-white text-sm font-semibold tracking-wide shadow-inner">
                                <Sparkles className="h-4 w-4 text-emerald-300" /> Premium Access
                            </span>
                        </div>
                        <h2 className="text-4xl font-extrabold text-white tracking-tight mb-4">
                            Your Personal <br />GovTech Dashboard
                        </h2>
                        <p className="text-lg text-blue-100 font-medium leading-relaxed">
                            Sign in to save your personalized scheme profiles, track application progress, and chat seamlessly with our integrated AI engine.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
