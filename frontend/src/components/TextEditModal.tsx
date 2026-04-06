import Modal from "./Modal";
import Button from "./Button";

type TextEditModalProps = {
  title?: string;
  value: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleInputSave: () => void;
  handleInputCancel: () => void;
};

const TextEditModal = ({
  title,
  value,
  setInputValue,
  handleInputSave,
  handleInputCancel,
}: TextEditModalProps) => {
  return (
    <Modal isOpen={true} onClose={handleInputCancel}>
      <div className="p-6">
        {title && (
          <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
        )}
        <input
          type="text"
          value={value}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "Enter") handleInputSave();
            if (e.key === "Escape") handleInputCancel();
          }}
        />
        <div className="flex gap-2 justify-end">
          <Button variant="ghost" onClick={handleInputCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="bg-blue-600 hover:bg-blue-700 text-white hover:text-white"
            onClick={handleInputSave}
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default TextEditModal;
