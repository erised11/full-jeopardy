export type Question = {
  value: number;
  question: string;
  answer: string;
  type: string;
  mediaUrl: string;
  dailyDouble: boolean;
  answered: boolean;
};

export type Category = {
  name: string;
  questions: Question[];
};

export type FinalJeopardy = {
  question: string;
  mediaUrl: string;
};

export type JeopardyGame = {
  jeopardy: Category[];
  doubleJeopardy: Category[];
  finalJeopardy: FinalJeopardy;
};
