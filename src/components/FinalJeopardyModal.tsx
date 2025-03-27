import { useState } from "react";

export const FinalJeopardyModal = () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const question =
    "What book holds the record for the fastest selling book in history?";
  const imageUrl =
    "https://m.media-amazon.com/images/I/51DPd38nsiL._AC_UF894,1000_QL80_.jpg";
  const onClick = () => {
    setShowAnswer(!showAnswer);
  };
  return (
    <>
      {" "}
      <div className="absolute inset-0 left-0 top-0 w-[100vw] bg-jeopardy h-[100vh] flex items-center justify-center text-white cursor-pointer">
        <p className="rounded-lg text-center text-[100px] w-4/5 font-korinna textShadow uppercase">
          {question}
        </p>
        <button
          className="absolute bottom-0 right-0 p-3 font-korinna textShadow cursor-pointer"
          onClick={onClick}
        >
          Answer
        </button>
      </div>
      {showAnswer && (
        <div className="absolute inset-0 left-0 top-0 w-[100vw] bg-jeopardy h-[100vh] flex items-center justify-center text-white cursor-pointer">
          <img
            src={imageUrl}
            className="h-[90%] object-fit-scale"
            onClick={onClick}
          ></img>
        </div>
      )}
    </>
  );
};
