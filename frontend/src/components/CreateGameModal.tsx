import { useState } from "react";
import { useNavigate } from "react-router";
import { gamesApi } from "@/services/gamesApi";
import { jeopardyTemplate, doubleJeopardyTemplate } from "@/assets/templates";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGameModal({
  isOpen,
  onClose,
}: CreateGameModalProps) {
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleCreate = async () => {
    if (!title.trim()) return;

    if (password && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");
    setIsCreating(true);
    try {
      const newGame = await gamesApi.createGame({
        userId: 1,
        title: title.trim(),
        password: password || undefined,
        gameData: {
          jeopardy: jeopardyTemplate,
          doubleJeopardy: doubleJeopardyTemplate,
          finalJeopardy: { question: "", mediaUrl: "" },
        },
      });

      navigate(`/games/${newGame.id}/edit`);
    } catch (error) {
      console.error("Error creating game:", error);
      alert("Failed to create game");
    } finally {
      setIsCreating(false);
    }
  };

  const handleClose = () => {
    setTitle("");
    setPassword("");
    setConfirmPassword("");
    setPasswordError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Create New Jeopardy Game
        </h2>

        <div className="space-y-4">
          <Input
            id="game-title"
            label="Game Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter game title..."
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && title.trim()) handleCreate();
            }}
          />

          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 mb-3">
              Optional: set a password to protect editing and deleting this game.
            </p>
            <div className="space-y-3">
              <Input
                id="game-password"
                type="password"
                label="Password (optional)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank for no password"
              />
              {password && (
                <Input
                  id="game-confirm-password"
                  type="password"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  error={passwordError}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 justify-end mt-6">
          <Button variant="ghost" onClick={handleClose} disabled={isCreating}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleCreate}
            disabled={isCreating || !title.trim()}
          >
            {isCreating ? "Creating..." : "Create Game"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
