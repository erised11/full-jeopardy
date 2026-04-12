import { Player } from "./PlayerSetup";

type ScoreboardProps = {
  players: Player[];
  activeValue: number | null; // value of the current question when answer is showing
  onScoreChange: (index: number, newScore: number) => void;
  onAdjust: (index: number, delta: 1 | -1) => void;
};

const Scoreboard = ({
  players,
  activeValue,
  onScoreChange,
  onAdjust,
}: ScoreboardProps) => {
  const isActive = activeValue !== null;

  return (
    <div className="w-full bg-blue-950/80 border-t-2 border-yellow-400/40 backdrop-blur-sm py-3 px-4">
      <div className="flex justify-center items-end gap-4 flex-wrap">
        {players.map((player, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1.5 min-w-[100px]"
          >
            {/* Player name */}
            <span className="text-blue-200 text-xs font-medium tracking-wide uppercase truncate max-w-[120px]">
              {player.name}
            </span>

            {/* Score input */}
            <input
              type="number"
              value={player.score}
              onChange={(e) =>
                onScoreChange(i, parseInt(e.target.value, 10) || 0)
              }
              className="w-28 text-center text-2xl font-bold font-swiss text-white bg-blue-900/60 border border-white/20 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400/60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />

            {/* +/- buttons */}
            <div className="flex gap-1.5">
              <button
                onClick={() => onAdjust(i, -1)}
                className={`w-10 h-8 rounded-lg font-bold text-sm transition-all ${
                  isActive
                    ? "bg-red-600 hover:bg-red-500 text-white shadow-md hover:scale-105"
                    : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"
                }`}
                title={isActive ? `-$${activeValue}` : "No active question"}
              >
                −
              </button>
              <button
                onClick={() => onAdjust(i, 1)}
                className={`w-10 h-8 rounded-lg font-bold text-sm transition-all ${
                  isActive
                    ? "bg-green-600 hover:bg-green-500 text-white shadow-md hover:scale-105"
                    : "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"
                }`}
                title={isActive ? `+$${activeValue}` : "No active question"}
              >
                +
              </button>
            </div>

            {/* Active value hint */}
            {isActive && (
              <span className="text-yellow-400 text-xs font-semibold">
                ${activeValue?.toLocaleString()}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;
