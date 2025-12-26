import { useContext } from "react";
import { JeopardyGameContext } from "../game/Jeopardy/JeopardyGameContext";

export function useJeopardyGameContext() {
  const context = useContext(JeopardyGameContext);

  if (!context) {
    throw new Error(
      "useJeopardyGameContext must be used within JeopardyGameProvider"
    );
  }

  return context;
}
