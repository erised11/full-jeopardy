interface DailyDoubleModalProps {
  onClose: () => void;
}

export const DailyDoubleModal = ({ onClose }: DailyDoubleModalProps) => {
  const dailyAudio = new Audio("dailydouble.wav");
  dailyAudio.play();
  return (
    <div
      className="absolute inset-0 left-0 top-0 w-[100vw] bg-jeopardy h-[100vh] flex items-center justify-center text-white cursor-pointer"
      onClick={onClose}
    >
      <img
        src="https://irp-cdn.multiscreensite.com/2b0b2eff/dms3rep/multi/Google+Daily+Double.jpg"
        className="w-[100%] h-[100%] object-fit-scale"
      ></img>
    </div>
  );
};
