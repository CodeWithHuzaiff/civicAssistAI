"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles } from "lucide-react";

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [isOpen]);

    const sendMessage = useCallback(async () => {
        const trimmed = input.trim();
        if (!trimmed || isLoading) return;

        const userMsg = { role: "user", content: trimmed };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: trimmed,
                    history: messages,
                }),
            });

            const data = await res.json();
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: data.reply || "Sorry, something went wrong." },
            ]);
        } catch {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "I'm having trouble connecting. Please try again.",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    }, [input, isLoading, messages]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isOpen
                        ? "bg-slate-700 hover:bg-slate-800 rotate-0"
                        : "bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                    }`}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? (
                    <X className="h-6 w-6 text-white" />
                ) : (
                    <div className="relative">
                        <MessageCircle className="h-6 w-6 text-white" />
                        <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
                    </div>
                )}
            </button>

            {/* Chat Window */}
            <div
                className={`fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl transition-all duration-300 dark:border-slate-700 dark:bg-slate-900 ${isOpen
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                    } w-[calc(100vw-3rem)] sm:w-[400px] h-[min(520px,calc(100vh-10rem))]`}
            >
                {/* Header */}
                <div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                        <Sparkles className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white">CivicAssist AI</h3>
                        <p className="text-[11px] text-blue-100">
                            Ask me about government schemes
                        </p>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="rounded-lg p-1.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                    {/* Welcome Message */}
                    {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
                            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center mb-4">
                                <Bot className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                                Hi! I&apos;m CivicAssist AI 👋
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                                I can help you learn about Indian government schemes, check eligibility, and understand benefits.
                            </p>
                            <div className="grid gap-2 w-full">
                                {[
                                    "What is PM Kisan?",
                                    "Am I eligible for Ayushman Bharat?",
                                    "Schemes for students",
                                ].map((q) => (
                                    <button
                                        key={q}
                                        onClick={() => {
                                            setInput(q);
                                            setTimeout(() => {
                                                setInput(q);
                                                const fakeEvent = { trim: () => q };
                                                setMessages([{ role: "user", content: q }]);
                                                setIsLoading(true);
                                                fetch("/api/chat", {
                                                    method: "POST",
                                                    headers: { "Content-Type": "application/json" },
                                                    body: JSON.stringify({ message: q, history: [] }),
                                                })
                                                    .then((r) => r.json())
                                                    .then((data) => {
                                                        setMessages((prev) => [
                                                            ...prev,
                                                            { role: "assistant", content: data.reply },
                                                        ]);
                                                    })
                                                    .catch(() => {
                                                        setMessages((prev) => [
                                                            ...prev,
                                                            { role: "assistant", content: "Sorry, something went wrong." },
                                                        ]);
                                                    })
                                                    .finally(() => {
                                                        setIsLoading(false);
                                                        setInput("");
                                                    });
                                            }, 50);
                                        }}
                                        className="text-left text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-700 dark:hover:text-blue-400 transition-all"
                                    >
                                        💬 {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Message Bubbles */}
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                }`}
                        >
                            <div
                                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${msg.role === "user"
                                        ? "bg-blue-600"
                                        : "bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800"
                                    }`}
                            >
                                {msg.role === "user" ? (
                                    <User className="h-3.5 w-3.5 text-white" />
                                ) : (
                                    <Bot className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                                )}
                            </div>
                            <div
                                className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${msg.role === "user"
                                        ? "bg-blue-600 text-white rounded-br-md"
                                        : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-md"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        </div>
                    ))}

                    {/* Loading */}
                    {isLoading && (
                        <div className="flex gap-2.5">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
                                <Bot className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-bl-md px-4 py-3">
                                <div className="flex items-center gap-1.5">
                                    <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                                    <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                                    <span className="h-2 w-2 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t border-slate-200 dark:border-slate-700 px-3 py-3">
                    <div className="flex items-center gap-2">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Ask about any scheme..."
                            disabled={isLoading}
                            className="flex-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/50 transition-all disabled:opacity-50"
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || isLoading}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 transition-all"
                        >
                            {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="h-4 w-4" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
