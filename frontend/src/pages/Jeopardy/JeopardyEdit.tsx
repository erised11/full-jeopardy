import { useMemo, useState } from "react";
import { useJeopardyGameContext } from "../../hooks/useJeopardyGameContext";
import { JeopardyQuestion } from "./Jeopardy";
import EditModal, { JeopardyQuestionInputs } from "../../components/EditModal";
import Button from "@/components/Button";
import PasswordPromptModal from "@/components/PasswordPromptModal";
import { CategoryType, QuestionType } from "@shared/types/types";
import { Category } from "@/components/Category";
import { useLocation, useNavigate } from "react-router";
import TextEditModal from "@/components/TextEditModal";
import { PasswordError } from "@/services/gamesApi";
import { isEqual } from "lodash";

const JeopardyEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Password passed via router state from JeopardySelect (for protected games)
  const [password, setPassword] = useState<string | undefined>(
    location.state?.password
  );
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordError, setPasswordError] = useState("");

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

  if (!originalGame) return null;

  const getCategoriesToEdit = (): CategoryType[] => {
    const game = draftGame ?? originalGame;
    return inDoubleJeopardy ? game.gameData.doubleJeopardy : game.gameData.jeopardy;
  };

  const hasUnsavedChanges = useMemo(
    () => draftGame !== null && !isEqual(draftGame, originalGame),
    [draftGame, originalGame]
  );

  const categories = getCategoriesToEdit();

  const [selectedQuestion, setSelectedQuestion] = useState<JeopardyQuestion | null>(null);
  const [editing, setEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState(originalGame.title);

  const handleSave = async (pwd?: string) => {
    const activePassword = pwd ?? password;
    try {
      await saveDraft(activePassword);
    } catch (error) {
      if (error instanceof PasswordError) {
        setPasswordError(error.message);
        setShowPasswordPrompt(true);
      } else {
        alert("Failed to save changes. Please try again.");
      }
    }
  };

  const handlePasswordSubmit = (pwd: string) => {
    setPassword(pwd);
    setPasswordError("");
    setShowPasswordPrompt(false);
    handleSave(pwd);
  };

  const toggleDoubleJeopardy = () => setInDoubleJeopardy(!inDoubleJeopardy);

  const handleBackButton = () => {
    if (hasUnsavedChanges) {
      if (confirm("You have unsaved changes. Are you sure you want to leave?")) {
        navigate("/jeopardy");
      }
    } else {
      navigate("/jeopardy");
    }
  };

  const handleUpdateTitle = () => {
    startEditing();
    setDraftGame((prev) => (prev ? { ...prev, title } : prev));
    setEditingTitle(false);
  };

  const handleQuestionClick = (categoryIndex: number, questionIndex: number) => {
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
      return {
        ...prev,
        gameData: {
          ...prev.gameData,
          [boardKey]: prev.gameData[boardKey].map((cat, i) =>
            i === categoryIndex ? { ...cat, name: updatedName } : cat
          ),
        },
      };
    });
  };

  const handleUpdateQuestion = (questionInputs: JeopardyQuestionInputs) => {
    if (!selectedQuestion) return;
    startEditing();
    setDraftGame((prev) => {
      if (!prev) return prev;
      const boardKey = inDoubleJeopardy ? "doubleJeopardy" : "jeopardy";
      const { categoryIndex, questionIndex } = selectedQuestion;
      const existingQuestion: QuestionType =
        prev.gameData[boardKey][categoryIndex].questions[questionIndex];
      return {
        ...prev,
        gameData: {
          ...prev.gameData,
          [boardKey]: prev.gameData[boardKey].map((cat, cIdx) =>
            cIdx !== categoryIndex
              ? cat
              : {
                  ...cat,
                  questions: cat.questions.map((q, qIdx) =>
                    qIdx !== questionIndex
                      ? q
                      : { ...existingQuestion, ...questionInputs }
                  ),
                }
          ),
        },
      };
    });
  };

  return (
    <div className="w-full h-[100vh] bg-jeopardy flex">
      <div className="pl-4">
        <div className="mt-5 p-2 m-auto font-swiss uppercase textShadow text-5xl text-white flex justify-center">
          <div onClick={() => setEditingTitle(true)} className="hover:bg-white/90">
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
          <Button
            variant="primary"
            onClick={() => handleSave()}
            disabled={!hasUnsavedChanges}
          >
            Save Changes
          </Button>
          <Button variant="outline" onClick={toggleDoubleJeopardy}>
            {inDoubleJeopardy ? "← Jeopardy" : "Double Jeopardy →"}
          </Button>
          {hasUnsavedChanges && (
            <Button variant="danger" onClick={discardDraft}>
              Clear Changes
            </Button>
          )}
        </div>
        <div className="mb-2 p-4 flex justify-center">
          <Button variant="outline" onClick={handleBackButton}>
            ← Back to Select
          </Button>
        </div>
      </div>

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

      <PasswordPromptModal
        isOpen={showPasswordPrompt}
        onSubmit={handlePasswordSubmit}
        onCancel={() => {
          setShowPasswordPrompt(false);
          setPasswordError("");
        }}
        error={passwordError}
      />
    </div>
  );
};

export default JeopardyEdit;
