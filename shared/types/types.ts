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
  password?: string;      // sent on create only, never returned from API
  hasPassword?: boolean;  // returned from API to indicate protection
  createdAt?: string;     // ISO timestamp returned from API
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
  password_hash: string | null;
  created_at: string;
  game_data: {
    jeopardy: CategoryType[];
    doubleJeopardy: CategoryType[];
    finalJeopardy: FinalJeopardyType;
  };
};
