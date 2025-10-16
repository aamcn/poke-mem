import InstructionList from "../instructionList/InstructionList";
import styles from "./instructionsSection.module.css";

function InstructionsSection() {
  return (
    <div
      className={styles.instructionsSection}
      data-testid="instructions-section-container"
    >
      <div className={styles.instructionsHeader}>
        <h2 className={styles.instructionsTitle}>Instructions</h2>
        <p className={styles.instructionsWelcomeMessage}>
          Here's what you need to know:
        </p>
      </div>
      <InstructionList />
    </div>
  );
}

export default InstructionsSection;
