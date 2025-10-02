import { Link } from "react-router-dom";
import styles from "./landingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.mainContainer} data-testid="landing-page-container">
      <div className={styles.imageContainer}>
        <img
          className={styles.mainImage}
          width="400px"
          src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExYm9qM2dmeW42aHQxMXAwNnA2YmV1dTRiaGoweHE4YWZoMDJoZnJkeCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/teYrgUtS8tPl6/giphy.gif"
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
      <div className={styles.startButton} aria-label="Enter Game Button">
        <Link to="/game-page">Enter</Link>
      </div>
    </div>
  );
}

export default LandingPage;
