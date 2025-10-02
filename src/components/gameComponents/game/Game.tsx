import { useMemo, useState } from "react";
import GameMenu from "../gameMenu/GameMenu";
import { useContext, createContext, useReducer} from "react";

interface Actions {
  type: "toggleGameStarted" | "toggleGameDifficulty";
  payload: boolean | string;
}

interface gameObjectState {
  gameStarted: boolean;
  gameWon: boolean;
  gameLost: boolean;
  gameDifficulty: string;
  cardTotal: number;
  score: number;
}


// Reducer function to manage object state transitions
function gameReducer(state: gameObjectState, action: Actions) {
  const {type, payload} = action;
  switch (type) {
    // Change the game started boolean value.
    case "toggleGameStarted":
      return {
        gameStarted: !state.gameStarted,
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
          gameDifficulty: payload as string,
          cardTotal: state.cardTotal,
          score: state.score,
      };
    default:
      throw new Error("Unknown action type");
  }
}


export interface GameContextType {
   state: gameObjectState;
   dispatch: React.Dispatch<Actions>;
}

const GameContext = createContext<GameContextType>({} as GameContextType);

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}


function Game() {
  const [state, dispatch] = useReducer(gameReducer, {gameStarted: false, gameWon: false, gameLost: false, gameDifficulty: "easy", cardTotal: 0, score: 0});

const gameContextValue: GameContextType = {
  state,
  dispatch,
}
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