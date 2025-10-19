import { API_BASE_URL } from "./apiConfig";
import { getCsrfToken } from "./authService"

export interface Education {
  id: number;
  institution: string;
  degree: string;
  field: string;
  description: string;
  startDate: string;
  endDate?: string;
}

const ENDPOINT = `${API_BASE_URL}/education`;

/**
 * ✅ Get all educations
 * - Cookies are sent automatically (if logged in)
 */
export async function getEducations(): Promise<Education[]> {
  const res = await fetch(ENDPOINT); // ✅ no credentials
  if (!res.ok) throw new Error("Failed to fetch educations");
  return res.json();
}

 //Add new education (CSRF + JWT protection)
export async function addEducation(
  education: Omit<Education, "id">
): Promise<Education> {
  const csrfToken = await getCsrfToken();

  const res = await fetch(ENDPOINT, {
    method: "POST",
    credentials: "include", // include cookies (JWT + CSRF cookie)
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken || "",
    },
    body: JSON.stringify(education),
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized: Please log in");
    if (res.status === 403) throw new Error("CSRF token invalid");
    throw new Error("Failed to add education");
  }

  return res.json();
}

/**
 * ✅ Delete education (protected)
 */
export async function deleteEducation(id: number): Promise<void> {
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
    throw new Error("Failed to delete education");
  }
}

