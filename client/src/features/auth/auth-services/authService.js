
import apiClient from "../../../app-services/apiClient";

const authService = {
  // Email and password login
  login: async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },

  // Google registration
  googleRegister: async (credential) => {
    const response = await apiClient.post("/auth/google/register", {
      credential,
    });
    return response.data;
  },

  // Google login for school admin, staff, or student
  googleLogin: async (credential) => {
    const response = await apiClient.post("/auth/google/login", {
      credential,
    });
    return response.data;
  },

  // Google login for Super Admin
  googleSuperAdminLogin: async (credential) => {
    const response = await apiClient.post("/google-auth/super-admin", {
      credential,
    });
    return response.data;
  },

// Fetch current authenticated user
getCurrentUser: async () => {
  const response = await apiClient.get("/auth/me");
  return response.data;
},

  // Logout
  logout: async () => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  },
};

export default authService;
