import styles from "./InstructionsContainer.module.css";

function InstructionsContainer() {

    return (
        <div className={styles.instructionsContainer}>
            <h2>How to Play</h2>
            <p>Follow these instructions to play the game:</p>
            <ol>
                <li>Step 1: Do this</li>
                <li>Step 2: Do that</li>
                <li>Step 3: Enjoy the game!</li>
            </ol>
        </div>
    );      
}

export default InstructionsContainer;   