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
}

export const Question = ({ value, answered, onClick }: QuestionProps) => {
  return (
    <div
      className="bg-jeopardy text-white cursor-pointer rounded-md shadow-lg w-full h-30 flex flex-col justify-center"
      onClick={onClick}
    >
      {!answered && (
        <h3 className="text-[100px] font-extrabold font-swiss text-number m-auto textShadow">
          {value}
        </h3>
      )}
    </div>
  );
};
