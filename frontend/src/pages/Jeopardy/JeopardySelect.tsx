import { Link, useLoaderData } from "react-router";
import { JeopardyGameType } from "@shared/types/types";
import { useState } from "react";
import { Pencil, Trash2, Plus, Play } from "lucide-react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import CreateGameModal from "@/components/CreateGameModal";

const JeopardySelect = () => {
  const games = useLoaderData() as JeopardyGameType[];
  const [isCreating, setIsCreating] = useState(false);
  const [gameToDelete, setGameToDelete] = useState<number | null>(null);

  const deleteGame = async (gameId: number | null) => {
    console.log("Deleting game:", gameId);
    // Add your delete API call here
    setGameToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Header */}
      <div className="border-b border-blue-700/50 bg-blue-950/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                <span className="font-swiss font-light text-5xl">
                  Jeopardy!
                </span>{" "}
                games
              </h1>
              <p className="text-blue-200">
                Select a game to play or create a new one
              </p>
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold rounded-lg transition-all hover:scale-105 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create New Game
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {games.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-blue-200 text-lg mb-4">
              No games yet. Create your first Jeopardy! game to get started.
            </div>
            <button
              onClick={() => setIsCreating(true)}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold rounded-lg transition-all"
            >
              Create Your First Game
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {games.map((game) => (
              <div
                key={game.id}
                className="group bg-blue-950/40 backdrop-blur-sm border border-blue-700/50 rounded-xl p-6 hover:bg-blue-900/50 transition-all hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="flex items-center justify-between">
                  {/* Game Info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {game.title}
                    </h3>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <Link to={`/games/${game.id}`}>
                      <button className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-all hover:scale-105">
                        <Play className="w-4 h-4" />
                        Play
                      </button>
                    </Link>

                    <Link to={`/games/${game.id}/edit`}>
                      <button className="p-3 bg-blue-700/50 hover:bg-blue-600 text-blue-200 hover:text-white rounded-lg transition-all">
                        <Pencil className="w-5 h-5" />
                      </button>
                    </Link>

                    <button
                      onClick={() => game.id && setGameToDelete(game.id)}
                      className="p-3 bg-red-900/30 hover:bg-red-600 text-red-300 hover:text-white rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={gameToDelete !== null}
        title="Delete Game?"
        description="This action cannot be undone. This will permanently delete the game and all its questions."
        onConfirm={() => {
          if (gameToDelete) {
            deleteGame(gameToDelete);
          }
        }}
        onCancel={() => setGameToDelete(null)}
      />

      <CreateGameModal
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
      />
    </div>
  );
};

export default JeopardySelect;
