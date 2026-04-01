import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Shield, Menu, X, Settings, Home, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/", icon: Home },
        { name: "Eligibility", path: "/eligibility", icon: CheckCircle },
        { name: "Admin", path: "/admin", icon: Settings },
    ];

    return (
        <motion.nav 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
                scrolled ? "pt-4 px-4" : "pt-6 px-6"
            }`}
        >
            <div className={`mx-auto max-w-5xl rounded-full transition-all duration-300 ${
                scrolled 
                    ? "bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20" 
                    : "bg-transparent border-transparent"
            }`}>
                <div className="flex h-16 items-center justify-between px-4 sm:px-6">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all group-hover:scale-105">
                            <Shield className="h-5 w-5 text-white" />
                        </div>
                        <div className="hidden sm:flex flex-col">
                            <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                                CivicAssist
                            </span>
                        </div>
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50">
                        {navLinks.map((link) => {
                            const isActive = location.pathname === link.path;
                            return (
                                <Link key={link.path} to={link.path}>
                                    <Button 
                                        variant="ghost" 
                                        className={`rounded-full px-5 h-9 text-sm font-medium transition-all ${
                                            isActive 
                                                ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" 
                                                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/50"
                                        }`}
                                    >
                                        <link.icon className="w-4 h-4 mr-2" strokeWidth={isActive ? 2.5 : 2} />
                                        {link.name}
                                    </Button>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block">
                            <ThemeToggle />
                        </div>
                        <Link to="/login" className="hidden md:block">
                            <Button className="rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 shadow-md transition-transform hover:scale-105">
                                Login
                            </Button>
                        </Link>
                        
                        {/* Mobile Menu Toggle */}
                        <div className="flex md:hidden items-center gap-2">
                            <ThemeToggle />
                            <button
                                className="p-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-24 left-4 right-4 md:hidden rounded-3xl bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl overflow-hidden p-4"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link) => {
                                const isActive = location.pathname === link.path;
                                return (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
                                            isActive 
                                                ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-semibold" 
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50 font-medium"
                                        }`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <link.icon className="h-5 w-5" />
                                        {link.name}
                                    </Link>
                                );
                            })}
                            <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
                            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full rounded-2xl h-12 text-base bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                                    Sign In
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
