interface AudioModalProps {
  audioUrl: string | null;
  onClose: () => void;
  showAnswer: boolean;
  answer: string;
}

export const AudioModal = ({
  audioUrl,
  onClose,
  showAnswer,
  answer,
}: AudioModalProps) => {
  return (
    <div
      className="absolute inset-0 left-0 top-0 w-[100vw] bg-jeopardy h-[100vh] flex items-center justify-center text-white cursor-pointer"
      onClick={onClose}
    >
      {showAnswer ? (
        <p className="rounded-lg text-center text-[100px] w-3/4 font-korinna textShadow">
          {answer}
        </p>
      ) : (
        <img src={audioUrl!}></img>
      )}
    </div>
  );
};
