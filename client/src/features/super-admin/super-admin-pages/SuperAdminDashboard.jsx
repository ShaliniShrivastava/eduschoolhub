
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowDown,
  ArrowUp,
  Building2,
  CalendarDays,
  Clock3,
  CreditCard,
  IndianRupee,
  MessageSquare,
  Plus,
  RefreshCw,
  School,
  Ticket,
  Users,
  Wallet,
  Headset,
  CircleHelp,
  AlertCircle,
} from "lucide-react";

import apiClient from "../../../app-services/apiClient";
import { useAuth } from "../../../app-context/AuthContext";

/* ==================== HELPERS ==================== */

const numberFormat = (value) => {
  if (value === null || value === undefined || value === "") return "—";
  return Number(value).toLocaleString("en-IN");
};

const currencyFormat = (value) => {
  if (value === null || value === undefined || value === "") return "—";

  return Number(value).toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
};

const dateFormat = (value) => {
  if (!value) return "Date unavailable";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

/* ==================== REUSABLE COMPONENTS ==================== */

function Panel({ children, className = "" }) {
  return (
    <section
      className={`min-w-0 rounded-xl border border-[#E5ECF7] bg-white shadow-[0_2px_12px_rgba(37,83,145,0.04)] transition-all duration-300 hover:border-[#D5E3F7] hover:shadow-[0_8px_24px_rgba(37,83,145,0.07)] ${className}`}
    >
      {children}
    </section>
  );
}

function PanelHeader({ icon: Icon, title, action, onAction }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#EEF2F8] px-4 py-3.5">
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0EAFE] text-[#8749F5]">
          <Icon size={18} strokeWidth={2.2} />
        </span>

        <h3 className="truncate text-[14px] font-bold tracking-tight text-[#17264A] sm:text-[15px]">
          {title}
        </h3>
      </div>

      {action && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 rounded-md px-2 py-1.5 text-[11px] font-bold text-[#2874F5] transition-all duration-200 hover:bg-[#EEF4FF] hover:text-[#1457C7] active:scale-95"
        >
          {action} <span className="ml-1">→</span>
        </button>
      )}
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="flex min-h-[145px] flex-col items-center justify-center px-4 py-6 text-center">
      <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#F1F5FB] text-[#94A3B8]">
        <CircleHelp size={19} />
      </span>

      <p className="text-[11px] font-medium text-[#8794A9]">{message}</p>
    </div>
  );
}

function LoadingValue() {
  return (
    <span className="inline-block h-7 w-20 animate-pulse rounded-md bg-[#EDF2F8]" />
  );
}

/* ==================== STATISTICS CARD ==================== */

function StatCard({
  title,
  value,
  icon: Icon,
  color,
  background,
  trend,
  loading,
  index = 0,
}) {
  const hasTrend = trend !== null && trend !== undefined;

  return (
    <div
      style={{ animationDelay: `${index * 80}ms` }}
      className="group min-w-0 rounded-xl border border-[#E5ECF7] bg-white p-3.5 shadow-[0_2px_10px_rgba(37,83,145,0.035)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#CFE0FA] hover:shadow-[0_12px_26px_rgba(37,99,235,0.10)] sm:p-4"
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ color, backgroundColor: background }}
        >
          <Icon size={19} strokeWidth={2.2} />
        </span>

        {hasTrend && (
          <span
            className={`flex items-center gap-0.5 rounded-full px-2 py-1 text-[10px] font-bold ${
              Number(trend) >= 0
                ? "bg-[#E8FBF3] text-[#12A879]"
                : "bg-[#FFF0F2] text-[#E95067]"
            }`}
          >
            {Number(trend) >= 0 ? (
              <ArrowUp size={12} />
            ) : (
              <ArrowDown size={12} />
            )}
            {Math.abs(Number(trend))}%
          </span>
        )}
      </div>

      <p className="mt-3 text-[11px] font-medium text-[#72809B]">
        {title}
      </p>

      <p className="mt-0.5 truncate text-[23px] font-extrabold tracking-tight text-[#17264A] sm:text-[25px]">
        {loading ? <LoadingValue /> : value}
      </p>

      <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-[#F0F3F8]">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: hasTrend
              ? `${Math.min(Math.abs(Number(trend)), 100)}%`
              : "0%",
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}

/* ==================== REVENUE CHART ==================== */

function RevenueChart({ revenueTrend, selectedPeriod, onPeriodChange }) {
  const chart = useMemo(() => {
    if (!revenueTrend) return null;

    const period =
      revenueTrend[selectedPeriod] ||
      revenueTrend[selectedPeriod.toLowerCase()] ||
      revenueTrend;

    const labels = period?.labels;
    const values = period?.values;

    if (
      !Array.isArray(labels) ||
      !Array.isArray(values) ||
      values.length === 0 ||
      labels.length !== values.length
    ) {
      return null;
    }

    const numericValues = values.map(Number);

    if (numericValues.some((value) => !Number.isFinite(value))) {
      return null;
    }

    const width = 620;
    const height = 195;
    const left = 42;
    const right = 14;
    const top = 16;
    const bottom = 34;

    const max = Math.max(...numericValues, 1);
    const min = Math.min(...numericValues, 0);
    const range = max - min || 1;

    const points = numericValues.map((value, index) => ({
      x:
        left +
        (index / Math.max(numericValues.length - 1, 1)) *
          (width - left - right),
      y: top + ((max - value) / range) * (height - top - bottom),
      value,
    }));

    const linePath = points
      .map(
        (point, index) =>
          `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
      )
      .join(" ");

    const first = points[0];
    const last = points[points.length - 1];

    return {
      points,
      labels,
      linePath,
      areaPath: `${linePath} L ${last.x} ${height - bottom} L ${first.x} ${height - bottom} Z`,
      width,
      height,
    };
  }, [revenueTrend, selectedPeriod]);

  return (
    <Panel className="h-full">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#2874F5]">
            <Activity size={19} />
          </span>

          <div>
            <h3 className="text-[15px] font-bold tracking-tight text-[#17264A] sm:text-[16px]">
              Revenue Overview
            </h3>

            <p className="mt-0.5 text-[10px] text-[#8290A8] sm:text-[11px]">
              Total revenue from all schools, subscriptions and add-ons
            </p>
          </div>
        </div>

        <select
          value={selectedPeriod}
          onChange={(event) => onPeriodChange(event.target.value)}
          className="cursor-pointer rounded-lg border border-[#E4EBF6] bg-white px-3 py-2 text-[11px] font-semibold text-[#50617E] outline-none transition focus:border-[#3478F6] focus:ring-2 focus:ring-[#3478F6]/10"
        >
          <option value="This Year">This Year</option>
          <option value="Last 6 Months">Last 6 Months</option>
          <option value="This Month">This Month</option>
        </select>
      </div>

      <div className="px-3 pb-3 pt-3">
        {!chart ? (
          <EmptyState message="Revenue chart data is not available yet." />
        ) : (
          <div className="w-full overflow-hidden">
            <svg
              viewBox={`0 0 ${chart.width} ${chart.height}`}
              className="h-[190px] w-full"
              preserveAspectRatio="none"
              role="img"
              aria-label="Revenue trend chart"
            >
              <defs>
                <linearGradient
                  id="dashboardRevenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#3478F6" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#3478F6" stopOpacity="0.01" />
                </linearGradient>
              </defs>

              {[0, 1, 2, 3].map((line) => (
                <line
                  key={line}
                  x1="42"
                  y1={16 + line * 48}
                  x2="606"
                  y2={16 + line * 48}
                  stroke="#EAF0F8"
                  strokeDasharray="4 4"
                />
              ))}

              <path
                d={chart.areaPath}
                fill="url(#dashboardRevenueGradient)"
              />

              <path
                d={chart.linePath}
                fill="none"
                stroke="#2874F5"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-all duration-700"
              />

              {chart.points.map((point, index) => (
                <circle
                  key={index}
                  cx={point.x}
                  cy={point.y}
                  r="3.5"
                  fill="white"
                  stroke="#2874F5"
                  strokeWidth="2"
                  className="transition-all duration-300 hover:r-5"
                />
              ))}

              {chart.labels.map((label, index) => (
                <text
                  key={`${label}-${index}`}
                  x={chart.points[index].x}
                  y="184"
                  fill="#8290A8"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {String(label)}
                </text>
              ))}
            </svg>

            <div className="flex justify-between px-2 pt-1">
              <span className="text-[10px] text-[#98A4B7]">
                {chart.points.length} data points
              </span>

              <span className="text-[12px] font-bold text-[#2874F5]">
                {currencyFormat(chart.points[chart.points.length - 1]?.value)}
              </span>
            </div>
          </div>
        )}
      </div>
    </Panel>
  );
}

/* ==================== SCHOOL STATUS ==================== */

function SchoolStatusChart({ statistics }) {
  const total = Number(statistics?.totalSchools || 0);
  const active = Number(statistics?.activeSchools || 0);
  const expired = Number(statistics?.expiredSchools || 0);
  const expiring = Number(statistics?.expiringSoon || 0);

  const hasData = total > 0;

  const activePercent = hasData ? (active / total) * 100 : 0;
  const expiredPercent = hasData ? (expired / total) * 100 : 0;
  const expiringPercent = hasData ? (expiring / total) * 100 : 0;

  const expiredEnd = activePercent + expiredPercent;
  const expiringEnd = expiredEnd + expiringPercent;

  const rows = [
    { label: "Active Schools", value: active, color: "#24CDA0" },
    { label: "Expired Schools", value: expired, color: "#8B65E8" },
    { label: "Expiring Soon", value: expiring, color: "#F58BAC" },
  ];

  return (
    <Panel className="h-full">
      <div className="px-4 pt-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#2874F5]">
            <Activity size={19} />
          </span>

          <div>
            <h3 className="text-[15px] font-bold tracking-tight text-[#17264A] sm:text-[16px]">
              School Status
            </h3>

            <p className="mt-0.5 text-[10px] text-[#8290A8] sm:text-[11px]">
              Distribution of schools by current status
            </p>
          </div>
        </div>
      </div>

      <div className="flex min-h-[225px] flex-col items-center justify-center gap-6 px-4 py-5 sm:flex-row">
        <div
          className="relative flex h-[150px] w-[150px] shrink-0 items-center justify-center rounded-full transition-transform duration-500 hover:scale-105"
          style={{
            background: hasData
              ? `conic-gradient(
                  #24CDA0 0% ${activePercent}%,
                  #8B65E8 ${activePercent}% ${expiredEnd}%,
                  #F58BAC ${expiredEnd}% ${Math.min(expiringEnd, 100)}%,
                  #EAF0F8 ${Math.min(expiringEnd, 100)}% 100%
                )`
              : "#EAF0F8",
          }}
        >
          <div className="flex h-[103px] w-[103px] flex-col items-center justify-center rounded-full bg-white">
            <span className="text-[25px] font-extrabold text-[#17264A]">
              {hasData ? numberFormat(total) : "—"}
            </span>

            <span className="text-[11px] text-[#8290A8]">Schools</span>
          </div>
        </div>

        <div className="w-full max-w-[195px] space-y-5">
          {rows.map((item) => {
            const percentage = hasData
              ? Math.round((item.value / total) * 100)
              : null;

            return (
              <div
                key={item.label}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />

                  <span className="truncate text-[11px] text-[#72809B]">
                    {item.label}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-[11px] font-bold text-[#243454]">
                    {hasData ? numberFormat(item.value) : "—"}
                  </span>

                  <span className="w-8 text-right text-[10px] text-[#8290A8]">
                    {percentage === null ? "—" : `${percentage}%`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}

/* ==================== UPCOMING RENEWALS ==================== */

function RenewalsPanel({ items, onViewAll }) {
  return (
    <Panel>
      <PanelHeader
        icon={CalendarDays}
        title="Upcoming Renewals"
        action="View All"
        onAction={onViewAll}
      />

      {!items.length ? (
        <EmptyState message="No upcoming renewals available." />
      ) : (
        <div className="divide-y divide-[#EDF2F8]">
          {items.slice(0, 4).map((item, index) => (
            <div
              key={item._id || item.id || index}
              className="flex items-center justify-between gap-2 px-3.5 py-3 transition-colors duration-200 hover:bg-[#F8FAFE]"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#2874F5]">
                  <Building2 size={18} />
                </span>

                <div className="min-w-0">
                  <p className="truncate text-[12px] font-bold text-[#243454]">
                    {item.schoolName || item.school?.name || "School"}
                  </p>

                  <p className="mt-0.5 text-[10px] text-[#8996AB]">
                    {dateFormat(item.renewalDate || item.expiryDate)}
                  </p>
                </div>
              </div>

              <span className="shrink-0 rounded-full bg-[#FFF0F3] px-3 py-1.5 text-[10px] font-bold text-[#F05272]">
                {item.daysRemaining !== undefined
                  ? `${item.daysRemaining} days`
                  : item.status || "Upcoming"}
              </span>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}

/* ==================== SUPPORT TICKETS ==================== */

function SupportTicketsPanel({ items, onViewAll }) {
  const statusStyle = (status = "") => {
    const value = status.toLowerCase();

    if (value === "open") return "bg-[#FFF0F3] text-[#E95070]";
    if (value === "pending") return "bg-[#FFF4E7] text-[#E69A36]";

    if (value === "resolved" || value === "closed") {
      return "bg-[#E7FBF3] text-[#12A879]";
    }

    return "bg-[#F0F3F8] text-[#718099]";
  };

  return (
    <Panel>
      <PanelHeader
        icon={Headset}
        title="Support Tickets"
        action="View All"
        onAction={onViewAll}
      />

      {!items.length ? (
        <EmptyState message="No support tickets available." />
      ) : (
        <div className="divide-y divide-[#EDF2F8]">
          {items.slice(0, 4).map((item, index) => (
            <div
              key={item._id || item.id || index}
              className="flex items-center justify-between gap-2 px-3.5 py-3.5 transition-colors duration-200 hover:bg-[#F8FAFE]"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#F59A32]" />

                <span className="shrink-0 text-[10px] font-bold text-[#718099]">
                  #{item.ticketNumber || item.ticketId || item._id || "—"}
                </span>

                <p className="min-w-0 truncate text-[11px] font-medium text-[#243454]">
                  {item.subject || item.title || "Support request"}
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1.5 text-[9px] font-bold ${statusStyle(
                  item.status
                )}`}
              >
                {item.status || "Unknown"}
              </span>
            </div>
          ))}
        </div>
      )}
    </Panel>
  );
}

/* ==================== RECENT PAYMENTS ==================== */

function RecentPaymentsPanel({ items, onViewAll }) {
  return (
    <Panel>
      <PanelHeader
        icon={CreditCard}
        title="Recent Payments"
        action="View All"
        onAction={onViewAll}
      />

      {!items.length ? (
        <EmptyState message="No recent payment records available." />
      ) : (
        <div className="divide-y divide-[#EDF2F8]">
          {items.slice(0, 4).map((item, index) => {
            const status = (item.status || "").toLowerCase();

            const paid = ["completed", "paid", "success"].includes(status);

            return (
              <div
                key={item._id || item.id || index}
                className="flex items-center justify-between gap-2 px-3.5 py-3 transition-colors duration-200 hover:bg-[#F8FAFE]"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#2874F5]">
                    <Building2 size={18} />
                  </span>

                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-bold text-[#243454]">
                      {item.schoolName || item.school?.name || "Payment"}
                    </p>

                    <p className="mt-0.5 text-[10px] text-[#8996AB]">
                      {dateFormat(item.paymentDate || item.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-[13px] font-extrabold text-[#243454]">
                    {currencyFormat(item.amount)}
                  </p>

                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-[9px] font-bold ${
                      paid
                        ? "bg-[#E4FBF1] text-[#10A879]"
                        : "bg-[#FFF4E7] text-[#E69A36]"
                    }`}
                  >
                    {item.status || "Unknown"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Panel>
  );
}

/* ==================== MAIN DASHBOARD ==================== */

export default function SuperAdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("This Year");

  const fetchDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await apiClient.get("/superadmin/dashboard");

      const payload = response.data?.data || response.data;

      setDashboardData(payload || null);
    } catch (err) {
      console.error("Dashboard API error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to load dashboard information. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const statistics = dashboardData?.statistics || {};

  const cards = [
    {
      title: "Total Schools",
      value: numberFormat(statistics.totalSchools),
      icon: Building2,
      color: "#2874F5",
      background: "#EAF2FF",
      trend: statistics.trends?.totalSchools,
    },
    {
      title: "Active Schools",
      value: numberFormat(statistics.activeSchools),
      icon: Users,
      color: "#12B981",
      background: "#E5FBF2",
      trend: statistics.trends?.activeSchools,
    },
    {
      title: "Expiring Soon",
      value: numberFormat(statistics.expiringSoon),
      icon: Clock3,
      color: "#F59A32",
      background: "#FFF3E5",
      trend: statistics.trends?.expiringSoon,
    },
    {
      title: "Total Students",
      value: numberFormat(statistics.totalStudents),
      icon: Users,
      color: "#8B45ED",
      background: "#F3EAFE",
      trend: statistics.trends?.totalStudents,
    },
    {
      title: "Total Staff",
      value: numberFormat(statistics.totalStaff),
      icon: Users,
      color: "#ED4B91",
      background: "#FDEAF2",
      trend: statistics.trends?.totalStaff,
    },
    {
      title: "Revenue",
      value: currencyFormat(statistics.totalRevenue),
      icon: Wallet,
      color: "#12B981",
      background: "#E5FBF2",
      trend: statistics.trends?.totalRevenue,
    },
  ];

  const renewals = dashboardData?.upcomingRenewals || [];
  const tickets = dashboardData?.supportTickets || [];
  const payments = dashboardData?.recentPayments || [];

  const adminName = dashboardData?.user?.name || user?.name || "Admin";

  return (
    <div className="min-h-full w-full bg-[#F4F8FE] p-3 sm:p-4 lg:p-5">
      {/* PAGE HEADING */}

      <div className="mb-5 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <h1 className="text-[29px] font-extrabold leading-tight tracking-[-1px] text-[#101F45] sm:text-[33px] lg:text-[36px]">
            Dashboard
          </h1>

          <p className="mt-1 text-[16px] font-bold text-[#17264A] sm:text-[18px]">
            Good Morning, {adminName} 👋
          </p>

          <p className="mt-1 text-[11px] text-[#8190A9] sm:text-[12px]">
            Here&apos;s what&apos;s happening with EduSchoolHub today.
          </p>
        </div>

        {/* HEADER ACTIONS */}

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/super-admin/schools/add")}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2874F5] px-4 py-2.5 text-[11px] font-bold text-white shadow-[0_4px_12px_rgba(40,116,245,0.20)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1761DC] hover:shadow-lg active:scale-95"
          >
            <Plus size={15} />
            Add School
          </button>

          <button
            type="button"
            onClick={() => navigate("/super-admin/enquiries")}
            className="inline-flex items-center gap-2 rounded-lg border border-[#E1EAF7] bg-white px-3.5 py-2.5 text-[11px] font-bold text-[#2874F5] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#BFD5F5] hover:bg-[#F2F7FF] active:scale-95"
          >
            <MessageSquare size={14} />
            View Enquiries
          </button>

          <button
            type="button"
            onClick={() => navigate("/super-admin/subscriptions")}
            className="inline-flex items-center gap-2 rounded-lg border border-[#E1EAF7] bg-white px-3.5 py-2.5 text-[11px] font-bold text-[#2874F5] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#BFD5F5] hover:bg-[#F2F7FF] active:scale-95"
          >
            <CalendarDays size={14} />
            View Renewals
          </button>

          <button
            type="button"
            onClick={fetchDashboard}
            disabled={loading}
            title="Refresh dashboard"
            className="flex h-[37px] w-[37px] items-center justify-center rounded-lg border border-[#E1EAF7] bg-white text-[#64748B] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F2F7FF] active:scale-95 disabled:opacity-50"
          >
            <RefreshCw
              size={15}
              className={loading ? "animate-spin" : ""}
            />
          </button>
        </div>
      </div>

      {/* API ERROR */}

      {error && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-[11px] text-red-600">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>

          <button
            type="button"
            onClick={fetchDashboard}
            className="shrink-0 font-bold underline"
          >
            Retry
          </button>
        </div>
      )}

      {/* STATISTICS */}

      <div className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {cards.map((card, index) => (
          <StatCard
            key={card.title}
            {...card}
            index={index}
            loading={loading}
          />
        ))}
      </div>

      {/* CHARTS */}

      <div className="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.65fr_1fr]">
        <RevenueChart
          revenueTrend={dashboardData?.revenueTrend}
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
        />

        <SchoolStatusChart statistics={statistics} />
      </div>

      {/* ACTIVITY PANELS */}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <RenewalsPanel
          items={renewals}
          onViewAll={() => navigate("/super-admin/subscriptions")}
        />

        <SupportTicketsPanel
          items={tickets}
          onViewAll={() => navigate("/super-admin/support")}
        />

        <RecentPaymentsPanel
          items={payments}
          onViewAll={() => navigate("/super-admin/revenue")}
        />
      </div>

      {/* FOOTER */}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#E5ECF7] pt-4">
        <p className="text-[10px] font-medium text-[#9AA6B8]">
          EduSchoolHub · Super Admin
        </p>

        <p className="text-[10px] text-[#9AA6B8]">
          Dashboard data is connected to your platform API.
        </p>
      </div>
    </div>
  );
}
