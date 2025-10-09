import Game from "../../components/gameComponents/game/Game";
import Header from "../../components/header/Header";

function GamePage() {
  return (
    <div data-testid="game-page">
      <Header />
      <Game />
    </div>
  );
}

export default GamePage;
