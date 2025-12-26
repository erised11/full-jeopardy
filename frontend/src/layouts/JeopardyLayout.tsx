import { Outlet, useLoaderData } from "react-router";
import { JeopardyGame } from "@shared/types/types";
import { JeopardyGameProvider } from "../game/Jeopardy/JeopardyGameProvider";

export default function JeopardyLayout() {
  const game = useLoaderData() as JeopardyGame;

  return (
    <JeopardyGameProvider game={game}>
      <Outlet />
    </JeopardyGameProvider>
  );
}
