import { API_BASE_URL } from "./apiConfig";
import { getCsrfToken } from "./authService"

export interface Experience {
  id: number;
  title: string;
  company: string;
  description: string;
  startDate: string;
  endDate?: string;
}

const ENDPOINT = `${API_BASE_URL}/experience`;

/**
 * ✅ Get all experiences
 * - Cookies are sent automatically (if logged in)
 */
export async function getExperiences(): Promise<Experience[]> {
  const res = await fetch(ENDPOINT); // ✅ no credentials
  if (!res.ok) throw new Error("Failed to fetch experiences");
  return res.json();
}

 //Add new experience (CSRF + JWT protection)
export async function addExperience(
  experience: Omit<Experience, "id">
): Promise<Experience> {
  const csrfToken = await getCsrfToken();

  const res = await fetch(ENDPOINT, {
    method: "POST",
    credentials: "include", // include cookies (JWT + CSRF cookie)
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken || "",
    },
    body: JSON.stringify(experience),
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized: Please log in");
    if (res.status === 403) throw new Error("CSRF token invalid");
    throw new Error("Failed to add experience");
  }

  return res.json();
}

/**
 * ✅ Delete experience (protected)
 */
export async function deleteExperience(id: number): Promise<void> {
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
    throw new Error("Failed to delete experience");
  }
}

