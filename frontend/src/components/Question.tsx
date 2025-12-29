export interface Question {
  value: string;
  question: string;
  answer: string;
  type: string;
  mediaUrl: string | null;
  dailyDouble: boolean;
  answered: boolean;
}

interface QuestionProps {
  value: number;
  answered: boolean;
  onClick: () => void;
  editMode: boolean;
}

export const Question = ({
  value,
  answered,
  onClick,
  editMode,
}: QuestionProps) => {
  return (
    <div
      className={`bg-jeopardy text-white cursor-pointer rounded-md shadow-lg w-full flex flex-col justify-center ${
        editMode ? "h-25 hover:bg-white/90" : "hover:bg-jeopardy/80 h-30"
      }`}
      onClick={onClick}
    >
      {!answered && (
        <h3 className="h3shadow text-[100px] font-extrabold font-swiss text-number textShadow m-auto">
          <span className="text-[77px] px-1 align-text-top">$</span>
          {value}
        </h3>
      )}
    </div>
  );
};
