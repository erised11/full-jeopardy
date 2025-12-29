export type QuestionType = {
  value: number;
  question: string;
  answer: string;
  type: QuestionTypeEnum;
  mediaUrl: string | null;
  dailyDouble: boolean;
  answered: boolean;
};

export type CategoryType = {
  name: string;
  questions: QuestionType[];
};

export type FinalJeopardyType = {
  question: string;
  mediaUrl: string | null;
};

export type QuestionTypeEnum = "image" | "text" | "video" | "audio";

export type JeopardyGameType = {
  id?: number;
  userId: number;
  title: string;
  gameData: {
    jeopardy: CategoryType[];
    doubleJeopardy: CategoryType[];
    finalJeopardy: FinalJeopardyType;
  };
};

export type JeopardyGameEntity = {
  id: number;
  user_id: number;
  title: string;
  game_data: {
    jeopardy: CategoryType[];
    doubleJeopardy: CategoryType[];
    finalJeopardy: FinalJeopardyType;
  };
};
