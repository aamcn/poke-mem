import styles from "./gameMenu.module.css";
import { useGameContext } from "../game/useGameContext/useGameContext";
import { useEffect, useState } from "react";

function GameMenu() {
  // Access the game state and dispatch function from the context
  const { state, dispatch } = useGameContext();
  const [error, setError] = useState(false);

  const handleStartGame = () => {
    // Dispatch an action to start the game
    if (state.cardTotal === 0) {
      setError(true);
      return;
    }
    dispatch({ type: "toggleGameStarted", payload: true });
  };

  useEffect(() => {
    //If user has selected a difficulty and error is true, set error back to false.
    if (error && state.cardTotal !== 0) {
      setError(false);
      return;
    }
    // If user has not selected a difficulty, set it back to false after 4 seconds to hide the error message.
    if (error && state.cardTotal === 0) {
      const timer = setTimeout(() => {
        setError(false);
      }, 4000);
      // Cleanup function to prevent memory leaks
      return () => clearTimeout(timer);
    }
  }, [error, state.cardTotal]);

  return (
    <div className={styles.gameMenuContainer} data-testid="game-menu-container">
      <div className={styles.gameMenu}>
        <div className={styles.titleContainer}>
          <h2 id="game-menu-title" aria-label="Game Menu">
            Menu
          </h2>
        </div>

        <div className={styles.difficultyContainer}>
          <p
            data-testid="difficulty-prompt"
            className={styles.difficultyPrompt}
            aria-label="Choose Your Difficulty"
          >
            Choose Your Difficulty
          </p>
          {error && (
            <p className={styles.errorText} data-testid="error-message">
              Please select a difficulty before starting the game.
            </p>
          )}
          {state.cardTotal > 0 && (
            <p
              aria-label={`Current Difficulty: ${state.gameDifficulty} and Card Total: ${state.cardTotal}`}
              className={styles.currentDifficultyText}
              data-testid="difficulty-text"
            >
              {state.gameDifficulty} - {state.cardTotal} Cards
            </p>
          )}

          <div className={styles.difficultyButtons}>
            <button
              data-testid="easy-button"
              className={styles.menuButton}
              // Dispatch an action to update the game difficulty and card total
              onClick={() =>
                dispatch({ type: "toggleGameDifficulty", payload: ["Easy", 4] })
              }
              value={4}
              aria-label="Set Difficulty to Easy"
            >
              Easy
            </button>

            <button
              data-testid="medium-button"
              className={styles.menuButton}
              // Dispatch an action to update the game difficulty and card total
              onClick={() =>
                dispatch({
                  type: "toggleGameDifficulty",
                  payload: ["Medium", 6],
                })
              }
              value={6}
              aria-label="Set Difficulty to Medium"
            >
              Medium
            </button>

            <button
              data-testid="hard-button"
              className={styles.menuButton}
              // Dispatch an action to update the game difficulty and card total
              onClick={() =>
                dispatch({ type: "toggleGameDifficulty", payload: ["Hard", 9] })
              }
              value={9}
              aria-label="Set Difficulty to Hard"
            >
              Hard
            </button>
          </div>
        </div>
        <div id="menu-buttons-container">
          <button
            data-testid="start-button"
            className={styles.menuButton}
            // Dispatch an action to start the game
            onClick={handleStartGame}
            aria-label="Start Game"
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameMenu;
