const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function readResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Authentication failed.");
  }

  return data;
}

export async function loginWithGoogle(credential) {
  const response = await fetch(`${API_URL}/google-auth/super-admin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ credential }),
  });

  return readResponse(response);
}

export async function getSuperAdminSession() {
  const response = await fetch(`${API_URL}/superadmin/dashboard`, {
    method: "GET",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  return readResponse(response);
}

export async function logoutGoogleSuperAdmin() {
  const response = await fetch(
    `${API_URL}/google-auth/super-admin/logout`,
    {
      method: "POST",
      credentials: "include",
      headers: { Accept: "application/json" },
    }
  );

  return readResponse(response);
}