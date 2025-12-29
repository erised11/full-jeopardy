import { useState } from "react";
import { Question } from "./Question";
import TextEditModal from "./TextEditModal";

interface CategoryProps {
  name: string;
  questions: Array<{
    value: number;
    question: string;
    answer: string;
    type: string;
    mediaUrl: string | null;
    dailyDouble: boolean;
    answered: boolean;
  }>;
  onQuestionClick: (questionIndex: number) => void;
  editMode: boolean;
  updateCategoryTitle?: (categoryName: string) => void;
}

export const Category = ({
  name,
  questions,
  onQuestionClick,
  editMode,
  updateCategoryTitle,
}: CategoryProps) => {
  const [editingCategory, setEditingCategory] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState(name);

  const handleCategorySave = () => {
    if (updateCategoryTitle) updateCategoryTitle(categoryTitle);
    setEditingCategory(false);
  };

  const handleCategoryCancel = () => {
    setEditingCategory(false);
  };

  const handleCategoryClick = () => {
    if (!editingCategory) {
      setEditingCategory(true);
    }
  };

  const categoryContent =
    editMode && editingCategory ? (
      <TextEditModal
        title="Edit Category"
        value={categoryTitle}
        setInputValue={setCategoryTitle}
        handleInputSave={handleCategorySave}
        handleInputCancel={handleCategoryCancel}
      />
    ) : (
      <h2 className=" h2shadow m-auto uppercase textShadows font-swiss">
        {name}
      </h2>
    );

  return (
    <div className="flex flex-col items-center w-[16.66667%] text-center">
      <div
        onClick={handleCategoryClick}
        className={`h-34 mb-1 border-6 w-full text-5xl border-black text-white bg-jeopardy flex flex-col justify-center ${editMode &&
          "hover:bg-white/90"}`}
      >
        {categoryContent}
      </div>

      <div className="flex flex-col w-full gap-1 px-[4px]">
        {questions.map((q, qIdx) => (
          <Question
            key={qIdx}
            value={q.value}
            answered={q.answered}
            editMode={editMode}
            onClick={() => onQuestionClick(qIdx)}
          />
        ))}
      </div>
    </div>
  );
};
