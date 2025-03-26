import { Question } from "./Question";

interface CategoryProps {
  name: string;
  questions: Array<{
    value: number;
    question: string;
    answer: string;
    type: string;
    mediaUrl: string | null;
    dailyDouble: boolean;
    answered: boolean;
  }>;
  onQuestionClick: (questionIndex: number) => void;
}

export const Category = ({
  name,
  questions,
  onQuestionClick,
}: CategoryProps) => {
  return (
    <div className="flex flex-col items-center w-[16.66667%] text-center">
      <div className="h-34 mb-1 border-4 w-[100%] text-5xl border-black text-white bg-jeopardy flex flex-col justify-center">
        <h2 className="m-auto font-swiss uppercase textShadow">{name}</h2>
      </div>

      <div className="flex flex-col w-full gap-1 px-[4px]">
        {questions.map((q, qIdx) => (
          <Question
            key={qIdx}
            value={q.value}
            answered={q.answered}
            onClick={() => onQuestionClick(qIdx)}
          />
        ))}
      </div>
    </div>
  );
};
