import { LoaderFunctionArgs } from "react-router";
import { JeopardyGameType } from "@shared/types/types";
import { gamesApi } from "@/services/gamesApi";
import jeopardyTemplate from "../assets/template.json";
import doubleJeopardyTemplate from "../assets/templateDouble.json";

export async function jeopardyGameLoader({
  params,
}: LoaderFunctionArgs): Promise<JeopardyGameType> {
  if (!params.gameId) return;
  return gamesApi.getGame(params.gameId);
}
