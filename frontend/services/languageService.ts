import { API_BASE_URL } from "./apiConfig";
import { getCsrfToken } from "./authService"

export interface Language {
  id: number;
  name: string;
  proficiency: string;
  description?: string;
}

const ENDPOINT = `${API_BASE_URL}/language`;

/**
 * ✅ Get all languages
 * - Cookies are sent automatically (if logged in)
 */
export async function getLanguages(): Promise<Language[]> {
  const res = await fetch(ENDPOINT); // ✅ no credentials
  if (!res.ok) throw new Error("Failed to fetch languages");
  return res.json();
}

 //Add new language (CSRF + JWT protection)
export async function addLanguage(
  language: Omit<Language, "id">
): Promise<Language> {
  const csrfToken = await getCsrfToken();

  const res = await fetch(ENDPOINT, {
    method: "POST",
    credentials: "include", // include cookies (JWT + CSRF cookie)
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken || "",
    },
    body: JSON.stringify(language),
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized: Please log in");
    if (res.status === 403) throw new Error("CSRF token invalid");
    throw new Error("Failed to add language");
  }

  return res.json();
}

/**
 * ✅ Delete language (protected)
 */
export async function deleteLanguage(id: number): Promise<void> {
  const csrfToken = await getCsrfToken();

  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "X-CSRF-TOKEN": csrfToken || "",
    },
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized: Please log in");
    if (res.status === 403) throw new Error("CSRF token invalid");
    throw new Error("Failed to delete language");
  }
}

