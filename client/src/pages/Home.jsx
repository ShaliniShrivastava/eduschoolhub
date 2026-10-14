
import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const defaultContent = {
  brand: "EduSchoolHub",
  tagline: "ALL-IN-ONE SCHOOL MANAGEMENT PLATFORM",
  title: "Smart School Management",
  highlight: "for Modern Institutions",
  description:
    "Manage students, staff, fees, attendance and communication — all in one powerful platform.",
  primaryButton: "Start Free Trial",
  secondaryButton: "Book a Demo",

  stats: [
    { value: "500+", label: "Schools Trust EduSchoolHub" },
    { value: "100K+", label: "Students Empowered" },
    { value: "99.9%", label: "Uptime & Reliability" },
  ],

  features: [
    {
      icon: "▦",
      title: "Multi-School Management",
      description: "Manage multiple schools from a single dashboard.",
    },
    {
      icon: "▣",
      title: "Attendance & Fees",
      description: "Track attendance and simplify fee collection.",
    },
    {
      icon: "▤",
      title: "Exams & Reports",
      description: "Generate reports and monitor academic performance.",
    },
    {
      icon: "◉",
      title: "Parent Communication",
      description: "Keep parents informed with announcements and updates.",
    },
    {
      icon: "♟",
      title: "Student & Staff Management",
      description: "Manage students, teachers, classes and staff profiles.",
    },
    {
      icon: "▥",
      title: "Analytics & Revenue",
      description: "Make informed decisions with insightful reports.",
    },
  ],

  modules: [
    { icon: "♙", title: "Admissions", description: "Manage student enrolments." },
    { icon: "🎓", title: "Academics", description: "Manage classes, subjects and exams." },
    { icon: "₹", title: "Fees & Finance", description: "Simplify fees and invoicing." },
    { icon: "♧", title: "Human Resources", description: "Manage staff and payroll." },
    { icon: "✉", title: "Communication", description: "Connect parents and students." },
    { icon: "▥", title: "Reports & Analytics", description: "Track performance and growth." },
  ],

  plans: [
    {
      name: "Basic",
      description: "Perfect for small schools",
      price: "₹999",
      period: "/month",
      items: ["Student management", "Attendance tracking", "Basic reports"],
    },
    {
      name: "Professional",
      description: "Ideal for growing institutions",
      price: "₹2,499",
      period: "/month",
      popular: true,
      items: [
        "Everything in Basic",
        "Fees & examination",
        "Parent communication",
      ],
    },
    {
      name: "Premium",
      description: "For large schools and groups",
      price: "₹4,999",
      period: "/month",
      items: [
        "Everything in Professional",
        "Advanced analytics",
        "Priority support",
      ],
    },
  ],
};

const buttonPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700";

const buttonSecondary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:border-blue-500 hover:text-blue-600";

const sectionTitle =
  "text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl";

export default function Home() {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSiteContent() {
      try {
        const response = await fetch(
          `${API_URL}/public/site-content`,
          {
            signal: controller.signal,
            credentials: "include",
          }
        );

        if (!response.ok) return;

        const result = await response.json();
        const siteContent =
          result.content ?? result.data ?? result;

        setContent((previous) => ({
          ...previous,
          ...siteContent,
        }));
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Homepage content:", error.message);
        }
      }
    }

    loadSiteContent();

    return () => controller.abort();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-800">
      {/* Hero */}
      <section
        id="home"
        className="scroll-mt-24 bg-gradient-to-br from-blue-50 via-white to-indigo-100"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div>
            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[10px] font-bold tracking-[0.2em] text-blue-700">
              {content.tagline}
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {content.title}{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {content.highlight}
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              {content.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("pricing")}
                className={buttonPrimary}
              >
                {content.primaryButton} →
              </button>

              <button
                onClick={() => scrollTo("contact")}
                className={buttonSecondary}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  ▶
                </span>
                {content.secondaryButton}
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-5 border-t border-blue-100 pt-7 sm:grid-cols-3">
              {content.stats?.map((stat, index) => (
                <div key={`${stat.label}-${index}`}>
                  <strong className="block text-2xl font-extrabold text-blue-700">
                    {stat.value}
                  </strong>
                  <span className="mt-1 block text-xs leading-5 text-slate-500">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute inset-8 rounded-full bg-blue-300/40 blur-3xl" />

            <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl shadow-blue-900/15">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                    E
                  </span>
                  {content.brand}
                </div>
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                  ● Dashboard Preview
                </span>
              </div>

              <div className="grid min-h-[350px] grid-cols-1 sm:grid-cols-[125px_1fr]">
                <aside className="hidden border-r border-slate-100 bg-slate-50 p-3 sm:block">
                  {[
                    "Dashboard",
                    "Students",
                    "Teachers",
                    "Attendance",
                    "Fees",
                    "Exams",
                    "Reports",
                    "Settings",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`mb-2 rounded-lg px-2 py-2 text-xs font-medium ${
                        index === 0
                          ? "bg-blue-600 text-white"
                          : "text-slate-500"
                      }`}
                    >
                      {["▦", "♟", "♧", "◷", "₹", "▤", "▥", "⚙"][index]}{" "}
                      {item}
                    </div>
                  ))}
                </aside>

                <div className="min-w-0 p-4 sm:p-5">
                  <h2 className="text-lg font-bold text-slate-900">
                    Good morning! ☀️
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    School performance overview
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {[
                      ["Total Students", "2,480"],
                      ["Total Staff", "125"],
                      ["Fee Collection", "₹1.25L"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                      >
                        <p className="text-xs text-slate-500">{label}</p>
                        <strong className="mt-2 block text-lg text-slate-900">
                          {value}
                        </strong>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-slate-100 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <strong className="text-sm text-slate-800">
                        Student Attendance
                      </strong>
                      <span className="text-xs text-slate-400">
                        Monthly
                      </span>
                    </div>

                    <div className="mt-5 flex h-32 items-end justify-around gap-3 border-b border-l border-slate-200 px-3">
                      {[45, 65, 52, 82, 68, 94].map((height, index) => (
                        <div
                          key={index}
                          style={{ height: `${height}%` }}
                          className="w-6 rounded-t-md bg-gradient-to-t from-blue-600 to-indigo-400 sm:w-9"
                        />
                      ))}
                    </div>

                    <div className="mt-2 flex justify-around text-xs text-slate-400">
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(
                        (month) => (
                          <span key={month}>{month}</span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-800">
                    <strong>Recent activity:</strong> School management made
                    simpler.
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-2 top-10 hidden rounded-xl border border-blue-100 bg-white p-4 shadow-lg sm:block">
              <span className="text-xs text-slate-500">Attendance</span>
              <strong className="mt-1 block text-xl text-blue-700">
                92.5%
              </strong>
              <span className="text-xs text-green-600">
                School overview
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-24 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-blue-600">
                WHY {content.brand?.toUpperCase()}
              </span>
              <h2 className={`${sectionTitle} mt-3`}>
                Powerful Features for Smarter School Operations
              </h2>
              <p className="mt-3 text-slate-600">
                Everything your school needs in one integrated platform.
              </p>
            </div>

            <button
              onClick={() => scrollTo("modules")}
              className="shrink-0 text-left font-semibold text-blue-600 hover:text-blue-800"
            >
              Explore All Features →
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.features?.map((feature, index) => (
              <article
                key={`${feature.title}-${index}`}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl font-bold text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section
        id="modules"
        className="scroll-mt-24 bg-gradient-to-r from-blue-50 to-indigo-50 px-5 py-16 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div id="about" className="scroll-mt-24 text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-blue-600">
              OUR PLATFORM
            </span>
            <h2 className={`${sectionTitle} mt-3`}>
              A Complete School Management Ecosystem
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Bring school operations together with easy-to-use modules
              designed for modern educational institutions.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.modules?.map((module, index) => (
              <article
                key={`${module.title}-${index}`}
                className="rounded-2xl border border-white bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl text-indigo-600">
                  {module.icon}
                </div>
                <h3 className="mt-4 font-bold text-slate-900">
                  {module.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {module.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="scroll-mt-24 px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-blue-600">
              PLANS FOR EVERY SCHOOL
            </span>
            <h2 className={`${sectionTitle} mt-3`}>
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-slate-600">
              Choose a subscription that grows with your institution.
            </p>
          </div>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {content.plans?.map((plan, index) => (
              <article
                key={`${plan.name}-${index}`}
                className={`relative flex flex-col rounded-2xl border p-7 ${
                  plan.popular
                    ? "border-blue-600 bg-blue-50/50 shadow-xl shadow-blue-600/10"
                    : "border-slate-200 bg-white shadow-sm"
                }`}
              >
                {plan.popular && (
                  <span className="mb-4 inline-block w-fit rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">
                    MOST POPULAR
                  </span>
                )}

                <h3 className="text-xl font-bold text-slate-900">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {plan.description}
                </p>

                <div className="mt-6">
                  <strong className="text-4xl font-extrabold text-slate-900">
                    {plan.price}
                  </strong>
                  <span className="text-sm text-slate-500">
                    {plan.period}
                  </span>
                </div>

                <ul className="mt-7 flex-1 space-y-4">
                  {plan.items?.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <span className="font-bold text-green-600">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => scrollTo("contact")}
                  className={`mt-8 w-full ${
                    plan.popular ? buttonPrimary : buttonSecondary
                  }`}
                >
                  Get Started →
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="scroll-mt-24 bg-gradient-to-r from-blue-700 to-indigo-700 px-5 py-16 text-white lg:px-8"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-blue-200">
              LET'S GET STARTED
            </span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Ready to transform your school?
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-blue-100">
              Contact our team to find the right solution for your institution.
            </p>
          </div>

          <a
            href="mailto:hello@eduschoolhub.com?subject=EduSchoolHub%20Demo%20Request"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
          >
            Book Your Demo →
          </a>
        </div>
      </section>
    </main>
  );
}
