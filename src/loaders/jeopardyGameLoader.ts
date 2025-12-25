import { LoaderFunctionArgs } from "react-router";
import jeopardyData from "../assets/questions.json";
import doubleJeopardyData from "../assets/doublejeopardy.json";

export async function jeopardyGameLoader({ params }: LoaderFunctionArgs) {
  //   const response = await fetch(`/api/games/jeopardy/${params.gameId}`);

  //   if (response.status === 404) {
  //     throw new Response("Game not found", { status: 404 });
  //   }

  //   if (!response.ok) {
  //     throw new Response("Failed to load game", { status: 500 });
  //   }

  //   const game = await response.json();

  return { jeopardy: jeopardyData, doubleJeopardy: doubleJeopardyData };
}
