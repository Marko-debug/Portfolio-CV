import { API_BASE_URL } from "./apiConfig";
import { getCsrfToken } from "./authService"

export interface Skill {
  id: number;
  name: string;
  level: string;
  description?: string;
}

const ENDPOINT = `${API_BASE_URL}/skill`;

/**
 * ✅ Get all skill
 * - Cookies are sent automatically (if logged in)
 */
export async function getSkills(): Promise<Skill[]> {
  const res = await fetch(ENDPOINT); // ✅ no credentials
  if (!res.ok) throw new Error("Failed to fetch skills");
  return res.json();
}

 //Add new skill (CSRF + JWT protection)
export async function addSkill(
  skill: Omit<Skill, "id">
): Promise<Skill> {
  const csrfToken = await getCsrfToken();

  const res = await fetch(ENDPOINT, {
    method: "POST",
    credentials: "include", // include cookies (JWT + CSRF cookie)
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken || "",
    },
    body: JSON.stringify(skill),
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized: Please log in");
    if (res.status === 403) throw new Error("CSRF token invalid");
    throw new Error("Failed to add skill");
  }

  return res.json();
}

/**
 * ✅ Delete skill (protected)
 */
export async function deleteSkill(id: number): Promise<void> {
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
    throw new Error("Failed to delete skill");
  }
}

