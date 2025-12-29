import { gamesApi } from "@/services/gamesApi";
import { JeopardyGameType } from "@shared/types/types";
import { createContext, useState } from "react";

type JeopardyGameProviderProps = {
  game: JeopardyGameType;
  children: React.ReactNode;
};

export type JeopardyGameContextState = {
  originalGame: JeopardyGameType | null;
  draftGame: JeopardyGameType | null;
  inDoubleJeopardy: boolean;
  setInDoubleJeopardy: React.Dispatch<React.SetStateAction<boolean>>;
  setOriginalGame: React.Dispatch<
    React.SetStateAction<JeopardyGameType | null>
  >;
  startEditing: () => void;
  setDraftGame: React.Dispatch<React.SetStateAction<JeopardyGameType | null>>;
  saveDraft: () => Promise<void>;
  discardDraft: () => void;
};

export const JeopardyGameContext = createContext<JeopardyGameContextState | null>(
  null
);

export function JeopardyGameProvider({
  game,
  children,
}: JeopardyGameProviderProps) {
  const [originalGame, setOriginalGame] = useState<JeopardyGameType | null>(
    game
  );
  const [draftGame, setDraftGame] = useState<JeopardyGameType | null>(null);
  const [inDoubleJeopardy, setInDoubleJeopardy] = useState<boolean>(false);

  const startEditing = () => {
    if (!originalGame) return;
    if (draftGame) return;
    setDraftGame(structuredClone(originalGame));
  };

  const saveDraft = async () => {
    console.log(draftGame);
    if (!draftGame) {
      return;
    }
    try {
      gamesApi.updateGame(draftGame);
      console.log("Game updated successfully");
      setOriginalGame(draftGame);
      setDraftGame(null);
    } catch (error) {
      console.error("Error updating game:", error);
      alert("Failed to save changes. Please try again.");
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
