import { useGameContext } from "../../gameComponents/game/Game";
import { initHighScore } from "./utilities/initHighScore";
import styles from "./scoreBoard.module.css";

/* 
Todo:
  - Move scoreboard to container at top of screen.
*/

function ScoreBoard() {
  // Access state and dispatch from the game context
  const { state } = useGameContext();

  // Initialize high score in localStorage with a value of 0 if it doesn't already exist
  initHighScore()

  // Update high score if highscore exists and current score is greater
  if(state.score > Number(localStorage.getItem('highScore'))) {
    localStorage.setItem('highScore', state.score.toString())
  }

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
        <p data-testid="high-score-text">{localStorage.getItem('highScore')}</p>
      </div>
    </div>
  );
}

export default ScoreBoard;
