import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../app-context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-600">Checking authentication...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to="/super-admin/login" state={{ from: location }} replace />
    );
  }

  return <Outlet />;
}
