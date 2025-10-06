import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Logo from "@/components/ui/logo";
import {
  BookOpen,
  Sparkles,
  Users,
  ArrowRight,
  PlayCircle,
  Star,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen  text-popover-foreground">
      {/* Navbar */}
      <nav className="w-full dark:bg-accent bg-popover flex items-center justify-between md:px-8 px-2 py-2 bg-white shadow-sm fixed top-0 left-0 z-50">
        
          <Logo />
        <Button className="rounded-xl px-6 bg-primary text-white">
          Sign In
        </Button>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center text-center py-36 px-4 mt-16">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary/70 to-primary">
          Learn Smarter with Lambent
        </h1>

        <p className="mt-6 text-lg md:text-xl max-w-2xl text-popover-foreground animate-fade-in-delay">
          An interactive learning experience that makes education engaging, intuitive, and personalized for everyone.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-delay-2">
          <Button size="lg" className="rounded-xl px-8 text-lg bg-sky-600 hover:bg-sky-700">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-xl px-8 text-lg border-2 hover:bg-sky-50 transition-all"
          >
            Watch Demo <PlayCircle className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Lambent?</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to make learning accessible, enjoyable, and impactful.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {[
            {
              icon: <Sparkles className="h-10 w-10 text-sky-500" />,
              title: "Interactive Lessons",
              text: "Engage with hands-on exercises, simulations, and challenges that adapt to your learning speed.",
            },
            {
              icon: <BookOpen className="h-10 w-10 text-teal-500" />,
              title: "Personalized Paths",
              text: "AI-driven recommendations to keep you learning what matters most to your goals.",
            },
            {
              icon: <Users className="h-10 w-10 text-emerald-500" />,
              title: "Collaborative Learning",
              text: "Connect, share insights, and grow with learners around the globe.",
            },
          ].map((feature, idx) => (
            <Card
              key={idx}
              className="rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
            >
              <CardHeader className="flex flex-col items-center">
                {feature.icon}
                <CardTitle className="mt-4 text-xl font-semibold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-600 text-center">
                {feature.text}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-sky-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                step: "1",
                title: "Create Your Profile",
                text: "Tell us your interests and goals to get a tailored learning experience.",
              },
              {
                step: "2",
                title: "Learn Interactively",
                text: "Access gamified lessons, quizzes, and discussions with real-time feedback.",
              },
              {
                step: "3",
                title: "Track Your Progress",
                text: "Monitor achievements, earn badges, and celebrate milestones.",
              },
            ].map((s, i) => (
              <div key={i} className="p-8 bg-white rounded-2xl shadow hover:shadow-lg transition-all">
                <div className="text-sky-600 text-4xl font-bold mb-4">{s.step}</div>
                <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">What Learners Say</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Ava Thompson",
                text: "Lambent transformed how I study — the interactive lessons make everything so much easier to understand!",
              },
              {
                name: "Ethan Carter",
                text: "The best part is learning with friends and earning badges together. Super motivating!",
              },
              {
                name: "Maya Patel",
                text: "I love how it personalizes content for me. I’m learning faster than ever before!",
              },
            ].map((t, i) => (
              <Card key={i} className="rounded-2xl shadow hover:shadow-xl transition-all p-6">
                <CardContent className="flex flex-col items-center text-center space-y-4">
                  <Star className="text-yellow-400 h-6 w-6" />
                  <p className="text-gray-600 italic">“{t.text}”</p>
                  <p className="font-semibold text-gray-800">{t.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Pricing Section */}
      <section className="py-24 bg-sky-600 text-white text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Join Lambent for Free</h2>
        <p className="text-lg text-sky-100 mb-8 max-w-xl mx-auto">
          Start your journey to smarter, more interactive learning today.
        </p>
        <Button
          size="lg"
          className="bg-white text-sky-700 font-semibold rounded-xl px-10 hover:bg-sky-50 transition"
        >
          Create Free Account
        </Button>
      </section>

      {/* Footer */}
      <footer className="py-6 bg-white text-center text-gray-500 text-sm border-t">
        © {new Date().getFullYear()} Lambent. All rights reserved.
      </footer>
    </div>
  );
}
