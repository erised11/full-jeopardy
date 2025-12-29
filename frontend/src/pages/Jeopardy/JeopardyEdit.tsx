import { useMemo, useState } from "react";
import { useJeopardyGameContext } from "../../hooks/useJeopardyGameContext";
import { JeopardyQuestion } from "./Jeopardy";
import EditModal, { JeopardyQuestionInputs } from "../../components/EditModal";
import Button from "@/components/Button";
import { CategoryType, QuestionType } from "@shared/types/types";
import { Category } from "@/components/Category";
import { useNavigate } from "react-router";
import TextEditModal from "@/components/TextEditModal";
import { isEqual } from "lodash";

type JeopardyEditProps = {};

const JeopardyEdit = ({}: JeopardyEditProps) => {
  const navigate = useNavigate();

  const {
    originalGame,
    saveDraft,
    inDoubleJeopardy,
    setInDoubleJeopardy,
    startEditing,
    setDraftGame,
    draftGame,
    discardDraft,
  } = useJeopardyGameContext();
  if (!originalGame) {
    return;
  }

  const getCategoriesToEdit = (): CategoryType[] => {
    if (draftGame) {
      return inDoubleJeopardy
        ? draftGame.gameData.doubleJeopardy
        : draftGame.gameData.jeopardy;
    } else {
      return inDoubleJeopardy
        ? originalGame.gameData.doubleJeopardy
        : originalGame.gameData.jeopardy;
    }
  };

  const hasUnsavedChanges = useMemo(
    () => draftGame !== null && !isEqual(draftGame, originalGame),
    [draftGame, originalGame]
  );

  // const hasUnsavedChanges = draftGame !== null;

  const categories = getCategoriesToEdit();

  const [
    selectedQuestion,
    setSelectedQuestion,
  ] = useState<JeopardyQuestion | null>(null);

  const [editing, setEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(originalGame.title);

  const toggleDoubleJeopardy = () => {
    setInDoubleJeopardy(!inDoubleJeopardy);
  };

  const handleBackButton = () => {
    if (hasUnsavedChanges) {
      if (
        confirm("You have unsaved changes. Are you sure you want to leave?")
      ) {
        navigate("/jeopardy");
      }
    } else {
      navigate("/jeopardy");
    }
  };

  const handleUpdateTitle = () => {
    startEditing();

    setDraftGame((prev) => {
      if (!prev) return prev;
      return { ...prev, title: title };
    });
    setEditingTitle(false);
  };

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
      value: question.value,
    });
    setEditing(true);
  };

  const handleUpdateCategory = (updatedName: string, categoryIndex: number) => {
    startEditing();

    setDraftGame((prev) => {
      if (!prev) return prev;
      const boardKey = inDoubleJeopardy ? "doubleJeopardy" : "jeopardy";
      const categories = prev.gameData[boardKey];

      const updatedCategories = categories.map((category, cIdx) =>
        cIdx !== categoryIndex
          ? category
          : {
              ...category,
              name: updatedName,
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
  };

  const handleUpdateQuestion = (questionInputs: JeopardyQuestionInputs) => {
    if (!selectedQuestion) return;

    startEditing(); // create the clone in the context

    setDraftGame((prev) => {
      if (!prev) return prev;

      const boardKey = inDoubleJeopardy ? "doubleJeopardy" : "jeopardy";

      const categories = prev.gameData[boardKey];

      const { categoryIndex, questionIndex } = selectedQuestion;

      const existingQuestion: QuestionType =
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
  };

  return (
    <div className="w-full h-[100vh] bg-jeopardy flex">
      <div className="pl-4">
        <div className="mt-5 p-2 m-auto font-swiss uppercase textShadow text-5xl text-white flex justify-center ">
          <div
            onClick={() => setEditingTitle(true)}
            className="hover:bg-white/90"
          >
            {draftGame ? draftGame.title : originalGame.title}
          </div>
        </div>
        <div className="flex flex-row bg-black pb-2">
          {categories.map((category, cIdx) => (
            <Category
              key={cIdx}
              editMode={true}
              name={category.name}
              questions={category.questions}
              onQuestionClick={(qIdx) => handleQuestionClick(cIdx, qIdx)}
              updateCategoryTitle={(updatedName) =>
                handleUpdateCategory(updatedName, cIdx)
              }
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between p-4 mt-18 w-1/5">
        <div className="flex flex-col gap-4 text-center">
          <div className="text-white ">
            <Button text="Save Changes" onClick={saveDraft} />
          </div>
          <div className="text-white">
            <Button
              text={`${inDoubleJeopardy ? "Jeopardy" : "Double Jeopardy"}`}
              onClick={toggleDoubleJeopardy}
            />
          </div>
          {hasUnsavedChanges && (
            <div className="text-white">
              <Button text="Clear Changes" onClick={discardDraft} />
            </div>
          )}
        </div>
        <div className="mb-2 p-4 flex justify-center">
          <Button text="Back to Select" onClick={handleBackButton} />
        </div>
      </div>

      {/* {finalJeopardy && <FinalJeopardyModal></FinalJeopardyModal>} */}

      {selectedQuestion && editing && (
        <EditModal
          question={selectedQuestion}
          onClose={() => setEditing(false)}
          handleUpdateQuestion={handleUpdateQuestion}
        />
      )}
      {editingTitle && (
        <TextEditModal
          title="Edit Title"
          value={title}
          setInputValue={setTitle}
          handleInputSave={handleUpdateTitle}
          handleInputCancel={() => setEditingTitle(false)}
        />
      )}
    </div>
  );
};

export default JeopardyEdit;
