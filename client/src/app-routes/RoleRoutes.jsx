
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app-context/AuthContext";

export default function RoleRoute({ allowedRoles = [] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          <p className="text-sm text-slate-600">
            Checking permissions...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/super-admin/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "superAdmin":
        return <Navigate to="/super-admin/dashboard" replace />;

      case "schoolAdmin":
        return <Navigate to="/school-admin/dashboard" replace />;

      case "staff":
        return <Navigate to="/staff/dashboard" replace />;

      case "student":
        return <Navigate to="/student/dashboard" replace />;

      default:
        return <Navigate to="/super-admin/login" replace />;
    }
  }

  return <Outlet />;
}
