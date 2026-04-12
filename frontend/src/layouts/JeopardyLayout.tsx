import { useEffect } from "react";
import { Outlet, useLoaderData, useNavigation } from "react-router";
import { JeopardyGameType } from "@shared/types/types";
import { JeopardyGameProvider } from "@/game/Jeopardy/JeopardyGameContext";

function preloadGameMedia(game: JeopardyGameType) {
  const allCategories = [
    ...(game.gameData?.jeopardy ?? []),
    ...(game.gameData?.doubleJeopardy ?? []),
  ];
  for (const category of allCategories) {
    for (const q of category.questions) {
      if (!q.mediaUrl) continue;
      if (q.type === "image") {
        new Image().src = q.mediaUrl;
      } else if (q.type === "audio" || q.type === "video") {
        fetch(q.mediaUrl, { method: "GET", cache: "force-cache" }).catch(() => {});
      }
    }
  }
}

export default function JeopardyLayout() {
  const game = useLoaderData() as JeopardyGameType;
  const navigation = useNavigation();
  const loading = navigation.state !== "idle";

  useEffect(() => {
    preloadGameMedia(game);
  }, [game.id]);

  return (
    <JeopardyGameProvider game={game}>
      {loading && (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-yellow-400/30">
          <div className="h-full bg-yellow-400 animate-[loading_1s_ease-in-out_forwards]" style={{ width: "60%" }} />
        </div>
      )}
      <Outlet />
    </JeopardyGameProvider>
  );
}
