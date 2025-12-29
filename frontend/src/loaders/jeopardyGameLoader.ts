import { LoaderFunctionArgs } from "react-router";
import { JeopardyGameType } from "@shared/types/types";
import { gamesApi } from "@/services/gamesApi";

export async function jeopardyGameLoader({
  params,
}: LoaderFunctionArgs): Promise<JeopardyGameType> {
  return gamesApi.getGame(params.gameId);
}
