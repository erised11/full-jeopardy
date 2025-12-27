export type Question = {
  value: number;
  question: string;
  answer: string;
  type: string;
  mediaUrl: string | null;
  dailyDouble: boolean;
  answered: boolean;
};

export type Category = {
  name: string;
  questions: Question[];
};

export type FinalJeopardy = {
  question: string;
  mediaUrl: string | null;
};

export type QuestionType = "image" | "text" | "video" | "audio";

export type JeopardyGame = {
  id: number;
  userId: number;
  title: string;
  gameData: {
    jeopardy: Category[];
    doubleJeopardy: Category[];
    finalJeopardy: FinalJeopardy;
  };
};

export type JeopardyGameContextState = {
  originalGame: JeopardyGame | null;
  draftGame: JeopardyGame | null;
  editing: boolean;
  inDoubleJeopardy: boolean;
  setInDoubleJeopardy: (inDouble: boolean) => void;
  setEditing: (editing: boolean) => void;
  setOriginalGame: (game: JeopardyGame) => void;
  startEditing: () => void;
  updateDraftGame: (game: JeopardyGame) => void;
  saveDraft: () => Promise<void>;
  discardDraft: () => void;
};
