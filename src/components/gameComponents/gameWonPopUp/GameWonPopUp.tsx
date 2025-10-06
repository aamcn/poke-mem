import { useState } from 'react';
import styles from './GameWonPopUp.module.css';
import { useGameContext } from '../game/Game';

function GameWonPopUp() {

  const {state, dispatch } = useGameContext();  

  return (
    <div className={styles.gameWonWindow} data-testid="game-won-popup">
      <h3 className={styles.gameWonTitle}>You Did It!</h3>
      <div className={styles.gameWonText}>
        <p>You Beat This Round</p>
        <p>Nice Work!</p>
      </div>
      <div>
        <p>Your final time was:</p>
        <p data-testid="win-final-time" className={styles.winTimeText}>
          final time here
        </p>
      </div>
      <div>
        <p>Would you like to play again?</p>
        <br></br>
        <button className={styles.newGameButton}  onClick={() => dispatch({ type: "resetGame", payload: null })}>
          New Game?
        </button>
        <button
          className={styles.newGameButton}
          onClick={() => alert('Submit Score functionality not yet implemented')}
        >
          Submit Score
        </button>
      </div>
    </div>
  );

}

export default GameWonPopUp;