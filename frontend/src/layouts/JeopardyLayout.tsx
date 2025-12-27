import { Outlet, useLoaderData } from "react-router";
import { JeopardyGame } from "@shared/types/types";
import { JeopardyGameProvider } from "@/game/Jeopardy/JeopardyGameContext";

export default function JeopardyLayout() {
  const game = useLoaderData() as JeopardyGame;

  return (
    <JeopardyGameProvider game={game}>
      <Outlet />
    </JeopardyGameProvider>
  );
}
