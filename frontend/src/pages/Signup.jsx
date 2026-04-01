import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Loader2, AlertCircle, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export default function SignupPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
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
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 lg:px-20 xl:px-24 py-12">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mx-auto w-full max-w-sm lg:w-[400px]"
                >
                    <div className="mb-8">
                        <Link to="/" className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 shadow-md shadow-violet-500/20 mb-6 hover:scale-105 transition-transform">
                            <Shield className="h-6 w-6 text-white" />
                        </Link>
                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                            Create an account
                        </h2>
                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                            Already have an account?{" "}
                            <Link to="/login" className="font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-500 transition-colors">
                                Sign in here
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
                                <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Full Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Jane Doe"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-violet-500"
                                />
                            </div>

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
                                    className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-violet-500"
                                />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">Password</Label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-violet-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300">Confirm</Label>
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="••••••••"
                                        required
                                        minLength={6}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="h-12 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl focus-visible:ring-violet-500"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-base font-semibold shadow-lg shadow-violet-600/20 transition-all hover:shadow-violet-600/40 mt-4"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        Create Account <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </motion.div>
            </div>

            {/* Right Column: Graphic */}
            <div className="relative hidden w-0 flex-1 lg:block overflow-hidden bg-slate-950">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-br from-violet-900/90 via-slate-900/95 to-slate-950/95" />
                
                {/* Abstract Glowing Orbs */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-violet-600/20 blur-[100px] rounded-full animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-center p-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="max-w-xl text-left"
                    >
                        <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                            <Star className="h-6 w-6 text-violet-400" />
                        </div>
                        <h2 className="text-4xl font-extrabold text-white tracking-tight mb-6 leading-tight">
                            Join thousands of citizens empowered by technology.
                        </h2>
                        
                        <div className="space-y-6 mt-10">
                            {[
                                "Automatically filter thousands of government schemes.",
                                "Instantly know your exact eligibility rating in seconds.",
                                "Chat with our Gemini-powered AI in English or Hindi.",
                            ].map((feature, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.5 + (i * 0.1) }}
                                    className="flex items-center gap-4 text-violet-100/80 font-medium"
                                >
                                    <div className="h-2 w-2 rounded-full bg-violet-400" />
                                    {feature}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
