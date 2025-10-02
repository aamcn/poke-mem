import React from "react";
import styles from "./gameMenu.module.css";
import { useGameContext } from "../hooks/useGameContext";
function GameMenu() {


  const { state, dispatch } = useGameContext();
  console.log(state)

  return (
    <div className={styles.gameMenuContainer} data-testid="game-menu-container">
      <h1></h1>
      {/* Title of the Game Menu */}
      <div className={styles.titleContainer}>
        <h2 id="game-menu-title">Menu</h2>
      </div>
      <div className={styles.difficultyContainer}>
        <p data-testid="difficulty-title" className={styles.difficultyTitle}>
          Choose Your Difficulty
        </p>
        <p data-testid="difficultyText">{4} Cards</p>
        <div className={styles.difficultyButtons}>
          <button
            data-testid="easy-button"
            className={styles.optionButton}
            onClick={() => dispatch({type: 'toggleGameDifficulty', payload: 'easy'})}
            value={4}
          >
            Easy
          </button>
          <button
            data-testid="medium-button"
            className={styles.optionButton}
            onClick={() => dispatch({type: 'toggleGameDifficulty', payload: 'medium'})}
            value={6}
          >
            Medium
          </button>
          <button
            data-testid="hard-button"
            className={styles.optionButton}
            onClick={() => dispatch({type: 'toggleGameDifficulty', payload: 'hard'})}
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
          onClick={() => dispatch({type: 'toggleGameStarted', payload: true})}
        >
          Start
        </button>
      </div>
    </div>
  );
}


export default GameMenu;
