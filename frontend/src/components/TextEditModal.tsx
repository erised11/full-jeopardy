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
    <div className="fixed inset-0 z-50 grid place-items-center overflow-y-scroll font-medium noShadow text-left">
      <div className="bg-white rounded-lg p-6 w-120 text-2xl">
        <div className="text-xl mb-4 text-black ">{title}</div>
        <input
          type="text"
          value={value}
          className="w-full border text-black border-gray-300 rounded px-4 py-2 mb-4"
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex gap-2 justify-end  text-lg">
          <Button text="Cancel" onClick={handleInputCancel} />
          <Button text="Save" variant="fill" onClick={handleInputSave} />
        </div>
      </div>
    </div>
  );
};

export default TextEditModal;
