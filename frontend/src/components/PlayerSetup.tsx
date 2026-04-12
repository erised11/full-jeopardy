import { useState } from "react";

export type Player = {
  name: string;
  score: number;
};

type PlayerSetupProps = {
  onStart: (players: Player[]) => void;
};

const COUNTS = [1, 2, 3, 4, 5, 6];

const PlayerSetup = ({ onStart }: PlayerSetupProps) => {
  const [count, setCount] = useState(2);
  const [names, setNames] = useState<string[]>(
    Array.from({ length: 6 }, (_, i) => `Player ${i + 1}`)
  );

  const handleNameChange = (index: number, value: string) => {
    setNames((prev) => prev.map((n, i) => (i === index ? value : n)));
  };

  const handleStart = () => {
    const players: Player[] = Array.from({ length: count }, (_, i) => ({
      name: names[i] || `Player ${i + 1}`,
      score: 0,
    }));
    onStart(players);
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-jeopardy flex items-center justify-center">
      <div className="bg-blue-950/60 border border-white/10 rounded-2xl p-10 w-full max-w-lg text-center">
        <h1 className="font-swiss text-5xl text-white textShadow mb-2">
          Jeopardy!
        </h1>
        <p className="text-blue-200 text-sm mb-8">Set up your players to begin</p>

        {/* Player count selector */}
        <p className="text-white font-semibold mb-3">Number of Players</p>
        <div className="flex justify-center gap-3 mb-8">
          {COUNTS.map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`w-11 h-11 rounded-lg font-bold text-lg transition-all ${
                count === n
                  ? "bg-yellow-400 text-blue-950 scale-110"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Player name inputs */}
        <div className="space-y-2 mb-8">
          {Array.from({ length: count }, (_, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-blue-300 text-sm w-20 text-right shrink-0">
                Player {i + 1}
              </span>
              <input
                type="text"
                value={names[i]}
                onChange={(e) => handleNameChange(i, e.target.value)}
                placeholder={`Player ${i + 1}`}
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleStart}
          className="px-10 py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-bold text-lg rounded-xl transition-all hover:scale-105 shadow-lg"
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default PlayerSetup;
