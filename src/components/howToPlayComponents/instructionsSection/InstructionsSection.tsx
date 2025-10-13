import Instructions from "../instructions/Instructions";
import styles from "./instructionsSection.module.css";

function InstructionsContainer() {
  return (
    <div className={styles.instructionsSection}>
      <div className={styles.instructionsHeader}>
        <h2 className={styles.instructionsTitle}>Instructions</h2>
      <p className={styles.instructionsWelcomeMessage}>Here's what you need to know:</p>
     
      </div>
       <Instructions />
    </div>
  );
}

export default InstructionsContainer;
