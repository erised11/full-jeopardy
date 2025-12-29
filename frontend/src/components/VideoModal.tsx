import { useState } from "react";
import YouTube, { YouTubeProps } from "react-youtube";
import { DailyDoubleModal } from "./DailyDoubleModal";

interface VideoModalProps {
  videoUrl: string | null;
  onClose: () => void;
  showAnswer: boolean;
  answer: string;
  dailyDouble: boolean;
}

export const VideoModal = ({
  videoUrl,
  onClose,
  showAnswer,
  answer,
  dailyDouble,
}: VideoModalProps) => {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  const [isDaily, setIsDaily] = useState<boolean>(dailyDouble);

  const closeDaily = () => {
    setIsDaily(false);
  };

  const opts: YouTubeProps["opts"] = {
    height: "788",
    width: "1400",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return isDaily ? (
    <DailyDoubleModal onClose={closeDaily}></DailyDoubleModal>
  ) : (
    <div
      className="absolute inset-0 left-0 top-0 w-[100vw] bg-jeopardy h-[100vh] flex items-center justify-center text-white cursor-pointer"
      onClick={onClose}
    >
      {showAnswer ? (
        <p className="pshadow rounded-lg text-center text-[100px] w-3/4 font-korinna textShadow uppercase">
          {answer}
        </p>
      ) : (
        videoUrl && (
          <div className="relative">
            <div>
              <YouTube videoId={videoUrl} opts={opts} onReady={onPlayerReady} />
            </div>
            <div className="absolute w-[1400px] h-[50px] border-5 border-black z-10 bg-black left-0 right-0 top-0"></div>
          </div>
        )
      )}
    </div>
  );
};
