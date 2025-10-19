import { API_BASE_URL } from "./apiConfig";
import { getCsrfToken } from "./authService"

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  description?: string;
  dateIssued: string;
  expirationDate: string;
}

const ENDPOINT = `${API_BASE_URL}/certification`;

/**
 * ✅ Get all certification
 * - Cookies are sent automatically (if logged in)
 */
export async function getCertifications(): Promise<Certification[]> {
  const res = await fetch(ENDPOINT); // ✅ no credentials
  if (!res.ok) throw new Error("Failed to fetch certifications");
  return res.json();
}

 //Add new certification (CSRF + JWT protection)
export async function addCertification(
  certification: Omit<Certification, "id">
): Promise<Certification> {
  const csrfToken = await getCsrfToken();

  const res = await fetch(ENDPOINT, {
    method: "POST",
    credentials: "include", // include cookies (JWT + CSRF cookie)
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrfToken || "",
    },
    body: JSON.stringify(certification),
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized: Please log in");
    if (res.status === 403) throw new Error("CSRF token invalid");
    throw new Error("Failed to certification");
  }

  return res.json();
}

/**
 * ✅ Delete certification (protected)
 */
export async function deleteCertification(id: number): Promise<void> {
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
    throw new Error("Failed to delete certification");
  }
}

