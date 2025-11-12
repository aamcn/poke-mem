import { useEffect, useMemo, useState } from "react";
import styles from "./cardsDisplay.module.css";
import { useGameContext } from "../../gameComponents/game/useGameContext/useGameContext";
import { v4 as uuidv4 } from "uuid";
import PokemonCardObject from "../utilities/cardConstructor/cardConstructor";
import CardTemplate from "../cardTemplate/CardTemplate";
import { shuffleArray } from "../utilities/shuffleArray/shuffleArray";

// Define the props for the CardsDisplay component.
interface CardsDisplayProps {
  chosenPokemon: Array<Pokemon>;
}

// Define the structure of a Pokemon object based on the expected data.
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

function CardsDisplay({ chosenPokemon }: CardsDisplayProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [cardObjects, setCardObjects] = useState<Array<PokemonCardObject>>([]);
  const { state } = useGameContext();

  // If isHidden is true, set it back to false after 0.5 seconds to re-render the cards.
  useEffect(() => {
    if (isHidden === true) {
      setCardObjects((currentCards) => shuffleArray(currentCards)); // Functional update to ensure latest state
      const timer = setTimeout(() => {
        setIsHidden(false);
      }, 5);
      return () => clearTimeout(timer);
    }
  }, [isHidden]);
 
  // When chosenPokemon changes, create new card objects.
  useEffect(() => {
    if (chosenPokemon && chosenPokemon.length > 0) {
      createCardObjects(chosenPokemon);
    }
  }, [chosenPokemon]);

  function createCardObjects(chosenPokemon: Array<Pokemon>) {
    if (!chosenPokemon || chosenPokemon.length === 0) return;
    // Map through chosenPokemon to create new PokemonCardObject instances.
    const newCards = chosenPokemon.map((pokemon) => {
      const newId = uuidv4();
      const imageUrl = pokemon.sprites.other.dream_world.front_default;
      const name = pokemon.name;
      const type = pokemon.types[0].type.name;
      return new PokemonCardObject(name, imageUrl, newId, type);
    });
    // Update state with the new array of card objects.
    setCardObjects(newCards);
  }

  // Determine the appropriate CSS class based on the card total.
  const cardContainerClass = useMemo(() => {
    if (state.cardTotal === 9) return styles.nineCardsContainer;
    if (state.cardTotal === 6) return styles.sixCardsContainer;
    if (state.cardTotal === 4) return styles.fourCardsContainer;
    return "";
  }, [state.cardTotal]);

  return (
    !isHidden && (
      <div className={cardContainerClass} data-testid="cards-container">
        {/* Render your card components here */}
        {cardObjects &&
          cardObjects.map((card) => (
            <CardTemplate
              key={card.id}
              cardDetails={card}
              setIsHidden={setIsHidden}
            />
          ))}
      </div>
    )
  );
}

export default CardsDisplay;
