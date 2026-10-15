
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

// Authentication context and route protection
import { AuthProvider } from "./app-context/AuthContext";
import ProtectedRoute from "./app-routes/ProtectedRoute";
import RoleRoute from "./app-routes/RoleRoute";

// Public website
import Home from "./features/main-website/main-website-pages/Home.jsx";
import MainNavbar from "./features/main-website/main-website-components/MainNavbar.jsx";
import MainFooter from "./features/main-website/main-website-components/MainFooter.jsx";

// Authentication pages
import Login from "./features/auth/auth-pages/Login.jsx";
import Register from "./features/auth/auth-pages/Register.jsx";
import ForgotPassword from "./features/auth/auth-pages/ForgotPassword.jsx";
import ResetPassword from "./features/auth/auth-pages/ResetPassword.jsx";

// Super Admin pages
import SuperAdminLogin from "./pages/SuperAdminLogin.jsx";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard.jsx";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
      <div className="max-w-md text-center">
        <p className="text-sm font-bold tracking-widest text-blue-600">
          ERROR 404
        </p>

        <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
          Page Not Found
        </h1>

        <p className="mt-4 text-slate-600">
          The page you are looking for does not exist or may have been moved.
        </p>

        <Link
          to="/"
          className="mt-7 inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

function App() {
  if (!GOOGLE_CLIENT_ID) {
    console.warn(
      "VITE_GOOGLE_CLIENT_ID is missing from the frontend .env file."
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || "placeholder"}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public website */}
            <Route
              path="/"
              element={
                <>
                  <MainNavbar />
                  <Home />
                  <MainFooter />
                </>
              }
            />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Super Admin login */}
            <Route
              path="/super-admin/login"
              element={<SuperAdminLogin />}
            />

            {/* Protected Super Admin dashboard */}
            <Route element={<ProtectedRoute />}>
              <Route element={<RoleRoute allowedRoles={["superAdmin"]} />}>
                <Route
                  path="/super-admin/dashboard"
                  element={<SuperAdminDashboard />}
                />
              </Route>
            </Route>

            {/* Unknown routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
