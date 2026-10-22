import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  GraduationCap,
  Users,
  UserRoundCheck,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  Wallet,
  FileBarChart,
  MessageSquare,
  Bell,
  ShieldCheck,
  School,
  Bus,
  Library,
  UserCog,
  Settings,
  CheckCircle2,
  Sparkles,
  LayoutDashboard,
  Clock3,
  TrendingUp,
  Smartphone,
} from "lucide-react";

const modules = [
  {
    number: "01",
    title: "Student Management",
    description:
      "Manage student profiles, admission details, documents, class allocation and academic records from one place.",
    icon: Users,
    color: "blue",
    features: [
      "Student profiles",
      "Admission records",
      "Document management",
      "Class allocation",
    ],
  },
  {
    number: "02",
    title: "Academics Management",
    description:
      "Organize academic sessions, classes, sections, subjects and class teachers.",
    icon: GraduationCap,
    color: "violet",
    features: [
      "Academic sessions",
      "Classes and sections",
      "Subject management",
      "Class teacher assignment",
    ],
  },
  {
    number: "03",
    title: "Attendance Management",
    description:
      "Record daily attendance and monitor student and staff attendance.",
    icon: ClipboardCheck,
    color: "emerald",
    features: [
      "Daily attendance",
      "Class-wise records",
      "Attendance reports",
      "Staff attendance",
    ],
  },
  {
    number: "04",
    title: "Fees & Finance",
    description:
      "Manage fee structures, student payments, pending dues and payment records.",
    icon: Wallet,
    color: "amber",
    features: [
      "Fee structure",
      "Payment records",
      "Pending dues",
      "Fee receipts",
    ],
  },
  {
    number: "05",
    title: "Exams & Results",
    description:
      "Organize examinations, enter marks, calculate results and prepare report cards.",
    icon: FileBarChart,
    color: "rose",
    features: [
      "Exam scheduling",
      "Marks entry",
      "Result calculation",
      "Report cards",
    ],
  },
  {
    number: "06",
    title: "Timetable Management",
    description:
      "Create class timetables and organize subjects, teachers and daily schedules.",
    icon: CalendarDays,
    color: "cyan",
    features: [
      "Class timetables",
      "Subject allocation",
      "Teacher schedules",
      "Daily periods",
    ],
  },
  {
    number: "07",
    title: "Staff Management",
    description:
      "Maintain teacher and staff information, responsibilities and staff records.",
    icon: UserCog,
    color: "indigo",
    features: [
      "Staff profiles",
      "Teacher allocation",
      "Staff records",
      "Role assignment",
    ],
  },
  {
    number: "08",
    title: "Parent & Student Portal",
    description:
      "Give families access to relevant student information through a shared login experience.",
    icon: Smartphone,
    color: "teal",
    features: [
      "Student dashboard",
      "Attendance overview",
      "Results and marks",
      "Notices and updates",
    ],
  },
  {
    number: "09",
    title: "Communication",
    description:
      "Keep school communication organized with notices and important notifications.",
    icon: MessageSquare,
    color: "orange",
    features: [
      "School notices",
      "Announcements",
      "Notifications",
      "Important updates",
    ],
  },
  {
    number: "10",
    title: "Reports & Analytics",
    description:
      "Review academic and administrative information through clear reports.",
    icon: TrendingUp,
    color: "green",
    features: [
      "Student reports",
      "Attendance summaries",
      "Fee summaries",
      "Academic performance",
    ],
  },
  {
    number: "11",
    title: "Library Management",
    description:
      "Organize library books and track book issue and return records.",
    icon: Library,
    color: "purple",
    features: [
      "Book catalogue",
      "Issue records",
      "Return tracking",
      "Library inventory",
    ],
  },
  {
    number: "12",
    title: "Transport Management",
    description:
      "Maintain school transport details, route information and vehicle assignments.",
    icon: Bus,
    color: "sky",
    features: [
      "Route management",
      "Vehicle records",
      "Transport allocation",
      "Transport information",
    ],
  },
];

const colorStyles = {
  blue: {
    icon: "bg-blue-50 text-blue-600",
    number: "text-blue-600",
    hover: "group-hover:border-blue-200",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600",
    number: "text-violet-600",
    hover: "group-hover:border-violet-200",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600",
    number: "text-emerald-600",
    hover: "group-hover:border-emerald-200",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600",
    number: "text-amber-600",
    hover: "group-hover:border-amber-200",
  },
  rose: {
    icon: "bg-rose-50 text-rose-600",
    number: "text-rose-600",
    hover: "group-hover:border-rose-200",
  },
  cyan: {
    icon: "bg-cyan-50 text-cyan-600",
    number: "text-cyan-600",
    hover: "group-hover:border-cyan-200",
  },
  indigo: {
    icon: "bg-indigo-50 text-indigo-600",
    number: "text-indigo-600",
    hover: "group-hover:border-indigo-200",
  },
  teal: {
    icon: "bg-teal-50 text-teal-600",
    number: "text-teal-600",
    hover: "group-hover:border-teal-200",
  },
  orange: {
    icon: "bg-orange-50 text-orange-600",
    number: "text-orange-600",
    hover: "group-hover:border-orange-200",
  },
  green: {
    icon: "bg-green-50 text-green-600",
    number: "text-green-600",
    hover: "group-hover:border-green-200",
  },
  purple: {
    icon: "bg-purple-50 text-purple-600",
    number: "text-purple-600",
    hover: "group-hover:border-purple-200",
  },
  sky: {
    icon: "bg-sky-50 text-sky-600",
    number: "text-sky-600",
    hover: "group-hover:border-sky-200",
  },
};

export default function Modules() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 px-5 pb-20 pt-16 text-white sm:px-8 sm:pb-24 sm:pt-20 lg:px-12">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-2 text-sm text-slate-300">
            <Link to="/" className="transition hover:text-white">
              Home
            </Link>

            <span>/</span>

            <span className="text-white">Modules</span>
          </div>

          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-blue-200">
              <Sparkles size={16} />
              One Platform. Smarter School Management.
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
              Everything Your School Needs,
              <span className="mt-2 block bg-gradient-to-r from-blue-300 via-violet-300 to-cyan-300 bg-clip-text text-transparent">
                All in One Place.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              From student records and attendance to fees, examinations and
              parent communication, EduSchoolHub brings essential school
              operations together in one organized platform.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-950/30 transition hover:bg-blue-500 sm:w-auto"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/features"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                Explore Features
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { value: "12", label: "Core Modules" },
              { value: "360°", label: "School Overview" },
              { value: "One", label: "Connected Platform" },
              { value: "Anytime", label: "Online Access" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-sm"
              >
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  {item.value}
                </p>

                <p className="mt-2 text-xs text-slate-400 sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              The EduSchoolHub Ecosystem
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Simplify daily operations.
              <span className="block text-slate-400">
                Focus on better education.
              </span>
            </h2>

            <p className="mt-6 max-w-xl leading-8 text-slate-600">
              Managing a school should not mean switching between disconnected
              records and spreadsheets. EduSchoolHub organizes essential
              workflows so authorized school teams can access the information
              they need from one platform.
            </p>

            <div className="mt-8 space-y-4">
              {[
                "Keep school information organized.",
                "Reduce repetitive administrative work.",
                "Make academic information easier to access.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    size={21}
                    className="mt-0.5 shrink-0 text-emerald-500"
                  />

                  <p className="text-sm font-medium text-slate-700 sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-2xl shadow-slate-200/70 sm:p-6">
            <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <School size={23} />
                  </div>

                  <div>
                    <h3 className="font-bold">School Dashboard</h3>

                    <p className="mt-1 text-xs text-slate-500">
                      Overview of school operations
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Overview
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[
                  {
                    label: "Students",
                    value: "Student records",
                    icon: Users,
                    color: "bg-blue-50 text-blue-600",
                  },
                  {
                    label: "Attendance",
                    value: "Daily tracking",
                    icon: ClipboardCheck,
                    color: "bg-emerald-50 text-emerald-600",
                  },
                  {
                    label: "Academics",
                    value: "Classes & subjects",
                    icon: BookOpen,
                    color: "bg-violet-50 text-violet-600",
                  },
                  {
                    label: "Fees",
                    value: "Payment records",
                    icon: Wallet,
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
                        className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${item.color}`}
                      >
                        <Icon size={20} />
                      </div>

                      <p className="text-sm font-semibold text-slate-800">
                        {item.label}
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {item.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-xl bg-slate-950 p-5 text-white">
                <div className="flex items-center gap-3">
                  <LayoutDashboard size={22} className="text-blue-300" />

                  <div>
                    <p className="text-sm font-semibold">
                      Connected School Workflows
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Organized access to school information
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section className="bg-slate-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              Explore Our Modules
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              The tools to manage your school
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Explore the modules designed to organize academic, administrative
              and communication workflows.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {modules.map((module) => {
              const Icon = module.icon;
              const styles = colorStyles[module.color];

              return (
                <article
                  key={module.number}
                  className={`group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 ${styles.hover}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.icon}`}
                    >
                      <Icon size={24} strokeWidth={1.8} />
                    </div>

                    <span
                      className={`text-sm font-bold tracking-wider ${styles.number}`}
                    >
                      {module.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-bold tracking-tight text-slate-900">
                    {module.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-slate-600">
                    {module.description}
                  </p>

                  <div className="my-5 border-t border-slate-100" />

                  <ul className="space-y-3">
                    {module.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-sm text-slate-600"
                      >
                        <CheckCircle2
                          size={16}
                          className="shrink-0 text-emerald-500"
                        />

                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:text-blue-600">
                    <span>Part of your school ecosystem</span>

                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
              One Connected System
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Designed around school workflows
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Organize access around the responsibilities of each user.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "School Administration",
                description:
                  "Manage academic setup, student records, staff, fees and school-wide information.",
                icon: Settings,
              },
              {
                step: "02",
                title: "Teachers & Staff",
                description:
                  "Access assigned responsibilities and update relevant academic or administrative records.",
                icon: UserRoundCheck,
              },
              {
                step: "03",
                title: "Students & Parents",
                description:
                  "View the relevant student information, attendance, results and school updates.",
                icon: Users,
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.step}
                  className="rounded-2xl border border-slate-200 p-6 sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-600">
                      STEP {item.step}
                    </span>

                    <Icon size={25} className="text-slate-400" />
                  </div>

                  <h3 className="mt-6 text-xl font-bold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
                Built for Better Organization
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                Less administrative complexity.
                <span className="block text-slate-400">
                  More clarity for your team.
                </span>
              </h2>

              <p className="mt-6 max-w-xl leading-8 text-slate-300">
                Bring your school's essential information into a structured
                system, with access based on each user's responsibilities.
              </p>

              <Link
                to="/features"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-blue-50"
              >
                Discover All Features
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Clock3,
                  title: "Organized Workflows",
                  description:
                    "Keep everyday school activities structured.",
                },
                {
                  icon: ShieldCheck,
                  title: "Role-Based Access",
                  description:
                    "Provide access according to assigned responsibilities.",
                },
                {
                  icon: Bell,
                  title: "School Updates",
                  description:
                    "Keep important notices and information accessible.",
                },
                {
                  icon: BookOpen,
                  title: "Academic Visibility",
                  description:
                    "Organize classes, subjects and academic records.",
                },
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
                  >
                    <Icon size={24} className="text-blue-300" />

                    <h3 className="mt-4 font-bold">{item.title}</h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10">
            <School size={28} />
          </div>

          <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Ready to simplify your school's management?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-blue-100">
            Explore EduSchoolHub and discover how connected school management
            workflows can help your institution stay organized.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-blue-700 transition hover:bg-blue-50 sm:w-auto"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/30 px-7 py-4 text-sm font-bold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Back to Home
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}