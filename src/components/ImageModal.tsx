interface ImageModalProps {
  imageUrl: string | null;
  onClose: () => void;
  showAnswer: boolean;
  answer: string;
}

export const ImageModal = ({
  imageUrl,
  onClose,
  showAnswer,
  answer,
}: ImageModalProps) => {
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
        <img src={imageUrl!} className="h-[90%] object-fit-scale"></img>
      )}
    </div>
  );
};
