import { useState } from "react";
import { useJeopardyGameContext } from "../../hooks/useJeopardyGameContext";
import { Category } from "../../components/Category";
import { JeopardyQuestion } from "./Jeopardy";
import EditModal, { JeopardyQuestionInputs } from "../../components/EditModal";
import Button from "@/components/Button";
import { Question } from "@shared/types/types";

type JeopardyEditProps = {};

const JeopardyEdit = ({}: JeopardyEditProps) => {
  const {
    originalGame,
    saveDraft,
    inDoubleJeopardy,
    startEditing,
    setDraftGame,
  } = useJeopardyGameContext();
  if (!originalGame) {
    return;
  }
  const categories = originalGame?.gameData.jeopardy;
  const [
    selectedQuestion,
    setSelectedQuestion,
  ] = useState<JeopardyQuestion | null>(null);

  const [editing, setEditing] = useState<boolean>(false);

  const handleQuestionClick = (
    categoryIndex: number,
    questionIndex: number
  ) => {
    const question = categories[categoryIndex].questions[questionIndex];
    setSelectedQuestion({
      categoryIndex,
      questionIndex,
      question: question.question,
      answer: question.answer,
      type: question.type,
      mediaUrl: question.mediaUrl,
      dailyDouble: question.dailyDouble,
    });
    setEditing(true);
  };

  const handleUpdateQuestion = (questionInputs: JeopardyQuestionInputs) => {
    if (!selectedQuestion) return;

    startEditing(); // create the clone in the context

    setDraftGame((prev) => {
      if (!prev) return prev;

      const boardKey = inDoubleJeopardy ? "doubleJeopardy" : "jeopardy";

      const categories = prev.gameData[boardKey];

      const { categoryIndex, questionIndex } = selectedQuestion;

      const existingQuestion: Question =
        categories[categoryIndex].questions[questionIndex];

      const updatedQuestion = {
        ...existingQuestion,
        ...questionInputs,
      };

      const updatedCategories = categories.map((category, cIdx) =>
        cIdx !== categoryIndex
          ? category
          : {
              ...category,
              questions: category.questions.map((q, qIdx) =>
                qIdx !== questionIndex ? q : updatedQuestion
              ),
            }
      );

      return {
        ...prev,
        gameData: {
          ...prev.gameData,
          [boardKey]: updatedCategories,
        },
      };
    });
    saveDraft();
  };

  return (
    <div className="w-full h-full bg-jeopardy flex">
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
      <div className="text-white text-center w-1/5 p-4">
        <Button text="Update Game" onClick={saveDraft} />
      </div>

      {/* {finalJeopardy && <FinalJeopardyModal></FinalJeopardyModal>} */}

      {selectedQuestion && editing && (
        <EditModal
          question={selectedQuestion}
          onClose={() => setEditing(false)}
          handleUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </div>
  );
};

export default JeopardyEdit;
