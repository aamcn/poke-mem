import { useGameContext } from "../../gameComponents/game/Game";
import styles from "./scoreBoard.module.css";

//Displays current score and high score during games
//When player scores or beats the high score the component re-renders with updated props
function ScoreBoard() {

    const { state, dispatch } = useGameContext();

  return (
    <div
      className={styles.scoreBoardContainer}
      data-testid="scoreboard-container"
    >
      <div className={styles.scoreTextContainer}>
        <p className={styles.score}>Current Score:</p>
        <p data-testid="current-score-text">{state.score}</p>
      </div>
      <div className={styles.scoreTextContainer}>
        <p className={styles.highScore}>High Score:</p>
        <p data-testid="high-score-text">{state.highScore}</p>
      </div>
    </div>
  );
}


export default ScoreBoard;
