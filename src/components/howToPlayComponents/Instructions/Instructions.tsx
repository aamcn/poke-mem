import styles from "./instructions.module.css";

function Instructions() {
  return (
    <div className={styles.instructionsContainer}>
      <div className={styles.instructionsListContainer}>
        <section className={styles.instructionsList}>
            <h3 className={styles.instructionsSectionTitle}>Game Play</h3>
            <ul className={styles.instructionsLists}>
              <li className={styles.instructionsListItem}>Clicking a card scores you a point.</li>
              <li className={styles.instructionsListItem}>After each point, the cards will shuffle.</li>
              <li className={styles.instructionsListItem}>Click every card once to win the round.</li>
              <li className={styles.instructionsListItem}>
                The faster you click all the cards, the higher you'll be on the
                leaderboard!
              </li>
              <li className={styles.instructionsListItem}>
                If you win the round you can add your score to the leaderboard!
              </li>

               <p className={styles.instructionsWarning}>But be careful!</p>
              <li className={styles.instructionsListItem}>If you click on a card more than once its game over!</li>
            </ul >
            <hr className={styles.instructionsDivider} />
            <h3 className={styles.instructionsSectionTitle}>Difficulty Levels</h3>
          <ul className={styles.instructionsLists}>
            <li className={styles.instructionsListItem}>Easy: 4 Cards - For beginners.</li>
            <li className={styles.instructionsListItem}>Medium: 6 Cards - A bit more challenging.</li>
            <li className={styles.instructionsListItem}>Hard: 9 Cards - For experienced players.</li>
          </ul>
            <hr className={styles.instructionsDivider}/>

            <h3 className={styles.instructionsSectionTitle}>Tips for Success</h3>

          <ul className={styles.instructionsLists}>
            <li className={styles.instructionsListItem}>Stay focused.</li>
            <li className={styles.instructionsListItem}>Remember which cards you've clicked.</li>
            <li className={styles.instructionsListItem}>Take your time, but not too much!</li>
            <li className={styles.instructionsListItem}>Try an easier level if you're struggling.</li>
            <li className={styles.instructionsListItem}>
              Try to come up with a strategy or an order to click the cards.
            </li>
            <li className={styles.instructionsListItem}>Practice makes perfect!</li>
          </ul>

        </section>
      </div>
    </div>
  );
}

export default Instructions;
