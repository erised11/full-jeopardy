import { useState } from "react";
import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

type PasswordPromptModalProps = {
  isOpen: boolean;
  onSubmit: (password: string) => void;
  onCancel: () => void;
  error?: string;
};

const PasswordPromptModal = ({
  isOpen,
  onSubmit,
  onCancel,
  error,
}: PasswordPromptModalProps) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!password) return;
    onSubmit(password);
  };

  const handleClose = () => {
    setPassword("");
    onCancel();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Password Required
        </h2>
        <p className="text-gray-500 text-sm mb-4">
          This game is password protected. Enter the password to continue.
        </p>

        <Input
          id="game-password"
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password..."
          error={error}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter" && password) handleSubmit();
          }}
        />

        <div className="flex gap-2 justify-end mt-6">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={!password}>
            Continue
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default PasswordPromptModal;
