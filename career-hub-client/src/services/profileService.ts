import { API_BASE_URL } from "./apiConfig";

export interface Profile {
  id?: number;
  position: string;
  photoUrl?: string;
}

const ENDPOINT = `${API_BASE_URL}/profile`;

/**
 * ✅ Helper to get the stored JWT token
 */
function getAuthToken(): string | null {
  return localStorage.getItem("token");
}

/**
 * ✅ Fetch the current profile (photo + position)
 */
export async function getProfile(): Promise<Profile> {
  const token = getAuthToken();
  const res = await fetch(ENDPOINT, {
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized: Please log in");
    throw new Error("Failed to fetch profile");
  }

  return res.json();
}

/**
 * ✅ Upload or update profile (photo + position)
 */
export async function updateProfile(file: File | null, position: string): Promise<Profile> {
  const token = getAuthToken();
  const formData = new FormData();
  if (file) formData.append("file", file);
  formData.append("position", position);

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: token
      ? { Authorization: `Bearer ${token}` }
      : {},
    body: formData,
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized: Please log in");
    throw new Error("Failed to update profile");
  }

  return res.json();
}
