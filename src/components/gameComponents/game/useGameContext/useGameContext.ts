import React, { createContext, useContext } from "react";
import type { AppActions, gameObjectState } from "../gameState/gameState";


export interface GameContextType {
  state: gameObjectState;
  dispatch: React.Dispatch<AppActions>;
}

 export const GameContext = createContext<GameContextType>({} as GameContextType);


// Custom hook to use the GameContext
export const useGameContext = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};