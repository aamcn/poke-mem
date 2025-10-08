import styles from "./GameWonPopUp.module.css";
import { useGameContext } from "../game/Game";

interface GameWonPopUpProps {
  setLeaderBoardFormVisible: (value: boolean) => void; // Function to set the visibility of the leaderboard form
}

function GameWonPopUp({ setLeaderBoardFormVisible }: GameWonPopUpProps) {
  const {state, dispatch } = useGameContext();

  const handleLeaderBoardClick = () => {
    // Show the leaderboard form when the button is clicked
    setLeaderBoardFormVisible(true);
  };

  return (
    <div className={styles.gameWonWindow} data-testid="game-won-popup">
      <h3 className={styles.gameWonTitle} aria-label="You Did It!">
        You Did It!
      </h3>
      <div className={styles.gameWonText}>
        <p aria-label="You Beat This Round">You Beat This Round</p>
        <p aria-label="Nice Work!">Nice Work!</p>
      </div>
      <div>
        <p aria-label="Your final time was:">Your final time was:</p>
        <p
          data-testid="win-final-time"
          className={styles.winTimeText}
          aria-label="Final Time"
        >
          {state.finalTime}
        </p>
      </div>
      <div>
        <p aria-label="Would you like to play again?">
          Would you like to play again?
        </p>
        <br></br>
        <div className={styles.winMenuButtonsContainer}>
          <button
          className={styles.newGameButton}
          onClick={() => dispatch({ type: "resetGame", payload: null })}
          aria-label="Start a New Game Button"
        >
          New Game?
        </button>
        <button
          className={styles.newGameButton}
          onClick={handleLeaderBoardClick}
          aria-label="Submit Score Button"
        >
          Submit Score
        </button>
        </div>
      </div>
    </div>
  );
}

export default GameWonPopUp;
