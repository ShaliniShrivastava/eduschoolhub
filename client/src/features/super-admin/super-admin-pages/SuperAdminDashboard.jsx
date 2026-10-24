
import { useMemo, useState } from "react";

const navigation = [
  { label: "Dashboard", icon: "▦" },
  { label: "Schools", icon: "▣" },
  { label: "Plans & Subscriptions", icon: "◈" },
  { label: "Users", icon: "♙" },
  { label: "Templates", icon: "▤" },
  { label: "Website Management", icon: "◎" },
  { label: "Enquiries", icon: "✉" },
  { label: "Support", icon: "☏" },
  { label: "Analytics", icon: "▥" },
  { label: "Notifications", icon: "♧" },
  { label: "Website CMS", icon: "▧" },
  { label: "Settings", icon: "⚙" },
];

const schoolsData = [
  {
    id: 1,
    name: "Riverside Public School",
    initials: "RP",
    email: "admin@riverside.edu",
    plan: "Premium",
    students: 420,
    date: "12 Oct 2026",
    status: "Active",
  },
  {
    id: 2,
    name: "Green Valley School",
    initials: "GV",
    email: "admin@greenvalley.edu",
    plan: "Standard",
    students: 380,
    date: "10 Oct 2026",
    status: "Active",
  },
  {
    id: 3,
    name: "Sunrise Kids Academy",
    initials: "SK",
    email: "admin@sunrise.edu",
    plan: "Basic",
    students: 250,
    date: "08 Oct 2026",
    status: "Pending",
  },
  {
    id: 4,
    name: "Maplewood School",
    initials: "MS",
    email: "admin@maplewood.edu",
    plan: "Premium",
    students: 510,
    date: "05 Oct 2026",
    status: "Active",
  },
  {
    id: 5,
    name: "Bright Future School",
    initials: "BF",
    email: "admin@brightfuture.edu",
    plan: "Standard",
    students: 300,
    date: "02 Oct 2026",
    status: "Inactive",
  },
];

const enquiriesData = [
  {
    id: 1,
    initials: "RB",
    name: "Riverside Public School",
    type: "Premium Plan",
    time: "2 hours ago",
  },
  {
    id: 2,
    initials: "GV",
    name: "Green Valley School",
    type: "Standard Plan",
    time: "5 hours ago",
  },
  {
    id: 3,
    initials: "SK",
    name: "Sunrise Kids Academy",
    type: "School Website",
    time: "Yesterday",
  },
  {
    id: 4,
    initials: "MS",
    name: "Maplewood School",
    type: "Premium Plan",
    time: "Yesterday",
  },
];

const growthData = [
  { month: "May", value: 7 },
  { month: "Jun", value: 11 },
  { month: "Jul", value: 9 },
  { month: "Aug", value: 15 },
  { month: "Sep", value: 19 },
  { month: "Oct", value: 24 },
];

const planData = [
  { name: "Premium", count: 18, color: "bg-indigo-500" },
  { name: "Standard", count: 20, color: "bg-cyan-500" },
  { name: "Basic", count: 10, color: "bg-amber-400" },
];

function Icon({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

function MetricCard({ title, value, change, icon, tone }) {
  const tones = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-emerald-50 text-emerald-600",
    purple: "bg-violet-50 text-violet-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${tones[tone]}`}
        >
          {icon}
        </span>
        <button
          type="button"
          aria-label={`${title} options`}
          className="rounded-lg px-2 py-1 text-xl text-slate-400 hover:bg-slate-100"
        >
          ⋯
        </button>
      </div>

      <p className="mt-5 text-sm font-medium text-slate-500">{title}</p>
      <h2 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </h2>

      <p className="mt-3 flex items-center gap-2 text-xs">
        <span className="rounded-md bg-emerald-50 px-2 py-1 font-semibold text-emerald-700">
          ↗ {change}
        </span>
        <span className="text-slate-400">vs last month</span>
      </p>
    </article>
  );
}

function PanelHeading({ title, subtitle, action, onAction }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 className="text-base font-bold text-slate-900">{title}</h3>
        {subtitle && (
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        )}
      </div>
      {action && (
        <button
          type="button"
          onClick={onAction}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
          {action} →
        </button>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Inactive: "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[status] || styles.Inactive}`}
    >
      <span className="mr-1.5">●</span>
      {status}
    </span>
  );
}

function PlanBadge({ plan }) {
  const styles = {
    Premium: "bg-violet-50 text-violet-700",
    Standard: "bg-blue-50 text-blue-700",
    Basic: "bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`rounded-md px-2 py-1 text-xs font-semibold ${styles[plan] || "bg-slate-100 text-slate-600"}`}
    >
      {plan}
    </span>
  );
}

function GrowthChart() {
  const maxValue = Math.max(...growthData.map((item) => item.value));

  return (
    <div className="mt-6">
      <div className="mb-4 flex items-end gap-3">
        <span className="text-3xl font-bold text-slate-900">48</span>
        <span className="mb-1 text-xs font-medium text-emerald-600">
          ↑ 12.5% growth
        </span>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between pb-7">
          {[0, 1, 2, 3].map((line) => (
            <div key={line} className="border-t border-dashed border-slate-100" />
          ))}
        </div>

        <div className="relative flex h-44 items-end justify-around gap-2">
          {growthData.map((item) => (
            <div
              key={item.month}
              className="flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <span className="text-[10px] text-slate-500">{item.value}</span>
              <div
                title={`${item.month}: ${item.value} new schools`}
                className={`w-full max-w-10 rounded-t-md transition-all ${
                  item.month === "Oct"
                    ? "bg-indigo-600"
                    : "bg-indigo-200 hover:bg-indigo-400"
                }`}
                style={{
                  height: `${(item.value / maxValue) * 72}%`,
                  minHeight: "8px",
                }}
              />
              <span className="text-xs text-slate-500">{item.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlansChart() {
  const total = planData.reduce((sum, item) => sum + item.count, 0);

  return (
    <div className="mt-6">
      <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
        {planData.map((plan) => (
          <div
            key={plan.name}
            className={`${plan.color} transition-all`}
            style={{ width: `${(plan.count / total) * 100}%` }}
            title={`${plan.name}: ${plan.count}`}
          />
        ))}
      </div>

      <div className="mt-6 space-y-5">
        {planData.map((plan) => (
          <div key={plan.name} className="flex items-center gap-3">
            <span className={`h-3 w-3 rounded-full ${plan.color}`} />
            <span className="flex-1 text-sm text-slate-600">
              {plan.name} Plan
            </span>
            <span className="text-sm font-bold text-slate-900">
              {plan.count}
            </span>
            <span className="w-12 text-right text-xs text-slate-400">
              {Math.round((plan.count / total) * 100)}%
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-indigo-50 p-4">
        <p className="text-xs font-medium text-indigo-600">
          Total subscribed schools
        </p>
        <p className="mt-1 text-2xl font-bold text-indigo-950">{total}</p>
      </div>
    </div>
  );
}

export default function SuperAdminDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [search, setSearch] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("All");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [selectedSchool, setSelectedSchool] = useState(null);

  const filteredSchools = useMemo(() => {
    return schoolsData.filter((school) => {
      const matchesSearch = [
        school.name,
        school.email,
        school.plan,
        school.status,
      ]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        schoolFilter === "All" || school.status === schoolFilter;

      return matchesSearch && matchesFilter;
    });
  }, [search, schoolFilter]);

  const navigate = (label) => {
    setActiveNav(label);
    setMobileSidebarOpen(false);

    if (label !== "Dashboard") {
      // Replace with route navigation when each page is implemented.
      console.info(`Navigation selected: ${label}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {mobileSidebarOpen && (
        <button
          aria-label="Close navigation"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ${
          mobileSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-2xl font-bold text-white shadow-lg shadow-indigo-200">
            ✦
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
              EduNexa
            </h1>
            <p className="text-xs font-medium text-slate-500">
              Super Admin Portal
            </p>
          </div>
          <button
            className="ml-auto text-xl text-slate-400 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <div className="px-4 pt-6">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-1" aria-label="Super Admin menu">
            {navigation.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.label)}
                className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition ${
                  activeNav === item.label
                    ? "bg-indigo-600 font-semibold text-white shadow-md shadow-indigo-200"
                    : "font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                <Icon className="w-6 text-lg">{item.icon}</Icon>
                <span className="flex-1">{item.label}</span>
                {item.label === "Enquiries" && (
                  <span
                    className={`rounded-md px-1.5 py-0.5 text-[10px] ${
                      activeNav === item.label
                        ? "bg-white/20 text-white"
                        : "bg-rose-100 text-rose-600"
                    }`}
                  >
                    4
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <p className="text-xs font-semibold text-slate-700">
                Platform status
              </p>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Your platform is running normally.
            </p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">
              <div className="h-full w-[96%] rounded-full bg-emerald-500" />
            </div>
          </div>
          <p className="mt-4 text-center text-[10px] text-slate-400">
            EduNexa Admin · v1.0
          </p>
        </div>
      </aside>

      <div className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6 xl:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button
              className="rounded-lg border border-slate-200 p-2 text-lg lg:hidden"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open navigation"
            >
              ☰
            </button>
            <div className="relative hidden w-64 md:block xl:w-80">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                ⌕
              </span>
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search schools..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="hidden text-xs text-slate-500 sm:block">
              Platform Overview
            </span>

            <div className="relative">
              <button
                onClick={() => {
                  setNotificationOpen(!notificationOpen);
                  setProfileOpen(false);
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-xl text-slate-600 hover:bg-slate-50"
                aria-label="Notifications"
              >
                ♧
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-rose-500" />
              </button>
              {notificationOpen && (
                <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                  <h3 className="font-bold text-slate-900">Notifications</h3>
                  <p className="mt-3 text-sm text-slate-600">
                    4 enquiries are awaiting review.
                  </p>
                  <button
                    onClick={() => {
                      setNotificationOpen(false);
                      navigate("Enquiries");
                    }}
                    className="mt-3 text-sm font-semibold text-indigo-600"
                  >
                    View enquiries →
                  </button>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl p-1.5 text-left hover:bg-slate-50"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-sm font-bold text-indigo-700">
                  SA
                </span>
                <span className="hidden sm:block">
                  <span className="block text-sm font-bold text-slate-800">
                    Super Admin
                  </span>
                  <span className="block text-xs text-slate-500">
                    Administrator
                  </span>
                </span>
                <span className="hidden text-xs text-slate-400 sm:block">
                  ⌄
                </span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-14 z-50 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      navigate("Settings");
                    }}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"
                  >
                    ⚙ Settings
                  </button>
                  <button
                    onClick={() => setProfileOpen(false)}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
                  >
                    ↪ Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6 xl:p-8">
          <section className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">
                Platform overview
              </p>
              <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Dashboard
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Welcome back! Here&apos;s what&apos;s happening with EduNexa.
              </p>
            </div>

            <button
              onClick={() => navigate("Schools")}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-100 transition hover:bg-indigo-700"
            >
              <span className="text-lg">+</span> Add New School
            </button>
          </section>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Total Schools"
              value="48"
              change="12.5%"
              icon="▣"
              tone="blue"
            />
            <MetricCard
              title="Total Students"
              value="12,560"
              change="8.2%"
              icon="♟"
              tone="green"
            />
            <MetricCard
              title="Total Staff"
              value="1,240"
              change="6.4%"
              icon="♙"
              tone="purple"
            />
            <MetricCard
              title="Active Subscriptions"
              value="36"
              change="10.1%"
              icon="◈"
              tone="orange"
            />
          </section>

          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-5">
            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-3">
              <PanelHeading
                title="School Growth"
                subtitle="New schools registered over the last 6 months"
                action="View analytics"
                onAction={() => navigate("Analytics")}
              />
              <GrowthChart />
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
              <PanelHeading
                title="Schools by Plan"
                subtitle="Subscription plan distribution"
                action="Manage plans"
                onAction={() => navigate("Plans & Subscriptions")}
              />
              <PlansChart />
            </article>
          </section>

          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-5">
            <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-3">
              <div className="p-5 sm:p-6">
                <PanelHeading
                  title="Recent Schools"
                  subtitle="Latest schools registered on the platform"
                  action="View all schools"
                  onAction={() => navigate("Schools")}
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[690px] text-left">
                  <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-3 font-semibold">School</th>
                      <th className="px-4 py-3 font-semibold">Plan</th>
                      <th className="px-4 py-3 font-semibold">Students</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredSchools.map((school) => (
                      <tr
                        key={school.id}
                        className="transition hover:bg-slate-50/80"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-700">
                              {school.initials}
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-slate-800">
                                {school.name}
                              </p>
                              <p className="mt-1 text-xs text-slate-400">
                                {school.date}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <PlanBadge plan={school.plan} />
                        </td>
                        <td className="px-4 py-4 text-sm font-medium text-slate-700">
                          {school.students.toLocaleString("en-IN")}
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={school.status} />
                        </td>
                        <td className="px-4 py-4">
                          <button
                            onClick={() => setSelectedSchool(school)}
                            className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredSchools.length === 0 && (
                  <div className="p-10 text-center">
                    <p className="font-semibold text-slate-700">
                      No schools found
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Try another search or status filter.
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-4">
                <p className="text-xs text-slate-500">
                  Showing {filteredSchools.length} of {schoolsData.length} demo
                  schools
                </p>
                <select
                  value={schoolFilter}
                  onChange={(event) => setSchoolFilter(event.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-indigo-400"
                  aria-label="Filter schools by status"
                >
                  <option value="All">All statuses</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
              <PanelHeading
                title="Recent Enquiries"
                subtitle="Latest requests from schools"
                action="View all"
                onAction={() => navigate("Enquiries")}
              />

              <div className="mt-5 space-y-1">
                {enquiriesData.map((enquiry) => (
                  <button
                    key={enquiry.id}
                    onClick={() => setSelectedEnquiry(enquiry)}
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-slate-50"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
                      {enquiry.initials}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-semibold text-slate-800">
                        {enquiry.name}
                      </span>
                      <span className="mt-1 block text-xs text-slate-500">
                        {enquiry.type}
                      </span>
                      <span className="mt-1 block text-[11px] text-slate-400">
                        {enquiry.time}
                      </span>
                    </span>
                    <span className="text-lg text-slate-400">›</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigate("Enquiries")}
                className="mt-5 w-full rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-600 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
              >
                Manage Enquiries
              </button>
            </article>
          </section>

          <footer className="mt-8 flex flex-wrap justify-between gap-2 border-t border-slate-200 py-5 text-xs text-slate-400">
            <p>© 2026 EduNexa. All rights reserved.</p>
            <p>Super Admin Portal</p>
          </footer>
        </main>
      </div>

      {(selectedSchool || selectedEnquiry) && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4"
          onClick={() => {
            setSelectedSchool(null);
            setSelectedEnquiry(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="detail-modal-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {selectedSchool ? "School details" : "Enquiry details"}
                </p>
                <h2
                  id="detail-modal-title"
                  className="mt-2 text-xl font-bold text-slate-900"
                >
                  {selectedSchool?.name || selectedEnquiry?.name}
                </h2>
              </div>
              <button
                onClick={() => {
                  setSelectedSchool(null);
                  setSelectedEnquiry(null);
                }}
                className="rounded-lg px-2 py-1 text-xl text-slate-400 hover:bg-slate-100"
                aria-label="Close details"
              >
                ×
              </button>
            </div>

            {selectedSchool ? (
              <div className="mt-5 space-y-4">
                <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">Admin email</span>
                  <span className="break-all text-right text-sm font-medium text-slate-800">
                    {selectedSchool.email}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">Plan</span>
                  <PlanBadge plan={selectedSchool.plan} />
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">Students</span>
                  <span className="text-sm font-semibold">
                    {selectedSchool.students}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-3">
                  <span className="text-sm text-slate-500">Created</span>
                  <span className="text-sm">{selectedSchool.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-500">Status</span>
                  <StatusBadge status={selectedSchool.status} />
                </div>
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-xs text-slate-500">Requested plan</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedEnquiry.type}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Received</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {selectedEnquiry.time}
                  </p>
                </div>
                <p className="rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
                  Demo enquiry details. Connect this modal to your enquiries API
                  to display the actual school contact information.
                </p>
              </div>
            )}

            <button
              onClick={() => {
                setSelectedSchool(null);
                setSelectedEnquiry(null);
              }}
              className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
            >
              Close
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
