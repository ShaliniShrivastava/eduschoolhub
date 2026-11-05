
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./app-context/AuthContext";

// Route Protection
import ProtectedRoute from "./app-routes/ProtectedRoute";
import RoleRoute from "./app-routes/RoleRoutes.jsx";

// Public Website Pages
import Home from "./features/main-website/main-website-pages/Home.jsx";
import Features from "./features/main-website/main-website-pages/Features.jsx";
import Modules from "./features/main-website/main-website-pages/Modules.jsx";
import Pricing from "./features/main-website/main-website-pages/Pricing.jsx";
import About from "./features/main-website/main-website-pages/About.jsx";
import Contact from "./features/main-website/main-website-pages/Contact.jsx";

// Public Website Components
import MainNavbar from "./features/main-website/main-website-components/MainNavbar.jsx";
import MainFooter from "./features/main-website/main-website-components/MainFooter.jsx";
import BookDemoForm from "./features/main-website/main-website-components/BookDemoForm.jsx";

// Authentication Pages
import Login from "./features/auth/auth-pages/Login.jsx";
import Register from "./features/auth/auth-pages/Register.jsx";
import ForgotPassword from "./features/auth/auth-pages/ForgotPassword.jsx";
import ResetPassword from "./features/auth/auth-pages/ResetPassword.jsx";

// Super Admin Pages
import SuperAdminLogin from "./features/super-admin/super-admin-pages/SuperAdminLogin.jsx";
import SuperAdminDashboard from "./features/super-admin/super-admin-pages/SuperAdminDashboard.jsx";
import WebsiteHomeEditor from "./features/super-admin/super-admin-pages/WebsiteHomeEditor.jsx";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Public Website Layout
function PublicLayout({ children }) {
  return (
    <>
      <MainNavbar />
      <main>{children}</main>
      <MainFooter />
    </>
  );
}

// 404 Page
function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Page Not Found
      </h2>

      <p className="mt-3 max-w-md text-gray-600">
        The page you are looking for does not exist or may have been moved.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Back to Home
      </Link>
    </div>
  );
}

// Main App
function App() {
  if (!GOOGLE_CLIENT_ID) {
    console.warn("VITE_GOOGLE_CLIENT_ID is missing from your environment variables.");
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || "placeholder"}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>

            {/* Public Website Routes */}
            <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
            <Route path="/features" element={<PublicLayout><Features /></PublicLayout>} />
            <Route path="/modules" element={<PublicLayout><Modules /></PublicLayout>} />
            <Route path="/pricing" element={<PublicLayout><Pricing /></PublicLayout>} />
            <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
            <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
            <Route path="/book-demo" element={<PublicLayout><BookDemoForm /></PublicLayout>} />

            {/* Authentication Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Super Admin Login */}
            <Route path="/super-admin/login" element={<SuperAdminLogin />} />

            {/* Protected Super Admin Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<RoleRoute allowedRoles={["superAdmin"]} />}>
                <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
                <Route path="/super-admin/website-cms" element={<WebsiteHomeEditor />} />
              </Route>
            </Route>

            {/* 404 Fallback Route */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
