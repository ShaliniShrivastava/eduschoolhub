
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { AuthProvider } from "./app-context/AuthContext";
import ProtectedRoute from "./app-routes/ProtectedRoute";
import RoleRoute from "./app-routes/RoleRoute";

import Home from "./pages/Home.jsx";
import SuperAdminLogin from "./pages/SuperAdminLogin.jsx";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard.jsx";

import MainNavbar from "./components/public-website/mainNavbar.jsx";
import MainFooter from "./components/public-website/MainFooter.jsx";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  if (!GOOGLE_CLIENT_ID) {
    console.error(
      "VITE_GOOGLE_CLIENT_ID is missing from frontend .env."
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ""}>
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

            {/* Login routes */}
            <Route
              path="/login"
              element={
                <Navigate to="/super-admin/login" replace />
              }
            />

            <Route
              path="/super-admin/login"
              element={<SuperAdminLogin />}
            />

            {/* Protected Super Admin routes */}
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

            {/* Unknown routes */}
            <Route
              path="*"
              element={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-3xl font-bold">
                      404 - Page Not Found
                    </h1>

                    <Link
                      to="/"
                      className="mt-4 inline-block text-blue-600 underline"
                    >
                      Go to Home
                    </Link>
                  </div>
                </div>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
