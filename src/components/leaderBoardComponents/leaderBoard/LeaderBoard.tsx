import { useState, useEffect } from "react";
import styles from "./LeaderBoard.module.css";
function LeaderBoard() {

  const [sortedLeaderBoardData, setSortedLeaderBoardData] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [leaderBoardData, setLeaderBoardData] = useState([]);

  const easyUrl = "https://memory-game-backend-production-e873.up.railway.app/easy-leader-board/all-easy-scores";
  const mediumUrl = "https://memory-game-backend-production-e873.up.railway.app/medium-leader-board/all-medium-scores";
  const hardUrl = "https://memory-game-backend-production-e873.up.railway.app/hard-leader-board/all-hard-scores";

  // Fetch leaderboard data based on the selected difficulty
  const fetchLeaderBoardData = async (url) => {
    try {
      if (!url) {
        throw new Error("No URL provided");
      }
      const response = await fetch(url);
      const data = await response.json();
      setLeaderBoardData(data);
      // Process the data as needed
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  // Sort leaderboard data by time and store in state.
  useEffect(() => {
    // if (!leaderBoardData || leaderBoardData.length === 0) return;
    // setSortedLeaderBoardData(leaderBoardData.sort(sortByTime));
  }, [leaderBoardData]);

  // Fetch leaderboard data base when the selected difficulty changes.
  useEffect(() => {
    // Reset leaderboard data when difficulty changes
    setLeaderBoardData([]);
    if (selectedDifficulty === "Easy") {
      fetchLeaderBoardData(easyUrl);
    }
    if (selectedDifficulty === "Medium") {
      fetchLeaderBoardData(mediumUrl);
    }
    if (selectedDifficulty === "Hard") {
      fetchLeaderBoardData(hardUrl);
    }
  }, [selectedDifficulty]);

  return (
    <div className={styles.leaderBoardPage} data-testid="leaderboard-page">
      {/* <LeaderBoardHeader selectedDifficulty={selectedDifficulty} />
      <LeaderBoardTable
        setSelectedDifficulty={setSelectedDifficulty}
        selectedDifficulty={selectedDifficulty}
        sortedLeaderBoardData={sortedLeaderBoardData}
      /> */}
    </div>
  );
}

export default LeaderBoard;
