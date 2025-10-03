import { useEffect, useMemo, useState } from "react";
import styles from "./cardsDisplay.module.css";
import { useGameContext } from "../../gameComponents/game/Game";

function CardsDisplay() {
  const [isHidden, setIsHidden] = useState(false);
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
    </div>
  );
}

export default CardsDisplay;
