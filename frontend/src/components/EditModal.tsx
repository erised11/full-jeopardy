import { JeopardyQuestion } from "../pages/Jeopardy/Jeopardy";

type EditModalProps = {
  question: JeopardyQuestion;
  onClose: () => void;
};

const EditModal = ({ question, onClose }: EditModalProps) => {
  return (
    <div className="absolute inset top-0 left-0 w-full h-[100vh] bg-black/30">
      <div className="relative flex flex-col justify-center mx-auto w-3/4 h-3/4 bg-slate-900 text-white gap-4 ">
        <div>{question.type}</div>
        <div>{question.question}</div>
        <div>{question.dailyDouble}</div>
        <div>{question.mediaUrl}</div>
        <div>{question.answer}</div>

        <div className="absolute bottom-2 right-2 hover:cursor-pointer">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
