import { JeopardyGame, JeopardyGameContextState } from "@shared/types/types";
import { createContext, useEffect, useState } from "react";

type JeopardyGameProviderProps = {
  game: JeopardyGame;
  children: React.ReactNode;
};

export const JeopardyGameContext = createContext<JeopardyGameContextState | null>(
  null
);

export function JeopardyGameProvider({
  game,
  children,
}: JeopardyGameProviderProps) {
  const [originalGame, setOriginalGame] = useState<JeopardyGame | null>(game);
  const [draftGame, setDraftGame] = useState<JeopardyGame | null>(null);
  const [inDoubleJeopardy, setInDoubleJeopardy] = useState<boolean>(false);

  const startEditing = () => {
    if (!originalGame) return;
    setDraftGame(structuredClone(originalGame));
  };

  useEffect(() => {
    saveDraft();
  }, [draftGame]);

  const saveDraft = async () => {
    console.log(draftGame);
    if (!draftGame) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:4000/games/${draftGame.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(draftGame),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Game updated successfully:", data);
      setOriginalGame(draftGame);
      setDraftGame(null);
      return data;
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  const discardDraft = () => {
    setDraftGame(null);
  };

  return (
    <JeopardyGameContext.Provider
      value={{
        originalGame,
        draftGame,
        inDoubleJeopardy,
        setInDoubleJeopardy,
        setOriginalGame,
        startEditing,
        setDraftGame,
        saveDraft,
        discardDraft,
      }}
    >
      {children}
    </JeopardyGameContext.Provider>
  );
}
