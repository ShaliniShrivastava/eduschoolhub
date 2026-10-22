
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  FileBarChart,
  GraduationCap,
  IndianRupee,
  BellRing,
  ShieldCheck,
  Sparkles,
  Users,
  UserRoundCheck,
  Wallet,
  Clock3,
  TrendingUp,
  Laptop,
  Megaphone,
  BookMarked,
  School,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    number: "01",
    icon: Users,
    title: "Student Management",
    description:
      "Manage student profiles, admission details, class allocation and academic records from one organized dashboard.",
    tags: ["Student profiles", "Admissions", "Class records"],
    color: "blue",
  },
  {
    number: "02",
    icon: UserRoundCheck,
    title: "Attendance Management",
    description:
      "Record daily attendance, monitor absences and review class-wise attendance reports with less manual effort.",
    tags: ["Daily attendance", "Class reports", "Absence tracking"],
    color: "violet",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Exams & Results",
    description:
      "Organize examinations, enter marks, calculate percentages and generate student result reports efficiently.",
    tags: ["Exam records", "Marks entry", "Result reports"],
    color: "emerald",
  },
  {
    number: "04",
    icon: Wallet,
    title: "Fees Management",
    description:
      "Maintain fee structures, record payments, track pending dues and keep student fee information accessible.",
    tags: ["Fee records", "Payment tracking", "Due reports"],
    color: "amber",
  },
  {
    number: "05",
    icon: GraduationCap,
    title: "Teacher & Staff Management",
    description:
      "Keep staff profiles, assigned responsibilities and relevant school records organized in one place.",
    tags: ["Staff profiles", "Responsibilities", "Records"],
    color: "indigo",
  },
  {
    number: "06",
    icon: CalendarDays,
    title: "Timetable Management",
    description:
      "Organize class schedules, subject periods and teacher assignments for a better daily academic routine.",
    tags: ["Class timetable", "Subject periods", "Schedules"],
    color: "cyan",
  },
  {
    number: "07",
    icon: Laptop,
    title: "Parent & Student Portal",
    description:
      "Give parents and students convenient access to relevant academic information through a shared portal and login.",
    tags: ["Academic progress", "Attendance", "Fee details"],
    color: "pink",
  },
  {
    number: "08",
    icon: Megaphone,
    title: "Notices & Notifications",
    description:
      "Share important school announcements, examination updates and reminders with the relevant users.",
    tags: ["School notices", "Announcements", "Reminders"],
    color: "orange",
  },
  {
    number: "09",
    icon: FileBarChart,
    title: "Reports & Analytics",
    description:
      "Review attendance summaries, examination results, fee collections and other important school records.",
    tags: ["Academic reports", "Fee summaries", "Attendance data"],
    color: "teal",
  },
  {
    number: "10",
    icon: TrendingUp,
    title: "Student Promotion",
    description:
      "Prepare students for the next academic session and manage class promotion based on school-defined results and rules.",
    tags: ["Next session", "Class allocation", "Promotion records"],
    color: "rose",
  },
  {
    number: "11",
    icon: BookOpen,
    title: "Classes & Subjects",
    description:
      "Organize academic sessions, classes, sections and subjects to keep academic information structured.",
    tags: ["Academic sessions", "Sections", "Subjects"],
    color: "blue",
  },
  {
    number: "12",
    icon: ShieldCheck,
    title: "Role-Based Access",
    description:
      "Keep school information organized with separate permissions for administrators, staff and student portal users.",
    tags: ["Access control", "User roles", "Data organization"],
    color: "violet",
  },
];

const colorStyles = {
  blue: {
    icon: "bg-blue-50 text-blue-700 ring-blue-100",
    number: "text-blue-600",
    hover: "group-hover:border-blue-200",
  },
  violet: {
    icon: "bg-violet-50 text-violet-700 ring-violet-100",
    number: "text-violet-600",
    hover: "group-hover:border-violet-200",
  },
  emerald: {
    icon: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    number: "text-emerald-600",
    hover: "group-hover:border-emerald-200",
  },
  amber: {
    icon: "bg-amber-50 text-amber-700 ring-amber-100",
    number: "text-amber-600",
    hover: "group-hover:border-amber-200",
  },
  indigo: {
    icon: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    number: "text-indigo-600",
    hover: "group-hover:border-indigo-200",
  },
  cyan: {
    icon: "bg-cyan-50 text-cyan-700 ring-cyan-100",
    number: "text-cyan-600",
    hover: "group-hover:border-cyan-200",
  },
  pink: {
    icon: "bg-pink-50 text-pink-700 ring-pink-100",
    number: "text-pink-600",
    hover: "group-hover:border-pink-200",
  },
  orange: {
    icon: "bg-orange-50 text-orange-700 ring-orange-100",
    number: "text-orange-600",
    hover: "group-hover:border-orange-200",
  },
  teal: {
    icon: "bg-teal-50 text-teal-700 ring-teal-100",
    number: "text-teal-600",
    hover: "group-hover:border-teal-200",
  },
  rose: {
    icon: "bg-rose-50 text-rose-700 ring-rose-100",
    number: "text-rose-600",
    hover: "group-hover:border-rose-200",
  },
};

function SectionLabel({ children }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
      <Sparkles size={14} />
      {children}
    </div>
  );
}

function FeatureCard({ feature }) {
  const Icon = feature.icon;
  const styles = colorStyles[feature.color];

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 sm:p-7 ${styles.hover}`}
    >
      <div className="mb-6 flex items-start justify-between">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-105 ${styles.icon}`}
        >
          <Icon size={23} strokeWidth={1.8} />
        </div>

        <span className={`text-sm font-extrabold tracking-widest ${styles.number}`}>
          {feature.number}
        </span>
      </div>

      <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900">
        {feature.title}
      </h3>

      <p className="mb-6 flex-1 text-sm leading-7 text-slate-600">
        {feature.description}
      </p>

      <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-5">
        {feature.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-slate-50 px-2.5 py-1.5 text-[11px] font-semibold text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function Features() {
  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-slate-100 bg-slate-50">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-indigo-200/30 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "radial-gradient(#1e40af 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10 lg:py-28">
          <div>
            <SectionLabel>Everything in one place</SectionLabel>

            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.13] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Powerful Features for
              <span className="mt-2 block text-blue-600">
                Smarter Schools.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Simplify daily school operations with a centralized platform
              for student records, attendance, examinations, fees and
              academic management.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700"
              >
                Book a Demo
                <ArrowRight size={18} />
              </a>

              <a
                href="#all-features"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Explore Features
                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-600" />
                Organized school records
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 size={17} className="text-emerald-600" />
                Role-based access
              </span>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-200/50 via-indigo-100/30 to-transparent blur-2xl" />

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10">
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
                    <School size={21} />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900">
                      School Overview
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Academic dashboard preview
                    </p>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">
                  Overview
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 p-5">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                    <Users size={19} />
                  </div>
                  <p className="text-xs font-medium text-slate-500">
                    Student Records
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-slate-900">
                    Organized
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Student information
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                    <ClipboardCheck size={19} />
                  </div>
                  <p className="text-xs font-medium text-slate-500">
                    Attendance
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-slate-900">
                    Daily
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Class-wise tracking
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <BookMarked size={19} />
                  </div>
                  <p className="text-xs font-medium text-slate-500">
                    Examinations
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-slate-900">
                    Results
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Academic records
                  </p>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <IndianRupee size={19} />
                  </div>
                  <p className="text-xs font-medium text-slate-500">
                    Fee Records
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-slate-900">
                    Tracking
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Payments and dues
                  </p>
                </div>
              </div>

              <div className="mx-5 mb-5 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-700 shadow-sm">
                    <BellRing size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      School updates in one place
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-600">
                      Access relevant records, announcements and reports
                      through an organized school management experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 shadow-xl sm:flex sm:-left-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                <ShieldCheck size={21} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">
                  Role-based access
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  Organized user permissions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Built for school operations</SectionLabel>

          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
            Everything Your School Needs,
            <span className="text-blue-600"> Simplified.</span>
          </h2>

          <p className="mt-5 text-base leading-8 text-slate-600">
            Bring everyday academic and administrative tasks together.
            EduSchoolHub is designed to help schools keep information
            structured, accessible and easier to manage.
          </p>
        </div>
      </section>

      {/* All Features */}
      <section
        id="all-features"
        className="scroll-mt-24 bg-slate-50 px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <SectionLabel>Platform capabilities</SectionLabel>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Explore Our Features
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Practical tools for managing students, staff, academics
                and essential school operations.
              </p>
            </div>

            <p className="text-sm font-semibold text-slate-500">
              {features.length} essential feature areas
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={feature.number} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionLabel>Designed for clarity</SectionLabel>

            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-4xl">
              Less manual work.
              <span className="block text-blue-600">
                Better organized operations.
              </span>
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Keep important school information organized and make
              routine tasks easier to manage with a centralized platform.
            </p>

            <div className="mt-8 space-y-5">
              {[
                {
                  title: "One organized platform",
                  description:
                    "Keep student, staff and academic records together.",
                },
                {
                  title: "Information for the right users",
                  description:
                    "Provide relevant access according to each user's role.",
                },
                {
                  title: "Clearer academic tracking",
                  description:
                    "Review attendance, examination results and student progress.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <CheckCircle2 size={19} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
                  <School size={23} />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900">
                    School Management
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Connected school operations
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-5">
                {[
                  {
                    icon: Users,
                    title: "Student records",
                    subtitle: "Profiles and class details",
                  },
                  {
                    icon: Clock3,
                    title: "Daily attendance",
                    subtitle: "Class-wise attendance records",
                  },
                  {
                    icon: BookOpen,
                    title: "Academic results",
                    subtitle: "Marks and result reports",
                  },
                  {
                    icon: Wallet,
                    title: "Fee management",
                    subtitle: "Payments and outstanding dues",
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 p-3.5 transition hover:border-blue-100 hover:bg-blue-50/40"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
                        <Icon size={19} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-slate-900">
                          {item.title}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {item.subtitle}
                        </p>
                      </div>
                      <CheckCircle2
                        size={18}
                        className="shrink-0 text-emerald-600"
                      />
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-xl bg-slate-900 p-4 text-white">
                <p className="text-sm font-bold">
                  A clearer view of school operations
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-300">
                  Keep essential information easy to find and manage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-16 sm:px-8 sm:pb-24 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-800 px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
          <div className="absolute -right-20 -top-28 h-72 w-72 rounded-full border-[40px] border-white/5" />
          <div className="absolute -bottom-32 right-1/3 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-blue-50">
                <Sparkles size={14} />
                Take the next step
              </div>

              <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                Ready to Simplify Your School Management?
              </h2>

              <p className="mt-4 max-w-xl leading-7 text-blue-100">
                Discover how EduSchoolHub can bring your school's
                everyday operations into one organized platform.
              </p>
            </div>

            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
              <a
                href="/#contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-blue-700 transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Book a Demo
                <ArrowRight size={18} />
              </a>

              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Back to Home
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
