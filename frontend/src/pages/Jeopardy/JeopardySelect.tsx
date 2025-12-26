import { Link } from "react-router";
import Card from "../../components/Card";
import { useJeopardyGameContext } from "frontend/src/hooks/useJeopardyGameContext";

type JeopardySelectProps = {};

const JeopardySelect = ({}: JeopardySelectProps) => {
  const game = useJeopardyGameContext();

  const uploadGame = async () => {};

  return (
    <div className="w-[100vw] h-[calc(100vh-48px)] bg-jeopardy flex flex-col p-12 font-swiss text-4xl">
      <div className="flex gap-4">
        <Link to="/game/jeopardy/1" className="">
          <Card>
            <Link to="/game/jeopardy/1/edit">
              <div className="absolute top-0 right-0 p-2">Edit</div>
            </Link>
            <div className="h-full w-full flex flex-col justify-center text-center">
              Jeopardy Game 1
            </div>
          </Card>
        </Link>
        <Link to="/game/jeopardy/1" className="">
          <Card>
            <div className="h-full w-full flex flex-col justify-center text-center">
              Jeopardy Game 1
            </div>
          </Card>
        </Link>
        <button className="w-24 h-24 bg-green-100 p-14" onClick={uploadGame}>
          Upload game
        </button>
      </div>
    </div>
  );
};

export default JeopardySelect;
