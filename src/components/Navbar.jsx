"use client";

import Link from "next/link";
import { useState } from "react";
import { Shield, Menu, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 border-b border-blue-100 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 shadow-md shadow-blue-200 dark:shadow-blue-900/30 group-hover:shadow-lg group-hover:shadow-blue-300 dark:group-hover:shadow-blue-800/40 transition-shadow">
                            <Shield className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold leading-tight bg-gradient-to-r from-blue-800 to-blue-600 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
                                CivicAssist
                            </span>
                            <span className="text-[10px] font-semibold tracking-wider text-emerald-600 dark:text-emerald-400 uppercase -mt-0.5">
                                AI Navigator
                            </span>
                        </div>
                    </Link>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link href="/">
                            <Button variant="ghost" className="text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800">
                                Home
                            </Button>
                        </Link>
                        <Link href="/eligibility">
                            <Button variant="ghost" className="text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800">
                                Check Eligibility
                            </Button>
                        </Link>
                        <Link href="/admin">
                            <Button variant="ghost" size="sm" className="text-slate-500 dark:text-slate-400 hover:text-blue-700 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 gap-1.5">
                                <Settings className="h-3.5 w-3.5" />
                                Admin
                            </Button>
                        </Link>
                        <div className="ml-1 border-l border-slate-200 dark:border-slate-700 pl-2">
                            <ThemeToggle />
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex md:hidden items-center gap-1">
                        <ThemeToggle />
                        <button
                            className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                            ) : (
                                <Menu className="h-5 w-5 text-slate-600 dark:text-slate-400" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-blue-50 dark:border-slate-800 py-3 space-y-1">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-400"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/eligibility"
                            className="block px-3 py-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-400"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Check Eligibility
                        </Link>
                        <Link
                            href="/admin"
                            className="block px-3 py-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-blue-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-400"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Admin Panel
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

