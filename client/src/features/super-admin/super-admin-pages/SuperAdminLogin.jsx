import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../../../common-components/shared-components/GoogleLoginButton";
import authService from "../../auth/auth-services/authService";
import { useAuth } from "../../../app-context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function SuperAdminLogin() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const email = form.email.trim().toLowerCase();
    const password = form.password;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/auth/super-admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          rememberMe,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to sign in. Please try again.",
        );
      }

      if (result.user?.role !== "superAdmin") {
        throw new Error("Super Admin access is required.");
      }

      setUser(result.user);
      navigate("/super-admin/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to connect to the server.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCredential = async (credential) => {
    setError("");

    try {
      setGoogleLoading(true);

      const result = await authService.googleSuperAdminLogin(credential);

      if (result.user?.role !== "superAdmin") {
        throw new Error("Super Admin access is required.");
      }

      setUser(result.user);
      navigate("/super-admin/dashboard", { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Google sign-in failed. Please try again.",
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const features = [
    {
      icon: "▦",
      title: "Manage Schools",
      description: "Onboard and manage multiple schools with ease.",
      color: "bg-blue-100 text-blue-700",
    },
    {
      icon: "♛",
      title: "Control Plans & Features",
      description: "Manage subscriptions and school-wise access.",
      color: "bg-violet-100 text-violet-700",
    },
    {
      icon: "▥",
      title: "Track Revenue & Operations",
      description: "Review platform insights and operational reports.",
      color: "bg-emerald-100 text-emerald-700",
    },
  ];

  const overviewItems = [
    ["Schools", "Manage all"],
    ["Subscriptions", "Control plans"],
    ["Analytics", "View reports"],
  ];

  const stats = [
    ["500+", "Schools"],
    ["100K+", "Students"],
    ["99.9%", "Reliability"],
  ];

  const isLoading = loading || googleLoading;

  return (
    <main className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[1.18fr_0.82fr]">
      {/* Left branding panel */}
      <section className="relative flex flex-col overflow-hidden bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 px-6 py-8 sm:px-10 lg:min-h-screen lg:justify-between lg:px-12 xl:px-16">
        <div className="pointer-events-none absolute -left-32 top-32 h-96 w-96 rounded-full bg-white/60 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-20 h-80 w-80 rounded-full bg-indigo-300/40 blur-3xl" />

        <Link
          to="/"
          className="relative z-10 inline-flex w-fit items-center gap-3"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-3xl font-extrabold text-white shadow-lg">
            E
          </span>

          <span className="text-2xl font-extrabold tracking-tight text-slate-950">
            Edu<span className="text-blue-600">SchoolHub</span>
          </span>
        </Link>

        <div className="relative z-10 mx-auto mt-12 w-full max-w-2xl lg:my-12">
          <p className="text-xs font-bold tracking-[0.25em] text-blue-700">
            SCHOOLS · PEOPLE · GROWTH · TOGETHER
          </p>

          <h1 className="mt-7 text-4xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-5xl xl:text-6xl">
            Smart School Management{" "}
            <span className="text-blue-600">Platform</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Empowering schools with seamless management, insights and growth —
            all in one powerful platform.
          </p>

          <div className="mt-9 space-y-5">
            {features.map((item) => (
              <div key={item.title} className="flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl ${item.color}`}
                >
                  {item.icon}
                </div>

                <div>
                  <h2 className="font-bold text-slate-950">{item.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard preview */}
          <div className="relative mt-10 hidden rounded-2xl border border-white/80 bg-white/80 p-5 shadow-xl backdrop-blur sm:block">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs text-slate-500">Platform overview</p>
                <h3 className="mt-1 font-bold text-slate-900">
                  Your schools at a glance
                </h3>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Platform preview
              </span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {overviewItems.map(([label, value]) => (
                <div key={label} className="rounded-xl bg-blue-50/80 p-3">
                  <p className="text-xs text-slate-500">{label}</p>
                  <p className="mt-2 text-sm font-bold text-blue-700">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform statistics */}
        <div className="relative z-10 mt-10 grid grid-cols-3 gap-3 border-t border-blue-200/70 pt-6 lg:mt-0">
          {stats.map(([value, label]) => (
            <div key={label}>
              <strong className="text-xl font-extrabold text-blue-700 sm:text-2xl">
                {value}
              </strong>
              <p className="mt-1 text-xs text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Login panel */}
      <section className="flex min-h-[650px] flex-col justify-center px-5 py-12 sm:px-10 lg:min-h-screen lg:px-12 xl:px-16">
        <div className="mx-auto w-full max-w-lg">
          <div className="mb-6 flex justify-end">
            <span className="text-sm font-medium text-slate-600">
              ◎ English
            </span>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-blue-900/5 sm:p-9 xl:p-10">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-3xl font-extrabold text-white shadow-lg">
                E
              </div>

              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950">
                Super Admin Login
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
                Sign in to access the EduSchoolHub control panel.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@eduschoolhub.com"
                  required
                  disabled={isLoading}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Password
                </label>

                <div className="flex items-center rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                    disabled={isLoading}
                    className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-slate-400 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="px-4 py-3 text-sm font-semibold text-slate-500 hover:text-blue-600"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember me and forgot password */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-slate-700">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    disabled={isLoading}
                    className="h-4 w-4 accent-blue-600"
                  />
                  Remember me
                </label>

                <Link
                  to="/super-admin/forgot-password"
                  className="font-semibold text-blue-600 hover:text-blue-800"
                >
                  Forgot Password?
                </Link>
              </div>

              {error && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Password login */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:from-blue-700 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Login to Dashboard"}
                {!isLoading && <span aria-hidden="true">→</span>}
              </button>
            </form>

            {/* Divider */}
            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold text-slate-400">OR</span>
              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Google login */}
            <div className="flex flex-col items-center gap-3">
              <GoogleLoginButton
                onCredential={handleGoogleCredential}
                onError={(message) => setError(message)}
                disabled={isLoading}
              />

              {googleLoading && (
                <p className="text-sm text-slate-500" role="status">
                  Verifying your Google account...
                </p>
              )}
            </div>

            <div className="mt-6 rounded-xl bg-blue-50/80 px-4 py-4 text-center">
              <p className="text-sm font-semibold text-slate-700">
                ♢ Protected admin access
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Only authorized Super Admin accounts can access this area.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} EduSchoolHub.</p>

            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-blue-600">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-blue-600">
                Terms
              </Link>
              <a
                href="mailto:hello@eduschoolhub.com"
                className="hover:text-blue-600"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
