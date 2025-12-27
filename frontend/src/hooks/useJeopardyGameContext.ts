import { JeopardyGameContext } from "@/game/Jeopardy/JeopardyGameContext";
import { useContext } from "react";

export function useJeopardyGameContext() {
  const context = useContext(JeopardyGameContext);

  if (!context) {
    throw new Error(
      "useJeopardyGameContext must be used within JeopardyGameProvider"
    );
  }

  return context;
}
