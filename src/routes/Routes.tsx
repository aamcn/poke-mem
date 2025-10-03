import App from "../App";
import LandingPage from "../pages/landingPage/LandingPage";
import GamePage from "../pages/gamePage/GamePage";
import RouterErrorPage from "../pages/routerErrorPage/RouterErrorPage";
import LeaderBoardPage from "../pages/leaderBoardPage/LeaderBoardPage";
import React from "react";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/landing-page", element: <LandingPage /> },
      { index: true, element: <LandingPage /> },
      { path: "/game-page", element: <GamePage /> },
      { path: "/leader-board", element: <LeaderBoardPage /> },
    ],
    errorElement: <RouterErrorPage />,
  },
];

export default routes;
