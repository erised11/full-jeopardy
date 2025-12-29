import { gamesApi } from "@/services/gamesApi";

export async function jeopardyGamesListLoader() {
  return gamesApi.getGames();
}
