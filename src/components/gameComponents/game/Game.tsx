import GameMenu from "../gameMenu/GameMenu";
import { useReducer, useEffect, useState, useMemo } from "react";
import styles from "./game.module.css";
import CardsDisplay from "../../cardComponents/cardsDisplay/CardsDIsplay";
import ScoreBoard from "../scoreBoard/scoreBoard";
import GameOverPopUp from "../gameOverPopUp/GameOverPopUp";
import GameWonPopUp from "../gameWonPopUp/GameWonPopUp";
import Timer from "../timer/Timer";
import LeaderBoardForm from "../leaderBoardForm/LeaderBoardForm";
import { fetchAllPokemonObjects } from "./utilities/fetchAllPokemonObjects/fetchAllPokemonObjects";
import { getRandomIndexArray } from "./utilities/getRandomIndexArray/getRandomIndexArray";
import { gameReducer } from "./gameState/gameState";
import { GameContext } from "./useGameContext/useGameContext";
import type { GameContextType } from "./useGameContext/useGameContext";

// Define the shape of the pokemon data object fetched from the API.
interface pokemonDataObject {
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
}

function Game() {
  // Initial gameReducer state is defined here.
  const [state, dispatch] = useReducer(gameReducer, {
    gameStarted: false,
    gameWon: false,
    gameLost: false,
    gameDifficulty: "Easy",
    cardTotal: 0,
    score: 0,
    finalTime: "",
  });

  // Value to be provided by the GameContext
  const gameContextValue: GameContextType = { state, dispatch };

  // State to hold all fetched Pokemon data objects.
  const [allPokemonObjects, setAllPokemonObjects] = useState<
    Array<pokemonDataObject>
  >([]);
  const [leaderBoardFormVisible, setLeaderBoardFormVisible] =
    useState<boolean>(false);

  // Fetch from all 151 Pokemon api urls which return the data objects needed to create game cards.
  useEffect(() => {
    const pokemonDataObjects = fetchAllPokemonObjects();
    setAllPokemonObjects(pokemonDataObjects as Array<pokemonDataObject>);
  }, []);

  /*
    Returns a random array of Pokemon data objects.
    Creates an array of random index numbers based on the card total.
    Then pushes the pokemon data object at that index to a new array.
  */
  const chosenPokemon = useMemo(() => {
    const randomPokemonArray: Array<pokemonDataObject> = [];
    if (allPokemonObjects.length !== 0) {
      const randomIndexNumbers = getRandomIndexArray(state.cardTotal);
      randomIndexNumbers.forEach((index) => {
        randomPokemonArray.push(allPokemonObjects[index] as pokemonDataObject);
      });
    }
    // Memoized value of the chosen Pokemon array
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
