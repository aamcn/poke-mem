import type PokemonCardObject from "./cardConstructor/cardConstructor";
import { useGameContext } from "../../gameComponents/game/Game";
import styles from "./cardTemplate.module.css";
import { useMemo } from "react";

interface CardTemplateProps {
  key?: number; // Optional key prop for list rendering
  cardDetails: PokemonCardObject; // Make this optional to avoid errors if not provided
}

function CardTemplate({ cardDetails }: CardTemplateProps) {
  const { state, dispatch } = useGameContext();
  /* 
    When the card is clicked, if it is the first time, the isClicked state is 
    changed to 'true' and a point is added to the current score. 
    If the card has been previously clicked (meaning isClicked is already true) gameResults
    is set to true ending the game which renders the gameOver pop up menu component.
  */

  const handleCardClick = () => {
    if (cardDetails.isClicked === false) {
      console.log("Card clicked:", cardDetails.isClicked);
      dispatch({ type: "incrementScore", payload: null });
      cardDetails.isClicked = true;
    } else if (cardDetails.isClicked === true) {
      dispatch({ type: "toggleGameLost", payload: true });
    }
  };

  const cardClassSize = useMemo(() => {
    if(state.cardTotal === 9) return [styles.nineCardContainer, styles.nineImageContainer];
    if(state.cardTotal === 6) return [styles.sixCardContainer, styles.sixImageContainer];
    if(state.cardTotal === 4) return [styles.fourCardContainer, styles.fourImageContainer];
    return ['', ''];
  }, [state.cardTotal]);

  return (
    <div
      key={cardDetails.id}
      data-testid="playingCard"
      className={cardClassSize[0]}
      onClick={handleCardClick}
      aria-label={`Click to select ${cardDetails.name} card`}
    >
      <div className={cardClassSize[1]}>
        <img
          className={styles.cardImage}
          src={cardDetails.imageUrl}
          alt={`${cardDetails.name} Pokemon`}
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
