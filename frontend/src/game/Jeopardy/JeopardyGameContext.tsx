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
  setOriginalGame: React.Dispatch<React.SetStateAction<JeopardyGameType | null>>;
  startEditing: () => void;
  setDraftGame: React.Dispatch<React.SetStateAction<JeopardyGameType | null>>;
  saveDraft: (password?: string) => Promise<void>;
  discardDraft: () => void;
};

export const JeopardyGameContext = createContext<JeopardyGameContextState | null>(null);

export function JeopardyGameProvider({ game, children }: JeopardyGameProviderProps) {
  const [originalGame, setOriginalGame] = useState<JeopardyGameType | null>(game);
  const [draftGame, setDraftGame] = useState<JeopardyGameType | null>(null);
  const [inDoubleJeopardy, setInDoubleJeopardy] = useState<boolean>(false);

  const startEditing = () => {
    if (!originalGame || draftGame) return;
    setDraftGame(structuredClone(originalGame));
  };

  const saveDraft = async (password?: string) => {
    if (!draftGame) return;
    await gamesApi.updateGame(draftGame, password);
    setOriginalGame(draftGame);
    setDraftGame(null);
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
