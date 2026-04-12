import { useState } from "react";
import { Category } from "../../components/Category";
import { QuestionModal } from "../../components/QuestionModal";
import { ImageModal } from "../../components/ImageModal";
import { AudioModal } from "../../components/AudioModal";
import { VideoModal } from "../../components/VideoModal";
import { FinalJeopardyModal } from "../../components/FinalJeopardyModal";
import PlayerSetup, { Player } from "../../components/PlayerSetup";
import Scoreboard from "../../components/Scoreboard";
import { useJeopardyGameContext } from "../../hooks/useJeopardyGameContext";
import { QuestionTypeEnum } from "@shared/types/types";

export type JeopardyQuestion = {
  categoryIndex: number;
  questionIndex: number;
  question: string;
  answer: string;
  type: QuestionTypeEnum;
  mediaUrl: string | null;
  dailyDouble: boolean;
  value: number;
};

export const Jeopardy = () => {
  const jeopardyContext = useJeopardyGameContext();
  const { originalGame, inDoubleJeopardy, setInDoubleJeopardy } = jeopardyContext;
  if (!originalGame) return null;

  // --- Player / game setup ---
  const [players, setPlayers] = useState<Player[] | null>(null);

  // --- Board state ---
  const [categories, setCategories] = useState(originalGame.gameData.jeopardy);
  const [finalJeopardy, setFinalJeopardy] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<JeopardyQuestion | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestionsCount, setAnsweredQuestionsCount] = useState(0);
  const [lastAnsweredValue, setLastAnsweredValue] = useState<number | null>(null);

  // Show setup screen until players are chosen
  if (!players) {
    return <PlayerSetup onStart={(p) => setPlayers(p)} />;
  }

  // --- Question handlers ---
  const handleQuestionClick = (categoryIndex: number, questionIndex: number) => {
    setLastAnsweredValue(null);
    const question = categories[categoryIndex].questions[questionIndex];
    if (!question.answered) {
      setSelectedQuestion({
        categoryIndex,
        questionIndex,
        question: question.question,
        answer: question.answer,
        type: question.type,
        mediaUrl: question.mediaUrl,
        dailyDouble: question.dailyDouble,
        value: question.value,
      });
      setShowAnswer(false);
    } else {
      setQuestionToUnAnswered(categoryIndex, questionIndex);
    }
  };

  const setQuestionToAnswered = () => {
    setCategories((prev) =>
      prev.map((category, cIdx) =>
        cIdx === selectedQuestion?.categoryIndex
          ? {
              ...category,
              questions: category.questions.map((q, qIdx) =>
                qIdx === selectedQuestion.questionIndex ? { ...q, answered: true } : q
              ),
            }
          : category
      )
    );
    setAnsweredQuestionsCount((prev) => prev + 1);
  };

  const setQuestionToUnAnswered = (categoryIndex: number, questionIndex: number) => {
    setCategories((prev) =>
      prev.map((category, cIdx) =>
        cIdx === categoryIndex
          ? {
              ...category,
              questions: category.questions.map((q, qIdx) =>
                qIdx === questionIndex ? { ...q, answered: false } : q
              ),
            }
          : category
      )
    );
    setAnsweredQuestionsCount((prev) => prev - 1);
  };

  const handleCloseModal = () => {
    if (!showAnswer) {
      setShowAnswer(true);
    } else {
      setLastAnsweredValue(selectedQuestion?.value ?? null);
      setQuestionToAnswered();
      setSelectedQuestion(null);
      setShowAnswer(false);
    }
  };

  const startDoubleJeopardy = () => {
    setAnsweredQuestionsCount(0);
    setInDoubleJeopardy(true);
    setCategories(originalGame.gameData.doubleJeopardy);
  };

  // --- Score handlers ---
  const handleScoreChange = (index: number, newScore: number) => {
    setPlayers((prev) =>
      prev!.map((p, i) => (i === index ? { ...p, score: newScore } : p))
    );
  };

  const handleAdjust = (index: number, delta: 1 | -1) => {
    const value = lastAnsweredValue ?? 0  ;
    setPlayers((prev) =>
      prev!.map((p, i) =>
        i === index ? { ...p, score: p.score + delta * value } : p
      )
    );
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-jeopardy flex flex-col">
      {/* Board */}
      <div className="flex flex-row bg-black pb-2">
        {categories.map((category, cIdx) => (
          <Category
            key={cIdx}
            editMode={false}
            name={category.name}
            questions={category.questions}
            onQuestionClick={(qIdx) => handleQuestionClick(cIdx, qIdx)}
          />
        ))}
      </div>
      <div className="flex-1 bg-jeopardy"></div>

      {/* Round transition buttons */}
      {answeredQuestionsCount >= 30 && !inDoubleJeopardy && (
        <div className="w-full flex flex-row mt-1 cursor-pointer shrink-0" onClick={startDoubleJeopardy}>
          <div className="p-4 mr-2 ml-auto text-white font-swiss text-5xl border-3 textShadow rounded-md border-number bg-blue-800">
            Double Jeopardy
          </div>
        </div>
      )}
      {answeredQuestionsCount >= 30 && inDoubleJeopardy && (
        <div className="w-full flex flex-row mt-1 cursor-pointer shrink-0" onClick={() => setFinalJeopardy(true)}>
          <div className="p-4 mr-2 ml-auto text-white font-swiss text-5xl border-3 textShadow rounded-md border-number bg-blue-800">
            Final Jeopardy
          </div>
        </div>
      )}

      {/* Scoreboard */}
      <Scoreboard
        players={players}
        activeValue={showAnswer && selectedQuestion ? selectedQuestion.value : lastAnsweredValue}
        onScoreChange={handleScoreChange}
        onAdjust={handleAdjust}
      />

      {/* Modals */}
      {finalJeopardy && <FinalJeopardyModal />}

      {selectedQuestion &&
        (() => {
          switch (selectedQuestion.type) {
            case "text":
              return (
                <QuestionModal
                  content={showAnswer ? selectedQuestion.answer : selectedQuestion.question}
                  dailyDouble={selectedQuestion.dailyDouble}
                  onClose={handleCloseModal}
                />
              );
            case "image":
              return (
                <ImageModal
                  imageUrl={selectedQuestion.mediaUrl}
                  onClose={handleCloseModal}
                  showAnswer={showAnswer}
                  answer={selectedQuestion.answer}
                  dailyDouble={selectedQuestion.dailyDouble}
                />
              );
            case "audio":
              return (
                <AudioModal
                  audioUrl={selectedQuestion.mediaUrl}
                  onClose={handleCloseModal}
                  showAnswer={showAnswer}
                  answer={selectedQuestion.answer}
                  dailyDouble={selectedQuestion.dailyDouble}
                />
              );
            case "video":
              return (
                <VideoModal
                  videoUrl={selectedQuestion.mediaUrl}
                  onClose={handleCloseModal}
                  showAnswer={showAnswer}
                  answer={selectedQuestion.answer}
                  dailyDouble={selectedQuestion.dailyDouble}
                />
              );
            default:
              return null;
          }
        })()}
    </div>
  );
};

export default Jeopardy;
