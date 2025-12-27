import { useState } from "react";
import { useJeopardyGameContext } from "../../hooks/useJeopardyGameContext";
import { Category } from "../../components/Category";
import { JeopardyQuestion } from "./Jeopardy";
import EditModal, { JeopardyQuestionInputs } from "../../components/EditModal";
import Button from "@/components/Button";

type JeopardyEditProps = {};

const JeopardyEdit = ({}: JeopardyEditProps) => {
  const {
    originalGame,
    editing,
    setEditing,
    saveDraft,
  } = useJeopardyGameContext();
  console.log(originalGame);
  if (!originalGame) {
    return;
  }
  const categories = originalGame?.gameData.jeopardy;
  const [
    selectedQuestion,
    setSelectedQuestion,
  ] = useState<JeopardyQuestion | null>(null);

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
    console.log(questionInputs);
    console.log(originalGame.gameData.jeopardy);
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
          hanldeUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </div>
  );
};

export default JeopardyEdit;
