
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  CreditCard,
  Globe,
  Wallet,
  Mail,
  Headphones,
  BarChart3,
  Bell,
  Settings,
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Plus,
  CalendarDays,
  CircleHelp,
  UserRound,
  TrendingUp,
  TrendingDown,
  Clock3,
  Users,
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  Crown,
  PanelLeftClose,
  Activity,
} from "lucide-react";

const initialStats = [
  {
    title: "Total Schools",
    value: "125",
    change: "+12%",
    positive: true,
    icon: Building2,
    color: "blue",
    points: "0,24 12,18 24,21 36,12 48,16 60,6 72,10 84,2",
  },
  {
    title: "Active Schools",
    value: "108",
    change: "+8%",
    positive: true,
    icon: Users,
    color: "green",
    points: "0,24 12,22 24,16 36,20 48,11 60,13 72,4 84,2",
  },
  {
    title: "Expiring Soon",
    value: "7",
    change: "-30%",
    positive: false,
    icon: Clock3,
    color: "orange",
    points: "0,23 12,17 24,22 36,12 48,18 60,8 72,12 84,2",
  },
  {
    title: "Total Students",
    value: "24,580",
    change: "+14%",
    positive: true,
    icon: GraduationCap,
    color: "purple",
    points: "0,24 12,20 24,22 36,14 48,16 60,8 72,9 84,2",
  },
  {
    title: "Total Staff",
    value: "1,850",
    change: "+6%",
    positive: true,
    icon: UserRound,
    color: "pink",
    points: "0,22 12,18 24,20 36,10 48,16 60,7 72,12 84,2",
  },
  {
    title: "Revenue",
    value: "₹4,85,000",
    change: "+18%",
    positive: true,
    icon: Wallet,
    color: "green",
    points: "0,24 12,18 24,20 36,12 48,15 60,8 72,9 84,2",
  },
];

const renewals = [
  { school: "XYZ School", date: "12 Oct 2026", days: 5, color: "red" },
  { school: "ABC School", date: "15 Oct 2026", days: 8, color: "orange" },
  { school: "DPS School", date: "18 Oct 2026", days: 11, color: "blue" },
];

const tickets = [
  {
    id: "#102",
    issue: "Payment issue",
    time: "Today, 11:00 AM",
    status: "Open",
    color: "red",
  },
  {
    id: "#201",
    issue: "Domain issue",
    time: "Yesterday, 4:15 PM",
    status: "Pending",
    color: "orange",
  },
  {
    id: "#099",
    issue: "Login issue",
    time: "10 Oct 2026",
    status: "Open",
    color: "red",
  },
];

const payments = [
  {
    school: "ABC School",
    amount: 25000,
    time: "Today, 11:20 AM",
    status: "Completed",
    color: "blue",
  },
  {
    school: "XYZ School",
    amount: 15000,
    time: "Yesterday, 3:45 PM",
    status: "Completed",
    color: "purple",
  },
  {
    school: "DPS School",
    amount: 35000,
    time: "12 Oct 2026",
    status: "Completed",
    color: "green",
  },
];

const chartOptions = {
  "This Year": {
    labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep"],
    values: [18, 31, 39, 37, 49, 72],
  },
  "Last 6 Months": {
    labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    values: [25, 35, 32, 48, 57, 78],
  },
  "This Month": {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    values: [22, 43, 37, 75],
  },
};

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/super-admin/dashboard" },
  { label: "Schools", icon: Building2, path: "/super-admin/schools", expandable: true },
  { label: "Subscriptions", icon: CreditCard, path: "/super-admin/subscriptions" },
  { label: "Domains", icon: Globe, path: "/super-admin/domains" },
  { label: "Revenue", icon: Wallet, path: "/super-admin/revenue" },
  { label: "Enquiries", icon: Mail, path: "/super-admin/enquiries" },
  { label: "Support", icon: Headphones, path: "/super-admin/support" },
  { label: "Analytics", icon: BarChart3, path: "/super-admin/analytics" },
  { label: "Notifications", icon: Bell, path: "/super-admin/notifications", notification: true },
  { label: "Website/CMS", icon: Globe, path: "/super-admin/website-cms" },
  { label: "Settings", icon: Settings, path: "/super-admin/settings" },
];

const currency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function matchesSearch(query, ...values) {
  if (!query.trim()) return true;
  return values.join(" ").toLowerCase().includes(query.trim().toLowerCase());
}

function Sparkline({ points, color }) {
  return (
    <svg viewBox="0 0 84 28" className="h-7 w-[76px] shrink-0" aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;

  const themes = {
    blue: {
      bg: "bg-blue-50",
      icon: "bg-blue-100 text-blue-600",
      chart: "#2878ff",
      change: "text-emerald-500",
    },
    green: {
      bg: "bg-emerald-50",
      icon: "bg-emerald-100 text-emerald-600",
      chart: "#10c99a",
      change: "text-emerald-500",
    },
    orange: {
      bg: "bg-orange-50",
      icon: "bg-orange-100 text-orange-600",
      chart: "#ff9c43",
      change: "text-rose-500",
    },
    purple: {
      bg: "bg-violet-50",
      icon: "bg-violet-100 text-violet-600",
      chart: "#8b43ff",
      change: "text-emerald-500",
    },
    pink: {
      bg: "bg-pink-50",
      icon: "bg-pink-100 text-pink-600",
      chart: "#fb3985",
      change: "text-emerald-500",
    },
  };

  const theme = themes[stat.color];

  return (
    <div className="min-w-0 rounded-xl border border-white bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:p-4">
      <div className="flex items-center gap-2.5">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${theme.icon}`}>
          <Icon size={20} strokeWidth={2.2} />
        </div>
        <p className="min-w-0 text-[11px] font-medium leading-4 text-slate-500">
          {stat.title}
        </p>
      </div>

      <p className="mt-3 break-words text-[22px] font-bold leading-tight tracking-tight text-slate-900 sm:text-[25px]">
        {stat.value}
      </p>

      <div className="mt-2 flex items-center justify-between gap-1">
        <span className={`flex items-center gap-1 text-[10px] font-bold ${theme.change}`}>
          {stat.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {stat.change}
        </span>
        <Sparkline points={stat.points} color={theme.chart} />
      </div>
    </div>
  );
}

function Panel({ title, icon: Icon, action, onAction, children, className = "" }) {
  return (
    <section className={`min-w-0 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm ${className}`}>
      <div className="flex min-h-[60px] items-center justify-between gap-3 border-b border-slate-100 px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          {Icon && (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Icon size={20} />
            </span>
          )}
          <div className="min-w-0">
            <h2 className="truncate text-sm font-bold text-slate-900">{title}</h2>
          </div>
        </div>

        {action && (
          <button
            type="button"
            onClick={onAction}
            className="inline-flex shrink-0 items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800"
          >
            {action}
            <ArrowRight size={14} />
          </button>
        )}
      </div>

      {children}
    </section>
  );
}

function RevenueChart({ selectedPeriod }) {
  const chart = chartOptions[selectedPeriod];
  const maxValue = Math.max(...chart.values);
  const width = 600;
  const height = 160;
  const left = 28;
  const right = 12;
  const top = 15;
  const bottom = 25;

  const coordinates = chart.values.map((value, index) => ({
    x: left + index * ((width - left - right) / (chart.values.length - 1 || 1)),
    y: top + (1 - value / (maxValue * 1.15)) * (height - top - bottom),
    value,
  }));

  const linePath = coordinates
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${coordinates[coordinates.length - 1].x} ${height - bottom} L ${coordinates[0].x} ${height - bottom} Z`;

  return (
    <div className="px-3 pb-4 pt-3 sm:px-5">
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>Revenue trend</span>
        <span className="font-semibold text-emerald-600">↑ Platform growth</span>
      </div>

      <div className="mt-3 w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label={`Revenue overview for ${selectedPeriod}`}
        >
          {[0, 1, 2, 3, 4].map((line) => {
            const y = top + line * ((height - top - bottom) / 4);
            return (
              <g key={line}>
                <line
                  x1={left}
                  y1={y}
                  x2={width - right}
                  y2={y}
                  stroke="#edf2f8"
                  strokeDasharray="3 4"
                />
                <text
                  x="0"
                  y={y + 4}
                  fill="#8293ad"
                  fontSize="10"
                >
                  {["₹8L", "₹6L", "₹4L", "₹2L", "0"][line]}
                </text>
              </g>
            );
          })}

          {coordinates.map((point) => (
            <line
              key={`grid-${point.x}`}
              x1={point.x}
              y1={top}
              x2={point.x}
              y2={height - bottom}
              stroke="#f4f6fa"
            />
          ))}

          <defs>
            <linearGradient id="revenueFillEduSchoolHub" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2878ff" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#2878ff" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          <path d={areaPath} fill="url(#revenueFillEduSchoolHub)" />

          <path
            d={linePath}
            fill="none"
            stroke="#2878ff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {coordinates.map((point, index) => (
            <g key={chart.labels[index]}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#2878ff"
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={point.x}
                y={height - 6}
                textAnchor="middle"
                fill="#7d90ab"
                fontSize="10"
              >
                {chart.labels[index]}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function SchoolStatusChart() {
  const status = [
    { label: "Active Schools", value: 108, percent: 86, color: "#20cfa4" },
    { label: "Expired Schools", value: 7, percent: 6, color: "#8b43ff" },
    { label: "Expiring Soon", value: 7, percent: 6, color: "#ff80aa" },
  ];

  return (
    <div className="grid grid-cols-1 items-center gap-5 px-5 py-5 sm:grid-cols-2">
      <div className="flex justify-center">
        <div
          className="relative flex h-[170px] w-[170px] items-center justify-center rounded-full"
          style={{
            background: "conic-gradient(#20cfa4 0% 86%, #8b43ff 86% 93%, #ff80aa 93% 100%)",
          }}
          role="img"
          aria-label="School status: 86 percent active, 6 percent expired, 6 percent expiring"
        >
          <div className="flex h-[112px] w-[112px] flex-col items-center justify-center rounded-full bg-white">
            <span className="text-[26px] font-bold text-slate-900">125</span>
            <span className="text-xs text-slate-500">Schools</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {status.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="h-3 w-3 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="min-w-0 flex-1 text-[11px] text-slate-500">
              {item.label}
            </span>
            <span className="text-xs font-bold text-slate-800">{item.value}</span>
            <span className="w-9 text-right text-[11px] text-slate-500">
              {item.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionIcon({ icon: Icon, color = "blue" }) {
  const styles = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-violet-50 text-violet-600",
    green: "bg-emerald-50 text-emerald-600",
  };

  return (
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles[color]}`}>
      <Icon size={20} />
    </span>
  );
}

function StatusBadge({ status, color }) {
  const styles = {
    red: "bg-rose-50 text-rose-600",
    orange: "bg-orange-50 text-orange-600",
    green: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-violet-50 text-violet-600",
  };

  return (
    <span className={`inline-flex whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[10px] font-semibold ${styles[color] || styles.blue}`}>
      {status}
    </span>
  );
}

function Sidebar({ open, onClose, navigate }) {
  const [schoolsExpanded, setSchoolsExpanded] = useState(true);
  const [active, setActive] = useState("Dashboard");

  const goTo = (label, path) => {
    setActive(label);
    onClose();
    navigate(path);
  };

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col border-r border-slate-100 bg-white transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] shrink-0 items-center justify-between border-b border-slate-100 px-5">
          <button
            type="button"
            onClick={() => goTo("Dashboard", "/super-admin/dashboard")}
            className="flex items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-md shadow-blue-200">
              <GraduationCap size={21} />
            </span>
            <span className="text-[19px] font-extrabold tracking-tight text-slate-900">
              Edu<span className="text-blue-600">SchoolHub</span>
            </span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 pb-4 pt-4">
          <p className="text-[9px] font-bold tracking-[0.2em] text-slate-400">
            SUPER ADMIN PANEL
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const selected = active === item.label;

            return (
              <div key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    if (item.expandable) {
                      setSchoolsExpanded((value) => !value);
                      setActive(item.label);
                    } else {
                      goTo(item.label, item.path);
                    }
                  }}
                  className={`group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[12px] transition ${
                    selected
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 font-semibold text-white shadow-md shadow-blue-200"
                      : "text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  }`}
                >
                  <Icon size={17} />
                  <span className="flex-1">{item.label}</span>

                  {item.expandable && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${schoolsExpanded ? "" : "-rotate-90"}`}
                    />
                  )}

                  {item.notification && (
                    <span className="h-2 w-2 rounded-full bg-pink-500" />
                  )}
                </button>

                {item.expandable && schoolsExpanded && (
                  <div className="ml-8 mt-1 space-y-0.5 border-l border-blue-100 pl-3">
                    <button
                      type="button"
                      onClick={() => goTo("Schools", "/super-admin/schools")}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[11px] text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <span className="h-1 w-1 rounded-full bg-blue-400" />
                      All Schools
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo("Schools", "/super-admin/schools")}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-[11px] text-slate-500 hover:bg-blue-50 hover:text-blue-700"
                    >
                      <span className="h-1 w-1 rounded-full bg-blue-400" />
                      Add School
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="mx-4 mb-4 rounded-2xl bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-100 p-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
            <Crown size={19} />
          </span>
          <h3 className="mt-3 text-xs font-bold text-slate-900">Super Admin</h3>
          <p className="mt-1 text-[10px] leading-4 text-slate-500">
            Complete control over your EduSchoolHub platform.
          </p>
          <button
            type="button"
            onClick={() => goTo("Settings", "/super-admin/settings")}
            className="mt-3 text-[10px] font-semibold text-blue-700 hover:underline"
          >
            Manage platform <ArrowRight size={12} className="ml-1 inline" />
          </button>
        </div>
      </aside>
    </>
  );
}

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("This Year");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const filteredRenewals = useMemo(
    () => renewals.filter((item) => matchesSearch(search, item.school, item.date)),
    [search]
  );

  const filteredTickets = useMemo(
    () => tickets.filter((item) => matchesSearch(search, item.id, item.issue, item.status)),
    [search]
  );

  const filteredPayments = useMemo(
    () => payments.filter((item) => matchesSearch(search, item.school, item.status, item.time)),
    [search]
  );

  const goTo = (path) => {
    setSidebarOpen(false);
    setNotificationsOpen(false);
    setProfileOpen(false);
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-[#f3f7fd] font-sans text-slate-800">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navigate={navigate}
      />

      <div className="min-h-screen lg:ml-[250px]">
        {/* Top navigation */}
        <header className="sticky top-0 z-30 flex h-[76px] items-center gap-3 border-b border-slate-100 bg-white/95 px-4 backdrop-blur-md sm:gap-5 sm:px-6 lg:px-7">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
          >
            <Menu size={20} />
          </button>

          <button
            type="button"
            onClick={() => setSidebarOpen((value) => !value)}
            aria-label="Toggle navigation"
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 lg:flex"
          >
            <PanelLeftClose size={18} />
          </button>

          <div className="relative min-w-0 max-w-[500px] flex-1">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search schools, payments, enquiries..."
              aria-label="Search dashboard records"
              className="h-[39px] w-full rounded-xl border border-slate-100 bg-[#f7f9fd] pl-10 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-50"
            />
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => {
                  setNotificationsOpen((value) => !value);
                  setProfileOpen(false);
                }}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-50"
              >
                <Bell size={19} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-white bg-pink-500" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-12 z-50 w-[260px] rounded-xl border border-slate-100 bg-white p-4 shadow-xl">
                  <h3 className="text-sm font-bold text-slate-800">Notifications</h3>
                  <p className="mt-3 text-xs leading-5 text-slate-500">
                    7 subscriptions are expiring soon. Review renewals to keep
                    school access active.
                  </p>
                  <button
                    type="button"
                    onClick={() => goTo("/super-admin/subscriptions")}
                    className="mt-3 text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Review subscriptions
                  </button>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => goTo("/super-admin/support")}
              aria-label="Help and support"
              className="hidden h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-50 sm:flex"
            >
              <CircleHelp size={19} />
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setProfileOpen((value) => !value);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-1.5 pr-2.5 hover:bg-blue-50"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
                  A
                </span>
                <span className="hidden text-left sm:block">
                  <span className="block text-[11px] font-bold text-slate-800">Admin</span>
                  <span className="block text-[9px] text-slate-400">Super Admin</span>
                </span>
                <ChevronDown size={14} className="text-slate-500" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 z-50 w-48 rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
                  <button
                    type="button"
                    onClick={() => goTo("/super-admin/settings")}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-slate-600 hover:bg-slate-50"
                  >
                    <Settings size={15} />
                    Account settings
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo("/super-admin/support")}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-xs text-slate-600 hover:bg-slate-50"
                  >
                    <CircleHelp size={15} />
                    Help & Support
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1700px] px-4 pb-8 pt-6 sm:px-6 lg:px-7">
          {/* Page heading */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <Activity size={15} className="text-blue-600" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-600">
                  Platform overview
                </span>
              </div>
              <h1 className="mt-2 text-[27px] font-extrabold tracking-tight text-slate-900 sm:text-[31px]">
                Dashboard
              </h1>
              <h2 className="mt-0.5 text-base font-bold text-slate-800">
                Good Morning, Admin <span aria-hidden="true">👋</span>
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Here&apos;s what&apos;s happening with EduSchoolHub today.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => goTo("/super-admin/schools")}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 text-xs font-bold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700"
              >
                <Plus size={16} />
                Add School
              </button>
              <button
                type="button"
                onClick={() => goTo("/super-admin/enquiries")}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-100 bg-white px-3.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
              >
                <Mail size={15} />
                View Enquiries
              </button>
              <button
                type="button"
                onClick={() => goTo("/super-admin/subscriptions")}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-100 bg-white px-3.5 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
              >
                <CalendarDays size={15} />
                View Renewals
              </button>
            </div>
          </div>

          {/* Stats */}
          <section className="mt-6 grid grid-cols-1 gap-3 min-[440px]:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            {initialStats.map((stat) => (
              <StatCard key={stat.title} stat={stat} />
            ))}
          </section>

          {/* Charts */}
          <section className="mt-4 grid grid-cols-1 gap-4 2xl:grid-cols-[1.25fr_0.9fr]">
            <Panel
              title="Revenue Overview"
              icon={BarChart3}
              className="min-h-[310px]"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 sm:px-5">
                <p className="text-[11px] text-slate-500">
                  Total revenue from all schools (subscriptions, add-ons, etc.)
                </p>
                <label className="relative">
                  <select
                    value={selectedPeriod}
                    onChange={(event) => setSelectedPeriod(event.target.value)}
                    className="h-9 appearance-none rounded-lg border border-slate-100 bg-white pl-3 pr-8 text-[11px] font-semibold text-slate-600 outline-none focus:border-blue-300"
                  >
                    {Object.keys(chartOptions).map((period) => (
                      <option key={period} value={period}>
                        {period}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={13}
                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500"
                  />
                </label>
              </div>

              <RevenueChart selectedPeriod={selectedPeriod} />

              <div className="mx-5 mb-4 flex items-center justify-between rounded-lg bg-blue-50/70 px-3 py-2.5">
                <span className="text-[10px] text-slate-500">Total platform revenue</span>
                <span className="text-sm font-extrabold text-blue-700">₹4,85,000</span>
              </div>
            </Panel>

            <Panel
              title="School Status"
              icon={Activity}
              className="min-h-[310px]"
            >
              <p className="px-5 pt-4 text-[11px] text-slate-500">
                Distribution of schools by current status
              </p>
              <SchoolStatusChart />
            </Panel>
          </section>

          {/* Renewals, tickets and payments */}
          <section className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2 2xl:grid-cols-3">
            {/* Upcoming renewals */}
            <Panel
              title="Upcoming Renewals"
              icon={CalendarDays}
              action="View All"
              onAction={() => goTo("/super-admin/subscriptions")}
            >
              <div className="px-4 py-1">
                {filteredRenewals.map((item) => (
                  <div
                    key={item.school}
                    className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-b-0"
                  >
                    <SectionIcon icon={Building2} color="blue" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-slate-800">
                        {item.school}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">{item.date}</p>
                    </div>
                    <StatusBadge
                      status={`${item.days} days`}
                      color={item.color}
                    />
                  </div>
                ))}
                {filteredRenewals.length === 0 && (
                  <p className="py-8 text-center text-xs text-slate-400">
                    No matching renewals.
                  </p>
                )}
              </div>
            </Panel>

            {/* Support tickets */}
            <Panel
              title="Support Tickets"
              icon={Headphones}
              action="View All"
              onAction={() => goTo("/super-admin/support")}
            >
              <div className="px-4 py-1">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="flex items-center gap-2.5 border-b border-slate-100 py-4 last:border-b-0"
                  >
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                        ticket.color === "red" ? "bg-pink-500" : "bg-orange-500"
                      }`}
                    />
                    <span className="text-[10px] font-bold text-slate-700">
                      {ticket.id}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-semibold text-slate-800">
                        {ticket.issue}
                      </p>
                      <p className="mt-1 truncate text-[10px] text-slate-400">
                        {ticket.time}
                      </p>
                    </div>
                    <StatusBadge status={ticket.status} color={ticket.color} />
                  </div>
                ))}
                {filteredTickets.length === 0 && (
                  <p className="py-8 text-center text-xs text-slate-400">
                    No matching tickets.
                  </p>
                )}
              </div>
            </Panel>

            {/* Recent payments */}
            <Panel
              title="Recent Payments"
              icon={CreditCard}
              action="View All"
              onAction={() => goTo("/super-admin/revenue")}
            >
              <div className="px-4 py-1">
                {filteredPayments.map((payment) => (
                  <div
                    key={payment.school}
                    className="flex items-center gap-3 border-b border-slate-100 py-3 last:border-b-0"
                  >
                    <SectionIcon
                      icon={Building2}
                      color={payment.color === "green" ? "green" : payment.color === "purple" ? "purple" : "blue"}
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-bold text-slate-800">
                        {payment.school}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        {payment.time}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <span className="text-xs font-extrabold text-slate-800">
                        {currency(payment.amount)}
                      </span>
                      <StatusBadge status={payment.status} color="green" />
                    </div>
                  </div>
                ))}
                {filteredPayments.length === 0 && (
                  <p className="py-8 text-center text-xs text-slate-400">
                    No matching payments.
                  </p>
                )}
              </div>
            </Panel>
          </section>

          {/* Footer */}
          <footer className="mt-7 flex flex-col justify-between gap-2 border-t border-slate-200 py-5 text-[10px] text-slate-400 sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} EduSchoolHub. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => goTo("/super-admin/support")}
                className="inline-flex items-center gap-1.5 hover:text-blue-600"
              >
                <Headphones size={13} />
                Help & Support
              </button>
              <button
                type="button"
                onClick={() => goTo("/super-admin/settings")}
                className="inline-flex items-center gap-1.5 hover:text-blue-600"
              >
                <Settings size={13} />
                Settings
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
