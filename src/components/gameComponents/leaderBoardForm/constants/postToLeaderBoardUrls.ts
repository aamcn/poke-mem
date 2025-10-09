//URLs to POST game data to each difficulty database table.
const postToLeaderBoardUrls: Record<string, string> = {
  easy: "https://memory-game-backend-production-e873.up.railway.app/easy-leader-board/add-easy-top-scorer",
  medium:
    "https://memory-game-backend-production-e873.up.railway.app/medium-leader-board/add-medium-top-scorer",
  hard: "https://memory-game-backend-production-e873.up.railway.app/hard-leader-board/add-hard-top-scorer",
};

export { postToLeaderBoardUrls };
