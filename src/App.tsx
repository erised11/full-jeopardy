import { useState } from "react";
import { Category } from "./components/Category";
import { QuestionModal } from "./components/QuestionModal";
import jeopardyData from "./assets/questions.json";
import { ImageModal } from "./components/ImageModal";
import { AudioModal } from "./components/AudioModal";
import { VideoModal } from "./components/VideoModal";
// import doubleJeopardyData

function App() {
  const [categories, setCategories] = useState(jeopardyData);
  const [selectedQuestion, setSelectedQuestion] = useState<{
    categoryIndex: number;
    questionIndex: number;
    question: string;
    answer: string;
    type: string;
    mediaUrl: string | null;
    dailyDouble: boolean;
  } | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answeredQuestionsCount, setAnsweredQuestionsCount] =
    useState<number>(0);

  const handleQuestionClick = (
    categoryIndex: number,
    questionIndex: number
  ) => {
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
      });
      setShowAnswer(false);
    } else {
      setQuestionToUnAnswered(categoryIndex, questionIndex);
    }
  };

  const setQuestionToAnswered = () => {
    setCategories((prevCategories) =>
      prevCategories.map((category, cIdx) =>
        cIdx === selectedQuestion?.categoryIndex
          ? {
              ...category,
              questions: category.questions.map((q, qIdx) =>
                qIdx === selectedQuestion.questionIndex
                  ? { ...q, answered: true }
                  : q
              ),
            }
          : category
      )
    );
    setAnsweredQuestionsCount((prev) => prev + 1);
  };

  const setQuestionToUnAnswered = (
    categoryIndex: number,
    questionIndex: number
  ) => {
    setCategories((prevCategories) =>
      prevCategories.map((category, cIdx) =>
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
      setQuestionToAnswered();
      setSelectedQuestion(null);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-jeopardy">
      <div className="flex flex-row bg-black pb-2">
        {categories.map((category, cIdx) => (
          <Category
            key={cIdx}
            name={category.name}
            questions={category.questions}
            onQuestionClick={(qIdx) => handleQuestionClick(cIdx, qIdx)}
          />
        ))}
      </div>

      {selectedQuestion &&
        (() => {
          switch (selectedQuestion.type) {
            case "text":
              return (
                <QuestionModal
                  content={
                    showAnswer
                      ? selectedQuestion.answer
                      : selectedQuestion.question
                  }
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
}

export default App;
