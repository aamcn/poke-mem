import { useGameContext } from "../../gameComponents/game/Game";
import styles from "./scoreBoard.module.css";

/* 
Todo:
  - Add high score functionality.
  - Move scoreboard to container at top of screen.
*/

function ScoreBoard() {
  // Access state and dispatch from the game context
  const { state } = useGameContext();

  return (
    <div
      className={styles.scoreBoardContainer}
      data-testid="scoreboard-container"
    >
      <div className={styles.scoreTextContainer}>
        <p className={styles.score} aria-label="Current Score">
          Current Score:
        </p>
        <p data-testid="current-score-text">{state.score}</p>
      </div>
      <div className={styles.scoreTextContainer}>
        <p className={styles.highScore} aria-label="High Score">
          High Score:
        </p>
        <p data-testid="high-score-text">{state.highScore}</p>
      </div>
    </div>
  );
}

export default ScoreBoard;
