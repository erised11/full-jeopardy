import Modal from "./Modal";
import Button from "./Button";

type ConfirmDialogProps = {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog = ({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-800">{title}</h2>
        <p className="text-gray-600 mb-6">{description}</p>
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};
