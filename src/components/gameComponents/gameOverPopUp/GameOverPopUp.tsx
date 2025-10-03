import { useGameContext } from "../game/Game";
import styles from "./gameOverPopUp.module.css";

function GameOverPopUp() {

  const { state, dispatch } = useGameContext();

    const finalTime = '2:34'; // Replace with actual final time from state or props
  /* 
    Setting gameResults to false hides the GameLostWindow component 
    setting gameStarted displays the gameMenu component starting the game over
  */
  const handleClickRetry = () => {
    dispatch({ type: "resetGame", payload: null });
  };

  return (
    <div className={styles.lostGameWindow} data-testid="game-over-popup">
      <h3 className={styles.gameOverTitle} data-testid="game-over-title">
        Game Over
      </h3>
      <div className={styles.gameOverText}>
        <p>Oh no...</p>
        <p>You already clicked on that</p>
      </div>
      <div>
        <p>Your final time was:</p>
        <p data-testid="final-time" className={styles.finalTimeText}>
          {finalTime}
        </p>
      </div>
      <div>
        <p>Would you like to try again?</p>
        <br></br>
        <button className={styles.retryButton} onClick={handleClickRetry}>
          Retry?
        </button>
      </div>
    </div>
  );
}


export default GameOverPopUp;
