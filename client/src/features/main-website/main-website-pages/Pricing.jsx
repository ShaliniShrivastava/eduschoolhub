
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CircleHelp,
  GraduationCap,
  Headphones,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "For small schools getting started with digital management.",
    monthlyPrice: 999,
    yearlyPrice: 9990,
    popular: false,
    buttonText: "Get Started",
    icon: GraduationCap,
    features: [
      "Student management",
      "Class and section management",
      "Basic attendance management",
      "Examination and results",
      "School notices",
      "Basic reports",
      "Email support",
    ],
    unavailable: [
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
  },
  {
    name: "Professional",
    description: "For growing schools that need more control and insights.",
    monthlyPrice: 2499,
    yearlyPrice: 24990,
    popular: true,
    buttonText: "Choose Professional",
    icon: Sparkles,
    features: [
      "Everything in Starter",
      "Teacher and staff management",
      "Fee and payment management",
      "Attendance reports",
      "Examination and result analytics",
      "Student promotion for new sessions",
      "Parent and student portal",
      "Advanced reports",
      "Priority support",
    ],
    unavailable: ["Custom integrations"],
  },
  {
    name: "Enterprise",
    description: "For school groups with advanced operational needs.",
    monthlyPrice: null,
    yearlyPrice: null,
    popular: false,
    buttonText: "Contact Sales",
    icon: ShieldCheck,
    features: [
      "Everything in Professional",
      "Multi-school management",
      "Centralized administration",
      "Custom onboarding assistance",
      "Advanced access controls",
      "Custom integrations",
      "Dedicated support options",
      "Tailored implementation",
    ],
    unavailable: [],
  },
];

const faqs = [
  {
    question: "Can I change my plan later?",
    answer:
      "You can design your subscription workflow to support plan upgrades or downgrades based on your school's needs and your subscription policy.",
  },
  {
    question: "Is the pricing per student or per school?",
    answer:
      "That depends on the pricing model you choose. You can offer per-school plans, student-based pricing, or custom quotes for larger school groups.",
  },
  {
    question: "Can I get a custom plan for my school?",
    answer:
      "Yes. The Enterprise option is designed for schools that need customized features, integrations, onboarding, or multi-school management.",
  },
  {
    question: "Are these prices final?",
    answer:
      "The amounts shown here are sample prices for the frontend design. Confirm your actual subscription prices, limits, taxes, and billing terms before publishing.",
  },
];

const comparisonRows = [
  {
    category: "School Management",
    features: [
      { name: "Student management", values: [true, true, true] },
      { name: "Class and section management", values: [true, true, true] },
      { name: "Teacher and staff management", values: [false, true, true] },
      { name: "Student promotion", values: [false, true, true] },
    ],
  },
  {
    category: "Academics",
    features: [
      { name: "Attendance management", values: [true, true, true] },
      { name: "Examinations and results", values: [true, true, true] },
      { name: "Advanced result analytics", values: [false, true, true] },
      { name: "Advanced reports", values: [false, true, true] },
    ],
  },
  {
    category: "Administration",
    features: [
      { name: "Fee management", values: [false, true, true] },
      { name: "Parent and student portal", values: [false, true, true] },
      { name: "Multi-school management", values: [false, false, true] },
      { name: "Custom integrations", values: [false, false, true] },
    ],
  },
];

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [openFaq, setOpenFaq] = useState(0);

  const isYearly = billingCycle === "yearly";

  const getPrice = (plan) =>
    isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white px-4 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20 lg:px-10 lg:pt-24">
        <div className="pointer-events-none absolute -right-28 -top-24 -z-10 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-44 -z-10 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <Sparkles size={16} />
            Simple and transparent pricing
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            The right plan for your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              school's growth
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            Manage students, teachers, attendance, examinations and more
            with one connected school management platform.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2">
              <Check size={17} className="text-emerald-600" />
              Flexible plans
            </span>
            <span className="hidden text-slate-300 sm:inline">•</span>
            <span className="inline-flex items-center gap-2">
              <Check size={17} className="text-emerald-600" />
              Essential school modules
            </span>
            <span className="hidden text-slate-300 sm:inline">•</span>
            <span className="inline-flex items-center gap-2">
              <Check size={17} className="text-emerald-600" />
              Scalable for growth
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="px-4 pb-20 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* Billing Toggle */}
          <div className="mb-10 flex flex-col items-center gap-4">
            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1.5">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                aria-pressed={!isYearly}
                className={`rounded-lg px-5 py-2.5 text-sm font-bold transition ${
                  !isYearly
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Monthly
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle("yearly")}
                aria-pressed={isYearly}
                className={`flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition ${
                  isYearly
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Yearly
                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-extrabold text-emerald-700">
                  SAVE
                </span>
              </button>
            </div>

            <p className="text-sm text-slate-500">
              {isYearly
                ? "Yearly billing selected"
                : "Choose a billing cycle that works for your school"}
            </p>
          </div>

          {/* Plan Cards */}
          <div className="grid items-stretch gap-6 lg:grid-cols-3">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const price = getPrice(plan);

              return (
                <article
                  key={plan.name}
                  className={`relative flex flex-col rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
                    plan.popular
                      ? "border-blue-500 bg-white shadow-xl shadow-blue-600/10 ring-1 ring-blue-500"
                      : "border-slate-200 bg-white shadow-sm hover:border-blue-200"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-blue-600 px-4 py-1.5 text-xs font-extrabold text-white shadow-md">
                      MOST POPULAR
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                        plan.popular
                          ? "bg-blue-600 text-white"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      <Icon size={24} />
                    </div>

                    <div>
                      <h2 className="text-xl font-extrabold text-slate-950">
                        {plan.name}
                      </h2>
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {plan.name === "Starter"
                          ? "Essential tools"
                          : plan.name === "Professional"
                            ? "Complete management"
                            : "Tailored solutions"}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 min-h-[48px] text-sm leading-6 text-slate-600">
                    {plan.description}
                  </p>

                  <div className="mt-6 min-h-[92px] border-b border-slate-100 pb-6">
                    {price !== null ? (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-extrabold tracking-tight text-slate-950">
                            ₹{formatPrice(price)}
                          </span>
                          <span className="text-sm text-slate-500">
                            /{isYearly ? "year" : "month"}
                          </span>
                        </div>
                        {isYearly && (
                          <p className="mt-2 text-xs text-slate-500">
                            Equivalent to ₹{formatPrice(price / 12)}/month,
                            billed yearly
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="text-3xl font-extrabold tracking-tight text-slate-950">
                          Custom
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                          Pricing based on your requirements
                        </p>
                      </>
                    )}
                  </div>

                  <Link
                    to="/#contact"
                    className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition ${
                      plan.popular
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                        : "border border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    {plan.buttonText}
                    <ArrowRight size={17} />
                  </Link>

                  <div className="mt-7">
                    <p className="mb-4 text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      What's included
                    </p>

                    <ul className="space-y-3.5">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm leading-5 text-slate-700"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                            <Check size={13} strokeWidth={3} />
                          </span>
                          {feature}
                        </li>
                      ))}

                      {plan.unavailable.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-3 text-sm leading-5 text-slate-400"
                        >
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100">
                            <X size={13} />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-slate-500">
            Sample prices for design purposes. Final plans, limits and
            billing terms should be confirmed before launch.
          </p>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="border-y border-slate-100 bg-slate-50/70 px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-blue-600">
              Compare plans
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Find the right fit for your school
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Compare the key capabilities included in each subscription.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[650px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-5 py-5 text-sm font-bold text-slate-800 sm:px-7">
                    Features
                  </th>
                  <th className="px-4 py-5 text-center text-sm font-bold text-slate-800">
                    Starter
                  </th>
                  <th className="bg-blue-50/70 px-4 py-5 text-center text-sm font-bold text-blue-700">
                    Professional
                  </th>
                  <th className="px-4 py-5 text-center text-sm font-bold text-slate-800">
                    Enterprise
                  </th>
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((group) => (
                  <>
                    <tr key={`${group.category}-heading`}>
                      <td
                        colSpan={4}
                        className="border-y border-slate-100 bg-slate-50/60 px-5 py-3 text-xs font-extrabold uppercase tracking-wider text-slate-500 sm:px-7"
                      >
                        {group.category}
                      </td>
                    </tr>

                    {group.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-b border-slate-100 last:border-b-0"
                      >
                        <td className="px-5 py-4 text-sm text-slate-700 sm:px-7">
                          {feature.name}
                        </td>

                        {feature.values.map((included, index) => (
                          <td
                            key={`${feature.name}-${index}`}
                            className={`px-4 py-4 text-center ${
                              index === 1 ? "bg-blue-50/40" : ""
                            }`}
                          >
                            {included ? (
                              <Check
                                size={19}
                                className="mx-auto text-emerald-600"
                              />
                            ) : (
                              <X
                                size={17}
                                className="mx-auto text-slate-300"
                              />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs leading-5 text-slate-500">
            Feature availability shown above is an illustrative plan
            structure. Confirm the final feature-to-plan mapping before
            enabling subscriptions.
          </p>
        </div>
      </section>

      {/* Support Section */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <ShieldCheck size={23} />
            </div>
            <h3 className="mt-5 text-lg font-extrabold text-slate-950">
              Role-based access
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Organize access around your school's administrative and
              academic responsibilities.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Headphones size={23} />
            </div>
            <h3 className="mt-5 text-lg font-extrabold text-slate-950">
              Help when you need it
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Choose the support arrangement that matches your school's
              plan and requirements.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Sparkles size={23} />
            </div>
            <h3 className="mt-5 text-lg font-extrabold text-slate-950">
              Room to grow
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Start with the essentials and expand your setup as your
              school's needs change.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <CircleHelp size={25} />
            </div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-slate-600">
              Everything you need to know before choosing a plan.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-xl border bg-white transition ${
                    isOpen
                      ? "border-blue-200 shadow-sm"
                      : "border-slate-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? -1 : index)
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-sm font-bold leading-6 text-slate-900 sm:text-base">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition ${
                        isOpen
                          ? "rotate-45 bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <X size={16} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6">
                      <p className="border-t border-slate-100 pt-4 text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-800 px-6 py-12 text-center shadow-xl shadow-blue-900/15 sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[40px] border-white/5" />
          <div className="pointer-events-none absolute -bottom-28 -left-12 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-blue-50">
              <GraduationCap size={17} />
              Let's simplify school management
            </span>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Ready to bring your school together?
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
              Tell us about your school and explore a plan that fits
              your requirements.
            </p>

            <Link
              to="/#contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Talk to Our Team
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
