import { Link } from "react-router";

type GameType = {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: string;
  fontClass?: string;
  available: boolean;
};

const gameTypes: GameType[] = [
  {
    id: "jeopardy",
    title: "Jeopardy!",
    description: "Create and play fully customizable Jeopardy games with friends.",
    path: "/jeopardy",
    icon: "/game.svg",
    fontClass: "font-swiss",
    available: true,
  },
  {
    id: "coming-soon-1",
    title: "Coming Soon",
    description: "Another game is on its way.",
    path: "#",
    icon: "/game2.svg",
    available: false,
  },
  {
    id: "coming-soon-2",
    title: "Coming Soon",
    description: "More games are being added to Game Mixer.",
    path: "#",
    icon: "/game3.svg",
    available: false,
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-950 p-6 md:p-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Game Mixer</h1>
        <p className="text-gray-400 text-base">Choose a game to get started.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {gameTypes.map((game) => {
          const card = (
            <div
              className={`
                group relative bg-gray-900 border border-white/8 rounded-2xl overflow-hidden
                transition-all duration-200
                ${game.available
                  ? "hover:border-yellow-400/40 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5 cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
                }
              `}
            >
              {/* Icon area */}
              <div className="flex items-center justify-center h-44 bg-gray-800/60 border-b border-white/5">
                <img
                  src={game.icon}
                  alt={game.title}
                  className="h-20 w-20 object-contain opacity-50 group-hover:opacity-80 transition-opacity duration-200"
                />
              </div>

                {/* Content */}
              <div className="p-5">
                <h2 className={`text-3xl text-white mb-1.5 group-hover:text-yellow-300 transition-colors duration-200 ${game.fontClass ?? ""}`}>
                  {game.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed">{game.description}</p>
              </div>

              {/* Coming soon badge */}
              {!game.available && (
                <div className="absolute top-3 right-3 bg-gray-700/80 text-gray-300 text-xs font-medium px-2.5 py-1 rounded-full">
                  Coming Soon
                </div>
              )}
            </div>
          );

          return game.available ? (
            <Link to={game.path} key={game.id}>
              {card}
            </Link>
          ) : (
            <div key={game.id}>{card}</div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
