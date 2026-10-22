
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Layers3,
  LifeBuoy,
  LockKeyhole,
  MonitorSmartphone,
  School,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  BellRing,
  BarChart3,
  Target,
  Workflow,
  MoveUpRight,
} from "lucide-react";

const platformHighlights = [
  {
    icon: Users,
    title: "Student Management",
    description:
      "Keep student records, classes and essential academic information organized in one place.",
    tone: "blue",
  },
  {
    icon: ClipboardCheck,
    title: "Attendance & Academics",
    description:
      "Organize daily attendance, examinations, marks and academic records.",
    tone: "emerald",
  },
  {
    icon: Wallet,
    title: "Fee Management",
    description:
      "Maintain fee records and payment information through a structured workflow.",
    tone: "violet",
  },
  {
    icon: BellRing,
    title: "School Communication",
    description:
      "Keep notices and important school updates organized for relevant users.",
    tone: "amber",
  },
  {
    icon: BarChart3,
    title: "Reports & Records",
    description:
      "Review essential school information through clear, organized reports.",
    tone: "indigo",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Access",
    description:
      "Keep responsibilities separate for administrators, teachers and students.",
    tone: "rose",
  },
];

const roles = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Super Admin",
    label: "Platform management",
    description:
      "A central workspace for overseeing the platform and its registered schools.",
    points: [
      "Manage registered schools",
      "Configure subscription plans",
      "Manage platform settings",
    ],
  },
  {
    number: "02",
    icon: School,
    title: "School Admin",
    label: "School operations",
    description:
      "A dedicated workspace for managing everyday school activities and records.",
    points: [
      "Manage students, classes and staff",
      "Manage attendance and fees",
      "Manage exams, timetable and reports",
    ],
  },
  {
    number: "03",
    icon: Users,
    title: "Teacher & Staff",
    label: "Everyday responsibilities",
    description:
      "A focused workspace for authorized staff to perform their assigned tasks.",
    points: [
      "Access assigned responsibilities",
      "Manage relevant academic records",
      "Support daily school activities",
    ],
  },
  {
    number: "04",
    icon: GraduationCap,
    title: "Student",
    label: "Academic information",
    description:
      "A simple portal for viewing academic information published by the school.",
    points: [
      "View available academic details",
      "Check published results",
      "Read school notices",
    ],
  },
];

const workflowSteps = [
  {
    number: "01",
    title: "Set up your school",
    description:
      "Organize school information, academic sessions, classes and sections.",
    icon: School,
  },
  {
    number: "02",
    title: "Assign roles",
    description:
      "Give each user access appropriate to their school responsibilities.",
    icon: LockKeyhole,
  },
  {
    number: "03",
    title: "Manage daily work",
    description:
      "Organize attendance, academics, fees and other supported activities.",
    icon: Workflow,
  },
  {
    number: "04",
    title: "Review records",
    description:
      "Use available reports and records to review school activities.",
    icon: BarChart3,
  },
];

const principles = [
  {
    icon: Target,
    title: "Simplicity first",
    description:
      "Useful school software should make everyday work easier, not more complicated.",
  },
  {
    icon: Layers3,
    title: "Organized by role",
    description:
      "Give each user a clear workspace with the tools relevant to their work.",
  },
  {
    icon: MonitorSmartphone,
    title: "Responsive experience",
    description:
      "Keep the interface convenient across desktop, tablet and mobile screens.",
  },
  {
    icon: LifeBuoy,
    title: "School-focused",
    description:
      "Build workflows around practical academic and administrative needs.",
  },
];

const faqs = [
  {
    question: "What is EduSchoolHub?",
    answer:
      "EduSchoolHub is a school management platform designed to bring student information, attendance, examinations, fees, reports and administrative workflows into one connected system.",
  },
  {
    question: "Who can use EduSchoolHub?",
    answer:
      "The platform is designed around Super Admin, School Admin, Teacher and Staff, and Student roles. Each role has a different purpose and appropriate access.",
  },
  {
    question: "Can EduSchoolHub manage multiple schools?",
    answer:
      "The platform is designed with a central Super Admin layer for managing registered schools. Available capabilities depend on the final implementation and subscription configuration.",
  },
  {
    question: "Can schools manage attendance and examinations?",
    answer:
      "The intended workflow includes attendance, examinations, marks, results and related records, depending on the modules enabled for the school.",
  },
  {
    question: "How can a school enquire about EduSchoolHub?",
    answer:
      "Schools can use the Book a Demo or Contact Us link to share their requirements and discuss the platform.",
  },
];

const toneClasses = {
  blue: "bg-blue-50 text-blue-700 ring-blue-100 group-hover:bg-blue-600 group-hover:text-white",
  emerald:
    "bg-emerald-50 text-emerald-700 ring-emerald-100 group-hover:bg-emerald-600 group-hover:text-white",
  violet:
    "bg-violet-50 text-violet-700 ring-violet-100 group-hover:bg-violet-600 group-hover:text-white",
  amber:
    "bg-amber-50 text-amber-700 ring-amber-100 group-hover:bg-amber-500 group-hover:text-white",
  indigo:
    "bg-indigo-50 text-indigo-700 ring-indigo-100 group-hover:bg-indigo-600 group-hover:text-white",
  rose: "bg-rose-50 text-rose-700 ring-rose-100 group-hover:bg-rose-600 group-hover:text-white",
};

function SectionHeading({ eyebrow, title, description, center = false }) {
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-700">
        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
        {eyebrow}
      </span>

      <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-[46px]">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

function DashboardPreview() {
  const tiles = [
    {
      icon: Users,
      label: "Student records",
      value: "Organized",
      detail: "Student information",
      tone: "bg-blue-50 text-blue-700",
    },
    {
      icon: ClipboardCheck,
      label: "Attendance",
      value: "Structured",
      detail: "Daily school records",
      tone: "bg-emerald-50 text-emerald-700",
    },
    {
      icon: BookOpen,
      label: "Academics",
      value: "Connected",
      detail: "Exams and results",
      tone: "bg-violet-50 text-violet-700",
    },
    {
      icon: LayoutDashboard,
      label: "Administration",
      value: "Centralized",
      detail: "Everyday workflows",
      tone: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[590px]">
      <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-blue-200/50 via-indigo-100/40 to-sky-200/40 blur-2xl" />

      <div className="absolute -right-3 top-12 h-24 w-24 rounded-full border border-blue-200/70 bg-white/50" />
      <div className="absolute -bottom-5 left-10 h-20 w-20 rounded-full border border-indigo-200/70 bg-white/50" />

      <div className="relative rounded-[1.75rem] border border-white/80 bg-white p-2 shadow-[0_28px_90px_-28px_rgba(30,64,175,0.28)]">
        <div className="overflow-hidden rounded-[1.3rem] border border-slate-100 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-600/20">
                <GraduationCap size={25} />
              </div>

              <div>
                <p className="text-sm font-bold tracking-tight text-slate-950">
                  EduSchoolHub
                </p>
                <p className="mt-0.5 text-xs text-slate-500">
                  School management
                </p>
              </div>
            </div>

            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-700">
              Platform overview
            </span>
          </div>

          <div className="p-4 sm:p-6">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  YOUR SCHOOL, CONNECTED
                </p>
                <h3 className="mt-1.5 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                  Everything in one place.
                </h3>
              </div>

              <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-400 sm:flex">
                <Layers3 size={21} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {tiles.map((tile) => {
                const Icon = tile.icon;

                return (
                  <div
                    key={tile.label}
                    className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition duration-300 hover:border-blue-100 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 sm:p-5"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${tile.tone}`}
                    >
                      <Icon size={20} />
                    </div>

                    <p className="mt-4 text-xs font-medium text-slate-500">
                      {tile.label}
                    </p>
                    <p className="mt-1.5 text-base font-bold text-slate-900 sm:text-lg">
                      {tile.value}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      {tile.detail}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-700 p-4 text-white sm:p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10">
                <ShieldCheck size={23} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold">
                  Designed around user roles
                </p>
                <p className="mt-1 text-xs leading-5 text-blue-100">
                  Relevant information for the right people.
                </p>
              </div>

              <ArrowUpRight className="hidden shrink-0 text-blue-100 sm:block" size={20} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-5 top-[35%] hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white/95 p-3.5 shadow-xl shadow-slate-900/5 backdrop-blur sm:flex">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <Check size={20} />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900">
            Clear workflows
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Organized daily tasks
          </p>
        </div>
      </div>

      <div className="absolute -right-4 bottom-12 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white/95 p-3.5 shadow-xl shadow-slate-900/5 backdrop-blur sm:flex">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
          <BarChart3 size={20} />
        </div>
        <div>
          <p className="text-xs font-bold text-slate-900">
            Better visibility
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            Reports and records
          </p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-slate-100 bg-gradient-to-b from-[#f3f7ff] via-white to-white px-4 pb-20 pt-16 sm:px-6 sm:pb-24 sm:pt-20 lg:px-10 lg:pb-28 lg:pt-24">
        <div className="pointer-events-none absolute -right-24 -top-28 -z-10 h-[26rem] w-[26rem] rounded-full bg-blue-200/30 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 left-[25%] -z-10 h-80 w-80 rounded-full bg-indigo-200/25 blur-[100px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.03fr_0.97fr] lg:gap-12">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-4 py-2 text-xs font-bold tracking-wide text-blue-700 shadow-sm shadow-blue-900/5 sm:text-sm">
              <Sparkles size={16} />
              ABOUT EDUSCHOOLHUB
            </div>

            <h1 className="mt-7 max-w-2xl text-[2.65rem] font-bold leading-[1.08] tracking-[-0.055em] text-slate-950 sm:text-5xl lg:text-[64px]">
              Bringing school management into{" "}
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-600 bg-clip-text text-transparent">
                one connected place.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              A more organized way to manage everyday school work.
              Bring student records, attendance, academics, fees and
              administration together in one connected platform.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/25"
              >
                Book a Demo
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                to="/modules"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-bold text-slate-700 transition duration-300 hover:border-blue-200 hover:bg-blue-50/60 hover:text-blue-700"
              >
                Explore Modules
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 border-t border-slate-200/80 pt-6 text-sm text-slate-600">
              {[
                "Organized workflows",
                "Role-based access",
                "Connected records",
              ].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <Check size={12} strokeWidth={3} />
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <DashboardPreview />
        </div>

        <div className="mx-auto mt-20 grid max-w-7xl grid-cols-2 gap-4 border-t border-slate-200/80 pt-8 sm:grid-cols-4 sm:gap-6">
          {[
            { value: "01", label: "Connected platform" },
            { value: "04", label: "Core user roles" },
            { value: "360°", label: "School workflows" },
            { value: "01", label: "Organized workspace" },
          ].map((item) => (
            <div key={item.label} className="py-2">
              <p className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                {item.value}
              </p>
              <p className="mt-1.5 text-xs font-medium text-slate-500 sm:text-sm">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Who we are */}
      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Who we are"
              title="Technology that understands school life."
              description="EduSchoolHub is being designed to bring essential school information and daily workflows into a structured digital environment."
            />

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
              Instead of handling records, academic activities and
              administration as disconnected tasks, the platform aims
              to make everyday responsibilities easier to organize
              and understand.
            </p>

            <Link
              to="/features"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:gap-3"
            >
              Discover what we offer
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: School,
                title: "For school management",
                text: "Organize student records, staff responsibilities and academic administration.",
                tone: "bg-blue-50 text-blue-700",
              },
              {
                icon: GraduationCap,
                title: "For students",
                text: "Provide access to relevant academic information and published updates.",
                tone: "bg-indigo-50 text-indigo-700",
              },
              {
                icon: Users,
                title: "For teachers & staff",
                text: "Keep assigned responsibilities and everyday school tasks organized.",
                tone: "bg-emerald-50 text-emerald-700",
              },
              {
                icon: LayoutDashboard,
                title: "For platform administration",
                text: "Support centralized oversight of schools and platform settings.",
                tone: "bg-amber-50 text-amber-700",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/[0.04] sm:p-7"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.tone} transition duration-300 group-hover:scale-105`}
                  >
                    <Icon size={24} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section className="relative isolate overflow-hidden bg-[#0b1530] px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[30rem] w-[30rem] rounded-full bg-blue-600/20 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-32 left-0 -z-10 h-80 w-80 rounded-full bg-indigo-600/15 blur-[100px]" />

        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-blue-200">
              <Target size={15} />
              Our purpose
            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-[-0.04em] sm:text-4xl lg:text-[48px]">
              Less scattered work.
              <span className="mt-1 block text-blue-300">
                More organized schools.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
              School teams manage many connected responsibilities
              every day. Our goal is to give those activities a clearer
              structure, with relevant information available to the
              people who need it.
            </p>

            <Link
              to="/features"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
            >
              Explore platform features
              <ArrowRight size={17} />
            </Link>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Bring information together",
                text: "Keep essential school records and workflows connected.",
              },
              {
                title: "Make responsibilities clearer",
                text: "Give each role a defined purpose and appropriate access.",
              },
              {
                title: "Make records easier to review",
                text: "Use available information to understand school activities.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="group flex gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:border-blue-400/30 hover:bg-white/[0.07] sm:p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-300/15 bg-blue-400/10 text-sm font-bold text-blue-200">
                  0{index + 1}
                </div>

                <div>
                  <h3 className="text-base font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">
                    {item.text}
                  </p>
                </div>

                <ArrowUpRight
                  size={18}
                  className="ml-auto mt-1 shrink-0 text-slate-500 transition group-hover:text-blue-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform capabilities */}
      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The platform"
            title="Everything essential. One connected platform."
            description="A structured way to organize the core activities that keep a school running."
            center
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {platformHighlights.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_55px_-25px_rgba(30,64,175,0.2)] sm:p-7"
                >
                  <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-blue-600 to-indigo-600 transition-transform duration-300 group-hover:scale-x-100" />

                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ring-1 transition duration-300 ${toneClasses[item.tone]}`}
                  >
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-bold text-blue-700 opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    Explore capabilities
                    <ArrowRight size={14} />
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/modules"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            >
              View all modules
              <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="border-y border-slate-100 bg-[#f7f9fd] px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Designed around users"
            title="Different roles. Clear responsibilities."
            description="Each user has a different purpose. Role-based workspaces help keep everyday tasks organized and access appropriately separated."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {roles.map((role) => {
              const Icon = role.icon;

              return (
                <article
                  key={role.number}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/[0.04] sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={24} />
                    </div>

                    <span className="text-4xl font-bold tracking-tight text-slate-100 transition group-hover:text-blue-100">
                      {role.number}
                    </span>
                  </div>

                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.15em] text-blue-700">
                    {role.label}
                  </p>

                  <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
                    {role.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {role.description}
                  </p>

                  <ul className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                    {role.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-3 text-sm leading-6 text-slate-700"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How it works"
            title="A clear path to organized school operations."
            description="A simple workflow for setting up school information, assigning responsibilities and managing daily activities."
            center
          />

          <div className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.number}
                  className="relative rounded-2xl border border-slate-200/80 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-900/[0.04] sm:p-7"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                      <Icon size={23} />
                    </div>
                    <span className="text-3xl font-bold tracking-tight text-slate-200">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-lg font-bold tracking-tight text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>

                  {index < workflowSteps.length - 1 && (
                    <div className="absolute -right-3 top-12 z-10 hidden h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 lg:flex">
                      <ArrowRight size={13} />
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-slate-100 bg-slate-50/80 px-4 py-20 sm:px-6 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Our approach"
            title="Thoughtfully designed around real school needs."
            description="The focus is on a practical, understandable experience rather than unnecessary complexity."
            center
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-slate-900/[0.04]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-base font-bold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 sm:px-6 sm:py-24 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <BookOpen size={24} />
            </div>

            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-[-0.04em] text-slate-950 sm:text-4xl">
              A few things you may want to know.
            </h2>

            <p className="mt-5 max-w-md text-base leading-8 text-slate-600">
              Learn more about EduSchoolHub, its users and the way
              the platform is intended to support school workflows.
            </p>

            <Link
              to="/#contact"
              className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-blue-700 transition hover:gap-3"
            >
              Have another question?
              <MoveUpRight size={17} />
            </Link>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-2xl border bg-white transition duration-300 ${
                    isOpen
                      ? "border-blue-200 shadow-lg shadow-blue-900/[0.04]"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                  >
                    <span className="text-sm font-bold leading-6 text-slate-900 sm:text-base">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition ${
                        isOpen
                          ? "rotate-180 bg-blue-50 text-blue-700"
                          : "bg-slate-50 text-slate-500"
                      }`}
                    >
                      <ChevronDown size={17} />
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
      <section className="px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-800 px-6 py-14 shadow-2xl shadow-blue-900/15 sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full border-[50px] border-white/[0.06]" />
          <div className="pointer-events-none absolute -bottom-36 left-[20%] h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-blue-50 sm:text-sm">
              <GraduationCap size={17} />
              Discover EduSchoolHub
            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
              Let's make school management more organized.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">
              Explore the platform and discover a more structured
              approach to your school's everyday work.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-blue-700 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50"
              >
                Book a Demo
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition duration-300 hover:bg-white/15"
              >
                View Pricing
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
