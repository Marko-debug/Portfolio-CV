import { API_BASE_URL } from "./apiConfig";

async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!res.ok) {
    const message = await res.text();
    throw new Error(message || "API request failed");
  }
  return res.json();
}

export const apiClient = {
  get: <T>(url: string) => apiRequest<T>(url),
  post: <T>(url: string, data: any) =>
    apiRequest<T>(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }),
  delete: (url: string) =>
    apiRequest<void>(url, { method: "DELETE" }),
};
