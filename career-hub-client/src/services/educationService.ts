import { API_BASE_URL } from "./apiConfig";

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

export async function getEducations(): Promise<Education[]> {
  const res = await fetch(ENDPOINT);
  if (!res.ok) {
    throw new Error("Failed to fetch educations");
  }
  return res.json();
}

export async function addEducation(education: Omit<Education, "id">): Promise<Education> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(education),
  });
  if (!res.ok) throw new Error("Failed to add education");
  return res.json();
}

export async function deleteEducation(id: number): Promise<void> {
      const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete education");
}