import styles from "./leaderBoardHeader.module.css";

interface LeaderBoardHeaderProps {
  selectedDifficulty: string;
}

function LeaderBoardHeader({ selectedDifficulty }: LeaderBoardHeaderProps) {
  return (
    <div
      className={styles.leaderBoardHeadContainer}
      data-testid="leader-board-header"
    >
      <h1
        className={styles.leaderBoardTitle}
        data-testid="leader-board-title"
        aria-label={` Current Showing ${selectedDifficulty} Difficulty Leader Board`}
      > {selectedDifficulty} Leader Board
      </h1>
    </div>
  );
}
export default LeaderBoardHeader;
