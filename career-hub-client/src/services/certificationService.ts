import { API_BASE_URL } from "./apiConfig";

export interface Certification {
  id: number;
  name: string;
  issuer: string;
  description?: string;
  dateIssued: string;
  expirationDate: string;
}

const ENDPOINT = `${API_BASE_URL}/certification`;

export async function getCertifications(): Promise<Certification[]> {
  const res = await fetch(ENDPOINT);
  if (!res.ok) {
    throw new Error("Failed to fetch certifications");
  }
  return res.json();
}

export async function addCertification(certification: Omit<Certification, "id">): Promise<Certification> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(certification),
  });
  if (!res.ok) throw new Error("Failed to add certification");
  return res.json();
}

export async function deleteCertification(id: number): Promise<void> {
      const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete certification");
}