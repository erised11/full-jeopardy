import { LoaderFunctionArgs } from "react-router";
import { JeopardyGame } from "@shared/types/types";

export async function jeopardyGameLoader({
  params,
}: LoaderFunctionArgs): Promise<JeopardyGame> {
  const response = await fetch(`http://localhost:4000/games/${params.gameId}`);

  if (response.status === 404) {
    throw new Response("Game not found", { status: 404 });
  }

  if (!response.ok) {
    throw new Response("Failed to load game", { status: 500 });
  }

  const game: JeopardyGame = await response.json();
  return game;
}
