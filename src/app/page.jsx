import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  ArrowRight,
  Sparkles,
  Languages,
  Lock,
  Search,
  FileCheck,
  Users,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-emerald-400 blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-20 h-96 w-96 rounded-full bg-blue-400 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-40 right-40 h-48 w-48 rounded-full bg-white blur-2xl animate-pulse" style={{ animationDelay: "2s" }} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 mb-8">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-white/90">
                AI-Powered Benefits Navigator
              </span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Navigate Government
              <br />
              <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                Benefits with AI
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-blue-100/80">
              CivicAssist AI helps Indian citizens discover government schemes
              they&apos;re eligible for. Simply describe your situation and get
              personalized recommendations in seconds.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/eligibility">
                <Button
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-[1.02]"
                >
                  Check My Eligibility
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/admin">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base font-medium bg-transparent"
                >
                  View Admin Panel
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[
                { value: "10+", label: "Schemes" },
                { value: "2", label: "Languages" },
                { value: "AI", label: "Powered" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-blue-200 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full h-auto fill-background">
            <path d="M0,64L80,58.7C160,53,320,43,480,42.7C640,43,800,53,960,53.3C1120,53,1280,43,1360,37.3L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z" />
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Three simple steps to discover your eligible government benefits
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Search,
                step: "01",
                title: "Describe Your Situation",
                description: "Fill in your basic details or use voice input to describe your circumstances.",
                color: "from-blue-500 to-blue-700",
              },
              {
                icon: Sparkles,
                step: "02",
                title: "AI Analyzes Eligibility",
                description: "Our AI matches your profile against government scheme databases instantly.",
                color: "from-emerald-500 to-emerald-700",
              },
              {
                icon: FileCheck,
                step: "03",
                title: "Get Recommendations",
                description: "Receive personalized scheme suggestions with required documents and next steps.",
                color: "from-violet-500 to-violet-700",
              },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <Card className="border-border hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg hover:shadow-blue-50 dark:hover:shadow-blue-950/30 transition-all duration-300 h-full">
                  <CardContent className="pt-8 pb-6 px-6 text-center">
                    <div
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <item.icon className="h-7 w-7 text-white" />
                    </div>
                    <p className="text-xs font-bold text-muted-foreground tracking-widest mb-2">
                      STEP {item.step}
                    </p>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground">
              Why CivicAssist AI?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Built for every Indian citizen, powered by advanced AI
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: "AI-Personalized",
                description:
                  "Recommendations tailored to your unique situation using advanced RAG technology.",
                gradient: "from-blue-50 to-blue-100",
                iconColor: "text-blue-600",
              },
              {
                icon: Languages,
                title: "Multilingual",
                description:
                  "Currently supports English and Hindi with AI-powered translation.",
                gradient: "from-violet-50 to-violet-100",
                iconColor: "text-violet-600",
              },
              {
                icon: Lock,
                title: "Private & Secure",
                description:
                  "Your data is processed securely and never stored permanently.",
                gradient: "from-emerald-50 to-emerald-100",
                iconColor: "text-emerald-600",
              },
              {
                icon: Users,
                title: "For Everyone",
                description:
                  "Simple interface designed for all citizens regardless of technical ability.",
                gradient: "from-amber-50 to-amber-100",
                iconColor: "text-amber-600",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="border-border hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-md transition-all duration-300 group"
              >
                <CardContent className="pt-6 pb-5 px-5">
                  <div
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className={`h-5 w-5 ${feature.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 p-10 shadow-xl shadow-blue-200/50 dark:shadow-blue-950/50">
            <Shield className="h-10 w-10 text-blue-200 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-3">
              Ready to Discover Your Benefits?
            </h2>
            <p className="text-blue-100 mb-6 max-w-md mx-auto">
              Don&apos;t miss out on government schemes you might be eligible for.
              Start your free eligibility check now.
            </p>
            <Link href="/eligibility">
              <Button
                size="lg"
                className="bg-white text-blue-800 hover:bg-blue-50 font-semibold px-8 py-6 text-base shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                Check My Eligibility
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-slate-50 dark:bg-slate-900/50 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-foreground">CivicAssist AI</span>
          </div>
          <p className="text-xs text-muted-foreground">
            AI-powered government benefits navigator. Not an official government service.
          </p>
        </div>
      </footer>
    </div>
  );
}
