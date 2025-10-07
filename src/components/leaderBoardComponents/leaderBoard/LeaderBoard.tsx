import { useState, useEffect } from "react";
import LeaderBoardTable from "../leaderBoardTable/LeaderBoardTable";
import { sortByTime } from "../utilities/sortByTime/sortByTime";
import { fetchLeaderBoardData } from "../utilities/fetchLeaderBoardData/fetchLeaderBoardData";
import { leaderBoardUrls } from "../constants/leaderBoardUrls";

function LeaderBoard() {
  const [selectedDifficulty, setSelectedDifficulty] = useState("Easy");
  const [leaderBoardData, setLeaderBoardData] = useState([]);

  // Fetch leaderboard data base when the selected difficulty changes.
  useEffect(() => {
    // Reset leaderboard data when difficulty changes
    setLeaderBoardData([]);
    const url = leaderBoardUrls[selectedDifficulty as keyof typeof leaderBoardUrls];
    const fetchData = async () => {
    const data = await fetchLeaderBoardData(url);
    setLeaderBoardData(data.sort(sortByTime));
  };
  fetchData();
  }, [selectedDifficulty]);

  return (
    <>
      <LeaderBoardTable
        leaderBoardData={leaderBoardData}
        setSelectedDifficulty={setSelectedDifficulty}
        selectedDifficulty={selectedDifficulty}
      />
    </>
  );
}

export default LeaderBoard;
