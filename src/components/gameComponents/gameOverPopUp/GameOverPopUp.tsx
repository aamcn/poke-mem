import { useGameContext } from "../game/Game";
import styles from "./gameOverPopUp.module.css";

function GameOverPopUp() {
  // Access the game state and dispatch function from the context
  const { dispatch } = useGameContext();

  const finalTime = "2:34"; // Placeholder for final time - replace with actual value from state or props as needed

  // Reset the game state when the retry button is clicked.
  const handleClickRetry = () => {
    dispatch({ type: "resetGame", payload: null });
  };

  return (
    <div className={styles.lostGameWindow} data-testid="game-over-popup">
      <h3
        className={styles.gameOverTitle}
        data-testid="game-over-title"
        aria-label="Game Over"
      >
        Game Over
      </h3>
      <div className={styles.gameOverText}>
        <p aria-label="Oh no...">Oh no...</p>
        <p aria-label="You already clicked on that">
          You already clicked on that
        </p>
      </div>
      <div>
        <p aria-label="Your final time was:">Your final time was:</p>
        <p
          data-testid="final-time"
          className={styles.finalTimeText}
          aria-label={`Final Time: ${finalTime}`}
        >
          {finalTime}
        </p>
      </div>
      <div>
        <p aria-label="Would you like to try again?">
          Would you like to try again?
        </p>
        <br></br>
        <button
          className={styles.retryButton}
          onClick={handleClickRetry}
          aria-label="Retry Button"
        >
          Retry?
        </button>
      </div>
    </div>
  );
}

export default GameOverPopUp;
