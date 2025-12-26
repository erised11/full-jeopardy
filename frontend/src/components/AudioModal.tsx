import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { DailyDoubleModal } from "./DailyDoubleModal";

interface AudioModalProps {
  audioUrl: string | null;
  onClose: () => void;
  showAnswer: boolean;
  answer: string;
  dailyDouble: boolean;
}

export const AudioModal = ({
  audioUrl,
  onClose,
  showAnswer,
  answer,
  dailyDouble,
}: AudioModalProps) => {
  const handleClick = (e: any) => {
    e.stopPropagation();
  };

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
      {showAnswer ? (
        <p className="rounded-lg text-center text-[100px] w-3/4 font-korinna textShadow uppercase">
          {answer}
        </p>
      ) : (
        <div
          className="w-1/2 shadow-2xl drop-shadow-2xl border-4 border-number"
          onClick={handleClick}
        >
          <AudioPlayer
            src={audioUrl!}
            // other props here
          />
        </div>
      )}
    </div>
  );
};
