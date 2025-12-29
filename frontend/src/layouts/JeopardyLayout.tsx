import { Outlet, useLoaderData } from "react-router";
import { JeopardyGameType } from "@shared/types/types";
import { JeopardyGameProvider } from "@/game/Jeopardy/JeopardyGameContext";

export default function JeopardyLayout() {
  const game = useLoaderData() as JeopardyGameType;

  return (
    <JeopardyGameProvider game={game}>
      <Outlet />
    </JeopardyGameProvider>
  );
}
