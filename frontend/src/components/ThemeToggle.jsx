"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg">
                <Monitor className="h-4 w-4" />
            </Button>
        );
    }

    const cycleTheme = () => {
        if (theme === "light") setTheme("dark");
        else if (theme === "dark") setTheme("system");
        else setTheme("light");
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            className="h-9 w-9 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 dark:text-slate-400 dark:hover:text-blue-400 dark:hover:bg-slate-800 transition-colors"
            title={`Theme: ${theme}`}
        >
            {theme === "dark" ? (
                <Moon className="h-4 w-4" />
            ) : theme === "system" ? (
                <Monitor className="h-4 w-4" />
            ) : (
                <Sun className="h-4 w-4" />
            )}
        </Button>
    );
}
