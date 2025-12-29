// components/CreateGameModal.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { gamesApi } from "@/services/gamesApi";
import { jeopardyTemplate, doubleJeopardyTemplate } from "@/assets/templates";

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGameModal({
  isOpen,
  onClose,
}: CreateGameModalProps) {
  const [title, setTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title.trim()) {
      alert("Please enter a game title");
      return;
    }

    setIsCreating(true);
    try {
      const newGame = await gamesApi.createGame({
        userId: 1,
        title: title.trim(),
        gameData: {
          jeopardy: jeopardyTemplate,
          doubleJeopardy: doubleJeopardyTemplate,
          finalJeopardy: { question: "", mediaUrl: "" },
        },
      });

      console.log("Game created:", newGame);
      navigate(`/games/${newGame.id}/edit`);
    } catch (error) {
      console.error("Error creating game:", error);
      alert("Failed to create game");
    } finally {
      setIsCreating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-120">
        <div className="text-4xl mb-4 text-black ">
          Create New Jeopardy Game
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter game title..."
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCreate();
            if (e.key === "Escape") onClose();
          }}
        />

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            disabled={isCreating}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={isCreating || !title.trim()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            {isCreating ? "Creating..." : "Create Game"}
          </button>
        </div>
      </div>
    </div>
  );
}
