import { JeopardyGame } from "@shared/types/types";

export async function jeopardyGamesListLoader() {
  const response = await fetch("http://localhost:4000/games");

  if (!response.ok) {
    throw new Response("Failed to load games", { status: 500 });
  }

  const data: JeopardyGame[] = await response.json();

  return data;
}
