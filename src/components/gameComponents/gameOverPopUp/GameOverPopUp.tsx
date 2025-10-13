import { useGameContext } from "../game/useGameContext/useGameContext";
import styles from "./gameOverPopUp.module.css";

function GameOverPopUp() {
  // Access the game state and dispatch function from the context
  const { state, dispatch } = useGameContext();

  return (
    <div className={styles.lostGameWindow} data-testid="game-over-popup">
      <div className={styles.gameOverPopUp}>
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
          <br></br>
          <p aria-label="Would you like to try again?">
            Final Score: {state.score}
          </p>
        </div>
        <div>
          <button
            className={styles.retryButton}
            onClick={() => dispatch({ type: "resetGame", payload: null })}
            aria-label="Retry Button"
            data-testid="retry-button"
          >
            Retry?
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameOverPopUp;
