import { API_BASE_URL } from "./apiConfig";

export interface Hobby {
  id: number;
  name: string;
  description?: string;
}

const ENDPOINT = `${API_BASE_URL}/hobby`;

export async function getHobbies(): Promise<Hobby[]> {
  const res = await fetch(ENDPOINT);
  if (!res.ok) {
    throw new Error("Failed to fetch hobbies");
  }
  return res.json();
}

export async function addHobby(hobby: Omit<Hobby, "id">): Promise<Hobby> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(hobby),
  });
  if (!res.ok) throw new Error("Failed to add hobby");
  return res.json();
}

export async function deleteHobby(id: number): Promise<void> {
      const res = await fetch(`${ENDPOINT}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete hobby");
}