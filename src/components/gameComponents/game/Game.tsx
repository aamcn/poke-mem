import GameMenu from "../gameMenu/GameMenu";
import {
  useContext,
  createContext,
  useReducer,
  useEffect,
  useState,
  useMemo,
} from "react";
import styles from "./game.module.css";
import CardsDisplay from "../../cardComponents/cardsDisplay/CardsDIsplay";
import ScoreBoard from "../scoreBoard/scoreBoard";
import GameOverPopUp from "../gameOverPopUp/GameOverPopUp";
import GameWonPopUp from "../gameWonPopUp/GameWonPopUp";
import { fetchAllPokemonObjects } from "./utilities/fetchAllPokemonObjects/fetchAllPokemonObjects";
import { getRandomIndexArray } from "./utilities/getRandomIndexArray/getRandomIndexArray";
import Timer from "../timer/Timer";
import LeaderBoardForm from "../leaderBoardForm/LeaderBoardForm";

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
type AppActions =
  | ToggleGameStartedAction
  | ToggleGameDifficultyAction
  | ToggleGameWonAction
  | ToggleGameLostAction
  | IncrementScoreAction
  | ResetGameAction
  | SetFinalTimeAction;

// Define the shape of the game state
interface gameObjectState {
  gameStarted: boolean;
  gameWon: boolean;
  gameLost: boolean;
  gameDifficulty: string;
  cardTotal: number;
  score: number;
  finalTime: string;
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
  // Use useReducer to manage the game state. Initial state is defined here.
  const [state, dispatch] = useReducer(gameReducer, {
    gameStarted: false,
    gameWon: false,
    gameLost: false,
    gameDifficulty: "easy",
    cardTotal: 0,
    score: 0,
    finalTime: "",
  });

  const [allPokemonObjects, setAllPokemonObjects] = useState<Array<object>>([]);
  const [leaderBoardFormVisible, setLeaderBoardFormVisible] =
    useState<boolean>(false);
  // Value to be provided by the GameContext
  const gameContextValue: GameContextType = { state, dispatch };

  // Fetch all Pokemon objects when the component mounts
  useEffect(() => {
    setAllPokemonObjects([]); // Clear existing data before fetching new data
    const pokemonDataObjects = fetchAllPokemonObjects();
    setAllPokemonObjects(pokemonDataObjects);
  }, []);

  const chosenPokemon = useMemo(() => {
    // Get an array of random index numbers based on the current card total.
    const randomIndexNumbers = getRandomIndexArray(state.cardTotal);
    // Use the random index numbers to select Pokemon card data objects from allPokemonObjects.
    const randomPokemonArray: Array<object> = [];
    if (allPokemonObjects.length !== 0) {
      //Add error handling for when allPokemonObjects is empty.
      for (let i = 0; i < state.cardTotal; i++) {
        const pokeObject = allPokemonObjects[randomIndexNumbers[i]] as object;
        randomPokemonArray.push(pokeObject);
      }
    }
    return randomPokemonArray;
  }, [allPokemonObjects, state.cardTotal]);

  return (
    <div className={styles.gameContainer} data-testid="game-container">
      <GameContext.Provider value={gameContextValue}>
        <div
          className={styles.gameInfoContainer}
          data-testid="game-info-container"
        >
          {state.gameStarted && (
            <>
              <ScoreBoard />
              <Timer />
            </>
          )}
        </div>
        {!state.gameStarted && <GameMenu />}
        {state.gameLost && <GameOverPopUp />}
        {state.gameWon && !leaderBoardFormVisible && (
          <GameWonPopUp setLeaderBoardFormVisible={setLeaderBoardFormVisible} />
        )}
        {state.gameWon && leaderBoardFormVisible && (
          <LeaderBoardForm
            setLeaderBoardFormVisible={setLeaderBoardFormVisible}
          />
        )}
        {state.gameStarted && !state.gameLost && !state.gameWon && (
          <CardsDisplay chosenPokemon={chosenPokemon} />
        )}
      </GameContext.Provider>
    </div>
  );
}

export default Game;
