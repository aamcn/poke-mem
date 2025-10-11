import Header from "../../components/header/Header";
import LeaderBoard from "../../components/leaderBoardComponents/leaderBoard/LeaderBoard";
import styles from "./leaderBoardPage.module.css";

function LeaderBoardPage() {
  return (
    <div data-testid="leaderboard-page" className={styles.leaderBoardPage}>
      <Header />
      <LeaderBoard />
    </div>
  );
}

export default LeaderBoardPage;
