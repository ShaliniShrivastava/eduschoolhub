import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app-context/AuthContext";

export default function RoleRoute({ allowedRoles = [] }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-600">Checking permissions...</p>
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
