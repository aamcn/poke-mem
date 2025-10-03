import { useEffect, useMemo, useState } from "react";
import styles from "./cardsDisplay.module.css";
import { useGameContext } from "../../gameComponents/game/Game";
import { v4 as uuidv4 } from "uuid";
import PokemonCardObject from "../cardTemplate/cardConstructor/cardConstructor";
import CardTemplate from "../cardTemplate/CardTemplate";

// First, fix the props interface - assuming allPokemonObjects should be an array
interface CardsDisplayProps {
  allPokemonObjects: Array<Pokemon>; // Change this to be an array of Pokemon
}

interface Pokemon {
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

function CardsDisplay({ allPokemonObjects }: CardsDisplayProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [cardObjects, setCardObjects] = useState<Array<PokemonCardObject>>([]);
  const { state, dispatch } = useGameContext();

  // If isHidden is true, set it back to false after 0.5 seconds to re-render the cards.
  useEffect(() => {
    if (isHidden !== false) {
      const timer = setTimeout(() => {
        setIsHidden(false);
      }, 500);
      // Cleanup function to prevent memory leaks
      return () => clearTimeout(timer);
    }
  }, [isHidden]);

  useEffect(() => {
    if (allPokemonObjects && allPokemonObjects.length > 0) {
      createCardObjects(allPokemonObjects);
    }
  }, [allPokemonObjects]);

  useEffect(() => {}, [cardObjects]);

  function createCardObjects(chosenPokemon: Array<Pokemon>) {
    // Clear existing card objects before creating new ones
    setCardObjects([]);
    chosenPokemon.map((pokemon) => {
      const newId = uuidv4();
      const imageUrl = pokemon.sprites.other.dream_world.front_default;
      const name = pokemon.name;
      const type = pokemon.types[0].type.name;
      const newCard = new PokemonCardObject(name, imageUrl, newId, type);
      setCardObjects((cardObjects) => [...cardObjects, newCard]);
    });
  }

  // Determine the appropriate CSS class based on the card total.
  const cardContainerClass = useMemo(() => {
    if (state.cardTotal === 9) return styles.nineCardsContainer;
    if (state.cardTotal === 6) return styles.sixCardsContainer;
    if (state.cardTotal === 4) return styles.fourCardsContainer;
    return "";
  }, [state.cardTotal]);

  return (
    <div className={cardContainerClass}>
      <h1>Cards Display</h1>
      {/* Render your card components here */}
      {cardObjects && cardObjects.map((card) => (
        <CardTemplate key={card.id} cardDetails={card} />
      ))}
    </div>
  );
}

export default CardsDisplay;
