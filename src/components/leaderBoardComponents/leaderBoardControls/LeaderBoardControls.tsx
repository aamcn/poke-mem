import type { Dispatch, SetStateAction } from "react";
import styles from "./LeaderBoardControls.module.css";

// Define the props for LeaderBoardControls
interface LeaderBoardControlsProps {
  setSelectedDifficulty: Dispatch<SetStateAction<string>>;
  selectedDifficulty: string;
}

function LeaderBoardControls({
  setSelectedDifficulty,
  selectedDifficulty,
}: LeaderBoardControlsProps) {
  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(e.target.value);
  };
  return (
    <div
      className={styles.leaderBoardControls}
      data-testid="leaderboard-controls-container"
    >
      <label className={styles.leaderBoardLabel} htmlFor="difficulty-select">
        Difficulty Selector
      </label>
      <select
        id="difficulty-select"
        value={selectedDifficulty}
        onChange={handleDifficultyChange}
        className={styles.leaderBoardSelect}
        aria-label="Difficulty Selector"
        data-testid="difficulty-selector"
      >
        <option
          value="Easy"
          className={styles.leaderBoardDifficulty}
          aria-label="Easy Difficulty"
        >
          Easy
        </option>
        <option
          value="Medium"
          className={styles.leaderBoardDifficulty}
          aria-label="Medium Difficulty"
          data-testid="medium-option"
        >
          Medium
        </option>
        <option
          value="Hard"
          className={styles.leaderBoardDifficulty}
          aria-label="Hard Difficulty"
        >
          Hard
        </option>
      </select>
    </div>
  );
}

export default LeaderBoardControls;
