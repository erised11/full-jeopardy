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
