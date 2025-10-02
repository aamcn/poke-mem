import styles from "./gameMenu.module.css";
import { useGameContext } from "../game/Game";
function GameMenu() {
  // Access the game state and dispatch function from the context
  const { state, dispatch } = useGameContext();

  return (
    <div className={styles.gameMenuContainer} data-testid="game-menu-container">
      <div className={styles.titleContainer}>
        <h2 id="game-menu-title" aria-label="Game Menu">
          Menu
        </h2>
      </div>
      <div className={styles.difficultyContainer}>
        <p
          data-testid="difficulty-title"
          className={styles.difficultyTitle}
          aria-label="Choose Your Difficulty"
        >
          Choose Your Difficulty
        </p>
        <p
          data-testid="difficultyText"
          aria-label={`Current Difficulty: ${state.gameDifficulty} and Card Total: ${state.cardTotal}`}
          className={styles.currentDifficultyText}
        >
          {state.gameDifficulty} - {state.cardTotal} Cards
        </p>
        <div className={styles.difficultyButtons}>
          <button
            data-testid="easy-button"
            className={styles.optionButton}
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
            className={styles.optionButton}
            // Dispatch an action to update the game difficulty and card total
            onClick={() =>
              dispatch({ type: "toggleGameDifficulty", payload: ["Medium", 6] })
            }
            value={6}
            aria-label="Set Difficulty to Medium"
          >
            Medium
          </button>
          <button
            data-testid="hard-button"
            className={styles.optionButton}
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
          className={styles.startButton}
          // Dispatch an action to start the game
          onClick={() => dispatch({ type: "toggleGameStarted", payload: true })}
          aria-label="Start Game"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default GameMenu;
