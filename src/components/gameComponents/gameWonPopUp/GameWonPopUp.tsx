import { useState } from "react";
import styles from "./GameWonPopUp.module.css";
import { useGameContext } from "../game/Game";

function GameWonPopUp() {
  const { state, dispatch } = useGameContext();

  /*
  TODO: 
    implement final time.
    Display final time.
    Implement submit score functionality.
  */

  return (
    <div className={styles.gameWonWindow} data-testid="game-won-popup">
      <h3 className={styles.gameWonTitle} aria-label="You Did It!">
        You Did It!
      </h3>
      <div className={styles.gameWonText}>
        <p aria-label="You Beat This Round">You Beat This Round</p>
        <p aria-label="Nice Work!">Nice Work!</p>
      </div>
      <div>
        <p aria-label="Your final time was:">Your final time was:</p>
        <p
          data-testid="win-final-time"
          className={styles.winTimeText}
          aria-label="Final Time"
        >
          final time here
        </p>
      </div>
      <div>
        <p aria-label="Would you like to play again?">
          Would you like to play again?
        </p>
        <br></br>
        <button
          className={styles.newGameButton}
          onClick={() => dispatch({ type: "resetGame", payload: null })}
          aria-label="Start a New Game Button"
        >
          New Game?
        </button>
        <button
          className={styles.newGameButton}
          onClick={() =>
            alert("Submit Score functionality not yet implemented")
          }
          aria-label="Submit Score Button"
        >
          Submit Score
        </button>
      </div>
    </div>
  );
}

export default GameWonPopUp;
