import { createBrowserRouter } from "react-router";
import Root from "./layouts/RootLayout";
import Jeopardy from "./pages/Jeopardy/Jeopardy";
import Home from "./pages/Home";
import JeopardySelect from "./pages/Jeopardy/JeopardySelect";
import JeopardyLayout from "./layouts/JeopardyLayout";
import JeopardyEdit from "./pages/Jeopardy/JeopardyEdit";
import { jeopardyGameLoader } from "./loaders/jeopardyGameLoader";
import { jeopardyGamesListLoader } from "./loaders/jeopardyGamesListLoader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "jeopardy",
        loader: jeopardyGamesListLoader,
        Component: JeopardySelect,
      },
    ],
  },
  {
    path: "games/:gameId",
    Component: JeopardyLayout,
    loader: jeopardyGameLoader,
    children: [
      { index: true, Component: Jeopardy },
      { path: "edit", Component: JeopardyEdit },
    ],
  },
]);
