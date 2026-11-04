
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../app-context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait until session restoration is completed
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="text-sm font-medium text-slate-600">
            Checking authentication...
          </p>
        </div>
      </div>
    );
  }

  // Redirect unauthenticated users to login
  if (!user) {
    return (
      <Navigate
        to="/super-admin/login"
        state={{ from: location }}
        replace
      />
    );
  }

  // Allow authenticated users
  return <Outlet />;
}
