import { Outlet, Link, useNavigation } from "react-router";

export default function Root() {
  const navigation = useNavigation();
  const loading = navigation.state !== "idle";

  return (
    <div className="min-h-screen text-white">
      {loading && (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-1 bg-yellow-400/30">
          <div className="h-full bg-yellow-400 animate-[loading_1s_ease-in-out_infinite]" style={{ width: "60%" }} />
        </div>
      )}
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
