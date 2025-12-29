import { Outlet, Link } from "react-router";

export default function Root() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-blue-950 bg-opacity-80 backdrop-blur-md shadow-md">
        <div className="text-2xl font-bold tracking-wide">Game Mixer</div>

        <div className="flex gap-6 text-lg font-medium">
          <Link
            to="/"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/jeopardy"
            className="hover:text-yellow-400 transition-colors duration-200"
          >
            Jeopardy
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
