
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Home from "./pages/Home.jsx";
import SuperAdminLogin from "./pages/SuperAdminLogin.jsx";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard.jsx";

import MainNavbar from "./components/public-website/mainNavbar.jsx";
import MainFooter from "./components/public-website/MainFooter.jsx";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  if (!GOOGLE_CLIENT_ID) {
    console.error(
      "VITE_GOOGLE_CLIENT_ID is missing from the frontend .env file."
    );
  }

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || ""}>
      <BrowserRouter>
        <Routes>
          {/* Public Website */}
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

          {/* Super Admin Login */}
          <Route
            path="/super-admin/login"
            element={<SuperAdminLogin />}
          />

          {/* Super Admin Dashboard */}
          <Route
            path="/super-admin/dashboard"
            element={<SuperAdminDashboard />}
          />

          {/* Invalid URL */}
          <Route
            path="*"
            element={
              <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                  <h1 className="text-3xl font-bold">
                    404 - Page Not Found
                  </h1>
                  <a href="/" className="text-blue-600 underline">
                    Go to Home
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
