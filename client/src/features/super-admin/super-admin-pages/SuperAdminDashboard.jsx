import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../auth/auth-services/authService";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function SuperAdminDashboard() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("checking");
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const verifySession = useCallback(async () => {
    setStatus("checking");
    setError("");

    try {
      const response = await fetch(`${API_URL}/superadmin/dashboard`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (response.status === 401) {
        navigate("/super-admin/login", { replace: true });
        return;
      }

      if (response.status === 403) {
        setStatus("forbidden");
        setError("You are not authorized to access this dashboard.");
        return;
      }

      if (!response.ok) {
        throw new Error("Unable to verify your session. Please try again.");
      }

      const result = await response.json();

      // The backend must enforce the Super Admin role.
      // Never rely on frontend checks alone for authorization.
      setDashboardData(result);
      setStatus("authenticated");
    } catch {
      setStatus("error");
      setError(
        "Unable to connect to the server. Check your connection and try again.",
      );
    }
  }, [navigate]);

  useEffect(() => {
    verifySession();
  }, [verifySession]);

 
  const handleLogout = async () => {
    setLoggingOut(true);
    setError("");

    try {
      await authService.logout();
      navigate("/super-admin/login", { replace: true });
    } catch (err) {
      setError(err.message || "Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };


  if (status === "checking") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-400" />
          <h1 className="text-lg font-semibold">Verifying your session</h1>
          <p className="mt-2 text-sm text-slate-400">
            Checking your Super Admin access securely...
          </p>
        </div>
      </main>
    );
  }

  if (status === "forbidden") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
        <section className="w-full max-w-md rounded-2xl border border-red-900 bg-slate-900 p-7 text-center">
          <h1 className="text-xl font-bold">Access denied</h1>
          <p className="mt-3 text-sm text-slate-300">{error}</p>
          <button
            onClick={() => navigate("/super-admin/login", { replace: true })}
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-3 font-medium hover:bg-indigo-500"
          >
            Return to login
          </button>
        </section>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-white">
        <section className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-7 text-center">
          <h1 className="text-xl font-bold">Connection problem</h1>
          <p className="mt-3 text-sm text-slate-300">{error}</p>
          <button
            onClick={verifySession}
            className="mt-6 rounded-lg bg-indigo-600 px-5 py-3 font-medium hover:bg-indigo-500"
          >
            Retry verification
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-slate-800 bg-slate-900/80">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <div>
            <p className="text-sm font-semibold tracking-wide text-indigo-400">
              EDUSCHOOLHUB
            </p>
            <h1 className="mt-1 text-xl font-bold sm:text-2xl">
              Super Admin Dashboard
            </h1>
          </div>

          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <section className="rounded-2xl border border-emerald-900 bg-emerald-950/30 p-6">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xl text-emerald-400">
              ✓
            </span>
            <div>
              <h2 className="text-lg font-bold text-emerald-300">
                Authentication successful
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                The backend accepted your session and returned a successful
                response from the protected Super Admin endpoint.
              </p>
              <p className="mt-3 text-xs text-slate-400">
                Access verification: successful
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Authentication</p>
            <p className="mt-3 text-2xl font-bold">Verified</p>
            <p className="mt-2 text-sm text-slate-400">
              Protected API responded successfully.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <p className="text-sm text-slate-400">Access control</p>
            <p className="mt-3 text-2xl font-bold">Server enforced</p>
            <p className="mt-2 text-sm text-slate-400">
              Super Admin authorization must be checked by the backend.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:col-span-2 lg:col-span-1">
            <p className="text-sm text-slate-400">Dashboard API</p>
            <p className="mt-3 break-all text-lg font-semibold">
              GET /api/superadmin/dashboard
            </p>
            <p className="mt-2 text-sm text-slate-400">
              Session verification endpoint.
            </p>
          </article>
        </section>

        <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-bold">Backend response</h2>
          <p className="mt-2 text-sm text-slate-400">
            Data returned by your protected dashboard endpoint:
          </p>

          <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs leading-6 text-emerald-300">
            {JSON.stringify(dashboardData, null, 2)}
          </pre>
        </section>

        {error && (
          <p role="alert" className="mt-5 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    </main>
  );
}
