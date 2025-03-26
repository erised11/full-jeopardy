interface QuestionModalProps {
  content: string;
  onClose: () => void;
}

export const QuestionModal = ({ content, onClose }: QuestionModalProps) => {
  return (
    <div
      className="absolute inset-0 left-0 top-0 w-[100vw] bg-jeopardy h-[100vh] flex items-center justify-center text-white cursor-pointer"
      onClick={onClose}
    >
      <p className="rounded-lg text-center text-[100px] w-3/4 font-korinna textShadow uppercase">
        {content}
      </p>
    </div>
  );
};
