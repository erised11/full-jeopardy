import { Link, useLoaderData } from "react-router";
import Card from "../../components/Card";
import { JeopardyGame } from "@shared/types/types";

type JeopardySelectProps = {};

const JeopardySelect = ({}: JeopardySelectProps) => {
  const games = useLoaderData() as JeopardyGame[];

  return (
    <div className="w-[100vw] h-[calc(100vh-48px)] bg-jeopardy flex flex-col p-12 font-swiss text-4xl">
      <div className="flex gap-4">
        {games.map((game, idx) => {
          return (
            <Card>
              <Link key={idx} to={`/games/${game.id}`} className="w-full">
                <div className="h-full w-full flex flex-col justify-center text-center">
                  Jeopardy Game {`${game.id}`}
                </div>
              </Link>
              <Link to={`/games/${game.id}/edit`}>
                <div className="absolute top-0 right-0 p-2">Edit</div>
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default JeopardySelect;
