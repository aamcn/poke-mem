import { useGameContext } from "../game/Game";
import styles from "./gameOverPopUp.module.css";

function GameOverPopUp() {
  // Access the game state and dispatch function from the context
  const { dispatch } = useGameContext();

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
        <br></br>
        <p aria-label="Would you like to try again?">
          Would you like to try again?
        </p>
      </div>
      <div>
        <button
          className={styles.retryButton}
          onClick={() => dispatch({ type: "resetGame", payload: null })}
          aria-label="Retry Button"
        >
          Retry?
        </button>
      </div>
    </div>
  );
}

export default GameOverPopUp;
