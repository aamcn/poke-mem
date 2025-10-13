import App from "../App";
import LandingPage from "../pages/landingPage/LandingPage";
import GamePage from "../pages/gamePage/GamePage";
import RouterErrorPage from "../pages/routerErrorPage/RouterErrorPage";
import LeaderBoardPage from "../pages/leaderBoardPage/LeaderBoardPage";
import HowToPlayPage from "../pages/howToPlayPage/HowToPlayPage"; 

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/landing-page", element: <LandingPage /> },
      { index: true, element: <LandingPage /> },
      { path: "/game-page", element: <GamePage /> },
      { path: "/leader-board", element: <LeaderBoardPage /> },
      { path: "/how-to-play", element: <HowToPlayPage /> },
    ],
    errorElement: <RouterErrorPage />,
  },
];

export default routes;
