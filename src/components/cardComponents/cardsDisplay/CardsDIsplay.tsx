import { useEffect, useMemo, useState } from "react";
import styles from "./cardsDisplay.module.css";
import { useGameContext } from "../../gameComponents/game/Game";
import { v4 as uuidv4 } from "uuid";
import PokemonCardObject from "../cardTemplate/cardConstructor/cardConstructor";
import CardTemplate from "../cardTemplate/CardTemplate";
import { shuffleArray } from "../modules/shuffleArray";

interface CardsDisplayProps {
  chosenPokemon: Array<Pokemon>;
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

function CardsDisplay({ chosenPokemon }: CardsDisplayProps) {
  const [isHidden, setIsHidden] = useState(false);
  const [cardObjects, setCardObjects] = useState<Array<PokemonCardObject>>([]);
  const { state } = useGameContext();

  // Determine the appropriate CSS class based on the card total.
  const cardContainerClass = useMemo(() => {
    if (state.cardTotal === 9) return styles.nineCardsContainer;
    if (state.cardTotal === 6) return styles.sixCardsContainer;
    if (state.cardTotal === 4) return styles.fourCardsContainer;
    return "";
  }, [state.cardTotal]);

  // Create card objects from the chosenPokemon array.
  function createCardObjects(chosenPokemon: Array<Pokemon>) {
    if (!chosenPokemon || chosenPokemon.length === 0) return;
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

  // When chosenPokemon changes, create new card objects.
  useEffect(() => {
    if (chosenPokemon && chosenPokemon.length > 0) {
      createCardObjects(chosenPokemon);
    }
  }, [chosenPokemon]);

  // If isHidden is true, set it back to false after 0.5 seconds to re-render the cards.
  useEffect(() => {
    setCardObjects(shuffleArray(cardObjects));
    if (isHidden !== false) {
      const timer = setTimeout(() => {
        setIsHidden(false);
      }, 500);
      // Cleanup function to prevent memory leaks
      return () => clearTimeout(timer);
    }
  }, [isHidden]);

  return (
    !isHidden && (
      <div className={cardContainerClass}>
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
