import { useGameContext } from "../../gameComponents/game/Game";
import styles from "./scoreBoard.module.css";

/* 
Todo:
  - Move scoreboard to container at top of screen.
*/

function ScoreBoard() {
  // Access state and dispatch from the game context
  const { state } = useGameContext();

  function updateHighScore() {
    if(localStorage.getItem('highScore') === null) {
    localStorage.setItem('highScore', '0')
    }
  }
  updateHighScore()
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
