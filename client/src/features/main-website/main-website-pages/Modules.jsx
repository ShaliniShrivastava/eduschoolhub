
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  BookOpen,
  Bus,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  FileBarChart,
  GraduationCap,
  LayoutDashboard,
  Library,
  MessageSquare,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";

const modules = [
  {
    id: 1,
    title: "Student Management",
    description:
      "Manage student profiles, admissions, documents, class allocation and student records from one place.",
    icon: Users,
    category: "Administration",
    color: "blue",
    features: ["Student profiles", "Admissions", "Class allocation"],
  },
  {
    id: 2,
    title: "Academics Management",
    description:
      "Organize classes, sections, subjects and academic sessions with a structured workflow.",
    icon: GraduationCap,
    category: "Academics",
    color: "violet",
    features: ["Classes & sections", "Subjects", "Academic sessions"],
  },
  {
    id: 3,
    title: "Attendance Management",
    description:
      "Record daily attendance, monitor absences and access class-wise attendance reports.",
    icon: ClipboardCheck,
    category: "Academics",
    color: "emerald",
    features: ["Daily attendance", "Absence tracking", "Attendance reports"],
  },
  {
    id: 4,
    title: "Fees & Finance",
    description:
      "Manage fee structures, payments, pending dues and payment receipts with greater clarity.",
    icon: Wallet,
    category: "Finance",
    color: "amber",
    features: ["Fee structure", "Payment records", "Due tracking"],
  },
  {
    id: 5,
    title: "Exams & Results",
    description:
      "Organize examinations, enter marks, calculate results and generate student report cards.",
    icon: FileBarChart,
    category: "Academics",
    color: "rose",
    features: ["Exam scheduling", "Marks entry", "Report cards"],
  },
  {
    id: 6,
    title: "Timetable Management",
    description:
      "Create class timetables and organize periods, subjects and teacher schedules.",
    icon: CalendarDays,
    category: "Academics",
    color: "cyan",
    features: ["Class timetable", "Period planning", "Teacher schedules"],
  },
  {
    id: 7,
    title: "Staff Management",
    description:
      "Maintain staff profiles, manage responsibilities and organize teacher information.",
    icon: Users,
    category: "Administration",
    color: "indigo",
    features: ["Staff profiles", "Role management", "Staff records"],
  },
  {
    id: 8,
    title: "Parent & Student Portal",
    description:
      "Give families convenient access to attendance, results, fee details and school updates.",
    icon: Smartphone,
    category: "Communication",
    color: "teal",
    features: ["Academic progress", "Fee information", "School updates"],
  },
  {
    id: 9,
    title: "Communication",
    description:
      "Share notices, announcements and important school information with the right audience.",
    icon: MessageSquare,
    category: "Communication",
    color: "orange",
    features: ["Notices", "Announcements", "Notifications"],
  },
  {
    id: 10,
    title: "Reports & Analytics",
    description:
      "Understand school performance with organized reports covering attendance, fees and results.",
    icon: BarChart3,
    category: "Reports",
    color: "green",
    features: ["Performance reports", "Fee summaries", "Attendance insights"],
  },
  {
    id: 11,
    title: "Library Management",
    description:
      "Maintain book records, track availability and organize library issue and return activities.",
    icon: Library,
    category: "Administration",
    color: "purple",
    features: ["Book catalogue", "Issue & return", "Book availability"],
  },
  {
    id: 12,
    title: "Transport Management",
    description:
      "Organize transport routes, vehicle details and student transport assignments.",
    icon: Bus,
    category: "Administration",
    color: "sky",
    features: ["Route management", "Vehicle records", "Student allocation"],
  },
];

const categories = [
  "All Modules",
  "Administration",
  "Academics",
  "Finance",
  "Communication",
  "Reports",
];

const colorStyles = {
  blue: {
    icon: "bg-blue-50 text-blue-600 ring-blue-100",
    glow: "group-hover:bg-blue-50",
    dot: "bg-blue-500",
  },
  violet: {
    icon: "bg-violet-50 text-violet-600 ring-violet-100",
    glow: "group-hover:bg-violet-50",
    dot: "bg-violet-500",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    glow: "group-hover:bg-emerald-50",
    dot: "bg-emerald-500",
  },
  amber: {
    icon: "bg-amber-50 text-amber-600 ring-amber-100",
    glow: "group-hover:bg-amber-50",
    dot: "bg-amber-500",
  },
  rose: {
    icon: "bg-rose-50 text-rose-600 ring-rose-100",
    glow: "group-hover:bg-rose-50",
    dot: "bg-rose-500",
  },
  cyan: {
    icon: "bg-cyan-50 text-cyan-600 ring-cyan-100",
    glow: "group-hover:bg-cyan-50",
    dot: "bg-cyan-500",
  },
  indigo: {
    icon: "bg-indigo-50 text-indigo-600 ring-indigo-100",
    glow: "group-hover:bg-indigo-50",
    dot: "bg-indigo-500",
  },
  teal: {
    icon: "bg-teal-50 text-teal-600 ring-teal-100",
    glow: "group-hover:bg-teal-50",
    dot: "bg-teal-500",
  },
  orange: {
    icon: "bg-orange-50 text-orange-600 ring-orange-100",
    glow: "group-hover:bg-orange-50",
    dot: "bg-orange-500",
  },
  green: {
    icon: "bg-green-50 text-green-600 ring-green-100",
    glow: "group-hover:bg-green-50",
    dot: "bg-green-500",
  },
  purple: {
    icon: "bg-purple-50 text-purple-600 ring-purple-100",
    glow: "group-hover:bg-purple-50",
    dot: "bg-purple-500",
  },
  sky: {
    icon: "bg-sky-50 text-sky-600 ring-sky-100",
    glow: "group-hover:bg-sky-50",
    dot: "bg-sky-500",
  },
};

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
        <Sparkles size={14} />
        {eyebrow}
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-500 sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function DashboardPreview() {
  const stats = [
    {
      label: "Total Students",
      value: "1,248",
      change: "+12%",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Attendance",
      value: "94.8%",
      change: "Today",
      icon: ClipboardCheck,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Fee Collection",
      value: "₹8.4L",
      change: "This month",
      icon: Wallet,
      color: "bg-violet-50 text-violet-600",
    },
  ];

  const attendance = [58, 76, 64, 88, 70, 94, 82];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-5 rounded-[2rem] bg-blue-200/30 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
              <LayoutDashboard size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">
                School Dashboard
              </p>
              <p className="text-xs text-slate-500">Overview & analytics</p>
            </div>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500">
            <Bell size={17} />
          </div>
        </div>

        <div className="space-y-5 p-4 sm:p-6">
          <div>
            <p className="text-lg font-bold text-slate-900">
              Welcome back, Admin!
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Here is your school&apos;s overview.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-100 p-3 sm:rounded-2xl sm:p-4"
                >
                  <div
                    className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg ${stat.color}`}
                  >
                    <Icon size={16} />
                  </div>
                  <p className="text-[10px] text-slate-500 sm:text-xs">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-base font-bold text-slate-900 sm:text-xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-emerald-600 sm:text-xs">
                    {stat.change}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-slate-100 p-4 sm:p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Weekly Attendance
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Attendance overview
                </p>
              </div>
              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                +8.2%
              </span>
            </div>

            <div className="flex h-28 items-end justify-between gap-2">
              {attendance.map((height, index) => (
                <div
                  key={index}
                  className="flex h-full flex-1 items-end justify-center"
                >
                  <div
                    style={{ height: `${height}%` }}
                    className={`w-full max-w-10 rounded-t-md transition-all ${
                      index === 5 ? "bg-blue-600" : "bg-blue-100"
                    }`}
                  />
                </div>
              ))}
            </div>

            <div className="mt-3 flex justify-between text-[10px] text-slate-400 sm:text-xs">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                (day) => (
                  <span key={day}>{day}</span>
                )
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3 sm:p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-emerald-600">
              <CheckCircle2 size={19} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800 sm:text-sm">
                Everything is organized
              </p>
              <p className="mt-1 text-[11px] text-slate-500 sm:text-xs">
                Your school information in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ module }) {
  const Icon = module.icon;
  const styles = colorStyles[module.color] || colorStyles.blue;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/5 sm:p-7">
      <div
        className={`absolute -right-12 -top-12 h-32 w-32 rounded-full bg-slate-50 transition duration-300 group-hover:scale-150 ${styles.glow}`}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 transition duration-300 group-hover:scale-105 ${styles.icon}`}
        >
          <Icon size={25} strokeWidth={1.8} />
        </div>

        <span className="rounded-full bg-slate-50 px-3 py-1.5 text-[11px] font-semibold text-slate-500">
          {module.category}
        </span>
      </div>

      <h3 className="relative mt-6 text-lg font-bold tracking-tight text-slate-900">
        {module.title}
      </h3>

      <p className="relative mt-3 flex-1 text-sm leading-6 text-slate-500">
        {module.description}
      </p>

      <div className="relative mt-5 space-y-2.5 border-t border-slate-100 pt-5">
        {module.features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-2.5 text-xs font-medium text-slate-600"
          >
            <CheckCircle2 size={15} className="shrink-0 text-emerald-500" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <div className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <span className="text-xs font-semibold text-slate-400">
          Module {String(module.id).padStart(2, "0")}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
          <ArrowUpRight size={17} />
        </div>
      </div>
    </article>
  );
}

export default function Modules() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Modules");

  const filteredModules = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return modules.filter((module) => {
      const matchesCategory =
        activeCategory === "All Modules" ||
        module.category === activeCategory;

      const searchableText = [
        module.title,
        module.description,
        module.category,
        ...module.features,
      ]
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(query);
    });
  }, [searchTerm, activeCategory]);

  const resetFilters = () => {
    setSearchTerm("");
    setActiveCategory("All Modules");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-slate-950">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="absolute -right-20 top-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] bg-[size:30px_30px]" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-12 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-blue-200">
              <Sparkles size={15} />
              ALL-IN-ONE SCHOOL MANAGEMENT
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </div>

            <h1 className="text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Everything your school needs.
              <span className="mt-2 block bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-400 bg-clip-text text-transparent">
                One smart platform.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              Simplify daily school operations with connected tools for
              students, academics, attendance, fees, examinations and
              communication — all in one place.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
              >
                Get Started
                <ArrowRight size={17} />
              </Link>

              <a
                href="#school-modules"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Modules
                <ChevronRight size={17} />
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-slate-300 sm:text-sm">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Connected modules
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Easy workflows
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                Role-based access
              </span>
            </div>
          </div>

          <DashboardPreview />
        </div>

        <div className="border-t border-white/10 bg-white/[0.03]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-5 py-6 sm:px-8 md:grid-cols-4 lg:px-10">
            {[
              { value: "12", label: "Management modules" },
              { value: "01", label: "Connected platform" },
              { value: "360°", label: "School overview" },
              { value: "24/7", label: "Access to information" },
            ].map((item) => (
              <div key={item.label} className="text-center sm:text-left">
                <p className="text-2xl font-bold text-white sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section
        id="school-modules"
        className="scroll-mt-20 bg-slate-50/70 px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Platform Modules"
            title="A smarter way to manage your school"
            description="Explore the tools that bring your school's everyday operations together in one organized platform."
          />

          {/* SEARCH AND FILTER */}
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full lg:max-w-sm">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search modules or features..."
                  aria-label="Search modules"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-11 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-200 hover:text-slate-700"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = activeCategory === category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-xl px-3.5 py-2.5 text-xs font-semibold transition sm:text-sm ${
                        isActive
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                          : "border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                      }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <p className="text-xs text-slate-500 sm:text-sm">
                Showing{" "}
                <span className="font-bold text-slate-900">
                  {filteredModules.length}
                </span>{" "}
                of {modules.length} modules
              </p>

              {(searchTerm || activeCategory !== "All Modules") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 sm:text-sm"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* MODULE GRID */}
          {filteredModules.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
              {filteredModules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                <Search size={24} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                No modules found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try another keyword or select a different category.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Simple Workflow"
            title="Everything works together"
            description="A clear workflow helps administrators, teachers and families access the information relevant to them."
          />

          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Manage",
                subtitle: "School Administration",
                description:
                  "Organize students, staff, classes, fees and daily school operations.",
                icon: LayoutDashboard,
                color: "bg-blue-50 text-blue-600",
              },
              {
                step: "02",
                title: "Track",
                subtitle: "Academics & Progress",
                description:
                  "Maintain attendance, timetables, examinations and academic records.",
                icon: BarChart3,
                color: "bg-violet-50 text-violet-600",
              },
              {
                step: "03",
                title: "Connect",
                subtitle: "Parents & Students",
                description:
                  "Share relevant results, fee information, notices and school updates.",
                icon: Smartphone,
                color: "bg-emerald-50 text-emerald-600",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.step}
                  className="relative rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg sm:p-8"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color}`}
                    >
                      <Icon size={23} />
                    </div>

                    <span className="text-3xl font-bold text-slate-100">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm font-semibold text-blue-600">
                    {item.subtitle}
                  </p>

                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-slate-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700">
              <Zap size={14} />
              Designed for Schools
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Less manual work.
              <span className="mt-1 block text-blue-600">
                More organized management.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-500">
              Keep important school information organized and make everyday
              processes easier for your team with a unified management system.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  title: "Centralized information",
                  description:
                    "Keep school records organized instead of scattered across different files.",
                },
                {
                  title: "Role-based access",
                  description:
                    "Provide relevant information and tools based on each user's role and permissions.",
                },
                {
                  title: "Clearer reporting",
                  description:
                    "Review attendance, fees and academic information through organized reports.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200">
                    <CheckCircle2 size={20} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-blue-100/70 blur-2xl" />

            <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-6 text-white shadow-xl sm:p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <p className="text-sm font-semibold text-slate-300">
                    Platform Overview
                  </p>
                  <p className="mt-2 text-2xl font-bold">One connected system</p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-300">
                  <ShieldCheck size={25} />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  {
                    icon: Users,
                    title: "School Administration",
                    detail: "Students, staff & classes",
                  },
                  {
                    icon: BookOpen,
                    title: "Academic Management",
                    detail: "Attendance, exams & results",
                  },
                  {
                    icon: Wallet,
                    title: "Fees & Finance",
                    detail: "Payments, dues & records",
                  },
                  {
                    icon: MessageSquare,
                    title: "Communication",
                    detail: "Notices & school updates",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:bg-white/[0.08]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-300">
                        <Icon size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold">{item.title}</p>
                        <p className="mt-1 text-xs text-slate-400">
                          {item.detail}
                        </p>
                      </div>

                      <CheckCircle2
                        size={18}
                        className="shrink-0 text-emerald-400"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-blue-600/15 p-4">
                <Clock3 size={20} className="shrink-0 text-blue-300" />
                <p className="text-xs leading-5 text-slate-300 sm:text-sm">
                  Keep everyday school processes organized with a unified
                  management workflow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-blue-600 px-6 py-12 text-center sm:px-12 sm:py-16 lg:px-20">
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-32 -right-20 h-72 w-72 rounded-full bg-indigo-400/20 blur-2xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white">
              <GraduationCap size={28} />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to simplify school management?
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
              Explore a more organized way to manage academics, administration
              and school communication.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/register"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Get Started
                <ArrowRight size={17} />
              </Link>

              <Link
                to="/features"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Explore Features
                <ArrowUpRight size={17} />
              </Link>
            </div>

            <p className="mt-5 text-xs text-blue-100/80">
              Built to bring your school&apos;s everyday operations together.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
