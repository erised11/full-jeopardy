import { Link, useLoaderData, useNavigate } from "react-router";
import { JeopardyGameType } from "@shared/types/types";
import { useState } from "react";
import { Pencil, Trash2, Plus, Play, Lock, Search } from "lucide-react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import CreateGameModal from "@/components/CreateGameModal";
import PasswordPromptModal from "@/components/PasswordPromptModal";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/Button";
import { gamesApi, PasswordError } from "@/services/gamesApi";

const formatDate = (iso?: string) => {
  if (!iso) return null;
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const getGameStats = (game: JeopardyGameType) => {
  const jeopardy = game.gameData?.jeopardy;
  if (!jeopardy) return { categories: 0, questions: 0 };
  return {
    categories: jeopardy.length,
    questions: jeopardy.reduce((sum, cat) => sum + cat.questions.length, 0),
  };
};

const JeopardySelect = () => {
  const navigate = useNavigate();
  const games = useLoaderData() as JeopardyGameType[];

  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Delete state
  const [gameToDelete, setGameToDelete] = useState<JeopardyGameType | null>(null);
  const [showDeletePassword, setShowDeletePassword] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [deletePasswordError, setDeletePasswordError] = useState("");

  // Edit state
  const [showEditPassword, setShowEditPassword] = useState(false);
  const [gameToEdit, setGameToEdit] = useState<JeopardyGameType | null>(null);
  const [editPasswordError, setEditPasswordError] = useState("");

  const filteredGames =
    searchTerm.trim()
      ? games.filter((g) =>
          g.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : games;

  const handleDeleteClick = (game: JeopardyGameType) => {
    setGameToDelete(game);
    if (game.hasPassword) {
      setShowDeletePassword(true);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const handleDeletePasswordSubmit = (password: string) => {
    setDeletePassword(password);
    setDeletePasswordError("");
    setShowDeletePassword(false);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!gameToDelete?.id) return;
    try {
      await gamesApi.deleteGame(gameToDelete.id, deletePassword || undefined);
      setShowDeleteConfirm(false);
      setGameToDelete(null);
      setDeletePassword("");
      navigate(".", { replace: true });
    } catch (error) {
      if (error instanceof PasswordError) {
        setShowDeleteConfirm(false);
        setDeletePasswordError(error.message);
        setShowDeletePassword(true);
      } else {
        alert("Failed to delete game");
      }
    }
  };

  const handleEditClick = (game: JeopardyGameType) => {
    if (game.hasPassword) {
      setGameToEdit(game);
      setShowEditPassword(true);
    } else {
      navigate(`/games/${game.id}/edit`);
    }
  };

  const handleEditPasswordSubmit = (password: string) => {
    setEditPasswordError("");
    setShowEditPassword(false);
    navigate(`/games/${gameToEdit?.id}/edit`, { state: { password } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 to-indigo-950">
      <PageHeader
        title={
          <>
            <span className="font-swiss font-light text-4xl">Jeopardy!</span>
            <span className="text-2xl font-semibold"> games</span>
          </>
        }
        titleSize="text-2xl"
        subtitle="Select a game to play or create a new one"
        action={
          <Button
            variant="primary"
            size="lg"
            icon={<Plus className="w-5 h-5" />}
            onClick={() => setIsCreating(true)}
          >
            Create New Game
          </Button>
        }
      />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Search — only shown when there are enough games to warrant it */}
        {games.length > 5 && (
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search games..."
              className="w-full max-w-sm pl-10 pr-4 py-2 bg-gray-800 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
            />
          </div>
        )}

        {games.length === 0 ? (
          <div className="text-center py-24">
            <img src="/game.svg" alt="" className="w-20 h-20 mx-auto mb-6 opacity-20" />
            <p className="text-white text-xl font-semibold mb-2">No games yet</p>
            <p className="text-text-muted mb-6">Create your first Jeopardy! game to get started.</p>
            <Button variant="primary" size="lg" icon={<Plus className="w-5 h-5" />} onClick={() => setIsCreating(true)}>
              Create Your First Game
            </Button>
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted text-lg">
              No games match &ldquo;{searchTerm}&rdquo;
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredGames.map((game) => {
              const stats = getGameStats(game);
              return (
                <div
                  key={game.id}
                  className="group relative bg-gray-900 border border-white/8 rounded-2xl overflow-hidden hover:border-yellow-400/30 transition-all duration-200"
                >
                  {/* Yellow left accent */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                  <div className="flex items-center gap-6 px-6 py-5">
                    {/* Icon */}
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-gray-800 border border-white/8 flex items-center justify-center">
                      <img src="/game.svg" alt="" className="w-7 h-7 opacity-60 group-hover:opacity-100 transition-opacity" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-white group-hover:text-yellow-300 transition-colors truncate">
                          {game.title}
                        </span>
                        {game.hasPassword && (
                          <Lock className="w-3.5 h-3.5 text-blue-300 shrink-0" aria-label="Password protected" />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        {stats.categories > 0 && (
                          <>
                            <span>{stats.categories} categories</span>
                            <span className="opacity-40">·</span>
                            <span>{stats.questions} questions</span>
                          </>
                        )}
                        {game.createdAt && (
                          <>
                            <span className="opacity-40">·</span>
                            <span className="text-gray-500">{formatDate(game.createdAt)}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Link to={`/games/${game.id}`}>
                        <button className="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-lg transition-colors">
                          <Play className="w-4 h-4" />
                          Play
                        </button>
                      </Link>
                      <button
                        onClick={() => handleEditClick(game)}
                        className="p-2 text-blue-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        aria-label="Edit game"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(game)}
                        className="p-2 text-blue-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        aria-label="Delete game"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete password prompt */}
      <PasswordPromptModal
        isOpen={showDeletePassword}
        onSubmit={handleDeletePasswordSubmit}
        onCancel={() => {
          setShowDeletePassword(false);
          setGameToDelete(null);
          setDeletePasswordError("");
        }}
        error={deletePasswordError}
      />

      {/* Delete confirmation */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        title="Delete Game?"
        description="This action cannot be undone. This will permanently delete the game and all its questions."
        onConfirm={handleDeleteConfirm}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setGameToDelete(null);
          setDeletePassword("");
        }}
      />

      {/* Edit password prompt */}
      <PasswordPromptModal
        isOpen={showEditPassword}
        onSubmit={handleEditPasswordSubmit}
        onCancel={() => {
          setShowEditPassword(false);
          setGameToEdit(null);
          setEditPasswordError("");
        }}
        error={editPasswordError}
      />

      <CreateGameModal
        isOpen={isCreating}
        onClose={() => setIsCreating(false)}
      />
    </div>
  );
};

export default JeopardySelect;
