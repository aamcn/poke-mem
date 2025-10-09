async function fetchLeaderBoardData(url: string) {
  // Fetch leaderboard data based on the selected difficulty
  try {
    if (!url) {
      throw new Error("No URL provided");
    }
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
  }
}

export { fetchLeaderBoardData };
