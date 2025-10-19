import { API_BASE_URL } from "./apiConfig";
import { getCsrfToken } from "./authService"

export interface Hobby {
  id: number;
  name: string;
  description?: string;
}

const ENDPOINT = `${API_BASE_URL}/hobby`;

/**
 * ✅ Get all hobbies
 * - Cookies are sent automatically (if logged in)
 */
export async function getHobbies(): Promise<Hobby[]> {
  const res = await fetch(ENDPOINT); // ✅ no credentials
  if (!res.ok) throw new Error("Failed to fetch hobbies");
  return res.json();
}

 //Add new hobby (CSRF + JWT protection)
export async function addHobby(
  hobby: Omit<Hobby, "id">
): Promise<Hobby> {
  const csrfToken = await getCsrfToken();

  const res = await fetch(ENDPOINT, {
    method: "POST",
    credentials: "include", // include cookies (JWT + CSRF cookie)
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken || "",
    },
    body: JSON.stringify(hobby),
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized: Please log in");
    if (res.status === 403) throw new Error("CSRF token invalid");
    throw new Error("Failed to add hobby");
  }

  return res.json();
}

/**
 * ✅ Delete hobby (protected)
 */
export async function deleteHobby(id: number): Promise<void> {
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
    throw new Error("Failed to delete hobby");
  }
}

