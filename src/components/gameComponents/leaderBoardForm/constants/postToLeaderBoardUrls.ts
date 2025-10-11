//URLs to POST game data to each difficulty database table.
const postToLeaderBoardUrls: Record<string, string> = {
  Easy: "https://memory-game-backend-production-e873.up.railway.app/easy-leader-board/add-easy-top-scorer",
  Medium:
    "https://memory-game-backend-production-e873.up.railway.app/medium-leader-board/add-medium-top-scorer",
  Hard: "https://memory-game-backend-production-e873.up.railway.app/hard-leader-board/add-hard-top-scorer",
};

export { postToLeaderBoardUrls };
