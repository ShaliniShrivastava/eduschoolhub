
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../features/auth/auth-pages/Login";
import SuperAdminLogin from "../features/super-admin/super-admin-pages/SuperAdminLogin";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

// Apne existing dashboard components ke paths ke according imports update karna.
import SuperAdminDashboard from "../features/super-admin/super-admin-pages/SuperAdminDashboard";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/super-admin/login" element={<SuperAdminLogin />} />

      {/* Super Admin protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute allowedRoles={["superAdmin"]} />}>
          <Route
            path="/super-admin/dashboard"
            element={<SuperAdminDashboard />}
          />
        </Route>
      </Route>

      {/* Default and fallback routes */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
