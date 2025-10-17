import { API_BASE_URL } from "./apiConfig";

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
 * 🔑 Helper: get token from localStorage
 */
function getAuthToken(): string | null {
  return localStorage.getItem("token");
}

/**
 * ✅ Get all experiences
 */
export async function getExperiences(): Promise<Experience[]> {
  const token = getAuthToken();
  const res = await fetch(ENDPOINT, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized: Please log in");
    throw new Error("Failed to fetch experiences");
  }

  return res.json();
}

/**
 * ✅ Add new experience (requires JWT)
 */
export async function addExperience(
  experience: Omit<Experience, "id">
): Promise<Experience> {
  const token = getAuthToken();
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(experience),
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized: Please log in");
    throw new Error("Failed to add experience");
  }

  return res.json();
}

/**
 * ✅ Delete experience (requires JWT)
 */
export async function deleteExperience(id: number): Promise<void> {
  const token = getAuthToken();
  const res = await fetch(`${ENDPOINT}/${id}`, {
    method: "DELETE",
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized: Please log in");
    throw new Error("Failed to delete experience");
  }
}
