import { Outlet, Link } from "react-router";

export default function Root() {
  return (
    <>
      <nav className="flex gap-4 justify-end mx-10 h-12 leading-12">
        <Link to="/">Home</Link>
        <Link to="/jeopardy">Jeopardy</Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}
