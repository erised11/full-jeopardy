import { useState } from "react";
import { DailyDoubleModal } from "./DailyDoubleModal";

interface QuestionModalProps {
  content: string;
  onClose: () => void;
  dailyDouble: boolean;
}

export const QuestionModal = ({
  content,
  onClose,
  dailyDouble,
}: QuestionModalProps) => {
  const [isDaily, setIsDaily] = useState<boolean>(dailyDouble);

  const closeDaily = () => {
    setIsDaily(false);
  };

  return isDaily ? (
    <DailyDoubleModal onClose={closeDaily}></DailyDoubleModal>
  ) : (
    <div
      className="absolute inset-0 left-0 top-0 w-[100vw] bg-jeopardy h-[100vh] flex items-center justify-center text-white cursor-pointer"
      onClick={onClose}
    >
      <p className="pshadow rounded-lg text-center text-[100px] w-4/5 font-korinna textShadow uppercase">
        {content}
      </p>
    </div>
  );
};
