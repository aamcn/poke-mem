import Header from "../../components/header/Header";
import InstructionsSection from "../../components/howToPlayComponents/instructionsSection/InstructionsSection";
import styles from "./howToPlayPage.module.css";

function HowToPlayPage() {
  return (
    <>
    <Header />
    <div className={styles.howToPlayPage}>
      <InstructionsSection />
    </div>
    </>
  );
}

export default HowToPlayPage;