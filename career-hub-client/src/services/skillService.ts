import { API_BASE_URL } from "./apiConfig";

export interface Skill {
  id: number;
  name: string;
  level: string;
  description?: string;
}

const ENDPOINT = `${API_BASE_URL}/skill`;

export async function getSkills(): Promise<Skill[]> {
  const res = await fetch(ENDPOINT);
  if (!res.ok) {
    throw new Error("Failed to fetch skills");
  }
  return res.json();
}

export async function addSkill(skill: Omit<Skill, "id">): Promise<Skill> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(skill),
  });
  if (!res.ok) throw new Error("Failed to add skill");
  return res.json();
}

export async function deleteSkill(id: number): Promise<void> {
      const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete skill");
}