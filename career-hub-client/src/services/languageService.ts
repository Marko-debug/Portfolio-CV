import { API_BASE_URL } from "./apiConfig";

export interface Language {
  id: number;
  name: string;
  proficiency: string;
  description?: string;
}

const ENDPOINT = `${API_BASE_URL}/language`;

export async function getLanguages(): Promise<Language[]> {
  const res = await fetch(ENDPOINT);
  if (!res.ok) {
    throw new Error("Failed to fetch languages");
  }
  return res.json();
}

export async function addLanguage(language: Omit<Language, "id">): Promise<Language> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(language),
  });
  if (!res.ok) throw new Error("Failed to add language");
  return res.json();
}

export async function deleteLanguage(id: number): Promise<void> {
      const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete language");
}