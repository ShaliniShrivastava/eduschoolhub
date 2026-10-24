
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Crown,
  GraduationCap,
  Headphones,
  Layers3,
  ShieldCheck,
  Sparkles,
  Users,
  Building2,
  X,
} from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "For small schools getting started with digital management.",
    monthlyPrice: 999,
    yearlyPrice: 9990,
    badge: "",
    icon: GraduationCap,
    features: [
      "Student management",
      "Class and section management",
      "Teacher and staff management",
      "Attendance management",
      "Basic student reports",
      "School dashboard",
    ],
    unavailable: [
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
    ],
  },
  {
    name: "Professional",
    description: "For growing schools that need a more complete solution.",
    monthlyPrice: 2499,
    yearlyPrice: 24990,
    badge: "Most Popular",
    icon: Crown,
    features: [
      "Everything in Starter",
      "Advanced attendance reports",
      "Examination and results",
      "Fee management",
      "Parent and student portal",
      "Notices and notifications",
      "Priority support",
    ],
    unavailable: ["Custom integrations"],
  },
  {
    name: "Enterprise",
    description: "For larger schools and school groups with specific needs.",
    monthlyPrice: null,
    yearlyPrice: null,
    badge: "Custom Solution",
    icon: Building2,
    features: [
      "Everything in Professional",
      "Multi-school management options",
      "Custom requirements discussion",
      "Advanced reporting requirements",
      "Dedicated onboarding discussion",
      "Custom support arrangements",
      "Integration planning",
    ],
    unavailable: [],
  },
];

const comparisonRows = [
  {
    category: "School Management",
    features: [
      { name: "Student management", values: [true, true, true] },
      { name: "Class and section management", values: [true, true, true] },
      { name: "Teacher and staff management", values: [true, true, true] },
      { name: "Attendance management", values: [true, true, true] },
    ],
  },
  {
    category: "Academics",
    features: [
      { name: "Examination and results", values: [false, true, true] },
      { name: "Student performance reports", values: [false, true, true] },
      { name: "Parent and student portal", values: [false, true, true] },
    ],
  },
  {
    category: "Communication and Support",
    features: [
      { name: "Notices and notifications", values: [false, true, true] },
      { name: "Priority support", values: [false, true, true] },
      { name: "Custom integrations", values: [false, false, true] },
    ],
  },
];

const faqs = [
  {
    question: "Which plan is right for my school?",
    answer:
      "Starter is designed for schools beginning their digital journey. Professional offers a broader set of school management features. Enterprise is suitable for schools or school groups that need to discuss custom requirements.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "You can contact our team to discuss changing your plan as your school's needs evolve. The exact upgrade, downgrade and billing process will depend on the subscription setup.",
  },
  {
    question: "What is the difference between monthly and yearly billing?",
    answer:
      "Monthly billing is intended for month-to-month subscriptions, while yearly billing represents an annual subscription. The prices shown here are frontend sample prices and must be confirmed before launch.",
  },
  {
    question: "Does the Enterprise plan have a fixed price?",
    answer:
      "Enterprise uses custom pricing. Contact our team with your school size and requirements so the appropriate package can be discussed.",
  },
  {
    question: "Can I request a demo before choosing a plan?",
    answer:
      "Yes. Select Request a Demo on any plan to open the Contact page with your selected plan and billing preference prefilled.",
  },
  {
    question: "Can I use EduSchoolHub without technical knowledge?",
    answer:
      "The platform is being designed to make routine school administration easier. Training, onboarding and the final support arrangements can be confirmed with the EduSchoolHub team.",
  },
];

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(price);

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const elements = document.querySelectorAll(".pricing-reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const getContactUrl = (planName) =>
    `/contact?plan=${encodeURIComponent(planName)}&billing=${
      isYearly ? "yearly" : "monthly"
    }#contact-form`;

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* PAGE STYLES */}
      <style>{`
        .pricing-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition:
            opacity 650ms ease,
            transform 650ms ease;
          transition-delay: var(--reveal-delay, 0ms);
        }

        .pricing-reveal.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .pricing-orb {
          animation: pricingFloat 8s ease-in-out infinite;
        }

        .pricing-orb-delay {
          animation-delay: -4s;
        }

        .pricing-faq-content {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 300ms ease;
        }

        .pricing-faq-content.is-open {
          grid-template-rows: 1fr;
        }

        .pricing-faq-inner {
          overflow: hidden;
        }

        @keyframes pricingFloat {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(0, 14px, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .pricing-reveal,
          .pricing-orb,
          .pricing-faq-content {
            animation: none !important;
            transition: none !important;
          }

          .pricing-reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="relative isolate overflow-hidden border-b border-slate-100 bg-gradient-to-b from-blue-50 via-white to-white">
        <div className="pointer-events-none absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-80 w-80 rounded-full bg-indigo-100/70 blur-3xl" />

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700 shadow-sm">
              <Sparkles size={15} />
              Simple and flexible pricing
            </span>

            <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              The right tools for a{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                smarter school
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Explore plans designed to help schools simplify everyday
              administration, manage academics and stay connected.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-blue-600" />
                School-focused features
              </span>
              <span className="hidden text-slate-300 sm:inline">•</span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-blue-600" />
                Flexible plan options
              </span>
            </div>

            <a
              href="#pricing-plans"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
            >
              Explore Plans
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      {/* PRICING PLANS */}
      <section
        id="pricing-plans"
        className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="pricing-reveal text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Choose your plan
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Pricing that grows with your school
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Compare available options and choose the plan that best matches
              your school's requirements.
            </p>

            <div className="mt-7 inline-flex items-center gap-1 rounded-2xl border border-slate-200 bg-slate-50 p-1.5">
              <button
                type="button"
                onClick={() => setIsYearly(false)}
                aria-pressed={!isYearly}
                className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                  !isYearly
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Monthly
              </button>

              <button
                type="button"
                onClick={() => setIsYearly(true)}
                aria-pressed={isYearly}
                className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition ${
                  isYearly
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                Yearly
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-extrabold uppercase text-green-700">
                  Annual
                </span>
              </button>
            </div>
          </div>

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

              return (
                <article
                  key={plan.name}
                  className={`pricing-reveal relative flex flex-col rounded-3xl border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-8 ${
                    plan.name === "Professional"
                      ? "border-blue-300 shadow-xl shadow-blue-900/10 lg:scale-[1.03]"
                      : "border-slate-200 shadow-sm"
                  }`}
                  style={{ "--reveal-delay": `${index * 100}ms` }}
                >
                  {plan.badge && (
                    <span
                      className={`absolute -top-3 left-6 rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${
                        plan.name === "Professional"
                          ? "bg-blue-600 text-white"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                      <Icon size={24} />
                    </div>

                    {plan.name === "Professional" && (
                      <Sparkles size={21} className="text-blue-500" />
                    )}
                  </div>

                  <h3 className="mt-6 text-xl font-extrabold text-slate-950">
                    {plan.name}
                  </h3>

                  <p className="mt-2 min-h-12 text-sm leading-6 text-slate-500">
                    {plan.description}
                  </p>

                  <div className="mt-6 min-h-[76px]">
                    {price === null ? (
                      <>
                        <p className="text-3xl font-extrabold tracking-tight text-slate-950">
                          Custom
                        </p>
                        <p className="mt-2 text-xs text-slate-500">
                          Discuss pricing with our team
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-extrabold tracking-tight text-slate-950">
                            ₹{formatPrice(price)}
                          </span>
                          <span className="text-sm text-slate-500">
                            /{isYearly ? "year" : "month"}
                          </span>
                        </div>

                        {isYearly && (
                          <p className="mt-2 text-xs font-semibold text-green-700">
                            Annual billing
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  <Link
                    to={getContactUrl(plan.name)}
                    className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-bold transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 ${
                      plan.name === "Professional"
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700"
                        : "border border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                    }`}
                  >
                    Request a Demo
                    <ArrowRight size={16} />
                  </Link>

                  <div className="my-7 border-t border-slate-100" />

                  <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    What's included
                  </p>

                  <ul className="mt-5 flex-1 space-y-3.5">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                      >
                        <Check
                          size={17}
                          className="mt-0.5 shrink-0 text-green-600"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}

                    {plan.unavailable.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-400"
                      >
                        <X
                          size={17}
                          className="mt-0.5 shrink-0 text-slate-300"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <p className="pricing-reveal mt-6 text-center text-xs leading-5 text-slate-400">
            Displayed prices are sample frontend values. Confirm final prices,
            included features and billing terms before publishing.
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="pricing-reveal mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Built for schools
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              More than just school software
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Bring essential school workflows into one organised platform.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <BenefitCard
              icon={<Layers3 size={23} />}
              title="Simplified workflows"
              description="Manage everyday administrative tasks from one organised platform."
            />

            <BenefitCard
              icon={<Users size={23} />}
              title="Connected community"
              description="Support communication between school teams, students and parents."
            />

            <BenefitCard
              icon={<ShieldCheck size={23} />}
              title="Role-based access"
              description="Organise access around the responsibilities of different users."
            />

            <BenefitCard
              icon={<Headphones size={23} />}
              title="Support when needed"
              description="Discuss onboarding and support options according to your plan."
            />
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="pricing-reveal text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Compare plans
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Find the features you need
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
              Compare the sample feature allocation across the available plans.
            </p>
          </div>

          <div className="pricing-reveal mt-10 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full min-w-[650px] border-collapse text-left">
              <thead>
                <tr className="bg-slate-50">
                  <th className="w-[46%] px-5 py-5 text-sm font-bold text-slate-800 sm:px-7">
                    Features
                  </th>

                  {plans.map((plan) => (
                    <th
                      key={plan.name}
                      className={`px-4 py-5 text-center text-sm font-extrabold ${
                        plan.name === "Professional"
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-800"
                      }`}
                    >
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {comparisonRows.map((group) => (
                  <>
                    <tr key={`${group.category}-heading`}>
                      <td
                        colSpan={4}
                        className="border-t border-slate-200 bg-slate-50/70 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-500 sm:px-7"
                      >
                        {group.category}
                      </td>
                    </tr>

                    {group.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-t border-slate-100 transition hover:bg-slate-50/70"
                      >
                        <td className="px-5 py-4 text-sm text-slate-700 sm:px-7">
                          {feature.name}
                        </td>

                        {feature.values.map((available, index) => (
                          <td
                            key={`${feature.name}-${plans[index].name}`}
                            className={`px-4 py-4 text-center ${
                              index === 1 ? "bg-blue-50/40" : ""
                            }`}
                          >
                            {available ? (
                              <CheckCircle2
                                size={19}
                                className="mx-auto text-green-600"
                              />
                            ) : (
                              <X
                                size={18}
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

          <div className="pricing-reveal mt-6 text-center">
            <a
              href="#pricing-plans"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900"
            >
              Back to Plans
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* CUSTOM PLAN CTA */}
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10">
        <div className="pricing-reveal relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-800 px-6 py-12 shadow-xl shadow-blue-900/10 sm:px-12 sm:py-16">
          <div className="pricing-orb pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[40px] border-white/5" />
          <div className="pricing-orb pricing-orb-delay pointer-events-none absolute -bottom-28 -left-12 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white">
              <Building2 size={27} />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
              Need something different?
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Let's find the right solution for your school.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
              Tell us about your requirements and explore a plan for your
              school or school group.
            </p>

            <Link
              to="/contact?plan=Enterprise&billing=custom#contact-form"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-blue-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/40"
            >
              Contact Our Team
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="pricing-reveal mb-10 text-center">
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
                  className={`pricing-reveal overflow-hidden rounded-2xl border bg-white transition duration-300 ${
                    isOpen
                      ? "border-blue-200 shadow-md shadow-blue-900/5"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  style={{ "--reveal-delay": `${index * 80}ms` }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-blue-200 sm:px-6"
                  >
                    <span className="text-sm font-bold leading-6 text-slate-900 sm:text-base">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition duration-300 ${
                        isOpen
                          ? "rotate-180 bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      <ChevronDown size={17} />
                    </span>
                  </button>

                  <div
                    className={`pricing-faq-content ${
                      isOpen ? "is-open" : ""
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <div className="pricing-faq-inner">
                      <p className="mx-5 border-t border-slate-100 py-4 text-sm leading-7 text-slate-600 sm:mx-6">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pricing-reveal mt-8 text-center">
            <Link
              to="/contact?plan=Enterprise&billing=custom#contact-form"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:text-blue-900"
            >
              Still have questions? Contact us
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function BenefitCard({ icon, title, description }) {
  return (
    <article className="pricing-reveal rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        {icon}
      </div>

      <h3 className="mt-5 font-extrabold text-slate-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}
