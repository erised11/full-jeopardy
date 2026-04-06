import { Outlet, Link } from "react-router";

export default function Root() {
  return (
    <div className="min-h-screen text-white">
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 bg-gray-900/90 backdrop-blur-md border-b border-white/8">
        <Link to="/" className="text-xl font-bold tracking-wide text-white hover:text-yellow-400 transition-colors duration-200">
          Game Mixer
        </Link>

        <div className="flex gap-6 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-400 hover:text-white transition-colors duration-200"
          >
            Home
          </Link>
        </div>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
