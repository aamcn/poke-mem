import type PokemonCardObject from "../utilities/cardConstructor/cardConstructor";
import { useGameContext } from "../../gameComponents/game/Game";
import styles from "./cardTemplate.module.css";
import { useMemo } from "react";

interface CardTemplateProps {
  key?: string; // Optional key prop for list rendering
  cardDetails: PokemonCardObject; // Make this optional to avoid errors if not provided
  setIsHidden: (value: boolean) => void; // Optional function to set hidden state
}

function CardTemplate({ cardDetails, setIsHidden }: CardTemplateProps) {
  const { state, dispatch } = useGameContext();

  // Handle card click event
  const handleCardClick = () => {
    // If the card has not been clicked, increment score and mark as clicked.
    if (cardDetails.isClicked === false) {
      setIsHidden(true);
      dispatch({ type: "incrementScore", payload: null });
      cardDetails.isClicked = true;

      // Check if the game is won after score increment, if true toggle game won state.
      if (state.score + 1 === state.cardTotal) {
        dispatch({ type: "toggleGameWon", payload: true });
      }
      // If the card has already been clicked, toggle game lost state.
    } else if (cardDetails.isClicked === true) {
      dispatch({ type: "toggleGameLost", payload: true });
    }
  };

  // Determine card className based on state.cardTotal value on render/ cardTotal change.
  const cardClassSize = useMemo(() => {
    if (state.cardTotal === 9)
      return [styles.nineCardContainer, styles.nineImageContainer];
    if (state.cardTotal === 6)
      return [styles.sixCardContainer, styles.sixImageContainer];
    if (state.cardTotal === 4)
      return [styles.fourCardContainer, styles.fourImageContainer];
    return ["", ""];
  }, [state.cardTotal]);

  return (
    <div
      key={cardDetails.id}
      data-testid="playing-card-container"
      className={cardClassSize[0]}
      onClick={handleCardClick}
      aria-label={`Click to select ${cardDetails.name} card`}
    >
      <div className={cardClassSize[1]}>
        <img
          className={styles.cardImage}
          src={cardDetails.imageUrl}
          alt={`${cardDetails.name} Image`}
          data-testid="card-image"
        />
      </div>
      <div className={styles.cardTitleContainer}>
        <p data-testid="card-name">{cardDetails.name}</p>
      </div>
    </div>
  );
}

export default CardTemplate;
