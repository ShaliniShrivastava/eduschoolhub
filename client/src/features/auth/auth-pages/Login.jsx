
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../../../common-components/shared-components/GoogleLoginButton";
import authService from "../auth-services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  const isLoading = loading || googleLoading;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const redirectByRole = (user) => {
    switch (user?.role) {
      case "superAdmin":
        navigate("/super-admin/dashboard", { replace: true });
        break;
      case "schoolAdmin":
        navigate("/school-admin/dashboard", { replace: true });
        break;
      case "staff":
        navigate("/staff/dashboard", { replace: true });
        break;
      case "student":
        navigate("/student/dashboard", { replace: true });
        break;
      default:
        throw new Error("Your account role is not supported.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      setLoading(true);

      const result = await authService.login({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      redirectByRole(result.user);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleCredential = async (credential) => {
    setError("");

    try {
      setGoogleLoading(true);

      const result = await authService.googleLogin(credential);
      redirectByRole(result.user);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Google sign-in failed. Please try again."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-7 text-center">
          <Link to="/" className="text-2xl font-extrabold text-slate-900">
            Edu<span className="text-blue-600">SchoolHub</span>
          </Link>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to access your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
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
              placeholder="Enter your email"
              required
              disabled={isLoading}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 disabled:opacity-60"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <div className="flex rounded-xl border border-slate-300 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
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
                className="min-w-0 flex-1 rounded-xl bg-transparent px-4 py-3 outline-none disabled:opacity-60"
              />

              <button
                type="button"
                onClick={() => setShowPassword((previous) => !previous)}
                disabled={isLoading}
                className="px-3 text-sm font-semibold text-slate-500 hover:text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-sm font-semibold text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-semibold text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <GoogleLoginButton
            onCredential={handleGoogleCredential}
            onError={setError}
            disabled={isLoading}
          />

          {googleLoading && (
            <p role="status" className="text-sm text-slate-500">
              Verifying your Google account...
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          School registration?{" "}
          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:text-blue-800"
          >
            Create an account
          </Link>
        </p>
      </section>
    </main>
  );
}
