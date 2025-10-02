import GameMenu from "../gameMenu/GameMenu";
import { useContext, createContext, useReducer } from "react";

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

// Union type for all possible actions
type AppActions =
  | ToggleGameStartedAction
  | ToggleGameDifficultyAction
  | ToggleGameWonAction
  | ToggleGameLostAction
  | IncrementScoreAction
  | ResetGameAction;


// Define the shape of the game state
interface gameObjectState {
  gameStarted: boolean;
  gameWon: boolean;
  gameLost: boolean;
  gameDifficulty: string;
  cardTotal: number;
  score: number;
}

// Reducer function to manage object state transitions
function gameReducer(state: gameObjectState, action: AppActions) {
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
      };
    // Toggle the game difficulty value.
    case "toggleGameDifficulty":
      return {
        gameStarted: !state.gameStarted,
        gameWon: state.gameWon,
        gameLost: state.gameLost,
        gameDifficulty: payload[0] as string,
        cardTotal: payload[1] as number,
        score: state.score,
      };
    // Change the game won boolean value.
    case "toggleGameWon":
      return {
        gameStarted: !state.gameStarted,
        gameWon: payload as boolean,
        gameLost: state.gameLost,
        gameDifficulty: state.gameDifficulty,
        cardTotal: state.cardTotal,
        score: state.score,
      };
    // Change the game lost boolean value.
    case "toggleGameLost":
      return {
        gameStarted: !state.gameStarted,
        gameWon: payload as boolean,
        gameLost: state.gameLost,
        gameDifficulty: state.gameDifficulty,
        cardTotal: state.cardTotal,
        score: state.score,
      };
    // Increment the score by 1.
    case "incrementScore":
      return {
        gameStarted: !state.gameStarted,
        gameWon: state.gameWon,
        gameLost: state.gameLost,
        gameDifficulty: state.gameDifficulty,
        cardTotal: state.cardTotal,
        score: state.score + 1,
      };
    // Reset the game to initial state.
    case "resetGame":
      return {
        gameStarted: false,
        gameWon: false,
        gameLost: false,
        gameDifficulty: "Easy",
        cardTotal: 4,
        score: 0,
      };
    default:
      throw new Error("Unknown action type");
  }
}

// Create a context for the game state and dispatch function
export interface GameContextType {
  state: gameObjectState;
  dispatch: React.Dispatch<AppActions>;
}
// Initialize the context with a default value
const GameContext = createContext<GameContextType>({} as GameContextType);

// Custom hook to use the GameContext
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};

function Game() {
  const [state, dispatch] = useReducer(gameReducer, {
    gameStarted: false,
    gameWon: false,
    gameLost: false,
    gameDifficulty: "easy",
    cardTotal: 4,
    score: 0,
  });

  const gameContextValue: GameContextType = {
    state,
    dispatch,
  };

  return (
    <>
      <h1>Game Component</h1>
      <GameContext.Provider value={gameContextValue}>
        <GameMenu />
      </GameContext.Provider>
    </>
  );
}

export default Game;
