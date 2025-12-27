import { useState } from "react";
import { useJeopardyGameContext } from "../../hooks/useJeopardyGameContext";
import { Category } from "../../components/Category";
import { JeopardyQuestion } from "./Jeopardy";
import EditModal from "../../components/EditModal";

type JeopardyEditProps = {};

const JeopardyEdit = ({}: JeopardyEditProps) => {
  const game = useJeopardyGameContext();
  const [categories, setCategories] = useState(game.gameData.jeopardy);
  const [editing, setEditing] = useState(false);
  const [
    selectedQuestion,
    setSelectedQuestion,
  ] = useState<JeopardyQuestion | null>(null);
  const [newGame, setNewGame] = useState();

  const duplicatedGame = structuredClone(game);

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

  const uploadGame = async () => {
    try {
      const response = await fetch("http://localhost:4000/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Game created successfully:", data);
      return data;
    } catch (error) {
      console.error("Error creating game:", error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-jeopardy flex flex-col">
      <button className="w-24 h-24 bg-green-100 p-14" onClick={uploadGame}>
        Upload game
      </button>
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

      {/* {finalJeopardy && <FinalJeopardyModal></FinalJeopardyModal>} */}

      {selectedQuestion && editing && (
        <EditModal
          question={selectedQuestion}
          onClose={() => setEditing(false)}
        />
      )}
    </div>
  );
};

export default JeopardyEdit;
