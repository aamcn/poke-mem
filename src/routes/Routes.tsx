import App from "../App";
import LandingPage from "../pages/LandingPage";
import GamePage from "../pages//GamePage";
import RouterErrorPage from "../pages//RouterErrorPage";
import LeaderBoardPage from "../pages/LeaderBoardPage";
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