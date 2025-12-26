import { createContext } from "react";
import { JeopardyGame } from "@shared/types/types";

export const JeopardyGameContext = createContext<JeopardyGame | null>(null);
