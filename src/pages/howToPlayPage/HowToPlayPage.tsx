import Header from "../../components/header/Header";
import InstructionsContainer from "../../components/howToPlayComponents/instructionsSection/InstructionsSection";
import styles from "./howToPlayPage.module.css";

function HowToPlayPage() {
  return (
    <>
    <Header />
    <div className={styles.howToPlayPage}>
      <InstructionsContainer />
    </div>
    </>
  );
}

export default HowToPlayPage;