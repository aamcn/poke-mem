// Define action types for the reducer
interface ToggleGameStartedAction {
  type: "toggleGameStarted";
  payload: boolean;
}

interface ToggleGameDifficultyAction {
  type: "toggleGameDifficulty";
  payload: [string, number];
}

interface ToggleGameWonAction {
  type: "toggleGameWon";
  payload: boolean;
}

interface ToggleGameLostAction {
  type: "toggleGameLost";
  payload: boolean;
}

interface IncrementScoreAction {
  type: "incrementScore";
  payload: null;
}

interface ResetGameAction {
  type: "resetGame";
  payload: null;
}

interface SetFinalTimeAction {
  type: "setFinalTime";
  payload: string;
}

// Union type for all possible actions
export type AppActions =
  | ToggleGameStartedAction
  | ToggleGameDifficultyAction
  | ToggleGameWonAction
  | ToggleGameLostAction
  | IncrementScoreAction
  | ResetGameAction
  | SetFinalTimeAction;

// Define the shape of the game state
export interface gameObjectState {
  gameStarted: boolean;
  gameWon: boolean;
  gameLost: boolean;
  gameDifficulty: string;
  cardTotal: number;
  score: number;
  finalTime: string;
}

export function gameReducer(state: gameObjectState, action: AppActions) {
  const { type, payload } = action;
  switch (type) {
    // Change the game started boolean value.
    case "toggleGameStarted":
      return {
        gameStarted: payload as boolean,
        gameWon: state.gameWon,
        gameLost: state.gameLost,
        gameDifficulty: state.gameDifficulty,
        cardTotal: state.cardTotal,
        score: state.score,
        finalTime: state.finalTime,
      };
    // Toggle the game difficulty value.
    case "toggleGameDifficulty":
      return {
        gameStarted: state.gameStarted,
        gameWon: state.gameWon,
        gameLost: state.gameLost,
        gameDifficulty: payload[0] as string,
        cardTotal: payload[1] as number,
        score: state.score,
        finalTime: state.finalTime,
      };
    // Change the game won boolean value.
    case "toggleGameWon":
      return {
        gameStarted: state.gameStarted,
        gameWon: payload as boolean,
        gameLost: state.gameLost,
        gameDifficulty: state.gameDifficulty,
        cardTotal: state.cardTotal,
        score: state.score,
        finalTime: state.finalTime,
      };
    // Change the game lost boolean value.
    case "toggleGameLost":
      return {
        gameStarted: state.gameStarted,
        gameWon: state.gameWon,
        gameLost: payload as boolean,
        gameDifficulty: state.gameDifficulty,
        cardTotal: state.cardTotal,
        score: state.score,
        finalTime: state.finalTime,
      };
    // Increment the score by 1.
    case "incrementScore":
      return {
        gameStarted: state.gameStarted,
        gameWon: state.gameWon,
        gameLost: state.gameLost,
        gameDifficulty: state.gameDifficulty,
        cardTotal: state.cardTotal,
        score: state.score + 1,
        finalTime: state.finalTime,
      };
    case "setFinalTime":
      return {
        gameStarted: state.gameStarted,
        gameWon: state.gameWon,
        gameLost: state.gameLost,
        gameDifficulty: state.gameDifficulty,
        cardTotal: state.cardTotal,
        score: state.score,
        finalTime: payload as string,
      };
    // Reset the game to initial state.
    case "resetGame":
      return {
        gameStarted: false,
        gameWon: false,
        gameLost: false,
        gameDifficulty: "Easy",
        cardTotal: 0,
        score: 0,
        finalTime: "",
      };
    default:
      throw new Error("Unknown action type");
  }
}

export default gameReducer;
