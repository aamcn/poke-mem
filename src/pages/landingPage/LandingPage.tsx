import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";
import { landingPageGifUrl } from "./constants/landingPageConstants";

function LandingPage() {
  return (
    <div className={styles.mainContainer} data-testid="landing-page-container">
      <div className={styles.imageContainer}>
        <img
          className={styles.mainImage}
          width="400px"
          src={landingPageGifUrl}
          data-testid="main-image"
          aria-label="Haunter floating gif"
          alt="Haunter floating gif"
        />
      </div>
      <div>
        <h1 className={styles.mainHeading} aria-label="Poke-Mem">
          Poke-Mem
        </h1>
      </div>
      <div className={styles.startButton} aria-label="Enter Game Button" data-testid="enter-game-button">
        <Link to="/game-page">Enter</Link>
      </div>
    </div>
  );
}

export default LandingPage;
