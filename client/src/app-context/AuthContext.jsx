
import { createContext, useContext, useEffect, useState } from "react";
import authService from "../features/auth/auth-services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore existing session when app starts or page refreshes.
  // apiClient interceptor will attempt token refresh if access token expires.
  useEffect(() => {
    let isMounted = true;

    const restoreSession = async () => {
      try {
        const response = await authService.getCurrentUser();

        if (isMounted) {
          setUser(response?.user ?? null);
        }
      } catch (error) {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  // Email/password login
  const login = async (credentials) => {
    setLoading(true);

    try {
      const response = await authService.login(credentials);
      setUser(response?.user ?? null);
      return response;
    } finally {
      setLoading(false);
    }
  };

  // Google login
  const googleLogin = async (credential) => {
    setLoading(true);

    try {
      const response = await authService.googleLogin(credential);
      setUser(response?.user ?? null);
      return response;
    } finally {
      setLoading(false);
    }
  };

  // Super Admin Google login
  const googleSuperAdminLogin = async (credential) => {
    setLoading(true);

    try {
      const response =
        await authService.googleSuperAdminLogin(credential);

      setUser(response?.user ?? null);
      return response;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    setLoading(true);

    try {
      await authService.logout();
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        googleLogin,
        googleSuperAdminLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
