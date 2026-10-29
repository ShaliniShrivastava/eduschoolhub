import { useEffect, useState } from "react";
import BookDemoForm from "../main-website-components/BookDemoForm";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  Menu,
  School,
  ShieldCheck,
  Sparkles,
  Users,
  Wallet,
  BarChart3,
  Bell,
  UserRound,
  Layers3,
  X,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const defaultContent = {
  brand: "EduSchoolHub",
  tagline: "ALL-IN-ONE SCHOOL MANAGEMENT PLATFORM",
  title: "Smart School Management",
  highlight: "for Modern Institutions",
  description:
    "Manage students, staff, fees, attendance and academic activities through one organized platform built for modern schools.",
  primaryButton: "Explore Plans",
  secondaryButton: "Book a Demo",

  stats: [
    { value: "One", label: "Connected Platform" },
    { value: "Simple", label: "Daily Workflows" },
    { value: "Secure", label: "Role-Based Access" },
  ],

  features: [
    {
      icon: "▦",
      title: "Multi-School Management",
      description:
        "Manage school accounts, configurations and operations through a centralized platform.",
    },
    {
      icon: "▣",
      title: "Attendance Management",
      description:
        "Record daily attendance and keep student attendance information organized.",
    },
    {
      icon: "▤",
      title: "Exams & Results",
      description:
        "Manage examinations, marks, grades and academic performance reports.",
    },
    {
      icon: "◉",
      title: "Parent Communication",
      description:
        "Share school notices and important updates with parents and students.",
    },
    {
      icon: "♟",
      title: "Student & Staff Management",
      description:
        "Maintain student profiles, teacher details, classes and staff records.",
    },
    {
      icon: "▥",
      title: "Reports & Analytics",
      description:
        "Review school records and academic information to support better decisions.",
    },
  ],

  modules: [
    {
      icon: "♙",
      title: "Admissions",
      description: "Organize student enrolments and student profiles.",
    },
    {
      icon: "🎓",
      title: "Academics",
      description: "Manage sessions, classes, subjects and examinations.",
    },
    {
      icon: "₹",
      title: "Fees & Finance",
      description: "Maintain fee structures, payments and fee records.",
    },
    {
      icon: "♧",
      title: "Staff Management",
      description: "Organize teacher and staff information.",
    },
    {
      icon: "✉",
      title: "Communication",
      description: "Share notices and important school announcements.",
    },
    {
      icon: "▥",
      title: "Reports & Results",
      description: "Review attendance and academic performance.",
    },
  ],

  plans: [
    {
      name: "Basic",
      description: "For schools starting their digital journey",
      price: "₹999",
      period: "/month",
      items: [
        "Student management",
        "Attendance tracking",
        "Basic reports",
      ],
    },
    {
      name: "Professional",
      description: "For growing educational institutions",
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
      description: "For larger schools and school groups",
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

const primaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-blue-700";

const secondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700";

const sectionTitle =
  "text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[42px] lg:leading-tight";

const iconMap = {
  "▦": LayoutDashboard,
  "▣": CalendarCheck,
  "▤": BookOpen,
  "◉": Bell,
  "♟": Users,
  "▥": BarChart3,
  "♙": GraduationCap,
  "🎓": GraduationCap,
  "₹": Wallet,
  "♧": Users,
  "✉": Bell,
};

const bannerSlides = [
  {
    eyebrow: "SMART SCHOOL MANAGEMENT",
    title: "One Platform. Every School Need.",
    description:
      "Manage students, staff, fees, attendance and academic activities through one organized platform.",
    button: "Explore Features",
    target: "features",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=85",
  },
  {
    eyebrow: "SIMPLIFY YOUR DAILY WORK",
    title: "Make School Management Simpler.",
    description:
      "Bring everyday school operations together with smarter digital workflows.",
    button: "Explore Modules",
    target: "modules",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=85",
  },
  {
    eyebrow: "DISCOVER EDUSCHOOLHUB",
    title: "The Right Tools for Modern Schools.",
    description:
      "Explore a connected platform for school administrators, teachers and families.",
    button: "Book a Demo",
    target: "book-demo",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1800&q=85",
  },
];

const latestNews = [
  "Welcome to EduSchoolHub — your connected school management platform.",
  "Explore features for attendance, examinations, fees and student records.",
  "Want to see EduSchoolHub in action? Book a demo with our team.",
];

function BannerCarousel({ onNavigate }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % bannerSlides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  const previous = () =>
    setActive(
      (current) => (current - 1 + bannerSlides.length) % bannerSlides.length
    );

  const next = () =>
    setActive((current) => (current + 1) % bannerSlides.length);

  const slide = bannerSlides[active];

  return (
    <section
      aria-label="EduSchoolHub featured banners"
      className="px-4 pt-5 sm:px-8 lg:px-10"
    >
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-900 shadow-xl">
        {bannerSlides.map((item, index) => (
          <div
            key={item.title}
            aria-hidden={index !== active}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url("${item.image}")` }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/15" />

        <div
          key={active}
          className="relative flex min-h-[390px] items-center px-6 py-14 sm:min-h-[450px] sm:px-12 lg:min-h-[490px] lg:px-16"
        >
          <div className="max-w-2xl text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-2 text-[10px] font-bold tracking-[0.16em] sm:text-xs">
              <Sparkles size={14} />
              {slide.eyebrow}
            </span>

            <h2 className="mt-6 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              {slide.title}
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
              {slide.description}
            </p>

            <button
              type="button"
              onClick={() => onNavigate(slide.target)}
              className="mt-7 inline-flex min-h-12 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              {slide.button}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous banner"
          onClick={previous}
          className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur transition hover:bg-black/50 sm:left-5 sm:h-12 sm:w-12"
        >
          <ChevronLeft size={23} />
        </button>

        <button
          type="button"
          aria-label="Next banner"
          onClick={next}
          className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/25 text-white backdrop-blur transition hover:bg-black/50 sm:right-5 sm:h-12 sm:w-12"
        >
          <ChevronRight size={23} />
        </button>

        <div className="absolute bottom-5 left-0 right-0 z-10 flex justify-center gap-2">
          {bannerSlides.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Show banner ${index + 1}`}
              aria-current={active === index ? "true" : undefined}
              onClick={() => setActive(index)}
              className={`h-2.5 rounded-full transition-all ${
                active === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function LatestNewsMarquee() {
  return (
    <section
      aria-label="Latest EduSchoolHub news"
      className="px-4 pt-4 sm:px-8 lg:px-10"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 overflow-hidden rounded-xl border border-blue-100 bg-blue-50 px-3 py-3 sm:px-5">
        <div className="flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-2.5 py-2 text-white sm:px-3">
          <Megaphone size={16} />
          <span className="text-[10px] font-extrabold tracking-wider sm:text-xs">
            LATEST NEWS
          </span>
        </div>

        <div className="min-w-0 flex-1 overflow-hidden text-sm font-medium text-slate-700">
          <marquee
            direction="left"
            behavior="scroll"
            scrollAmount={5}
            onMouseEnter={(event) => event.currentTarget.stop()}
            onMouseLeave={(event) => event.currentTarget.start()}
            aria-label="Scrolling latest news"
          >
            {latestNews.map((news, index) => (
              <span
                key={news}
                className="mx-5 inline-flex items-center gap-3"
              >
                {index > 0 && <span className="text-blue-500">◆</span>}
                <span>{news}</span>
              </span>
            ))}
          </marquee>
        </div>
      </div>
    </section>
  );
}

function SectionBadge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-2 text-[11px] font-bold tracking-[0.12em] text-blue-700 sm:text-xs">
      <Sparkles size={14} />
      {children}
    </span>
  );
}

function SectionHeading({ badge, title, description }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <SectionBadge>{badge}</SectionBadge>

      <h2 className={`${sectionTitle} mt-5`}>{title}</h2>

      {description && (
        <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

function DashboardPreview({ brand }) {
  const navigation = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Users, label: "Students" },
    { icon: GraduationCap, label: "Teachers" },
    { icon: CalendarCheck, label: "Attendance" },
    { icon: Wallet, label: "Fees" },
    { icon: BookOpen, label: "Examinations" },
  ];

  const overview = [
    {
      icon: Users,
      title: "Students",
      text: "Student records",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: CalendarCheck,
      title: "Attendance",
      text: "Daily tracking",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: BookOpen,
      title: "Examinations",
      text: "Marks & results",
      color: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-5 rounded-[35px] bg-gradient-to-br from-blue-200/60 via-indigo-100/40 to-violet-200/60 blur-2xl" />

      <div className="absolute -right-5 top-12 h-32 w-32 rounded-full bg-blue-200/50 blur-3xl" />

      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/10 sm:rounded-3xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
              <School size={21} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">{brand}</p>
              <p className="mt-0.5 text-xs text-slate-500">
                School management
              </p>
            </div>
          </div>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-500">
            <Bell size={17} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[138px_minmax(0,1fr)]">
          <aside className="hidden border-r border-slate-100 bg-slate-50/80 p-3 sm:block">
            <p className="mb-3 px-2 text-[10px] font-bold tracking-[0.15em] text-slate-400">
              MAIN MENU
            </p>

            {navigation.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className={`mb-1 flex items-center gap-2 rounded-lg px-2.5 py-2.5 text-[11px] font-medium ${
                    index === 0
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-500"
                  }`}
                >
                  <Icon size={15} />
                  {item.label}
                </div>
              );
            })}

            <div className="mt-5 rounded-xl border border-blue-100 bg-white p-3">
              <ShieldCheck size={20} className="text-blue-600" />

              <p className="mt-2 text-xs font-bold text-slate-800">
                Role-based access
              </p>

              <p className="mt-1 text-[10px] leading-4 text-slate-500">
                Relevant tools for each user.
              </p>
            </div>
          </aside>

          <div className="min-w-0 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-blue-600">
                  SCHOOL OVERVIEW
                </p>

                <h3 className="mt-1.5 text-lg font-extrabold text-slate-900">
                  Your school, organized.
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Manage essential activities in one place.
                </p>
              </div>

              <span className="rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-semibold text-emerald-700">
                <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Dashboard preview
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {overview.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-xl border border-slate-100 bg-white p-3"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.color}`}
                    >
                      <Icon size={18} />
                    </div>

                    <p className="mt-3 text-xs font-bold text-slate-800">
                      {item.title}
                    </p>

                    <p className="mt-1 text-[10px] text-slate-500">
                      {item.text}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 rounded-xl border border-slate-100 p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Academic workflow
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    From daily records to results
                  </p>
                </div>

                <Layers3 size={20} className="text-blue-600" />
              </div>

              <div className="mt-4 space-y-3">
                {[
                  ["Student records", "Organized information"],
                  ["Attendance", "Daily tracking"],
                  ["Exams & results", "Academic progress"],
                ].map(([title, text]) => (
                  <div
                    key={title}
                    className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-3"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm">
                      <CheckCircle2 size={17} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-slate-800">
                        {title}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-500">
                        {text}
                      </p>
                    </div>

                    <ChevronRight size={16} className="text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-5 -left-2 hidden items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:flex">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Check size={21} />
        </div>

        <div>
          <p className="text-xs font-bold text-slate-900">
            One connected platform
          </p>

          <p className="mt-1 text-[11px] text-slate-500">
            Simplify everyday tasks
          </p>
        </div>
      </div>
    </div>
  );
}

function PortalCard({ icon: Icon, title, description, tone }) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 sm:p-7">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${tone}`}
      >
        <Icon size={23} />
      </div>

      <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>

      <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-600">
        <ShieldCheck size={16} />
        Role-based experience
      </div>
    </article>
  );
}

export default function Home() {
  const [content, setContent] = useState(defaultContent);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadSiteContent() {
      try {
        const response = await fetch(`${API_URL}/public/site-content`, {
          signal: controller.signal,
          credentials: "include",
        });

        if (!response.ok) return;

        const result = await response.json();
        const siteContent = result.content ?? result.data ?? result;

        setContent((previous) => ({
          ...previous,
          ...siteContent,
          stats: Array.isArray(siteContent.stats)
            ? siteContent.stats
            : previous.stats,
          features: Array.isArray(siteContent.features)
            ? siteContent.features
            : previous.features,
          modules: Array.isArray(siteContent.modules)
            ? siteContent.modules
            : previous.modules,
          plans: Array.isArray(siteContent.plans)
            ? siteContent.plans
            : previous.plans,
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
    setMobileMenuOpen(false);

    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const navigation = [
    { label: "Home", id: "home" },
    { label: "Features", id: "features" },
    { label: "Modules", id: "modules" },
    { label: "Pricing", id: "pricing" },
  ];

  return (
    <main
      id="home"
      className="min-h-screen overflow-hidden bg-white text-slate-800"
    >
      {/* Homepage banner slider */}
      <BannerCarousel onNavigate={scrollTo} />

      {/* Latest news ticker directly below the banners */}
      <LatestNewsMarquee />

      {/* Main platform introduction */}
      <section className="scroll-mt-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="mx-auto max-w-7xl px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-14 lg:px-10 lg:pb-24 lg:pt-20">
          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionBadge>{content.tagline}</SectionBadge>

              <h1 className="mt-7 max-w-2xl text-4xl leading-[1.13] font-extrabold tracking-tight text-slate-950 sm:text-5xl lg:text-[58px]">
                {content.title}

                <span className="mt-2 block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text pb-1 text-transparent">
                  {content.highlight}
                </span>
              </h1>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
                {content.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => scrollTo("pricing")}
                  className={`${primaryButton} w-full sm:w-auto`}
                >
                  {content.primaryButton}
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => scrollTo("book-demo")}
                  className={`${secondaryButton} w-full sm:w-auto`}
                >
                  {content.secondaryButton}
                  <ArrowUpRight size={17} />
                </button>
              </div>

              <div className="mt-9 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-slate-600 sm:text-sm">
                {[
                  "Organized school records",
                  "Role-based access",
                  "Simplified workflows",
                ].map((item) => (
                  <span key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600" />
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4 border-t border-blue-100 pt-7">
                {content.stats?.map((stat, index) => (
                  <div key={`${stat.label}-${index}`} className="min-w-0">
                    <strong className="block text-lg font-extrabold text-slate-900 sm:text-2xl">
                      {stat.value}
                    </strong>

                    <span className="mt-1.5 block text-[10px] leading-5 text-slate-500 sm:text-xs">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <DashboardPreview brand={content.brand} />
          </div>
        </div>
      </section>

      {/* Platform benefits */}
      <section className="border-y border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-3 px-5 py-7 sm:grid-cols-3 sm:px-8 lg:px-10">
          {[
            {
              icon: School,
              title: "School Operations",
              description: "Essential information in one place.",
            },
            {
              icon: Users,
              title: "Connected Roles",
              description: "Relevant tools for each user.",
            },
            {
              icon: ShieldCheck,
              title: "Structured Access",
              description: "Organized access to school information.",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="flex items-center gap-4 rounded-xl p-3"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon size={23} />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-500 sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="POWERFUL FEATURES"
            title="Everything Your School Needs, in One Place"
            description="Bring essential school activities together with a platform designed to make everyday management more organized and straightforward."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {content.features?.map((feature, index) => {
              const Icon = iconMap[feature.icon] || Layers3;

              return (
                <article
                  key={`${feature.title}-${index}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-950/5 sm:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                    <Icon size={23} />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.description}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-blue-600">
                    Explore the platform

                    <ArrowRight
                      size={15}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="bg-slate-50 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionBadge>SIMPLER DAILY WORKFLOWS</SectionBadge>

            <h2 className={`${sectionTitle} mt-5`}>
              Spend Less Time Managing Records
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
              Bring student information, daily attendance and academic
              assessments into an organized workflow, helping your school team
              work with greater clarity.
            </p>

            <div className="mt-8 space-y-6">
              {[
                {
                  number: "01",
                  title: "Organize school records",
                  description:
                    "Maintain student, teacher, class and subject information.",
                },
                {
                  number: "02",
                  title: "Manage daily activities",
                  description:
                    "Coordinate attendance, exams and school administration.",
                },
                {
                  number: "03",
                  title: "Review academic progress",
                  description:
                    "Keep marks, results and relevant reports organized.",
                },
              ].map((step) => (
                <div key={step.number} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 sm:p-8">
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <p className="text-xs font-bold tracking-wider text-blue-600">
                  ACADEMIC WORKFLOW
                </p>

                <h3 className="mt-2 text-xl font-extrabold text-slate-900">
                  From Records to Results
                </h3>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <GraduationCap size={25} />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {[
                {
                  icon: Users,
                  title: "Student records",
                  description: "Maintain student information",
                  tone: "bg-blue-50 text-blue-600",
                },
                {
                  icon: CalendarCheck,
                  title: "Attendance",
                  description: "Record daily attendance",
                  tone: "bg-emerald-50 text-emerald-600",
                },
                {
                  icon: ClipboardCheck,
                  title: "Examinations",
                  description: "Manage marks and assessments",
                  tone: "bg-violet-50 text-violet-600",
                },
                {
                  icon: BarChart3,
                  title: "Results & reports",
                  description: "Review academic performance",
                  tone: "bg-amber-50 text-amber-600",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={item.title}>
                    <div className="flex items-center gap-4 rounded-xl border border-slate-100 bg-white p-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${item.tone}`}
                      >
                        <Icon size={21} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-bold text-slate-900">
                          {item.title}
                        </h4>

                        <p className="mt-1 text-xs text-slate-500">
                          {item.description}
                        </p>
                      </div>

                      <CheckCircle2
                        size={18}
                        className="shrink-0 text-emerald-500"
                      />
                    </div>

                    {index < 3 && (
                      <div className="ml-9 h-3 border-l-2 border-dashed border-slate-200" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section
        id="modules"
        className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="ONE CONNECTED ECOSYSTEM"
            title="School Management, Simplified"
            description="Explore the key management areas that help bring your school's everyday operations together."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {content.modules?.map((module, index) => {
              const Icon = iconMap[module.icon] || Layers3;

              return (
                <article
                  key={`${module.title}-${index}`}
                  className="group flex gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:bg-blue-50/40 sm:p-6"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Icon size={22} />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900">
                      {module.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {module.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* User portals */}
      <section className="bg-slate-50 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="DESIGNED FOR EVERY ROLE"
            title="The Right Tools for Every User"
            description="Give administrators, teachers and families a focused experience based on the tasks and information relevant to them."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <PortalCard
              icon={LayoutDashboard}
              title="School Admin"
              description="Manage students, teachers, classes, attendance, fees and academic operations."
              tone="bg-blue-50 text-blue-600"
            />

            <PortalCard
              icon={GraduationCap}
              title="Teacher Portal"
              description="Access assigned classes, record attendance and manage student assessments."
              tone="bg-violet-50 text-violet-600"
            />

            <PortalCard
              icon={UserRound}
              title="Parent & Student"
              description="View relevant attendance, academic results and important school notices."
              tone="bg-emerald-50 text-emerald-600"
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="FLEXIBLE SUBSCRIPTIONS"
            title="Plans for Every School"
            description="Choose the subscription that fits your institution's requirements. Final pricing and plan features should match your configured subscription plans."
          />

          <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
            {content.plans?.map((plan, index) => (
              <article
                key={`${plan.name}-${index}`}
                className={`relative flex flex-col rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 sm:p-8 ${
                  plan.popular
                    ? "border-blue-600 bg-blue-50/50 shadow-xl shadow-blue-600/10"
                    : "border-slate-200 bg-white shadow-sm hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <span className="mb-5 inline-flex w-fit rounded-full bg-blue-600 px-3 py-1.5 text-[10px] font-bold tracking-wider text-white">
                    MOST POPULAR
                  </span>
                )}

                <h3 className="text-xl font-extrabold text-slate-900">
                  {plan.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {plan.description}
                </p>

                <div className="mt-7 flex flex-wrap items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-slate-950">
                    {plan.price}
                  </span>

                  <span className="text-sm text-slate-500">
                    {plan.period}
                  </span>
                </div>

                <div className="my-6 border-t border-slate-200" />

                <p className="text-xs font-bold tracking-wider text-slate-500">
                  PLAN INCLUDES
                </p>

                <ul className="mt-5 flex-1 space-y-4">
                  {plan.items?.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 shrink-0 text-emerald-600"
                      />

                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => scrollTo("contact")}
                  className={`mt-8 w-full ${
                    plan.popular ? primaryButton : secondaryButton
                  }`}
                >
                  Choose {plan.name}
                  <ArrowRight size={17} />
                </button>
              </article>
            ))}
          </div>

          <p className="mt-6 text-center text-xs leading-6 text-slate-500">
            Prices and included features are sample content until confirmed in
            your subscription configuration.
          </p>
        </div>
      </section>

      {/* Book a Demo Section */}
      <section
        id="book-demo"
        className="scroll-mt-24 bg-gradient-to-b from-blue-50/70 via-white to-indigo-50/70 px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            badge="BOOK A FREE DEMO"
            title="See EduSchoolHub in Action"
            description="Discover how EduSchoolHub can simplify student management, attendance, fees and academic activities at your school. Book a free demo with our team."
          />

          <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-blue-950/5 sm:p-8 lg:p-10">
            <div className="mb-7 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <CalendarCheck size={24} />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Schedule Your Demo
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Tell us a little about your school.
                  </p>
                </div>
              </div>
            </div>

            <BookDemoForm />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section
        id="contact"
        className="scroll-mt-24 px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10"
      >
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-800 px-6 py-12 sm:px-12 sm:py-16 lg:px-16">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-32 -left-16 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-xs font-semibold text-blue-50">
                <Sparkles size={15} />
                GET STARTED WITH {content.brand?.toUpperCase()}
              </span>

              <h2 className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to simplify your school management?
              </h2>

              <p className="mt-4 text-sm leading-7 text-blue-100 sm:text-base">
                Discover a more organized way to manage students, academics and
                everyday school operations.
              </p>
            </div>

            <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <button
                type="button"
                onClick={() => scrollTo("pricing")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
              >
                Explore Plans
                <ArrowRight size={17} />
              </button>

              <button
                type="button"
                onClick={() => scrollTo("book-demo")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Book a Demo
                <ArrowUpRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}