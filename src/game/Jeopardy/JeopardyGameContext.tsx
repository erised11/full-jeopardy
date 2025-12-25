import { createContext } from "react";

type Question = {
  value: number;
  question: string;
  answer: string;
  type: string;
  mediaUrl: string;
  dailyDouble: boolean;
  answered: boolean;
};

type Category = {
  name: string;
  questions: Question[];
};
export type JeopardyGame = {
  jeopardy: Category[];
  doubleJeopardy: Category[];
};

export const JeopardyGameContext = createContext<JeopardyGame | null>(null);
