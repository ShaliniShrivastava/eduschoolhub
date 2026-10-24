
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  GraduationCap,
  Users,
  BookOpen,
  BarChart3,
  ShieldCheck,
  ClipboardCheck,
  ChevronDown,
  School,
  CalendarCheck,
  Layers3,
  Sparkles,
} from "lucide-react";

const DEMO_ROUTE = "/book-demo";

const platformFeatures = [
  {
    icon: Users,
    title: "Student Management",
    description:
      "Manage student profiles, admissions, class assignments and academic records from one place.",
  },
  {
    icon: BookOpen,
    title: "Academic Management",
    description:
      "Organize classes, subjects, sessions and examinations with a structured workflow.",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance Management",
    description:
      "Record student attendance and review attendance information with less manual work.",
  },
  {
    icon: BarChart3,
    title: "Results & Reports",
    description:
      "Manage examination results and access organized academic information.",
  },
];

const userRoles = [
  {
    number: "01",
    title: "Super Admin",
    description:
      "Manage the platform, schools, subscription plans and platform-wide settings.",
  },
  {
    number: "02",
    title: "School Admin",
    description:
      "Manage school operations, students, teachers, classes and academic activities.",
  },
  {
    number: "03",
    title: "Staff & Teachers",
    description:
      "Access assigned responsibilities and manage relevant classroom activities.",
  },
  {
    number: "04",
    title: "Student & Parent",
    description:
      "Access relevant student information, academic progress and school updates.",
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Set Up Your School",
    description:
      "Organize school information, academic sessions, classes and user accounts.",
  },
  {
    number: "02",
    title: "Manage Daily Activities",
    description:
      "Handle student records, attendance, academics and other school workflows.",
  },
  {
    number: "03",
    title: "Review Progress",
    description:
      "Access academic information and reports to stay informed about school activities.",
  },
];

const principles = [
  {
    icon: CheckCircle2,
    title: "Clarity",
    text: "Keep information structured and easier to navigate.",
  },
  {
    icon: ShieldCheck,
    title: "Role-based access",
    text: "Present relevant tools according to assigned responsibilities.",
  },
  {
    icon: School,
    title: "School-focused workflows",
    text: "Bring important academic and administrative activities together.",
  },
];

const faqs = [
  {
    question: "What is EduSchoolHub?",
    answer:
      "EduSchoolHub is a school management platform designed to organize school administration, student information, academic activities and related workflows in one place.",
  },
  {
    question: "Who can use EduSchoolHub?",
    answer:
      "The platform is designed around different roles, including Super Admin, School Admin, Staff and Teachers, and Student and Parent access.",
  },
  {
    question: "Can EduSchoolHub help manage student attendance?",
    answer:
      "Yes. The platform is designed to support attendance management, helping authorized users record, monitor and review attendance information.",
  },
  {
    question: "How can our school explore the platform?",
    answer:
      "Submit the Book a Demo form with your school details so the EduSchoolHub team can follow up regarding your demo request.",
  },
];

function About() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="w-full overflow-hidden bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700">
              <Sparkles size={15} />
              About EduSchoolHub
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Making School
              <span className="block text-blue-600">
                Management Simpler
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              EduSchoolHub brings essential school management
              activities into one organized platform, helping schools
              manage information, coordinate daily tasks and keep
              academic workflows structured.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to={DEMO_ROUTE}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Book a Demo
                <ArrowUpRight size={18} />
              </Link>

              <Link
                to="/features"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700"
              >
                Explore Features
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-blue-600" />
                Organized workflows
              </span>

              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-blue-600" />
                Role-based access
              </span>
            </div>
          </div>

          {/* Dashboard Illustration */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-blue-100/70 blur-2xl" />
            <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-indigo-100/70 blur-2xl" />

            <div className="relative rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/70 sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <GraduationCap size={25} />
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      EduSchoolHub
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      School Overview
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  Dashboard
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 py-5 sm:gap-4">
                {[
                  {
                    label: "Students",
                    value: "Management",
                    icon: Users,
                    color: "bg-blue-50 text-blue-600",
                  },
                  {
                    label: "Academics",
                    value: "Organization",
                    icon: BookOpen,
                    color: "bg-violet-50 text-violet-600",
                  },
                  {
                    label: "Attendance",
                    value: "Tracking",
                    icon: ClipboardCheck,
                    color: "bg-emerald-50 text-emerald-600",
                  },
                  {
                    label: "Reports",
                    value: "Overview",
                    icon: BarChart3,
                    color: "bg-amber-50 text-amber-600",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="rounded-xl border border-slate-100 p-4"
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.color}`}
                      >
                        <Icon size={20} />
                      </div>

                      <p className="mt-4 text-sm font-bold text-slate-800">
                        {item.label}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
                    <Layers3 size={20} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      One Organized Platform
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Connected school workflows
                    </p>
                  </div>

                  <CheckCircle2
                    size={20}
                    className="ml-auto shrink-0 text-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Our Approach
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              One Platform for
              <span className="block text-blue-600">
                Everyday School Operations
              </span>
            </h2>
          </div>

          <div className="space-y-4 text-base leading-8 text-slate-600">
            <p>
              School management involves many connected activities,
              from maintaining student records to organizing classes,
              monitoring attendance and managing academic information.
            </p>
            <p>
              EduSchoolHub aims to bring these activities into a
              structured digital environment, helping authorized users
              access the information and tools relevant to their roles.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              What We Bring Together
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Designed Around School Needs
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Keep essential school activities organized through
              connected management modules.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {platformFeatures.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-200/60"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-9 text-center">
            <Link
              to="/features"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-800"
            >
              Discover all features
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* User Roles */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Built Around Responsibilities
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              The Right Access for Every Role
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Organize platform access according to each user's
              responsibilities within the school ecosystem.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {userRoles.map((role) => (
              <article
                key={role.number}
                className="rounded-2xl border border-slate-200 p-6"
              >
                <span className="text-sm font-extrabold tracking-widest text-blue-600">
                  {role.number}
                </span>

                <h3 className="mt-5 text-lg font-bold text-slate-900">
                  {role.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {role.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-slate-900 px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-300">
              A Structured Workflow
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              From Setup to Everyday Management
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-300">
              A simple way to think about organizing your school's
              information and day-to-day activities.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
            {workflowSteps.map((step, index) => (
              <article key={step.number} className="relative">
                {index < workflowSteps.length - 1 && (
                  <div className="absolute left-12 top-6 hidden h-px w-[calc(100%-2rem)] bg-slate-700 md:block" />
                )}

                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/30 bg-blue-500/10 text-sm font-extrabold text-blue-300">
                  {step.number}
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {step.title}
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-7 text-slate-300">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              Our Principles
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Practical, Organized and Role-Aware
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600">
              School management software should help teams organize
              their work without making routine processes unnecessarily
              complicated.
            </p>
          </div>

          <div className="space-y-4">
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border border-slate-200 p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              FAQs
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Learn more about EduSchoolHub and how to explore the platform.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              const answerId = `about-faq-answer-${index}`;

              return (
                <article
                  key={faq.question}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-sm font-bold leading-6 text-slate-900 sm:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={20}
                      className={`shrink-0 text-slate-500 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div id={answerId} className="px-5 pb-5">
                      <p className="text-sm leading-7 text-slate-600">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-blue-600 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <CalendarCheck size={29} />
          </div>

          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Ready to Explore EduSchoolHub?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
            Tell us about your school and request a personalized
            walkthrough of the platform.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to={DEMO_ROUTE}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            >
              Book a Demo
              <ArrowUpRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
