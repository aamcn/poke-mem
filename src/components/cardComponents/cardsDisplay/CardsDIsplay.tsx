import { useMemo, useState } from "react";
import styles from "./cardsDisplay.module.css";
import { useGameContext } from "../../gameComponents/game/Game";

function CardsDisplay() {
  const [isHidden, setIsHidden] = useState(false);
  const [cardContainerClass, setCardContainerClass] = useState("");
  const { state, dispatch } = useGameContext();

  // If isHidden is true, set it back to false after 0.5 seconds to re-render the cards.
  if (isHidden != false) {
    setTimeout(() => {
      setIsHidden(false);
    }, 500);
  }

  const setCardClassName = () => {
    if (state.cardTotal === 9) {
      setCardContainerClass(`${styles.nineCardsContainer}`);
    }
    if (state.cardTotal === 6) {
      setCardContainerClass(`${styles.sixCardsContainer}`);
    }
    if (state.cardTotal === 4) {
      setCardContainerClass(`${styles.fourCardsContainer}`);
    }
  };

  useMemo(() => {
    setCardClassName();
  }, [state.cardTotal]);

  return (
    <div className={cardContainerClass}>
      <h1>Cards Display</h1>

      {/* Render your card components here */}
    </div>
  );
}

export default CardsDisplay;
