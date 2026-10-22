
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
import RoleRoute from "./app-routes/RoleRoutes.jsx";

// Public website pages
import Home from "./features/main-website/main-website-pages/Home.jsx";
import Features from "./features/main-website/main-website-pages/Features.jsx";
import Modules from "./features/main-website/main-website-pages/Modules.jsx";
import Pricing from "./features/main-website/main-website-pages/Pricing.jsx";
import About from "./features/main-website/main-website-pages/About.jsx";
import Contact from "./features/main-website/main-website-pages/Contact.jsx";

// Public website components
import MainNavbar from "./features/main-website/main-website-components/MainNavbar.jsx";
import MainFooter from "./features/main-website/main-website-components/MainFooter.jsx";

// Authentication pages
import Login from "./features/auth/auth-pages/Login.jsx";
import Register from "./features/auth/auth-pages/Register.jsx";
import ForgotPassword from "./features/auth/auth-pages/ForgotPassword.jsx";
import ResetPassword from "./features/auth/auth-pages/ResetPassword.jsx";

// Super Admin pages
import SuperAdminLogin from "./features/super-admin/super-admin-pages/SuperAdminLogin.jsx";
import SuperAdminDashboard from "./features/super-admin/super-admin-pages/SuperAdminDashboard.jsx";

// Google OAuth configuration
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// 404 Not Found Page
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
  // Check Google OAuth configuration
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
            {/* ================= PUBLIC WEBSITE ================= */}

            {/* Home Page */}
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

            {/* Features Page */}
            <Route
              path="/features"
              element={
                <>
                  <MainNavbar />
                  <Features />
                  <MainFooter />
                </>
              }
            />

            {/* Modules Page */}
            <Route
              path="/modules"
              element={
                <>
                  <MainNavbar />
                  <Modules />
                  <MainFooter />
                </>
              }
            />

            <Route
  path="/pricing"
  element={
    <>
      <MainNavbar />
      <Pricing />
      <MainFooter />
    </>
  }
/>

<Route
  path="/about"
  element={
    <>
      <MainNavbar />
      <About />
      <MainFooter />
    </>
  }
/>

<Route
  path="/contact"
  element={
    <>
      <MainNavbar />
      <Contact />
      <MainFooter />
    </>
  }
/>

            {/* ================= AUTHENTICATION ================= */}

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Register */}
            <Route path="/register" element={<Register />} />

            {/* Forgot Password */}
            <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

            {/* Reset Password */}
            <Route
              path="/reset-password"
              element={<ResetPassword />}
            />

            {/* ================= SUPER ADMIN ================= */}

            {/* Super Admin Login */}
            <Route
              path="/super-admin/login"
              element={<SuperAdminLogin />}
            />

            {/* Protected Super Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                element={
                  <RoleRoute allowedRoles={["superAdmin"]} />
                }
              >
                <Route
                  path="/super-admin/dashboard"
                  element={<SuperAdminDashboard />}
                />
              </Route>
            </Route>

            {/* ================= FALLBACK ROUTE ================= */}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
