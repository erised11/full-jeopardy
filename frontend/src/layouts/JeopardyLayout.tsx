import { Outlet, useLoaderData, useNavigation } from "react-router";
import { JeopardyGameType } from "@shared/types/types";
import { JeopardyGameProvider } from "@/game/Jeopardy/JeopardyGameContext";

export default function JeopardyLayout() {
  const game = useLoaderData() as JeopardyGameType;
  const navigation = useNavigation();
  const loading = navigation.state !== "idle";

  return (
    <JeopardyGameProvider game={game}>
      {loading && (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-yellow-400/30">
          <div className="h-full bg-yellow-400 animate-[loading_1s_ease-in-out_infinite]" style={{ width: "60%" }} />
        </div>
      )}
      <Outlet />
    </JeopardyGameProvider>
  );
}
