import React from "react";
import styles from "./gameMenu.module.css";

function GameMenu({ handleStartClick, cardTotal, setCardTotal }) {
  /* 
  The difficulty of the game is set by the cardTotal, this limits how many cards 
  are drawn, the value of the button clicked is stored as the cardTotal.
*/
  const handleClickDifficulty = (event) => {
    setCardTotal(parseInt(event.target.value));
  };

  return (
    <div className={styles.gameMenuContainer} data-testid="game-menu-container">
      {/* Title of the Game Menu */}
      <div className={styles.titleContainer}>
        <h2 id="game-menu-title">Menu</h2>
      </div>
      <div className={styles.difficultyContainer}>
        <p data-testid="difficulty-title" className={styles.difficultyTitle}>
          Choose Your Difficulty
        </p>
        <p data-testid="difficultyText">{cardTotal} Cards</p>
        <div className={styles.difficultyButtons}>
          <button
            data-testid="easy-button"
            className={styles.optionButton}
            onClick={handleClickDifficulty}
            value={4}
          >
            Easy
          </button>
          <button
            data-testid="medium-button"
            className={styles.optionButton}
            onClick={handleClickDifficulty}
            value={6}
          >
            Medium
          </button>
          <button
            data-testid="hard-button"
            className={styles.optionButton}
            onClick={handleClickDifficulty}
            value={9}
          >
            Hard
          </button>
        </div>
      </div>
      <div id="menu-buttons-container">
        <button
          data-testid="start-button"
          className={styles.startButton}
          onClick={handleStartClick}
        >
          Start
        </button>
      </div>
    </div>
  );
}


export default GameMenu;
