import { JeopardyGame, JeopardyGameContext } from "./JeopardyGameContext";

type JeopardyGameProviderProps = {
  game: JeopardyGame;
  children: React.ReactNode;
};

export function JeopardyGameProvider({
  game,
  children,
}: JeopardyGameProviderProps) {
  return (
    <JeopardyGameContext.Provider value={game}>
      {children}
    </JeopardyGameContext.Provider>
  );
}
