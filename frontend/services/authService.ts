// src/services/authService.ts
import { API_BASE_URL } from "./apiConfig";

let csrfToken: string | null = null;

export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ✅ includes cookies
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");
  return await res.json();
}

// src/services/authService.ts
export async function logout(): Promise<void> {
  await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}


export async function refreshToken() {
  const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) return null;
  return await res.json();
}

// src/services/authService.ts
export async function checkAuth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      credentials: "include",
    });
    return res.ok;
  } catch {
    return false;
  }
}

// ✅ Fetch CSRF token (only once per session)
export async function getCsrfToken(): Promise<string | null> {
  if (csrfToken) return csrfToken;

  try {
    const res = await fetch(`${API_BASE_URL}/csrf/token`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) return null;
    const data = await res.json();
    csrfToken = data.token;
    return csrfToken;
  } catch {
    return null;
  }
}

// Optional: read existing token
export function getStoredCsrfToken() {
  return csrfToken;
}

