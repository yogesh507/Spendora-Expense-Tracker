// src/pages/Home.jsx

import { Link } from "react-router-dom"
import {
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Wallet,
  Users,
  Sparkles,
  ShieldCheck,
  ChevronDown
} from "lucide-react"

function Home() {
  const features = [
    {
      title: "Easy to Use",
      desc: "Simple and intuitive interface to manage your money without confusion.",
      icon: CheckCircle2
    },
    {
      title: "Financial Insights",
      desc: "Understand spending patterns with smart analytics and reports.",
      icon: BarChart3
    },
    {
      title: "Daily Tracking",
      desc: "Track every rupee and stay in control of your expenses.",
      icon: Wallet
    },
    {
      title: "Group Expenses",
      desc: "Split bills and settle balances with friends easily.",
      icon: Users
    },
    {
      title: "AI Smart Advice",
      desc: "Get suggestions to save more and spend smarter.",
      icon: Sparkles
    },
    {
      title: "Safe & Secure",
      desc: "Modern authentication and protected data systems.",
      icon: ShieldCheck
    }
  ]

  const testimonials = [
    {
      text: "Spendora transformed how I manage money.",
      name: "Yash K."
    },
    {
      text: "Now I finally know where my money goes.",
      name: "Meet G."
    },
    {
      text: "The group split feature is amazing.",
      name: "Akshay L."
    }
  ]

  const faqs = [
    {
      q: "What is Spendora?",
      a: "Spendora is a smart platform for expense tracking, budgeting and group spending."
    },
    {
      q: "Is it free?",
      a: "Yes, major core features are free."
    },
    {
      q: "Is my data safe?",
      a: "Yes, your data is securely managed."
    },
    {
      q: "Can I split expenses?",
      a: "Yes, create groups and settle balances easily."
    }
  ]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div className="max-w-[1450px] mx-auto px-4 md:px-8 h-24 flex items-center justify-between">
<Link
  to="/"
  className="flex items-center gap-0"
>

  <img
    src="/logo.png"
    alt="Spendora"
    className="h-14 w-auto object-contain -mr-2"
  />

  <h1 className="text-4xl md:text-5xl font-bold leading-none">
    <span className="text-slate-900">
      Spend
    </span>

    <span className="text-cyan-500">
      ora
    </span>
  </h1>

</Link>

          <div className="flex items-center gap-3">

            <Link
              to="/login"
              className="px-5 py-3 rounded-xl border border-slate-300 hover:bg-slate-100 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg hover:opacity-90 transition"
            >
              Get Started
            </Link>

          </div>

        </div>
      </header>

      {/* Hero */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-24 grid md:grid-cols-2 gap-20 items-center">

        <div>

          <p className="text-cyan-600 font-semibold mb-4">
            Smart Finance Platform
          </p>

          <h2 className="text-6xl md:text-8xl font-bold leading-tight tracking-tight mb-6">
            Take control of
            <br />
            your money.
          </h2>

          <p className="text-xl text-slate-600 leading-9 mb-10 max-w-xl">
            Track expenses, manage budgets,
            split bills and unlock smarter
            financial decisions with Spendora.
          </p>

          <div className="flex flex-wrap gap-4">

            <Link
              to="/register"
              className="px-7 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-xl flex items-center gap-2"
            >
              Start Free
              <ArrowRight size={20} />
            </Link>

            <Link
              to="/login"
              className="px-7 py-4 rounded-2xl border border-slate-300 font-semibold hover:bg-white transition"
            >
              Login
            </Link>

          </div>

        </div>

        {/* Right Mockup */}
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8">

          <div className="grid gap-5">

            <div className="rounded-2xl bg-slate-900 text-white p-6">
              <p className="text-slate-400 mb-2">
                Monthly Savings
              </p>

              <h3 className="text-4xl font-bold text-cyan-400">
                ₹45,220
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-5">

              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="text-slate-500 text-sm">
                  Expense
                </p>

                <h4 className="text-2xl font-bold mt-2">
                  ₹18,400
                </h4>
              </div>

              <div className="rounded-2xl bg-slate-100 p-5">
                <p className="text-slate-500 text-sm">
                  Budget Left
                </p>

                <h4 className="text-2xl font-bold mt-2 text-green-600">
                  ₹11,600
                </h4>
              </div>

            </div>

            <div className="rounded-2xl bg-slate-100 p-5">
              <p className="text-slate-500 text-sm">
                AI Insight
              </p>

              <p className="mt-2 font-semibold">
                Reduce food spending by 12%
                this month.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Features */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-20">

        <h3 className="text-5xl font-bold text-center mb-16">
          Why Spendora?
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((item) => {
            const Icon = item.icon

            return (
              <div
                key={item.title}
                className="bg-white rounded-3xl p-8 shadow-md border border-slate-100 hover:shadow-xl transition"
              >

                <div className="w-14 h-14 rounded-2xl bg-cyan-500 text-white flex items-center justify-center mb-6">
                  <Icon size={26} />
                </div>

                <h4 className="text-2xl font-bold mb-4">
                  {item.title}
                </h4>

                <p className="text-slate-600 leading-8">
                  {item.desc}
                </p>

              </div>
            )
          })}

        </div>

      </section>

      {/* Testimonials */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-20">

        <h3 className="text-5xl font-bold text-center mb-14">
          What Our Users Say
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          {testimonials.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-3xl p-8 shadow-md border border-slate-100"
            >

              <p className="text-2xl italic leading-10 mb-6">
                “{item.text}”
              </p>

              <p className="font-bold">
                — {item.name}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 md:px-8 py-24 text-center">

        <h3 className="text-6xl font-bold mb-6">
          Ready to Take Control?
        </h3>

        <p className="text-xl text-slate-600 leading-9 mb-10">
          Join Spendora and start mastering
          your finances today.
        </p>

        <Link
          to="/register"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-xl"
        >
          Get Started Free
          <ArrowRight size={20} />
        </Link>

      </section>

      {/* FAQ */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-8 pb-24">

        <h3 className="text-5xl font-bold text-center mb-14">
          Frequently Asked Questions
        </h3>

        <div className="grid md:grid-cols-2 gap-8">

          {faqs.map((item) => (
            <div
              key={item.q}
              className="bg-white rounded-3xl p-8 shadow-md border border-slate-100"
            >

              <div className="flex justify-between items-center mb-4">

                <h4 className="text-2xl font-bold">
                  {item.q}
                </h4>

                <ChevronDown />
              </div>

              <p className="text-slate-600 leading-8">
                {item.a}
              </p>

            </div>
          ))}

        </div>

      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row gap-4 justify-between">

          <p className="font-bold text-xl">
            Spendora
          </p>

          <p className="text-slate-500">
            © 2026 Spendora. All rights reserved.
          </p>

        </div>

      </footer>

    </div>
  )
}

export default Home